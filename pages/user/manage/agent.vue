<template>
	<view>
		<!-- 运营商 -->
		<view class="nav-bar" :style="{'height':navheight+'px'}">
			<view class="nav-heard">
				<view class="head-photo">
					<image src="../../../static/images/back-com.jpg"></image>
				</view>
				<view class="head-title">
					<view>李某·省级代理商</view>
					<view>这里是成等级图标</view>
				</view>
			</view>
		</view>
		<!-- 搜索框 -->
		<!-- <view class="agent_search">
			<view class="search_icon">
				<image src="../../../static/sousuo.png" mode=""></image>
			</view>
			<view class="search_input">
				<input type="text" value="" placeholder="请输入代理人姓名" />
			</view>
		</view> -->
		<!-- 代理 -->
		<view class="agent_dl">
			<view class="dl_list">
				<view class="lv_title">
					<text>市级代理</text>
					<text class="lv_font">(共2人)</text>
				</view>
				<view class="dl_message">
					<view class="dl_head">
						<image src="../../../static/images/back-com.jpg"></image>
						<text>李某·济南市代理</text>
					</view>
					<view class="dl_xx">
						<view>
							<view>999</view>
							<view>入驻商户</view>
						</view>
						<view>
							<view>999999</view>
							<view>商户粉丝</view>
						</view>
						<view>
							<view>99.9999</view>
							<view>累计收益</view>
						</view>
					</view>
					<view class="dl_time">
						<view class="time_left">
							代理时间:2020-05-04 14:20
						</view>
						<view class="time_right">
							详情
							<image src="../../../static/Left.png"></image>
						</view>
					</view>
				</view>
				<view class="dl_message">
					<view class="dl_head">
						<image src="../../../static/images/back-com.jpg"></image>
						<text>林某·青岛市代理</text>
					</view>
					<view class="dl_xx">
						<view>
							<view>999</view>
							<view>入驻商户</view>
						</view>
						<view>
							<view>999999</view>
							<view>商户粉丝</view>
						</view>
						<view>
							<view>99.9999</view>
							<view>累计收益</view>
						</view>
					</view>
					<view class="dl_time">
						<view class="time_left">
							代理时间:2020-05-04 14:20
						</view>
						<view class="time_right">
							详情
							<image src="../../../static/Left.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="dl_list">
				<view class="lv_title">
					<text>区县级代理</text>
					<text class="lv_font">(共1人)</text>
				</view>
				<view class="dl_message">
					<view class="dl_head">
						<image src="../../../static/images/back-com.jpg"></image>
						<text>刘某·山西市代理</text>
					</view>
					<view class="dl_xx">
						<view>
							<view>999</view>
							<view>入驻商户</view>
						</view>
						<view>
							<view>999999</view>
							<view>商户粉丝</view>
						</view>
						<view>
							<view>99.9999</view>
							<view>累计收益</view>
						</view>
					</view>
					<view class="dl_time">
						<view class="time_left">
							代理时间:2020-05-04 14:20
						</view>
						<view class="time_right">
							详情
							<image src="../../../static/Left.png"></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 
				注:此页面 根据不同权限级别展示不同的内容 权限级别为省级 市级区县级 省级有权限查看省级以下所属机构的数据以此类推
			 -->
		</view>
		<!-- 底部导航 -->
		<view class="tabber">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},

		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background: #f8f8f8;
	}

	.nav-bar {
		display: flex;
		background-color: #4ba664;
		color: #666666;
		font-size: 35rpx;

		.nav-heard {
			display: flex;
			justify-content: flex-start;
			width: 100%;
			padding: 160rpx 0 40rpx 0;
			border-bottom: 1rpx solid #e7eae7;
			color: #FFFFFF;
			align-items: center;

			.head-title {
				padding: 0 0 0 30rpx;
			}

			.head-photo {
				margin: 0 0 0 40rpx;
				width: 160rpx;
				height: 160rpx;

				image {
					border-radius: 50%;
				}
			}
		}
	}

	.agent_search {
		background-color: #FFFFFF;
		border-radius: 60rpx;
		margin: 20rpx 20rpx;
		display: flex;
		justify-content: flex-start;
		height: 80rpx;
		align-items: center;
		padding-left: 200rpx;
		border: 1rpx solid #CCCCCC;

		.search_icon {
			width: 60rpx;
			height: 40rpx;
			padding-right: 20rpx;
		}

		.search_input {}
	}

	.agent_dl {
		margin:40rpx 30rpx 0 30rpx;
		border-radius: 5rpx;
		display: flex;
		flex-direction: column;
		.dl_list {
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			margin-bottom: 30rpx;

			.lv_title {
				display: flex;
				align-items: center;
				font-size: 40rpx;
				padding: 30rpx;

				.lv_font {
					padding-left: 10rpx;
					font-size: 30rpx;
				}
			}

		}

		.dl_message {
			display: flex;
			flex-direction: column;
			border-top: 1rpx solid #CCCCCC;
			padding: 20rpx 30rpx;

			.dl_head {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 10rpx 0;

				image {
					margin: 0 0 0 30rpx;
					border-radius: 50%;
					width: 100rpx;
					height: 100rpx;
				}

				text {
					padding-left: 20rpx;
					font-size: 30rpx;
					font-weight: bold;
				}
			}

			.dl_xx {
				display: flex;
				justify-content: space-between;
				color: #999999;
				font-size: 36rpx;
				text-align: center;
			}

			.dl_time {
				display: flex;
				justify-content: space-between;
				font-size: 30rpx;
				color: #999999;
				margin: 20rpx 0 0 0;

				.time_right {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					image {
						margin-left: 10rpx;
						width: 30rpx;
						height: 30rpx;
					}
				}
			}
		}
	}
</style>
