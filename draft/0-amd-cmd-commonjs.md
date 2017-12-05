# 了解一下amd、cmd、CommonJS之间的关系

## AMD((Asynchromous Module Definition)
`AMD` 是 `RequireJS` 在推广过程中对模块定义的规范化产出。

## CMD
`CMD` 是 `SeaJS` 在推广过程中对模块定义的规范化产出。

## CommonJS
`Node`应用由模块组成，采用`CommonJS`模块规范。
每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

## CMD和AMD的区别
1. 对于依赖的模块AMD是提前执行，CMD是延迟执行。不过RequireJS从2.0开始，也改成可以延迟执行（根据写法不同，处理方式不通过）。 
2. CMD推崇依赖就近，AMD推崇依赖前置。 
    ```js
    //AMD 
    define(['./a','./b'], function (a, b) { 

        //依赖一开始就写好 
        a.test(); 
        b.test(); 
    }); 

    //CMD 
    define(function (requie, exports, module) { 
        
        //依赖可以就近书写 
        var a = require('./a'); 
        a.test(); 
        
        ... 
        //软依赖 
        if (status) { 
        
            var b = requie('./b'); 
            b.test(); 
        } 
    }); 
    ```
    虽然 AMD也支持CMD写法，但依赖前置是官方文档的默认模块定义写法。 
3. AMD的api默认是一个当多个用，CMD严格的区分推崇职责单一。例如：AMD里require分全局的和局部的。CMD里面没有全局的 require,提供 seajs.use()来实现模块系统的加载启动。CMD里每个API都简单纯粹。 

## 参考
- [CommonJS，AMD，CMD区别](http://zccst.iteye.com/blog/2215317)
- [ranyifeng](http://javascript.ruanyifeng.com/nodejs/module.html)