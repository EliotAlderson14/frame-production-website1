import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { GEORGIAN } from "../data/georgian";

const PreferencesContext = createContext(null);
const reverse = Object.fromEntries(Object.entries(GEORGIAN).map(([en, ka]) => [ka, en]));

function translate(value, language) {
  const source = language === "ka" ? GEORGIAN : reverse;
  const trimmed = value.trim();
  const translated = source[trimmed] ||
    (language === "ka" && /^\( \d+ PROJECTS \)$/.test(trimmed) ? trimmed.replace("PROJECTS", "პროექტი") : null) ||
    (language === "en" && /^\( \d+ პროექტი \)$/.test(trimmed) ? trimmed.replace("პროექტი", "PROJECTS") : null);
  if (translated) return value.replace(trimmed, translated);

  // Project names remain as supplied, while the descriptive parts around them translate.
  const fragments = [
    ["WORK / ", "ნამუშევრები / "], ["STILL — ", "კადრი — "],
    [" — MAIN FILM", " — მთავარი ფილმი"], [" — BEHIND THE SCENES", " — გადაღების პროცესი"],
    [" / PREVIEW STILL", " / საჩვენებელი კადრი"], ["View project ", "პროექტის ნახვა: "],
    ["Play video ", "ვიდეოს ჩართვა: "], [" full-width still", " — სრული კადრი"],
  ];
  let result = value;
  for (const [en, ka] of fragments) result = result.replace(language === "ka" ? en : ka, language === "ka" ? ka : en);
  return result;
}

function translateTree(root, language) {
  if (root.nodeType === Node.TEXT_NODE) {
    if (!root.parentElement?.closest("script,style,noscript,[data-no-translate]")) {
      const next = translate(root.nodeValue, language);
      if (next !== root.nodeValue) root.nodeValue = next;
    }
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE || root.closest("[data-no-translate]")) return;
  const elements = [root, ...root.querySelectorAll("*")];
  for (const el of elements) {
    if (el.matches("script,style,noscript") || el.closest("[data-no-translate]")) continue;
    for (const attr of ["placeholder", "aria-label", "title", "alt"]) {
      if (el.hasAttribute(attr)) {
        const old = el.getAttribute(attr);
        const next = translate(old, language);
        if (next !== old) el.setAttribute(attr, next);
      }
    }
    for (const child of el.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        const next = translate(child.nodeValue, language);
        if (next !== child.nodeValue) child.nodeValue = next;
      }
    }
  }
}

function saved(key, fallback) {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}

export const PreferencesProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => saved("frame-theme", "light") === "dark" ? "dark" : "light");
  const [language, setLanguage] = useState(() => saved("frame-language", "en") === "ka" ? "ka" : "en");

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#141518" : "#F4F2EE");
    try { localStorage.setItem("frame-theme", theme); } catch { /* storage is optional */ }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "ka" ? "FRAME PRODUCTION — ვიდეოპროდაქშენი" : "FRAME PRODUCTION — Video Production";
    try { localStorage.setItem("frame-language", language); } catch { /* storage is optional */ }
    translateTree(document.body, language);
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "characterData") translateTree(record.target, language);
        if (record.type === "attributes") translateTree(record.target, language);
        if (record.type === "childList") for (const node of record.addedNodes) translateTree(node, language);
      }
    });
    observer.observe(document.body, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ["placeholder", "aria-label", "title", "alt"],
    });
    return () => observer.disconnect();
  }, [language]);

  return <PreferencesContext.Provider value={{ theme, language, toggleTheme: () => setTheme((v) => v === "dark" ? "light" : "dark"), toggleLanguage: () => setLanguage((v) => v === "ka" ? "en" : "ka") }}>{children}</PreferencesContext.Provider>;
};

export const usePreferences = () => useContext(PreferencesContext);
