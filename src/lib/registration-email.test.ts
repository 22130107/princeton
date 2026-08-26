import assert from "node:assert/strict";
import test from "node:test";
import { getSmtpConfig } from "./registration-email.ts";

test("uses domain SMTP settings for the noreply sender", () => {
  const config = getSmtpConfig({
    SMTP_HOST: "mx-02.tentenpost.vn",
    SMTP_PORT: "465",
    SMTP_USER: "noreply@princetonacademy.vn",
    SMTP_PASSWORD: "secret",
    SMTP_FROM: "noreply@princetonacademy.vn",
  });

  assert.deepEqual(config, {
    host: "mx-02.tentenpost.vn",
    port: 465,
    user: "noreply@princetonacademy.vn",
    password: "secret",
    from: "noreply@princetonacademy.vn",
  });
});

test("prefers domain SMTP settings over legacy Gmail settings", () => {
  const config = getSmtpConfig({
    SMTP_USER: "noreply@princetonacademy.vn",
    SMTP_PASSWORD: "domain-secret",
    GMAIL_SMTP_USER: "legacy@gmail.com",
    GMAIL_SMTP_PASSWORD: "gmail-secret",
  });

  assert.equal(config?.user, "noreply@princetonacademy.vn");
  assert.equal(config?.password, "domain-secret");
  assert.equal(config?.from, "noreply@princetonacademy.vn");
  assert.equal(config?.host, "mx-02.tentenpost.vn");
  assert.equal(config?.port, 465);
});

test("keeps legacy Gmail SMTP settings working during deployment", () => {
  const config = getSmtpConfig({
    GMAIL_SMTP_HOST: "smtp.gmail.com",
    GMAIL_SMTP_PORT: "465",
    GMAIL_SMTP_USER: "legacy@gmail.com",
    GMAIL_SMTP_PASSWORD: "gmail-secret",
    GMAIL_SMTP_FROM: "legacy@gmail.com",
  });

  assert.deepEqual(config, {
    host: "smtp.gmail.com",
    port: 465,
    user: "legacy@gmail.com",
    password: "gmail-secret",
    from: "legacy@gmail.com",
  });
});

test("does not configure SMTP without authentication credentials", () => {
  assert.equal(
    getSmtpConfig({
      SMTP_USER: "noreply@princetonacademy.vn",
    }),
    null,
  );
});

test("does not mix incomplete domain credentials with legacy Gmail credentials", () => {
  assert.equal(
    getSmtpConfig({
      SMTP_USER: "noreply@princetonacademy.vn",
      GMAIL_SMTP_USER: "legacy@gmail.com",
      GMAIL_SMTP_PASSWORD: "gmail-secret",
    }),
    null,
  );
});
