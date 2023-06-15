<template><div><h1 id="一种计算更优雅的写法" tabindex="-1"><a class="header-anchor" href="#一种计算更优雅的写法" aria-hidden="true">#</a> 一种计算更优雅的写法</h1>
<p>代码优化前：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>result<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>gjjd <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> jc <span class="token operator">=</span> jcMap<span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span>gjjd<span class="token punctuation">.</span><span class="token function">getJddm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> xz <span class="token operator">=</span> xzMap<span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span>gjjd<span class="token punctuation">.</span><span class="token function">getJddm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> zj <span class="token operator">=</span> jc <span class="token operator">+</span> xz<span class="token punctuation">;</span>
            <span class="token keyword">int</span> fk <span class="token operator">=</span> gjjd<span class="token punctuation">.</span><span class="token function">getFk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> wfk <span class="token operator">=</span> gjjd<span class="token punctuation">.</span><span class="token function">getWfk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> fkTotal <span class="token operator">=</span> fk <span class="token operator">+</span> wfk<span class="token punctuation">;</span>
            <span class="token keyword">float</span> fkl <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span> fk <span class="token operator">/</span> fkTotal<span class="token punctuation">;</span>
            <span class="token class-name">DecimalFormat</span> df <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DecimalFormat</span><span class="token punctuation">(</span><span class="token string">"0.00"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            df<span class="token punctuation">.</span><span class="token function">setRoundingMode</span><span class="token punctuation">(</span><span class="token class-name">RoundingMode</span><span class="token punctuation">.</span><span class="token constant">HALF_UP</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 计算反馈率、总计、未反馈数；翻译节点代码</span>
            gjjd<span class="token punctuation">.</span><span class="token function">setFkl</span><span class="token punctuation">(</span>fk <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> fkTotal <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token string">"0.00%"</span> <span class="token operator">:</span> df<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>fkl <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"%"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            gjjd<span class="token punctuation">.</span><span class="token function">setXz</span><span class="token punctuation">(</span>xz<span class="token punctuation">)</span><span class="token punctuation">;</span>
            gjjd<span class="token punctuation">.</span><span class="token function">setJc</span><span class="token punctuation">(</span>jc<span class="token punctuation">)</span><span class="token punctuation">;</span>
            gjjd<span class="token punctuation">.</span><span class="token function">setZj</span><span class="token punctuation">(</span>zj<span class="token punctuation">)</span><span class="token punctuation">;</span>
            gjjd<span class="token punctuation">.</span><span class="token function">setWfk</span><span class="token punctuation">(</span>wfk<span class="token punctuation">)</span><span class="token punctuation">;</span>
            gjjd<span class="token punctuation">.</span><span class="token function">setJdmc</span><span class="token punctuation">(</span><span class="token class-name">JddmEnum</span><span class="token punctuation">.</span><span class="token function">translateByCode</span><span class="token punctuation">(</span>gjjd<span class="token punctuation">.</span><span class="token function">getJddm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：其中总计就是新增和旧存的和，而反馈率也是通过其它的成员变量计算出来的；可以这么些，更优雅：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token punctuation">[</span>service<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">]</span>
result<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>gjjd <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> jc <span class="token operator">=</span> jcMap<span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span>gjjd<span class="token punctuation">.</span><span class="token function">getJddm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> xz <span class="token operator">=</span> xzMap<span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span>gjjd<span class="token punctuation">.</span><span class="token function">getJddm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            gjjd<span class="token punctuation">.</span><span class="token function">setXz</span><span class="token punctuation">(</span>xz<span class="token punctuation">)</span><span class="token punctuation">;</span>
            gjjd<span class="token punctuation">.</span><span class="token function">setJc</span><span class="token punctuation">(</span>jc<span class="token punctuation">)</span><span class="token punctuation">;</span>
            gjjd<span class="token punctuation">.</span><span class="token function">setJdmc</span><span class="token punctuation">(</span><span class="token class-name">JddmEnum</span><span class="token punctuation">.</span><span class="token function">translateByCode</span><span class="token punctuation">(</span>gjjd<span class="token punctuation">.</span><span class="token function">getJddm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">[</span><span class="token constant">VO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">]</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@Builder</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DbjdSyGjjdTjVo</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 节点代码
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> jddm<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 节点名称
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> jdmc<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/** 旧存 **/</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> jc<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/** 新增 **/</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> xz<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/** 总计 **/</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> zj<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 计算总计，总计=新增+旧存
     * <span class="token keyword">@return</span> 总计
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">getZj</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> jc <span class="token operator">+</span> xz<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/** 反馈 **/</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> fk<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/** 未反馈 **/</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> wfk<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/** 反馈率 **/</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> fkl<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 计算反馈率，反馈率=已反馈/已反馈+未反馈
     * <span class="token keyword">@return</span> 反馈率
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getFkl</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> fkTotal <span class="token operator">=</span> fk <span class="token operator">+</span> wfk<span class="token punctuation">;</span>
        <span class="token keyword">float</span> fkl <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span> fk <span class="token operator">/</span> fkTotal<span class="token punctuation">;</span>
        <span class="token class-name">DecimalFormat</span> df <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DecimalFormat</span><span class="token punctuation">(</span><span class="token string">"0.00"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        df<span class="token punctuation">.</span><span class="token function">setRoundingMode</span><span class="token punctuation">(</span><span class="token class-name">RoundingMode</span><span class="token punctuation">.</span><span class="token constant">HALF_UP</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> fk <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> fkTotal <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token string">"0.00%"</span> <span class="token operator">:</span> df<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span>fkl <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"%"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


