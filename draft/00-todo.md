重排 重绘

6．`尽量避免在选择器末尾添加通配符` CSS 解析匹配到 渲染树的过程是从右到左的逆向匹配，在选择器末尾添加通配符至少会增加一倍多计算量。

7．`减少使用关系型` 样式表的写法直接使用唯一的类名即可最大限度的提升渲染引擎绘制渲染树等效率