<template>
	<view class="content">
		<view class="list">
			<view class="goods-item" v-for="(item, index) in list" :key="index" @tap="selectGoods(item)">
				<image class="goods-img" :src="item.goodsImg" :mode="aspectFill"></image>
				<view class="info">
					<view class="title">{{item.goodsName}}</view>
					<view class="desc">{{item.goodssynopsis}}</view>
					<view class="price">¥{{item.shopPrice}}</view>
				</view>
				<image class="more" src="/static/merchant_more.png" @tap.stop="changeMark(item,index)"></image>
				<view class="mark-box" v-if="item.isMark" @tap.stop="closeMark(item)"></view>
				<view class="mark" v-if="item.isMark">
					<view class="item" @tap.stop="editItem(item)">
						<image src="/static/dis.png"></image>
						<view>编辑</view>
					</view>
					<view class="item" @tap.stop="delItem(item)">
						<image src="/static/delete.png"></image>
						<view>删除</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="footer_box">
			<view class="btn-default" @tap="toPage('/pages/merchant/takeout/goodsManage/createGoods')">添加商品</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				page: 1,
				pagesize: 20,
				list: [],
				pageLength: 0,
				isLoad: false,
				select: false
			};
		},
		
		onLoad(options) {
			this.select = options.select || false;
		},
		
		onShow() {
			// 获取店铺外卖商品列表
			this.getTakeGoodsList();
		},
		
		onHide() {
			this.page = 1;
			this.pagesize = 20;
			this.list = [];
			this.pageLength = 0;
		},
		
		// 上拉加载
		onReachBottom() {
			if(!this.isLoad) return;
			if(this.pageLength ==  20) {
				this.isLoad = false;
				this.page = this.page+1;
				this.getTakeGoodsList();
			}
		},
		
		methods: {
			// 获取店铺外卖商品列表
			getTakeGoodsList() {
				let config = {
					type: this.type,
					page: this.page,
					pageSize: this.pagesize
				}
				this.$api.getTakeGoodsList(config).then(res => {
					if(res.code == 200) {
						let list = res.data;
						for(let i = 0; i<list.length; i++) {
							list[i].isMark = false;
						}
						this.isLoad = true;
						this.pageLength = list.length;
						this.list = this.list.concat(list);
					}
				})
			},
			
			// 选择商品
			selectGoods(item) {
				if(!this.select) return;
				uni.setStorageSync("goods", JSON.stringify(item));
				uni.navigateBack({
					delta: -1
				})
			},
			
			// 编辑
			editItem(item) {
				uni.navigateTo({
					url: "/pages/merchant/takeout/goodsManage/createGoods?type=2&goodsId=" + item.goodsId
				})
			},
			
			// 删除
			delItem(item) {
				let goodsId = item.goodsId;
				let config = {
					goodsId: [goodsId]
				}
				this.$api.delTakeGoods(config).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: "删除成功",
							icon: "none"
						});
						this.page = 1;
						this.list = [];
						this.getTakeGoodsList();
					}
				});
			},
			
			changeMark(item, index) {
				item.isMark = true;
			},
			
			closeMark(item) {
				item.isMark = false;
			},
			
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
		background-color: #f7f7f7;
	}
	
	.content {
		padding-top: 20rpx;
		padding-bottom: 100rpx;
	}
	
	.list {
		
		.goods-item {
			background-color: #fff;
			padding: 26rpx 40rpx;
			border-bottom: 1rpx solid #f7f7f7;
			display: flex;
			justify-content: flex-start;
			position: relative;
			
			.goods-img {
				width: 128rpx;
				height: 128rpx;
				margin-right: 10rpx;
			}
			
			.info {
				flex: 1;
				
				.title {
					font-size: 28rpx;
					color: #333;
				}
				
				.desc {
					font-size: 26rpx;
					color: #999;
				}
				
				.price {
					font-size: 30rpx;
					color: #ff6619;
				}
			}
			
			.more {
				position: absolute;
				bottom: 26rpx;
				right: 40rpx;
				width: 60rpx;
				height: 30rpx;
			}
			
			
		}
	}
	
	.mark-box {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 9;
	}
	
	.mark {
		position: absolute;
		bottom: 30rpx;
		right: 130rpx;
		width: 234rpx;
		z-index: 10;
		border-radius: 8rpx;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		
		.item {
			width: 117rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			color: #fff;
			font-size: 26rpx;
			image {
				margin-bottom: 7rpx;
				width: 30rpx;
				height: 30rpx;
			}
		}
		
		&::before {
			content: "";
			position: absolute;
			bottom: 15rpx;
			right: -20rpx;
			width: 0;
			height: 0;
			border-top: 10rpx solid transparent;
			border-left: 20rpx solid #7C7C7C;
			border-bottom: 10rpx solid transparent;
		}
	}
	
	.footer_box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.btn-default {
			width: 690rpx;
			height: 80rpx;
			background-color: #1C7CE9;
			color: #fff;
			border-radius: 6rpx;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
