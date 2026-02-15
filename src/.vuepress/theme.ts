import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://jiwang.online/",

  darkmode: "toggle",

  author: {
    name: "jiwang",
    url: "https://jiwang.online/",
  },

  logo: "https://i.postimg.cc/g2c1xx8J/小太阳头像.png",

  repo: "https://github.com/jiwangdx/",

  docsDir: "src",


  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  footer: "光荣在于平淡，艰巨在于漫长",
  displayFooter: true,


  // 博客相关
  blog: {
    description: "冷静思考",
    intro: "/intro.html",
    medias: {
      Baidu: "https://www.baidu.com",
      BiliBili: "hhttps://www.bilibili.com/",
      Email: "mailto:jiwangdx@163.com",
      GitHub: "https://github.com/jiwangdx/",
      // Wechat: "javascript:alert('微信号：15755075213')",
      Weibo: "https://weibo.com/",

      // VuePressThemeHope: {
      //   icon: "https://theme-hope-assets.vuejs.press/logo.svg",
      //   link: "https://theme-hope.vuejs.press",

      // },
    },
  },

  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": {
        hint: "Password: 1234",
        password: "1234",
      },
    },
  },

  // // 多语言配置
  // metaLocales: {
  //   editLink: "在 GitHub 上编辑此页",
  // },
  
  // 禁用编辑链接
  editLink: false,

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  hotReload: true,

  // 此处开启了很多功能用于演示，你应仅保留用到的功能。
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

  },

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,

    slimsearch:{
      indexContent: true
    },


    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      prefix: "fa6-solid:",
    },

    
  },
});
