const upload = async function(vm, {
		// #ifdef APP-PLUS || H5
		files,
		// #endif
		// #ifdef H5
		file,
		// #endif
		// #ifdef MP-ALIPAY
		fileType,
		// #endif
		filePath,
		name,
		formData
	}) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			mask: true,
			title: '上传中'
		});
		let data = {
			url: vm.vuex_config.upload.uploadurl,			
			header: {
				token: vm.vuex_token || '',
				uid: vm.vuex_user.id || 0
			},
			name: 'file',
			complete: function() {
				uni.hideLoading();
			},
			success: uploadFileRes => {
				try {
					var res = uploadFileRes.data;
					if (vm.$u.test.jsonString(res)) {						
						resolve(JSON.parse(res))						
					}
					if (vm.$u.test.object(res)) {
						resolve(res)
					}
				} catch (e) {
					reject(uploadFileRes.data);
				}
			},
			fail: (e) => {
				reject(e);
			}
		};
		// #ifdef H5
		//有文件对象，一般是H5
		if(file){
			data.file = file;
		}
		// #endif
		//文件路径
		if(filePath){
			data.filePath = filePath;
		}		
		let isObj = vm.$u.test.object(vm.vuex_config.upload.multipart);
		if (isObj && formData) {					
			data.formData = Object.assign(formData,vm.vuex_config.upload.multipart);			
		}else if(isObj){
			data.formData = vm.vuex_config.upload.multipart;
		}else if(formData){
			data.formData = formData;
		}
		uni.uploadFile(data);
	})

}

const install = (Vue, vm) => {
	vm.$api.config 				= async (params = {}) => await vm.$u.get('http://127.0.0.1:3000/common/init', params);
	
	vm.$api.getxian 				= async (params = {}) => await vm.$u.get('http://127.0.0.1:3000/loc/getxian', params);
	vm.$api.getxiang 				= async (params = {}) => await vm.$u.get('http://127.0.0.1:3000/loc/getxiang', params);
	
	vm.$api.submit 					= async (params = {}) => await vm.$u.get('http://127.0.0.1:3000/submit', params);
	
	vm.$api.getUserIndex 	  		= async (params = {}) => await vm.$u.get('http://127.0.0.1:3000/user/index', params);
	vm.$api.mobilelogin 	  		= async (params = {}) => await vm.$u.get('http://127.0.0.1:3000/user/login', params);
	
	
	vm.$api.feedback 			= async (params = {}) => await vm.$u.post('http://127.0.0.1:3000/user/feedback', params);
	
		
}

export default {
	install
}
