<template>
	<view>
		<view class="wd-handle">
			<view class="wd-money">
				<text class="txt">可提现余额：￥{{shopMoney}}</text>
				<text class="btn" @tap='allWithdraw'>全部提现</text>
			</view>
			<view class="wd-title">提现金额</view>
			<view class="wd-input">
				<view class="wd-icon">￥</view>
				<input class="wd-value" placeholder="0.00" type="number" v-model="money" />
			</view>
		</view>
		<view class="withdraw-type">
			<view class="wd-title">提现方式</view>
			<view class="withdraw-type-box">
				<view class="l">
					<image class="withdraw-icon" src="/static/icon_wx_small.png"></image>
					<text>提现到微信钱包</text>
				</view>
				<view class="r">
					<image src="/static/radio.png"></image>
				</view>
			</view>
		</view>
		<view class="wd-btn" @tap="withdraw">提交申请</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,	// 1 普通用户 2 推广员 3 商户 4 代理商
				shopMoney: 0.00,	// 余额
				cashType: 2, // 提现类型1支付宝2微信3银行卡
				money: "",	// 提现金额
			}
		},
		onLoad(options) {
			this.type = options.type;
			if(this.type == 1) {
				this.toEditByUser();
			}
			if(this.type == 2) {
				this.toEditByPromoter();
			}
			if(this.type == 3) {
				this.getcashdraws();
			}
			if(this.type == 4) {
				this.toEditByAgent();
			}
		},
		methods: {
			// 获取商户可提现余额
			getcashdraws() {
				this.$api.getcashdraws().then(res => {
					if(res.code == 200) {
						this.shopMoney = res.data.shopMoney;
					}
				});
			},
			
			// 推广员提现页面数据
			toEditByPromoter() {
				this.$api.toEditByPromoter().then(res => {
					if(res.code == 200) {
						this.shopMoney = res.data.money;
					}
				});
			},
			
			// 用户提现页面数据
			toEditByUser() {
				this.$api.toEditByUser().then(res => {
					if(res.code == 200) {
						this.shopMoney = res.data.userMoney;
					}
				});
			},
			
			// 代理商提现页面数据
			toEditByAgent() {
				this.$api.toEditByAgent().then(res => {
					if(res.code == 200) {
						this.shopMoney = res.data.money;
					}
				});
			},
			
			// 商家提现
			doWithdraw() {
				let config = {
					cashType: this.cashType,
					money: this.money
				}
				this.$api.drawMoneyByShop(config).then(res => {
					if(res.code == 200) {
						this.getcashdraws();
						uni.showToast({
							title: res.message,
							icon: "none"
						});
					}else {
						uni.showToast({
							title: res.message,
							icon: "none"
						});
					}
				});
			},
			
			
			withdraw() {
				if(this.type == 1) {
					this.drawMoneyByUser();
				}
				if(this.type == 2) {
					this.drawMoneyByPromoter();
				}
				if(this.type == 3) {
					this.doWithdraw();
				}
				if(this.type == 4) {
					this.drawMoneyByAgent();
				}
			},
			// 推广员提现
			drawMoneyByPromoter() {
				let config = {
					cashType: this.cashType,
					money: this.money
				}
				this.$api.drawMoneyByPromoter(config).then(res => {
					if(res.code == 200) {
						this.toEditByPromoter();
						uni.showToast({
							title: res.message,
							icon: "none"
						});
					}else {
						uni.showToast({
							title: res.message,
							icon: "none"
						});
					}
				});
			},
			
			// 用户提现
			drawMoneyByUser() {
				let config = {
					cashType: this.cashType,
					money: this.money
				}
				this.$api.drawMoneyByUser(config).then(res => {
					if(res.code == 200) {
						this.toEditByUser();
						uni.showToast({
							title: res.message,
							icon: "none"
						});
					}else {
						uni.showToast({
							title: res.message,
							icon: "none"
						});
					}
				});
			},
			
			// 代理商提现
			drawMoneyByAgent() {
				let config = {
					cashType: this.cashType,
					money: this.money
				}
				this.$api.drawMoneyByAgent(config).then(res => {
					if(res.code == 200) {
						this.toEditByAgent();
						uni.showToast({
							title: res.message,
							icon: "none"
						});
					}else {
						uni.showToast({
							title: res.message,
							icon: "none"
						});
					}
				});
			},
			
			// 全部提现
			allWithdraw() {
				this.money = this.shopMoney;
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
		
		.wd-money {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 60rpx;
			
			.txt {
				font-size: 32rpx;
				color: #333;
			}
			
			.btn {
				width: 180rpx;
				height: 60rpx;
				border: 1rpx solid #ED6C1B;
				opacity: 1;
				border-radius: 8rpx;
				color: #ED6C1B;
				font-size: 26rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		
		.wd-title {
			font-size: 28rpx;
			color: #333;
			margin-bottom: 15rpx;
		}
		
		.wd-input {
			display: flex;
			
			.wd-icon {
				font-size: 32rpx;
				color: #333;
				margin-right: 20rpx;
			}
			
			input {
				flex: 1;
				font-size: 52rpx;
				color: #333;
			}
		}
	}
	
	.withdraw-type {
		margin: 20rpx auto 0;
		width: 690rpx;
		background-color: #fff;
		border-radius: 8rpx;
		
		.wd-title {
			height: 80rpx;
			border-bottom: 1rpx solid rgba(153, 153, 153, 0.39);
			font-size: 28rpx;
			color: #333;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
		}
		
		.withdraw-type-box {
			height: 80rpx;
			border-bottom: 1rpx solid rgba(244, 244, 244, 0.39);
			font-size: 28rpx;
			color: #666;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx;
			
			.l {
				display: flex;
				align-items: center;
				
				image {
					width: 40rpx;
					height: 40rpx;
				}
				
				text {
					margin-left: 12rpx;
				}
			}
			
			.r {
				image {
					width: 40rpx;
					height: 40rpx;
				}
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
</style>
