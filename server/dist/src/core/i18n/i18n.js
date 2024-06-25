"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18n = void 0;
const i18n = require("i18next");
exports.i18n = i18n;
const _1 = require(".");
i18n
    .init({
    debug: false,
    defaultNS: 'translations',
    fallbackLng: 'pt',
    ns: 'translations',
    resources: _1.messages,
})
    .catch((err) => {
    console.error(err);
});
//# sourceMappingURL=i18n.js.map