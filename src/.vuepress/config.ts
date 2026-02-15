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

  base: "/",

  lang: "zh-CN",
  title: "jiwang's blog",
  description: "董吉旺的博客",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
