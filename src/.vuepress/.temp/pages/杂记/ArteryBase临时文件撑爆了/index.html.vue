<template><div><p>一个风和日丽的早上，测试在造数据的过程中，告诉我服务器磁盘空间不够了</p>
<figure><img src="@source/杂记/ArteryBase临时文件撑爆了/images/d3da5aec-4076-4941-ae99-253f6230c6ff.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>
<p>服务器不支持加这么多数据哦，加数据的过程中提示磁盘满了 是不是空间本来就很少了</p>
<p>先算一下数据量大小，1亿4千万条，一个表算20个整型字段，也就10个G左右嘛</p>
<ol>
<li>第一步，先看整体磁盘空间。确实已经满了</li>
</ol>
<figure><img src="@source/杂记/ArteryBase临时文件撑爆了/images/image-20230506105133267.png" alt="image-20230506105133267" tabindex="0" loading="lazy"><figcaption>image-20230506105133267</figcaption></figure>
<ol start="2">
<li>第二步，找到罪魁祸首</li>
</ol>
<figure><img src="@source/杂记/ArteryBase临时文件撑爆了/images/image-20230506105343432.png" alt="image-20230506105343432" tabindex="0" loading="lazy"><figcaption>image-20230506105343432</figcaption></figure>
<figure><img src="@source/杂记/ArteryBase临时文件撑爆了/images/image-20230506105443520.png" alt="image-20230506105443520" tabindex="0" loading="lazy"><figcaption>image-20230506105443520</figcaption></figure>
<figure><img src="@source/杂记/ArteryBase临时文件撑爆了/images/image-20230506105527359.png" alt="image-20230506105527359" tabindex="0" loading="lazy"><figcaption>image-20230506105527359</figcaption></figure>
<p>最后找到了这个临时文件比较大，找资料重启能清空它。差点误会是加压程序没有分批提交事务（事实上也没有这么干），导致产生了临时文件后</p>
<figure><img src="@source/杂记/ArteryBase临时文件撑爆了/images/image-20230506105809613.png" alt="image-20230506105809613" tabindex="0" loading="lazy"><figcaption>image-20230506105809613</figcaption></figure>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">su</span> - thunisoft
<span class="token function">sh</span> /opt/thunisoft/arterybase/6.0/bin/stop_abase1.sh
<span class="token function">sh</span> /opt/thunisoft/arterybase/6.0/bin/startup_abase1.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/杂记/ArteryBase临时文件撑爆了/images/image-20230506105950572.png" alt="image-20230506105950572" tabindex="0" loading="lazy"><figcaption>image-20230506105950572</figcaption></figure>
<p>过了片刻，pg_wal又被撑爆了。是记录所有修改操作的一种日志，用来保障数据库持久性的一种机制。</p>
<p>千万不要暴力的<code v-pre>rm -rf pg_wal/*</code>，如果这么干了，那么恭喜你启动不了了。</p>
<p>pg_controldata<br>
Latest checkpoint location: 16/79FF5520<br>
Latest checkpoint’s REDO location: 16/79FF54E8<br>
Latest checkpoint’s REDO WAL file: 00000001000000160000001E<br>
这里表示16/79FF54E8检查点已经执行，已经包含在00000001000000160000001E日志文件中，那么这个日志之前的日志是可以清理的。</p>
<p>可以手动使用系统命令rm清理<br>
也可以使用pg_archivecleanup清理</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>查看日志
ll
total 833M
-rw------- <span class="token number">1</span> postgres postgres  64M Aug <span class="token number">29</span> <span class="token number">11</span>:10 00000001000000160000001E
-rw------- <span class="token number">1</span> postgres postgres  64M Jul <span class="token number">16</span> <span class="token number">11</span>:24 00000001000000160000001F
-rw------- <span class="token number">1</span> postgres postgres  64M Jul <span class="token number">16</span> <span class="token number">11</span>:24 000000010000001600000020
-rw------- <span class="token number">1</span> postgres postgres  64M Jul <span class="token number">16</span> <span class="token number">11</span>:25 000000010000001600000021
-rw------- <span class="token number">1</span> postgres postgres  64M Jul <span class="token number">16</span> <span class="token number">11</span>:25 000000010000001600000022
-rw------- <span class="token number">1</span> postgres postgres  64M Jul <span class="token number">16</span> <span class="token number">11</span>:26 000000010000001600000023
-rw------- <span class="token number">1</span> postgres postgres  64M Jul <span class="token number">16</span> <span class="token number">11</span>:24 000000010000001600000024
-rw------- <span class="token number">1</span> postgres postgres  64M Jul <span class="token number">16</span> <span class="token number">11</span>:24 000000010000001600000025
-rw------- <span class="token number">1</span> postgres postgres  64M Jul <span class="token number">16</span> <span class="token number">11</span>:26 000000010000001600000026
-rw------- <span class="token number">1</span> postgres postgres  64M Jul <span class="token number">16</span> <span class="token number">11</span>:40 000000010000001600000027
-rw------- <span class="token number">1</span> postgres postgres  64M Jul <span class="token number">16</span> <span class="token number">11</span>:40 000000010000001600000028
-rw------- <span class="token number">1</span> postgres postgres  64M Jul <span class="token number">16</span> <span class="token number">11</span>:51 000000010000001600000029
-rw------- <span class="token number">1</span> postgres postgres  64M Jul <span class="token number">16</span> <span class="token number">11</span>:40 00000001000000160000002A
drwx------ <span class="token number">2</span> postgres postgres <span class="token number">4</span>.0K Jun <span class="token number">18</span> <span class="token number">10</span>:15 archive_status

保留000000010000001600000027之后的日志
 pg_archivecleanup /opt/pgdata11.3/pg_root/pg_wal/  000000010000001600000027
 
 再次查看验证
 <span class="token function">ls</span>
000000010000001600000027  000000010000001600000028  000000010000001600000029  00000001000000160000002A  archive_status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


