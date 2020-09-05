<template>
	<view>
		<view class="payo_box" @tap="toAddress" v-if="Object.keys(addressData).length > 0">
			<image class="payo_addr" src="/static/address.png"></image>
			<view class="payo_text">
				<view class="payo_t payo_black">收货人：{{addressData.provinceName}}{{addressData.cityName}}{{addressData.areaName}}{{addressData.userAddress}}</view>
				<view class="payo_t">{{addressData.userName}}：{{addressData.userPhone}}</view>
			</view>
			<image class="payo_arrow" src="/static/arrow.png"></image>
		</view>
		<view class="address-wrap" v-else>
			<view class="no_addr" @tap="toAddress">
				<view class="txt">添加收货地址</view>
			</view>
		</view>
		<template v-for="(item, index) in carts">
			<view class="cart_box" :key="index">
				<view class="cart_top">
					<image class="cart_shop_icon" src="/static/detail_shop.png"></image>
					<text class="cart_shop_tit">{{item.shopName}}</text>
				</view>
				<template v-for="(citem, cindex) in item.list">
					<view class="pay_list">
						<image class="payo_list_img" :src="citem.goodsImg"></image>
						<view class="payo_info">
							<view class="payo_pro_tit">{{citem.goodsName}}</view>
							<view class="payo_y payo_set">￥{{citem.shopPrice}}</view>
						</view>
					</view>
				</template>
				<view class="payo_all">共{{item.list.length}}件商品 总计：<text>￥{{item.goodsMoney}}</text>（含运费：￥{{item.promotionMoney}}）</view>
			</view>
		</template>
		<!--底部-->
		<view class="cart_foot">
			<view class="cart_comb">
				<view class="cart_w">
					<view class="cart_all">共{{goodsTotalNum}}件商品</view>
					<view class="cart_hj"><text>合计：</text>￥{{goodsTotalMoney}}</view>
				</view>
				<view class="cart_cal" @tap="enterOrder">立即支付</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carts: {},
				goodsTotalNum: "",
				goodsTotalMoney: "",
				addressData: {}
			}
		},
		onLoad() {
			this.confirmOrder();
		},
		onShow() {
			if(uni.getStorageSync("addressData")) {
				this.addressData = JSON.parse(uni.getStorageSync("addressData"));
				uni.removeStorageSync("addressData");
			}else {
				this.getUserAddressList();
			}
		},
		methods: {
			confirmOrder() {
				this.$api.confirmOrder({}).then(res => {
					if(res.code == 200) {
						this.carts = res.data.carts;
						this.goodsTotalNum = res.data.goodsTotalNum;
						this.goodsTotalMoney = res.data.goodsTotalMoney;
					}
				});
			},
			getUserAddressList() {
				this.$api.getUserAddressList().then(res => {
					if(res.code == 200) {
						if(res.data) {
							if(res.data.length == 0) {
								this.addressData = {};
							}else if(res.data.length == 1){
								this.addressData = res.data[0];
							}else {
								let data = res.data;
								for(let i = 0; i<data.length; i++) {
									if(data[i].isDefault == 1) {
										this.addressData = data[i];
									}
								}
							}
						}
					}
				});
			},
			enterOrder() {
				let config = {
					deliverType: 0,
					payType: 1,
					s_addressId: this.addressData.addressId
				}
				this.$api.orderSubmit(config).then(res => {
					if(res.code == 200) {
						uni.navigateTo({
							url: "/pages/pay/pay?orderunique=" + res.data.orderunique + "&totalMoney=" + res.data.totalMoney
						})
					}
				});
			},
			
			toAddress() {
				uni.navigateTo({
					url: "/pages/user/setting/address?type=1"
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		font-size: 28rpx;
		background: #f7f7f7;
	}

	.payo_tab {
		padding-bottom: 12rpx;
		width: 50%;
		line-height: 40rpx;
		text-align: center;
		border-bottom: 3rpx solid #999999;
		font-size: 33rpx;
		color: #666666;
	}

	.payo_active {
		border-bottom: 3rpx solid #F5D737;
		font-weight: bold;
		color: #333333;
	}
	
	.address-wrap {
		margin-top: 30rpx;
		width: 750rpx;
		background: #fff;
		.no_addr {
			height: 158rpx;
			font-size: 30rpx;
			font-weight: 500;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
		
			.txt {
				display: inline-block;
				position: relative;
		
				&::before {
					content: "";
					position: absolute;
					top: 50%;
					left: -60rpx;
					transform: translateY(-50%);
					width: 40rpx;
					height: 40rpx;
					background-image: url(/static/ic_address_d.png);
					background-size: cover;
					background-repeat: no-repeat;
				}
			}
		
			&::after {
				content: "";
				position: absolute;
				right: 30rpx;
				top: 50%;
				transform: translateY(-50%);
				width: 14rpx;
				height: 22rpx;
				background-image: url(/static/ic_add_more.png);
				background-size: cover;
				background-repeat: no-repeat;
			}
		}
	}

	/*快递配送*/
	.payo_box {
		padding: 20rpx 30rpx;
		margin-top: 30rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		
	}

	.payo_text {
		margin: 0rpx 13rpx;
		flex: 1;
	}

	.payo_t {
		font-size: 28rpx;
		color: #666666;
	}

	.payo_black {
		margin-bottom: 12rpx;
	}

	.payo_addr {
		width: 44rpx;
		height: 44rpx;
		flex-shrink: 0;
	}

	.payo_arrow {
		width: 35rpx;
		height: 35rpx;
		flex-shrink: 0;
	} 

	/*到店自提*/
	.payo_box2 {
		padding: 20rpx 18rpx 20rpx 7rpx;
		margin-top: 21rpx;
		margin-left: 29rpx;
		width: 692rpx;
		background: #FFFFFF;
		border-radius: 5px;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, .18);
	}

	.payo_box_zt {
		padding: 0rpx 25rpx 0rpx 44rpx;
		display: flex;
		justify-content: space-between;
	}

	.payo_zt_a {
		margin-right: 12rpx;
		width: 430rpx;
		font-size: 28rpx;
		font-weight: bold;
		flex-shrink: 0;
	}

	.payo_zt_w {
		display: flex;
		flex-shrink: 0;
	}

	.payo_zt_w image {
		opacity: .5;
		width: 44rpx;
		height: 44rpx;
	}

	.payo_zt_w text {
		font-size: 28rpx;
		color: #999999;
	}

	.payo_box_s {
		margin-top: 20rpx;
		width: 50%;
	}

	.payo_zt_t {
		font-size: 28rpx;
		color: #666666;
	}

	.payo_zt_time {
		margin-top: 5rpx;
		font-size: 28rpx;
		color: #ED6C18;
	}

	.payo_zt_edi {
		display: flex;
	}

	.payo_zt_edi input {
		margin-top: 5rpx;
		width: 146rpx;
		font-size: 22rpx;
	}

	.payo_zt_edi image {
		margin-left: 15rpx;
		width: 30rpx;
		height: 30rpx;
	}

	/*店铺产品信息*/
	.cart_box {
		margin-top: 28rpx;
		background: #FFFFFF;
	}

	.cart_top {
		padding-top: 22rpx;
		padding-bottom: 18rpx;
		width: 100%;
		border-bottom: 1rpx solid #F7F7F7;
		display: flex;
		align-items: center;
	}

	.cart_shop_icon {
		margin: 0rpx 14rpx 0rpx 28rpx;
		width: 44rpx;
		height: 44rpx;
	}

	.cart_shop_tit {
		margin-right: 6rpx;
		font-size: 28rpx;
	}

	.pay_list {
		padding: 26rpx 0rpx 0rpx 0rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.payo_list_img {
		margin-left: 46rpx;
		width: 120rpx;
		height: 120rpx;
		flex-shrink: 0;
	}

	.payo_info {
		width: 530rpx;
		margin-left: 27rpx;
		margin-right: 35rpx;
	}

	.payo_pro_tit {
		line-height: 40rpx;
		font-size: 28rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.payo_pro_tit {
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
	}
	
	.payo_pro_tit text:last-child {
		color: #ff0000;
	}
	.payo_set {
		margin-bottom: 28rpx;
		text-align: right;
	}

	.payo_y {
		font-size: 26rpx;
		color: #BBBBBB;
	}

	.payo_all {
		padding: 20rpx 4rpx 25rpx 0rpx;
		text-align: right;
		font-size: 28rpx;
	}

	.payo_all text {
		color: #FF0000;
	}

	.payo_message {
		display: flex;
		justify-content: space-between;
	}

	.payo_tit {
		margin-top: 18rpx;
		margin-left: 34rpx;
		font-size: 28rpx;
		flex-shrink: 0;
	}

	.payo_message textarea {
		margin: 23rpx 10rpx 22rpx 30rpx;
		margin-right: 10rpx;
		margin-left: 30rpx;
		height: 30rpx;
		line-height: 30rpx;
		font-size: 26rpx;
	}

	.payo_subt {
		padding-bottom: 18rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx dotted #333333;
	}

	.sub_set {
		margin-top: 18rpx;
		line-height: 40rpx;
		margin-right: 42rpx;
	}

	.mar_bottom {
		margin-bottom: 120rpx;
	}

	/*底部*/
	.cart_foot {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 98rpx;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.mleft {
		margin-left: 47rpx;
	}

	.cart_all {
		margin-left: 10rpx;
		font-size: 28rpx;
		color: #333333;
	}

	.cart_comb {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.cart_w {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.cart_hj {
		margin-left: 10rpx;
		font-size: 28rpx;
		color: #FF0000;
	}

	.cart_hj text {
		color: #333333;
	}

	.cart_note {
		font-size: 24rpx;
		color: #999999;
	}

	.cart_cal {
		margin: 0 30rpx;
		width: 160rpx;
		height: 64rpx;
		line-height: 64rpx;
		text-align: center;
		font-size: 28rpx;
		color: #FFFFFF;
		background: #FF6619;
		border-radius: 32rpx;
	}
</style>
