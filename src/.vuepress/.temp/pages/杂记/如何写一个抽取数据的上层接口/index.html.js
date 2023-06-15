export const data = JSON.parse("{\"key\":\"v-5fa67d1c\",\"path\":\"/%E6%9D%82%E8%AE%B0/%E5%A6%82%E4%BD%95%E5%86%99%E4%B8%80%E4%B8%AA%E6%8A%BD%E5%8F%96%E6%95%B0%E6%8D%AE%E7%9A%84%E4%B8%8A%E5%B1%82%E6%8E%A5%E5%8F%A3/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"如何写一个抽取数据的上层接口 需要考虑哪些因素： 抽数得考虑成功与否，失败了考虑重试需要一个同步状态去记录 抽数不应该按照当天日期去拿数据，应该是一个时间段，上一次成功的同步结束时间到当前时间，避免遗漏数据 如果数据量特别多，考虑使用多线程，避免客户使用系统时间段同步，影响访问速度 将数据查询到内存中，记得分页，避免oom 小细节：做in查询的时候，小心拼接超长也要分页 用一张表去记录，表结构： 表名: db_ywzx.t_zx_sjtbjl\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/%E6%9D%82%E8%AE%B0/%E5%A6%82%E4%BD%95%E5%86%99%E4%B8%80%E4%B8%AA%E6%8A%BD%E5%8F%96%E6%95%B0%E6%8D%AE%E7%9A%84%E4%B8%8A%E5%B1%82%E6%8E%A5%E5%8F%A3/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Jankin'Blog\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"如何写一个抽取数据的上层接口 需要考虑哪些因素： 抽数得考虑成功与否，失败了考虑重试需要一个同步状态去记录 抽数不应该按照当天日期去拿数据，应该是一个时间段，上一次成功的同步结束时间到当前时间，避免遗漏数据 如果数据量特别多，考虑使用多线程，避免客户使用系统时间段同步，影响访问速度 将数据查询到内存中，记得分页，避免oom 小细节：做in查询的时候，小心拼接超长也要分页 用一张表去记录，表结构： 表名: db_ywzx.t_zx_sjtbjl\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"JanKin Xie\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"JanKin Xie\\\",\\\"url\\\":\\\"\\\"}]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":8.05,\"words\":2415},\"filePathRelative\":\"杂记/如何写一个抽取数据的上层接口/README.md\",\"excerpt\":\"<p>如何写一个抽取数据的上层接口</p>\\n<p>需要考虑哪些因素：</p>\\n<ul>\\n<li>抽数得考虑成功与否，失败了考虑重试需要一个同步状态去记录</li>\\n<li>抽数不应该按照当天日期去拿数据，应该是一个时间段，上一次成功的同步结束时间到当前时间，避免遗漏数据</li>\\n<li>如果数据量特别多，考虑使用多线程，避免客户使用系统时间段同步，影响访问速度</li>\\n<li>将数据查询到内存中，记得分页，避免oom</li>\\n<li>小细节：做in查询的时候，小心拼接超长也要分页</li>\\n</ul>\\n<p>用一张表去记录，表结构：</p>\\n<p>表名: db_ywzx.t_zx_sjtbjl</p>\",\"autoDesc\":true}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
