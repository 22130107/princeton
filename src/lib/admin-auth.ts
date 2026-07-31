export const adminSessionCookieName = "princeton_admin_session";
export const adminSessionMaxAgeSeconds = 60 * 60 * 8;

type AdminSessionPayload = {
  sub: string;
  exp: number;
};

type AdminCredentials = {
  username: string;
  password: string;
  secret: string;
  configured: boolean;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function stringToBase64Url(value: string) {
  return bytesToBase64Url(encoder.encode(value));
}

function base64UrlToBytes(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(normalized + padding);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function base64UrlToString(value: string) {
  return decoder.decode(base64UrlToBytes(value));
}

function timingSafeEqualString(left: string, right: string) {
  if (left.length !== right.length) return false;

  let mismatch = 0;

  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return mismatch === 0;
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return bytesToBase64Url(new Uint8Array(signature));
}

export function getAdminCredentials(): AdminCredentials {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  const configured = Boolean(username && password && secret);

  if (configured) {
    return {
      username: username as string,
      password: password as string,
      secret: secret as string,
      configured: true,
    };
  }

  if (process.env.NODE_ENV !== "production") {
    return {
      username: username || "admin",
      password: password || "admin123",
      secret: secret || "local-development-admin-session-secret",
      configured: false,
    };
  }

  return {
    username: "",
    password: "",
    secret: "",
    configured: false,
  };
}

export function isAdminAuthConfigured() {
  return getAdminCredentials().configured || process.env.NODE_ENV !== "production";
}

export async function createAdminSessionToken(username: string) {
  const credentials = getAdminCredentials();
  const payload: AdminSessionPayload = {
    sub: username,
    exp: Date.now() + adminSessionMaxAgeSeconds * 1000,
  };
  const payloadPart = stringToBase64Url(JSON.stringify(payload));
  const signature = await sign(payloadPart, credentials.secret);

  return `${payloadPart}.${signature}`;
}

export async function verifyAdminSessionToken(token: string | undefined) {
  if (!token) return false;

  const credentials = getAdminCredentials();
  if (!credentials.secret) return false;

  const [payloadPart, signature] = token.split(".");
  if (!payloadPart || !signature) return false;

  const expectedSignature = await sign(payloadPart, credentials.secret);
  if (!timingSafeEqualString(signature, expectedSignature)) return false;

  try {
    const payload = JSON.parse(base64UrlToString(payloadPart)) as Partial<AdminSessionPayload>;

    return payload.sub === credentials.username && typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function verifyAdminCredentials(username: string, password: string) {
  const credentials = getAdminCredentials();

  if (!isAdminAuthConfigured()) return false;

  return (
    timingSafeEqualString(username, credentials.username) &&
    timingSafeEqualString(password, credentials.password)
  );
}
