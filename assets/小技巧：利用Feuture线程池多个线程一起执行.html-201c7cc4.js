const n=JSON.parse(`{"key":"v-3d077ea3","path":"/%E6%9D%82%E8%AE%B0/%E5%B0%8F%E6%8A%80%E5%B7%A7%EF%BC%9A%E5%88%A9%E7%94%A8Feuture%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%A4%9A%E4%B8%AA%E7%BA%BF%E7%A8%8B%E4%B8%80%E8%B5%B7%E6%89%A7%E8%A1%8C/%E5%B0%8F%E6%8A%80%E5%B7%A7%EF%BC%9A%E5%88%A9%E7%94%A8Feuture%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%A4%9A%E4%B8%AA%E7%BA%BF%E7%A8%8B%E4%B8%80%E8%B5%B7%E6%89%A7%E8%A1%8C.html","title":"小技巧：利用Feuture线程池多个线程一起执行","lang":"zh-CN","frontmatter":{"description":"小技巧：利用Feuture线程池多个线程一起执行 private List&lt;DbjdSyTjVo&gt; getZgTjjg(SyTjDTO dto, List&lt;String&gt; corpIdList) throws ExecutionException, InterruptedException { List&lt;DbjdSyTjVo&gt; tjjgList; // 拿到线程池，两个线程同时进行统计 ExecutorService executor = Executors.newFixedThreadPool(2); Future&lt;List&lt;DbjdSyTjVo&gt;&gt; futureA = executor.submit( () -&gt; zxjdxxMapper.listSyZgjdTjA(dto.getKssj(), dto.getJssj(), corpIdList)); Future&lt;List&lt;DbjdSyTjVo&gt;&gt; futureF = executor.submit( () -&gt; zxjdxxMapper.listSyZgjdTjF(dto.getKssj(), dto.getJssj(), corpIdList)); // 组装两次的结果 tjjgList = futureA.get(); tjjgList.addAll(futureF.get()); return tjjgList; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/xzc-blog/%E6%9D%82%E8%AE%B0/%E5%B0%8F%E6%8A%80%E5%B7%A7%EF%BC%9A%E5%88%A9%E7%94%A8Feuture%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%A4%9A%E4%B8%AA%E7%BA%BF%E7%A8%8B%E4%B8%80%E8%B5%B7%E6%89%A7%E8%A1%8C/%E5%B0%8F%E6%8A%80%E5%B7%A7%EF%BC%9A%E5%88%A9%E7%94%A8Feuture%E7%BA%BF%E7%A8%8B%E6%B1%A0%E5%A4%9A%E4%B8%AA%E7%BA%BF%E7%A8%8B%E4%B8%80%E8%B5%B7%E6%89%A7%E8%A1%8C.html"}],["meta",{"property":"og:site_name","content":"Jankin'Blog"}],["meta",{"property":"og:title","content":"小技巧：利用Feuture线程池多个线程一起执行"}],["meta",{"property":"og:description","content":"小技巧：利用Feuture线程池多个线程一起执行 private List&lt;DbjdSyTjVo&gt; getZgTjjg(SyTjDTO dto, List&lt;String&gt; corpIdList) throws ExecutionException, InterruptedException { List&lt;DbjdSyTjVo&gt; tjjgList; // 拿到线程池，两个线程同时进行统计 ExecutorService executor = Executors.newFixedThreadPool(2); Future&lt;List&lt;DbjdSyTjVo&gt;&gt; futureA = executor.submit( () -&gt; zxjdxxMapper.listSyZgjdTjA(dto.getKssj(), dto.getJssj(), corpIdList)); Future&lt;List&lt;DbjdSyTjVo&gt;&gt; futureF = executor.submit( () -&gt; zxjdxxMapper.listSyZgjdTjF(dto.getKssj(), dto.getJssj(), corpIdList)); // 组装两次的结果 tjjgList = futureA.get(); tjjgList.addAll(futureF.get()); return tjjgList; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-15T12:17:26.000Z"}],["meta",{"property":"article:author","content":"JanKin Xie"}],["meta",{"property":"article:modified_time","content":"2023-06-15T12:17:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"小技巧：利用Feuture线程池多个线程一起执行\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-15T12:17:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"JanKin Xie\\",\\"url\\":\\"\\"}]}"]]},"headers":[],"git":{"createdTime":1686831446000,"updatedTime":1686831446000,"contributors":[{"name":"xiezhongcai","email":"xiezhongcai@thunisoft.com","commits":1}]},"readingTime":{"minutes":0.32,"words":96},"filePathRelative":"杂记/小技巧：利用Feuture线程池多个线程一起执行/小技巧：利用Feuture线程池多个线程一起执行.md","localizedDate":"2023年6月15日","excerpt":"<h1> 小技巧：利用Feuture线程池多个线程一起执行</h1>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">private</span> <span class=\\"token class-name\\">List</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">DbjdSyTjVo</span><span class=\\"token punctuation\\">&gt;</span></span> <span class=\\"token function\\">getZgTjjg</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">SyTjDTO</span> dto<span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">List</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span> corpIdList<span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">throws</span> <span class=\\"token class-name\\">ExecutionException</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">InterruptedException</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">List</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">DbjdSyTjVo</span><span class=\\"token punctuation\\">&gt;</span></span> tjjgList<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token comment\\">// 拿到线程池，两个线程同时进行统计</span>\\n        <span class=\\"token class-name\\">ExecutorService</span> executor <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Executors</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">newFixedThreadPool</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">Future</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">List</span><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">DbjdSyTjVo</span><span class=\\"token punctuation\\">&gt;</span><span class=\\"token punctuation\\">&gt;</span></span> futureA <span class=\\"token operator\\">=</span> executor<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">submit</span><span class=\\"token punctuation\\">(</span>\\n                <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">-&gt;</span> zxjdxxMapper<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">listSyZgjdTjA</span><span class=\\"token punctuation\\">(</span>dto<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getKssj</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> dto<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getJssj</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> corpIdList<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">Future</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">List</span><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">DbjdSyTjVo</span><span class=\\"token punctuation\\">&gt;</span><span class=\\"token punctuation\\">&gt;</span></span> futureF <span class=\\"token operator\\">=</span> executor<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">submit</span><span class=\\"token punctuation\\">(</span>\\n                <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">-&gt;</span> zxjdxxMapper<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">listSyZgjdTjF</span><span class=\\"token punctuation\\">(</span>dto<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getKssj</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> dto<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getJssj</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> corpIdList<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token comment\\">// 组装两次的结果</span>\\n        tjjgList <span class=\\"token operator\\">=</span> futureA<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        tjjgList<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">addAll</span><span class=\\"token punctuation\\">(</span>futureF<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">return</span> tjjgList<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{n as data};
