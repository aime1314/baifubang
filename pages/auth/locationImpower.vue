<template>
	<view class="content">
		<view class="location-img">
			<image src="http://img.bfb360.cn/upload/goods/2020-06/5ef1bdd900ec5.png"></image>
		</view>
		<view class="location-title">定位服务尚未开启</view>
		<view class="location-desc">请在设置->微信->定位服务中开启「微信定位服务」，同时在小程序中开通「定位服务」。方便我们知道您的位置才能为您提供更好的服务哦～</view>
		<button @tap="getLocation" class="location-btn">开通位置授权</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			getLocation() {
				uni.openSetting({
					success(res) {
						console.log(res);
						if(res.authSetting['scope.userLocation']) {
							uni.navigateBack({
								delta: 1
							});
						}else {
							uni.navigateBack({
								delta: 1
							});
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
	  background: #fff !important;
	}
	.location-content {
	  margin: 0 auto;
	  text-align: center;
	}
	.location-img {
	  margin: 170rpx auto 60rpx;
	  width: 374rpx;
	  height: 374rpx;
	}
	.location-img image {
	  width: 374rpx;
	  height: 374rpx;
	}
	.location-title {
	  margin: 0 auto 30rpx;
	  font-size: 32rpx; 
	  color: #333;
	  text-align: center;
	}
	.location-desc {
	  margin: 0 auto 80rpx;
	  width: 580rpx;
	  font-size: 26rpx;
	  color: #666;
	}
	.location-btn {
	  margin: 0 auto;
	  width: 594rpx;
	  height: 80rpx;
	  font-size: 30rpx;
	  color: #fff;
	  text-align: center;
	  line-height: 80rpx;
	  border-radius: 40rpx;
	  background-color: #FF6619;
	}
</style>
