<template>
	<view>
		<!-- 记账量统计 -->
		<view class="income">
			<view>记账量统计</view>
			<view class="setyear">
				<picker class="setyear_flex" mode="date" fields="month" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="setyear_font">{{date}}
						<view class="iconfont icon-down1 ">
						</view>
					</view>
				</picker>
			</view>
		</view>
		<view class="icome_num">
			<view class="icome_bg">
				<view class="icome_txt">有效订单数</view>
				<view class="font_num">{{count}}</view>
			</view>
			<view class="icome_bg">
				<view class="icome_txt">记账量</view>
				<view class="font_num">{{sum}}</view>
			</view>
		</view>

		<view class="page-heard">
			<view class="heard-ctb">
				<!--  class="ctb-text-b ctb_font" -->
				    <view :class="type===2?'ctb-text-b':'ctb-text-a'" @click="checkstatus(2)">线上订单</view>
				    <view :class="type===1?'ctb-text-b':'ctb-text-a'"  @click="checkstatus(1)">线下订单</view>
			</view>
		</view>
		<!-- type===1 -->
		
		<view class="icome_order" v-show="type===2">
			<template v-for="(item, index) in list">
				<view class="order_lists" :key="index">
					<view class="order_list">
						<view class="order_name">商户名称：{{item.shopName}}</view>
						<view class="order_time">订单时间：{{item.time}}</view>
					</view>
					<view class="order_num">记账量:<text>+{{item.nub}}</text>
					</view>
				</view>
			</template>
		</view>
		<!-- type===2 -->
		<view class="icome_order" v-show="type===1">
			<template v-for="(item, index) in list2">
				<view class="order_lists" :key="index">
					<view class="order_list">
						<view class="order_name">商户名称：{{item.shopName}}</view>
						<view class="order_time">订单时间：{{item.time}}</view>
					</view>
					<view class="order_num">记账量:<text>+{{item.nub}}</text>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				type: 2, // 1 线下订单 2 线上订单
				date: currentDate,
				start: "",
				page: 1,
				page_size: 20,
				count: 0,
				sum: 0,
				list: [],
				list2: []
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad() {
			// 获取记账量列表 个人
			this.getAmountIndex();
			// 获取记账量列表 头部信息
			this.getAmountList();
		},
		methods: {
			// 获取记账量列表 头部信息
			getAmountIndex() {
				let config = {
					start: this.start
				}
				this.$api.getAmountIndex(config).then(res => {
					if(res.code == 200) {
						this.count = res.data.count;
						this.sum = res.data.sum;
					}
				});
			},
			
			// 获取记账量列表 个人
			getAmountList() {
				let config = {
					start: this.start,
					page: this.page,
					page_size: this.page_size,
					type: this.type
				}
				this.$api.getAmountList(config).then(res => {
					if(res.code == 200) {
						if(this.type == 1) {
							this.list2 = this.list2.concat(res.data);
						}
						if(this.type == 2) {
							this.list = this.list.concat(res.data);
						}
						
					}
				});
			},
			
			// 获取选中的月份
			bindDateChange(e) {
				this.date = e.target.value;
				this.start = e.target.value;
				this.list = [];
				this.list2 = [];
				this.page = 1;
				this.getAmountIndex();
				this.getAmountList();
			},
			checkstatus(data) {
				if(this.type == data) return;
				this.type = data;
				this.page = 1;
				this.getAmountList();
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}`;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f8f8f8;
	}



	.nav-bar {
		display: flex;
		background-color: #FF6619;
		color: #666666;
		font-size: 35rpx;

		.nav-heard {
			display: flex;
			// line-height: 100%;
			width: 100%;
			padding: 130rpx 0 40rpx 0;

			.icon_fh {
				margin: 0 0 0 30rpx;
				width: 50rpx;
				height: 50rpx;
			}

			.title {
				color: #FFFFFF;
				font-weight: bold;
				margin-left: 32%;
			}

			.iconfont {
				padding-left: 30rpx;
			}
		}
	}

	.income {
		padding: 30rpx 20rpx;
		font-size: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		view {
			margin: 0 0 0 20rpx;
		}

		.setyear {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.setyear_flex {
				display: flex;
				justify-content: space-between;

			}

			.icon-down1 {
				color: #ff6619;
			}

			.setyear_font {
				display: flex;
				align-items: center;
				font-size: 30rpx;
			}

			image {
				padding-left: 16rpx;
				width: 30rpx;
				height: 30rpx;
			}
		}
	}

	.icome_num {
		display: flex;
		justify-content: space-around;

		.icome_bg {
			background-color: #ff6619;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #FFFFFF;
			width: 45%;
			border-radius: 10rpx;
			padding: 20rpx 0;

			.icome_txt {
				font-size: 30rpx;
			}

			.font_num {
				font-size: 40rpx;
				font-weight: bold;
			}
		}
	}

	.page-heard {
		padding: 10rpx 20rpx 0 20rpx;

	}

	.heard-ctb {
		padding: 30rpx 0 0 0;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.ctb_font {
			font-size: 30rpx;
		}
	}

	.ctb-text-a {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.ctb-text-a::after {
		margin: 20rpx 0 0 0;
		width: 60rpx;
		height: 2rpx;
		content: "";
		border-radius: 10rpx;
		border: 2rpx solid transparent;
	}

	.ctb-text-b {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-weight: bold;
	}

	.ctb-text-b::after {
		margin: 20rpx 0 0 0;
		width: 60rpx;
		height: 2rpx;
		background-color: #FF6619;
		border: 2rpx solid #FF6619;
		border-radius: 10rpx;
		content: "";
	}

	.line-st {
		width: 100%;
		height: 4rpx;
		margin: 4rpx 0 0 0;
		border-bottom: 2rpx solid #CCCCCC;
	}

	.icome_order {
		display: flex;
		flex-direction: column;
		margin: 20rpx 20rpx 0 20rpx;

		.order_lists {
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			align-items: flex-start;
			border-radius: 10rpx;
			margin-bottom: 20rpx;

			.order_list {
				.order_name {
					color: #333333;
					font-size: 30rpx;
					margin-bottom: 10rpx;
				}

				.order_time {
					font-size: 26rpx;
					color: #999999;
				}
			}

			.order_num {
				font-size: 28rpx;

				text {
					color: #ED6C1B;
				}
			}
		}
	}
</style>
