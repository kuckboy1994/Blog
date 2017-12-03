# introduce

```bash
which node

```

Glabals 全局变量
__dirname
__filename

console

process

clearImmediate(immediateObject)
clearInterval(intervalObject)
clearTimeout(timeoutObject)
setImmediate(callback[, ...args])
setInterval(callback, delay[, ...args])
setTimeout(callback, delay[, ...args])

Buffer

exports

module
require()

global


path.join(__dirname, 'views', 'view.html') 


```bash
console.log(process.arch);
console.log(process.platform);
console.log('');
console.log(process.pid);
console.log(process.execPath);
console.log('');
console.log(process.version);
console.log(process.getuid());
console.log(process.getgid());
console.log(process.cwd()); 
console.log('');
console.log(process.memoryUsage().rss);
console.log(process.memoryUsage().heapTotal);
console.log(process.memoryUsage().rss);
console.log('');
console.log(process.argv.length);
console.log(process.argv);

// result
x64         
darwin

44986
/usr/local/bin/node

v8.9.1
501
20
/Users/kuckboy/codes/testfile

22110208    常驻内存大小
7708672     v8动态分配堆的大小
5443352     v8分配的已使用的大小
8224        代表V8管理的，绑定到Javascript的C++对象的内存使用情况

2
[ '/usr/local/bin/node',
  '/Users/kuckboy/codes/testfile/01-hello-world/hello-server.js' ]

ps aux 查看进程
whoami 查看登录用户名
id 查看用户信息
process.cwd() 类似 pwd
```

