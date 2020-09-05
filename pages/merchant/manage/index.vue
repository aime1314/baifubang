<template>
	<view class="merchantHome">
		<view class="merchantMsgBox">
			<view class="photoBox">
				<image :src="shopImg"></image>
				<view class="shopName">
					{{shopName}}
					<text>查看店铺详情</text>
				</view>
			</view>
			<view class="shopstatusBox">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="shopstatusMsg">{{array[index]}}</view>
				</picker>
			</view>
		</view>
		
		<view class="shopMoneyBox">
			<view class="shopTitleBox">
				<view class="">店铺营收</view>
				<view class="moreshow" @tap="toPage('/pages/merchant/manage/revenue/revenue')">查看更多</view>
			</view>
			<view class="showMoneyMsgList">
				<view class="showMoneyMsgTpye">
					<text class="typeName">今日营业额</text>
					<text class="todayMoney">{{toturnover}}</text>
					<text class="oldMoney">昨日：{{yesturnover}}</text>
				</view>
				<view  class="showMoneyMsgTpye">
					<text class="typeName">线上订单</text>
					<text class="todayMoney">{{toonline}}</text>
					<text class="oldMoney">昨日：{{yesonline}}</text>
				</view>
				<view class="showMoneyMsgTpye">
					<text class="typeName">线下订单</text>
					<text class="todayMoney">{{tooffline}}</text>
					<text class="oldMoney">昨日：{{yesoffline}}</text>
				</view>
			</view>
		</view>
		<view class="shopMoneyBox lasterBox">
			<view class="shoptypeBox">
				<view @tap="toPage('/pages/merchant/manage/shopManage/shopList?shopImg=' + shopImg +  '&shopName=' + shopName + '&type=' + type)">店铺管理</view>
				<view @tap="redirectPage('/pages/merchant/manage/goodsManage/index')">商品管理</view>
				<view @tap="toPage('/pages/merchant/manage/goodsManage/createGoods?type=1')">添加商品</view>
				<view @tap="toPage('/pages/user/manage/unionMerchants')">联盟商户</view>
				<view @tap="toPage('/pages/user/manage/fanDetails')">我的粉丝</view>
				<view @tap="toPage('/pages/merchant/manage/orderManage/orderList')">订单管理</view>
				<view @tap="toPage('/pages/merchant/takeout/index')">外卖中心</view>
			</view>
		</view>
		<view class="footer_box">
			<view class="btn-item" @tap="toIndex">
				<view class="btn-icon">
					<image src="/static/icon_manage_index_d.png"></image>
					<text>首页</text>
				</view>
			</view>
			<view class="btn-item active">
				<view class="btn-icon">
					<image src="/static/icon_manage_shop_a.png"></image>
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
			<view class="btn-item" @tap="redirectPage('/pages/merchant/manage/earnings/earnings')">
				<view class="btn-icon">
					<image src="/static/icon_manage_earnings_d.png"></image>
					<text>收益</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: ['休息中','营业中'],
				index: 1,
				data:"",
				toturnover: 0,	// 今日营业额
				yesturnover: 0,	// 昨日营业额
				toonline: 0,	// 今日线上订单
				yesonline: 0,	// 昨日线上订单
				tooffline: 0,	// 今日线下订单
				yesoffline: 0,	// 昨日线下订单
				type: 1,	// 1 未开启外卖服务 2 已开启外卖服务
				shopName: "",
				shopImg: ""
			}
		},
		onLoad() {
		},
		onShow() {
			// 获取店铺营业额，订单量
			this.getShopTurnover();
			uni.removeStorageSync("goods");
		},
		methods: {
			// 获取店铺营业额，订单量
			getShopTurnover() {
				this.$api.getShopTurnover().then(res => {
					if(res.code == 200) {
						this.toturnover = res.data.toturnover;
						this.yesturnover = res.data.yesturnover;
						this.toonline = res.data.toonline;
						this.yesonline = res.data.yesonline;
						this.tooffline = res.data.tooffline;
						this.yesoffline = res.data.yesoffline;
						this.index = res.data.shopAtive;
						this.shopName = res.data.shopName;
						this.shopImg = res.data.shopImg;
						this.type = res.data.type;
					}
				});
			},
			bindPickerChange(e) {
				this.index = e.target.value;
				this.editShopAtive();
			},
			
			editShopAtive() {
				let config = {
					shopAtive: this.index
				}
				this.$api.editShopAtive(config).then(res => {
					if(res.code == 200) {
						
					}
				});
			},
			
			toPage(page) {
				uni.navigateTo({
					url: page
				})
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
			
			redirectPage(page) {
				uni.redirectTo({
					url: page
				})
			},
			
			// 返回首页
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
		}
	}
</script>

<style lang="scss">
	.merchantHome{display: flex; flex-direction: column;background-color: #F4F4F4; color: #333;height: 100%;
		.merchantMsgBox{background: #1C7CE9;display: flex; justify-content: space-between; align-items: center; align-content: center; padding: 20rpx 30px 30rpx 30rpx;
			.photoBox{width: 70%; display: flex; align-items: center; align-content: center;
				image{display: inline-block; width: 128rpx; height:128rpx;}
				.shopName{padding-left: 20rpx; color:#fff;
					text{display:block; padding-top: 5rpx;}
				}
			}
			.shopstatusBox{flex: 1;text-align: right;
				.shopstatusMsg{text-align:left;display: inline-block; width: 155rpx; padding: 10rpx 20rpx; background: #2799F1 url(../../../static/merchant/more.png) no-repeat; background-position: 115rpx center; color:#f3f3f3; border-radius:10rpx; background-size: 18rpx;}
			}
		}
		.shopMoneyBox{ background: #fff; margin:20rpx; border-radius:10rpx;
			.shopTitleBox{padding: 24rpx 30rpx; font-size:32rpx; border-bottom:solid 1rpx #e5e5e5;display: flex; justify-content: space-between; align-items: center; align-content: center;
				.moreshow{font-size: 28rpx; color: #999; background:  url(../../../static/icon_arrow.png) right center no-repeat; background-size: 24rpx; padding-right: 20rpx;}
			}
			.showMoneyMsgList{display: flex; justify-content: space-between; align-items: center; align-content: center; text-align: center; margin: 40rpx 0;
				.showMoneyMsgTpye{flex: 1;}
				.showMoneyMsgTpye:nth-of-type(2){border-left: solid 1rpx #d7d7d7;border-right: solid 1rpx #d7d7d7;}
				.typeName{font-size: 30rpx;}
				.todayMoney{display: block; padding: 10rpx 0;}
				.oldMoney{font-size: 26rpx; color:#999;}
			}
			.shoptypeBox{display: flex; justify-content: flex-start; align-items: center; align-content: center; text-align: center; padding:30rpx 0; font-size:28rpx;flex-wrap: wrap;
				view{width: 25%; text-align:center; padding-top: 75rpx;}
				view:nth-of-type(1){background: url(../../../static/merchant/icon_1.png) top center no-repeat; background-size: 64rpx 64rpx;}
				view:nth-of-type(2){background: url(../../../static/merchant/icon_2.png) top center no-repeat; background-size: 64rpx 64rpx;}
				view:nth-of-type(3){background: url(../../../static/merchant/icon_2.png) top center no-repeat; background-size: 64rpx 64rpx;}
				view:nth-of-type(4){background: url(../../../static/merchant/icon_3.png) top center no-repeat; background-size: 64rpx 64rpx;}
				view:nth-of-type(5){background: url(../../../static/merchant/icon_4.png) top center no-repeat; background-size: 64rpx 64rpx; margin-top: 30rpx;}
				view:nth-of-type(6){background: url(../../../static/merchant/icon_5.png) top center no-repeat; background-size: 64rpx 64rpx; margin-top: 30rpx;}
				view:nth-of-type(7){background: url(../../../static/merchant/icon_6.png) top center no-repeat; background-size: 64rpx 64rpx; margin-top: 30rpx;}
				view:nth-of-type(8){background: url(../../../static/icon_takeout.png) top center no-repeat; background-size: 64rpx 64rpx; margin-top: 30rpx;}
				
			}
		}
		.shopMoneyBox.lasterBox{margin-top: 0;}
		.popupMsgBox{background: #FFFFFF;
			.popupTitleBox{text-align: center; padding: 20rpx 0; border-bottom:solid 1rpx #d7d7d7;}
			.popupMsg{text-align:center;text{display: inline-block; padding: 10px 100rpx; border:solid 1rpx #d7d7d7; margin:60rpx 30rpx;}
				text.curron{background: #007AFF; color:#FFFFFF; border:solid 1prx #007AFF}
			}
		}
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
