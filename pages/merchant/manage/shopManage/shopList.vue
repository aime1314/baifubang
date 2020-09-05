<template>
	<view>
		<view class="form-box">
			<view class="form-area set_align" @click="toPage('/pages/merchant/manage/shopManage/setShop')">
				<image class="set_arrow_logo" :src="shopImg"></image>
				<view class="" style="width: 500rpx;">
					<view class="text">{{shopName}}</view>
					<view class="text2">店铺简介</view>
				</view>
				<image mode="aspectFill" class="set_arrow" src="/static/arrow.png"></image>
			</view>
		</view>
		<view class="bottom-box">
			<view class="title">该功能当前仅针对餐饮行业开放，请谨慎开启</view>
			<view class="item">
				<view class="label">开启外卖服务</view>
				<view class="switch">
					<image @click="openService" v-if="type == 1" class="icon" src="/static/icon_close.png"></image>
					<image v-if="type == 2" class="icon" src="/static/icon_open.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopName: "百付邦自营超市14",
				shopImg: "http://img.bfb360.cn/upload/shops/2020-06/5ed6069537a28.jpg",
				type: 1
			}
		},
		onLoad(options) {
			this.shopImg = options.shopImg;
			this.shopName = options.shopName;
			this.type = options.type;
		},
		methods: {
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			},
			
			openService() {
				this.$api.openService().then(res => {
					if(res.code == 200) {
						this.type = 2;
						uni.showToast({
							title: "开启成功"
						})
					}else {
						
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
	}
	.form-box {
		padding: 20rpx 40rpx;
		margin-top: 20rpx;
		width: 750rpx;
		background-color: #fff;
	}

	.form-area {
		display: flex;
	}

	.text {
		flex: 1;
		font-size: 28rpx;
		color: #333;
	}

	.text2 {
		flex: 1;
		font-size: 26rpx;
		color: #999;
		margin-right: 20rpx;
	}

	.set_arrow {
		width: 17rpx;
		height: 28rpx;
		text-align: right;
	}

	.set_arrow_logo {
		width: 130rpx;
		height: 130rpx;
		margin-right: 20rpx;
	}

	.set_align {
		align-items: center;
		justify-content: space-between;
	}

	.set_inupt {
		width: 470rpx;
		font-size: 28rpx;
	}

	.set_bigbtn {
		margin: 80rpx 50rpx 50rpx 50rpx;
		width: 650rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background: #FF6619;
		border-radius: 8rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}
	
	.bottom-box {
		background-color: #fff;
		margin-top: 20rpx;
		
		.title {
			font-size: 24rpx;
			color: #999;
			padding-left: 40rpx;
			height: 70rpx;
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #707070;
		}
		
		.item {
			font-size: 28rpx;
			color: #333;
			padding: 0 40rpx;
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.label {
				
			}
			
			.icon {
				width: 88rpx;
				height: 45rpx;
			}
			
		}
		
	}
	
	
</style>
