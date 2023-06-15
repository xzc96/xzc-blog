import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // children如果文件名不是README.md就需要指定如："文件夹/文件名.md"，否则可以直接"文件夹/"
  "/": [
    "",
    {
      text: "杂记",
      icon: "laptop-code",
      prefix: "杂记/",
      children: ["小技巧：利用Feuture线程池多个线程一起执行/"
      ],
    },
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    "slides",
  ],
});
