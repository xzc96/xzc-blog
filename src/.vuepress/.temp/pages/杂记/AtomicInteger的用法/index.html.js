export const data = JSON.parse("{\"key\":\"v-633f6c70\",\"path\":\"/%E6%9D%82%E8%AE%B0/AtomicInteger%E7%9A%84%E7%94%A8%E6%B3%95/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"看下面这段代码有没有线程安全问题 package com.thunisoft.zx.zxznglxt.znfx.impl; /** * Example * * @description TODO * @author XieZhongCai * @date 2023/5/5 14:55 * @version v1.0.2 **/ import java.util.concurrent.atomic.AtomicInteger; public class Example { private AtomicInteger refCount = new AtomicInteger(4); public void test() { System.out.println(\\\"Thread \\\" + Thread.currentThread().getId() +\\\"进入时，refCount是\\\" + refCount.get()); if (refCount.compareAndSet(0, refCount.decrementAndGet())) { System.out.println(\\\"Thread \\\" + Thread.currentThread().getId() + \\\" entered if block\\\"); } else { System.out.println(\\\"Thread \\\" + Thread.currentThread().getId() + \\\" did not enter if block\\\"); } System.out.println(\\\"Thread \\\" + Thread.currentThread().getId() +\\\"出去时，refCount是\\\" + refCount.get()); } public static void main(String[] args) { Example example = new Example(); for (int i = 0; i &lt; 10; i++) { new Thread(() -&gt; { try { Thread.sleep(500); // 增加延时操作，使得线程间的竞争更明显 example.test(); } catch (InterruptedException e) { e.printStackTrace(); } }).start(); } } }\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/%E6%9D%82%E8%AE%B0/AtomicInteger%E7%9A%84%E7%94%A8%E6%B3%95/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Jankin'Blog\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"看下面这段代码有没有线程安全问题 package com.thunisoft.zx.zxznglxt.znfx.impl; /** * Example * * @description TODO * @author XieZhongCai * @date 2023/5/5 14:55 * @version v1.0.2 **/ import java.util.concurrent.atomic.AtomicInteger; public class Example { private AtomicInteger refCount = new AtomicInteger(4); public void test() { System.out.println(\\\"Thread \\\" + Thread.currentThread().getId() +\\\"进入时，refCount是\\\" + refCount.get()); if (refCount.compareAndSet(0, refCount.decrementAndGet())) { System.out.println(\\\"Thread \\\" + Thread.currentThread().getId() + \\\" entered if block\\\"); } else { System.out.println(\\\"Thread \\\" + Thread.currentThread().getId() + \\\" did not enter if block\\\"); } System.out.println(\\\"Thread \\\" + Thread.currentThread().getId() +\\\"出去时，refCount是\\\" + refCount.get()); } public static void main(String[] args) { Example example = new Example(); for (int i = 0; i &lt; 10; i++) { new Thread(() -&gt; { try { Thread.sleep(500); // 增加延时操作，使得线程间的竞争更明显 example.test(); } catch (InterruptedException e) { e.printStackTrace(); } }).start(); } } }\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"JanKin Xie\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"JanKin Xie\\\",\\\"url\\\":\\\"\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"看下面这段代码有没有线程安全问题\",\"slug\":\"看下面这段代码有没有线程安全问题\",\"link\":\"#看下面这段代码有没有线程安全问题\",\"children\":[]}],\"readingTime\":{\"minutes\":1.31,\"words\":394},\"filePathRelative\":\"杂记/AtomicInteger的用法/README.md\",\"excerpt\":\"<h2> 看下面这段代码有没有线程安全问题</h2>\\n<div class=\\\"language-java line-numbers-mode\\\" data-ext=\\\"java\\\"><pre class=\\\"language-java\\\"><code><span class=\\\"token keyword\\\">package</span> <span class=\\\"token namespace\\\">com<span class=\\\"token punctuation\\\">.</span>thunisoft<span class=\\\"token punctuation\\\">.</span>zx<span class=\\\"token punctuation\\\">.</span>zxznglxt<span class=\\\"token punctuation\\\">.</span>znfx<span class=\\\"token punctuation\\\">.</span>impl</span><span class=\\\"token punctuation\\\">;</span>\\n\\n<span class=\\\"token doc-comment comment\\\">/**\\n * Example\\n *\\n * <span class=\\\"token keyword\\\">@description</span> TODO\\n * <span class=\\\"token keyword\\\">@author</span> XieZhongCai\\n * <span class=\\\"token keyword\\\">@date</span> 2023/5/5 14:55\\n * <span class=\\\"token keyword\\\">@version</span> v1.0.2\\n **/</span>\\n<span class=\\\"token keyword\\\">import</span> <span class=\\\"token import\\\"><span class=\\\"token namespace\\\">java<span class=\\\"token punctuation\\\">.</span>util<span class=\\\"token punctuation\\\">.</span>concurrent<span class=\\\"token punctuation\\\">.</span>atomic<span class=\\\"token punctuation\\\">.</span></span><span class=\\\"token class-name\\\">AtomicInteger</span></span><span class=\\\"token punctuation\\\">;</span>\\n\\n<span class=\\\"token keyword\\\">public</span> <span class=\\\"token keyword\\\">class</span> <span class=\\\"token class-name\\\">Example</span> <span class=\\\"token punctuation\\\">{</span>\\n\\n    <span class=\\\"token keyword\\\">private</span> <span class=\\\"token class-name\\\">AtomicInteger</span> refCount <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token class-name\\\">AtomicInteger</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token number\\\">4</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n\\n    <span class=\\\"token keyword\\\">public</span> <span class=\\\"token keyword\\\">void</span> <span class=\\\"token function\\\">test</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token class-name\\\">System</span><span class=\\\"token punctuation\\\">.</span>out<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">println</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token string\\\">\\\"Thread \\\"</span> <span class=\\\"token operator\\\">+</span> <span class=\\\"token class-name\\\">Thread</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">currentThread</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">getId</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">+</span><span class=\\\"token string\\\">\\\"进入时，refCount是\\\"</span> <span class=\\\"token operator\\\">+</span> refCount<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">get</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">if</span> <span class=\\\"token punctuation\\\">(</span>refCount<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">compareAndSet</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">,</span> refCount<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">decrementAndGet</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token class-name\\\">System</span><span class=\\\"token punctuation\\\">.</span>out<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">println</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token string\\\">\\\"Thread \\\"</span> <span class=\\\"token operator\\\">+</span> <span class=\\\"token class-name\\\">Thread</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">currentThread</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">getId</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">+</span> <span class=\\\"token string\\\">\\\" entered if block\\\"</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span> <span class=\\\"token keyword\\\">else</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token class-name\\\">System</span><span class=\\\"token punctuation\\\">.</span>out<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">println</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token string\\\">\\\"Thread \\\"</span> <span class=\\\"token operator\\\">+</span> <span class=\\\"token class-name\\\">Thread</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">currentThread</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">getId</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">+</span> <span class=\\\"token string\\\">\\\" did not enter if block\\\"</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n        <span class=\\\"token class-name\\\">System</span><span class=\\\"token punctuation\\\">.</span>out<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">println</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token string\\\">\\\"Thread \\\"</span> <span class=\\\"token operator\\\">+</span> <span class=\\\"token class-name\\\">Thread</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">currentThread</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">getId</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">+</span><span class=\\\"token string\\\">\\\"出去时，refCount是\\\"</span> <span class=\\\"token operator\\\">+</span> refCount<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">get</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n\\n    <span class=\\\"token keyword\\\">public</span> <span class=\\\"token keyword\\\">static</span> <span class=\\\"token keyword\\\">void</span> <span class=\\\"token function\\\">main</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">String</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> args<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n        <span class=\\\"token class-name\\\">Example</span> example <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token class-name\\\">Example</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token keyword\\\">for</span> <span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">int</span> i <span class=\\\"token operator\\\">=</span> <span class=\\\"token number\\\">0</span><span class=\\\"token punctuation\\\">;</span> i <span class=\\\"token operator\\\">&lt;</span> <span class=\\\"token number\\\">10</span><span class=\\\"token punctuation\\\">;</span> i<span class=\\\"token operator\\\">++</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n            <span class=\\\"token keyword\\\">new</span> <span class=\\\"token class-name\\\">Thread</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span> <span class=\\\"token operator\\\">-&gt;</span> <span class=\\\"token punctuation\\\">{</span>\\n                <span class=\\\"token keyword\\\">try</span> <span class=\\\"token punctuation\\\">{</span>\\n                    <span class=\\\"token class-name\\\">Thread</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">sleep</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token number\\\">500</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span> <span class=\\\"token comment\\\">// 增加延时操作，使得线程间的竞争更明显</span>\\n                    example<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">test</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n                <span class=\\\"token punctuation\\\">}</span> <span class=\\\"token keyword\\\">catch</span> <span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">InterruptedException</span> e<span class=\\\"token punctuation\\\">)</span> <span class=\\\"token punctuation\\\">{</span>\\n                    e<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">printStackTrace</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n                <span class=\\\"token punctuation\\\">}</span>\\n            <span class=\\\"token punctuation\\\">}</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">start</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n        <span class=\\\"token punctuation\\\">}</span>\\n    <span class=\\\"token punctuation\\\">}</span>\\n<span class=\\\"token punctuation\\\">}</span>\\n\\n\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
