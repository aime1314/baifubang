<template>
	<view class="editaddressMsgBox">
		<view class="editaddressMsg">
			<view class="editaddresslist">
				<view>收货人</view>
				<view><input class="uni-input" v-model="userName" placeholder-style="color:#ccc;" placeholder="收货人姓名" /></view>
			</view>
			<view class="editaddresslist">
				<view>联系电话</view>
				<view><input class="uni-input" type="number" maxlength="11" v-model="userPhone" placeholder-style="color:#ccc;" placeholder="联系电话" /></view>
			</view>
			<view class="editaddresslist">
				<view>所在地区</view>
				<view @tap="changeAddress">
					<view class="set_inupt" :class="{ccc: !address}">{{address ? address : "请输入所在地区"}}</view>
					<text class="cityshow"></text>
				</view>
			</view>
			<view class="editaddresslist">
				<view>详细地址</view>
				<view>
					<input class="uni-input" v-model="userAddress" placeholder-style="color:#ccc;" placeholder="街道，门牌号等" />
				</view>
			</view>
			<view class="editaddresslist">
				<view>默认地址</view>
				<view class="setshow">
					<text class="setbox" @tap="changeDefault" v-if="isDefault == 0"><text></text></text>
					<text class="setbox curron" @tap="changeDefault" v-if="isDefault == 1"><text></text></text>
				</view>
			</view>
		</view>
		<view class="btnBox">
			<view class="btn_big" @tap="submit">保存地址</view>
		</view>
		
		<picker-address v-model="addressShow" @confirm="addresspick"></picker-address>
	</view>
</template>

<script>
	import pickerAddress from "@/components/pickerAddress/index.vue";
	export default {
		components: {
			pickerAddress
		},
		data() {
			return {
				addressShow: false,
				form: {
					province: '',
					city: '',
					area: '',
				},
				address: '',
				addressId: "",
				userName: "",
				userPhone: "",
				province: "",
				provinceName: "",
				city: "",
				cityName: "",
				areaName: "",
				areaId: "",
				userAddress: "",
				isDefault: 0
			}
		},
		onLoad(options) {
			console.log(options);
			let addressId = options.addressId || "";
			let item = options.item || '{}';
			item = JSON.parse(item);
			if (Object.keys(item).length != 0 && addressId != "") {
				this.addressId = item.addressId;
				this.userName = item.userName;
				this.userPhone = item.userPhone;
				this.province = item.province;
				this.provinceName = item.provinceName;
				this.city = item.city;
				this.cityName = item.cityName;
				this.areaName = item.areaName;
				this.areaId = item.areaId;
				this.userAddress = item.userAddress;
				this.isDefault = item.isDefault;
				this.address = item.provinceName + item.cityName + item.areaName;
			}
		},
		methods: {
			changeAddress() {
				this.addressShow = true;
			},
			addresspick(obj) {
				console.log(obj);
				let arr = [ 'province', 'city', 'area'];
				let place = '';
				arr.map(key => {
					this.form[key] = obj[key].areaId
					place += obj[key].areaName
				})
				this.address = place;
				this.province = obj.province.areaId;
				this.provinceName = obj.province.areaName;
				this.city = obj.city.areaId;
				this.cityName = obj.city.areaName;
				this.areaId = obj.area.areaId;
				this.areaName = obj.area.areaName;
				console.log(this.form);
			},
			// 保存地址
			submit() {
				if(this.addressId) {
					this.editAddress();
				}else {
					this.addUseraddress();
				}
				let config = {
					is_default: this.is_default,
				}
			},
			
			// 编辑收货地址
			editAddress() {
				let config = {
					addressId: this.addressId,
					userName: this.userName,
					userPhone: this.userPhone,
					province: this.province,
					provinceName: this.provinceName,
					city: this.city,
					cityName: this.cityName,
					areaName: this.areaName,
					areaId: this.areaId,
					userAddress: this.userAddress,
					isDefault: this.isDefault
				}
				this.$api.editAddress(config).then(res => {
					if(res.code == 200) {
						uni.navigateBack({
							delta: 1
						})
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				});
			},
			
			// 添加收货地址
			addUseraddress() {
				let config = {
					userName: this.userName,
					userPhone: this.userPhone,
					province: this.province,
					provinceName: this.provinceName,
					city: this.city,
					cityName: this.cityName,
					areaName: this.areaName,
					areaId: this.areaId,
					userAddress: this.userAddress,
					isDefault: this.isDefault
				}
				this.$api.addUseraddress(config).then(res => {
					if(res.code == 200) {
						uni.navigateBack({
							delta: 1
						})
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				});
			},
			
			
			// 改变是否默认地址
			changeDefault() {
				this.isDefault == 0 ? this.isDefault = 1 : this.isDefault = 0;
			}
		}
	}
</script>

<style lang="scss">
	.editaddressMsgBox{display: flex; flex-direction: column;background-color: #F4F4F4; color: #333;height: 100%;
		.editaddressMsg{background: #FFFFFF; padding:0 30rpx; margin-top: 30rpx;
			.editaddresslist{height: 80rpx;display: flex; justify-content: flex-start; align-items: center; align-content: center; border-top: solid 1rpx #F4F4F4;
				> view:first-child{width:130rpx;}
				> view:last-child{flex: 1; position: relative;
					display: flex;
				}
				.set_inupt {width: 400rpx;
					display: flex;
					padding: 15rpx 25rpx;
				}
				.uni-input{background:none;}
				.cityshow{ display: inline-block; width: 32rpx; height:32rpx; position: absolute; top:20rpx; right:10rpx; z-index: 2; background:url(../../../static/icon_arrow.png) right center no-repeat; background-size: 28rpx 28rpx;}
				.setshow{height: 80rpx; text-align:right; flex:1; position: relative;
					.setbox{display: inline-block; width: 60rpx; height:30rpx; border-radius:15rpx; border:solid 2rpx #666666; margin-top: 20rpx; position: absolute;right: 0;
						text{display: inline-block;width: 26rpx; height:26rpx; border-radius:13rpx; background: #666666; position: absolute; left:1rpx; top:2rpx}
					}
					.setbox.curron{background: #FF6619; border:solid 2rpx #ff6600;
						text{display: inline-block;width: 26rpx; height:26rpx; border-radius:13rpx; background: #FFFFFF; position: absolute; left:auto; right:1rpx; top:2rpx}
					}
				}
			}
		}
		.btnBox{margin: 80rpx auto 0; padding: 0 30rpx; width: 100%;
			.btn_big{width: 100%;height: 80rpx;	line-height: 80rpx;	text-align: center;font-size: 28rpx;color: #FFFFFF;background: #ff6619;border-radius: 8rpx;}
		}	
	}
	.ccc {
		color: #ccc;
	}
</style>
