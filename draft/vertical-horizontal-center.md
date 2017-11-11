## 水平居中
1. 若是行内元素，给改元素的父级设置`text-align:center`，即可实现行内元素水平居中。[demo](1-text-align.html)

2. 若是块级元素, 该元素设置`margin:0 auto`。[demo](2-margin-auto.html)

3. 若子元素包含`float:left`属性, 为了让子元素水平居中, 则可让父元素宽度设置为`fit-content`,并且配合`margin`, 作如下设置:[demo](3-margin-auto-fit-content.html)
    ```css
    .fit-content {
        width: -moz-fit-content;
        width: -webkit-fit-content;
        width: fit-content;
        margin: 0 auto;
    }
    ```
    目前这个属性只支持Chrome和Firefox浏览器。

4. 使用flex布局，可以很轻松的实现水平居中：[demo](4-flex-justify-content.html)
    ```css
    .parent {
        display: flex;
        justify-content: center;
    }
    .son {
        background-color: red;
        width: 100px;
        height: 20px;
    }
    ```
    .son 将会被水平居中 

5. **使用CSS3盒模型，父元素`display:box;box-pack:center;`
    ```css
    .parent {
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;

        display: -moz-box;
        -moz-box-orient: horizontal;
        -moz-box-pack: center;

        display: -o-box;
        -o-box-orient: horizontal;
        -o-box-pack: center;

        display: -ms-box;
        -ms-box-orient: horizontal;
        -ms-box-pack: center;
        
        display: box;
        box-orient: horizontal;
        box-pack: center;
    }
    .son {
        width: 100px;
        height: 10px;
        background-color: red;
    }
    ```
    没有深入了解。  
    基本介绍：`display:box;`是09年出来的。`display: flex;`是12年出来的。地址：[“Old” Flexbox and “New” Flexbox](https://css-tricks.com/old-flexbox-and-new-flexbox/)。  
    看文章说在手机页面的时候，老机子`display:flex`会有问题的时候就需要box上场啦。

6. 通过使用决定对位，以及负值的`margin-left`来实现：[demo](position-margin-left.html)
    ```css
    .parent {
        position: relative;
    }
    .son {
        position: absolute;
        left: 50%;
        margin-left: -0.5 * 当前元素的宽度; 
        width: 100px;
        height: 10px;
        background-color: red;
    }
    ```

7. 使用CSS3中新增的`transform`属性，以及绝对定位:[demo](transform.html)
    ```css
    .parent {
        position: relative;
    }
    .son {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
    }
    ```

8. 使用绝对定位，以及`left:0;right:0;margin:0 auto;`：[demo](position-absolute-margin-auto.html)
    ```css
    .parent {
        position: relative;
    }
    .son {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 100px;
        height: 10px;
        background-color: red;
    }
    ```

## 垂直居中
1. 元素是单行文本，设置line-height等于父元素的高度。[demo](1-line-height.html)

2. 元素是行内块级元素, 基本思想是使用display: inline-block, vertical-align: middle和一个伪元素让内容块处于容器中央。[demo](2-display-inline-block.html)
    ```css
    .parent {
        height: 100px;
    }
    .parent::after, .son{
        display:inline-block;
        vertical-align:middle;
    }
    .parent::after{
        content:'';
        height:100%;
        /*width: 10px;*/
        /*background-color: blue;*/
    }
    .son {
        width: 100px;
        height: 10px;
        background-color: red;
    }
    ```
    通过父元素创建一个看不见的伪类（宽度为0），高度为100%，同时设置为`inline-block`和`vertical-align:middle`使元素垂直居中。  
    这是一种很流行的方法, 也适应IE7。

3. 可用`vertical-align`属性，而`vertical-align`只有在元素为`td`或者`th`时，才会生效，对于其他块级元素，例如`div`、`p`等，默认情况是不支持的。为了使用`vertical-align`，我们需要设置父元素`display:table-cell;vertical-align:middle`。[demo](3-table-vertical-align.html)
    ```css
    .parent {
        height: 100px;
        display: table-cell;
        vertical-align: middle;
    }
    .son {
        width: 100px;
        height: 10px;
        background-color: red;
    }
    ```

4. 使用flex布局，`align-items: center;`: [demo](4-flex-align-items-center.html)
    ```css
    .parent {
        height: 100px;
        display: flex;
        align-items: center;
    }
    .son {
        width: 100px;
        height: 10px;
        background-color: red;
    }
    ```

5. 使用CSS3盒模型 [demo](5-display-box.html)
    ```css
    .parent {
        height: 100px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-box-pack: center;
        
        display: -moz-box;
        -moz-box-orient: vertical;
        -moz-box-pack: center;

        display: box;
        box-orient: vertical;
        box-pack: center;
    }
    ```

6. 通过使用决定对位，以及负值的`margin-top`来实现：[demo](6-position-margin-top.html)
    ```css
    .parent {
        position: relative;
        height: 100px;
    }
    .son {
        position: absolute;
        top: 50%;
        margin-top: -0.5 * 高度的一半; 
        width: 100px;
        height: 10px;
        background-color: red;
    }
    ```

7. 使用CSS3中新增的`transform`属性，以及绝对定位:[demo](7-position-transform.html)
    ```css
    .parent {
        position: relative;
        height: 100px;
    }
    .son {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        width: 100px;
        height: 10px;
        background-color: red;
    }
    ```

8. 设置父元素相对定位`position:relative`，子元素如下css样式：
    ```css
    .parent {
        position: relative;
        height: 100px;
    }
    .son {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        width: 100px;
        height: 10px;
        background-color: red;
    }
    ```

## 水平垂直居中
1. flex: [demo]()
    ```css
    .parent {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ```

2. 绝对定位 + `margin`: [demo]()
    ```css
    .parent {
        position: relative;
        height: 100px;
    }
    .son {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -0.5 * 宽度;
        margin-top: -0.5 * 高度;
        width: 100px;
        height: 10px;
        background-color: red;
    }
    ```
3. 绝对定位 + `transform` : [demo]()
    ```css
    .parent {
        position: relative;
        height: 100px;
    }
    .son {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 10px;
        background-color: red;
    }
    ```

4. 绝对定位 + `margin: auto` : [demo]()
    ```css
    .parent {
        position: relative;
        height: 100px;
    }
    .son {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 100px;
        height: 10px;
        background-color: red;
    }
    ```

5. `table` + `margin:auto` : [demo]()
    ```css
    .ancestor {
        display: table;
        width: 100%;
        border: 1px solid blue;
    }
    .parent {
        height: 100px;
        display: table-cell;
        vertical-align: middle;
        border: 1px solid red;
    }
    .son {
        margin: auto;
        width: 100px;
        height: 10px;
        background-color: red;
    }
    ```

## 分析
- flex
    - 基本可以完成任何复杂的布局，
    - 兼容性ie11+
    - 不同浏览器需要前缀
    - 渲染的性能
- 绝对定位
    - \+ `margin` 设置可以完美的兼容ie6，缺点是子元素宽高固定。
    - \+ `transform` 兼容ie11+，但是自由度上是最佳的。


## 参考
- [css-center](https://github.com/Arisons/css-center)
- [Flexbox Is As Easy As Pie: Designing CSS Layouts](https://www.smashingmagazine.com/2013/05/centering-elements-with-flexbox/)