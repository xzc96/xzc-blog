<template><div><h3 id="springboot多数据源配置" tabindex="-1"><a class="header-anchor" href="#springboot多数据源配置" aria-hidden="true">#</a> Springboot多数据源配置</h3>
<blockquote>
<p>其中jyh和zx是二选一的，使用@ConditionalOnProperty注解动态加载。</p>
<p>PS：一旦使用了多数据源切记包结构需要清晰，能区分出哪个包下面的逻辑与哪个库有关系。比如：某一个库直连方式改成了提供接口，能不能一下子区分出来要改哪些类</p>
</blockquote>
<p>数据库一：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>zbxc<span class="token punctuation">.</span>config<span class="token punctuation">.</span>datasource</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>druid<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span></span><span class="token class-name">DruidDataSourceBuilder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>session<span class="token punctuation">.</span></span><span class="token class-name">SqlSessionFactory</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>spring<span class="token punctuation">.</span></span><span class="token class-name">SqlSessionFactoryBean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">MapperScan</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Qualifier</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span>condition<span class="token punctuation">.</span></span><span class="token class-name">ConditionalOnProperty</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>context<span class="token punctuation">.</span>properties<span class="token punctuation">.</span></span><span class="token class-name">ConfigurationProperties</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>core<span class="token punctuation">.</span>io<span class="token punctuation">.</span>support<span class="token punctuation">.</span></span><span class="token class-name">PathMatchingResourcePatternResolver</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>jdbc<span class="token punctuation">.</span>datasource<span class="token punctuation">.</span></span><span class="token class-name">DataSourceTransactionManager</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">DataSource</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * jyhDataSourceConfig
 *
 * @Description 集约化数据源配置
 * <span class="token keyword">@author</span> XieZhongCai
 * <span class="token keyword">@date</span> 2021/8/17 16:06
 * <span class="token keyword">@version</span> v1.0.0
 **/</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@MapperScan</span><span class="token punctuation">(</span>basePackages <span class="token operator">=</span> <span class="token class-name">JyhDataSourceConfig</span><span class="token punctuation">.</span><span class="token constant">PACKAGE</span><span class="token punctuation">,</span> sqlSessionFactoryRef <span class="token operator">=</span> <span class="token string">"jyhSqlSessionFactory"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ConditionalOnProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"zbxc.datasource.choose"</span><span class="token punctuation">,</span> havingValue <span class="token operator">=</span> <span class="token string">"jyh"</span><span class="token punctuation">,</span> matchIfMissing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JyhDataSourceConfig</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * dao层的包路径
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">PACKAGE</span> <span class="token operator">=</span> <span class="token string">"com.thunisoft.zbxc.mappers.jyh"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * mapper文件的相对路径
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">MAPPER_LOCATION</span> <span class="token operator">=</span> <span class="token string">"classpath:mappers/jyh/*.xml"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> 集约化数据源
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"jyhDataSource"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"spring.datasource.druid.jyh"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">jyhDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">DruidDataSourceBuilder</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建该数据源的事务管理
     * <span class="token keyword">@return</span> 事务管理
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"jyhTransactionManager"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSourceTransactionManager</span> <span class="token function">jyhTransactionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DataSourceTransactionManager</span><span class="token punctuation">(</span><span class="token function">jyhDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建Mybatis的连接会话工厂实例
     * <span class="token keyword">@param</span> <span class="token parameter">jyhDataSource</span> 数据源
     * <span class="token keyword">@return</span> 会话工厂实例
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span> exception
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"jyhSqlSessionFactory"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSessionFactory</span> <span class="token function">jyhSqlSessionFactory</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"jyhDataSource"</span><span class="token punctuation">)</span> <span class="token class-name">DataSource</span> jyhDataSource<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">SqlSessionFactoryBean</span> sessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置数据源bean</span>
        sessionFactory<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>jyhDataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
        sessionFactory<span class="token punctuation">.</span><span class="token function">setMapperLocations</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PathMatchingResourcePatternResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token comment">// 设置mapper文件路径</span>
                <span class="token punctuation">.</span><span class="token function">getResources</span><span class="token punctuation">(</span><span class="token class-name">JyhDataSourceConfig</span><span class="token punctuation">.</span><span class="token constant">MAPPER_LOCATION</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> sessionFactory<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数据库二：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>zbxc<span class="token punctuation">.</span>config<span class="token punctuation">.</span>datasource</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>druid<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span></span><span class="token class-name">DruidDataSourceBuilder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>session<span class="token punctuation">.</span></span><span class="token class-name">SqlSessionFactory</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>spring<span class="token punctuation">.</span></span><span class="token class-name">SqlSessionFactoryBean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">MapperScan</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Qualifier</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>context<span class="token punctuation">.</span>properties<span class="token punctuation">.</span></span><span class="token class-name">ConfigurationProperties</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Primary</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>core<span class="token punctuation">.</span>io<span class="token punctuation">.</span>support<span class="token punctuation">.</span></span><span class="token class-name">PathMatchingResourcePatternResolver</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>jdbc<span class="token punctuation">.</span>datasource<span class="token punctuation">.</span></span><span class="token class-name">DataSourceTransactionManager</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">DataSource</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * PrimaryDataSourceConfig
 *
 * @Description 本地数据源配置
 * <span class="token keyword">@author</span> XieZhongCai
 * <span class="token keyword">@date</span> 2021/8/17 16:06
 * <span class="token keyword">@version</span> v1.0.0
 **/</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@MapperScan</span><span class="token punctuation">(</span>basePackages <span class="token operator">=</span> <span class="token class-name">LocalDataSourceConfig</span><span class="token punctuation">.</span><span class="token constant">PACKAGE</span><span class="token punctuation">,</span> sqlSessionFactoryRef <span class="token operator">=</span> <span class="token string">"primarySqlSessionFactory"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LocalDataSourceConfig</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * dao层的包路径
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">PACKAGE</span> <span class="token operator">=</span> <span class="token string">"com.thunisoft.zbxc.mappers.local"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * mapper文件的相对路径
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">MAPPER_LOCATION</span> <span class="token operator">=</span> <span class="token string">"classpath:mappers/local/*.xml"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     *
     * <span class="token keyword">@return</span> 本地数据源
     */</span>
    <span class="token annotation punctuation">@Primary</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"primaryDataSource"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"spring.datasource.druid.local"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">primaryDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">DruidDataSourceBuilder</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建该数据源的事务管理
     * <span class="token keyword">@return</span> 事务管理
     */</span>
    <span class="token annotation punctuation">@Primary</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"primaryTransactionManager"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSourceTransactionManager</span> <span class="token function">primaryTransactionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DataSourceTransactionManager</span><span class="token punctuation">(</span><span class="token function">primaryDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建Mybatis的连接会话工厂实例
     * <span class="token keyword">@param</span> <span class="token parameter">primaryDataSource</span> 数据源
     * <span class="token keyword">@return</span> 会话工厂实例
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span> e
     */</span>
    <span class="token annotation punctuation">@Primary</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"primarySqlSessionFactory"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSessionFactory</span> <span class="token function">primarySqlSessionFactory</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"primaryDataSource"</span><span class="token punctuation">)</span> <span class="token class-name">DataSource</span> primaryDataSource<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">SqlSessionFactoryBean</span> sessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置数据源bean</span>
        sessionFactory<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>primaryDataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
        sessionFactory<span class="token punctuation">.</span><span class="token function">setMapperLocations</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PathMatchingResourcePatternResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token comment">// 设置mapper文件路径</span>
                <span class="token punctuation">.</span><span class="token function">getResources</span><span class="token punctuation">(</span><span class="token class-name">LocalDataSourceConfig</span><span class="token punctuation">.</span><span class="token constant">MAPPER_LOCATION</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> sessionFactory<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数据库三：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>thunisoft<span class="token punctuation">.</span>zbxc<span class="token punctuation">.</span>config<span class="token punctuation">.</span>datasource</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>druid<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span></span><span class="token class-name">DruidDataSourceBuilder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>ibatis<span class="token punctuation">.</span>session<span class="token punctuation">.</span></span><span class="token class-name">SqlSessionFactory</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>spring<span class="token punctuation">.</span></span><span class="token class-name">SqlSessionFactoryBean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>mybatis<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">MapperScan</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Qualifier</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span>condition<span class="token punctuation">.</span></span><span class="token class-name">ConditionalOnProperty</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>context<span class="token punctuation">.</span>properties<span class="token punctuation">.</span></span><span class="token class-name">ConfigurationProperties</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>core<span class="token punctuation">.</span>io<span class="token punctuation">.</span>support<span class="token punctuation">.</span></span><span class="token class-name">PathMatchingResourcePatternResolver</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>jdbc<span class="token punctuation">.</span>datasource<span class="token punctuation">.</span></span><span class="token class-name">DataSourceTransactionManager</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">DataSource</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * lzxDataSourceConfig
 *
 * @Description 老执行数据源配置
 * <span class="token keyword">@author</span> XieZhongCai
 * <span class="token keyword">@date</span> 2021/8/17 16:06
 * <span class="token keyword">@version</span> v1.0.0
 **/</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@MapperScan</span><span class="token punctuation">(</span>basePackages <span class="token operator">=</span> <span class="token class-name">ZxDataSourceConfig</span><span class="token punctuation">.</span><span class="token constant">PACKAGE</span><span class="token punctuation">,</span> sqlSessionFactoryRef <span class="token operator">=</span> <span class="token string">"zxSqlSessionFactory"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ConditionalOnProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"zbxc.datasource.choose"</span><span class="token punctuation">,</span> havingValue <span class="token operator">=</span> <span class="token string">"zx"</span><span class="token punctuation">,</span> matchIfMissing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ZxDataSourceConfig</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * dao层的包路径
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">PACKAGE</span> <span class="token operator">=</span> <span class="token string">"com.thunisoft.zbxc.mappers.zx"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * mapper文件的相对路径
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">MAPPER_LOCATION</span> <span class="token operator">=</span> <span class="token string">"classpath:mappers/zx/*.xml"</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     *
     * <span class="token keyword">@return</span> 老执行数据源
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"zxDataSource"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"spring.datasource.druid.zx"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">zxDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">DruidDataSourceBuilder</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建该数据源的事务管理
     * <span class="token keyword">@return</span> 事务管理
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"zxTransactionManager"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSourceTransactionManager</span> <span class="token function">zxTransactionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DataSourceTransactionManager</span><span class="token punctuation">(</span><span class="token function">zxDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建Mybatis的连接会话工厂实例
     * <span class="token keyword">@param</span> <span class="token parameter">zxDataSource</span> 数据源
     * <span class="token keyword">@return</span> 会话工厂实例
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span> e
     */</span>
    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"zxSqlSessionFactory"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">SqlSessionFactory</span> <span class="token function">zxSqlSessionFactory</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"zxDataSource"</span><span class="token punctuation">)</span> <span class="token class-name">DataSource</span> zxDataSource<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">SqlSessionFactoryBean</span> sessionFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置数据源bean</span>
        sessionFactory<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>zxDataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
        sessionFactory<span class="token punctuation">.</span><span class="token function">setMapperLocations</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PathMatchingResourcePatternResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token comment">// 设置mapper文件路径</span>
                <span class="token punctuation">.</span><span class="token function">getResources</span><span class="token punctuation">(</span><span class="token class-name">ZxDataSourceConfig</span><span class="token punctuation">.</span><span class="token constant">MAPPER_LOCATION</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> sessionFactory<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>application.yml</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
    <span class="token key atrule">druid</span><span class="token punctuation">:</span>
      <span class="token key atrule">jyh</span><span class="token punctuation">:</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource
        <span class="token key atrule">name</span><span class="token punctuation">:</span> jyhDataSource
        <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> net.sf.log4jdbc.DriverSpy
        <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>log4jdbc<span class="token punctuation">:</span>ArteryBase<span class="token punctuation">:</span>//$<span class="token punctuation">{</span>jyhdb.url<span class="token punctuation">:</span>172.25.17.14<span class="token punctuation">:</span><span class="token number">7654</span><span class="token punctuation">}</span>/DB_FY<span class="token punctuation">?</span>ApplicationName=zbxc<span class="token important">&amp;Charset=utf8&amp;currentSchema=db_zxaj</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>jyhdb.username<span class="token punctuation">:</span>t3e<span class="token punctuation">}</span>
        <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>jyhdb.pwd<span class="token punctuation">:</span>6789@jkl<span class="token punctuation">}</span>
        <span class="token comment"># 初始化时建立物理连接的个数</span>
        <span class="token key atrule">initial-size</span><span class="token punctuation">:</span> <span class="token number">8</span>
        <span class="token comment"># 最大连接池数量</span>
        <span class="token key atrule">max-active</span><span class="token punctuation">:</span> <span class="token number">16</span>
        <span class="token comment"># 最小连接池数量</span>
        <span class="token key atrule">min-idle</span><span class="token punctuation">:</span> <span class="token number">8</span>
        <span class="token comment"># 获取连接时最大等待时间，单位毫秒</span>
        <span class="token key atrule">max-wait</span><span class="token punctuation">:</span> <span class="token number">60000</span>
        <span class="token comment"># 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒</span>
        <span class="token key atrule">time-between-eviction-runs-millis</span><span class="token punctuation">:</span> <span class="token number">60000</span>
        <span class="token comment"># 连接保持空闲而不被驱逐的最小时间</span>
        <span class="token key atrule">min-evictable-idle-time-millis</span><span class="token punctuation">:</span> <span class="token number">60000</span>
        <span class="token comment"># 用来检测连接是否有效的sql，要求是一个查询语句</span>
        <span class="token key atrule">validation-query</span><span class="token punctuation">:</span> SELECT 1
        <span class="token comment"># 建议配置为true，不影响性能，并且保证安全性。申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。</span>
        <span class="token key atrule">test-while-idle</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">zx</span><span class="token punctuation">:</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource
        <span class="token key atrule">name</span><span class="token punctuation">:</span> zxDataSource
        <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> net.sourceforge.jtds.jdbc.Driver
        <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>jtds<span class="token punctuation">:</span>sybase<span class="token punctuation">:</span>//$<span class="token punctuation">{</span>zxdb.url<span class="token punctuation">:</span>172.25.17.68<span class="token punctuation">:</span><span class="token number">9000</span><span class="token punctuation">}</span>/YWST
        <span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>zxdb.username<span class="token punctuation">:</span>sa<span class="token punctuation">}</span>
        <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>zxdb.pwd<span class="token punctuation">:</span>zj6789@jkl<span class="token punctuation">}</span>
        <span class="token comment"># 初始化时建立物理连接的个数</span>
        <span class="token key atrule">initial-size</span><span class="token punctuation">:</span> <span class="token number">4</span>
        <span class="token comment"># 最大连接池数量</span>
        <span class="token key atrule">max-active</span><span class="token punctuation">:</span> <span class="token number">8</span>
        <span class="token comment"># 最小连接池数量</span>
        <span class="token key atrule">min-idle</span><span class="token punctuation">:</span> <span class="token number">4</span>
        <span class="token comment"># 获取连接时最大等待时间，单位毫秒</span>
        <span class="token key atrule">max-wait</span><span class="token punctuation">:</span> <span class="token number">60000</span>
        <span class="token comment"># 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒</span>
        <span class="token key atrule">time-between-eviction-runs-millis</span><span class="token punctuation">:</span> <span class="token number">60000</span>
        <span class="token comment"># 连接保持空闲而不被驱逐的最小时间</span>
        <span class="token key atrule">min-evictable-idle-time-millis</span><span class="token punctuation">:</span> <span class="token number">60000</span>
        <span class="token comment"># 用来检测连接是否有效的sql，要求是一个查询语句</span>
        <span class="token key atrule">validation-query</span><span class="token punctuation">:</span> SELECT 1
        <span class="token comment"># 建议配置为true，不影响性能，并且保证安全性。申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。</span>
        <span class="token key atrule">test-while-idle</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">local</span><span class="token punctuation">:</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> com.alibaba.druid.pool.DruidDataSource
        <span class="token key atrule">name</span><span class="token punctuation">:</span> localDataSource
        <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>log4jdbc<span class="token punctuation">:</span>ArteryBase<span class="token punctuation">:</span>//$<span class="token punctuation">{</span>zbxcdb.url<span class="token punctuation">:</span>172.25.16.208<span class="token punctuation">:</span><span class="token number">5432</span><span class="token punctuation">}</span>/DB_ZBXC<span class="token punctuation">?</span>ApplicationName=zbxc<span class="token important">&amp;Charset=utf8&amp;currentSchema=zbxc</span>
        <span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>zbxcdb.username<span class="token punctuation">:</span>jxglpt<span class="token punctuation">}</span>
        <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>zbxcdb.pwd<span class="token punctuation">:</span>jxglpt<span class="token punctuation">}</span>
        <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> net.sf.log4jdbc.DriverSpy
        <span class="token comment"># 初始化时建立物理连接的个数</span>
        <span class="token key atrule">initial-size</span><span class="token punctuation">:</span> <span class="token number">8</span>
        <span class="token comment"># 最大连接池数量</span>
        <span class="token key atrule">max-active</span><span class="token punctuation">:</span> <span class="token number">16</span>
        <span class="token comment"># 最小连接池数量</span>
        <span class="token key atrule">min-idle</span><span class="token punctuation">:</span> <span class="token number">8</span>
        <span class="token comment"># 获取连接时最大等待时间，单位毫秒</span>
        <span class="token key atrule">max-wait</span><span class="token punctuation">:</span> <span class="token number">5000</span>
        <span class="token comment"># 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒</span>
        <span class="token key atrule">time-between-eviction-runs-millis</span><span class="token punctuation">:</span> <span class="token number">10000</span>
        <span class="token comment"># 连接保持空闲而不被驱逐的最小时间</span>
        <span class="token key atrule">min-evictable-idle-time-millis</span><span class="token punctuation">:</span> <span class="token number">5000</span>
        <span class="token comment"># 用来检测连接是否有效的sql，要求是一个查询语句</span>
        <span class="token key atrule">validation-query</span><span class="token punctuation">:</span> SELECT 1
        <span class="token comment"># 建议配置为true，不影响性能，并且保证安全性。申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。</span>
        <span class="token key atrule">test-while-idle</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


