import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { langCons } from "../constants/langCons";
import uz from "../locale/uz.json";
import en from "../locale/en.json";
import ru from "../locale/ru.json";
const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  uz: {
    translation: uz,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: langCons.ru,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
