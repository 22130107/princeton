import { cookies } from "next/headers";
import { dictionaries, LANG_COOKIE, parseLang, translate } from "@/lib/i18n";

export async function getServerT() {
  const store = await cookies();
  const lang = parseLang(store.get(LANG_COOKIE)?.value);
  return (key: string) => translate(dictionaries[lang], key);
}
