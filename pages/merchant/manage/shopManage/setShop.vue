<template>
	<view>
		<view class="form-box">
			<view class="form-area set_bor">
				<view class="label" style="line-height: 60rpx;">店铺logo</view>
				<view class="text arrow">
				</view>
				<image class="set_arrow_logo" :src="tempImg" @tap="uploadImg"></image>
			</view>
			<view class="form-area set_bor">
				<view class="label">店铺名称</view>
				<view class="text">
					<input class="set_inupt" v-model="shopName" type="text" placeholder="请输入您的店铺名称" />
				</view>
			</view>
			<view class="form-area set_align">
				<view class="label">店铺介绍</view>
				<view class="text">
					<input class="set_inupt" v-model="synopsis" type="text" placeholder="请输入店铺介绍" />
				</view>
			</view>
		</view>
		<view class="form-box">
			<view class="form-area set_bor" @tap="toPage('/pages/merchant/manage/shopManage/setClassify')">
				<view class="label">店铺品类</view>
				<view class="text arrow">
					<view class="text2" v-if="cat_shop.length == 0">请选择店铺品类</view>
					<view class="text" v-if="cat_shop.length > 0">已选择店铺品类</view>
				</view>
				<image class="set_arrow" src="/static/arrow.png"></image>
			</view>
			<view class="form-area set_align set_bor" @tap="changeAddress">
				<view class="label">店铺地址</view>
				<view class="text arrow" :class="{ccc: !address}">
					{{address ? address : "请输入店铺所在地区"}}
				</view>
				<image class="set_arrow" src="/static/arrow.png"></image>
			</view>
			<view class="form-area set_bor">
				<view class="label">详细地址</view>
				<view class="text arrow">
					<input class="set_inupt" type="text" placeholder="详细地址" v-model="shopAddress" />
				</view>
			</view>
			<view class="form-area set_align">
				<view class="label">营业时间</view>
				<view class="text arrow" @tap="toPage('/pages/merchant/manage/shopManage/openingHours')">
					<view class="text2" v-if="serviceStartTime.length == 0 && serviceEndTime.length == 0">请选择营业时间</view>
					<view class="text" v-else>已选择营业时间</view>
				</view>
				<image class="set_arrow" src="/static/arrow.png"></image>
			</view>
		</view>
		<view class="form-box">
			<view class="form-area set_bor">
				<view class="label">联系人</view>
				<view class="text">
					<input class="set_inupt" v-model="shopkeeper" type="text" maxlength="30" placeholder="请输入联系人" />
				</view>
			</view>
			<view class="form-area set_align">
				<view class="label">联系电话</view>
				<view class="text">
					<input class="set_inupt" v-model="telephone" type="number" maxlength="11" placeholder="请输入联系电话" />
				</view>
			</view>
		</view>
		<view class="set_foot">
			<view class="btn_big" @tap="editShopInfo">保存设置</view>
		</view>
		<pickerAddress v-model="addressShow" @confirm="addresspick" />
	</view>
</template>

<script>
	import config from "@/common/utils/config.js";
	import pickerAddress from "@/components/pickerAddress/index.vue";
	export default {
		components: {
			pickerAddress
		},
		data() {
			return {
				shopkeeper: "",
				telephone: "",
				tempImg: "",
				shopImg: "",
				shopName: "",
				synopsis: "",
				addressShow: false,
				form: {
					province: "",
					city: "",
					area: "",
				},
				address: "",	// 页面展示列表
				serviceStartTime: "",
				serviceEndTime: "",
				shopAddress: "",
				province: "",
				city: "",
				areaId: "",
				cat_shop: ""
			}
		},
		onLoad() {
			// 获取店铺信息
			this.getShopsInfo();
		},
		onShow() {
			console.log("onShow");
			if(uni.getStorageSync("cat_shop")) {
				this.cat_shop = JSON.parse(uni.getStorageSync("cat_shop")).join(",");
				console.log(this.cat_shop);
			}
			if(uni.getStorageSync("serviceStartTime") && uni.getStorageSync("serviceEndTime")) {
				this.serviceStartTime = uni.getStorageSync("serviceStartTime");
				this.serviceEndTime = uni.getStorageSync("serviceEndTime");
			}
		},
		methods: {
			
			// 获取店铺信息
			getShopsInfo() {
				this.$api.getShopsInfo().then(res => {
					if (res.code == 200) {
						this.shopkeeper = res.data.shopkeeper;
						this.telephone = res.data.telephone;
						this.tempImg = res.data.shopImg;
						this.shopImg = res.data.shopImg_old;
						this.shopName = res.data.shopName;
						this.synopsis = res.data.synopsis;
						this.serviceStartTime = res.data.serviceStartTime;
						this.serviceEndTime = res.data.serviceEndTime;
						this.shopAddress = res.data.shopAddress;
						this.address = res.data.provinceName + res.data.cityName + res.data.areaName;
						this.province = res.data.province;
						this.city = res.data.city;
						this.areaId = res.data.areaId;
						this.cat_shop = res.data.cat_shop;
					}
				});
			},

			// 修改店铺信息
			editShopInfo() {
				let config = {
					shopImg: this.shopImg,
					shopName: this.shopName,
					synopsis: this.synopsis,
					serviceStartTime: this.serviceStartTime,
					serviceEndTime: this.serviceEndTime,
					telephone: this.telephone,
					shopkeeper: this.shopkeeper,
					province: this.province,
					city: this.city,
					areaId: this.areaId,
					shopAddress: this.shopAddress,
					cat_shop: this.cat_shop
				}
				this.$api.editShopInfo(config).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: "修改成功",
							icon: 'none'
						})
					}
				});
			},
			
			// 弹起滚动选择器
			changeAddress() {
				this.addressShow = true;
			},
			
			// 选择省市区
			addresspick(obj) {
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
			},

			toPage(page) {
				uni.navigateTo({
					url: page
				})
			},
			
			// 上传自拍照
			uploadImg() {
				let that = this;
				this.isDoConfirm = false;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						uni.showLoading({
							title: '上传中...',
							mask: true,
							icon: 'loading'
						});
						let tempFilesSize = res.tempFiles.size;
						let filePath = res.tempFiles;
						let tempFilePaths = res.tempFilePaths;
						if (filePath[0].size <= 3000000) {
							uni.uploadFile({
								url: config.baseUrl + '/api/Shops/upShopImg?dir=shops',
								filePath: tempFilePaths[0],
								name: 'file',
								header: {
									token: uni.getStorageSync("token")
								},
								success(res) {
									uni.hideLoading();
									console.log(res);
									let data = JSON.parse(res.data);
									console.log(data);
									if(data.code == 200) {
										that.tempImg = tempFilePaths[0];
										that.shopImg = data.data.upPath;
										that.isDoConfirm = true;
									}else {
										uni.showToast({
											title: '上传失败',
											icon: 'none',
											duration: 2000
										})
									}
								}
							})
						}else {
							uni.showToast({
								title: '上传图片不能大于3M!',
								icon: 'none',
								duration: 2000
							})
							that.isDoConfirm = true;
						}
					}
				})
			},
		}
	}
</script>

<style>
	.form-box {
		padding: 10rpx 21rpx 0rpx 21rpx;
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

	.cat_detail_img {
		width: 152rpx;
		height: 152rpx;
		flex-shrink: 0;
		margin-right: 10rpx;
	}

	.text {
		flex: 1;
	}

	.text2 {
		flex: 1;
		margin-right: 20rpx;
		color: grey;
		/* 		text-align: right; */
	}

	.set_arrow {
		width: 28rpx;
		height: 34rpx;
	}

	.set_arrow_logo {
		width: 60rpx;
		height: 60rpx;
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

	.set_bigbtn {
		margin: 80rpx 50rpx 50rpx 50rpx;
		width: 650rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background: #FF6619;
		border-radius: 8rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}

	/*btn*/
	.set_foot {
		width: 690rpx;
		margin: 80rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.set_btn_a {
		width: 320rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #FF6619;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #FFFFFF;
	}

	.set_btn_n {
		width: 320rpx;
		height: 78rpx;
		line-height: 78rpx;
		text-align: center;
		border: 1rpx solid #FF6619;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #FF6619;
	}

	.btn_big {
		position: fixed;
		bottom: 25rpx;
		left: 29rpx;
		margin-top: 48rpx;
		width: 692rpx;
		height: 67rpx;
		line-height: 67rpx;
		text-align: center;
		font-size: 33rpx;
		font-weight: bold;
		color: #FFFFFF;
		background: #1C7CE9;
		border-radius: 8rpx;
	}
</style>
