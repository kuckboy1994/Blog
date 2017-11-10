## 水平居中
1. 若是行内元素，给改元素的父级设置`text-align:center`，即可实现行内元素水平居中。[demo](text-align.html)
2. 若是块级元素, 该元素设置`margin:0 auto`。
3. 若子元素包含`float:left`属性, 为了让子元素水平居中, 则可让父元素宽度设置为`fit-content`,并且配合`margin`, 作如下设置:
    ```css
    .fit-content {
        width: -moz-fit-content;
        width: -webkit-fit-content;
        width: fit-content;
        margin: 0 auto;
    }
    ```
    目前这个属性只支持Chrome和Firefox浏览器。[demo](margin-auto-fit-content.html)
