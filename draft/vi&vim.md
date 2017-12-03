## 介绍
`vi`和`Vim`都是运行在`类Unix系统`下的编辑器。
`vi`是`Visual`的不正规的缩写。
`Vim`是从`vi`发展出来的一个文本编辑器。正式名字`Vi IMproved`。

## vi琐事
vi是在伯克利加州大学，Evans Hall中，使用"Lear-Siegler ADM3A终端”编写完成，在这台机器上的“退出键”（Esc），也就是今天键盘“表格键”（Tab）的位置，目前vi用户仍使用“退出键”（Esc）来转换状态。
![](https://raw.githubusercontent.com/kuckboy1994/Blog/master/images/vi&vim/asm3aKeyboard.png)
看了这张图，ヾ(｡｀Д´｡) 和HHKB的键盘好像啊，怪不得大神都用HHKB。
但用HHKB比一定是大神☹。

## 模式编辑器
vi 是一个模式编辑器
常用的模式
- 普通模式
- 命令模式
- 插入模式

简单介绍常用的操作

## 保存&退出
:q quit
:q! quit and abandom
:w write
:wq write and quit

## 移动光标
<table class="multi">
<caption class="cap">表1：vi(vim)光标移动按键</caption>
<tr>
<th class="title" width="25%">按键</th>
<th class="title" width="75%">移动光标</th>
</tr>
<tr>
<td valign="top">l or 右箭头</td>
<td valign="top">向右移动一个字符</td>
</tr>
<tr>
<td valign="top">h or 左箭头</td>
<td valign="top">向左移动一个字符</td>
</tr>
<tr>
<td valign="top">j or 下箭头</td>
<td valign="top">向下移动一行</td>
</tr>
<tr>
<td valign="top">k or 上箭头</td>
<td valign="top">向上移动一行</td>
</tr>
<tr>
<td valign="top">0 (零按键) </td>
<td valign="top">移动到当前行的行首。</td>
</tr>
<tr>
<td valign="top">^</td>
<td valign="top">移动到当前行的第一个非空字符。</td>
</tr>
<tr>
<td valign="top">$</td>
<td valign="top">移动到当前行的末尾。</td>
</tr>
<tr>
<td valign="top">w</td>
<td valign="top">移动到下一个单词或标点符号的开头。</td>
</tr>
<tr>
<td valign="top">W</td>
<td valign="top">移动到下一个单词的开头，忽略标点符号。</td>
</tr>
<tr>
<td valign="top">b</td>
<td valign="top">移动到上一个单词或标点符号的开头。</td>
</tr>
<tr>
<td valign="top">B</td>
<td valign="top">移动到上一个单词的开头，忽略标点符号。</td>
</tr>
<tr>
<td valign="top">Ctrl-f or Page Down </td>
<td valign="top">向下翻一页</td>
</tr>
<tr>
<td valign="top">Ctrl-b or Page Up </td>
<td valign="top">向上翻一页</td>
</tr>
<tr>
<td valign="top">numberG</td>
<td valign="top">移动到第 number 行。例如，1G 移动到文件的第一行。</td>
</tr>
<tr>
<td valign="top">gg</td>
<td valign="top">移动到文件的第一行</td>
</tr>
<tr>
<td valign="top">G</td>
<td valign="top">移动到文件末尾。</td>
</tr>
<tr>
<td valign="top">l、h、j、k、b、w都是可以结合数字键一起使用的</td>
<td valign="top">比如10k，向上移动10行</td>
</tr>
</table>



<table class="multi">
<caption class="cap">表2: 编辑模式进入</caption>
<tr>
<th class="title" width="25%">命令</th>
<th class="title" width="75%">编辑模式进入</th>
</tr>
<tr>
<td valign="top">i</td>
<td valign="top">当前字符前面插入</td>
</tr>
<tr>
<td valign="top">a</td>
<td valign="top">当前字符后面追加字符。</td>
</tr>
<tr>
<td valign="top">a</td>
<td valign="top">当前字符后面追加字符。</td>
</tr>
<tr>
<td valign="top">A</td>
<td valign="top">当前行尾后面追加字符。</td>
</tr>
<tr>
<td valign="top">o</td>
<td valign="top">当前行的下方打开一行。</td>
</tr>
<tr>
<td valign="top">O</td>
<td valign="top">当前行的上方打开一行。</td>
</tr>
</table>



<table class="multi">
<caption class="cap">表3: 文本删除命令</caption>
<tr>
<th class="title" width="25%">命令</th>
<th class="title" width="75%">删除的文本</th>
</tr>
<tr>
<td valign="top">x</td>
<td valign="top">当前字符</td>
</tr>
<tr>
<td valign="top">3x</td>
<td valign="top">当前字符及其后的两个字符。</td>
</tr>
<tr>
<td valign="top">dd</td>
<td valign="top">当前行。</td>
</tr>
<tr>
<td valign="top">5dd</td>
<td valign="top">当前行及随后的四行文本。</td>
</tr>
<tr>
<td valign="top">dW</td>
<td valign="top">从光标位置开始到下一个单词的开头。</td>
</tr>
<tr>
<td valign="top">d$</td>
<td valign="top">从光标位置开始到当前行的行尾。</td>
</tr>
<tr>
<td valign="top">d0</td>
<td valign="top">从光标位置开始到当前行的行首。</td>
</tr>
<tr>
<td valign="top">d^</td>
<td valign="top">从光标位置开始到文本行的第一个非空字符。</td>
</tr>
<tr>
<td valign="top">dG</td>
<td valign="top">从当前行到文件的末尾。</td>
</tr>
<tr>
<td valign="top">d20G</td>
<td valign="top">从当前行到文件的第20行。</td>
</tr>
</table>


<table class="multi">
<caption class="cap">表4: 复制命令 & 粘贴</caption>
<tr>
<th class="title" width="25%">命令</th>
<th class="title" width="75%">复制的内容</th>
</tr>
<tr>
<td valign="top">p</td>
<td valign="top">当前行光标位置之后粘贴</td>
</tr>
<td valign="top">P</td>
<td valign="top">当前行光标位置之前粘贴</td>
</tr>
<tr>
<td valign="top">yy</td>
<td valign="top">当前行。</td>
</tr>
<tr>
<td valign="top">5yy</td>
<td valign="top">当前行及随后的四行文本。</td>
</tr>
<tr>
<td valign="top">yW</td>
<td valign="top">从当前光标位置到下一个单词的开头。</td>
</tr>
<tr>
<td valign="top">y$</td>
<td valign="top">从当前光标位置到当前行的末尾。</td>
</tr>
<tr>
<td valign="top">y0</td>
<td valign="top">从当前光标位置到行首。</td>
</tr>
<tr>
<td valign="top">y^</td>
<td valign="top">从当前光标位置到文本行的第一个非空字符。</td>
</tr>
<tr>
<td valign="top">yG</td>
<td valign="top">从当前行到文件末尾。</td>
</tr>
<tr>
<td valign="top">y20G</td>
<td valign="top">从当前行到文件的第20行。</td>
</tr>
</table>




<table class="multi">
<tr>
<th class="title" width="25%">条目</th>
<th class="title" width="75%">含义</th>
</tr>
<tr>
<td valign="top">:</td>
<td valign="top">冒号字符运行一个 ex 命令。</td>
</tr>
<tr>
<td valign="top">%</td>
<td valign="top">指定要操作的行数。% 是一个快捷方式，表示从第一行到最后一行。另外，操作范围也可以用 1,5 来代替（因为我们的文件只有5行文本），或者用 1,$ 来代替，意思是 “ 从第一行到文件的最后一行。”如果省略了文本行的范围，那么操作只对当前行生效。</td>
</tr>
<tr>
<td valign="top">s</td>
<td valign="top">指定操作。在这种情况下是，替换（查找与替代）。</td>
</tr>
<tr>
<td valign="top">/Line/line</td>
<td valign="top">查找类型与替代文本。</td>
</tr>
<tr>
<td valign="top">g</td>
<td valign="top">这是“全局”的意思，意味着对文本行中所有匹配的字符串执行查找和替换操作。如果省略 g，则只替换每个文本行中第一个匹配的字符串。</td>
</tr>
</table>




<table class="multi">
<caption class="cap">表13-5: 替换确认按键</caption>
<tr>
<th class="title" width="25%">按键</th>
<th class="title" width="75%">行为</th>
</tr>
<tr>
<td valign="top">y</td>
<td valign="top">执行替换操作</td>
</tr>
<tr>
<td valign="top">n</td>
<td valign="top">跳过这个匹配的实例</td>
</tr>
<tr>
<td valign="top">a</td>
<td valign="top">对这个及随后所有匹配的字符串执行替换操作。</td>
</tr>
<tr>
<td valign="top">q or esc</td>
<td valign="top">退出替换操作。</td>
</tr>
<tr>
<td valign="top">l</td>
<td valign="top">执行这次替换并退出。l 是 “last” 的简写。</td>
</tr>
<tr>
<td valign="top">Ctrl-e, Ctrl-y</td>
<td valign="top">分别是向下滚动和向上滚动。用于查看建议替换的上下文。</td>
</tr>
</table>

## 实例
1. 内容查找
文件中查找`kuck`
```bash
/kuck

n // 查找下一个
N // 查找上一个
```
2. 内容替换
替换`shan`为`kuck`
```bash
:%s/shan/kuck/g
```

3. 可以同时编辑两个文档
```bash
vi shanchao.txt demo.txt

:ls
  1 %a   "shanchao.txt"                         line 1
  2 #    "demo.txt"                             line 1

:n  // 下一个文件
:N  // 上一个文件
:e newfile  // 新建一个newfile的文件
```

## 参考
- [wangding](https://github.com/wangding/git-demo/blob/master/03vi.md)
- [Vim-维基百科](https://zh.wikipedia.org/wiki/Vim)