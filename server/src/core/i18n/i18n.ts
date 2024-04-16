import i18n from "i18next";

import { messages } from ".";

i18n.init({
    debug: false,
    defaultNS: "translations",
    fallbackLng: "pt",
    ns: "translations",
    resources: messages,
}).catch((err) => {
    console.error(err);
});

export { i18n };
