import assert from "node:assert/strict";
import test from "node:test";
import { getRegistrationEmailStatusDisplay } from "./registration-email-status.ts";

test("describes SMTP acceptance without claiming recipient delivery", () => {
  assert.deepEqual(getRegistrationEmailStatusDisplay("sent"), {
    label: "SMTP ĐÃ NHẬN",
    description: "Đã được máy chủ gửi thư nhận vào hàng đợi; chưa xác nhận người nhận đã nhận thư.",
  });
});
