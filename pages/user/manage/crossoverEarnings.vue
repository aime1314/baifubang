<template>
	<view class="crossoverMsgBox">
		<view class="searchBarBox">
			<view>收益统计</view>
			<picker fields="month" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="datasearch">{{date}}
					<view class="iconfont icon-down1 ">
					</view>
				</view>
			</picker>
			 
		</view>
		<view class="fan">
			<!-- 注:具体到某个推广员时,此处不显示代理中心选择 -->
			<view class="fan_Info">
				<view class="fan_style">
					<view class="fan_text">当月粉丝数</view>
					<view class="fan_num">{{fans_sum}}</view>
				</view>
				<view class="fan_style order">
					<view class="fan_text">当月收益</view>
					<view class="fan_num">{{today_sum}}</view>
				</view>
				<view class="fan_style">
					<view class="fan_text">累计收益</view>
					<view class="fan_num">{{sum}}</view>
				</view>
			</view>
		</view>
		
		<template v-for="(item, index) in list">
			<view class="searchMsgListshow" :key="index">
				<view class="bussinessBox">
					<view class="bussinessName">商户：{{item.shopName}}</view>
					<view class="bussinessTime">收入时间：{{item.createTime}}</view>
				</view>
				<view class="memberBox">
					<view class="memberName">消费会员：{{item.userName}}</view>
					<view class="memberMoney">收益：<text>+{{item.money}}</text></view>
				</view>
			</view>
		</template>
		
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
				fans_sum: 0,
				today_sum: 0,
				sum: 0,
				list: [],
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
			// 获取跨界收益头部
			this.getTrProfitIndex();
			// 获取跨界收益列表
			this.getTrProfitList();
		},
		// 上拉加载
		onReachBottom() {
			if(!this.isLoad) return;
			if(this.pageLength ==  20) {
				this.isLoad = false;
				this.page = this.page+1;
				this.getTrProfitList();
			}
		},
		methods: {
			
			// 获取跨界收益列表
			getTrProfitList() {
				let config = {
					start: this.start,
					page: this.page,
					page_size: this.page_size
				}
				this.$api.getTrProfitList(config).then(res => {
					if(res.code == 200) {
						this.isLoad = true;
						this.pageLength = res.data.length;
						this.list = this.list.concat(res.data);
					}
				});
			},
			
			// 获取跨界收益头部
			getTrProfitIndex() {
				let config = {
					start: this.start
				}
				this.$api.getTrProfitIndex(config).then(res => {
					if(res.code == 200) {
						this.fans_sum = res.data.fans_sum;
						this.today_sum = res.data.today_sum;
						this.sum = res.data.sum;
					}
				});
			},
			
			// 获取选中的月份
			bindDateChange(e) {
				this.date = e.target.value;
				this.start = e.target.value;
				this.list = [];
				this.page = 1;
				this.getTrProfitList();
				this.getTrProfitIndex();
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
		}
	}
</script>

<style lang="scss">
	.crossoverMsgBox{display: flex; flex-direction: column;	background-color: #F4F4F4; color: #333;height: 100%;
		.searchBarBox,.searchMsgTypeshow{display: flex; padding: 0 30rpx; justify-content: space-between; align-items: center; align-content: center;}
		.datasearch{display: flex; align-items: center;
			.icon-down1 {color: #333;}
		}
		.searchMsgTypeshow{padding-bottom:30rpx;}
		.searchBarBox{font-size: 28rpx; padding: 30rpx;}
		.searchMsg{flex: 1; margin: 0 15rpx; line-height: 42rpx; text-align: center; background: #ff6600; color: #FFFFFF; padding: 15rpx 0; border-radius: 10rpx;}
		.searchMsg:first-child{margin-left: 0;}
		.searchMsg:last-child{margin-right: 0;}
		.searchMsgListshow{background: #FFFFFF; padding:30rpx;display: flex; justify-content: space-between; align-items: center; align-content: center; margin: 15rpx 0; border-radius:10rpx;
			.bussinessBox{width: 65%;
				.bussinessName{color: #333333; padding-bottom: 15rpx;  white-space: nowrap;}
				.bussinessTime{color: #999999; font-size: 24rpx;}
			}
			.memberBox{flex: 1;
				.memberName{padding-bottom: 15rpx;}
				.memberMoney{white-space: nowrap;text{color: #ff6600;}}
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
			margin: 0rpx 20rpx 10px;
		
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
	}
</style>
