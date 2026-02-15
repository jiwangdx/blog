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
      text: "黑马点评",
      icon: "laptop-code",
      link: "dianping/",
    },
  ],
  
  "/projects/dianping/": [
    "",
    { text: "01.身份验证", link: "01.身份验证" },
    { text: "02.缓存", link: "02.缓存" },
  ],
});
