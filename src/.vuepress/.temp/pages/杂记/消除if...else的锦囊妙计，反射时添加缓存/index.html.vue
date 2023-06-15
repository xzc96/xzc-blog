<template><div><h1 id="消除if-else的锦囊妙计-反射时添加缓存" tabindex="-1"><a class="header-anchor" href="#消除if-else的锦囊妙计-反射时添加缓存" aria-hidden="true">#</a> 消除if...else的锦囊妙计，反射时添加缓存</h1>
<p>我们都知道通过<code v-pre>反射</code>创建对象实例，比使用<code v-pre>new</code>关键字要慢很多。</p>
<p>由此，不太建议在用户请求过来时，每次都通过反射<code v-pre>实时</code>创建实例。</p>
<p>有时候，为了代码的灵活性，又不得不用反射创建实例，这时该怎么办呢？</p>
<p>答：加<code v-pre>缓存</code>。</p>
<p>先看以下代码</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>publicinterface <span class="token class-name">IPay</span> <span class="token punctuation">{</span>  
    <span class="token keyword">void</span> <span class="token function">pay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span>  
 
<span class="token annotation punctuation">@Service</span>
publicclass <span class="token class-name">AliaPay</span> <span class="token keyword">implements</span> <span class="token class-name">IPay</span> <span class="token punctuation">{</span>  
     <span class="token annotation punctuation">@Override</span>
     <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">pay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"===发起支付宝支付==="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
     <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
 
<span class="token annotation punctuation">@Service</span>
publicclass <span class="token class-name">WeixinPay</span> <span class="token keyword">implements</span> <span class="token class-name">IPay</span> <span class="token punctuation">{</span>  
     <span class="token annotation punctuation">@Override</span>
     <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">pay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"===发起微信支付==="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
     <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
  
<span class="token annotation punctuation">@Service</span>
publicclass <span class="token class-name">JingDongPay</span> <span class="token keyword">implements</span> <span class="token class-name">IPay</span> <span class="token punctuation">{</span>  
     <span class="token annotation punctuation">@Override</span>
     <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">pay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"===发起京东支付==="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
     <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>  
 
<span class="token annotation punctuation">@Service</span>
publicclass <span class="token class-name">PayService</span> <span class="token punctuation">{</span>  
     <span class="token annotation punctuation">@Autowired</span>
     <span class="token keyword">private</span> <span class="token class-name">AliaPay</span> aliaPay<span class="token punctuation">;</span>  
     <span class="token annotation punctuation">@Autowired</span>
     <span class="token keyword">private</span> <span class="token class-name">WeixinPay</span> weixinPay<span class="token punctuation">;</span>  
     <span class="token annotation punctuation">@Autowired</span>
     <span class="token keyword">private</span> <span class="token class-name">JingDongPay</span> jingDongPay<span class="token punctuation">;</span>  
    
   
     <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">toPay</span><span class="token punctuation">(</span><span class="token class-name">String</span> code<span class="token punctuation">)</span> <span class="token punctuation">{</span>  
         <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"alia"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
             aliaPay<span class="token punctuation">.</span><span class="token function">pay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
         <span class="token punctuation">}</span> elseif <span class="token punctuation">(</span><span class="token string">"weixin"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
              weixinPay<span class="token punctuation">.</span><span class="token function">pay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
         <span class="token punctuation">}</span> elseif <span class="token punctuation">(</span><span class="token string">"jingdong"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
              jingDongPay<span class="token punctuation">.</span><span class="token function">pay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
         <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>  
              <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"找不到支付方式"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
         <span class="token punctuation">}</span>  
     <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里违法了设计模式六大原则的：<code v-pre>开闭原则</code> 和 <code v-pre>单一职责原则</code>。</p>
<p>开闭原则：对扩展开放，对修改关闭。就是说增加新功能要尽量少改动已有代码。</p>
<p>单一职责原则：顾名思义，要求逻辑尽量单一，不要太复杂，便于复用。</p>
<ol>
<li>先创建一个注解</li>
<li>在所有的支付类上都加上该注解</li>
<li>增加最关键的类PayService2</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">PayCode</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
 
<span class="token annotation punctuation">@PayCode</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"alia"</span><span class="token punctuation">,</span> name <span class="token operator">=</span> <span class="token string">"支付宝支付"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Component</span><span class="token punctuation">(</span><span class="token string">"alia"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AliaPay</span> <span class="token keyword">implements</span> <span class="token class-name">IPay</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">pay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"===发起支付宝支付==="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
 
<span class="token annotation punctuation">@PayCode</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"jingdong"</span><span class="token punctuation">,</span> name <span class="token operator">=</span> <span class="token string">"京东支付"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Component</span><span class="token punctuation">(</span><span class="token string">"jingdong"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JingDongPay</span> <span class="token keyword">implements</span> <span class="token class-name">IPay</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">pay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"===发起京东支付==="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
 
<span class="token annotation punctuation">@PayCode</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"weixin"</span><span class="token punctuation">,</span> name <span class="token operator">=</span> <span class="token string">"微信支付"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Component</span><span class="token punctuation">(</span><span class="token string">"weixin"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WeixinPay</span> <span class="token keyword">implements</span> <span class="token class-name">IPay</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">pay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"===发起微信支付==="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
 
<span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PayService2</span> <span class="token keyword">implements</span> <span class="token class-name">ApplicationListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ContextRefreshedEvent</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">IPay</span><span class="token punctuation">></span></span> payMap <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
 
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onApplicationEvent</span><span class="token punctuation">(</span><span class="token class-name">ContextRefreshedEvent</span> contextRefreshedEvent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//在初始化或刷新ApplicationContext时发布</span>
        <span class="token class-name">ApplicationContext</span> applicationContext <span class="token operator">=</span> contextRefreshedEvent<span class="token punctuation">.</span><span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//获取所有拥有特定payCode注解的Bean（AliPay、WeiXinPay、JindDongPay）</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> beansWithAnnotation <span class="token operator">=</span> applicationContext<span class="token punctuation">.</span><span class="token function">getBeansWithAnnotation</span><span class="token punctuation">(</span><span class="token class-name">PayCode</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
        <span class="token keyword">if</span> <span class="token punctuation">(</span>beansWithAnnotation <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            payMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            beansWithAnnotation<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token class-name">String</span> bizType <span class="token operator">=</span> value<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">PayCode</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                payMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>bizType<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name">IPay</span><span class="token punctuation">)</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
 
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">pay</span><span class="token punctuation">(</span><span class="token class-name">String</span> code<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        payMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
 
 
    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/pay"</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span><span class="token string">"测试支付"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">pay</span><span class="token punctuation">(</span><span class="token class-name">String</span> code<span class="token punctuation">)</span><span class="token punctuation">{</span>
        payService2<span class="token punctuation">.</span><span class="token function">pay</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PayService2类实现了<code v-pre>ApplicationListener</code>接口，这样在<code v-pre>onApplicationEvent方法</code>中，就可以拿到<code v-pre>ApplicationContext</code>的实例。这一步，其实是在spring容器启动的时候，spring通过反射我们处理好了。</p>
<p>我们再获取打了PayCode注解的类，放到一个<code v-pre>map</code>中，map中的<code v-pre>key</code>就是PayCode注解中定义的value，跟code参数一致，value是支付类的实例。</p>
<p>这样，每次就可以每次直接通过code获取支付类实例，而不用if...else判断了。如果要加新的支付方法，只需在支付类上面打上PayCode注解定义一个新的code即可。</p>
<p>注意：这种方式的code可以没有业务含义，可以是纯数字，只要不重复就行。</p>
</div></template>


