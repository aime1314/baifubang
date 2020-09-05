<template>
	<view>
		<view class="bill">
			<view class="setyear">
				<picker fields="month" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="setyear_font">{{date}}</view>
				</picker>
				<image src="/static/icon_xl.png" ></image>
			</view>
			<view class="money-m">
				<text>支出¥{{sum}}</text>
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
								<view class="bill_date">{{item.createTime}}</view>
							</view>
							<view class="bill_money" :class="{'moneyup': item.orderType == 3}"><template v-if="item.orderType == 3">+</template>{{item.totalMoney}}</view>
						</view>
					</view>
				</template>
				
			</view>
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
				title: 'picker',
				date: currentDate,
				index: 0,
				data:"",
				start: "",	// 开始时间
				type: 0,	// 类型 //0 全部 1 线下 2 线上
				page: 1,
				page_size: 20,
				list: [],
				sum: 0,
				isLoad: false,
				pageLength: 0
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
			// 获取账单
			this.getBillList();
		},
		// 上拉加载
		onReachBottom() {
			if(!this.isLoad) return;
			if(this.pageLength ==  20) {
				this.isLoad = false;
				this.page = this.page+1;
				this.getBillList();
			}
		},
		methods: {
			
			// 获取账单
			getBillList() {
				let config = {
					start: this.start,
					type: this.type,
					page: this.page,
					page_size: this.page_size
				}
				this.$api.getBillList(config).then(res => {
					if(res.code == 200) {
						this.isLoad = true;
						this.pageLength = res.data.list.length;
						this.list = this.list.concat(res.data.list);
						this.sum = res.data.sum;
					}
				});
			},
			
			bindDateChange(e) {
				this.date = e.target.value;
				this.start = e.target.value;
				this.page = 1;
				this.sum = 0;
				this.list = [];
				this.getBillList();
			},
			
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}`;
			}
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

			.title {
				font-weight: bold;
				margin-left: 36%;
			}

			.iconfont {
				// padding: 0 30rpx;
				padding-left: 30rpx;
			}
		}
	}

	.bill {

		.bill-title {
			margin-top: 30rpx;
			font-size: 28rpx;
			// font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				padding-left: 16rpx;
				width: 30rpx;
				height: 20rpx;
			}
		}

		.setyear {
			margin: 20rpx 0 0 20rpx;
			// font-weight: bold;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.setyear_font {
				font-size: 32rpx;
			}

			image {
				padding-left: 16rpx;
				width: 30rpx;
				height: 30rpx;
			}
		}

		.money-m {
			margin: 0rpx 0 0 20rpx;
			font-size: 28rpx;
			color: #ff6619;
		}

		.bill_message {
			margin: 30rpx 0 0 0;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			background-color: #FFFFFF;
			padding-left: 20rpx;

			.moneyup {
				color: #ff6619;
			}

			.bill_message_style {
				display: flex;
				align-items: center;
				// margin: 20rpx 0;
				.bill_head {
					width: 100rpx;
					height: 100rpx;
					.bill_img {
						border-radius: 50%;
					}
				}
				.bill_float {
					border-bottom: 1rpx solid #E5E5E5;
					padding: 0 0 18rpx 0;
					flex: 1;
					align-items: center;
					padding: 0 20rpx 0 30rpx;
					display: flex;
					justify-content: space-between;
					height: 140rpx;
				}
				.bill_name {
					font-size: 30rpx;
					font-weight: bold;
				}

				.bill_date {
					font-size: 28rpx;
					color: #ccc;
				}

				.bill_money {
					font-size: 28rpx;
				}

			}

		}
	}
</style>
