<template>
	<view>
		<view class="orderdetail_box_state">
			<view>
				<view class="orderdetail_state">{{type}}</view>
				<view class="detail_time">{{text}}</view>
			</view>
			<image class="detail_state_icon" src="/static/radio.png"></image>
		</view>
		<view class="order_box addr" v-if="orderDetail">
			<image class="addr_icon" src="/static/location.png"></image>
			<view class="addr_info">
				<view class="addr_name">{{orderDetail.userName}} <text>{{orderDetail.userPhone}}</text></view>
				<view class="adde_t">{{orderDetail.userAddress}}</view>
			</view>
		</view>
		<view class="order_box">
			<view class="orderlist_box_top">
				<view class="orderlist_shop">
					<image src="/static/shop_icon.png"></image>
					<text>{{orderDetail.shopName}}</text>
				</view>
			</view>
			<template v-for="(item, index) in orderDetail.goods">
				<view class="orderlist_con" :key="index">
					<image class="orderlist_pro" :src="item.goodsImg"></image>
					<view class="orderlist_info">
						<view class="orderlist_one">
							<view class="orderlist_g">{{item.goodsName}}</view>
							<view class="orderlist_box_num">
								<text class="orderlist_y">￥{{item.goodsPrice}}</text>
								<text class="orderlist_n">X{{item.goodsNum}}</text>
							</view>
						</view>
					</view>
				</view>
			</template>
			
			<view class="detail_ifo">
				<text>商品小计</text>
				<text>¥ {{orderDetail.goodsMoney}}</text>
			</view>
			<view class="detail_ifo" style="padding-bottom: 25rpx; border-bottom: 1rpx solid #f5f5f5;">
				<text>实付金额合计</text>
				<text class="detail_org">¥ {{orderDetail.goodsMoney}}</text>
			</view>
		</view>
		<view class="order_box detail_bottom">
			<view class="detail_top">订单信息</view>
			<view class="detail_ifo2">
				<text>订单号</text>
				<view>
					<text>{{orderDetail.orderId}}</text>
					<text class="detail_org" @tap="copyOrderId(orderDetail.orderId)">复制</text>
				</view>
			</view>
			<view class="detail_ifo2">
				<text>支付方式</text>
				<text>{{payType}}</text>
			</view>
			<view class="detail_ifo2">
				<text>下单时间</text>
				<text>{{orderDetail.createTime}}</text>
			</view>
			<template v-if="orderStatus == 0 || orderStatus == 1 || orderStatus ==2">
				<view class="detail_ifo2">
					<text>支付时间</text>
					<text>{{orderDetail.payTime}}</text>
				</view>
			</template>
			<template v-if="orderStatus == 1 || orderStatus ==2">
				<view class="detail_ifo2">
					<text>配送方式</text>
					<text>{{orderDetail.expressName}}</text>
				</view>
			</template>
		</view>
		<view class="btn_big">
			<!-- 待付款 -2 -->
			<view class="btn" v-if="orderStatus == -2">
				<picker class='cell-picker' mode="selector" @change="selectCause" value="0" :range="cause" range-key="dataName">
					<view>取消订单</view>
				</picker>
			</view>
			<view class="btn btn_it"  @tap="enterOrder" v-if="orderStatus == -2">立即付款</view>
			<!-- 待发货 0 -->
			<view class="btn" v-if="orderStatus == 0">
				<picker class='cell-picker' mode="selector" @change="selectCause" value="0" :range="cause" range-key="dataName">
					<view>取消订单</view>
				</picker>
			</view>
			<!-- 待收货 1 -->
			<view class="btn btn_it" @tap="takeOrder" v-if="orderStatus == 1">确认收货</view>
			<!-- 已完成 2 -->
			<view class="btn btn_it" v-if="orderStatus == 2">再次购买</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId: "",
				orderDetail: {},
				cause: [],
				orderStatus: "",
				type: "",
				payType: "",
				text: ""
			}
		},
		onLoad(options) {
			this.orderId = options.orderId;
			this.getOrderInfo();
			this.getCancelReason();
			// orderStatus 0 待发货 -2 待付款 -1 已取消 1 待收货 2 已完成
			// payType 0 货到付款 1 在线支付
		},
		methods: {
			// 获取订单详情
			getOrderInfo() {
				let config = {
					orderId: this.orderId
				}
				this.$api.getOrderInfo(config).then(res => {
					if(res.code == 200) {
						let data = res.data;
						this.orderDetail = res.data;
						this.orderStatus = res.data.orderStatus;
						this.type = data.orderStatus == 0 && "待发货" || data.orderStatus == -2 && "待付款" || data.orderStatus == 1 && "待收货" || data.orderStatus == 2 && "已完成" || data.orderStatus == -1 && "已取消";
						this.text = data.orderStatus == 0 && "已付款等待卖家发货" || data.orderStatus == -2 && "等待买家付款" || data.orderStatus == 1 && "等待买家发货" || data.orderStatus == 2 && "交易已完成" || data.orderStatus == -1 && "订单已取消";
						this.payType = data.payType == 0 && "货到付款" || data.payType == 1 && "在线支付";
					}
				});
			},
			
			// 获取取消订单原因
			getCancelReason() {
				this.$api.getCancelReason().then(res => {
					this.cause = res.data;
				});
			},
			
			// 立即支付
			enterOrder() {
				uni.navigateTo({
					url: "/pages/pay/pay?orderunique=" + this.orderDetail.orderId + "&totalMoney=" + this.orderDetail.totalMoney + "type=2"
				});
			},
			
			// 确认收货
			takeOrder() {
				let config = {
					orderId: this.orderId
				}
				this.$api.takeOrder(config).then(res => {
					if(res.code == 200) {
						this.getOrderInfo();
					}else {
						uni.showToast({
							title: res.message
						});
					}
				});
			},
			
			// 复制订单id
			copyOrderId(id) {
				uni.setClipboardData({
					data: id + '',
					success() {
						uni.showToast({
							title: '复制成功',
						})
					},
					fail(res) {
						uni.showToast({
							title: '复制失败',
							icon: 'none'
						})
					}
				});
			},
			
			// 选择取消订单原因
			selectCause(e) {
				let value = e.target.value;
				let id = this.cause[value].id;
				this.userCancelOrder();
			},
			
			// 用户取消订单
			userCancelOrder(value) {
				let config = {
					id: this.orderId,
					reason: value
				}
				this.$api.userCancelOrder(config).then(res => {
					if(res.code == 200) {
						this.getOrderInfo();
					}else {
						uni.showToast({
							title: res.message
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F7F7F7;
	 }
	.orderdetail_box_state{
		padding: 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #ff6619;
	}
	.orderdetail_state{
		font-size: 30rpx;
		color: #ffff;
	}
	.detail_time{
		margin-top: 5rpx;
		font-size: 26rpx;
		color: #fff;
		opacity: .8;
	}
	.detail_state_icon{
		width: 80rpx;
		height: 80rpx;
	}
	.order_box{
		padding: 20rpx 30rpx;
		margin: 30rpx auto;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}
	.addr{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.addr_icon{
		margin-top: 10rpx;
		width: 37rpx;
		height: 46rpx;
		flex-shrink: 0;
	}
	.addr_info{
		margin-top: 10rpx;
		margin-left: 15rpx;
		display: flex;
		flex-direction: column;
	}
	.addr_name{
		font-size: 28rpx;
		color: #333333;
	}
	.addr_name text{
		margin-left: 10rpx;
	}
	.adde_t{
		margin-top: 8rpx;
		font-size: 26rpx;
		color: #666;
	}
	.orderlist_box_top{
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #f5f5f5;
	}
	.orderlist_shop{
		display: flex;
		flex-shrink: 0;
	}
	.orderlist_shop image{
		width: 39rpx;
		height: 35rpx;
	}
	.orderlist_shop text{
		width: 560rpx;
		margin-left: 15rpx;
		font-size: 28rpx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.orderlist_con{
		padding: 28rpx 0rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #f5f5f5;
	}
	.orderlist_pro{
		margin-right: 20rpx;
		width: 152rpx;
		height: 152rpx;
		flex-shrink: 0;
	}.orderlist_info{
		width: 516rpx;
		display: flex;
		flex-direction: column;
	}
	.orderlist_tit{
		width: 480rpx;
		height: 80rpx;
		line-height: 40rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 28rpx;
		color: #333333;
	}
	.orderlist_one{
		margin-top: 18rpx;
		display: flex;
		justify-content: space-between;
	}
	.orderlist_box_num{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.orderlist_y{
		color: #f60;
		font-size: 30rpx;
	}
	.orderlist_n{
		color: #999;
		font-size: 26rpx;
	}
	.orderlist_g{
		margin-top: 7rpx;
		felx: 1;
		font-size: 26rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.top{
		margin-top: 14rpx;
	}
	.detail_ifo{
		padding-top: 14rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: #333333;
	}
	.detail_ifo:last-child {
		font-size: 30rpx;
	}
	.detail_org{
		font-size: 28rpx;
		margin-left: 15rpx;
		color: #ED6C1B;
	}
	.detail_top{
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #F5F5F5;
		font-size: 28rpx;
	}
	.detail_ifo2{
		padding: 22rpx 0rpx;
		border-bottom: 1rpx solid #f5f5f5;
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		color: #666;	
	}
	.detail_ifo2:last-child {
		border: none;
	}
	.orderliste_box_btn{
		margin-top: 28rpx;
		display: flex;
		justify-content: flex-end;
	}
	.orderlist_btn{
		margin-left: 18rpx;
		width: 209rpx;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		background: linear-gradient(to right,#F5D737,#ED6C1B);
		border-radius: 8rpx;
		font-size: 22rpx;
		color: #FFFFFF
	}
	.detail_bottom{
		margin-bottom: 120rpx;
	}
	.btn_big{
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 90rpx;
		background: #FFFFFF;
		display: flex;
		flex-flow: row;
		justify-content: flex-end;
		align-items: center;
	}
	.btn_big .btn{
		margin: 0 10rpx;
		padding: 12rpx 20rpx;
		font-size: 28rpx;
		color: #999;
		border: 1rpx solid #999;
		border-radius: 16rpx;
		
	}
	.btn_big .btn.btn_it{
		border: none;
		color: #ffffff;
		background: #FF6619;
	}
</style>
