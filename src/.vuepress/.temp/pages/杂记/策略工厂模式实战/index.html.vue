<template><div><h1 id="策略-工厂模式实战" tabindex="-1"><a class="header-anchor" href="#策略-工厂模式实战" aria-hidden="true">#</a> 策略+工厂模式实战</h1>
<p>背景：电子卷宗平台之前是走的消息平台来调用，现在会陆陆续续改成http调用的方式，先从删除接口开始，为了以后的拓展用到了策略工厂模式</p>
<h4 id="策略接口" tabindex="-1"><a class="header-anchor" href="#策略接口" aria-hidden="true">#</a> 策略接口</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wszx<span class="token punctuation">.</span>dzjz<span class="token punctuation">.</span>strategy</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wszx<span class="token punctuation">.</span>dzjz<span class="token punctuation">.</span>dto<span class="token punctuation">.</span></span><span class="token class-name">DzjzHandleWsDTO</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">ResponseEntity</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * IDzjzHandleWsStrategy
 *
 * @Description 电子卷宗操作文书
 * <span class="token keyword">@author</span> XieZhongCai
 * <span class="token keyword">@date</span> 2022/9/22 17:01
 * <span class="token keyword">@version</span> v1.7.6-湖南紧急需求
 **/</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IDzjzHandleWsStrategy</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * IDzjzHandleWsStrategy
     *
     * <span class="token keyword">@description</span> 根据卷宗传过来的参数操作对应的事件
     * <span class="token keyword">@param</span> <span class="token parameter">dto</span> 参数类
     * <span class="token keyword">@return</span> ResponseEntity<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Void</span><span class="token punctuation">></span></span>
     * <span class="token keyword">@author</span> XieZhongCai
     * <span class="token keyword">@date</span> 2022/9/22 17:02
     * <span class="token keyword">@version</span> v1.7.6-湖南紧急需求
     */</span>
    <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">DzjzHandleWsDTO</span> dto<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="删除策略实现" tabindex="-1"><a class="header-anchor" href="#删除策略实现" aria-hidden="true">#</a> 删除策略实现</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wszx<span class="token punctuation">.</span>dzjz<span class="token punctuation">.</span>strategy</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>fastjson<span class="token punctuation">.</span></span><span class="token class-name">JSON</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wszx<span class="token punctuation">.</span>dzjz<span class="token punctuation">.</span>dto<span class="token punctuation">.</span></span><span class="token class-name">DeleteMsgBody</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wszx<span class="token punctuation">.</span>dzjz<span class="token punctuation">.</span>dto<span class="token punctuation">.</span></span><span class="token class-name">DzjzHandleWsDTO</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wszx<span class="token punctuation">.</span>writ<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">ZxWsService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>lang3<span class="token punctuation">.</span></span><span class="token class-name">ObjectUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">ResponseEntity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Resource</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Arrays</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>stream<span class="token punctuation">.</span></span><span class="token class-name">Collectors</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * DeleteWsStrategy
 *
 * @Description 同步删除文书
 * <span class="token keyword">@author</span> XieZhongCai
 * <span class="token keyword">@date</span> 2022/9/22 17:04
 * <span class="token keyword">@version</span> v1.7.6-湖南紧急需求
 **/</span>
<span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DeleteWsStrategy</span> <span class="token keyword">implements</span> <span class="token class-name">IDzjzHandleWsStrategy</span><span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">ZxWsService</span> zxWsService<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * DeleteWsStrategy
     *
     * <span class="token keyword">@description</span> 同步删除文书
     * <span class="token keyword">@param</span> <span class="token parameter">dto</span> 参数类
     * <span class="token keyword">@return</span> ResponseEntity<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Void</span><span class="token punctuation">></span></span>
     * <span class="token keyword">@author</span> XieZhongCai
     * <span class="token keyword">@date</span> 2022/9/22 17:41
     * <span class="token keyword">@version</span> v1.7.6-湖南紧急需求
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">DzjzHandleWsDTO</span> dto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"请求开始，电子签章删除材料的同时删掉文书，请求参数：{}"</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">toJSONString</span><span class="token punctuation">(</span>dto<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">DeleteMsgBody</span> msgBody <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parseObject</span><span class="token punctuation">(</span>dto<span class="token punctuation">.</span><span class="token function">getMsgBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">DeleteMsgBody</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> clIds <span class="token operator">=</span> msgBody<span class="token punctuation">.</span><span class="token function">getClIds</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 批量删除文书</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">ObjectUtils</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span>clIds<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> wsbhs <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>clIds<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            count <span class="token operator">=</span> zxWsService<span class="token punctuation">.</span><span class="token function">batchDelete</span><span class="token punctuation">(</span>wsbhs<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">long</span> endTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"请求结束，电子签章删除材料的同时删掉文书，删掉{}份文书，耗时{}ms"</span><span class="token punctuation">,</span> count<span class="token punctuation">,</span> endTime <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="工厂类" tabindex="-1"><a class="header-anchor" href="#工厂类" aria-hidden="true">#</a> 工厂类</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wszx<span class="token punctuation">.</span>dzjz<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wszx<span class="token punctuation">.</span>dzjz<span class="token punctuation">.</span>strategy<span class="token punctuation">.</span></span><span class="token class-name">DeleteWsStrategy</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wszx<span class="token punctuation">.</span>dzjz<span class="token punctuation">.</span>strategy<span class="token punctuation">.</span></span><span class="token class-name">IDzjzHandleWsStrategy</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span></span><span class="token class-name">ApplicationContext</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PostConstruct</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Resource</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">HashMap</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * DzjzHandleStrategyFacory
 *
 * @Description DzjzHandleStrategyFacory
 * <span class="token keyword">@author</span> XieZhongCai
 * <span class="token keyword">@date</span> 2022/9/22 17:27
 * <span class="token keyword">@version</span> v1.7.6-湖南紧急需求
 **/</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">DzjzHandleStrategyFacory</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">ApplicationContext</span> appContext<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">DzjzHandleStrategyFacory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">interface</span> <span class="token class-name">OptionKey</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> <span class="token constant">DELETE</span> <span class="token operator">=</span> <span class="token string">"dzjzMaterialChange&amp;delete"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">IDzjzHandleWsStrategy</span><span class="token punctuation">></span></span> <span class="token constant">OPTIONS</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">OPTIONS</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">OptionKey</span><span class="token punctuation">.</span><span class="token constant">DELETE</span><span class="token punctuation">,</span> appContext<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">DeleteWsStrategy</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * DzjzHandleStrategyFacory
     *
     * <span class="token keyword">@description</span> 根据参数获取对应的策略类
     * <span class="token keyword">@param</span> <span class="token parameter">topic</span> 事件
     * <span class="token keyword">@param</span> <span class="token parameter">tag</span> 标记
     * <span class="token keyword">@return</span> IDzjzHandleWsStrategy
     * <span class="token keyword">@author</span> XieZhongCai
     * <span class="token keyword">@date</span> 2022/9/22 17:33
     * <span class="token keyword">@version</span> v1.7.6-湖南紧急需求
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">IDzjzHandleWsStrategy</span> <span class="token function">getStrategy</span><span class="token punctuation">(</span><span class="token class-name">String</span> topic<span class="token punctuation">,</span> <span class="token class-name">String</span> tag<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> optionKey <span class="token operator">=</span> topic <span class="token operator">+</span> <span class="token string">"&amp;"</span> <span class="token operator">+</span> tag<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token constant">OPTIONS</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>optionKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="对外提供接口" tabindex="-1"><a class="header-anchor" href="#对外提供接口" aria-hidden="true">#</a> 对外提供接口</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wszx<span class="token punctuation">.</span>dzjz<span class="token punctuation">.</span>controller</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wszx<span class="token punctuation">.</span>dzjz<span class="token punctuation">.</span>dto<span class="token punctuation">.</span></span><span class="token class-name">DzjzHandleWsDTO</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wszx<span class="token punctuation">.</span>dzjz<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">DzjzHandleStrategyFacory</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wszx<span class="token punctuation">.</span>dzjz<span class="token punctuation">.</span>strategy<span class="token punctuation">.</span></span><span class="token class-name">IDzjzHandleWsStrategy</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">io<span class="token punctuation">.</span>swagger<span class="token punctuation">.</span>annotations<span class="token punctuation">.</span></span><span class="token class-name">Api</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">io<span class="token punctuation">.</span>swagger<span class="token punctuation">.</span>annotations<span class="token punctuation">.</span></span><span class="token class-name">ApiOperation</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">ResponseEntity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PostMapping</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RequestBody</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RequestMapping</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RestController</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token keyword">static</span> <span class="token import static"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>t3<span class="token punctuation">.</span>t3e<span class="token punctuation">.</span>constants<span class="token punctuation">.</span></span><span class="token class-name">VersionApi</span><span class="token punctuation">.</span><span class="token static">API_V1</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * DzjzHandleWsController
 *
 * @Description 供电子卷宗操作文书Controller
 * <span class="token keyword">@author</span> XieZhongCai
 * <span class="token keyword">@date</span> 2022/9/22 10:42
 * <span class="token keyword">@version</span> v1.7.6-湖南紧急需求
 **/</span>
<span class="token annotation punctuation">@Api</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"供电子卷宗操作文书"</span><span class="token punctuation">,</span> tags <span class="token operator">=</span> <span class="token string">"供电子卷宗操作文书"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@RequestMapping</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DzjzHandleWsController</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * DzjzHandleWsController
     *
     * <span class="token keyword">@description</span> 电子签章操作文书
     * <span class="token keyword">@param</span> <span class="token parameter">dto</span> 参数类
     * <span class="token keyword">@author</span> XieZhongCai
     * <span class="token keyword">@date</span> 2022/9/22 11:35
     * <span class="token keyword">@version</span> v1.7.6-湖南紧急需求
     */</span>
    <span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token constant">API_V1</span> <span class="token operator">+</span> <span class="token string">"/dwjk/ws/actions/handle"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"电子签章操作文书"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> <span class="token function">deleteWsByDzjz</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">DzjzHandleWsDTO</span> dto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">IDzjzHandleWsStrategy</span> strategy <span class="token operator">=</span> <span class="token class-name">DzjzHandleStrategyFacory</span><span class="token punctuation">.</span><span class="token function">getStrategy</span><span class="token punctuation">(</span>dto<span class="token punctuation">.</span><span class="token function">getTopic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> dto<span class="token punctuation">.</span><span class="token function">getTag</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>strategy <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> strategy<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>dto<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


