<template><div><p>PostgreSql、SqlServer小技巧：Top5排名</p>
<p>总结：</p>
<p>RANK() OVER( PARTITION BY class order by score desc) 并列第一，没有第二名；</p>
<p>DENSE RANK() OVER(PARTITION BY class order by score desc)并列第一，有第二名；</p>
<p>ROW_NUMBER() OVER(PARTITION BY class order by score desc) 没有并列第一；</p>
<h3 id="rank" tabindex="-1"><a class="header-anchor" href="#rank" aria-hidden="true">#</a> rank()</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> jddm<span class="token punctuation">,</span> times dbcs<span class="token punctuation">,</span> dr xh<span class="token punctuation">,</span> <span class="token string">'2'</span> tjlx
        <span class="token keyword">from</span> <span class="token punctuation">(</span>
             <span class="token keyword">select</span> jddm<span class="token punctuation">,</span> times<span class="token punctuation">,</span> rank<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">over</span> <span class="token punctuation">(</span><span class="token keyword">order</span> <span class="token keyword">by</span> times <span class="token keyword">desc</span><span class="token punctuation">)</span> <span class="token keyword">as</span> dr
             <span class="token keyword">from</span> <span class="token punctuation">(</span>
                  <span class="token keyword">select</span> c_jddm jddm<span class="token punctuation">,</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> times
                  <span class="token keyword">from</span> db_ywzx<span class="token punctuation">.</span>t_zx_cdbjl
                  <span class="token keyword">where</span> c_jdlx <span class="token operator">=</span> <span class="token string">'1'</span>

                  <span class="token operator">and</span> dt_cjsj <span class="token operator">between</span> <span class="token string">'2022-02-16 14:29:34'</span> <span class="token operator">and</span> <span class="token string">'2023-02-16 14:29:34'</span>
                  <span class="token keyword">group</span> <span class="token keyword">by</span> c_jddm<span class="token punctuation">)</span> m
             <span class="token punctuation">)</span> n
        <span class="token keyword">where</span> dr  <span class="token operator">&lt;=</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>观察下面的结果，并列第二有两个，就没有第三名了</p>
<table>
<thead>
<tr>
<th>节点</th>
<th>出现次数</th>
<th>排名</th>
</tr>
</thead>
<tbody>
<tr>
<td>3744</td>
<td>1000</td>
<td>1</td>
</tr>
<tr>
<td>3509</td>
<td>297</td>
<td>2</td>
</tr>
<tr>
<td>3507</td>
<td>297</td>
<td>2</td>
</tr>
<tr>
<td>3525</td>
<td>170</td>
<td>4</td>
</tr>
<tr>
<td>3555</td>
<td>150</td>
<td>5</td>
</tr>
<tr>
<td>3034</td>
<td>150</td>
<td>5</td>
</tr>
</tbody>
</table>
<h3 id="dense-rank" tabindex="-1"><a class="header-anchor" href="#dense-rank" aria-hidden="true">#</a> dense_rank()</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> jddm<span class="token punctuation">,</span> times dbcs<span class="token punctuation">,</span> dr xh<span class="token punctuation">,</span> <span class="token string">'2'</span> tjlx
        <span class="token keyword">from</span> <span class="token punctuation">(</span>
             <span class="token keyword">select</span> jddm<span class="token punctuation">,</span> times<span class="token punctuation">,</span> dense_rank<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">over</span> <span class="token punctuation">(</span><span class="token keyword">order</span> <span class="token keyword">by</span> times <span class="token keyword">desc</span><span class="token punctuation">)</span> <span class="token keyword">as</span> dr
             <span class="token keyword">from</span> <span class="token punctuation">(</span>
                  <span class="token keyword">select</span> c_jddm jddm<span class="token punctuation">,</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> times
                  <span class="token keyword">from</span> db_ywzx<span class="token punctuation">.</span>t_zx_cdbjl
                  <span class="token keyword">where</span> c_jdlx <span class="token operator">=</span> <span class="token string">'1'</span>

                  <span class="token operator">and</span> dt_cjsj <span class="token operator">between</span> <span class="token string">'2022-02-16 14:29:34'</span> <span class="token operator">and</span> <span class="token string">'2023-02-16 14:29:34'</span>
                  <span class="token keyword">group</span> <span class="token keyword">by</span> c_jddm<span class="token punctuation">)</span> m
             <span class="token punctuation">)</span> n
        <span class="token keyword">where</span> dr  <span class="token operator">&lt;=</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里用到了 <code v-pre>dense_rank()</code>会存在一个并列的情况，要统计top5出现了&gt;5条的数据，不符合需求，这种比较适合班级成绩排名</p>
<table>
<thead>
<tr>
<th>节点</th>
<th>出现次数</th>
<th>排名</th>
</tr>
</thead>
<tbody>
<tr>
<td>3744</td>
<td>1000</td>
<td>1</td>
</tr>
<tr>
<td>3509</td>
<td>297</td>
<td>2</td>
</tr>
<tr>
<td>3507</td>
<td>297</td>
<td>2</td>
</tr>
<tr>
<td>3525</td>
<td>170</td>
<td>3</td>
</tr>
<tr>
<td>3555</td>
<td>150</td>
<td>4</td>
</tr>
<tr>
<td>3034</td>
<td>150</td>
<td>4</td>
</tr>
<tr>
<td>3551</td>
<td>130</td>
<td>5</td>
</tr>
</tbody>
</table>
<h3 id="row-number" tabindex="-1"><a class="header-anchor" href="#row-number" aria-hidden="true">#</a> row_number()</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> jddm<span class="token punctuation">,</span> times dbcs<span class="token punctuation">,</span> dr xh<span class="token punctuation">,</span> <span class="token string">'2'</span> tjlx
        <span class="token keyword">from</span> <span class="token punctuation">(</span>
             <span class="token keyword">select</span> jddm<span class="token punctuation">,</span> times<span class="token punctuation">,</span> row_number<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">over</span> <span class="token punctuation">(</span><span class="token keyword">order</span> <span class="token keyword">by</span> times <span class="token keyword">desc</span><span class="token punctuation">)</span> <span class="token keyword">as</span> dr
             <span class="token keyword">from</span> <span class="token punctuation">(</span>
                  <span class="token keyword">select</span> c_jddm jddm<span class="token punctuation">,</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> times
                  <span class="token keyword">from</span> db_ywzx<span class="token punctuation">.</span>t_zx_cdbjl
                  <span class="token keyword">where</span> c_jdlx <span class="token operator">=</span> <span class="token string">'1'</span>

                  <span class="token operator">and</span> dt_cjsj <span class="token operator">between</span> <span class="token string">'2022-02-16 14:29:34'</span> <span class="token operator">and</span> <span class="token string">'2023-02-16 14:29:34'</span>
                  <span class="token keyword">group</span> <span class="token keyword">by</span> c_jddm<span class="token punctuation">)</span> m
             <span class="token punctuation">)</span> n
        <span class="token keyword">where</span> dr  <span class="token operator">&lt;=</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里用<code v-pre>row_number()</code>，没有并列第一，只取5条</p>
<table>
<thead>
<tr>
<th>节点</th>
<th>督办次数</th>
<th>排名</th>
</tr>
</thead>
<tbody>
<tr>
<td>3744</td>
<td>1000</td>
<td>1</td>
</tr>
<tr>
<td>3509</td>
<td>297</td>
<td>2</td>
</tr>
<tr>
<td>3507</td>
<td>297</td>
<td>3</td>
</tr>
<tr>
<td>3525</td>
<td>170</td>
<td>4</td>
</tr>
<tr>
<td>3555</td>
<td>150</td>
<td>5</td>
</tr>
</tbody>
</table>
</div></template>


