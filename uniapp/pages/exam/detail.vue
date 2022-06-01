<template>
	<view class="">
		<!-- 顶部导航 -->
		<fa-navbar :title="name + '测评'" :border-bottom="false"></fa-navbar>
		<view class="u-skeleton">
			<scroll-view scroll-y="true" class="scroll-Y">
				<view class="u-skeleton-fillet">
					<u-swiper :list="[image]" height="400" border-radius="0"></u-swiper>
				</view>


				<view class="detail u-border-top">
					<view class="bg-white u-p-30 u-m-t-15 u-skeleton-rect">
						<view class="u-m-b-15 text-weight u-font-30">1.健全运行管理机制情况</view>
						<u-radio-group v-model="q1" wrap>
							<u-radio v-for="n in 6" :name="n">{{(n  - 1) + '分'}}</u-radio>
						</u-radio-group>
					</view>
				</view>
				
				<view class="detail u-border-top">
					<view class="bg-white u-p-30 u-m-t-15 u-skeleton-rect">
						<view class="u-m-b-15 text-weight u-font-30">2.主动收集社情民意情况</view>
						<u-radio-group v-model="q2" wrap>
							<u-radio v-for="n in 6" :name="n">{{(n  - 1) + '分'}}</u-radio>
						</u-radio-group>
					</view>
				</view><view class="detail u-border-top">
					<view class="bg-white u-p-30 u-m-t-15 u-skeleton-rect">
						<view class="u-m-b-15 text-weight u-font-30">3.群众诉求高效办结情况</view>
						<u-radio-group v-model="q3" wrap>
							<u-radio v-for="n in 6" :name="n">{{(n  - 1) + '分'}}</u-radio>
						</u-radio-group>
					</view>
				</view><view class="detail u-border-top">
					<view class="bg-white u-p-30 u-m-t-15 u-skeleton-rect">
						<view class="u-m-b-15 text-weight u-font-30">4.责任人民服务态度情况</view>
						<u-radio-group v-model="q4" wrap>
							<u-radio v-for="n in 6" :name="n">{{(n  - 1) + '分'}}</u-radio>
						</u-radio-group>
					</view>
				</view>
				<view class="detail u-border-top" style="padding-bottom: 100px;">
					<view class="bg-white u-p-30 u-m-t-15 u-skeleton-rect">
						<view class="u-m-b-15 text-weight u-font-30">5.诉求处理结果满意度情况</view>
						<u-radio-group v-model="q5" wrap>
							<u-radio v-for="n in 6" :name="n">{{(n  - 1) + '分'}}</u-radio>
						</u-radio-group>
					</view>
				</view>
				

				<view class="foot-bar" id="footbar">
					<view>
						<u-button style="float: right"
							:custom-style="{ backgroundColor: theme.bgColor, color: theme.color }" hover-class="none"
							size="medium" @click="submit">
							立即提交
						</u-button>
					</view>
				</view>
				
			</scroll-view>


		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.name = e.name;
			this.id = e.id;
			this.type = e.type;
			let sys = this.$u.sys();
			this.getDetail();

		},
		onShow() {
			
		},
		computed: {
			stickyStyle() {
				let style = {};
				if (this.scrollTop > 150) {
					style.position = 'fixed';
					style.width = '100%';
					style.top = this.stickyTop + 'px';
					style.left = 0;
					style.zIndex = 999;
					this.marginTop = 90;
				} else {
					this.marginTop = 0;
				}
				return style;
			}
		},
		data() {
			return {
				q1: '',
				q2: '',
				q3: '',
				q4: '',
				q5: '',
				
				image: '',
				
			};
		},
		methods: {
			getDetail() {
				
				this.image = 'https://pic.baike.soso.com/ugc/baikepic2/0/20220421115439-2009402200_png_635_399_744161.jpg/800'
			},
			async submit() {
				let form = {
					q1:this.q1,
					q2:this.q2,
					q3:this.q3,
					q4:this.q4,
					q5:this.q5,
				}
				let sum = 0
				for (let i in form){
					if (!form[i]){
						this.$u.toast('有未填的选项');
						return
					}
					sum += parseInt(form[i] - 1) 
				}
				if (sum == 0 || sum == 25){
					this.$u.toast('不能全为5分或0分')
					return
				}
				
				let res = await this.$api.submit({sum: sum, id : this.id, type : this.type})
				console.log(res)
				
				if (res.code == 200){
					this.$u.toast(res.msg)
					setTimeout(() => {
						uni.navigateBack({
							delta: 1,
							success: () => {
								uni.$emit('update')
							}
						});
					}, 1000);
				}
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
	.detail {
		.title {
			font-weight: 500;
		}

		.facility {
			.item {
				width: 50%;
			}
		}

		.notesin {
			.item {
				margin: 15rpx 0;

				.other {
					display: flex;
					flex-direction: column;
					flex-wrap: wrap;

					.row {}
				}
			}
		}
	}

	.coupon-list {
		.item {
			margin-right: 20rpx;
			border: 1px solid #f2270c;
			padding: 5rpx 12rpx;
			border-radius: 5rpx;
			position: relative;
			color: #f2270c;

			.left {
				border-right: 1px dashed #f2270c;
				margin-right: 10rpx;
				padding-right: 10rpx;
			}

			&::before {
				position: absolute;
				content: '';
				display: block;
				left: -2rpx;
				top: calc(50% - 6rpx);
				height: 12rpx;
				width: 8rpx;
				border: 1px solid #f2270c;
				background-color: #ffffff;
				border-radius: 0 12rpx 12rpx 0;
				border-left: none;
			}

			&::after {
				position: absolute;
				content: '';
				display: block;
				right: -2rpx;
				top: calc(50% - 6rpx);
				height: 12rpx;
				width: 8rpx;
				border: 1px solid #f2270c;
				background-color: #ffffff;
				border-radius: 12rpx 0 0 12rpx;
				border-right: none;
			}
		}
	}

	.foot-bar {
		background-color: #ffffff;
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		padding: 20rpx 15rpx;
		border-top: 1rpx solid #f4f6f8;

		.select-calendar {
			background-color: #f4f6f8;
			padding: 15rpx;
		}
	}

	.comment {
		display: flex;
		padding: 30rpx;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.like {
					display: flex;
					align-items: center;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;
			}
		}
	}
</style>
