function mojibakeScore(value: string) {
  const matches = value.match(/[\u0080-\u009f]|Ã|Ä|Æ|áº|á»/g);
  return matches?.length ?? 0;
}

export function repairMojibakeText(value: string) {
  const source = value.trim();
  if (!source || mojibakeScore(source) === 0) return source;

  const bytes: number[] = [];
  for (const char of source) {
    const code = char.charCodeAt(0);
    if (code > 255) return source;
    bytes.push(code);
  }

  const decoded = new TextDecoder("utf-8", { fatal: false }).decode(new Uint8Array(bytes));

  if (!decoded || decoded.includes("�")) return source;
  return mojibakeScore(decoded) < mojibakeScore(source) ? decoded : source;
}
