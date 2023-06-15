<template><div><h1 id="expiringmap-轻量级的java缓存方式" tabindex="-1"><a class="header-anchor" href="#expiringmap-轻量级的java缓存方式" aria-hidden="true">#</a> ExpiringMap：轻量级的Java缓存方式</h1>
<h3 id="一、expiringmap" tabindex="-1"><a class="header-anchor" href="#一、expiringmap" aria-hidden="true">#</a> 一、ExpiringMap</h3>
<p>具有高性能、低开销、零依赖、线程安全、使用 ConcurrentMap 的实现过期 entries 等优点。<br>
其主要特点包括：过期策略、可变有效期、最大尺寸、侦听器过期、延迟输入加载、过期自省等。</p>
<h3 id="二、基本功能" tabindex="-1"><a class="header-anchor" href="#二、基本功能" aria-hidden="true">#</a> 二、基本功能</h3>
<p>1、可设置 Map 中的 Entry 在一段时间后自动过期。</p>
<p>2、可设置 Map 最大容纳值，当到达 Maximum size 后，再次插入值会导致 Map 中的第一个值过期。</p>
<p>3、可添加监听事件，在监听到 Entry 过期时调度监听函数。</p>
<p>4、可以设置懒加载，在调用 get() 方法时创建对象。</p>
<h3 id="三、使用方式" tabindex="-1"><a class="header-anchor" href="#三、使用方式" aria-hidden="true">#</a> 三、使用方式</h3>
<p><strong>1、pom.xml 中添加依赖</strong></p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- 带过期时间的Map结构，做缓存用--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>net.jodah<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>expiringmap<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.5.9<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2、创建静态方法</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CacheUtils</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 缓存用户信息
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ExpiringMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token constant">USER_INFO_MAP</span> <span class="token operator">=</span> <span class="token class-name">ExpiringMap</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">maxSize</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">expiration</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">HOURS</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">variableExpiration</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">expirationPolicy</span><span class="token punctuation">(</span><span class="token class-name">ExpirationPolicy</span><span class="token punctuation">.</span><span class="token constant">ACCESSED</span><span class="token punctuation">)</span>
              <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token doc-comment comment">/**
     * 缓存车牌颜色信息
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ExpiringMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token constant">PLATE_COLOR_MAP</span> <span class="token operator">=</span> <span class="token class-name">ExpiringMap</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">maxSize</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">expiration</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">HOURS</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">variableExpiration</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">expirationListener</span><span class="token punctuation">(</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>value<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"key:"</span> <span class="token operator">+</span> key <span class="token operator">+</span> <span class="token string">"已过期……"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">expirationPolicy</span><span class="token punctuation">(</span><span class="token class-name">ExpirationPolicy</span><span class="token punctuation">.</span><span class="token constant">ACCESSED</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>maxSize：Map存储的最大值，类似队列，容量固定，当操作map容量超出限制时，最开始的元素就会依次过期，只保留最新的；</p>
</li>
<li>
<p>expiration：过期时间；</p>
</li>
<li>
<p>expirationListener：过期监听；</p>
</li>
<li>
<p>expirationPolicy：过期策略，包括 ExpirationPolicy.ACCESSED 和 ExpirationPolicy.CREATED 两种；</p>
</li>
</ul>
<blockquote>
<p>1）ExpirationPolicy.ACCESSED ：每进行一次访问，过期时间就会自动清零，重新计算；</p>
<p>2）ExpirationPolicy.CREATED：在过期时间内重新 put 值的话，过期时间会清理，重新计算；</p>
</blockquote>
<p><strong>3、测试</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestMain</span> <span class="token punctuation">{</span>
 
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//存入元素</span>
        <span class="token class-name">CacheUtils</span><span class="token punctuation">.</span><span class="token constant">USER_INFO_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"00001"</span><span class="token punctuation">,</span><span class="token string">"zhangsan"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
        <span class="token comment">//取出元素</span>
        <span class="token class-name">String</span> userName <span class="token operator">=</span> <span class="token class-name">CacheUtils</span><span class="token punctuation">.</span><span class="token constant">USER_INFO_MAP</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"00001"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"userName："</span> <span class="token operator">+</span> userName<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
        <span class="token comment">//查询剩余过期时间</span>
        <span class="token keyword">long</span> expectedExpiration <span class="token operator">=</span> <span class="token class-name">CacheUtils</span><span class="token punctuation">.</span><span class="token constant">USER_INFO_MAP</span><span class="token punctuation">.</span><span class="token function">getExpectedExpiration</span><span class="token punctuation">(</span><span class="token string">"00001"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"剩余过期时间:"</span> <span class="token operator">+</span> expectedExpiration<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
        <span class="token comment">//查看设置的过期时间</span>
        <span class="token keyword">long</span> expiration <span class="token operator">=</span> <span class="token class-name">CacheUtils</span><span class="token punctuation">.</span><span class="token constant">USER_INFO_MAP</span><span class="token punctuation">.</span><span class="token function">getExpiration</span><span class="token punctuation">(</span><span class="token string">"00001"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"设置的过期时间："</span> <span class="token operator">+</span> expiration<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
 
结果打印：
userName：zhangsan
剩余过期时间<span class="token operator">:</span><span class="token number">43199999</span>
设置的过期时间：<span class="token number">43200000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4、实际项目中的使用</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wzhocr<span class="token punctuation">.</span>util</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>wzhocr<span class="token punctuation">.</span>model<span class="token punctuation">.</span>ctck<span class="token punctuation">.</span></span><span class="token class-name">BahtCtckCcxx</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>experimental<span class="token punctuation">.</span></span><span class="token class-name">UtilityClass</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">net<span class="token punctuation">.</span>jodah<span class="token punctuation">.</span>expiringmap<span class="token punctuation">.</span></span><span class="token class-name">ExpirationPolicy</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">net<span class="token punctuation">.</span>jodah<span class="token punctuation">.</span>expiringmap<span class="token punctuation">.</span></span><span class="token class-name">ExpiringMap</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * DzjzSbjgMap
 *
 * @Description 电子卷宗识别结果Map
 * <span class="token keyword">@author</span> XieZhongCai
 * <span class="token keyword">@date</span> 2021/12/9 13:59
 * <span class="token keyword">@version</span> v1.0.0
 **/</span>
<span class="token annotation punctuation">@UtilityClass</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DzjzSbjgCache</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 识别结果缓存
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ExpiringMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">BahtCtckCcxx</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token constant">SBJG_MAP</span><span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
         <span class="token constant">SBJG_MAP</span> <span class="token operator">=</span> <span class="token class-name">ExpiringMap</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">variableExpiration</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">expirationPolicy</span><span class="token punctuation">(</span><span class="token class-name">ExpirationPolicy</span><span class="token punctuation">.</span><span class="token constant">CREATED</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * DzjzSbjgCache
     *
     * <span class="token keyword">@description</span> 获取对象
     * <span class="token keyword">@return</span> 识别结果缓存
     * <span class="token keyword">@author</span> XieZhongCai
     * <span class="token keyword">@date</span> 2021/12/22 17:04
     * <span class="token keyword">@version</span> V1.0.3
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ExpiringMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">BahtCtckCcxx</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">SBJG_MAP</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用法：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
     * BahtCtckAsync
     *
     * <span class="token keyword">@description</span> 调用卷宗识别引擎
     * <span class="token keyword">@param</span>  <span class="token parameter">jlbh</span> 记录编号
     * <span class="token keyword">@param</span>  <span class="token parameter">scdz</span> 上传地址
     * <span class="token keyword">@param</span>  <span class="token parameter">currentUserId</span> 当前用户id
     * <span class="token keyword">@author</span> XieZhongCai
     * <span class="token keyword">@date</span> 2021/12/9 12:34
     * <span class="token keyword">@version</span> V1.0.3
     */</span>
    <span class="token annotation punctuation">@Async</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"taskScheduler"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">dyjzsbyq</span><span class="token punctuation">(</span><span class="token class-name">String</span> jlbh<span class="token punctuation">,</span> <span class="token class-name">String</span> scdz<span class="token punctuation">,</span> <span class="token class-name">String</span> currentUserId<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>

        <span class="token comment">// 1. 用PDF地址发起回填请求</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BahtCtckCcxx</span><span class="token punctuation">></span></span> bahtCtckCcxxes <span class="token operator">=</span> <span class="token function">httpToDjzjTableOcr</span><span class="token punctuation">(</span>jlbh<span class="token punctuation">,</span> scdz<span class="token punctuation">,</span> currentUserId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2. 识别结果构建财产信息落库</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span>bahtCtckCcxxes<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            ccxxMapper<span class="token punctuation">.</span><span class="token function">batchInsertBahtCtckCcxx</span><span class="token punctuation">(</span>bahtCtckCcxxes<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 3. 存放到缓存中,设置过期时间5分钟</span>
        <span class="token class-name">DzjzSbjgCache</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>jlbh<span class="token punctuation">,</span> bahtCtckCcxxes<span class="token punctuation">,</span>
                <span class="token class-name">ExpirationPolicy</span><span class="token punctuation">.</span><span class="token constant">ACCESSED</span><span class="token punctuation">,</span> <span class="token class-name">ZnhtConst</span><span class="token punctuation">.</span><span class="token constant">SBJG_EXPIRE_TIME</span><span class="token punctuation">,</span>
                <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token doc-comment comment">/**
     * BahtCtckCcxxService
     *
     * <span class="token keyword">@description</span> 查询识别结果
     * <span class="token keyword">@param</span> <span class="token parameter">jlBh</span> 记录编号
     * <span class="token keyword">@return</span> 识别结果
     * <span class="token keyword">@author</span> XieZhongCai
     * <span class="token keyword">@date</span> 2021/12/9 15:13
     * <span class="token keyword">@version</span> V1.0.3
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">BahtCtckSbjgVO</span> <span class="token function">getSbjg</span><span class="token punctuation">(</span><span class="token class-name">String</span> jlBh<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 有没有识别完成把数据放进去</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">DzjzSbjgCache</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>jlBh<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">BahtCtckSbjgVO</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">code</span><span class="token punctuation">(</span><span class="token class-name">ZnhtConst</span><span class="token punctuation">.</span><span class="token constant">SBZT_SBZ</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 从缓存中获取,取不到从数据库中查</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BahtCtckCcxx</span><span class="token punctuation">></span></span> ccxxList <span class="token operator">=</span> <span class="token class-name">DzjzSbjgCache</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>jlBh<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>ccxxList<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            ccxxList <span class="token operator">=</span> ccxxMapper<span class="token punctuation">.</span><span class="token function">getSbjg</span><span class="token punctuation">(</span>jlBh<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token class-name">BahtCtckSbjgVO</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">code</span><span class="token punctuation">(</span><span class="token class-name">ZnhtConst</span><span class="token punctuation">.</span><span class="token constant">SBZT_SBWC</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">ccxxList</span><span class="token punctuation">(</span>ccxxList<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


