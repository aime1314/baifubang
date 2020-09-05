<template>
	<view class="content">
		<view class="orderlist_bar">
			<template v-for="(item, index) in orderArr">
				<view class="prder_bar_l" :class="{order_active: type == index}" @tap="changeOrderArr(index)">{{item.name}}</view>
			</template>
		</view>
		<!--list-->
		<template v-if="isData == true && orderList.length == 0">
			<view class="no-goods">
				<view class="box">
					<image class="no-goods-img" src="http://img.bfb360.cn/upload/goods/2020-06/5ef1a355af756.png"></image>
					<view class="no-goods-text">您还没有相关订单</view>
				</view>
			</view>
		</template>
		<template v-if="isData == true && orderList.length > 0">
			<template v-for="(item, index) in orderList">
				<view class="orderlist_box">
					<view class="orderlist_box_top" @tap="toOrderDetail(item.orderId)">
						<view class="orderlist_shop">
							<image src="/static/shop_icon.png"></image>
							<text>{{item.shopName}}</text>
						</view>
						<view class="orderlist_state">{{item.status}}</view>
					</view>
					<template v-if="item.list.length == 1">
						<view class="orderlist_con" @tap="toOrderDetail(item.orderId)">
							<image class="orderlist_pro" :src="item.list[0].goodsImg"></image>
							<view class="orderlist_info">
								<view class="orderlist_one">
									<view class="orderlist_tit">{{item.list[0].goodsName}}</view>
									<view class="orderlist_box_num">
										<text class="orderlist_y">￥{{item.list[0].goodsPrice}}</text>
										<text class="orderlist_n">X{{item.list[0].goodsNum}}</text>
									</view>
								</view>
							</view>
						</view>
					</template>
					
					<template v-if="item.list.length > 1">
						<view class="orderlist_box_pro" @tap="toOrderDetail(item.orderId)">
							<template v-for="(data, idx) in item.list" v-if="idx < 3">
								<image class="orderlist_pro" :src="data.goodsImg"></image>
							</template>
							<view class="orderlist_num">
								共{{item.list.length}}件
								<image class="orderlist_arrow" src="/static/arrow.png"></image>
							</view>
						</view>
						
					</template>
					<view class="orderliste_note">共{{item.list.length}}件商品 总计：<text>￥{{item.totalMoney}}</text>（含运费：￥{{item.deliverMoney}}）</view>
					<view class="orderliste_box_btn">
						<!-- 待付款 -2 -->
						<view class="orderlist_btn2" @tap="changeOrderId(item.orderId)" v-if="item.orderStatus == -2">
							<picker class='cell-picker' mode="selector" @change="selectCause" value="0" :range="cause" range-key="dataName">
								<view>取消订单</view>
							</picker>
						</view>
						<view class="orderlist_btn" @tap="toPay(item.orderId, item.totalMoney)" v-if="item.orderStatus == -2">立即付款</view>
						<!-- 待发货 0 -->
						<view class="orderlist_btn2" @tap="changeOrderId(item.orderId)" v-if="item.orderStatus == 0">
							<picker class='cell-picker' mode="selector" @change="selectCause" value="0" :range="cause" range-key="dataName">
								<view>取消订单</view>
							</picker>
						</view>
						<!-- 待收货 1 -->
						<view class="orderlist_btn" @tap="takeOrder(item.orderId)" v-if="item.orderStatus == 1">确认收货</view>
						<!-- 已完成 2 -->
						<view class="orderlist_btn" @tap="continueToBuy(item)" v-if="item.orderStatus == 2">再次购买</view>
					</view>
				</view>
			</template>
			
		</template>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderArr: [{
					name: '全部',
					val: ['-2', '-1', '0', '1', '2']
				}, {
					name: '待付款',
					val: ['-2']
				}, {
					name: '待发货',
					val: ['0']
				}, {
					name: '待收货',
					val: ['1']
				}, {
					name: '已完成',
					val: ['2']
				}],
				type: 0,
				page: 1,
				pagesize: 20,
				orderStatus: [],
				orderList: [],
				cause: [],
				orderId: "",
				cancelOrderId: "",
				pageLength: 0,
				isLoad: false,
				isData: false
			}
		},
		onLoad(options) {
			this.type = options.type || 0;
			this.getCancelReason();
		},
		onShow() {
			this.getUserOrders();
		},
		onHide() {
			this.page = 1;
			this.orderList = [];
		},
		// 上拉加载
		onReachBottom() {
			if(!this.isLoad) return;
			if(this.pageLength ==  20) {
				this.isLoad = false;
				this.page = this.page+1;
				this.getUserOrders();
			}
		},
		methods: {
			// 获取订单列表
			getUserOrders() {
				let status = this.orderArr[this.type].val;
				let config = {
					orderStatus: status,
					isAppraise: -1,
					page: this.page,
					pagesize: this.pagesize
				}
				this.$api.getUserOrders(config).then(res => {
					if(res.code == 200) {
						this.isLoad = true;
						this.isData = true;
						this.pageLength = res.data.data.length;
						this.orderList = this.orderList.concat(res.data.data);
					}
				});
			},
			
			// 获取取消订单原因
			getCancelReason() {
				this.$api.getCancelReason().then(res => {
					this.cause = res.data;
				});
			},
			
			// 切换
			changeOrderArr(index) {
				if(this.type == index) return;
				this.type = index;
				this.page = 1;
				this.isData = false;
				this.orderList = [];
				this.getUserOrders();
			},
			
			// 查看订单详情
			toOrderDetail(orderId) {
				uni.navigateTo({
					url: "/pages/order/orderDetail?orderId=" + orderId
				})
			},
			
			// 选择取消订单原因
			selectCause(e) {
				console.log(e);
				let value = e.target.value;
				let id = this.cause[value].id;
				this.userCancelOrder(id);
			},
			
			// 选择取消订单id
			changeOrderId(id) {
				this.cancelOrderId = id;
			},
			
			// 用户取消订单
			userCancelOrder(value) {
				let config = {
					id: this.cancelOrderId,
					reason: value
				}
				console.log(config);
				this.$api.userCancelOrder(config).then(res => {
					if(res.code == 200) {
						this.page = 1;
						this.orderList = [];
						this.getUserOrders();
					}else {
						uni.showToast({
							title: res.message
						});
					}
				});
			},
			
			// 确认收货
			takeOrder(id) {
				let config = {
					orderId: id
				}
				this.$api.takeOrder(config).then(res => {
					if(res.code == 200) {
						this.page = 1;
						this.orderList = [];
						this.getUserOrders();
					}else {
						uni.showToast({
							title: res.message
						});
					}
				});
			},
			
			// 去支付
			toPay(orderId, totalMoney) {
				uni.navigateTo({
					url: "/pages/pay/pay?orderunique=" + orderId + "&totalMoney=" + totalMoney + "&type=2"
				});
			},
			
			// 再次购买
			continueToBuy(item) {
				console.log(item);
				let list = item.list;
				let forBoay = Promise.resolve();
				for(let i = 0; i<list.length; i++) {
					forBoay = forBoay.then(res => {
						return this.addToCart(list[i].goodsId);
					});
				}
			},
			
			// 添加到购物车
			addToCart(goodsId) {
				return new Promise((resolve, reject) => {
					let config = {
						goodsId: goodsId,
						goodsSpecId: 1,
						cartNum: 1
					}
					this.$api.addToCart(config).then(res => {
						if(res.code == 200) {
							resolve("ok");
							uni.showToast({
								title: "加入购物车成功",
								icon: 'none'
							})
						}
					});
				});
			},
			
		}
	}
</script>

<style>
	page {
		background: #F7F7F7;
	}
	.content {
		height: 100%;
	}
	.orderlist_bar{
		padding: 0rpx 48rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #FFFFFF;
		border-bottom: 1rpx solid #f5f5f5;
	}
	.prder_bar_l{
		height: 85rpx;
		line-height: 85rpx;
		font-size: 28rpx;
		color: #666666;
	}
	.order_active{
		font-weight: bold;
		color: #FF6619;
		border-bottom: 7rpx solid #FF6619;
	}
	/*list*/
	.orderlist_box{
		padding: 30rpx 20rpx;
		margin: 20rpx auto;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 5px;
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
		width: 410rpx;
		margin-left: 15rpx;
		font-size: 28rpx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.orderlist_state{
		flex-shrink: 0;
		font-size: 28rpx;
		color: #ED6C1B;
	}
	.orderlist_con{
		padding: 28rpx 0rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #f5f5f5;
	}
	.orderlist_box_pro{
		width: 100%;
		display: flex;
	}
	.orderlist_pro{
		margin-right: 20rpx;
		width: 152rpx;
		height: 152rpx;
		flex-shrink: 0;
	}
	.orderlist_num{
		display: flex;
		align-items: center;
		font-size: 30rpx;
		color: #999999;
		flex: 1;
		justify-content: flex-end;
	}
	.orderlist_arrow{
		margin-left: 6rpx;
		width: 24rpx;
		height: 24rpx;
	}
	.orderliste_note{
		margin-top: 28rpx;
		text-align: right;
		font-size: 26rpx;
		color: #333333;
	}
	.orderliste_note text{
		color: #FF0000;
	}
	.orderliste_box_btn{
		margin-top: 28rpx;
		display: flex;
		justify-content: flex-end;
	}
	.orderlist_btn, .orderlist_btn2{
		margin-left: 18rpx;
		padding: 10rpx 20rpx;
		text-align: center;
		font-size: 28rpx;
	}
	.orderlist_btn{
		background: #FF6619;
		border-radius: 8rpx;
		color: #FFFFFF
	}
	.orderlist_btn2{
		background: #FFFFFF;
		border: 1rpx solid #BDBDBD;
		border-radius: 8rpx;
		color: #BDBDBD;
	}
	.orderlist_info{
		width: 516rpx;
		display: flex;
		flex-direction: column;
	}
	.orderlist_one{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.orderlist_tit{
		width: 360rpx;
		height: 80rpx;
		line-height: 40rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 28rpx;
		color: #333333;
	}
	.orderlist_box_num{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.orderlist_y{
		color: #FF0000;
		font-size: 28rpx;
	}
	.orderlist_n{
		color: #BDBDBD;
		font-size: 26rpx;
	}
	.orderlist_g{
		margin-top: 18rpx;
		width: 370rpx;
		font-size: 22rpx;
		color: #999999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.orderlist_box_time{
		margin-top: 5rpx;
		display: flex;
		justify-content: space-between;
	}
	.orderlist_time{
		width: 370rpx;
		font-size: 22rpx;
		color: #999999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.no-goods {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.no-goods .box {
	}
	.no-goods-img {
		width: 400rpx;
		height: 400rpx;
		margin: 0 auto;
	}
	.no-goods-text {
		font-size: 32rpx;
		color: #999;
		margin: 65rpx auto 60rpx;
		text-align: center;
	}
</style>
