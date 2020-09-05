<template>
	<view class="content">
		<view class="status-box">
			<view class="h">
				<view>您的包裹整装待发</view>
				<view>¥<text class="font">{{totalMoney}}</text></view>
			</view>
			<view class="c">
				<view class="l">支付方式名称</view>
				<view class="r">
					<image src="" mode=""></image>
					<text>{{type == 0 && "余额支付" || type == 1 && "微信支付" || type == 2 && "支付宝支付"}}</text>
				</view>
			</view>
			<view class="btn-wrap">
				<view class="btn" @tap="toOrder">查看订单</view>
				<view @tap="toIndex">返回首页</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,	// 0 余额 1 微信 2 支付宝
				totalMoney: 0
			}
		},
		onLoad(options) {
			this.type = options.type;
			this.totalMoney = options.totalMoney;
		},
		methods: {
			
			toOrder() {
				uni.redirectTo({
					url: "/pages/order/orderList"
				})
			},
			
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #F7F7F7;
		.status-box {
			padding: 100rpx 0 50rpx;
			margin: 30rpx 30rpx;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			background: #FFFFFF;
			border-radius: 16rpx;
			text-align: center;
			
			image {
				margin: 0 auto 10rpx;
			}
			.clor {
				color: #666;
			}
			.font {
				font-size: 60rpx;
			}
		
			.text {
				font-size: 38rpx;
				color: #666;
				font-weight: 500;
				text-align: center;
				margin-bottom: 12rpx;
				font-weight: bold;
			}
			
			.price {
				font-size: 75rpx;
				color: #666;
				font-weight: bold;
				text-align: center;
				text {
					font-size: 43rpx;
					font-weight: 400;
					margin-right: 5rpx;
				}
			}
			
			.c {
				width: 80%;
				margin: 30rpx auto;
				padding: 20rpx 0;
				border-top: 2rpx #D9D9D9 dotted;
				border-bottom: 2rpx #D9D9D9 dotted;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				color: #666;
			}
		}
		.btn-wrap {
			width: 80%;
			margin: 0 auto;
			display: flex;
			flex-flow: row;
			justify-content: space-between;
			align-items: center;
			view {
				width: 200rpx;
				height: 60rpx;
				line-height: 60rpx;
				color: #999;
				border: 2rpx solid #999;
				border-radius: 30rpx;
			}
			.btn {
				background: #FF6619;
				color: #FFFFFF;
				border: none;
			}
		}
		
		.card-area {
			.card-header {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 13rpx;
				
				.before {
					width: 68rpx;
					height: 68rpx;
					position: relative;
					margin-left: 102rpx;
					&::before {
						position: absolute;
						left: -102rpx;
						top: 34rpx;
						content: "";
						width: 86rpx;
						height: 2rpx;
						background-color: #666;
					}
					.img {
						width: 68rpx;
						height: 68rpx;
					}
				}
				
				.card-title {
					margin-left: 23rpx;
					font-size: 33rpx;
					color: #666;
					font-weight: 500;
				}
			}
			.card-info {
				font-size: 22rpx;
				font-weight: 500;
				color: #666;
				text-align: center;
				margin-bottom: 30rpx;
			}
		}
	}
	
</style>
