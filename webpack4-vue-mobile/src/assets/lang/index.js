import Vue from "vue";
import langCn from "./lang-cn";
import langEn from "./lang-en";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  cn: {
    ...langCn,
  },
  en: {
    ...langEn,
  },
};

const i18n = new VueI18n({
  locale: "en",
  messages,
});

export default i18n;
