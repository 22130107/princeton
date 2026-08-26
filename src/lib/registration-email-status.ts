export function getRegistrationEmailStatusDisplay(status: string) {
  if (status === "sent") {
    return {
      label: "SMTP ĐÃ NHẬN",
      description:
        "Đã được máy chủ gửi thư nhận vào hàng đợi; chưa xác nhận người nhận đã nhận thư.",
    };
  }

  return {
    label: status.toUpperCase(),
    description: "",
  };
}
