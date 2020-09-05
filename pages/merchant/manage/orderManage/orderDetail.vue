<template>
	<view>
		
		<view class="orderdetail_box_state">
			<view>
				<!-- <view class="orderdetail_state">type</view> -->
				<view class="detail_time">等待买家付款</view>
				<!--<view class="detail_time">买家已付款</view>  -->
				<!--<view class="detail_time">已发货</view>  -->
				<!--<view class="detail_time">已完成</view>  -->
			</view>
			<image class="detail_state_icon" src="/static/radio.png"></image>
		</view>
		<view class="order_box addr">
			<image class="addr_icon" src="/static/location.png"></image>
			<view class="addr_info">
				<view class="addr_name">.userName<text>orderDetail.userPhone</text></view>
				<view class="adde_t">orderDetail.userAddress</view>
			</view>
		</view>
		<view class="order_box">
			<view class="orderlist_box_top">
				<view class="orderlist_shop">
					<!-- <image src="/static/shop_icon.png"></image> -->
					<text>商品信息</text>
				</view>
			</view>
			<view class="orderlist_con">
				<image class="orderlist_pro" src="/static/img.png"></image>
				<view class="orderlist_info">
					<view class="orderlist_one">
						<view>
							<view class="orderlist_g">商品名称</view>
							<view class="text2">规格</view>
						</view>
						
						<view class="orderlist_box_num">
							<text class="orderlist_y">￥99.99</text>
							<text class="orderlist_n">X1</text>
						</view>
					</view>
				</view>
			</view>
			<view class="detail_ifo">
				<text>商品小计</text>
				<text>¥ 2.00</text>
			</view>
			<view class="detail_ifo">
				<text>优惠活动</text>
				<text>-¥ 2.00</text>
			</view>
			<view class="detail_ifo">
				<text>运费</text>
				<text>¥ 2.00</text>
			</view>
			<view class="detail_ifo" >
				<text>实付金额合计</text>
				<text class="detail_org">¥ 2.00</text>
			</view>
		</view>
		<view class="order_box ">
			<view class="detail_top">订单信息</view>
			<view class="detail_ifo2">
				<text>订单号</text>
				<view>
					<text>15648865132546845646</text>
					<text class="detail_org">复制</text>
				</view>
			</view>
			<view class="detail_ifo2">
				<text>支付方式</text>
				<text>在线支付</text>
			</view>
			<view class="detail_ifo2">
				<text>支付时间</text>
				<text>2020-04-05 11:55</text>
			</view>
			<view class="detail_ifo2">
				<text>配送方式</text>
				<text>快递</text>
			</view>
			
			<!-- 买家已付款 -->
			<view class="btn_big">
				<view class="btn btn_it">立即发货</view>
			</view>
			<!-- 等待买家付款 无按钮 -->
		</view>
		<!-- 已完成，已发货 -->
		<view class="order_box detail_bottom">
			<view class="detail_top">物流信息</view>
			<view class="detail_ifo2">
				<text>发货方式</text>
				<text>顺丰快递</text>
			</view>
			<view class="detail_ifo2">
				<text>快递单号</text>
				<view>
					<text>15648865132546845646</text>
					<text class="detail_org">复制</text>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId: "",
				orderDetail: {},
				type: ""
			}
		},
		onLoad(options) {
			this.orderId = options.orderId;
			this.getOrderInfo();
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
						this.type = data.orderStatus == 0 && "待发货" || data.orderStatus == -2 && "待付款" || data.orderStatus == 1 && "待收货" || data.orderStatus == 2 && "已完成";
					}
				});
			},
			
			// 
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
		padding: 10rpx 21rpx 28rpx 21rpx;
		margin-top: 21rpx;
		margin-left: 29rpx;
		width: 692rpx;
		background: #FFFFFF;
		border-radius: 5px;
		box-shadow: 0px 3px 6px rgba(0,0,0,.18);
	}
	.addr{
		display: flex;
		justify-content: flex-start;
		// justify-content: center;
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
		padding-right: 30rpx;
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
		/* position: fixed; */
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
	.text2 {
			flex: 0;
			margin-right: 20rpx;
			color: grey;
	/* 		text-align: right; */
		}
</style>
