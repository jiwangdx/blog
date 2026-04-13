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
      text: "java",
      link: "java/",
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
      link: "youxiang/",
    },
    {
      text: "《智能股票分析系统》",
      collapsible: true,
      link: "trading/",
    },
  ],

  // 《优享生活圈》项目的侧边栏
  "/projects/youxiang/": [
    "",
  ],

  // 《智能股票分析系统》项目的侧边栏
  "/projects/trading/": [
    "",
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