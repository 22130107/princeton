import { cookies } from "next/headers";
import { dictionaries, LANG_COOKIE, parseLang, translate, type Lang } from "@/lib/i18n";

export async function getServerLang(): Promise<Lang> {
  const store = await cookies();
  return parseLang(store.get(LANG_COOKIE)?.value);
}

export async function getServerT() {
  const lang = await getServerLang();
  return (key: string) => translate(dictionaries[lang], key);
}
