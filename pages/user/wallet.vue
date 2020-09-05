<template>
	<view>
		<view class="page-heard">
			<view class="price">￥{{userMoney}}</view>
			<view class="price-dec">余额</view>
			<view class="save-btn">
				<view class="btn-info" @tap="toWithdrawal">
					<view class="iconfont icon-tixianjilu"></view>
					<view class="btn-text">提现</view>
				</view>
				<view class="btn-info" @tap="toPage('/pages/pay/topUp')">
					<view class="iconfont icon-chongzhi"></view>
					<view class="btn-text">充值</view>
				</view>
			</view>
		</view>
		<view class="page-footer">
			<view class="page-footer-a" @tap="toPage('/pages/user/manage/bill')">
				<image src="../../static/wallet_icon2.png" class="wall_icon"></image>
				<view class="footer_text">账单
					<image src="../../static/Left.png" class="footer_left"></image>
				</view>
			</view>
			<!-- <template> -->
			<template v-if="promoter == 1">
				<view class="page-footer-a" @tap="toPage('/pages/user/manage/promotersEarnings')">
					<image src="../../static/wallet_icon1.png" class="wall_icon"></image>
					<view class="footer_text">推广收益
						<image src="../../static/Left.png" class="footer_left">
						</image>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				userMoney: 0,
				promoter: 0
			}
		},
		onLoad() {
			
		},
		onShow() {
			if(uni.getStorageSync("promoter") && uni.getStorageSync("promoter") == 1) {
				this.promoter = uni.getStorageSync("promoter");
				// 推广员提现页面数据
				this.toEditByPromoter();
			}else {
				// 获取用户余额
				this.getUserBalance();
			}
		},
		methods: {
			// 获取用户余额
			getUserBalance() {
				this.$api.getUserBalance().then(res => {
					if(res.code == 200) {
						this.userMoney = res.data.userMoney;
					}
				});
			},
			// 推广员提现页面数据
			toEditByPromoter() {
				this.$api.toEditByPromoter().then(res => {
					if(res.code == 200) {
						this.userMoney = res.data.money;
					}
				});
			},
			toPage(page) {
				console.log(page);
				uni.navigateTo({
					url: page
				})
			},
			
			toWithdrawal() {
				if(this.promoter == 1) {
					uni.navigateTo({
						url: "/pages/pay/withdrawal?type=2"
					})
				}else {
					uni.navigateTo({
						url: "/pages/pay/withdrawal?type=1"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.nav-bar {
		display: flex;
		align-items: flex-end;
		background-color: #ff6600;
		color: #FFFFFF;
		font-size: 35rpx;

		.nav-heard {
			display: flex;
			line-height: 100%;
			width: 55%;
			padding: 35rpx 0;
			justify-content: space-between;

			.iconfont {
				padding: 0 30rpx;
			}
		}
	}

	.page-heard {
		display: flex;
		flex-direction: column;
		background-color: #ff6600;
		color: #FFFFFF;

		.price {
			text-align: center;
			font-size: 70rpx;
			padding: 100rpx 0 0rpx;
		}

		.price-dec {
			text-align: center;
			font-size: 28rpx;
			padding: 10rpx;
		}

		.save-btn {
			display: flex;
			justify-content: space-between;
			padding: 10rpx 40rpx;

			.btn-info {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 46%;
				height: 80rpx;
				margin: 20rpx 0;
				background-color: #fd8636;
				border-radius: 15rpx;

				.btn-text {
					padding: 0 10rpx;
				}
			}

		}
	}

	.page-footer {
		margin: 10rpx 0 0 0;
		background-color: #FFFFFF;

		.page-footer-a {
			display: flex;
			justify-content: flex-start;
			padding: 20rpx 0;

			.wall_icon {
				margin-left: 30rpx;
				width: 50rpx;
				height: 50rpx;
			}

			.footer_text {
				justify-content: space-between;
				flex:1;
				font-size: 28rpx;
				padding:0 20rpx 0 20rpx;
				font-weight: bold;
				display: flex;
				align-items: center;
				
			}

			.footer_left {
				display: flex;
				width: 40rpx;
				height: 40rpx;
			}
			

		}
	}
	
</style>
