import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "代码笔记",
    icon: "code",
    prefix: "/category/",
    children: [
      {
        text: "Java",
        link: "Java/",
      },
      {
        text: "SQL",
        link: "SQL/",
      },
      {
        text: "杂记",
        link: "杂记/",
      }
    ]
  },
  {
    text: "归纳",
    icon: "list",
    link: "/timeline/",
  },
  {
    text: "标签",
    icon: "tag",
    link: "/tag/",
  },
]);
