<template>
	<view class="content">
		<view class="type" v-if="type == 1">
			<image style="width: 750rpx; height: 2416rpx;" src="http://img.bfb360.cn/upload/shops/2020-06/5eeca720612c1.jpeg" mode=""></image>
			<!-- <image style="width: 750rpx; height: 2416rpx;" src="/static/icon_settleInfo.jpeg" mode=""></image> -->
			<view class="btn-l" @tap="toPage('/pages/auth/settleIn')">推广入驻</view>
			
			<view class="btn-area">
				<view class="btn-r" @tap="changeType(2)">商家入驻</view>
			</view>
		</view>
		<view class="settle-box" v-if="type == 2">
			<view class="desc">请您填写联系信息，我们会尽快联系您</view>
			<view class="form-area">
				<view class="form-item">
					<view class="label">我的门店</view>
					<input type="text" maxlength="30" v-model="settle_shop_name" placeholder="请输入门店名称" placeholder-style="color:#ccc;" />
				</view>
				<view class="form-item">
					<view class="label">门店地址</view>
					<input type="text" maxlength="40" v-model="settle_shop_address" placeholder="请输入门店详细地址" placeholder-style="color:#ccc;" />
				</view>
				<view class="form-item">
					<view class="label">联系方式</view>
					<input type="number" maxlength="11" v-model="settle_shop_phone" placeholder="请输入您的手机号码" placeholder-style="color:#ccc;" />
				</view>
			</view>
			<view class="btn-default" @tap="setSettleInfo">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				settle_shop_name: "",
				settle_shop_phone: "",
				settle_shop_address: "",
			};
		},
		onLoad() {
			
		},
		methods: {
			
			changeType(type) {
				this.type = type;
			},
			
			setSettleInfo() {
				let config = {
					settle_shop_name: this.settle_shop_name,
					settle_shop_phone: this.settle_shop_phone,
					settle_shop_address: this.settle_shop_address
				}
				this.$api.setSettleInfo(config).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: "提交成功！"
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1500)
					}
				});
			},
			
			toPage(page) {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) {
					uni.navigateTo({
						url: "/pages/auth/impower"
					});
					return;
				}
				// #endif
				uni.navigateTo({
					url: page
				})
			}
			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F4F4F4;
	}
	.content {
		
	}
	.type {
		padding-bottom: 120rpx;
	}
	
	.btn-area {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		
		.btn-r {
			background: #FF6619;
			color: #fff;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 80rpx;
			width: 690rpx;
			margin: 0 auto;
			border-radius: 50rpx;
		}
	}
	
	.btn-l {
		background: #ffdd00;
		color: #fff;
		font-size: 30rpx;
		display: flex;
		width: 450rpx;
		margin: -140rpx auto 0;
		border-radius: 50rpx;
		align-items: center;
		justify-content: center;
		height: 80rpx;
	}
	
	
	.settle-box {
		
		.desc {
			font-size: 26rpx;
			color: #999;
			margin: 20rpx;
		}
	}
	
	.form-area {
		background-color: #fff;
		border-top: 1rpx solid #ccc;
		
		.form-item {
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 30rpx;
			padding: 0 30rpx;
			border-bottom: 1rpx solid #ccc;
			
			view {
				color: #333;
				margin-right: 40rpx;
			}
			
			input {
				height: 60rpx;
				font-size: 30rpx;
				color: #333;
				flex: 1;
			}
		}
	}
	
	.btn-default {
		width: 690rpx;
		height: 88rpx;
		color: #fff;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FF6619;
		border-radius: 4rpx;
		margin: 60rpx auto 0;
	}
	
</style>
