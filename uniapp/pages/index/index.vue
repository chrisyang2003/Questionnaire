<template>
	<view>
		<!-- 顶部导航 -->
		<fa-navbar title="首页" :border-bottom="false"></fa-navbar>
		<u-swiper :list="vuex_config.swiper" border-radius="0" :title="true" :height="400" @click="openPage"></u-swiper>
		<view class="index-content u-p-30 u-skeleton" :style="[indexStyle]">
			<view class="notice" v-if="notice.length">
				<u-notice-bar
					mode="horizontal"
					border-radius="10"
					:duration="5000"
					:is-circular="false"
					:color="theme.bgColor"
					:bg-color="theme.lightColor"
					:list="notice"
					@click="click"
				></u-notice-bar>
			</view>
			
			<u-cell-group style="margin-top: 30rpx;">
					<u-cell-item icon="home-fill" title="乡镇测评" @click="goPage('/pages/exam/xiang', true)"></u-cell-item>
					<u-cell-item icon="home" title="县部门测评" @click="goPage('/pages/exam/xian', true)"></u-cell-item>
				</u-cell-group>

		</view>

		<fa-tabbar></fa-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: true
		};
	},
	async onShow() {

	},
	computed: {
		notice() {
			let arr = [];
			if (this.vuex_config.notice) {
				this.vuex_config.notice.map(item => {
					arr.push(item.title);
				});
			}
			return arr;
		},
		indexStyle() {
			let style = {};
			if (this.notice.length > 0) {
				style.top = '-60rpx';
			} else {
				style.top = '-30rpx';
			}
			return style;
		}
	},
	methods: {
		
		
		goxiang(){
			
		},
		grids(e) {
			let path = e.path;
			if (path == '/' || !path) {
				return;
			}
			if (path.substr(0, 1) == 'p') {
				path = '/' + path;
			}
			if (path.indexOf('http') != -1) {
				this.$u.vuex('vuex_webs', {
					path: e.path,
					title: e.name
				});
				this.$u.route('/pages/webview/webview');
				return;
			}
			// #ifdef APP-PLUS
			path = path.replace(/map/, 'nmap');
			// #endif
			this.$u.route(path);
		},
		openPage(index) {
			this.grids({
				path: this.vuex_config.swiper[index].path,
				name: this.vuex_config.swiper[index].name
			});
		},
		click(index) {
			if (this.vuex_config.notice) {
				let url = this.vuex_config.notice[index].path;
				if (url) {
					this.grids({
						path: url,
						name: this.vuex_config.notice[index].title
					});
				}
			}
		}
	},
	onPageScroll(e) {},
	//下拉刷新
	onPullDownRefresh() {},
	onReachBottom() {}
};
</script>

<style lang="scss">
page {
	background-color: #f4f6f8;
}
</style>
<style lang="scss" scoped>
.index-content {
	position: relative;
	.notice,
	.grid {
		box-shadow: 0px 1px 2px 0px rgba(55, 68, 134, 0.15);
		.content {
			flex: 1;
			height: 200rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
}
</style>
