<template>
	<view class="content">
		<view class="head">
			<view class="img">
				<image :src="userPhoto" mode="scaleToFill"></image>
			</view>
			<view class="info">
				<view class="name">{{real_name}}</view>
				<view class="desc">
					<template v-if="areaType == 0">
						<image src="/static/icon_province.png" mode=""></image>
						<text>省级代理商</text>
					</template>
					<template v-if="areaType == 1">
						<image src="/static/icon_city.png" mode=""></image>
						<text>市级代理商</text>
					</template>
					<template v-if="areaType == 2">
						<image src="/static/icon_area.png" mode=""></image>
						<text>区/县级代理商</text>
					</template>
				</view>
			</view>
		</view>
		
		<template v-for="(item, index) in list">

			<template v-if="item.areaType == 0">
				<view class="box" :key="index">
					<view class="item-head">市级代理（共{{item.count}}人）</view>
					<template v-for="(citem, idx) in item.list">
						<view class="item" :key="idx">
							<view class="top">
								<view class="info">
									<image class="img" :src="citem.userPhoto" mode=""></image>
									<text>{{citem.areaName}}代理·{{citem.real_name}}</text>
								</view>
							</view>
							<view class="con">
								<view class="data">
									<view class="text">入驻商户</view>
									<view class="num">{{citem.shop_sum}}</view>
								</view>
								<view class="data">
									<view class="text">商户粉丝</view>
									<view class="num">{{citem.fans_sum}}</view>
								</view>
								<view class="data">
									<view class="text">累计收益</view>
									<view class="num">{{citem.sy_sum}}</view>
								</view>
							</view>
							<view class="base">
								<view class="time">代理时间：{{citem.jointime}}</view>
								<view class="more" @tap="toPage('/pages/user/agent/team/cityDetail?areaId=' + citem.areaId)"><text>查看更多</text><image src="/static/icon_small_team_more.png"></image></view>
							</view>
						</view>
					</template>
				</view>
			</template>
			
			<template v-if="item.areaType == 1">
				<view class="box" :key="index">
					<view class="item-head">区/县级代理（共{{item.count}}人）</view>
					<template v-for="(citem, idx) in item.list">
						<view class="item">
							<view class="top">
								<view class="info">
									<image class="img" :src="citem.userPhoto" mode=""></image>
									<text>{{citem.areaName}}代理·{{citem.real_name}}</text>
								</view>
							</view>
							<view class="con">
								<view class="data">
									<view class="text">入驻商户</view>
									<view class="num">{{citem.shop_sum}}</view>
								</view>
								<view class="data">
									<view class="text">商户粉丝</view>
									<view class="num">{{citem.fans_sum}}</view>
								</view>
								<view class="data">
									<view class="text">累计收益</view>
									<view class="num">{{citem.sy_sum}}</view>
								</view>
							</view>
							<view class="base">
								<view class="time">代理时间：{{citem.jointime}}</view>
								<view class="more" @tap="toPage('/pages/user/agent/team/areaDetail?areaId=' + citem.areaId)"><text>查看更多</text><image src="/static/icon_small_team_more.png"></image></view>
							</view>
						</view>
					</template>
					
				</view>
			</template>
			
			<template v-if="item.areaType == 2">
				<view class="box">
					<view class="item-head">推广员：{{item.list.pro_count}} 累计商户：{{item.list.shop_count}}</view>
					<template v-for="(citem, idx) in item.list.c_list1">
						<view class="item" :key="idx">
							<view class="top">
								<view class="info">
									<image class="img" :src="citem.userPhoto" mode=""></image>
									<text>{{citem.real_name}}·推广员</text>
								</view>
								<view class="time">注册时间：{{citem.create_time}}</view>
							</view>
							<view class="con">
								<view class="data">
									<view class="text">推广商户</view>
									<view class="num">{{citem.shop_sum}}</view>
								</view>
								<view class="data">
									<view class="text">累计收益</view>
									<view class="num">{{citem.sy_sum.toFixed(4)}}</view>
								</view>
							</view>
						</view>
					</template>
					
				</view>
			</template>
			
		</template>
		
		<view class="footer_box">
			<view class="btn-item" @tap="toIndex">
				<view class="btn-icon">
					<image src="/static/icon_manage_index_d.png"></image>
					<text>首页</text>
				</view>
			</view>
			<view class="btn-item" @tap="redirectPage('/pages/user/agent/index')">
				<view class="btn-icon">
					<image src="/static/icon_tab_agent_d.png"></image>
					<text>代理中心</text>
				</view>
			</view>
			<view class="btn-item active">
				<view class="btn-icon">
					<image src="/static/icon_tab_team_a.png"></image>
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
				msg: "",
				areaType: "",
				real_name: "",
				userPhoto: "",
				list: [],
			};
		},
		onLoad() {
			this.getAgentTeamList2();
			
		},
		methods: {
			getAgentTeamList2() {
				this.$api.getAgentTeamList2().then(res => {
					if(res.code == 200) {
						this.msg = res.data[0].msg;
						this.areaType = res.data[0].areaType;
						this.real_name = res.data[0].real_name;
						this.userPhoto = res.data[0].userPhoto;
						this.list = res.data;
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
		background-color: #f7f7f7;
	}
	
	.content {
		padding-bottom: 120rpx;
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
