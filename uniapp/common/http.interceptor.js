//免登录接口
let noLoginUrl = [	
];

//设置session_id
const getSessionId = function(vm) {
	let session = vm.$util.getDb('session');	
	if (!session) {
		let guid = vm.$u.guid();		
		vm.$util.setDb('session', guid);
		return guid;
	}
	return session;
}

// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
const install = (Vue, vm) => {
	let url = 'http://chrisyy.top:5000'

	Vue.prototype.$u.http.setConfig({
		// baseUrl: url,
		header: {
			'content-type': 'application/json'
		},
		originalData: true
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {		
		//在需要登录的接口，请求前判断token 是否存在,不存在则到登录

		// if (noLoginUrl.indexOf(config.url) == -1 && !vm.vuex_token) {
		// 	vm.$u.route('/pages/login/mobilelogin');
		// 	return false;
		// }
		config.header.token = vm.vuex_token;
		config.header.Authorization = 'Bearer ' + vm.vuex_token;
		console.log('header token:',config.header.Authorization)

		config.header['x-requested-with'] = 'xmlhttprequest';		
	
		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {			

		let result = res.data;		
		switch (result.code) {
			case 1:
			case 0:
				return result;
				break;
			case 401:
				//需要登录的接口，当token 过期时，到登录页面
				vm.$u.vuex('vuex_token', '');
				vm.$u.route('/pages/login/mobilelogin');
				return result;
				break;
			case 403: //没有权限访问
				uni.showToast({
					icon: "none",
					title: result.msg
				})
				return result;
				break;
			default:
				if (res.statusCode == 200) {
					return res.data;
				} else {
					console.error(res)
					vm.$u.toast('网络请求错误！');
				}
		}

	}
}

export default {
	install
}
