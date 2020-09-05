<template>
	<view class="revenusMsgBox">
		<view class="revenusSearchBox">
			<view class="revenusSearchMsg">
				<view class="dateTimeBox">{{date}}</view>
				<view class="revenustatusBox">
					<picker fields="month" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<text class="revenustatusMsg">时间选择</text>
					</picker>
				</view>
			</view>
			<view class="revenusMoenyBox">
				<view class="revenusMoeny">{{sum}}</view>
				<view  class="revenusMoenyTip">累计收益</view>
				<view class="myrevenusMoney" @tap="toPage('/pages/pay/withdrawal?type=4')">提现</view>
			</view>
		</view>
		<view class="revenusTypeBox frist" @tap="toPage('/pages/user/agent/earnings/detail')">
			<view class="oterhMoney">代理收益</view>
			<view class="moreshow">{{sum}}</view>
		</view>
		
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
			<view class="btn-item" @tap="redirectPage('/pages/user/agent/team/index')">
				<view class="btn-icon">
					<image src="/static/icon_tab_team_d.png"></image>
					<text>团队</text>
				</view>
			</view>
			<view class="btn-item active">
				<view class="btn-icon">
					<image src="/static/icon_tab_earning_a.png"></image>
					<text>收益</text>
				</view>
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
				date: currentDate,
				start: "",
				sum: 0,
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
		onShow() {
			// 代理中心-获取代理收益
			this.getAgentProfit();
		},
		methods: {
			
			// 代理中心-获取代理收益
			getAgentProfit() {
				let config = {
					start: this.start,
				}
				this.$api.getAgentProfit(config).then(res => {
					if(res.code == 200) {
						this.sum = res.data.sum;
					}
				})
			},
			
			bindDateChange(e) {
				console.log(e);
				this.date = e.target.value;
				this.start = e.target.value;
				this.getAgentProfit();
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
			},
			
			// 返回首页
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			},
			redirectPage(page) {
				uni.redirectTo({
					url: page
				})
			},
		}
	}
</script>

<style lang="scss">
	.revenusMsgBox{display: flex; flex-direction: column;background-color: #FFFFFF; color: #333;height: 100%;
		.revenusSearchBox{background: #4BA664; padding:30rpx;
			.revenusSearchMsg{display: flex; justify-content: space-between; align-items: center; align-content: center;}
			.dateTimeBox{width: 60%; color:#FFFFFF;}
			.revenustatusBox{flex: 1;text-align: right;
				.revenustatusMsg{text-align:left;display: inline-block; width: 140rpx; padding: 10rpx 20rpx; background: #52B46C url(../../../../static/merchant/more.png) no-repeat; background-position: 140rpx center; color:#f3f3f3; border-radius:10rpx; background-size: 18rpx;}
			}
		}
		.revenusMoenyBox{text-align: center; color:#fff;
			.revenusMoeny{font-size: 52rpx; padding: 40rpx 0 15rpx 0;}
			.revenusMoenyTip{font-size: 26rpx; color:#e4e4e4;}
			.myrevenusMoney{background: #52B46C url(../../../../static/merchant/icon_money.png) 80rpx 20rpx no-repeat; background-size: 32rpx; display: inline-block; text-align:left; padding: 15rpx 0 15rpx 120rpx; width: 260rpx; margin: 30rpx 0; border-radius:10rpx;}
		}
		.revenusTypeBox{margin: 15rpx 30rpx; background: #F4F4F4; padding:0rpx 30rpx; display: flex; justify-content: space-between; align-items: center; align-content: center; height:80rpx;
			.oterhMoney{background: url(../../../../static/icon_small_earning.png) left center no-repeat; background-size: 45rpx; height: 80rpx; line-height: 80rpx; padding-left: 55rpx;}
			.adMoney{background: url(../../../../static/merchant/icon_money2.png) left center no-repeat; background-size: 45rpx; height: 80rpx; line-height: 80rpx; padding-left: 55rpx;}
			.moreshow{background: url(../../../../static/icon_arrow.png) right center no-repeat; background-size: 25rpx; padding-right: 40rpx;}
		}
		.revenusTypeBox.frist{margin-top: 40rpx;}
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
