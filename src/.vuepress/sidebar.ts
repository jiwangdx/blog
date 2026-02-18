import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "coding",
      icon: "code",
      link: "codenotes/",
    },
    {
      text: "project",
      icon: "free",
      link: "projects/",
    },
  ],

  // coding的侧边栏
  "/codenotes/": [
    "",
    {
      text: "《算法基础思想》",
      collapsible: true,
      link: "algorithms/",
    },
    {
      text: "《LC Hot100刷题笔记》",
      collapsible: true,
      link: "lc-hot100/",
    }
  ],

  // project的侧边栏
  "/projects/": [
    "",
    {
      text: "《优享生活圈》",
      collapsible: true,
      link: "dianping/",
    },
  ],

  // 《优享生活圈》项目的侧边栏
  "/projects/dianping/": [
    "",
    { text: "00. 身份验证", link: "00. 身份验证" },
    { text: "01. 项目展示", link: "01. 项目展示" },
  ],

  // 《算法基础思想》的侧边栏
  "/codenotes/algorithms/": [
    ""
  ],

  // 《LC Hot100刷题笔记》的侧边栏
  "/codenotes/lc-hot100/": [
    ""
  ],
});