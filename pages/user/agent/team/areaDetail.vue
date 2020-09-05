<template>
	<view class="content">
		
			<view class="box" :key="index">
				<view class="item-head">推广员：{{pro_count}} 累计商户：{{shop_count}}</view>
				<template v-for="(item, index) in list">
					<view class="item" :key="index">
						<view class="top">
							<view class="info">
								<image class="img" :src="item.userPhoto" mode=""></image>
								<text>{{item.real_name}}·推广员</text>
							</view>
							<view class="time">注册时间：{{item.create_time}}</view>
						</view>
						<view class="con">
							<view class="data">
								<view class="text">推广商户</view>
								<view class="num">{{item.shop_sum}}</view>
							</view>
							<view class="data">
								<view class="text">累计收益</view>
								<view class="num">{{item.sy_sum.toFixed(4)}}</view>
							</view>
						</view>
					</view>
				</template>
				
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				areaId: "",
				page: 1,
				page_size: 20,
				list: [],
				pro_count: 0,
				shop_count: 0
			};
		},
		onLoad(options) {
			this.areaId = options.areaId || "";
			this.getAgentPromoter();
		},
		methods: {
			
			getAgentPromoter() {
				let config = {
					areaId: this.areaId,
					page: this.page,
					page_size: this.page_size
				}
				this.$api.getAgentPromoter(config).then(res => {
					this.pro_count = res.data.pro_count;
					this.shop_count = res.data.shop_count;
					this.list = res.data.c_list;
				});
			},
			
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}
	
	.content {
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
	
	.head {
		padding: 30rpx 40rpx;
		margin-bottom: 20rpx;
		background-color: #4BA664;
		display: flex;
		align-items: center;
		
		.img {
			width: 120rpx;
			height: 120rpx;
			margin-right: 20rpx;
			
			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
		}
		
		.info {
			display: flex;
			flex-wrap: wrap;
			
			.name {
				width: 100%;
				font-size: 32rpx;
				color: #f4f4f4;
			}
			
			.desc {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				font-size: 30rpx;
				color: #fff;
				
				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
				}
				
				
			}
		}
	}
	
	.box {
		background-color: #fff;
		margin-bottom: 20rpx;
		
		.item-head {
			height: 100rpx;
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			font-size: 34rpx;
			color: #333;
			border-bottom: 1rpx solid #f7f7f7;
		}
		
		.item {
			padding: 20rpx 40rpx;
			border-bottom: 1rpx solid #f7f7f7;
			
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;
				
				.info {
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 30rpx;
					color: #333;
					
					.img {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
				}
				
				.time {
					font-size: 28rpx;
					color: #ccc;
				}
				
			}
			
			.con {
				display: flex;
				justify-content: space-between;
				
				.data {
					flex: 1;
					font-size: 32rpx;
					color: #333;
					
					view {
						width: 100%;
						text-align: center;
					}
				}
			}
			
		}
		
		.base {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			color: #ccc;
			margin-top: 20rpx;
			
			.more {
				display: flex;
				align-items: center;
				justify-content: center;
				
				image {
					width: 28rpx;
					height: 28rpx;
				}
			}
			
		}
	}
	
	
	.footer_box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 100rpx;
		background: #fff;
		display: flex;
		
		.btn-item {
			flex: 1;
			align-items: center;
			height: 100rpx;
			
			.btn-icon {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 100rpx;
				
				image {
					width: 48rpx;
					height: 48rpx;
				}
				
				text {
					font-size: 24rpx;
					color: #333;
				}
				
			}
			&.active text {
				color: #4BA664;
			}
		}
		
		.add-action {
			display: flex;
			align-items: center;
			justify-content: center;
			
			.add-icon {
				width: 104rpx;
				height: 104rpx;
				margin-bottom: 60rpx;
				border: 10rpx solid #fff;
				border-radius: 52rpx;
				
				image {
					width: 84rpx;
					height: 84rpx;
				}
			}
		}
	}
</style>

