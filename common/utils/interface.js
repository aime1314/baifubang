import config from './config.js'
/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */

export default {
    config: {
        baseUrl: config.baseUrl,
        header: {
            'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
			'Access-Control-Allow-Credentials': 'true',
        },
        data: {},
        method: "GET",
        dataType: "json", /* 如设为json，会对返回的数据做一次 JSON.parse */
		// #ifdef MP-WEIXIN
        responseType: "text",
		// #endif
		timeout: 5000,
        success() {
        },
        fail() {
        },
        complete() {
        }
    },
    interceptor: {
        request: null,
        response: null
    },
    request(options) {
        if (!options) {
            options = {}
        }
        options.baseUrl = options.baseUrl || this.config.baseUrl
        options.dataType = options.dataType || this.config.dataType
        options.url = options.baseUrl + options.url
        options.data = options.data || {}
        options.method = options.method || this.config.method

        //TODO 数据签名
	   let token = {"token": uni.getStorageSync('token') || ''}
	   options.header = Object.assign({'Content-Type': 'application/json'}, token)
	   // options.header = Object.assign({'Content-Type': 'application/x-www-form-urlencoded' }, token);

        return new Promise((resolve, reject) => {
            let _config = null
			// console.log(options);
            options.complete = (response) => {
                let statusCode = response.statusCode
                response.config = _config
                if (process.env.NODE_ENV === 'development') {
                    if (statusCode === 200) {
                        // console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
                        console.log(response.data, '-----API接口返回数据'); // 注释
                    }
                }
                if (this.interceptor.response) {
                    let newResponse = this.interceptor.response(response)
                    if (newResponse) {
                        response = newResponse
                    }
                }
                // 统一的响应日志记录
                _reslog(response)
                if (statusCode === 200) { //成功
					resolve(response.data);
					if(response.data.code == 200) {
					}else if(response.data.code == 300) {
						console.log("去授权登录");
					}else {
						uni.showToast({
						    title: response.data.message,
						    icon: 'none',
						    duration: 1500
						})
					}
                    
					// console.log(response.data);
					// if(response.data.code != 200) {
					// 	uni.showToast({
					// 	    title: response.data.message,
					// 	    icon: 'none',
					// 	    duration: 1500
					// 	})
					// }else if(response.data.code == 300) {
					// 	return uni.navigateTo({
					// 		url: "/pages/auth/impower"
					// 	})
					// }
                } else {
					uni.showModal({
					    title: '提示',
					    content: '请求超时！当前网络不稳定，请稍后再试...',
						showCancel: false,
						confirmColor: "#FF5C09",
					    success: function (res) {
					        if (res.confirm) {
								uni.reLaunch({
								    url: "/pages/index/index"
								})
					        }
					    }
					});
                    reject(response.data)
                }
            }

            _config = Object.assign({}, this.config, options)
            _config.requestId = new Date().getTime()

            if (this.interceptor.request) {
                this.interceptor.request(_config)
            }

            // 统一的请求日志记录
            _reqlog(_config)

            if (process.env.NODE_ENV === 'development') {
                // console.log("【" + _config.requestId + "】 地址：" + _config.url)
                if (_config.data) {
                    // console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
                }
            }
            // console.log(_config, '-----API原始数据请求');
            // console.log(_config.data, '-----API-请求参数');
            uni.request(_config);
        });
    },
    get(url, data, options) {
        if (!options) {
            options = {}
        }
        options.url = url
        options.data = data
        options.method = 'GET'
        return this.request(options)
    },
    post(url, data, options) {
        if (!options) {
            options = {}
        }
        options.url = url
        options.data = data
        options.method = 'POST'
        options.header = {'Content-Type': 'application/json'}
        return this.request(options)
    }
}


/**
 * 请求接口日志记录
 */
function _reqlog(req) {
    if (process.env.NODE_ENV === 'development') {
        // console.log("【" + req.requestId + "】 地址：" + req.url)
        if (req.data) {
            // console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
        }
    }
    //TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
    let _statusCode = res.statusCode;
    if (process.env.NODE_ENV === 'development') {
        // console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
        if (res.config.data) {
            // console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
        }
        // console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
    }
    //TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
    switch (_statusCode) {
        case 200:
            break;
        case 401:
            break;
        case 404:
            break;
        default:
            break;
    }
}
