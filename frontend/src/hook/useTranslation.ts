import * as translations from "./translations";
import { useLocalStorage } from "./useStorage";

export default function useTranslation () {
    const [language, setLanguage] = useLocalStorage("language", "de");
    const [fallbackLanguage, setFallbackLanguage] = useLocalStorage("language", "de");

    function translate (key: string) {
        const keys = key.split(".");

        return (
            getNestedTranslation(language, keys) ??
            getNestedTranslation(fallbackLanguage, keys) ??
            key
        );
    }

    return {
        language,
        setLanguage,
        setFallbackLanguage,
        translate,
    }
}

function getNestedTranslation (language: string, keys: string[]) {
    return keys.reduce((obj, key) => {
        return obj?.[key];
        // @ts-ignore
    }, translations[language]);
}
