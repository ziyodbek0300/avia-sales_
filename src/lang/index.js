import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {langCons} from "../constants/langCons";
import langs from "../constants/langs.json"
const resources = {
    en: {
        translation: langs.en
    },
    ru: {
        translation: langs.ru
    },
    uz: {
        translation: langs.uz
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: langCons.uz,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;