<template><div><p>小技巧：将json配置文件放在后端项目里面使用</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>&lt;!-- hutool工具包 start -->
    &lt;dependency>
    &lt;groupId>cn.hutool&lt;/groupId>
    &lt;artifactId>hutool-all&lt;/artifactId>
    &lt;version>5.7.9&lt;/version>
    &lt;/dependency>
&lt;!-- hutool工具包 end -->
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里用到了hutool工具包的工具，</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">ZDY_JDXX_CONFIG_PATH</span> <span class="token operator">=</span> <span class="token string">"jdxx/ZdyJdxx.json"</span><span class="token punctuation">;</span>

<span class="token class-name">JSONArray</span> jdgzInfo <span class="token operator">=</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">parseArray</span><span class="token punctuation">(</span><span class="token class-name">ResourceUtil</span><span class="token punctuation">.</span><span class="token function">readUtf8Str</span><span class="token punctuation">(</span><span class="token constant">ZDY_JDXX_CONFIG_PATH</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JdgzxxVO</span><span class="token punctuation">></span></span> result <span class="token operator">=</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span>jdgzInfo<span class="token punctuation">,</span> <span class="token class-name">JdgzxxVO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该json文件放在resources/jdxx下面</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>zxfz<span class="token punctuation">.</span>qlczxjg<span class="token punctuation">.</span>model<span class="token punctuation">.</span>vo</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">io<span class="token punctuation">.</span>swagger<span class="token punctuation">.</span>annotations<span class="token punctuation">.</span></span><span class="token class-name">ApiModel</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">AllArgsConstructor</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">NoArgsConstructor</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * JdgzxxVO
 *
 * @Description 节点挂载信息VO
 * <span class="token keyword">@author</span> XieZhongCai
 * <span class="token keyword">@date</span> 2023/2/16 10:52
 * <span class="token keyword">@version</span> v1.1.0
 **/</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@ApiModel</span><span class="token punctuation">(</span><span class="token string">"节点挂载信息VO"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JdgzxxVO</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> order<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Jdxx</span><span class="token punctuation">></span></span> jdxx<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Data</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Jdxx</span><span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> jdmc<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> jddm<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> order<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">DbjdSyTjVo</span> syTjVo<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"财产查询"</span><span class="token punctuation">,</span>
    <span class="token property">"order"</span><span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>
    <span class="token property">"jdxx"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">"jdmc"</span><span class="token operator">:</span> <span class="token string">"线下查控财产登记节点"</span><span class="token punctuation">,</span>
        <span class="token property">"jddm"</span><span class="token operator">:</span> <span class="token string">"Z0001"</span><span class="token punctuation">,</span>
        <span class="token property">"order"</span><span class="token operator">:</span> <span class="token string">"1-1"</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"财产处置"</span><span class="token punctuation">,</span>
    <span class="token property">"order"</span><span class="token operator">:</span> <span class="token string">"2"</span><span class="token punctuation">,</span>
    <span class="token property">"jdxx"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">"jdmc"</span><span class="token operator">:</span> <span class="token string">"查封/扣押时限"</span><span class="token punctuation">,</span>
        <span class="token property">"jddm"</span><span class="token operator">:</span> <span class="token string">"Z0002"</span><span class="token punctuation">,</span>
        <span class="token property">"order"</span><span class="token operator">:</span> <span class="token string">"2-1"</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"财产变现"</span><span class="token punctuation">,</span>
    <span class="token property">"order"</span><span class="token operator">:</span> <span class="token string">"3"</span><span class="token punctuation">,</span>
    <span class="token property">"jdxx"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">"jdmc"</span><span class="token operator">:</span> <span class="token string">"拍卖时限"</span><span class="token punctuation">,</span>
        <span class="token property">"jddm"</span><span class="token operator">:</span> <span class="token string">"Z0003"</span><span class="token punctuation">,</span>
        <span class="token property">"order"</span><span class="token operator">:</span> <span class="token string">"3-1"</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"终本管理"</span><span class="token punctuation">,</span>
    <span class="token property">"order"</span><span class="token operator">:</span> <span class="token string">"4"</span><span class="token punctuation">,</span>
    <span class="token property">"jdxx"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">"jdmc"</span><span class="token operator">:</span> <span class="token string">"终本合规节点"</span><span class="token punctuation">,</span>
        <span class="token property">"jddm"</span><span class="token operator">:</span> <span class="token string">"Z0004"</span><span class="token punctuation">,</span>
        <span class="token property">"order"</span><span class="token operator">:</span> <span class="token string">"4-1"</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


