<template>
	<view>
		<!-- 顶部导航 -->
		<fa-navbar title="县部门列表" :border-bottom="false"></fa-navbar>
		<view class="u-p-20 bg-white u-flex u-col-center">
			<view class="u-flex-1"><fa-search :mode="2" @search="search"></fa-search></view>
		</view>
		<view class="hoter-list u-p-t-30 u-p-l-30 u-p-r-30">
			<view class="item bg-white u-m-b-30" v-for="(item, index) in list" :key="index">
				<view class="images">
					<fa-swiper :list="[item.images]" :autoplay="false" :params="{ id: item.id }" :height="400" mode="none" @click="clickSwiper"></fa-swiper>
					<view class="title u-line-1 u-font-35" >{{item.name}}</view>
				</view>
				<view class="">
					<view class="u-p-t-20 u-p-l-20 u-p-r-20 u-flex u-flex-wrap">
						<view>描述信息</view>
						<u-button
						style="float: right; margin-right: 0;"
							:custom-style="{ backgroundColor: theme.bgColor, color: theme.color }"
							hover-class="none"
							throttle-time="0"
							size="mini"
							@click="goPage('/pages/exam/detail?type=xian&id=' + item.id + '&name=' + item.name)"
						>
							立即测评
						</u-button>
					</view>
					<view class="u-flex u-row-between u-p-20 u-text-right">

					</view>
				</view>
			</view>
		</view>
		
		<!-- 预订日历 -->
		<!-- <view class="" v-if="is_show">
			<fa-calendar v-model="value" :price="info.price" :calendar="info.calendar" :orderCalendar="info.order_calendar" @confirm="calendarConfirm"></fa-calendar>
		</view> -->
		
		<!-- 空数据 -->
		<view class="u-p-t-80 u-p-b-80" v-if="!list.length"><u-empty text="测评已经全部完成"></u-empty></view>
		<!-- 加载更多 -->
		<!-- 回到顶部 -->
		<u-back-top :scroll-top="scrollTop" :icon-style="{ color: theme.bgColor }" :custom-style="{ backgroundColor: theme.lightColor }"></u-back-top>
		<!-- 底部导航 -->
		<fa-tabbar></fa-tabbar>
	</view>
</template>

<script>
export default {
	onLoad(e) {
		this.store_id = e.store_id || '';
		this.store_name = e.store_name || '列表';
	},
	onShow() {
		console.log('show!!')
		this.getHouseList();
	},
	watch: {
		value(newValue, oldValue) {
			if (!newValue) {
				this.is_show = false;
			}
		}
	},
	data() {
		return {
			scrollTop: 0,
			list: [],
			
		};
	},
	methods: {		
		getHouseList() {
			this.$api.getxian().then(res => {
				this.list = res
				console.log(res)
			});
			
		},
		
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	onReachBottom() {
		if (this.has_more) {
			this.status = 'loading';
			this.page++;
			this.getHouseList();
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f4f6f8;
}
</style>
<style lang="scss" scoped>
.hotel-tabs {
	width: 82vw;
}
.hotel {
	.more {
		height: 80rpx;
		line-height: 75rpx;
		border-left: 1px solid rgba(55, 68, 134, 0.1);
	}
}
.hoter-list {
	border-radius: 10rpx;
	.item {
		position: relative;
		.collect {
			background: rgba($color: #000000, $alpha: 0.2);
			border-radius: 200rpx;
			position: absolute;
			right: 30rpx;
			top: 20rpx;
			padding: 10rpx;
			z-index: 99;
		}
		.type_name {
			position: absolute;
			left: 30rpx;
			top: 0rpx;
			padding: 10rpx 10rpx 20rpx;
			z-index: 99;
			color: #ffffff;
			background-image: url(../../static/image/label.png);
			background-size: 100% 100%;
			font-size: 20rpx;
			// border-bottom-left-radius: 12rpx;
			// border-bottom-right-radius: 12rpx;
		}
		.images {
			position: relative;
			.title {
				color: #ffffff;
				width: 100%;
				position: absolute;
				left: 0rpx;
				bottom: 0rpx;
				padding: 20rpx 10rpx;
				background: rgba($color: #000000, $alpha: 0.4);
			}
		}

		.price {
			font-weight: bold;
		}
		.market_price {
			text-decoration: line-through;
			margin-left: 10rpx;
		}
	}
}
</style>
