<template><div><p>用户名删除</p>
<p>userdel -r+用户名即可删除</p>
<p>场景：centos上java dump文件很大，有5个G，内网情况需要光盘传输，没那么多空间且传输速度慢</p>
<p>思路：拆分压缩</p>
<p>拆分压缩：</p>
<p>要将一个6GB的java.hprof文件分割成每个1GB，并压缩这些分割后的文件，您可以按照以下步骤进行操作：</p>
<ol>
<li>
<p>安装split命令（如果您尚未安装）：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> coreutils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>使用split命令将文件分割成1GB的块：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">split</span> <span class="token parameter variable">-b</span> 1G java.hprof java_part
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将生成多个名为<code v-pre>java_partaa</code>, <code v-pre>java_partab</code>, <code v-pre>java_partac</code>等的文件，每个文件大小为1GB。</p>
</li>
<li>
<p>压缩这些分割后的文件：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-czvf</span> java_parts.tar.gz java_part*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将创建一个名为<code v-pre>java_parts.tar.gz</code>的压缩文件，其中包含所有分割后的文件。</p>
</li>
</ol>
<p>现在，您可以使用<code v-pre>java_parts.tar.gz</code>文件来传输或存档这些分割后的文件。</p>
<p>还原：</p>
<p>要在Windows上解压缩并还原之前在CentOS 7上拆分和压缩的文件，您可以按照以下步骤进行操作：</p>
<ol>
<li>
<p>下载并安装7-Zip：</p>
<ul>
<li>访问7-Zip官方网站（<a href="https://www.7-zip.org/%EF%BC%89%E3%80%82" target="_blank" rel="noopener noreferrer">https://www.7-zip.org/）。<ExternalLinkIcon/></a></li>
<li>在下载页面上，根据您的系统架构（32位或64位）下载适合的7-Zip安装程序。</li>
<li>运行下载的安装程序并按照安装向导完成7-Zip的安装。</li>
</ul>
</li>
<li>
<p>将<code v-pre>java_parts.tar.gz</code>文件复制到Windows系统上。</p>
</li>
<li>
<p>使用7-Zip解压缩<code v-pre>java_parts.tar.gz</code>文件：</p>
<ul>
<li>在Windows资源管理器中，找到<code v-pre>java_parts.tar.gz</code>文件。</li>
<li>右键单击文件，选择7-Zip菜单，然后选择&quot;Extract Here&quot;（在当前目录解压缩）或&quot;Extract to &lt;folder_name&gt;&quot;（解压缩到指定文件夹）选项。</li>
<li>7-Zip将解压缩<code v-pre>java_parts.tar.gz</code>文件并还原分割的文件。</li>
</ul>
</li>
<li>
<p>合并还原的分割文件（可选）：</p>
<ul>
<li>打开命令提示符（CMD）或PowerShell。</li>
<li>切换到存储还原的分割文件的目录。</li>
<li>运行以下命令来合并这些分割文件：<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>copy /b java_part* restored_java.hprof
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>这将使用Windows的copy命令将所有分割文件合并为一个名为<code v-pre>restored_java.hprof</code>的文件。</li>
</ul>
</li>
</ol>
<p>现在，您可以在Windows系统上使用<code v-pre>restored_java.hprof</code>文件进行进一步的处理或分析。</p>
</div></template>


