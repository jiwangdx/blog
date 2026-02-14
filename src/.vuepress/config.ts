import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'

import theme from "./theme.js";

export default defineUserConfig({

  bundler:viteBundler({
    viteOptions: {
      css: {
        preprocessorOptions:{
          scss:{
            silenceDeprecations:['if-function'],
          }
        }
      }
    }
  }),

  base: "/blog/",

  lang: "zh-CN",
  title: "博客演示",
  description: "vuepress-theme-hope 的博客演示",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
