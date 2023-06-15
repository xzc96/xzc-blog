<template><div><h3 id="threadlocal工具类" tabindex="-1"><a class="header-anchor" href="#threadlocal工具类" aria-hidden="true">#</a> ThreadLocal工具类</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>zbxc<span class="token punctuation">.</span>util</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>experimental<span class="token punctuation">.</span></span><span class="token class-name">UtilityClass</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">HashMap</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Optional</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * ThreadLocalUtil
 *
 * @Description ThreadLocalUtil工具类
 * <span class="token keyword">@author</span> XieZhongCai
 * <span class="token keyword">@date</span> 2021/8/18 15:54
 * <span class="token keyword">@version</span> v1.0.0
 **/</span>
<span class="token annotation punctuation">@UtilityClass</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ThreadLocalUtil</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Map</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token constant">THREAD_LOCAL</span> <span class="token operator">=</span> <span class="token class-name">ThreadLocal</span><span class="token punctuation">.</span><span class="token function">withInitial</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span>
            <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取所有
     * <span class="token keyword">@return</span> 获取所有
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">getThreadLocal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">THREAD_LOCAL</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取threadLocal中的对象
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> key
     * <span class="token keyword">@return</span> 获取threadLocal中的对象
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取threadLocal中的对象，赋予默认值
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> key
     * <span class="token keyword">@param</span> <span class="token parameter">defaultValue</span> 默认值
     * <span class="token keyword">@return</span> T
     */</span>
    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"unchecked"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">T</span> defaultValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token constant">THREAD_LOCAL</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">)</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">ofNullable</span><span class="token punctuation">(</span>map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span>defaultValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 存放值
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> key
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> value
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token constant">THREAD_LOCAL</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 设置整个Map
     * <span class="token keyword">@param</span> <span class="token parameter">keyValueMap</span> 整个Map
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> keyValueMap<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token constant">THREAD_LOCAL</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">putAll</span><span class="token punctuation">(</span>keyValueMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 清空ThreadLocal
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">THREAD_LOCAL</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 清楚某个key
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> key
     * <span class="token keyword">@return</span> T
     */</span>
    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"unchecked"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">T</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token constant">THREAD_LOCAL</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">)</span> map<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般搭配aop使用，比如：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>zbxc<span class="token punctuation">.</span>aop</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>zbxc<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">JajyService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>zbxc<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ThreadLocalUtil</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>aspectj<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">JoinPoint</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>aspectj<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Resource</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * JajyAspect
 *
 * @Description 调用结案校验方法的aop，为了能将根据案件编号查询的数据放到threadLocal里面
 * <span class="token keyword">@author</span> XieZhongCai
 * <span class="token keyword">@date</span> 2021/8/18 15:05
 * <span class="token keyword">@version</span> v1.0.0
 **/</span>
<span class="token annotation punctuation">@Aspect</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JajyAspect</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">JajyService</span> jajyService<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 织入点：jajy方法
     */</span>
    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">"execution(public * com.thunisoft.zbxc.service.JajyService.jajy(..))"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">jajyAop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 初始化
     * <span class="token keyword">@param</span> <span class="token parameter">jp</span> 可获取参数的类
     */</span>
    <span class="token annotation punctuation">@Before</span><span class="token punctuation">(</span><span class="token string">"jajyAop()"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doBefore</span><span class="token punctuation">(</span><span class="token class-name">JoinPoint</span> jp<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> ajbh <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>jp<span class="token punctuation">.</span><span class="token function">getArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jajyService<span class="token punctuation">.</span><span class="token function">initThreadLocalData</span><span class="token punctuation">(</span>ajbh<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 清空ThreadLocal
     */</span>
    <span class="token annotation punctuation">@After</span><span class="token punctuation">(</span><span class="token string">"jajyAop()"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAfter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">ThreadLocalUtil</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此处的应用场景是，需要对法官办理案件的质量进行校验，校验规则用双重责任连模式实现，分七个模块近70条规则，那么案件的基本信息给他放在ThreadLocal里面就不需要重复去数据库里面取了。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>zbxc<span class="token punctuation">.</span>aop</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>zbxc<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span><span class="token class-name">JajyService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>zbxc<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ThreadLocalUtil</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>aspectj<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">JoinPoint</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>aspectj<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Resource</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * JajyAspect
 *
 * @Description 调用结案校验方法的aop，为了能将根据案件编号查询的数据放到threadLocal里面
 * <span class="token keyword">@author</span> XieZhongCai
 * <span class="token keyword">@date</span> 2021/8/18 15:05
 * <span class="token keyword">@version</span> v1.0.0
 **/</span>
<span class="token annotation punctuation">@Aspect</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JajyAspect</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">JajyService</span> jajyService<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 织入点：jajy方法
     */</span>
    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">"execution(public * com.thunisoft.zbxc.service.JajyService.jajy(..))"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">jajyAop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 初始化
     * <span class="token keyword">@param</span> <span class="token parameter">jp</span> 可获取参数的类
     */</span>
    <span class="token annotation punctuation">@Before</span><span class="token punctuation">(</span><span class="token string">"jajyAop()"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doBefore</span><span class="token punctuation">(</span><span class="token class-name">JoinPoint</span> jp<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> ajbh <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>jp<span class="token punctuation">.</span><span class="token function">getArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jajyService<span class="token punctuation">.</span><span class="token function">initThreadLocalData</span><span class="token punctuation">(</span>ajbh<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 清空ThreadLocal
     */</span>
    <span class="token annotation punctuation">@After</span><span class="token punctuation">(</span><span class="token string">"jajyAop()"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAfter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">ThreadLocalUtil</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code v-pre>initThreadLocalData()</code>就是去初始化基本案件信息的</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
     * 将集约化多个规则都会用到的信息存到ThreadLocal里,避免多次查询
     * <span class="token keyword">@param</span> <span class="token parameter">ajbh</span> 案件编号
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">initJyhData</span><span class="token punctuation">(</span><span class="token class-name">String</span> ajbh<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 标的内容</span>
        <span class="token class-name">ThreadLocalUtil</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">JyhEnum</span><span class="token punctuation">.</span><span class="token constant">ZXBD</span><span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zxAjMapper<span class="token punctuation">.</span><span class="token function">getZxbdByAjbh</span><span class="token punctuation">(</span>ajbh<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 标的相关金额</span>
        <span class="token class-name">ThreadLocalUtil</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">JyhEnum</span><span class="token punctuation">.</span><span class="token constant">BDJE</span><span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zxAjMapper<span class="token punctuation">.</span><span class="token function">getBdJeByAjbh</span><span class="token punctuation">(</span>ajbh<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


