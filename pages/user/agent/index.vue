<template>
	<view class="content">
		<view class="banner">
			<image src="http://img.bfb360.cn/upload/shops/2020-06/5ef09027066e9.png" mode="scaleToFill"></image>
		</view>
		<view class="con-area">
			<view class="item" @tap="toPage('/pages/user/agent/unionMerchants')">
				<image src="/static/icon_001.png" ></image>
				<view class="base">
					<view class="title">联盟商户</view>
					<view class="text">{{shop_sum}}</view>
				</view>
			</view>
			<view class="item" @tap="toPage('/pages/user/agent/fanDetails')">
				<image src="/static/icon_002.png" ></image>
				<view class="base">
					<view class="title">商家粉丝</view>
					<view class="text">{{fans_sum}}</view>
				</view>
			</view>
		</view>
		
		<view class="footer_box">
			<view class="btn-item" @tap="toIndex">
				<view class="btn-icon">
					<image src="/static/icon_manage_index_d.png"></image>
					<text>首页</text>
				</view>
			</view>
			<view class="btn-item active">
				<view class="btn-icon">
					<image src="/static/icon_tab_agent_a.png"></image>
					<text>代理中心</text>
				</view>
			</view>
			<view class="btn-item" @tap="redirectPage('/pages/user/agent/team/index')">
				<view class="btn-icon">
					<image src="/static/icon_tab_team_d.png"></image>
					<text>团队</text>
				</view>
			</view>
			<view class="btn-item" @tap="redirectPage('/pages/user/agent/earnings/index')">
				<view class="btn-icon">
					<image src="/static/icon_tab_earning_d.png"></image>
					<text>收益</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shop_sum: 0,	// 商户数
				fans_sum: 0,	// 粉丝数
			};
		},
		onShow() {
			// 代理中心-首页数据
			this.getAgentIndex();
		},
		methods: {
			// 代理中心-首页数据
			getAgentIndex() {
				this.$api.getAgentIndex().then(res => {
					if(res.code == 200) {
						this.shop_sum = res.data.shop_sum;	// 商户数
						this.fans_sum = res.data.fans_sum;	// 粉丝数
					}
				});
			},
			
			// 返回首页
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			
			redirectPage(page) {
				uni.redirectTo({
					url: page
				})
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
		background-color: #f4f4f4;
	}
	
	.content {
		
	}
	
	.banner {
		width: 750rpx;
		height: 300rpx;
		
		image {
			width: 750rpx;
			height: 300rpx;
		}
	}
	
	.con-area {
		margin: 40rpx 0;
		display: flex;
		align-items: center;
		
		.item {
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			
			&:first-child {
				border-right: 1rpx solid #ccc;
			}
			
			image {
				width: 100rpx;
				height: 100rpx;
				margin-right: 20rpx;
			}
			
			.base {
				display: flex;
				flex-wrap: wrap;
				font-size: 32rpx;
				color: #333;
				
				view {
					width: 100%;
					text-align: center;
				}
			}
			
		}
	}
	
	.footer_box {
		position: absolute;
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
