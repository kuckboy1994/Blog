# 【翻译】使用伪元素来形成类似“居中浮动”的效果（Faking ‘float: center’ with Pseudo Elements）
文本翻译自 [css-tricks](https://css-tricks.com/) 网站的 [Faking ‘float: center’ with Pseudo Elements](https://css-tricks.com/float-center/) 一文。翻译有误，期待斧正。

## 正文
比方说，你想完成一个类似这样的布局：

![](https://github.com/kuckboy1994/Blog/blob/master/images/css-tricks/catinmiddle1.png)

这个展示效果没毛病吧？特别是你想把这个猫作为文章的重点。

做到这一点其实并不容易。我们当前有的布局方法并不能真正的考虑到这一点。事实上，有时候觉得这种布局并没有真正的“网页设计”的思想。我说的对吗？我不认为即使有这种流通边缘的CSS布局系统就能很好地处理这个问题。这有点像float，因为文本环绕着图像，但是文本环绕两个方向，所以有点像`float: center;`居中浮动;或`float: both;`全部浮动，但这两个都是不存在的。

但这是可以实现的！

证明：[查看](https://css-tricks.com/examples/FloatBoth/) [查看源码](https://github.com/kuckboy1994/Blog/blob/master/demo/css-tricks/float-both/index.html)

我们将通过使用浮动的伪元素占位符来实现它。每一`列①`放入一个伪元素占位符，一个左浮动，一个右浮动。伪元素的高度为图像的高度，宽度为图像的一半宽（差不多，不要忘记你还有padding和中间的槽【两列中间的分隔距离】需要考虑）。

主要代码：

```css
#l:before, #r:before { 
  content: ""; 
  width: 125px; 
  height: 250px; 
}
#l:before { 
  float: right; 
}
#r:before { 
  float: left; 
}
```

![](https://github.com/kuckboy1994/Blog/blob/master/images/css-tricks/psuedoplaceholders.jpg)

现在文本中有一个洞，准备好把我们的图像放在那里。我们可以通过绝对定位来实现，就像在演示中那样。或者你可以把它放在上面的一个元素上，然后用负的顶部边缘来把文本拉出来。

## 标注：
- 列①： 注意，我们使用的是div来实现文本的列，而不是CSS列，虽然使用css来实现更酷，更具有语义化，但是用css的话我们上面的就不起作用了。