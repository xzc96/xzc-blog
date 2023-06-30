import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // children如果文件名不是README.md就需要指定如："文件夹/文件名.md"，否则可以直接"文件夹/"
  "/": [
    //"", 不展示主页
    {
      text: "杂记",
      icon: "laptop-code",
      prefix: "杂记/",
      children: [
      ],
    }
  ],
});
