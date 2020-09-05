<template>
	<view>
		<view class="fan">
			<!-- 注:具体到某个推广员时,此处不显示代理中心选择 -->
			<view class="fan_Info">
				<view class="fan_style">
					<view class="fan_text">今日新增</view>
					<view class="fan_num">{{today}}</view>
				</view>
				<view class="fan_style order">
					<view class="fan_text">本月新增</view>
					<view class="fan_num">{{month}}</view>
				</view>
				<view class="fan_style">
					<view class="fan_text">累计商户</view>
					<view class="fan_num">{{total}}</view>
				</view>
			</view>
		</view>
		<view class="bill_message">
			<template v-for="(item, index) in list">
				<view class="bill_message_style" :key="index">
					<view class="bill_head">
						<image class="bill_img" :src="item.shopImg"></image>
					</view>
					<view class="bill_float">
						<view>
							<view class="bill_name">{{item.shopName}}</view>
							<view class="bill_date clccc">商家地址：{{item.shopAddress}}</view>
							<view class="bill_money clccc">注册时间：{{item.inTime}}</view>
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
				start: "",
				today: 0,
				month: 0,
				total: 0,
				list: [],
				isLoad: false,
				pageLength: 0
			}
		},
		onLoad() {
			// 推广员推广商户列表
			this.getShopsList();
		},
		// 上拉加载
		onReachBottom() {
			if(!this.isLoad) return;
			if(this.pageLength ==  20) {
				this.isLoad = false;
				this.page = this.page+1;
				this.getShopsList();
			}
		},
		methods: {
			// 推广员推广商户列表
			getShopsList() {
				let config = {
					start: this.start
				}
				this.$api.getShopsList(config).then(res => {
					if(res.code == 200) {
						this.today = res.data.today;
						this.month = res.data.month;
						this.total = res.data.total;
						this.isLoad = true;
						this.pageLength = res.data.list.length;
						this.list = this.list.concat(res.data.list);
					}
				});
			},
		},
	}
</script>

<style lang="scss">
	page {
		background: #f8f8f8;
	}
	.nav-bar {
		display: flex;
		background-color: #f8f8f8;
		color: #666666;
		font-size: 35rpx;
	
		.nav-heard {
			display: flex;
			// line-height: 100%;
			width: 100%;
			padding: 120rpx 0 40rpx 0;
			border-bottom: 1rpx solid #e7eae7;
			justify-content: center;
	
			.title {
				font-weight: bold;
			}
		}
	}
	
	.fan {
		padding: 0 20rpx;
	}
	
	.fan_title {
		margin: 30rpx 0 0 0;
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		// font-weight: bold;
		padding: 0 30rpx;
	
		.fan_agency {
			display: flex;
			align-items: center;
		}
	
		image {
			padding-left: 16rpx;
			width: 30rpx;
			height: 20rpx;
		}
	}
	
	
	
	.fan_Info {
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		text-align: center;
		border-radius: 10rpx;
		height: 200rpx;
		align-items: center;
		margin: 40rpx 20rpx 10px;
	
		// .order {
		// 	padding: 0 40rpx;
		// 	border-left: 1rpx dotted #000000;
		// 	border-right: 1rpx dotted #000000;
		// }
	
		.fan_style {
			width: 33%;
			padding: 20rpx 0;
			.fan_text {
				font-size: 32rpx;
			}
	
			.fan_num {
				font-size: 30rpx;
			}
		}
		.fan_style:nth-child(2) {
			border-left: 2rpx dotted #ddd;
			border-right: 2rpx dotted #ddd;
		}
	}
	
	.bill_message {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	
		.bill_message_style {
			margin: 20rpx 0 0 0;
			display: flex;
			padding: 30rpx 0;
			background-color: #FFFFFF;
	
			.bill_head {
				width: 100rpx;
				height: 100rpx;
				margin-left: 20rpx;
	
				.bill_img {
					border-radius: 50% !important;
				}
			}
	
			.bill_float {
				flex: 1;
				align-items: center;
				padding: 0 20rpx 0 30rpx;
				display: flex;
				justify-content: space-between;
	
				.clccc {
					line-height: 1.5em;
					color: #666;
				}
			}
	
			.bill_name {
				font-size: 28rpx;
				font-weight: bold;
				max-width: 300rpx;
				white-space:nowrap;
				text-overflow:ellipsis;
				overflow: hidden;
			}
	
			.bill_date {
				font-size: 28rpx;
			}
	
			.bill_money {
				font-size: 28rpx;
			}
		}
		.bill_message_style:last-child {
			margin-bottom: 30rpx;
		}
	}
</style>
