<template>
	<view class="addresslistMsgBox">
		<template v-for="(item, index) in addressList">
			<view class="addresslistMsg" :key="index" @tap="changeAddress(item)">
				<view class="contactsName">{{item.userName}} {{item.userPhone}}</view>
				<view class="addressShow">{{item.provinceName}}{{item.cityName}}{{item.areaName}}{{item.userAddress}}</view>
				<view class="addressSet">
					<view class="defaultshow curron" v-if="item.isDefault">默认地址</view>
					<view class="defaultshow" v-else></view>
					<view class="address_edit" @tap.stop="toDetail(item)">编辑</view>
					<view class="address_del" @tap.stop="changeDelAddress(item.addressId)">删除</view>
				</view>
			</view>
		</template>
		<view class="btnBox">
			<view class="btn_big" @tap="toAddress">+新增地址</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList: [],
				type: 0
			}
		},
		onLoad(options) {
			if(options && options.type) {
				this.type = 1;
			}
		},
		onShow() {
			this.getUserAddressList();
		},
		methods: {
			getUserAddressList() {
				this.$api.getUserAddressList().then(res => {
					if(res.data) {
						this.addressList = res.data;
					}
				});
			},
			
			// 编辑
			toDetail(item) {
				uni.navigateTo({
					url: "/pages/user/setting/editAddress?addressId=" + item.addressId + "&item=" + JSON.stringify(item)
				})
			},
			
			// 新增
			toAddress() {
				uni.navigateTo({
					url: "/pages/user/setting/editAddress"
				})
			},
			
			changeAddress(item) {
				if(this.type == 1) {
					var pages = getCurrentPages();
					var currPage = pages[pages.length - 1]; //当前页面
					var prevPage = pages[pages.length - 2]; //上一个页面
					// prevPage._data.address = item;
					uni.setStorageSync("addressData", JSON.stringify(item));
					uni.navigateBack();
				}
			},
			
			changeDelAddress(addressId) {
				let config = {
					addressId: addressId
				}
				uni.showModal({
				    title: '提示',
				    content: '您是否要确认删除该地址',
				    success:(res)=> {
				        if (res.confirm) {
							this.$api.delAddress(config).then(res => {
								
								if(uni.getStorageSync("addressData")) {
									let addressData = JSON.parse(uni.getStorageSync("addressData"));
									if(addressData.addressId == addressId) {
										uni.removeStorageSync("addressData");
									}
								}
								
								this.getUserAddressList();
							});
				        }
				    }
				});
				
			}
		}
	}
</script>

<style lang="scss">
	.addresslistMsgBox{display: flex; flex-direction: column;	background-color: #F4F4F4; color: #333;height: 100%;
		.addresslistMsg{background: #FFFFFF; margin:15rpx 0; padding: 15rpx 0 0 0;
			.contactsName,.addressShow{padding:15rpx 30rpx;}
			.addressShow{padding: 0 30rpx 30rpx 30rpx;}
			.addressSet{display: flex; padding: 20rpx 30rpx; justify-content: space-between; align-items: center; align-content: center; border-top: solid 1rpx #d7d7d7;
				.defaultshow{width: 60%;}
				.defaultshow.curron,.address_edit,.address_del{background: url(../../../static/address_default.png) left center no-repeat; background-size: 32rpx 32rpx; padding-left: 45rpx;}
				.address_edit{background: url(../../../static/address_edit.png) left center no-repeat; background-size: 32rpx 32rpx; padding-left: 45rpx; color:#B2B2B2; padding-right: 20rpx;}
				.address_del{background: url(../../../static/address_del.png) left center no-repeat;  background-size: 32rpx 32rpx; padding-left: 45rpx; color:#B2B2B2}
			}
		}
		.addresslistMsg:first-child{margin-top: 30rpx;}
		.btnBox{margin: 80rpx auto 0; padding: 0 30rpx; width: 100%;
			.btn_big{width: 100%;height: 80rpx;	line-height: 80rpx;	text-align: center;font-size: 28rpx;color: #FFFFFF;background: #ff6619;border-radius: 8rpx;}
		}	
	}
</style>
