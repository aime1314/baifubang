<template>
	<view class="revenueDetailMsgBox">
		<view class="revenueSearchBox">
			<view>
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view>{{array[index]}}</view>
				</picker>
			</view>
			<image src="/static/merchant/icon_down.png" ></image>
		</view>
		<view class="setyear">
			<picker fields="month" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="setyear_font">{{date}}</view>
			</picker>
			<image src="../../../../static/icon_xl.png" ></image>
		</view>
		<view class="money-m">
			<view><text>支出</text><text style="color: #999; margin-left: 10rpx;">¥{{z_sum}}</text></view><view><text>收入<text  style="color:#999; margin-left: 10rpx;">¥{{s_sum}}</text></text></view>
		</view>
		<view class="moneyListBox">
			<template v-for="(item, index) in list">
				<view class="moneyListMsg" :key="index">
					<view class="moneyLeft">
						<view><image :src="item.userPhoto"></image></view>
						<view><text>{{item.userName}}</text><text class="moneytype_NO1">{{item.dataSrc == 2 && "线上消费" || item.dataSrc == 3 && "提现" || item.dataSrc == 6 && "线下消费"}}</text><text class="moneyTime">{{item.createTime}}</text></view>
					</view>
					<template v-if="item.money.charAt(0) == '+'">
						<view class="moneyRight add">{{item.money}}</view>
					</template>
					<template v-if="item.money.charAt(0) == '-'">
						<view class="moneyRight run">{{item.money}}</view>
					</template>
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
				title: 'picker',
				date: currentDate,
				array: ['全部交易类型', '线上消费', '线下消费', '余额提现'],
				index: 0,
				data:"",
				type: "",
				start: "",
				page: 1,
				page_size: 20,
				list: [],
				s_sum: 0,
				z_sum: 0,
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
			// 商家收支明细
			this.getShopsIncomeOrder();
		},
		methods: {
			// 商家收支明细
			getShopsIncomeOrder() {
				let config = {
					type: this.type,
					start: this.start,
					page: this.page,
					page_size: this.page_size
				}
				this.$api.getShopsIncomeOrder(config).then(res => {
					if(res.code == 200) {
						this.s_sum = res.data.s_sum;
						this.z_sum = res.data.z_sum;
						this.list = this.list.concat(res.data.list);
					}
				});
			},
			bindPickerChange(e) {
				this.index = e.target.value;
				if(this.index == 0) {
					this.type = "";
				}
				if(this.index == 1) {
					this.type = 2;
				}
				if(this.index == 2) {
					this.type = 6;
				}
				if(this.index == 3) {
					this.type = 3;
				}
				this.page = 1;
				this.list = [];
				this.getShopsIncomeOrder();
			},
			bindDateChange(e) {
				this.date = e.target.value;
				this.start = e.target.value;
				this.page = 1;
				this.list = [];
				this.getShopsIncomeOrder();
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
	.revenueDetailMsgBox{display: flex; flex-direction: column;background-color: #F4F4F4; color: #333;height: 100%;
		.revenueSearchBox {margin-top: 30rpx;font-size: 32rpx;display: flex;align-items: center;justify-content: center;
			image {padding-left: 16rpx;width: 30rpx;height: 20rpx;}
		}
		.setyear {margin: 30rpx 0 0 30rpx;display: flex;justify-content: flex-start;align-items: center;
			.setyear_font {font-size: 32rpx;}
			image {	padding-left: 16rpx;width: 30rpx;height: 30rpx;}
		}
		.money-m {margin: 20rpx 0 0 30rpx;font-size: 30rpx;color: #999;
			view{display: inline-block; margin-right: 30rpx;
				text{color: #999;}
			}
		}
		.moneyListBox{background: #FFFFFF; padding:0 0 0rpx 30rpx; margin-top: 50rpx;
			.moneyListMsg{border-bottom: solid 1rpx #d7d7d7;display: flex;justify-content:space-between;align-items: center; padding-bottom:30rpx; padding-top:30rpx; padding-right: 30rpx;
				.moneyLeft{display: flex;justify-content:flex-start;align-items: center;
					image{width: 130rpx; height:130rpx; display: block; margin-right: 20rpx;}
					view{text{display: block; line-height: 42rpx;}
						.moneytype_NO1{color:#1C7CE9;}
						.moneytype_NO2{color:#333;}
						.moneyTime{color: #999;}
					}
				}
				.moneyLeft:last-child{ padding-bttom:0;}
				.add{color:#1C7CE9;}
				.run{color: #999;}
			}
			.moneyListMsg:last-child{border-bottom: 0; padding-bttom:0;}
		}
	}
</style>
