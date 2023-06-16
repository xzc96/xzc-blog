import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/base/",

  lang: "zh-CN",
  title: "Jankin'Blog",
  description: "Jankin'Blog",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
