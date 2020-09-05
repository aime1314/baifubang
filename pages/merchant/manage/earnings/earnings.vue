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
				<view class="revenusMoeny">{{y_sum}}</view>
				<view  class="revenusMoenyTip">累计收益</view>
				<view class="myrevenusMoney" @tap="toPage('/pages/pay/withdrawal?type=3')">提现</view>
			</view>
		</view>
		<view class="revenusTypeBox frist" @tap="toPage('/pages/user/manage/crossoverEarnings')">
			<view class="oterhMoney">跨界收益</view>
			<view class="moreshow">{{k_sum}}</view>
		</view>
		<view class="revenusTypeBox" @tap="toPage('/pages/user/manage/promotersEarnings')">
			<view class="adMoney">推广收益</view>
			<view class="moreshow">{{t_sum}}</view>
		</view>
		
		<view class="footer_box">
			<view class="btn-item" @tap="toIndex">
				<view class="btn-icon">
					<image src="/static/icon_manage_index_d.png"></image>
					<text>首页</text>
				</view>
			</view>
			<view class="btn-item" @tap="redirectPage('/pages/merchant/manage/index')">
				<view class="btn-icon">
					<image src="/static/icon_manage_shop_d.png"></image>
					<text>店铺</text>
				</view>
			</view>
			<view class="btn-item add-action" @tap="toCreateVideo">
				<view class="add-icon">
					<image src="/static/icon_add_action.png"></image>
				</view>
			</view>
			<view class="btn-item" @tap="redirectPage('/pages/merchant/manage/goodsManage/index')">
				<view class="btn-icon">
					<image src="/static/icon_manage_goods_d.png"></image>
					<text>商品</text>
				</view>
			</view>
			<view class="btn-item active">
				<view class="btn-icon">
					<image src="/static/icon_manage_earnings_a.png"></image>
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
				page: 1,
				page_size: 20,
				y_sum: 0,	// 营业流水
				k_sum: 0,	// 跨界收益
				t_sum: 0,	// 推广收益
				type: 1,	// 1 未开启外卖服务 2 已开启外卖服务
				shopName: "",
				shopImg: ""
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
			
		},
		onShow() {
			// 商户钱包 数据
			this.getShopsWallet();
			
			// 获取店铺营业额，订单量
			this.getShopTurnover();
		},
		methods: {
			
			// 获取店铺营业额，订单量
			getShopTurnover() {
				this.$api.getShopTurnover().then(res => {
					if(res.code == 200) {
						this.shopName = res.data.shopName;
						this.shopImg = res.data.shopImg;
						this.type = res.data.type;
					}
				});
			},
			
			toCreateVideo() {
				if(this.type == 1) {
					uni.showToast({
						title: "请前往开启外卖服务",
						icon: "none"
					})
					setTimeout(()=> {
						uni.navigateTo({
							url: '/pages/merchant/manage/shopManage/shopList?shopImg=' + this.shopImg +  '&shopName=' + this.shopName + '&type=' + this.type
						})
					}, 1500);
				}else {
					uni.navigateTo({
						url: "/pages/merchant/takeout/goodsManage/createVideo"
					})
				}
			},
			
			// 商户钱包 数据
			getShopsWallet() {
				let config = {
					start: this.start,
					page: this.page,
					page_size: this.page_size
				}
				this.$api.getShopsWallet(config).then(res => {
					if(res.code == 200) {
						this.y_sum = res.data.y_sum;
						this.k_sum = res.data.k_sum;
						this.t_sum = res.data.t_sum;
					}
				})
			},
			
			bindDateChange(e) {
				console.log(e);
				this.date = e.target.value;
				this.start = e.target.value;
				this.getShopsWallet();
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
		.revenusSearchBox{background: #1C7CE9; padding:30rpx;
			.revenusSearchMsg{display: flex; justify-content: space-between; align-items: center; align-content: center;}
			.dateTimeBox{width: 60%; color:#FFFFFF;}
			.revenustatusBox{flex: 1;text-align: right;
				.revenustatusMsg{text-align:left;display: inline-block; width: 140rpx; padding: 10rpx 20rpx; background: #2799F1 url(../../../../static/merchant/more.png) no-repeat; background-position: 140rpx center; color:#f3f3f3; border-radius:10rpx; background-size: 18rpx;}
			}
		}
		.revenusMoenyBox{text-align: center; color:#fff;
			.revenusMoeny{font-size: 52rpx; padding: 40rpx 0 15rpx 0;}
			.revenusMoenyTip{font-size: 26rpx; color:#e4e4e4;}
			.myrevenusMoney{background: #27A8F1 url(../../../../static/merchant/icon_money.png) 80rpx 20rpx no-repeat; background-size: 32rpx; display: inline-block; text-align:left; padding: 15rpx 0 15rpx 120rpx; width: 260rpx; margin: 30rpx 0; border-radius:10rpx;}
		}
		.revenusTypeBox{margin: 15rpx 30rpx; background: #F4F4F4; padding:0rpx 30rpx; display: flex; justify-content: space-between; align-items: center; align-content: center; height:80rpx;
			.oterhMoney{background: url(../../../../static/merchant/icon_money1.png) left center no-repeat; background-size: 45rpx; height: 80rpx; line-height: 80rpx; padding-left: 55rpx;}
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
				color: #1C7CE9;
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
