<template>
	<view>
		<view class="payo_top">
			<template v-for="(item, index) in orderArr">
				<view class="payo_tab" :class="{payo_active: type == index}" @tap="changeOrderArr(index)">{{item.name}}</view>
			</template>
		</view>
		<template v-for="(item, index) in orderList">
			<view class="form-box" :key="index">
				<view class="form-area set_bor">
					<view class="form-area-i">
						<text class="text3">订单编号：{{item.orderId}}</text>
						<text class="text8" @tap="copyOrderId(item.orderId)">复制</text>
						<view class="text3">{{item.createTime}}</view>
					</view>
				</view>

				<view class="cat_detail_list">
					<template v-for="(citem, idx) in item.list">
						<view class="cat_detail_box" :key="idx">
							<image class="cat_detail_img" :src="citem.goodsImg"></image>
							<view class="cat_detail_info">
								<view class="cat_detail_tit">{{citem.goodsName}}</view>
								<view class="cat_detail_g">{{citem.goodsSpecNames}}</view>
								<view class="cat_detail_y">
									<text>x{{citem.goodsNum}}</text>
									<text>￥{{citem.goodsPrice}}</text>
								</view>
							</view>
						</view>
					</template>
				</view>

				<view class="form-area set_bor">
					<view class="form-area-i">
						<text>共计:{{item.list.length}}件,合计:￥{{item.totalMoney}}(含运费￥{{item.deliverMoney}})</text>
						<text class="text0" v-if="item.orderStatus == -2">待付款</text>
						<text class="text0" v-if="item.orderStatus == 0">待发货</text>
						<text class="text0" v-if="item.orderStatus == 1">已发货</text>
						<text class="text0" v-if="item.orderStatus == 2">已完成</text>
					</view>
				</view>

				<view class="form-area set_bor">
					<view class="form-area-i">
						<view style="display: flex; align-items: center;">
							<text style="margin-right: 10rpx;">{{item.userName}}</text>
							<img src="/static/merchant_mess.png" class="icon">
						</view>
						<view style="display: flex; align-items: center;">
							<img style="margin-right: 10rpx;" src="/static/phone.png" alt="" class="icon">
							<text style="margin-right: 10rpx;">{{item.userPhone}}</text>
							<text class="text8" @tap="callPhone(item.userPhone)">立即拨打</text>
						</view>
					</view>
				</view>


				<view class="form-area set_bor">
					<view class="form-area-i">
						<view style="width: 70%;">
							<text>配送方式：{{item.deliverTypeName}}</text><br>
							<text class="text2">{{item.userAddress}}</text>
						</view>
						<view style="margin: auto 0rpx;">
							<text class="text8" @tap="copyOrderId(item.userAddress)">复制地址</text>
						</view>
					</view>
				</view>
				<!-- 待发货-->
				<view class="btn_big" v-if="item.orderStatus == 0">
					<view class="btn btn_it" @tap="toPage('/pages/merchant/manage/orderManage/deliver?orderId=' + item.orderId)">立即发货</view>
				</view>
			</view>
		</template>
	</view>

</template>

</view>
</template>

<script>
	export default {
		data() {
			return {
				orderArr: [{
					name: '待付款',
					val: ['-2']
				}, {
					name: '待发货',
					val: ['0']
				}, {
					name: '已发货',
					val: ['1']
				}, {
					name: '已完成',
					val: ['2']
				}],
				type: 0,
				page: 1,
				pagesize: 20,
				orderList: [],
				pageLength: 0,
				isLoad: false
			}
		},
		onLoad() {
			
		},
		// 上拉加载
		onReachBottom() {
			if(!this.isLoad) return;
			if(this.pageLength ==  20) {
				this.isLoad = false;
				this.page = this.page+1;
				this.getShopsOrders();
			}
		},
		onShow() {
			this.getShopsOrders();
		},
		methods: {
			getShopsOrders() {
				let status = this.orderArr[this.type].val;
				let config = {
					orderStatus: status,
					payType: 1,
					page: this.page,
					pagesize: this.pagesize,
					deliverType: 0
				}
				this.$api.getShopsOrders(config).then(res => {
					if (res.code == 200) {
						this.isLoad = true;
						this.pageLength = res.data.data.length;
						this.orderList = this.orderList.concat(res.data.data);
					}
				});
			},

			// 切换
			changeOrderArr(index) {
				if (this.type == index) return;
				this.type = index;
				this.page = 1;
				this.orderList = [];
				this.getShopsOrders();
			},
			
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			},
			
			// 拨打电话
			callPhone(phone) {
			  uni.makePhoneCall({
			    phoneNumber: String(phone)
			  })
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
			}
		}
	}
</script>

<style>
	.payo_top {
		padding: 0rpx 48rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.payo_tab {
		height: 85rpx;
		line-height: 85rpx;
		font-size: 28rpx;
		color: #666666;
		width: 33.3%;
		text-align: center;
	}

	.payo_active {
		color: #333333;
		border-bottom: 7rpx solid #ff6619;
	}

	.content {
		min-height: 100%;
		background: #F4F4F4;
		padding-top: 40rpx;
		padding-bottom: 30rpx;
	}

	.form-box {
		padding: 10rpx 21rpx 28rpx 21rpx;
		margin-top: 21rpx;
		margin-left: 29rpx;
		width: 692rpx;
		background: #FFFFFF;
		border-radius: 5px;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, .18);
	}

	.form-area {
		display: flex;
		padding: 20rpx 20rpx;
	}

	.label {
		width: 120rpx;
		font-size: 28rpx;
		color: #333;
		margin-right: 20rpx;
		flex-shrink: 0;
	}

	.text0 {
		color: #ED6C18;
	}

	.text2 {
		flex: 0;
		margin-right: 20rpx;
		color: grey;
	}

	.text3 {
		color: grey;
		font-size: 24rpx;

	}

	.text8 {
		color: grey;
		font-size: 20rpx;
		border: 1rpx grey solid;
		border-radius: 40rpx;
		padding: 2rpx 20rpx;
		margin: 0rpx 10rpx;
	}

	.set_arrow {
		width: 28rpx;
		height: 34rpx;
	}

	.set_bor {
		border-bottom: 1rpx solid #f5f5f5;
	}

	.set_align {
		align-items: center;
		justify-content: space-between;
	}

	.set_inupt {
		width: 470rpx;
		font-size: 28rpx;
	}

	.pushin_top {
		padding: 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pushin_tit {
		font-size: 28rpx;
		color: #333333;
	}

	.pushin_h {
		margin: 0rpx 30rpx;
		width: 60rpx;
		height: 4rpx;
		background: #DADCDF;
	}

	.pushin_con {
		padding: 0rpx 30rpx;
		min-height: 300rpx;
		font-size: 26rpx;
		color: #666666;
		line-height: 40rpx;
	}

	.cat_detail {
		margin-left: 187rpx;
		width: 563rpx;
		flex-shrink: 0;
	}

	.cat_detail_banner {
		width: 563rpx;
		height: 150rpx;
	}

	.cat_detail_list {
		padding: 0rpx 22rpx;
	}

	.cat_detail_box {
		padding: 27rpx 0rpx;
		border-bottom: 1rpx solid #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cat_detail_img {
		width: 152rpx;
		height: 152rpx;
		flex-shrink: 0;
	}

	.cat_detail_info {
		margin-left: 30rpx;
		width: 70%;
		display: flex;
		flex-direction: column;
	}

	.cat_detail_tit {
		font-size: 28rpx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.cat_detail_g {
		margin-top: 14rpx;
		font-size: 22rpx;
		color: #999999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.cat_detail_y {
		margin-top: 18rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cat_detail_y text {
		font-size: 32rpx;
		color: #ED6C18;
	}

	.cat_detail_y image {
		width: 35rpx;
		height: 35rpx;
	}

	.form-area-i {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	.form-area-i image {
		width: 20rpx;
		height: 20rpx;
	}

	.icon {
		width: 40rpx;
		height: 40rpx;
		height: 30rpx;

	}

	.btn_big {
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

	.btn_big .btn {
		margin: 0 10rpx;
		padding: 12rpx 20rpx;
		font-size: 28rpx;
		color: #999;
		border: 1rpx solid #999;
		border-radius: 16rpx;

	}

	.btn_big .btn.btn_it {
		border: none;
		color: #ffffff;
		background: #FF6619;

	}
</style>
