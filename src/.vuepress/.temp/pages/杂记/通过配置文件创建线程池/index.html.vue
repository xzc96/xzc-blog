<template><div><h3 id="使用配置文件去创建线程池方便定时任务的调用" tabindex="-1"><a class="header-anchor" href="#使用配置文件去创建线程池方便定时任务的调用" aria-hidden="true">#</a> 使用配置文件去创建线程池方便定时任务的调用</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@projectName</span> zbxc
 * <span class="token keyword">@package</span> com.thunisoft.zbxc.config
 * <span class="token keyword">@className</span> com.thunisoft.zbxc.config.ScheduleConfig
 * <span class="token keyword">@copyright</span> Copyright 2020 Thunisoft, Inc All rights reserved.
 */</span>
<span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>zbxc<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>scheduling<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">ThreadPoolTaskExecutor</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">Executor</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">ThreadPoolExecutor</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * ScheduleConfig
 * <span class="token keyword">@description</span> 定时任务配置类
 * <span class="token keyword">@author</span> xzc
 * <span class="token keyword">@date</span> 2021-8-23 17:15
 * <span class="token keyword">@version</span> 1.0
 */</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ScheduleConfig</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/** size */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Integer</span> <span class="token constant">SIZE</span> <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/** qsize */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Integer</span> <span class="token constant">QSIZE</span> <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/** sec */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Integer</span> <span class="token constant">SEC</span> <span class="token operator">=</span> <span class="token number">60</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     *
     * ScheduleConfig
     *
     * <span class="token keyword">@description</span> 定时任务线程池.
     * <span class="token keyword">@return</span> java.util.concurrent.Executor
     * <span class="token keyword">@date</span> 2021-8-25 10:52
     * <span class="token keyword">@author</span> xzc
     * <span class="token keyword">@version</span> 1.0
     */</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Executor</span> <span class="token function">myAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ThreadPoolTaskExecutor</span> executor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolTaskExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//最大线程数</span>
        executor<span class="token punctuation">.</span><span class="token function">setMaxPoolSize</span><span class="token punctuation">(</span><span class="token constant">SIZE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//核心线程数</span>
        executor<span class="token punctuation">.</span><span class="token function">setCorePoolSize</span><span class="token punctuation">(</span><span class="token constant">SIZE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//任务队列的大小</span>
        executor<span class="token punctuation">.</span><span class="token function">setQueueCapacity</span><span class="token punctuation">(</span><span class="token constant">QSIZE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//线程前缀名</span>
        executor<span class="token punctuation">.</span><span class="token function">setThreadNamePrefix</span><span class="token punctuation">(</span><span class="token string">"zbxc-thread-"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//线程存活时间</span>
        executor<span class="token punctuation">.</span><span class="token function">setKeepAliveSeconds</span><span class="token punctuation">(</span><span class="token constant">SEC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * 拒绝处理策略
         * CallerRunsPolicy()：交由调用方线程运行，比如 main 线程。
         * AbortPolicy()：直接抛出异常。
         * DiscardPolicy()：直接丢弃。
         * DiscardOldestPolicy()：丢弃队列中最老的任务。
         */</span>
        executor<span class="token punctuation">.</span><span class="token function">setRejectedExecutionHandler</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor<span class="token punctuation">.</span>DiscardOldestPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//线程初始化</span>
        executor<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> executor<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>小技巧：搭配定时任务使用</p>
<p>步骤1：在启动类上加上<code v-pre>@EnableScheduling</code>注解</p>
<p>步骤2：配置上corn表达式，如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Async</span><span class="token punctuation">(</span><span class="token string">"myAsync"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Scheduled</span><span class="token punctuation">(</span>cron <span class="token operator">=</span> <span class="token string">"0 0 22 * * ?"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">clearProgressMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        jajyContext<span class="token punctuation">.</span><span class="token function">clearProgress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


