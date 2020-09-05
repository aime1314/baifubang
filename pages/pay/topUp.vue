<template>
	<view>
		<view class="wd-handle">
			<view class="wd-title">充值金额</view>
			<view class="wd-input">
				<view class="wd-icon">￥</view>
				<input class="wd-value" placeholder="请输入需要充值的金额" type="number" v-model="payMoney" />
			</view>
		</view>
		<!-- #ifdef MP-ALIPAY -->
		<view class="wd-btn" @tap="changeALiPay">支付宝充值</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="wd-btn" @tap="changeWxPay">微信充值</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payMoney: ""
			}
		},
		methods: {
			changeALiPay() {
				let config = {
					payMoney: this.payMoney
				}
				this.$api.getALiPayMent(config).then(res => {
					this.ALiPay(res.data.tradeNO);
				})
			},
			ALiPay(tradeNO) {
				let promise = {
					orderInfo: tradeNO
				}
				this.$api.ALiPay(promise, res => {
					console.log(res);
					uni.showToast({
						title: "充值成功",
						icon: "none"
					});
				}, err => {
					console.log(err)
					
				})
			},
			changeWxPay() {
				let config = {
					payMoney: this.payMoney
				}
				this.$api.getWxPayMent(config).then(res => {
					console.log(res);
					this.wxPay(res.data);
				})
			},
			wxPay(promise) {
				this.$api.wxPay(promise, res => {
					console.log(res);
					uni.showToast({
						title: "充值成功",
						icon: "none"
					});
				}, err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
	}
	.wd-handle {
		margin: 20rpx auto 0;
		width: 690rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 8rpx;
		
		.wd-title {
			font-size: 30rpx;
			margin-top: 10rpx;
			margin-left: 10rpx;
		}
		
		.wd-input {
			display: flex;
			align-items: center;
			height: 150rpx;
			
			.wd-icon {
				font-size: 50rpx;
				color: #333;
				margin-right: 20rpx;
				margin-left: 10rpx;
			}
			
			input {
				
				flex: 1;
				font-size: 50rpx;
				color: #333;
			}
		}
	}
	
	.wd-btn {
		width: 690rpx;
		height: 88rpx;
		background: #FF6619;
		border-radius: 8rpx;
		color: #fff;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 80rpx auto 0;
	}
	
	.ipt {
		width: 750rpx;
		height: 100rpx;
		font-size: 28rpx;
		margin-bottom: 40rpx;
		border: 2rpx solid #ededed;
	}
	.btn {
		width: 500rpx;
		height: 100rpx;
		font-size: 28rpx;
		background: #f60;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
