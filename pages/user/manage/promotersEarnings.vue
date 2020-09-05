<template>
	<view>
		<view class="page-heard">
			<view class="heard-ct">
				<view class="title">收益统计</view>
				<!-- <view class="profit-dec">（当前收益级别10元/人/年）</view> -->
			</view>
			<view class="heard-ct">
				<picker class="setyear_flex" mode="date" fields="month" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="setyear_font">{{date}}</view>
				</picker>
				<view class="iconfont icon-down1 "></view>
			</view>
		</view>
		<view class="page-body">
			<view class="tab-body-e">
				<view class="turnover">
					<view class="text">联盟商家</view>
					<view class="price">{{shop_sum}}</view>
				</view>
				<view class="order">
					<view class="text">粉丝数</view>
					<view class="price">{{fans_sum}}</view>
				</view>
				<view class="turnover">
					<view class="text">收益</view>
					<view class="price">{{sum}}</view>
				</view>
			</view>
			<template v-for="(item, index) in list">
				<view class="tab-body-f" :key="index">
					<view class="tab-ct-a">
						<view> 商户：{{item.shopName}}</view>
						<view>会员：{{item.userName}}</view>
					</view>
					<view class="tab-ct-b">
						<view>收入时间：{{item.time}}</view>
						<view class="dec">
							<view>推广收益</view>
							<view class="price">+{{item.nub}}</view>
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
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
				start: "",
				page: 1,
				page_size: 20,
				shop_sum: 0,
				fans_sum: 0,
				sum: 0,
				list: [],
				isLoad: false,
				pageLength: 0
			}
		},
		onLoad() {
			// 获取推广收益头部
			this.getProIncomeIndex();
			// 获取推广收益列表
			this.getProIncomeList();
		},
		// 上拉加载
		onReachBottom() {
			if(!this.isLoad) return;
			if(this.pageLength ==  20) {
				this.isLoad = false;
				this.page = this.page+1;
				this.getProIncomeList();
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
		methods: {
			// 获取推广收益头部
			getProIncomeIndex() {
				let config = {
					start: this.start
				}
				this.$api.getProIncomeIndex(config).then(res => {
					if(res.code == 200) {
						this.shop_sum = res.data.shop_sum;
						this.fans_sum = res.data.fans_sum;
						this.sum = res.data.sum;
					}
				});
			},
			
			// 获取推广收益列表
			getProIncomeList() {
				let config = {
					start: this.start,
					page: this.page,
					page_size: this.page_size
				}
				this.$api.getProIncomeList(config).then(res => {
					if(res.code == 200) {
						this.isLoad = true;
						this.pageLength = res.data.length;
						this.list = this.list.concat(res.data);
					}
				});
			},
			
			// 获取选中的月份
			bindDateChange(e) {
				this.date = e.target.value;
				this.start = e.target.value;
				this.list = [];
				this.page = 1;
				this.getProIncomeIndex();
				this.getProIncomeList();
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
		background-color: #f7f7f7;
	}

	.nav-bar {
		display: flex;
		align-items: flex-end;
		border-bottom: 1rpx solid #e7e7e7;
		font-weight: bold;
		font-size: 34rpx;

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
		padding: 20rpx 20rpx;

		.heard-ct {
			display: flex;
			padding: 0 10rpx;
			height: 50rpx;
			line-height: 50rpx;
			align-items: center;

			.title {
				font-weight: bold;
			}

			.profit-dec {
				font-size: 28rpx;
				color: #c3c3c0;
			}
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
			margin: 0 20rpx;
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

				width: 33%;

				.text {
					font-size: 28rpx;
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
				border-left: 2rpx dotted #999;
				border-right: 2rpx dotted #999;
				padding: 30rpx;
				width: 33%;

				.text {
					font-size: 28rpx;
					font-weight: bold;
				}

				.price {
					font-size: 40rpx;
				}
			}

		}

		.tab-body-f {
			display: flex;
			flex-direction: column;
			background-color: #FFFFFF;
			padding: 20rpx 0;
			margin: 20rpx 0;


			.tab-ct-a {
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				font-weight: bold;
				margin: 5rpx 20rpx;
				
				view {
					max-width: 300rpx;
					white-space:nowrap;
					padding-right: 10rpx;
					overflow:hidden;
					text-overflow:ellipsis;	
				}
			}

			.tab-ct-b {
				display: flex;
				justify-content: space-between;
				font-size: 26rpx;
				color: #c3c3c0;
				margin: 5rpx 20rpx;

				.dec {
					display: flex;

					.price {
						color: #FF6619;
					}
				}

			}
		}
	}
</style>
