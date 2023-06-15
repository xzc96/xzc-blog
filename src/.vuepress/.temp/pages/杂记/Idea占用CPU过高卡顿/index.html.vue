<template><div><h1 id="idea占用cpu过高解决办法" tabindex="-1"><a class="header-anchor" href="#idea占用cpu过高解决办法" aria-hidden="true">#</a> idea占用CPU过高解决办法</h1>
<p>打开监控页面，发现JIT即使编辑占大头，这也解释了为什么每当我在修改新的代码文件的内容时 CPU 占用率飙升，因为 JIT Compiler 即时编译将 class 文件编译成本地机器代码占用了大量的 CPU 资源导致的卡顿</p>
<figure><img src="@source/杂记/Idea占用CPU过高卡顿/images/image-20230313110106520.png" alt="image-20230313110106520" tabindex="0" loading="lazy"><figcaption>image-20230313110106520</figcaption></figure>
<p>解决办法：</p>
<figure><img src="@source/杂记/Idea占用CPU过高卡顿/images/image-20230313110359683.png" alt="image-20230313110359683" tabindex="0" loading="lazy"><figcaption>image-20230313110359683</figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code># 堆栈设置

-Xms2048m
-Xmx4096m
-Xverify:none
-XX:+DisableExplicitGC
-XX:ReservedCodeCacheSize=720m
-XX:+UseConcMarkSweepGC
-XX:SoftRefLRUPolicyMSPerMB=50
-ea
-Dsun.io.useCanonCaches=false
-Djava.net.preferIPv4Stack=true
-Djdk.http.auth.tunneling.disabledSchemes=""
-XX:+HeapDumpOnOutOfMemoryError
-XX:-OmitStackTraceInFastThrow

# JIT 参数

# 设置用于编译的编译器线程数
-XX:CICompilerCount=2
# 开启分层编译
-XX:TieredStopAtLevel=1
# 控制最大数量嵌套调用内联
-XX:MaxInlineLevel=3
# 即时编译的东西（没弄懂...）
-XX:Tier4MinInvocationThreshold=100000
-XX:Tier4InvocationThreshold=110000
-XX:Tier4CompileThreshold=120000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数解释：</p>
<p>-XX:CICompilerCount<br>
默认情况下，server JVM的线程数设置为2，clientJVM的线程数设置为1，如果使用分层编译，则线程数将缩放为内核数</p>
<p>-XX:TieredStopAtLevel<br>
开启分层编译</p>
<p>-XX：MaxInlineLevel<br>
默认值为9，控制最大数量嵌套调用内联。</p>
</div></template>


