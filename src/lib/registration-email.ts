import tls from "node:tls";

export type RegistrationEmailInput = {
  to: string;
  parentName: string;
  phone: string;
  grade: string;
  appointmentLabel: string;
  leadId: number;
};

export type RegistrationEmailResult =
  | { status: "sent" }
  | { status: "skipped"; error: string }
  | { status: "failed"; error: string };

type EmailMessage = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

type SmtpReadState = {
  buffer: string;
  lines: string[];
};

const defaultSmtpHost = "smtp.gmail.com";
const defaultSmtpPort = 465;
const smtpTimeoutMs = 15000;

function htmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getCustomerConfirmationEmail(input: RegistrationEmailInput): EmailMessage {
  const text = [
    `Chào ${input.parentName},`,
    "",
    "Princeton Academy đã nhận thông tin đăng ký tư vấn của Quý phụ huynh.",
    `Mã đăng ký: #${input.leadId}`,
    `Số điện thoại: ${input.phone}`,
    `Khối lớp quan tâm: ${input.grade}`,
    `Lịch tư vấn: ${input.appointmentLabel}`,
    "",
    "Nhà trường sẽ liên hệ xác nhận trong thời gian sớm nhất.",
    "Cảm ơn Quý phụ huynh đã quan tâm đến Princeton Academy.",
  ].join("\n");

  return {
    to: input.to,
    subject: "Princeton Academy đã nhận đăng ký tư vấn",
    text,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#620000">
        <h2 style="margin:0 0 12px;color:#b80000">Đăng ký tư vấn thành công</h2>
        <p>Chào ${htmlEscape(input.parentName)},</p>
        <p>Princeton Academy đã nhận thông tin đăng ký tư vấn của Quý phụ huynh.</p>
        <ul>
          <li><strong>Mã đăng ký:</strong> #${input.leadId}</li>
          <li><strong>Số điện thoại:</strong> ${htmlEscape(input.phone)}</li>
          <li><strong>Khối lớp quan tâm:</strong> ${htmlEscape(input.grade)}</li>
          <li><strong>Lịch tư vấn:</strong> ${htmlEscape(input.appointmentLabel)}</li>
        </ul>
        <p>Nhà trường sẽ liên hệ xác nhận trong thời gian sớm nhất.</p>
        <p>Cảm ơn Quý phụ huynh đã quan tâm đến Princeton Academy.</p>
      </div>
    `,
  };
}

function getOwnerNotificationEmail(input: RegistrationEmailInput, ownerEmail: string): EmailMessage {
  const text = [
    "Có đăng ký tư vấn mới từ website Princeton Academy.",
    "",
    `Mã đăng ký: #${input.leadId}`,
    `Phụ huynh: ${input.parentName}`,
    `Số điện thoại: ${input.phone}`,
    `Email phụ huynh: ${input.to}`,
    `Khối lớp quan tâm: ${input.grade}`,
    `Lịch tư vấn: ${input.appointmentLabel}`,
    "",
    "Vui lòng kiểm tra mục Lịch đăng ký trong trang quản trị.",
  ].join("\n");

  return {
    to: ownerEmail,
    subject: `Có đăng ký tư vấn mới #${input.leadId}`,
    text,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#620000">
        <h2 style="margin:0 0 12px;color:#b80000">Có đăng ký tư vấn mới</h2>
        <p>Website Princeton Academy vừa nhận một đăng ký tư vấn mới.</p>
        <ul>
          <li><strong>Mã đăng ký:</strong> #${input.leadId}</li>
          <li><strong>Phụ huynh:</strong> ${htmlEscape(input.parentName)}</li>
          <li><strong>Số điện thoại:</strong> ${htmlEscape(input.phone)}</li>
          <li><strong>Email phụ huynh:</strong> ${htmlEscape(input.to)}</li>
          <li><strong>Khối lớp quan tâm:</strong> ${htmlEscape(input.grade)}</li>
          <li><strong>Lịch tư vấn:</strong> ${htmlEscape(input.appointmentLabel)}</li>
        </ul>
        <p>Vui lòng kiểm tra mục <strong>Lịch đăng ký</strong> trong trang quản trị.</p>
      </div>
    `,
  };
}

function formatUnknownError(error: unknown, fallback: string): string {
  if (error instanceof AggregateError) {
    const details = error.errors
      .map((item) => formatUnknownError(item, "Unknown nested error."))
      .filter(Boolean)
      .join(" | ");

    return details || error.message || fallback;
  }

  if (error instanceof Error) {
    const code = "code" in error ? String(error.code) : "";
    return [code, error.message].filter(Boolean).join(": ") || fallback;
  }

  return typeof error === "string" && error.trim() ? error : fallback;
}

function encodeAddress(value: string) {
  return value.replace(/[<>\r\n]/g, "").trim();
}

function encodeSubject(value: string) {
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function getMessageId(from: string) {
  const domain = from.split("@")[1] || "localhost";
  return `<registration-${Date.now()}-${Math.random().toString(36).slice(2)}@${domain}>`;
}

function buildMimeMessage(message: EmailMessage, from: string) {
  const boundary = `princeton-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const safeFrom = encodeAddress(from);
  const safeTo = encodeAddress(message.to);

  return [
    `From: "Princeton Academy" <${safeFrom}>`,
    `To: <${safeTo}>`,
    `Subject: ${encodeSubject(message.subject)}`,
    "MIME-Version: 1.0",
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: ${getMessageId(safeFrom)}`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    message.text,
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    message.html,
    "",
    `--${boundary}--`,
  ].join("\r\n");
}

function dotStuff(message: string) {
  return message.replace(/\r?\n/g, "\r\n").replace(/^\./gm, "..");
}

function readSmtpResponse(socket: tls.TLSSocket, state: SmtpReadState) {
  return new Promise<{ code: number; message: string }>((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("SMTP response timed out."));
    }, smtpTimeoutMs);

    function cleanup() {
      clearTimeout(timer);
      socket.off("data", onData);
      socket.off("error", onError);
    }

    function onError(error: Error) {
      cleanup();
      reject(error);
    }

    function onData(chunk: Buffer | string) {
      state.buffer += chunk.toString();
      const lines = state.buffer.split(/\r?\n/);
      state.buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line) continue;
        state.lines.push(line);
        if (/^\d{3} /.test(line)) {
          const responseMessage = state.lines.join("\n");
          const code = Number(line.slice(0, 3));
          state.lines = [];
          cleanup();
          resolve({ code, message: responseMessage });
          return;
        }
      }
    }

    socket.on("data", onData);
    socket.once("error", onError);
  });
}

async function expectSmtp(
  response: Promise<{ code: number; message: string }>,
  expectedCodes: number[],
) {
  const resolved = await response;
  if (!expectedCodes.includes(resolved.code)) {
    throw new Error(`SMTP returned ${resolved.code}: ${resolved.message}`);
  }

  return resolved;
}

async function sendSmtpCommand(
  socket: tls.TLSSocket,
  state: SmtpReadState,
  command: string,
  expectedCodes: number[],
) {
  socket.write(`${command}\r\n`);
  return expectSmtp(readSmtpResponse(socket, state), expectedCodes);
}

async function sendEmailViaSmtp(message: EmailMessage) {
  const user = process.env.GMAIL_SMTP_USER;
  const password = process.env.GMAIL_SMTP_PASSWORD;
  const from = process.env.GMAIL_SMTP_FROM || user;

  if (!user || !password || !from) {
    return null;
  }

  const host = process.env.GMAIL_SMTP_HOST || defaultSmtpHost;
  const port = Number(process.env.GMAIL_SMTP_PORT || defaultSmtpPort);
  const state: SmtpReadState = { buffer: "", lines: [] };
  const socket = tls.connect({
    host,
    port,
    servername: host,
  });

  socket.setTimeout(smtpTimeoutMs);

  try {
    await new Promise<void>((resolve, reject) => {
      socket.once("secureConnect", () => resolve());
      socket.once("error", reject);
      socket.once("timeout", () => reject(new Error("SMTP connection timed out.")));
    });

    await expectSmtp(readSmtpResponse(socket, state), [220]);
    await sendSmtpCommand(socket, state, "EHLO localhost", [250]);
    await sendSmtpCommand(
      socket,
      state,
      `AUTH PLAIN ${Buffer.from(`\0${user}\0${password}`).toString("base64")}`,
      [235],
    );
    await sendSmtpCommand(socket, state, `MAIL FROM:<${encodeAddress(from)}>`, [250]);
    await sendSmtpCommand(socket, state, `RCPT TO:<${encodeAddress(message.to)}>`, [250, 251]);
    await sendSmtpCommand(socket, state, "DATA", [354]);

    socket.write(`${dotStuff(buildMimeMessage(message, from))}\r\n.\r\n`);
    await expectSmtp(readSmtpResponse(socket, state), [250]);
    await sendSmtpCommand(socket, state, "QUIT", [221]);

    return { status: "sent" as const };
  } finally {
    socket.end();
  }
}

function getOwnerNotificationEmailAddress() {
  return (
    process.env.REGISTRATION_NOTIFY_TO ||
    process.env.GMAIL_REGISTRATION_NOTIFY_TO ||
    process.env.GMAIL_SMTP_FROM ||
    process.env.GMAIL_SMTP_USER ||
    ""
  ).trim();
}

export async function sendRegistrationConfirmationEmail(
  input: RegistrationEmailInput,
): Promise<RegistrationEmailResult> {
  try {
    const customerResult = await sendEmailViaSmtp(getCustomerConfirmationEmail(input));
    if (!customerResult) {
      return {
        status: "skipped",
        error: "Gmail SMTP is not configured.",
      };
    }

    const ownerEmail = getOwnerNotificationEmailAddress();
    if (ownerEmail && ownerEmail.toLowerCase() !== input.to.toLowerCase()) {
      await sendEmailViaSmtp(getOwnerNotificationEmail(input, ownerEmail));
    }

    return { status: "sent" };
  } catch (error) {
    return {
      status: "failed",
      error: formatUnknownError(error, "SMTP email request failed."),
    };
  }
}
