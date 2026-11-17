export type Locale = "en" | "ar";

export const messages = {
  en: {
    nav: { home: "Home", work: "Work", writing: "Writing", about: "About", approach: "How I work", contact: "Contact" },
    footer: "Designed with intent. Built with care.",
    language: "العربية", themeToDark: "Switch to dark theme", themeToLight: "Switch to light theme", menu: "Toggle navigation",
  },
  ar: {
    nav: { home: "الرئيسية", work: "الأعمال", writing: "الكتابة", about: "نبذة", approach: "منهجي في العمل", contact: "تواصل" },
    footer: "تصميم مدروس، وتنفيذ بعناية.",
    language: "English", themeToDark: "التبديل إلى المظهر الداكن", themeToLight: "التبديل إلى المظهر الفاتح", menu: "فتح أو إغلاق قائمة التنقل",
  },
} as const satisfies Record<Locale, {
  nav: Record<"home" | "work" | "writing" | "about" | "approach" | "contact", string>;
  footer: string; language: string; themeToDark: string; themeToLight: string; menu: string;
}>;

export const routePairs: Record<string, string> = {
  "/": "/ar/", "/projects/": "/ar/projects/",
  "/projects/injaz/": "/ar/projects/injaz/", "/projects/life-advise/": "/ar/projects/life-advise/",
  "/about/": "/ar/about/", "/approach/": "/ar/approach/",
  "/contact/": "/ar/contact/", "/writing/": "/ar/writing/",
};

export function counterpart(pathname: string): string {
  // Resolve from the current route, not from the destination locale.
  // The same path segments identify matching project and writing entries.
  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    const englishPath = pathname.slice(3);
    return englishPath || "/";
  }
  if (routePairs[pathname]) return routePairs[pathname];
  if ((pathname.startsWith("/projects/") || pathname.startsWith("/writing/")) && pathname.endsWith("/")) {
    return `/ar${pathname}`;
  }
  return "/ar/";
}
