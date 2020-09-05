<template>
	<view class="content">
		<view class="cell-group">
			<view class="cell-item">
				<view class="l">订单编号</view>
				<view class="r">{{orderunique}}</view>
			</view>
			<view class="cell-item">
				<view class="l">需要支付</view>
				<view class="r red">{{totalMoney}}</view>
			</view>
		</view>
		<view class="pay-group">
			<!-- #ifdef MP-WEIXIN -->
			<view class="pay-item" v-if="type == 1" @tap="wxPayOrder">
				<view class="l">
					<image src="/static/icon_wx_small.png"></image>
					<view class="label">
						<view class="text">微信支付</view>
						<view class="desc">微信安全支付</view>
					</view>
				</view>
				<image class="r" src="/static/icon_arrow.png"></image>
			</view>
			<view class="pay-item" v-if="type == 2" @tap="wxPayOrderOne">
				<view class="l">
					<image src="/static/icon_wx_small.png"></image>
					<view class="label">
						<view class="text">微信支付</view>
						<view class="desc">微信安全支付</view>
					</view>
				</view>
				<image class="r" src="/static/icon_arrow.png"></image>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-ALIPAY -->
			<view class="pay-item" v-if="type == 1" @tap="ALiPayOrder">
				<view class="l">
					<image src="/static/icon_alpay_small.png"></image>
					<view class="label">
						<view class="text">支付宝支付</view>
						<view class="desc">支付宝安全支付</view>
					</view>
				</view>
				<image class="r" src="/static/icon_arrow.png"></image>
			</view>
			<view class="pay-item" v-if="type == 2" @tap="ALiPayOrderOne">
				<view class="l">
					<image src="/static/icon_alpay_small.png"></image>
					<view class="label">
						<view class="text">支付宝支付</view>
						<view class="desc">支付宝安全支付</view>
					</view>
				</view>
				<image class="r" src="/static/icon_arrow.png"></image>
			</view>
			<!-- #endif -->
			<view class="pay-item" v-if="type == 1" @tap="show = true">
				<view class="l">
					<image src="/static/icon_wallet_small.png"></image>
					<view class="label">
						<view class="text">余额支付</view>
						<view class="desc">当前余额：<text>{{userMoney}}</text></view>
					</view>
				</view>
				<image class="r" src="/static/icon_arrow.png"></image>
			</view>
			<view class="pay-item" v-if="type == 2" @tap="show = true">
				<view class="l">
					<image src="/static/icon_wallet_small.png"></image>
					<view class="label">
						<view class="text">余额支付</view>
						<view class="desc">当前余额：<text>{{userMoney}}</text></view>
					</view>
				</view>
				<image class="r" src="/static/icon_arrow.png"></image>
			</view>
		</view>
		
		<view :class="['mask', show ? '' : 'visible']"></view>
		<view :class="['pay-content', show ? '' : 'contenthide']">
			<view class="title">
				<view class="close" @tap="close"><image src="/static/icon_small_close.png"></image></view>
				<view class="center">请输入支付密码</view>
				<view class="close"></view>
			</view>
			<view class="pay-money">
				<view class="money">￥<text>{{totalMoney}}</text></view>
			</view>
			<view :class="['code', show ? '' : 'visible']">
				<view class="code-box">
					<block v-for="(item, index) in 6" :key="index">
						<view class="code-box-item">{{ (password[index] && '●') || '' }}</view>
					</block>
				</view>
				<input type="number" v-model="password" />
			</view>
			<view class="forgot-pwd">
				<view @tap="toPage('/pages/user/setting/getCode')">忘记密码？</view>
			</view>
			<view class="pay-way">
				<view>支付方式</view>
				<view class="pay-img"><image src="/static/icon_wallet_small.png"/>余额支付</view>
			</view>
		</view>
		<view :class="['keyboard', show ? '' : 'active', isIphoneX ? 'isIphone' : '']">
			<block v-for="(item, index) in 9" :key="index">
				<view class="keyboard-item" @tap="key(index + 1)">{{index + 1}}</view>
			</block>
			<view class="keyboard-item hide"></view>
			<view class="keyboard-item" @tap="key(0)"><text>0</text></view>
			<view class="keyboard-item delte" @tap="del()"><image class="img" src="/static/icon_pay_del.png" mode="aspectFill" :lazy-load="true"></image></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderunique: "",
				totalMoney: "",
				userMoney: "",
				type: 1,	// 1 直接支付	 2 从订单支付
				show: false,
				password: '',
				trantision: false,
				isIphoneX: false
			}
		},
		onLoad(options) {
			this.orderunique = options.orderunique;
			this.totalMoney = options.totalMoney;
			this.type = options.type || 1;
			this.getUserBalance();
		},
		methods: {
			key(key) {
				if (this.password.length < 6) {
					this.password += key;
					if (this.password.length == 6) {
						if(this.type == 1) {
							this.walletPayOrder();
						}
						if(this.type == 2) {
							this.walletPayOrder();
						}
					}
				}
			},
			clear() {
				this.password = '';
			},
			close() {
				this.password = '';
				this.trantision = false;
				this.show = false;
			},
			del() {
				if (this.password.length > 0) {
					this.password = this.password.substring(0, this.password.length - 1);
				}
			},
			// 获取用户余额
			getUserBalance() {
				this.$api.getUserBalance().then(res => {
					if(res.code == 200) {
						this.userMoney = res.data.userMoney;
					}
				});
			},
			
			// #ifdef MP-WEIXIN
			// 获取微信支付必要参数
			wxPayOrder() {
				let config = {
					orderunique: this.orderunique
				}
				this.$api.wxPayOrder(config).then(res => {
					if(res.code == 200) {
						this.wxPay(res.data);
					}
				});
			},
			
			wxPayOrderOne() {
				let config = {
					orderId: this.orderunique
				}
				this.$api.wxPayOrderOne(config).then(res => {
					if(res.code == 200) {
						this.wxPay(res.data);
					}
				});
			},
			
			
			// 微信支付
			wxPay(promise) {
				this.$api.wxPay(promise, res => {
					console.log(res);
					wx.redirectTo({
					  url: "/pages/pay/payStatus?totalMoney=" + this.totalMoney + "&type=1"
					});
				}, err => {
					console.log(err)
				})
			},
			// #endif
			
			// #ifdef MP-ALIPAY
			// 获取支付宝支付必要参数
			ALiPayOrder() {
				let config = {
					orderunique: this.orderunique
				}
				this.$api.ALiPayOrder(config).then(res => {
					if(res.code == 200) {
						this.ALiPay(res.data.tradeNO);
					}
				});
			},
			
			ALiPayOrderOne() {
				let config = {
					orderId: this.orderunique
				}
				this.$api.ALiPayOrderOne(config).then(res => {
					if(res.code == 200) {
						this.ALiPay(res.data.tradeNO);
					}
				});
			},
			
			// 支付宝支付
			ALiPay(tradeNO) {
				let config = {
					orderInfo: tradeNO
				}
				console.log(config);
				this.$api.ALiPay(config, res => {
					console.log(res);
					wx.redirectTo({
					  url: "/pages/pay/payStatus?totalMoney=" + this.totalMoney + "&type=2"
					});
				}, err => {
					console.log(err)
				})
			},
			// #endif
			
			// 余额支付
			walletPayOrder() {
				let config = {
					orderunique: this.orderunique,
					payPwd: this.password
				}
				this.$api.walletPayOrder(config).then(res => {
					if(res.code == 200) {
						this.show = false;
						wx.redirectTo({
						  url: "/pages/pay/payStatus?totalMoney=" + this.totalMoney + "&type=0"
						});
					}else {
						this.password = "";
					}
				});
			},
			
			// 余额支付
			walletPayOrderOne() {
				let config = {
					orderId: this.orderunique,
					payPwd: this.password
				}
				this.$api.walletPayOrderOne(config).then(res => {
					if(res.code == 200) {
						this.show = false;
						wx.redirectTo({
						  url: "/pages/pay/payStatus?totalMoney=" + this.totalMoney + "&type=0"
						});
					}else {
						this.password = "";
					}
				});
			},
			
			toPage(page) {
				this.show = false;
				uni.navigateTo({
					url: page
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F7F7F7;
	}
	
	input {
		display: none;
	}
	
	.mask {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		transition: all 0.3s ease;
		background: rgba(0, 0, 0, 0.7);
		opacity: 1;
		z-index: 2;
		visibility: visible;
	}
	
	.pay-content {
		width: 690rpx;
		border-radius: 15rpx;
		position: fixed;
		left: 50%;
		top:35%;
		margin-left: -345rpx;
		margin-top: -285rpx;
		background: #f4f4f4;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		z-index: 2;
		opacity: 1;
		visibility: visible;
		transition: all 0.3s ease;
		
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 85rpx;
			width: 100%;
			font-size: 32rpx;
			color: #666;
			border-bottom: 1rpx solid #d7d7d7;
			padding: 0 20rpx;
			box-sizing: border-box;
		}
		.center {
			color: #666;
			font-size: 32rpx;
		}
		.close {
			width: 50rpx;
			height: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		image {
			width: 28rpx;
			height: 28rpx;
		}
		.pay-money {
			width: 525rpx;
			padding-top: 20rpx;
			padding-bottom: 50rpx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
		}
		.pay-money view {
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.forgot-pwd {
			display: flex;
			justify-content: flex-end;
			color: #ff6619;
			font-size: 26rpx;
			width: 100%;
			box-sizing: border-box;
			padding: 0 74rpx;
			margin-bottom: 15rpx;
			
		}
		.pay-way {
			width: 100%;
			height: 100rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			border-top: 1rpx solid #d7d7d7;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #333;
			font-size: 28rpx;
		}
		.money {
			font-size: 60rpx;
		}
		.money text {
			margin-left: 10rpx;
		}
		.pay-img {
			color: #333333;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.pay-img image {
			width: 40rpx;
			height: 40rpx;
			margin-right: 20rpx;
		}
	}
	
	.contenthide {
		margin-left: -350rpx;
		margin-top: -340rpx;
		width: 700rpx;
		height: 680rpx;
		opacity: 0;
		z-index: 0;
		visibility: hidden;
	}
	.visible {
		opacity: 0;
		z-index: 2;
		visibility: hidden;
	}
	
	.code {
		width: 100%;
		height: 60rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
	.code-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border: 1px solid #d0d0d0;
	}
	.code-box-item {
		width: 90rpx;
		height: 60rpx;
		background: #fff;
		font-size: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.code-box-item:not(:last-child) {
		border-right: 1px solid #d0d0d0;
	}
	
	.keyboard {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #EBEBEB;
		display: flex;
		justify-content: center;
		z-index: 2;
		flex-wrap: wrap;
		transition:all 0.2s ease-in 0.2s;
	}
	
	.active {
		bottom: -400rpx;
	}
	.keyboard-item {
		box-sizing: border-box;
		width: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		font-size: 40rpx;
		color: #333;
		height: 99rpx;
		border: 1rpx solid #EBEBEB;
		border-top:none;
		border-left:none;
	}
	.hide {
		opacity: 0;
	}
	.delte {
		background: none;
		box-shadow: none;
	}
	.delte image {
		width: 60rpx;
		height: 60rpx;
	}
	.isIphone {
		padding-bottom: 68rpx !important;
	}
	
	
	.cell-group, .pay-group, .cell-item, .pay-item {
		flex: 1;
		display: flex;
		align-items: center;
	}
	
	.cell-group, .pay-group{
		margin-top: 20rpx;
		flex-flow: column;
		background: #ffffff;
	}
	
	.cell-group:last-child, .pay-group:last-child{
		border: none;
	}

	.cell-item, .pay-item {
		width: 100%;
		flex-flow: row;
		justify-content: space-between;
		padding: 30rpx 30rpx;
		border-bottom: 1rpx solid #f7f7f7;
	}
	
	.pay-item {
		
		.l {
			display: flex;
			align-items: center;
		}
	}
	
	.pay-item image {
		width: 48rpx;
		height: 48rpx;
	}
	
	.pay-item image:last-child {
		width: 24rpx;
		height: 24rpx;
	}
	
	.label {
		flex: 1;
		margin-left: 16rpx;
		padding-left: 16rpx;
		border-left: 1rpx solid #F4F4F4;
	}
	
	.desc {
		font-size: 26rpx;
		color: #BBBBBB;
		
		.red {
			
		}
	}
	
	.res {
		margin-left: 10rpx;
		display: inline-block;
		font-size: 24rpx;
		background: #ff6619;
		color: #ffffff;
		padding: 4rpx 12rpx;
		border-radius: 20rpx;
	}
</style>

