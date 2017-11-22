# 讨论一下css命名
现在开发中遇到的最头痛的事情莫过于给css命名了。好的命名可以快速的帮我们定位到页面中的元素，修改上也非常轻松。  
幸运的是我们有`BEM`。

## BEM
块（block）、元素（element）、修饰符方法（modifier）(通常称为BEM)是HTML和CSS类中常用的命名约定。是由`Yandex`团队提出的，它的目标是帮助开发者更好地理解项目中的HTML和CSS之间的关系。

- B: block 是模块，或者称为一个组件。
- E: element 代表块中的元素（子节点），为了表明子节点属于哪个模块，写法是`block__element`。
- M：modifier 代表某个节点的修饰状态。

下面是简单的例子：
```css
.block{}    /* 模块 */
.block--modifier{}  /* 当前模块的修饰符 */
.block__element{}   /* 模块下面的元素 */
.block__element--modifier{} /* 当前模块下面的元素的修饰符 */
```

你可能会存在疑问为什么使用两个`-`或两个`_`，其实这个是给你用来当做连接符来使用的。这样同样增加了你命名的多样性。  
例如：
```css
.footer-bar{}
.footer-bar--full{}
.footer-bar__info{}
```

***注意***

有修饰符了并不意味原来的`.block__element`就不需要了，`.block__element`是主体，`.block__element--modifier`的作用仅仅是展示`modifier`的效果。  
下面是一个good的例子：
```html
<div class="block block--mod">...</div>
<div class="block block--size-big block--shadow-yes">...</div>
```
下面是一个bad的例子：
```html
<div class="block--mod">...</div>
```

BEM的好处是让你看着类名就知道他在哪里（场景）使用的。不像`css module` 通过不断的增加层级来显示他的位置。举个类似生活中的模型来显示BEM的是如何关联的:
```
.person{}
.person__hand{}
.person__hand--left{}
.person--female{}
.person--female__hand{} /* 不推荐这么写 */
```
只要能看懂单词的意思，基本上就知道了指代是什么。  
可能有人会疑惑`.person--female__hand{}`不就变成主体了吗？其实我是不推荐这么写的，如果你想展示的是`女性的手`的话，可以通过在父元素person上增加`.person--female`来修饰。存在多个状态可以增加``.block__element--modifier``来修饰，完全没有问题。

再举个官网上的例子：  
我们有一个表单，想要在圣诞节增加一点节日气息，我们就可以增加一个`form--theme-xmas`的类，通过`--`修饰符我们可以快速的构建我们新的版本。
```html
<form class="form form--theme-xmas form--simple">
  <input class="form__input" type="text" />
  <input
    class="form__submit form__submit--disabled"
    type="submit" />
</form>
```
```css
.form { }
.form--theme-xmas { }
.form--simple { }
.form__input { }
.form__submit { }
.form__submit--disabled { }
```

再增加一个配图的例子：o(╯□╰)o  
![](https://raw.githubusercontent.com/kuckboy1994/Blog/master/images/bem/site-search.png)
这个搜索框就可以看作一个块Block，这个块里由两个子节点，一个是输入区域input，还有一个是查询按钮button。
对于这个块的命名，按照BEM法则，我们可以写成以下这样：
```html
<form class="site-search">
    <input type="text" class="site-search__input">
    <input type="button" class="site-search__button" value="search">
</form>
```
将整体的搜索框命名为site-search作为一个模块，模块下的两个子节点就在后面加上两根下划线，加上自己的名字 input 和 button，这样的命名方式，即使我们没有看到网页内容，只看了CSS样式名字，也能感受到页面结构和页面元素之间的关系。
如果要说明按钮button是灰色的，我们还可以加上修饰的类名modifier，比如可以是site-search__button--gray。
![](https://raw.githubusercontent.com/kuckboy1994/Blog/master/images/bem/site-search__button.png)
上图就说明能将某个元素进行模块化，里面能够包含多个元素，这样的命名规范能够更好的说明元素之间的关系。

  
`Yandex`提出的`BEM`只是一种比较严格的命名规范，个人认为最重要的是严格，你只有严格遵守了，才不会出现一些奇怪的问题。至于规则都是可以更加自身情况改变的。

## BEM变异
并列选择器版本
```CSS
.block-element.modifier{}
```
.modifier 不单独使用，所以不存在冲突
例1：
```css
.menu{}
.menu-item{}
.menu-item.active{}
```
例2：
```css
.shopCart{}
.shopCart-title{}
.shopCart-item{}
.shopCart-item.selected{}
```
BEN和BEM变异——并列选择器演示：[demo](https://github.com/kuckboy1994/Blog/blob/master/demo/BEM/index.html)

## BEM和BEM变异和原本的命名方式的对比
BEM的优势：
- 让原本存在多意的内容变得更加直意
- 原本层次化的内容变成了扁平，查找更加方便

BEM的劣势：
- 长得难看，太长了（┑(￣Д ￣)┍）
- 代码量增加（现在有gzip压缩，我们不需要担心文件太大，大部分编辑有自动补全功能也能接受）

BEM变异——并列选择器的优势：
- 让原本存在多意的内容变得更加直意
- 比BEM的“段”

BEM变异——并列选择器的劣势：
- 会占用修饰符类。如果修饰符类的权重变大页面维护成本变大。
- 不兼容ie6

## 总结
引用一句话作为结束语：

> BEM（或BEM的变异）是一个非常有用，强大，简单的命名约定，让你的前端代码更容易阅读和理解，更容易协作，更容易控制，更加健壮和明确而且更加严密。  
> 尽管BEM看上去多少有点奇怪，但是无论什么项目，它对前端开发者都是一个巨有价值的工具。


## 参考
- [BEM思想之彻底弄清BEM语法](https://www.w3cplus.com/css/mindbemding-getting-your-head-round-bem-syntax.html)
- [getbem.com-naming](http://getbem.com/naming/)
- [BEM实战之扒一扒淘票票页面](https://segmentfault.com/a/1190000012090363)
- [如何看待 CSS 中 BEM 的命名方式？](https://www.zhihu.com/question/21935157)
- [BEM 101](https://css-tricks.com/bem-101/)
