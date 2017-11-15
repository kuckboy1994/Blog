# 获取id元素的“又”一种方法
今天在偶然看到某大在掘金上面发了一篇文章[underscore 系列之如何写自己的 underscore](https://juejin.im/post/5a0bae515188252964213855)，渣渣的我就好奇的点进去看了起来。。。

在关于 **导出** 的地方看到了
> typeof exports != 'undefined'

这样一句。

纳尼？`exports`可以直接取到页面中的id为`exports`的元素。

脑洞巨大的我抛下文章主要内容去查这个问题了。。。

首先自己试验了一下
```html
<div id="exports"></div>
<script>
    alert(window.document.getElementById('exports') == window.exports);
</script>
```
在ie下下面也能完美运行。。

问题来了，难道大家都不知道这个方法吗？还是这个方法有什么弊端，大家都避而不用？

果然！[segmentfault - 疑惑，原生JS中可以直接使用ID名称来获取元素，而不用使用getElementById()方法？](https://segmentfault.com/q/1010000003689321) 

someone say:
> 这个最初是 IE 里面的，后来 firefox chrome 好像也支持了。
不建议使用，这个不是标准里面的，将来不一定支持。
而且代码容易写混乱了，multiNavItem1【id】 属于全局作用域，而且你可以给他赋值，赋值之后就是那个新的值，不赋值就是那个元素的值，当有些 id 赋了值有些没有，那么有些就是这个 DOM 对象，有些不是，特别容易混乱了。

本来看看v8的源码，发现我还是入门级别的，大家都不推荐看。我还是老老实实的打基础的吧。