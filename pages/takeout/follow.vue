<template>
	<view class="content">
		<template v-if="isData == true && list.length == 0">
			<view class="no-goods">
				<view class="box">
					<image class="no-goods-img" src="http://img.bfb360.cn/upload/goods/2020-06/5ef1a1e7a6c7e.png"></image>
					<view class="no-goods-text">暂无内容</view>
				</view>
			</view>
		</template>
		<template v-if="isData == true && list.length > 0">
			<view class="list">
				<view class="item" v-for="(item, index) in list" :key="index">
					<view class="l">
						<image :src="item.shopImg" class="img" mode="aspectFill"></image>
						<view class="name">{{item.shopName}}</view>
					</view>
					<view class="r">
						<view class="type" @tap="followShop(item)" v-if="item.follow == 1">已关注</view>
						<view class="type active" @tap="followShop(item)" v-if="item.follow == 2">+关注</view>
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
				page: 1,
				page_size: 20,
				list: [],
				text: "",
				bottom: 0,
				isData: false,
				isLoad: false,
				pageLength: 0
			};
		},
		onLoad() {
			// 获取关注的商户列表
			this.getShopsFollowList();
		},
		// 上拉加载
		onReachBottom() {
			if(!this.isLoad) return;
			if(this.pageLength ==  20) {
				this.isLoad = false;
				this.page = this.page+1;
				this.getShopsFollowList();
			}
		},
		methods: {
			
			foucus(e) {
				this.bottom = e.detail.height
			},
			
			blur(e) {
				this.bottom = 0;
			},
			
			// 获取关注的商户列表
			getShopsFollowList() {
				let config = {
					page: this.page,
					page_size: this.page_size
				}
				this.$api.getShopsFollowList(config).then(res => {
					if(res.code == 200) {
						let list = res.data;
						list.map((item, index) => {
							item.follow = 1;
						});
						this.pageLength = list.length;
						this.isLoad = true;
						this.isData = true;
						this.list = list;
					}
				});
			},
			
			// 关注商户
			followShop(item) {
				let config = {
					shopId: item.shopId
				}
				this.$api.followShop(config).then(res => {
					if(res.code == 200) {
						if(res.data.type == 2) {
							item.follow = 1;
							uni.showToast({
								title: "关注成功"
							})
						}
						if(res.data.type == 1) {
							item.follow = 2;
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	
	.mask {
	  width: 100%;
	  height: 100%;
	  background: rgba(0,0,0,0.6);
	  position: absolute;
	  top: 0;
	}
	.empty {
	  width: 100%;
	  position: fixed;
	  left: 0;
	  right: 0;
	}
	.inputarea {
	  height: 100rpx;
	  background: #fff;
	  position: relative;
	}
	
	.content {
		height: 100%;
	}
	
	.list {
		padding: 20rpx 20rpx 20rpx;
		
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;
			
			.l {
				display: flex;
				align-items: center;
				.img {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					margin-right: 14rpx;
				}
				.name {
					font-size: 28rpx;
					color: #333;
				}
			}
			.r {
				
				.type {
					width: 140rpx;
					font-size: 28rpx;
					height: 60rpx;
					background-color: #fff;
					border: 1rpx solid #8A8A8A;
					border-radius: 30rpx;
					box-sizing: border-box;
					color: #8A8A8A;
					background-color: #fff;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					
					&.active {
						border: 1rpx solid #FF6619;
						background-color: #FF6619;
						color: #fff;
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
