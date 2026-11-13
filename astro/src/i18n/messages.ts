export type Locale = "en" | "ar";

export const messages = {
  en: {
    nav: { home: "Home", work: "Work", writing: "Writing", about: "About", approach: "How I work", contact: "Contact" },
    footer: "Designed with intent. Built with care.",
    language: "العربية",
    themeToDark: "Switch to dark theme",
    themeToLight: "Switch to light theme",
    menu: "Toggle navigation",
  },
  ar: {
    nav: { home: "الرئيسية", work: "الأعمال", writing: "الكتابة", about: "نبذة", approach: "منهجي في العمل", contact: "تواصل" },
    footer: "صُمّم بقصد، وبُني بعناية.",
    language: "English",
    themeToDark: "التبديل إلى المظهر الداكن",
    themeToLight: "التبديل إلى المظهر الفاتح",
    menu: "فتح أو إغلاق قائمة التنقل",
  },
} as const satisfies Record<Locale, {
  nav: Record<"home" | "work" | "writing" | "about" | "approach" | "contact", string>;
  footer: string; language: string; themeToDark: string; themeToLight: string; menu: string;
}>;

export const routePairs: Record<string, string> = {
  "/": "/ar/",
  "/projects/": "/ar/projects/",
  "/projects/injaz/": "/ar/projects/injaz/",
  "/projects/life-advise/": "/ar/projects/life-advise/",
  "/about/": "/ar/about/",
  "/approach/": "/ar/approach/",
  "/contact/": "/ar/contact/",
  "/writing/": "/ar/writing/",
};

export function counterpart(pathname: string, locale: Locale): string {
  if (locale === "ar") {
    const english = Object.entries(routePairs).find(([, ar]) => ar === pathname)?.[0];
    if (english) return english;
    const project = pathname.match(/^\\/ar\\/projects\\/([^/]+)\\/$/);
    if (project) return [ "injaz", "life-advise" ].includes(project[1]) ? `/projects/${project[1]}/` : `/projects/${project[1]}/`;
    const writing = pathname.match(/^\\/ar\\/writing\\/([^/]+)\\/$/);
    if (writing) return `/writing/${writing[1]}/`;
    return "/";
  }
  if (routePairs[pathname]) return routePairs[pathname];
  if (/^\\/projects\\/[^/]+\\/$/.test(pathname)) return `/ar${pathname}`;
  if (/^\\/writing\\/[^/]+\\/$/.test(pathname)) return `/ar${pathname}`;
  return "/ar/";
}
