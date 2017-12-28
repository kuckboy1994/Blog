/*
 *  @file 方法库-acmd
 *  规范遵循： https://github.com/fex-team/styleguide/blob/master/javascript.md
 *  方法名动词： get/set/del/render/remove/is/
 */

(function() {
	var Acme = {},
		doc = document;
	Acme.debug = true;	//@test
	// window.API = (!window.API || !window.API.use) && {use:function(){}}

	/**
	 * 时间相关的操作
	 * @class Date
	 */
	var Time = {
		/**	
		 * 判断传入日期是否是交易日
		 * @param  {dateString}   date 日期
		 * @param  {Function} callback 回调函数
		 */
		isTradeDate: function (date, callback) {
			if (Tool.typeOf(date) === 'function') {
				callback = date;
				Time.getTime('yyyyMMdd', function (serverTime) {
					Client.getTradeDate(serverTime, function (tradeDate) {
						callback(+serverTime === +tradeDate);
					})
				})
			} else {
				date = Time.formatDay(date);
				Client.getTradeDate(date, function (tradeDate) {
					callback(+date === +tradeDate);
				})
			}
		},

		/**
		 * 判断传入时间是否是交易时间
		 * 【主动扩大了交易日时间的范围，保证数据在脚本延时之后能请求到数据】
		 * @param  {timeString} time   时间
		 * @param  {Function} callback 回调函数
		 */
		isTradeTime: function (time, callback) {
			Console.log('isTradeTime', '【主动扩大了交易日时间的范围，±30分钟，保证数据在脚本延时之后能请求到数据】');
			if (Tool.typeOf(time) === 'function') {
				callback = time;
				Time.getTime('hhmm', function (serverTime) {
					serverTime = +serverTime;
					callback(serverTime >= 900 && serverTime <= 1530);
				});
			} else {
				time = +time;
				callback(time >= 900 && time <= 1530);
			}
		},
	
		/**
		 * 格式化服务器时间
		 * @param  {string}   pattern  匹配的模式
		 * @param  {Function} callback 回调函数
		 */
		getTime: function (pattern, callback) {
			Time.getTimeUTC(function (timeStamp) {
				callback(Time.formatDate(pattern, new Date(timeStamp)));
			});
		},

		/**
		 * 格式化时间
		 * @param  {date}   date    date对象
		 * @param  {string} pattern 匹配的模式
		 * @return {[type]}         格式化时间
		 */
		formatDate: function (date, pattern) {
			if (Console.youNeed(date, ['date']) || Console.youNeed(pattern, ['string'])) return;
			var o = {
				"M+": date.getMonth() + 1, //月份 
				"d+": date.getDate(), //日 
				"h+": date.getHours(), //小时 
				"m+": date.getMinutes(), //分 
				"s+": date.getSeconds() //秒 
			};
			if (/(y+)/.test(pattern)) 
				pattern = pattern.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp('(' + k + ')').test(pattern)) 
					pattern = pattern.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
			return pattern;
		},
		
		/**
		 * 获取服务端时间戳
		 * @param  {Function} callback 回调函数
		 */
		getTimeUTC: function (callback) {
			API.use({
				method: 'Quote.getServerTime',
				success: function (result) {
					callback(result*1000);
				},
				error: function(ecode, emsg) {
					callback(+new Date(), ecode + ' : ' + emsg);
				},
				notClient: function() {
					callback(+new Date());
				}
			});
		},

		/**
		 * 格式化日期
		 * @require Time.formatDate
		 * 
		 * @param  {date string} str  时间字符串
		 * @param  {string} 	 type 分割字符串 特殊可以传'zh' 返回带中文的时间
		 * @return {string}      	  格式化的日期
		 */
		formatDay: function (str, type) {
			if (Console.youNeed(str, ['string', 'number'])) return;
			type = type || '';
			
			str += '';
			var t;
			if(/\d{13}/.test(str)) {
				t = new Date(+str);
			} else {
				var r = str.match(/([\w]{4})[-]{0,1}([\w]{2})[-]{0,1}([\w]{2})/),
				t = new Date(r[1] + '/' + r[2] + '/' + r[3]);
			}

			return type !== 'zh' ? 
						Time.formatDate(t, 'yyyy'+ type +'MM'+ type +'dd') : 
						Time.formatDate(t, 'yyyy年MM月dd日');
		}
	};
	
	// 导出Time对象下的方法
	Acme.isTradeDate = Time.isTradeDate;
	Acme.isTradeTime = Time.isTradeTime;
	Acme.getTime = Time.getTime;
	Acme.formatDate = Time.formatDate;
	Acme.getTimeUTC = Time.getTimeUTC;
	Acme.formatDay = Time.formatDay;

	/**
	 * 调用客户端的相关操作
	 * @class Client
	 */
	var Client = {
		/**
		 * 获取行情数据
		 * @param  {object} params  参数
		 * @param  {function} success 成功回调函数
		 * @param  {function} error   失败回调函数
		 */
		getClientData: function (params, success, error) {
			API.use({
				method: 'Quote.getData2',
				data: params,
				success: function(data){
					success && success(eval('(' + data + ')'));
				},
				error: function (ecode, emsg) {
					error && error(null, ecode + ' : ' + emsg);
				},
				notClient: function () { // todo
					error && error({});
				} 
			});
		},

		getHqData: function (params, success, error) {
			API.use({
				method: 'Quote.request',
				data: params,
				success:function(){
					Client.getClientData(params, success, error);
				},
				error: function (data) {error && error(data)},
				notClient: function (data) {error && error(data)}
			});
		},
		
		/**
		 * switchPage的封装
		 * @param  {obj}      data     数据 {id: 65, code: 300033}
		 * @param  {Function} callback 回调函数
		 * @return {[type]}            [description]
		 */
		switchPage: function (data, callback) {
			API.use({
				method:'Quote.switchPage',
				data:data,
				success: function(res){
					callback && callback(res);
				}
			});
		},

		/**
		 * 跳转k线
		 * @param  {code}   code 股票代码
		 */
		go2Kline: function (code) {
			Client.switchPage({
				id:65,
				code:code
			})
		},

		/**
		 * 跳转分时
		 * @param  {code} code   股票代码
		 */
		go2TimeLine: function (code) {
			Client.switchPage({
				id:379,
				code:code
			})
		},

		
		/**	
		 * 获取自选股
		 * @param  {Function} callback 回调函数
		 */
		getSelfStock: function (callback) {
			API.use({
				method: 'Passport.selfStocks',
				success: function(result) {
					callback(eval(result));
				},
				error: function (ecode, emsg) {
					callback(null, ecode + ' : ' + emsg);
				}
			});
		},

		/**
		 * 修改自选股
		 * notClient 把参数返回，自行处理
		 * 
		 * @param {string}			type     类型 add, del
		 * @param {code|string}		code     股票代码
		 * @param {Function}		callback 回调函数
		 */
		setSelfStock: function (type, code, callback) {
			API.use({
			    method: 'Quote.setSelfStock',
			    data: {
			        mode: type,
			        code: code
			    },
			    success: function(result) {
			        callback(result);
			    },
			    error: function (ecode, emsg) {
					callback(null, ecode + ' : ' + emsg);
			    },
			    notClient: function () {
					callback({type: type, code: code});
			    }
			});
		},
		/**
		 * 获取传入日期是否是交易日，否则返回下一个交易日
		 * @param  {timeString}   fmtdate  格式化的时间
		 * @param  {Function}     callback 回调函数
		 */
		getTradeDate: function (fmtdate, callback) {
			API.use({
				method: 'Quote.getSHTradeDate',
				data: fmtdate,
				success: function(result) {
					callback(result);
				}
			});
		},
		/**
		 * 获取传入日期前一天是否是交易日，否则返回传入日期的前一个交易日
		 * @param  {timeString}   fmtdate  格式化的时间
		 * @param  {Function}     callback 回调函数
		 */
		getPreTradeDate: function (fmtdate, callback) {
			API.use({
                method: 'Quote.getPreSHTradeDate',
                data: fmtdate,
                success: function(result) {
                    callback(result);
                }
            });
		},
		/**
		 * 读取本地文件的信息
		 * @param  {string}   path     相对路径
		 * @param  {Function} callback [description]
		 */
		readFile: function (path, callback) {
			Client.getUserPath(function (absPath) {
				API.use({
					method: 'fileReader.open',
					data: absPath + path,
					success: function (d) {
						if(!d) {
							callback(false);
							return false;
						}  // 没有读取到文件时，阻断继续
						API.use({
							method: 'fileReader.read',
							success: function (data) {
								API.use({ method: 'fileReader.close'});
								callback(data);
							}
						});
					}
				});
			});
		},
		/**
		 * 向本地文件写入信息
		 * @param  {string}   content  写入的内容
		 * @param  {string}   path     相对路径
		 * @param  {Function} callback [description]
		 */
		writeFile: function (content, path, callback) {
			Client.getUserPath(function (absPath) {
				API.use({
					method: 'fileWriter.open',
					data: absPath + path,
					success: function (d) {
						if(!d) { // 没有读取到文件时，阻断继续
							callback(false); 
							return false;
						}  
						API.use({
							method: 'fileWriter.write',
							data: content,
							success: function (data) {
								API.use({ method: 'fileWriter.close'});
								callback(data);
							}
						});
					}
				});
			});
		},
		/**
		 * 获取当前用户的绝对路径
		 * @param  {Function} callback 回调函数
		 */
		getUserPath: function (callback) {
			API.use({
				method: 'external.getUserPath',
				success: function (path) {
					callback(path);
				},
				error: function (ecode, emsg) {
					callback(null, ecode + ' : ' + emsg);
				}
			});
		},

		/**
		 * 判断浏览器和客户端环境
		 * @return {number}  1:客户端chrome -1:客户端ie 0:非客户端
		 */
		getClientEnv: function () {
			if ((window.external && "createObject" in window.external) && window.cefQuery) {
				return 1;
			} else if (window.external && "getUserPath" in window.external) {
				return -1;
			}
			return 0;
		},

		/**
		 * 获得客户端规整后版本号
		 * @param  {Function} callback 会返回两个值，一个是不带点的版本号，一个是带点的版本号
		 */
		getClientVer: function (callback) {
			var hxVersion = 'E020.00.00.0000';
			API.use({
				method: 'Util.getHxVer',
				success: function (hxVersion) {
					var hxVerArr = hxVersion.split('.');
					var version = hxVerArr[0].substr(3) + hxVerArr[1] + hxVerArr[2] + hxVerArr[3];
					var _version = hxVerArr[0].substr(3) + '.' + hxVerArr[1] + '.' + hxVerArr[2];
					callback(_version, version);
				},
				error: function (ecode, emsg) {
					callback('0000000000', '00.00.00.0000', ecode + ' : ' + emsg);
				},
				notClient: function () {
					callback('2000000000', '20.00.00.0000', 1);
				}
			});
		},


		versionKey: {
			1: '',
			2: '',
			3: '',
			4: '',
			5: '',
			6: '金融大师'
		},
		/**
		 * 获取客户端版本对应关系
		 * @return {object}		对应关系
		 */
		getVerisonKey: function () {
			return Client.versionKey;
		},
		/**
		 * 获取客户端版本的id
		 * @param  {Function} callback 回调函数
		 */
		getClientPro: function (callback) {
			window.API.use({
				method: 'Util.getHxProduct',
				success: function(num) {
					callback(num);
				}
			});
		},

		getSid: function () {
			
		},

		/**
		 * 注册方法
		 * @param  {object} data    [description]
		 * @param  {[type]} type    [description]
		 * @param  {[type]} success [description]
		 * @param  {[type]} error   [description]
		 * @return {[type]}         [description]
		 */
		registerEventNotify: function (data, type, success, error) {
			var quoteSessionId = window.API.createSessionId('Quote');
			window.API.use({
				method: 'Quote.registerPush',
				data: data,
				sessionId: quoteSessionId,
				persistent: true,
				callbackName: 'onready',
				success: function(data){
					window.API.use({
						method:'Quote.getData2',
						data:{
							code: data,
							type: type,
							period: 'now',
							mode: 'after'
						},
						success: function(data){
							success && success(data);
						},
						error: function (data) {
							error && error(data);
						} 
					});
				},
				error: function (data) {
					error && error(data);
				}
			});
			return quoteSessionId;
		},
		
		/**
		 * 取消注册
		 * @param  {[type]} quoteSessionId [description]
		 * @param  {[type]} success        [description]
		 * @param  {[type]} error          [description]
		 * @return {[type]}                [description]
		 */
		unregisterEventNotify: function (quoteSessionId, success, error) {
			window.API.use({
				method:'Quote.unregisterPush',
				sessionId: quoteSessionId
			});
		}
	};
	
	// 行情数据
	Acme.getClientData = Client.getClientData;
	Acme.getHqData = Client.getHqData;

	// 页面跳转
	// Acme.switchPage = Client.switchPage;	// 不对外暴露
	Acme.go2Kline = Client.go2Kline;
	Acme.gotoKline = Client.go2Kline;
	Acme.go2TimeLine = Client.go2TimeLine;
	Acme.gotoTimeLine = Client.go2Kline;
	
	// 自选股
	Acme.getSelfStock = Client.getSelfStock;
	Acme.setSelfStock = Client.setSelfStock;

	// 交易时间
	Acme.getTradeDate = Client.getTradeDate;
	Acme.getPreTradeDate = Client.getPreTradeDate;

	// 文件读写
	// Acme.getUserPath = Client.getUserPath; // 不对外暴露
	Acme.readFile = Client.readFile;
	Acme.writeFile = Client.writeFile;
	
	// 环境版本
	Acme.getClientEnv = Client.getClientEnv;
	Acme.getClientVer = Client.getClientVer;
	Acme.getVerisonKey = Client.getVerisonKey;
	Acme.getClientPro = Client.getClientPro;
	
	// 权限
	Acme.getSid = Client.getSid;

	// 推送
	Acme.registerEventNotify = Client.registerEventNotify;
	Acme.unregisterEventNotify = Client.unregisterEventNotify;


	/**
	 * 常用工具
	 * @class Tool
	 */
	var Tool = {
		class2type: {
			'[object Number]': 'number',
			'[object String]': 'string',
			'[object Boolean]': 'boolean',
			'[object Undefined]': 'undefined',
			'[object Null]': 'null',
			'[object Object]': 'object',
			'[object Array]': 'array',
			'[object Date]': 'date',
			'[object Error]': 'error',
			'[object RegExp]': 'regexp',
			'[object Function]': 'function'
		},
		
		/**
		 * 单位化数字
		 * @param  {number} v      值
		 * @param  {number} fixed  保留位数
		 * @param  {number} maxLen 最大程度 不能小于4 默认5
		 * @return {string}        单位化的数字
		 */
		getUnit: function (v, fixed, maxLen) {
			if (Console.youNeed(v, ['number']) 
				|| Console.youNeed(fixed, ['number', 'undefined']) 
				|| Console.youNeed(maxLen, ['number', 'undefined'])) return;

			fixed = Tool.typeOf(fixed) === 'undefined' ? 2 : fixed;
			maxLen = Tool.typeOf(maxLen) === 'undefined' ? 5 : maxLen;
			if (fixed < 0) {
				Console.warn('fixed need >= 0');
				return;
			}
			if (maxLen < 4) {
				Console.warn('maxLen need >= 4');
				return;
			} 

			var unit = '';
			var op = v < 0 ? '-' : '';
			v = Math.abs(v);
			if (v > 1000000000000) {
				unit = '兆';
				v/=1000000000000;
			} else if (v > 100000000) {
				unit = '亿';
				v/=100000000;
			} else if (v > 10000) {
				unit = '万';
				v/=10000;
			}

			var t = maxLen - v.toString().split('.')[0].length;
			return op + v.toFixed(t > fixed ? fixed : t) + unit;
		},
		
		/**
		 * 排序方法
		 * @param  {array}  data   要排序的数组
		 * @param  {Boolean} isAsc 是否按照正序排
		 * @param  {string}  key   排序元素为对象时，排序的关键字
		 * @return {array}         排完序的数组
		 */
		sort: function (data, isAsc, key) {
			if (Console.youNeed(data, ['array'])) return;

			if (data.length === 0) return [];
			
			var tmp, vs = function(a, b) {  // @llh
				if(a === '--' || a === 'NUL' || 
					Tool.typeOf(a) === 'undefined' || Tool.typeOf(a) === 'null' ) return 1;
				if(b === '--' || b === 'NUL' || 
					Tool.typeOf(b) === 'undefined' || Tool.typeOf(b) === 'null' ) return -1;
				return 0;
			}

			if (Tool.typeOf(data[0]) === 'object') {
				return data.sort(function (a, b) {
					if( tmp = vs(a[key], b[key]) ) { return tmp }
					return isAsc ? a[key] - b[key] : b[key] - a[key];
				});
			} else {
				return data.sort(function (a, b) {
					if( tmp = vs(a, b) ) { return tmp }
					return isAsc ? a - b : b - a;
				});
			}
		},

		/**
		 * 求数组中最大值的索引
		 * @param  {[array]}  arr [description]
		 * @return {[number]}     [description]
		 */
		/*max: function (arr) {
			if (Console.youNeed(arr, ['array'])) return;

			if (arr.length === 0) return -1;
			
			var maxIndex = 0;
			Tool.each(arr, function (i, v) {
				if (v > arr[maxIndex]) maxIndex = i;
			})
			return maxIndex;
		},*/
	
		/**
		 * 求数组中最小值的索引
		 * @param  {[array]}  arr [description]
		 * @return {[number]}     [description]
		 */
		/*min: function (arr) {
			if (Console.youNeed(arr, ['array'])) return;
			
			if (arr.length === 0) return -1;

			var minIndex = 0;
			Tool.each(arr, function (i, v) {
				if (v < arr[minIndex]) minIndex = i;
			})
			return minIndex;
		},*/

		/**
		 * 拓展类型判断
		 * 可以判断的类型包括
		 * number
		 * string
		 * boolean
		 * undefined
		 * null
		 * object
		 * array
		 * date
		 * error
		 * regexp
		 * function
		 * @param  {type} 	obj 要判断类型的'对象'
		 * @return {string}     返回'对象'的类型的字符串 统一小写
		 */
		typeOf: function (obj) {
			if (obj == null) {
		        return obj + '';
		    }
		    return typeof obj === 'object' || typeof obj === 'function' ?
		        Tool.class2type[Object.prototype.toString.call(obj)] || 'object' :
		        typeof obj;
		},
	

		/**
		 * 遍历对象和数组
		 * @param  {array|object} 	arr  [description]
		 * @param  {function} 		func 回调函数
		 */
		each: function (arr, func) {
			if (Console.youNeed(arr, ['array', 'object']) || Console.youNeed(func, ['function'])) return;

			var type = Tool.typeOf(arr);
			if (type === 'array') {
				for (var i = 0; i < arr.length; i++) func(i, arr[i]);
			} else if (type === 'object') {
				for (var k in arr) arr.hasOwnProperty(k) && func (k , arr[k]);
			}
		},
		
		/**
		 * 深度克隆
		 * @param  {object} obj 被克隆的对象
		 * @return {object}     克隆对象
		 */
		deepClone: function (obj) {
			if (Array.isArray(obj)) {
				return obj.map(Tool.deepClone);
			} else if (obj && typeof obj === 'object') {
				var cloned = {};
				var keys = Object.keys(obj);
				console.log('keys', keys);
				for (var i = 0, l = keys.length; i < l; i++) {
					var key = keys[i];
					cloned[key] = Tool.deepClone(obj[key]);
				}
				return cloned;
			} else {
				return obj;
			}
		},
		
		/**
		 * 节流
		 * @param  {function} func    回调函数
		 * @param  {number} wait      等待时间（毫秒）
		 * @param  {function} options 配置收尾是否执行
		 * 					options.leading   默认true
		 * 					options.trailing  默认true
		 * @return {function}         返回一个注入了上下文和事件对象的节流函数
		 */
		throttle: function (func, wait, options) {
			if (Console.youNeed(func, ['function'])) return;
			wait = Tool.typeOf(wait) === 'undefined' ? 500: wait;

			var timeout, context, args, result;
			var previous = 0;
			if (!options) options = {};

			var later = function() {
			    previous = options.leading === false ? 0 : new Date().getTime();
			    timeout = null;
			    func.apply(context, args);
			    if (!timeout) context = args = null;
			};

			var throttled = function() {
			    var now = +new Date();
			    if (!previous && options.leading === false) previous = now;
			    var remaining = wait - (now - previous);
			    context = this;
			    args = arguments;
			    if (remaining <= 0 || remaining > wait) {
			        if (timeout) {
			            clearTimeout(timeout);
			            timeout = null;
			        }
			        previous = now;
			        func.apply(context, args);
			        if (!timeout) context = args = null;
			    } else if (!timeout && options.trailing !== false) {
			        timeout = setTimeout(later, remaining);
			    }
			};
			return throttled;
		},
		
		/**
		 * 防抖
		 * 常用在频繁的事件触发上
		 * window 的 resize、scroll
		 * mousedown、mousemove
		 * keyup、keydown
		 * 
		 * @param  {function} func      回调函数
		 * @param  {number} wait    	等待时间（毫秒）
		 * @param  {boolean} immediate  是否立即执行
		 * @return {function}           返回一个注入了上下文和事件对象的防抖函数
		 */
		debounce: function (func, wait, immediate) {
			if (Console.youNeed(func, ['function'])) return;
			
			wait = Tool.typeOf(wait) === 'undefined' ? 500: wait;

			var timeout;

			return function () {
				var context = this;
				var args = arguments;

				if (timeout) clearTimeout(timeout);
				if (immediate) {
					// 如果已经执行过，不再执行
					var callNow = !timeout;
					timeout = setTimeout(function(){
						timeout = null;
					}, wait)
					if (callNow) func.apply(context, args)
				}
				else {
					timeout = setTimeout(function(){
						func.apply(context, args)
					}, wait);
				}
			}
		},
		
		/**
		 * 获取url中的参数
		 * @param  {[string]} name 参数名
		 * @param  {[string]} url  链接地址【可不传】
		 * @return {[string]}      参数对应的值
		 */
		getUrlQuery: function (name, url) {
			if (Console.youNeed(name, ['string', 'number'])) return;
			if (Console.youNeed(url, ['string', 'undefined'])) return;

			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
				r_txt = url ? url.split('?')[1] : window.location.search.substr(1),
				r = r_txt.match(reg);
			return r ? decodeURIComponent(r[2]) : null;
		},
		
		/**
		 * 判断a在arr中的位置
		 * @param  {string}  a        判断的字符串
		 * @param  {array}   arr      被遍历的数组
		 * @param  {Boolean} isStrict 是否使用全等 默认全等
		 * @return {number}           index值，没有返回-1
		 */
		inArray: function (a, arr, isStrict) {
			isStrict = Tool.typeOf(isStrict) === 'undefined' ? true : isStrict;

			for (var i = 0; i < arr.length; i++) {
				if (isStrict ? arr[i] === a : arr[i] == a) return i;
			}
			
			return -1;
		},

		/**
		 * 获取cookie
		 * @param  {string} name cookie中的key
		 * @return {string}      对应的value
		 */
		getCookie: function (name) {
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
			return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
		},

		/**
		 * 设置cookie
		 * @param {string} name  cookie中的key
		 * @param {string} value 对应的value
		 */
		setCookie: function (name, value) {
			var Days = 30; 
			var exp = new Date(); 
			exp.setTime(exp.getTime() + Days*24*60*60*1000); 
			document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
		},
		
		/**
		 * 删除cookie
		 * @param  {string} name cookie中的key
		 */
		delCookie: function (name) {
			var exp = new Date(); 
			exp.setTime(exp.getTime() - 1); 
			var cval=getCookie(name); 
			if(cval!=null) 
			document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
		},
		
		/**
		 * 请求jsonp数据
		 * @param  {string}   url          请求地址
		 * @param  {string}   callbackName [description]
		 * @param  {Function} callback     回调函数
		 */
		jsonp: function (url, callbackName, callback) {
			callbackName = callbackName || 'jsonp_callback_' + (+new Date()) + Math.round(1000 * Math.random());
			window[callbackName] = function (data) {
				delete window[callbackName];
				document.body.removeChild(script);
				callback(data);
			}

			var script = document.createElement('script');
			script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
			document.body.appendChild(script);
		}
		// ,uniqueArray: function (arr) {
		// 	if (Console.youNeed(arr, ['array'])) return;
		// 	// Tool.typeOf

		// }
	};

	// Tool
	Acme.getUnit = Tool.getUnit;
	Acme.sort = Tool.sort;
	Acme.typeOf = Tool.typeOf;
	Acme.each = Tool.each;
	Acme.deepClone = Tool.deepClone;
	Acme.debounce = Tool.debounce;
	Acme.throttle = Tool.throttle;
	Acme.getUrlQuery = Tool.getUrlQuery;
	Acme.inArray = Tool.inArray;
	Acme.getCookie = Tool.getCookie;
	Acme.setCookie = Tool.setCookie;
	Acme.delCookie = Tool.delCookie;

	/**
	 * 页面渲染
	 * @class Render
	 */
	var Render = {
		/**
		 * 用于渲染Quote.getData2的数据，如zqmc
		 * 约定渲染 $(el).find('[attr]').html(xx) , xx 内容利用beforeRender回调给开发者定制化处理
		 * 
		 * @param  {string}   key		获取的数据字段 如：NEW，pre，zqmc
		 * @param  {string}   el		限定查找范围的元素
		 * @param  {object}   obj		次要参数包括emptyText（无数据显示内容）、attr（dom中属性）、beforeRender（渲染前的钩子）
		 * 
		 * @require { Elem }
		 * @require Client.getClientData
		 */
		renderClientData: function (key, el, obj) {
			if (Console.youNeed(key, ['string']) 
				|| Console.youNeed(el, ['string', 'undefined']) 
				|| Console.youNeed(obj, ['object', 'undefined'])) return;

			obj = {
				emptyText: obj.emptyText || '--',
				attr: obj.attr || 'client-code',
				beforeRender: obj.beforeRender || function(v, code) {return v}
			};

			var codes = [],
				doms = Elem.getAttrElems(obj.attr),

			render = function(res) {
				Tool.each(doms, function (k, v) {
					var stock = v.getAttribute(attr);
					// var value = Tool.typeOf(res[stock][key]) ? res[stock][key] : emptyText;
					var value = res && res[stock] && res[stock][key] 
						&& res[stock][key] !== 'NUL' ? res[stock][key] : obj.emptyText // @llh
					v.innerHTML = beforeRender(value, stock); // @llh
				});
			};

			Tool.each(doms, function (k, v) {
				codes.push(v.getAttribute(obj.attr));
			});
			
			Client.getClientData({
				code: codes,
				type: [key],
				period: 'now',
				mode: 'after'
			}, function (res) {
				render(res)
			}, function (e) {
				render()
			});
		},
		
		/**
		 * 用于渲Quote.request再Quote.getData2的数据，如new
		 * 约定渲染 $(el).find('[attr]').html(xx) , xx 内容利用beforeRender回调给开发者定制化处理
		 * 常用的一些key提供默认的boforeRender, 如if key='zhangdiefu' ， 走 getZDFText
		 * 
		 * @param  {string}   key		获取的数据字段 如：NEW，pre，zqmc
		 * @param  {string}   el		限定查找范围的元素
		 * @param  {object}   obj		次要参数包括emptyText（无数据显示内容）、attr（dom中属性）、beforeRender（渲染前的钩子）
		 * 
		 * @require { Elem }
		 * @require Client.getClientData
		 * @require Render.getZDFText
		 */
		renderHqData: function (key, el, obj) {
			if (Console.youNeed(key, ['string']) 
				|| Console.youNeed(el, ['string', 'undefined']) 
				|| Console.youNeed(obj, ['object', 'undefined'])) return;

			obj = {
				emptyText: obj.emptyText || '--',
				attr: obj.attr || 'hq-code',
				beforeRender: obj.beforeRender || (key === 'zhangdiefu' ? Tool.getZDFText : function(v, code) {return v})
			}
			var codes = [];
			var doms = Elem.getAttrElems(obj.attr);
			var render = function(res) {
				Tool.each(doms, function (k, v) {
					var stock = v.getAttribute(attr);
					// var value = Tool.typeOf(res[stock][key]) ? res[stock][key] : emptyText;
					var value = res && res[stock] && res[stock][key] 
						&& res[stock][key] !== 'NUL' ? res[stock][key] : emptyText // @llh
					v.innerHTML = beforeRender(value, stock); // @llh
				});
			}
			
			Tool.each(doms, function (k, v) {
				codes.push(v.getAttribute(obj.attr));
			});
			
			Client.getHqData({
				code: codes,
				type: [key],
				period: 'now',
				mode: 'after'
			}, function (res) {
				render(res)
			}, function (e) {
				render()
			});
		},
	
		/**
		 * 处理涨跌幅数据固定格式
		 * @require Render.getHqText
		 * @param  {number} value     处理的数据
		 * @param  {string} emptyText 默认输出值
		 * @return {string}           格式化标签内容
		 */
		getZDFText: function (value, emptyText) {
			if (Tool.typeOf(value) === 'number') {
				return '<span class="' + (value === 0 ? 'cn' : value > 0 ? 'cr' : 'cg') + '">' + Render.getHqText(value, {emptyText: emptyText}) + '</span>';
			} else {
				return '<span class="cn">' + emptyText + '</span>';
			}
		},
		
		/**
		 * 获取格式化行情数据
		 * @param  {number} value 格式化数据
		 * @param  {object} obj   参数
		 * @return {string}       格式化行情数据
		 */
		getHqText: function (value, obj) {
			obj = {
				emptyText: obj.emptyText || '--',
				unit: obj.unit || '',
				decimalLen: obj.decimalLen || 2
			};

			if (Tool.typeOf(value) !== 'number') {
				return obj.emptyText;
			}

			if (value === 0) {
				return value.toFixed(2);
			} else if (value > 0) {
				return '+' + value.toFixed(obj.decimalLen) + obj.unit;
			} else {
				return value.toFixed(obj.decimalLen) + obj.unit;
			}
		}
	};

	Acme.renderClientData = Render.renderClientData;
	Acme.renderHqData = Render.renderHqData;
	Acme.getZDFText = Render.getZDFText;

	/**
	 * @class Elem
	 */
	var Elem = {
		characterEncoding: "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
		getClassElems: function(className, el) {
			el = el || doc;
			if (doc.getElementsByClassName) {
				return doc.getElementsByClassName(className)
			} else {
				var retnode = [];
				var elem = el.getElementsByTagName('*');
				for (var i = 0; i < elem.length; i++) {
					if ((' ' + elem[i].className + ' ').indexOf(' ' + className + ' ') > -1) retnode.push(elem[i]);
				}
				return retnode;
			}
		},
		// el只接受class或id或空
		getAttrElems: function(attr, el) {
			if(!attr) { return }
			var match = {
				ID:  new RegExp( "^#(" + Elem.characterEncoding + ")" ),
				CLASS: new RegExp( "^\\.(" + Elem.characterEncoding + ")" )
			};
			var t, dom;
			if(el) {
				if(t = el.match(match['ID'])) {
					dom = doc.getElementById(t[1]);
				} else if(t = el.match(match['CLASS'])){
					dom = Elem.getClassElems(t[1]);
				}
				console.log(dom)
				if(!dom) {
					Console.warn('cannot find dom ' + el);
					return;
				}
			} else {
				dom = doc;
			}

			var retnode = [];
			var elem = dom.getElementsByTagName('*');
			for(var i = 0; i < elem.length; i++) {
				if(elem[i].getAttribute(attr)) {
					retnode.push(elem[i])
				}
			}
			return retnode;
		}
	};

	/**
	 * @class Console
	 */
	var Console = {
		output: function(type, text) {
			if (!Acme.debug) { return; }
			text = '[Acme] ' + type + ' message: ' + text;
			if (console && type === 'log') {
				console.log(text)
			} else if (console && type === 'warn') {
				console.warn(text);
			} else {
				alert(text);
			}
		},
		log: function(text) {
			this.output('log', text);
		},
		warn: function(text) {
			this.output('warn', text);
		},
		youNeed: function (obj ,arr) {
			var type = Tool.typeOf(obj);
			if (Tool.inArray(type, arr) === -1) {
				Console.warn('you need input ['+arr.join(' | ')+']');
				return true;
			}
			return false;
		}
	};

	if (typeof module !== 'undefined' && typeof exports === 'object') {
		module.exports = Acme;
	} else if (typeof define === 'function' && (define.amd || define.cmd)) {
		define(function() { return Acme })
	}
	window.Acme = Acme;
	// window.A = Acme;
})()