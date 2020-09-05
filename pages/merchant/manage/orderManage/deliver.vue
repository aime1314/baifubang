<template>
	<view class="deliverMsgBox">
		<view class="deliverListBox" style="padding-bottom:20rpx;">
			<view class="deliverListMsg">
				<view>订单编号</view>
				<view>{{orderId}}</view>
			</view>
			<view class="coutant" style="padding-top:20rpx;">
				{{userName}} {{userPhone}}
			</view>
			<view class="coutant">{{userAddress}}</view>
		</view>
		<view class="deliverListBox">
			<view class="deliverListMsg">
				<view>发货方式</view>
				<view class="moreshow">
					<picker @change="bindPickerChange" :value="index" :range="array">
						{{array[index]}}
					</picker>
				</view>
			</view>
			<template v-if="index == 1">
				<view class="deliverListMsg">
					<view>物流公司</view>
					<view class="moreshow">
						<picker @change="bindPickerChange2" :value="index2" :range="array2">
							{{array2[index2]}}
						</picker>
					</view>
				</view>
				<view class="deliverListMsg" style="border-bottom:none;">
					<view>运单号</view>
					<view><input class="uni-input" v-model="expressNo" placeholder-style="color:#ccc;" placeholder="请输入运单号" /></view>
				</view>
			</template>
		</view>
		<view class="btnBox">
			<view class="btn_big" @tap="shopDeliver">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array: ['自己联系物流', '商家配送',],
				array2: [],
				index: 0,
				index2: 0,
				orderId: "",
				userAddress: "",
				userPhone: "",
				userName: "",
				expressNo: "",
				expressId: ""
			}
		},
		onLoad(options) {
			this.orderId = options.orderId;
			// 获取快递列表
			this.getExpressList();
			this.getOrderInfo();
		},
		methods: {
			getExpressList() {
				this.$api.getExpressList().then(res => {
					if(res.code == 200){
						for(let i = 0; i<res.data.length; i++) {
							this.array2.push(res.data[i].expressName);
						}
						this.expressList = res.data;
						this.expressId = this.expressList[this.index2].expressId;
					}
				});
			},
			bindPickerChange(e) {
				this.index = e.target.value
			},
			bindPickerChange2(e) {
				this.index2 = e.target.value;
				this.expressId = this.expressList[this.index2].expressId;
			},
			
			// 商家发货
			shopDeliver() {
				let config = {
					id: this.orderId,
					selectOrderGoodsIds: this.selectOrderGoodsIds,
					deliverType: this.index,
					expressNo: this.expressNo,
					expressId: this.expressId
				}
				if(this.index == 0) {
					config.expressId = "";
					config.expressNo = "";
				}
				if(this.index == 1 && config.expressNo == '') {
					return uni.showToast({
						title: '请填写物流单号',
						icon: "none"
					});
				}
				this.$api.shopDeliver(config).then(res => {
					if(res.code == 200) {
						uni.navigateBack({
							delta: 1
						})
					}
				});
			},
			
			// 获取订单详情
			getOrderInfo() {
				let config = {
					orderId: this.orderId
				}
				this.$api.getOrderInfo(config).then(res => {
					if(res.code == 200) {
						let data = res.data;
						this.orderDetail = res.data;
						this.userAddress = res.data.userAddress;
						this.userName = res.data.userName;
						this.userPhone = res.data.userPhone;
						let selectOrderGoodsIds = [];
						for(let i = 0; i<res.data.goods.length; i++) {
							selectOrderGoodsIds.push(res.data.goods[i].id);
						}
						console.log(selectOrderGoodsIds);
						this.selectOrderGoodsIds = selectOrderGoodsIds.join(',');
					}
				});
			},
			
			// 
		}
	}
</script>

<style lang="scss">
	.deliverMsgBox{display: flex; flex-direction: column;background-color: #F4F4F4; color: #333;height: 100%;
		.deliverListBox{margin-top: 30rpx; padding: 5rpx 0; background: #FFFFFF;
			.deliverListMsg{padding:20rpx 30rpx; border-bottom:solid 1rpx #d7d7d7; display: flex;justify-content: flex-start;align-items: center;
				view:first-child{width:160rpx;}
				view:last-child{flex: 1;
					.uni-input{background:none; height:auto; line-height: auto; padding: 0;}
				}
				.moreshow{background:url(../../../../static/icon_arrow.png) right center no-repeat; background-size: 28rpx 28rpx;}
			}
			.coutant{padding:5rpx 30rpx;}
		}
	}
	.btnBox {
		margin: 80rpx auto 0;
		padding: 0 30rpx;
		width: 100%;
		
		.btn_big {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 28rpx;
			color: #FFFFFF;
			background: #ff6619;
			border-radius: 8rpx;
		}

	}

</style>
