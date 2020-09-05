<template>
	<view class="content">
		<view class="pay-group">
			<!-- #ifdef MP-WEIXIN -->
			<view class="pay-item" @tap="toPage('/pages/user/setting/setUserInfo')">
				<image :src="userPhoto"></image>
					<view class="label">
						<view class="text">{{userName}}</view>
						<view class="desc">点击修改百付邦昵称</view>
					</view>
				<image class="r" src="/static/icon_arrow.png"></image>
			</view>
			<!-- #endif -->
			<view class="pay-item" @tap="toPage('/pages/user/setting/address')">
				<view class="text">地址管理</view>
				<image class="r" src="/static/icon_arrow.png"></image>
			</view>
			
			<view class="pay-item" @tap="toPage('/pages/user/setting/getCode')">
				<view class="text">设置支付密码</view>
				<image class="r" src="/static/icon_arrow.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: "",
				userPhoto: ""
			}
		},
		onLoad(options) {
			this.userName = uni.getStorageSync("userName");
			this.userPhoto = uni.getStorageSync("userPhoto");
		},
		methods: {
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F7F7F7;
		font-size: 28rpx;
	}
	
	.pay-group, .cell-item, .pay-item {
		flex: 1;
		display: flex;
		align-items: center;
	}
	
	.pay-group{
		margin-top: 20rpx;
		flex-flow: column;
	}
	
	.pay-group:last-child{
		border: none;
	}

	.cell-item, .pay-item {
		width: 100%;
		flex-flow: row;
		justify-content: space-between;
		padding: 30rpx 30rpx;
		border-bottom: 1rpx solid #f7f7f7;
		background: #ffffff;
	}
	
	.pay-item image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	
	.pay-item image:last-child {
		width: 24rpx;
		height: 24rpx;
	}
	
	.pay-item:last-child {
		margin-top: 20rpx;
	}
	
	.label {
		flex: 1;
		padding-left: 16rpx;
		font-size: 28rpx;
	}
	
	.desc {
		font-size: 26rpx;
		color: #BBBBBB;
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
