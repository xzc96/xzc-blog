export const data = JSON.parse("{\"key\":\"v-ebf023e8\",\"path\":\"/%E6%9D%82%E8%AE%B0/Linux%E5%91%BD%E4%BB%A4/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"用户名删除 userdel -r+用户名即可删除 场景：centos上java dump文件很大，有5个G，内网情况需要光盘传输，没那么多空间且传输速度慢 思路：拆分压缩 拆分压缩： 要将一个6GB的java.hprof文件分割成每个1GB，并压缩这些分割后的文件，您可以按照以下步骤进行操作： 安装split命令（如果您尚未安装）： sudo yum install coreutils 使用split命令将文件分割成1GB的块： split -b 1G java.hprof java_part 这将生成多个名为java_partaa, java_partab, java_partac等的文件，每个文件大小为1GB。 压缩这些分割后的文件： tar -czvf java_parts.tar.gz java_part* 这将创建一个名为java_parts.tar.gz的压缩文件，其中包含所有分割后的文件。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/%E6%9D%82%E8%AE%B0/Linux%E5%91%BD%E4%BB%A4/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Jankin'Blog\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"用户名删除 userdel -r+用户名即可删除 场景：centos上java dump文件很大，有5个G，内网情况需要光盘传输，没那么多空间且传输速度慢 思路：拆分压缩 拆分压缩： 要将一个6GB的java.hprof文件分割成每个1GB，并压缩这些分割后的文件，您可以按照以下步骤进行操作： 安装split命令（如果您尚未安装）： sudo yum install coreutils 使用split命令将文件分割成1GB的块： split -b 1G java.hprof java_part 这将生成多个名为java_partaa, java_partab, java_partac等的文件，每个文件大小为1GB。 压缩这些分割后的文件： tar -czvf java_parts.tar.gz java_part* 这将创建一个名为java_parts.tar.gz的压缩文件，其中包含所有分割后的文件。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"JanKin Xie\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"JanKin Xie\\\",\\\"url\\\":\\\"\\\"}]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":1.81,\"words\":542},\"filePathRelative\":\"杂记/Linux命令/README.md\",\"excerpt\":\"<p>用户名删除</p>\\n<p>userdel -r+用户名即可删除</p>\\n<p>场景：centos上java dump文件很大，有5个G，内网情况需要光盘传输，没那么多空间且传输速度慢</p>\\n<p>思路：拆分压缩</p>\\n<p>拆分压缩：</p>\\n<p>要将一个6GB的java.hprof文件分割成每个1GB，并压缩这些分割后的文件，您可以按照以下步骤进行操作：</p>\\n<ol>\\n<li>\\n<p>安装split命令（如果您尚未安装）：</p>\\n<div class=\\\"language-bash line-numbers-mode\\\" data-ext=\\\"sh\\\"><pre class=\\\"language-bash\\\"><code><span class=\\\"token function\\\">sudo</span> yum <span class=\\\"token function\\\">install</span> coreutils\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div></div></div></li>\\n<li>\\n<p>使用split命令将文件分割成1GB的块：</p>\\n<div class=\\\"language-bash line-numbers-mode\\\" data-ext=\\\"sh\\\"><pre class=\\\"language-bash\\\"><code><span class=\\\"token function\\\">split</span> <span class=\\\"token parameter variable\\\">-b</span> 1G java.hprof java_part\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div></div></div><p>这将生成多个名为<code>java_partaa</code>, <code>java_partab</code>, <code>java_partac</code>等的文件，每个文件大小为1GB。</p>\\n</li>\\n<li>\\n<p>压缩这些分割后的文件：</p>\\n<div class=\\\"language-bash line-numbers-mode\\\" data-ext=\\\"sh\\\"><pre class=\\\"language-bash\\\"><code><span class=\\\"token function\\\">tar</span> <span class=\\\"token parameter variable\\\">-czvf</span> java_parts.tar.gz java_part*\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div></div></div><p>这将创建一个名为<code>java_parts.tar.gz</code>的压缩文件，其中包含所有分割后的文件。</p>\\n</li>\\n</ol>\",\"autoDesc\":true}")

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
