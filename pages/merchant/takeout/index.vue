<template>
	<view class="content">
		<view class="title">视频/外卖</view>
		<view class="list">
			<view class="item">
				<view class="l">
					<image src="/static/icon_takeout_01.png" ></image>
					<text>外卖订单</text>
				</view>
				<image class="r" src="/static/icon_small_arrow.png" ></image>
			</view>
			<view class="item" @tap="toPage('/pages/merchant/takeout/videoManage/videoList')">
				<view class="l">
					<image src="/static/icon_takeout_02.png" ></image>
					<text>我的视频</text>
				</view>
				<image class="r" src="/static/icon_small_arrow.png" ></image>
			</view>
		</view>
		<view class="title">商品管理</view>
		<view class="list">
			<view class="item" @tap="toPage('/pages/merchant/takeout/goodsManage/addCategory')">
				<view class="l">
					<image src="/static/icon_takeout_03.png" ></image>
					<text>添加分类</text>
				</view>
				<image class="r" src="/static/icon_small_arrow.png" ></image>
			</view>
			<view class="item" @tap="toPage('/pages/merchant/takeout/goodsManage/categoryList')">
				<view class="l">
					<image src="/static/icon_takeout_04.png" ></image>
					<text>分类列表</text>
				</view>
				<image class="r" src="/static/icon_small_arrow.png" ></image>
			</view>
			<view class="item" @tap="toPage('/pages/merchant/takeout/goodsManage/createGoods')">
				<view class="l">
					<image src="/static/icon_takeout_05.png" ></image>
					<text>添加商品</text>
				</view>
				<image class="r" src="/static/icon_small_arrow.png" ></image>
			</view>
			<view class="item" @tap="toPage('/pages/merchant/takeout/goodsManage/goodsList')">
				<view class="l">
					<image src="/static/icon_takeout_06.png" ></image>
					<text>商品列表</text>
				</view>
				<image class="r" src="/static/icon_small_arrow.png" ></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			uni.removeStorageSync("Path1");
			uni.removeStorageSync("Path2");
			uni.removeStorageSync("goodsCatId");
			uni.removeStorageSync("categoryText");
			uni.removeStorageSync("goods");
		},
		methods: {
			toPage(page) {
				uni.navigateTo({
					url: page
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
	}
	
	.content {
		padding: 0;
	}
	
	.title {
		font-size: 30rpx;
		color: #333;
		height: 100rpx;
		display: flex;
		align-items: center;
		padding: 0 40rpx;
	}
	
	.list {
		background-color: #fff;
		
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 40rpx;
			height: 100rpx;
			font-size: 30rpx;
			color: #333;
			
			.l {
				display: flex;
				align-items: center;
				
				image {
					width: 60rpx;
					height: 60rpx;
					margin-right: 10rpx;
				}
			}
			
			.r {
				width: 17rpx;
				height: 28rpx;
			}
		}
	}
	
</style>
