import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "项目",
      icon: "folder-open",
      link: "projects/",
    },

  ],
  
  "/projects/": [
    "",
    {
      text: "黑马点评使用笔记",
      icon: "laptop-code",
      link: "dianping/",
    },
  ],
  
  "/projects/dianping/": [
    "",
    { text: "登录", link: "01.登录" },
    { text: "缓存", link: "02.缓存" },
  ],
});
