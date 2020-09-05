<template>
	<view class="content">
		
		<view class="nav" :style="{'padding-top': statusBarHeight + 'px', height: statusBarHeight + 45 + 'px'}">
			<view class="nav-title">
				<view :class="{active: type == 1}" @tap="changeType(1)">关注</view>
				<view :class="{active: type == 2}" @tap="changeType(2)">推荐</view>
			</view>
		</view>
		
		<template v-if="isPower == 1">
			<!-- <view class="list" :style="{'margin-top': statusBarHeight + 45 + 'px'}">没有授权</view> -->
		</template>
		<template v-if="isPower == 2 && list.length == 0">
			<view class="no-goods">
				<view class="box">
					<image class="no-goods-img" src="http://img.bfb360.cn/upload/goods/2020-06/5ef1a1e7a6c7e.png"></image>
					<view class="no-goods-text">暂无内容</view>
				</view>
			</view>
		</template>
		<template v-if="isPower == 2 && list.length > 0">
			<view class="list" :style="{'padding-top': statusBarHeight + 60 + 'px'}">
				<view class="item" v-for="(item, index) in list" :key="index" @tap="toDetail(item.id)">
					<view class="img">
						<image :src="item.img" mode="aspectFill"></image>
					</view>
					<image class="icon-play" src="/static/icon_takeout_play.png" mode=""></image>
					<view class="info-box">
						<view class="title">{{item.content}}</view>
						<view class="base">
							<image class="shop-icon" :src="item.shopImg" mode=""></image>
							<view class="shop-name">{{item.shopName}}</view>
							<image class="collect" v-if="item.is_zan == 2" src="/static/icon_small_collect_d.png" mode=""></image>
							<image class="collect" v-if="item.is_zan == 1" src="/static/icon_small_collect_a.png" mode=""></image>
						</view>
					</view>
				</view>
				
			</view>
		</template>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 2,
				page: 1,
				pagesize: 20,
				list: [],
				pageLength: 0,
				isLoad: false,
				select: false,
				statusBarHeight: 0,
				isPower: 0,	// 1 未授权 2 已授权
			};
		},
		
		onLoad(options) {
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
		},
		onShow() {
			// 获取视频推荐列表
			this.getVideoList();
		},
		onHide() {
			this.isPower = 0;
			this.page = 1;
			this.type = 2;
			this.list = [];
		},
		// 上拉加载
		onReachBottom() {
			if(!this.isLoad) return;
			if(this.pageLength ==  20) {
				this.isLoad = false;
				this.page = this.page+1;
				if(type == 2) {
					this.getVideoList();
				}
				if(type == 1) {
					this.getGVideoList();
				}
			}
		},
		methods: {
			// 获取视频推荐列表
			getVideoList() {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) {
					return this.isPower = 1;
				}
				// #endif
				let config = {
					page: this.page,
					page_size: this.pagesize
				}
				this.$api.getVideoList(config).then(res => {
					console.log(res);
					this.isLoad = true;
					this.isPower = 2;
					this.list = this.list.concat(res.data);
				});
			},
			
			// 获取关注商户的视频列表
			getGVideoList() {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) {
					return this.isPower = 1;
				}
				// #endif
				let config = {
					page: this.page,
					page_size: this.pagesize
				}
				this.$api.getGVideoList(config).then(res => {
					console.log(res);
					this.isLoad = true;
					this.isPower = 2;
					this.list = this.list.concat(res.data);
				});
			},
			
			changeType(type) {
				if(type == this.type) return;
				this.type = type;
				this.isPower = 0;
				this.page = 1;
				this.list = [];
				if(type == 2) {
					this.getVideoList();
				}
				if(type == 1) {
					this.getGVideoList();
				}
			},
			
			
			// 查看视频详情
			toDetail(id) {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) {
					return uni.navigateTo({ url: "/pages/auth/impower" });
				}
				// #endif
				uni.navigateTo({ url: "/pages/takeout/video?id=" + id });
			},
			toPage(page) {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) {
					return uni.navigateTo({ url: "/pages/auth/impower" });
				}
				// #endif
				uni.navigateTo({ url: page });
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
	.content {
		height: 100%;
	}
	.nav {
		width: 750rpx;
		height: 45px;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		background-color: #f4f4f4;
	}
	.nav-title {
		width: 750rpx;
		height: 45px;
		line-height: 45px;
		text-align: center;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 10;
		font-size:32rpx;
		letter-spacing:2px;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: center;
		
		view {
			margin: 0 45rpx;
		}
		.active {
			color: #FF6619;
			position: relative;
			
			&::before {
				content: "";
				position: absolute;
				left: 0;
				right: 0;
				bottom: 14rpx;
				margin: auto;
				width: 40rpx;
				height: 2rpx;
				background-color: #FF6619;
			}
		}
	}
	.list {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 30rpx 30rpx;
		
		.item {
			width: 330rpx;
			margin-bottom: 30rpx;
			position: relative;
			
			.img {
				width: 330rpx;
				height: 340rpx;
				
				image {
					width: 100%;
					height: 100%;
					border-top-left-radius: 12rpx;
					border-top-right-radius: 12rpx;
				}
			}
			
			.icon-play {
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				top: 20rpx;
				right: 20rpx;
			}
			
			.info-box {
				background-color: #f7f7f7;
				padding: 20rpx 10rpx 30rpx;
				border-bottom-left-radius: 12rpx;
				border-bottom-right-radius: 12rpx;
				
				.title {
					font-size: 28rpx;
					color: #333;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					flex-direction: column;
				}
				
				.base {
					display: flex;
					justify-content: center;
					align-items: center;
					
					.shop-icon {
						width: 48rpx;
						height: 48rpx;
						border-radius: 24rpx;
						margin-right: 10rpx;
					}
					
					.shop-name {
						width: 172rpx;
						flex: 1;
						overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
					}
					
					.collect {
						width: 40rpx;
						height: 40rpx;
					}
					
				}
				
			}
		}
	}
	.no-goods {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.no-goods .box {
		margin-top: 60rpx;
	}
	.no-goods-img {
		width: 400rpx;
		height: 400rpx;
		margin: 0 auto;
	}
	.no-goods-text {
		font-size: 32rpx;
		color: #999;
		margin: 65rpx auto 60rpx;
		text-align: center;
	}
</style>