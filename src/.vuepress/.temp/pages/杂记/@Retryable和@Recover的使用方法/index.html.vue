<template><div><h1 id="retryable、-recover" tabindex="-1"><a class="header-anchor" href="#retryable、-recover" aria-hidden="true">#</a> @Retryable、@Recover</h1>
<h2 id="用来干啥的" tabindex="-1"><a class="header-anchor" href="#用来干啥的" aria-hidden="true">#</a> 用来干啥的</h2>
<p>给方法加上重试机制</p>
<h2 id="retryable怎么使用" tabindex="-1"><a class="header-anchor" href="#retryable怎么使用" aria-hidden="true">#</a> @Retryable怎么使用</h2>
<ol>
<li>引入依赖，</li>
</ol>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.retry<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-retry<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
 <span class="token comment">&lt;!--该组件是依赖于 AOP--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-aop<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.6.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>SpringBoot启动类添加注解</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableRetry</span>
<span class="token annotation punctuation">@EnableAspectJAutoProxy</span><span class="token punctuation">(</span>exposeProxy <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>方法添加注解</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IRetryServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">IRetryService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Retryable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>maxAttempts <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">,</span>backoff <span class="token operator">=</span> <span class="token annotation punctuation">@Backoff</span><span class="token punctuation">(</span>delay <span class="token operator">=</span> <span class="token number">3600</span><span class="token punctuation">,</span>multiplier <span class="token operator">=</span> <span class="token number">1.5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> code<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"current-time===============>"</span><span class="token operator">+</span> <span class="token class-name">DateUtil</span><span class="token punctuation">.</span><span class="token function">date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>code<span class="token operator">&lt;</span><span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"数字不能那个小于0"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">TRUE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>来简单解释一下注解中几个参数的含义：</p>
<ul>
<li>value：抛出指定异常才会重试</li>
<li>include：和value一样，默认为空，当exclude也为空时，默认所有异常</li>
<li>exclude：指定不处理的异常</li>
<li>maxAttempts：最大重试次数，默认3次</li>
<li>backoff：重试等待策略，默认使用@Backoff，@Backoff的value默认为1000L，我们设置为2000L；multiplier（指定延迟倍数）默认为0，表示固定暂停1秒后进行重试，如果把multiplier设置为1.5，则第一次重试为2秒，第二次为3秒，第三次为4.5秒。</li>
</ul>
<p><strong>当重试耗尽时还是失败，会出现什么情况呢？</strong></p>
<p>当重试耗尽时，RetryOperations可以将控制传递给另一个回调，即RecoveryCallback。Spring-Retry还提供了@Recover注解，用于@Retryable重试失败后处理方法。如果不需要回调方法，可以直接不写回调方法，那么实现的效果是，重试次数完了后，如果还是没成功没符合业务判断，就抛出异常。</p>
<h2 id="recover怎么使用" tabindex="-1"><a class="header-anchor" href="#recover怎么使用" aria-hidden="true">#</a> @Recover怎么使用</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
     * 重试次数耗尽，操作
     * <span class="token keyword">@param</span> <span class="token parameter">e</span> 异常信息
     * <span class="token keyword">@param</span> <span class="token parameter">param</span> 入卷参数
     * <span class="token keyword">@param</span> <span class="token parameter">tqbh</span> 审批编号
     */</span>
    <span class="token annotation punctuation">@Recover</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">testRecover</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">,</span> <span class="token class-name">RjParam</span> param<span class="token punctuation">,</span> <span class="token class-name">String</span> tqbh<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RjException</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"%s该提请记录下面三次尝试审批表文书副本入卷都失败"</span><span class="token punctuation">,</span> tqbh<span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到传参里面写的是 Exception e，这个是作为回调的接头暗号（重试次数用完了，还是失败，我们抛出这个Exception e通知触发这个回调方法）。对于@Recover注解的方法，需要特别注意的是：</p>
<ul>
<li>方法的返回值必须与@Retryable方法一致</li>
<li>方法的第一个参数，必须是Throwable类型的，建议是与@Retryable配置的异常一致，其他的参数，需要哪个参数，写进去就可以了（@Recover方法中有的）</li>
<li>该回调方法与重试方法写在同一个实现类里面</li>
</ul>
<h2 id="注意事项以及可能失效的场景" tabindex="-1"><a class="header-anchor" href="#注意事项以及可能失效的场景" aria-hidden="true">#</a> 注意事项以及可能失效的场景</h2>
<ul>
<li>由于是基于AOP实现，所以不支持类里自调用方法</li>
<li>如果重试失败需要给@Recover注解的方法做后续处理，那这个重试的方法不能有返回值，只能是void</li>
<li>方法内不能使用try catch，只能往外抛异常</li>
<li>@Recover注解来开启重试失败后调用的方法(注意,需跟重处理方法在同一个类中)，此注解注释的方法参数一定要是@Retryable抛出的异常，否则无法识别，可以在该方法中进行日志处理。</li>
</ul>
<h3 id="一、-retryable未生效可能原因" tabindex="-1"><a class="header-anchor" href="#一、-retryable未生效可能原因" aria-hidden="true">#</a> 一、@Retryable未生效可能原因</h3>
<ol>
<li>
<p>@Retryable方法必须为 <strong>public</strong></p>
</li>
<li>
<p>下面情况下@Retryable不生效，即重试方法与调用它的非重试方法在同一个类中。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableRetry</span><span class="token punctuation">(</span>proxyTargetClass <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> test<span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">methodA</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token function">methodB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token annotation punctuation">@Retryable</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">methodB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>个人是将重试方法单独写了一个Service。</p>
</li>
<li>
<p>每个类中对一种异常只有一个重试方法。个人测试两个重试方法捕捉Exception，重试失效。</p>
</li>
</ol>
<h3 id="二、-recover未生效可能原因" tabindex="-1"><a class="header-anchor" href="#二、-recover未生效可能原因" aria-hidden="true">#</a> 二、@Recover未生效可能原因</h3>
<p>①返回值<strong>必须和被重试的函数返回值一致</strong>；<br>
②参数中除了第一个是触发的异常外，后面的参数需要和被重试函数的参数列表一致；<br>
③当然这里的返回值部分也可以再做一次手动重试，但是已经尝试那么多次都失败了，所以在兜底函数中再做一次也意义不大。因此我的考虑是，这里就用来做日志记录就好。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * RetryableDzjzService
 *
 * @Description 调用电子卷宗，包一层自动重试
 * <span class="token keyword">@author</span> XieZhongCai
 * <span class="token keyword">@date</span> 2023/1/11 14:09
 * <span class="token keyword">@version</span> v1.1.4-patch1
 **/</span>
<span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RetryableDzjzService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">DzjzService</span> dzjzService<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * RetryableDzjzService
     *
     * <span class="token keyword">@description</span> 文书副本和审批表入卷，由于电子卷宗用ajbh加锁了
     * 且该方法是审批回调调用(无法控制只对一个案件编号下的一个文书进行审批)，所以进行3次重试
     * <span class="token keyword">@param</span> <span class="token parameter">param</span> 入卷参数
     * <span class="token keyword">@return</span> tqbh 提请的编号
     * <span class="token keyword">@author</span> XieZhongCai
     * <span class="token keyword">@date</span> 2023/1/11 14:11
     * <span class="token keyword">@version</span> v1.1.4-patch1
     */</span>
    <span class="token annotation punctuation">@Retryable</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token class-name">RjException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> backoff <span class="token operator">=</span> <span class="token annotation punctuation">@Backoff</span><span class="token punctuation">(</span>delay <span class="token operator">=</span> <span class="token number">2000</span><span class="token punctuation">,</span>multiplier <span class="token operator">=</span> <span class="token number">1.5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">wsFbSpbRj</span><span class="token punctuation">(</span><span class="token class-name">RjParam</span> param<span class="token punctuation">,</span> <span class="token class-name">String</span> tqbh<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"{}该提请记录下面的审批表和文书副本尝试入卷"</span><span class="token punctuation">,</span> tqbh<span class="token punctuation">)</span><span class="token punctuation">;</span>
        dzjzService<span class="token punctuation">.</span><span class="token function">clrj</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 重试次数耗尽，操作
     * <span class="token keyword">@param</span> <span class="token parameter">e</span> 异常信息
     * <span class="token keyword">@param</span> <span class="token parameter">param</span> 入卷参数
     * <span class="token keyword">@param</span> <span class="token parameter">tqbh</span> 审批编号
     */</span>
    <span class="token annotation punctuation">@Recover</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">rjsbRecover</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">,</span> <span class="token class-name">RjParam</span> param<span class="token punctuation">,</span> <span class="token class-name">String</span> tqbh<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RjException</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"%s该提请记录下面三次尝试审批表文书副本入卷都失败"</span><span class="token punctuation">,</span> tqbh<span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


