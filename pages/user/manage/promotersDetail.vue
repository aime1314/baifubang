<template>
	<view>
		<view class="nav-bar" :style="{'height':navheight+'px'}">
			<view class="nav-heard">
				<view class="iconfont icon-Left"></view>
				<view class="title">推广员概况</view>
			</view>
		</view>
		<view class="page-heard">
			<input placeholder="请输入姓名" />
			<view class="iconfont icon-fangdajing"></view>
		</view>
		<view class="page-body">
			<view class="tab-body-e">
				<view class="turnover">
					<view class="text">累计粉丝</view>
					<view class="price">14</view>
				</view>
				<view class="order">
					<view class="text">累计商户</view>
					<view class="price">14</view>
				</view>
			</view>
			<view class="tab-body-f">
				<image src="../../../static/default.png"></image>
				<view class="tab-ct-a">
					<view class="tab-ct-b">
						<view class="text-st"> 推广员姓名</view>
					</view>
					<view class="tab-ct-b">
						<view class="text-st">推广的商户数：45个</view>
						<view class="text-st">粉丝数：0个</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let app = ''
	export default {

		data() {
			return {
				navheight: 0
			}
		},
		onLoad() {
			app = getApp();
			this.navheight = app.globalData.navheight;
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.nav-bar {
		display: flex;
		align-items: flex-end;
		border-bottom: 1rpx solid #e7e7e7;
		font-weight: bold;
		font-size: 35rpx;

		.nav-heard {
			display: flex;
			line-height: 100%;
			width: 55%;
			padding: 35rpx 0;
			justify-content: space-between;

			.iconfont {
				padding: 0 30rpx;
			}
		}
	}

	.page-heard {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx;
		background-color: #FFFFFF;

		.iconfont {
			padding: 0 30rpx;
			font-size: 40rpx;
			font-weight: bold;
		}

		input {
			height: 60rpx;
			border: 2rpx solid #d8d8d8;
			background-color: #fbfbfb;
			border-radius: 10rpx;
		}
	}

	.page-body {
		.tab-body-e {
			display: flex;
			justify-content: space-around;
			margin: 20rpx 0;
			flex-wrap: wrap;
			padding: 0 20rpx;
			border-top: 1rpx solid #eeeeee;
			background-color: #FFFFFF;
			margin: 20rpx 20rpx;
			padding: 30rpx;
			border-radius: 15rpx;

			.body-ct {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0 35rpx;
				margin: 20rpx 0;
			}


			.turnover {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 30rpx;
				padding: 30rpx;

				width: 45%;

				.text {
					font-size: 25rpx;
					font-weight: bold;
				}

				.price {
					font-size: 40rpx;
				}
			}

			.order {
				display: flex;
				flex-direction: column;
				align-items: center;
				border-left: 1rpx dotted #000000;
				padding: 30rpx;
				width: 45%;

				.text {
					font-size: 25rpx;
					font-weight: bold;
				}

				.price {
					font-size: 40rpx;
				}
			}

		}

		.tab-body-f {
			display: flex;
			background-color: #FFFFFF;
			padding: 20rpx 0;
			margin: 20rpx 0;

			image {
				width: 120rpx;
				height: 120rpx;
				padding:0 10rpx;
			}

			.tab-ct-a {
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 25rpx;
				font-weight: bold;
				padding: 10rpx 10rpx;
				width: 80%; 
			}

			.tab-ct-b {
				display: flex;
				justify-content: space-between;
				font-size: 25rpx;
				padding: 5rpx 20rpx;
			}
		}
	}
</style>
