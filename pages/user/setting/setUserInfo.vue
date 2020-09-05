<template>
	<view class="content">
		<view class="pay-group">
			<view class="pay-item" @tap="uploadSelfieImg">
				<view class="text">头像</view>
				<image :src="userPhoto"></image>
				<image class="r" src="/static/icon_arrow.png"></image>
			</view>
			<view class="pay-item" @tap="toPage('/pages/user/setting/setUserInfoName?nickname=' + nickname + '&userPhoto=' + userPhoto + '&brithday=' + brithday + '&userSex=' + userSex)">
				<view class="text">昵称</view>
				<view class="text">{{nickname}}</view>
				<image class="r" src="/static/icon_arrow.png"></image>
			</view>
			
			<view class="pay-item">
				<view class="text">性别</view>
				<view class="text">
					<picker @change="bindPickerChange" :value="userSex" :range="array">
						<view>{{array[userSex]}}</view>
					</picker>
				</view>
				<image class="r" src="/static/icon_arrow.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/utils/config.js";
	export default {
		data() {
			return {
				nickname: "",
				userPhoto: "",
				brithday: "1990-01-01",
				userSex: 0,	// 性别 性别0:保密 1：男 2：女
				array: ["保密", "男", "女"]
			}
		},
		onLoad(options) {
			this.userName = uni.getStorageSync("userName");
			this.userPhoto = uni.getStorageSync("userPhoto");
		},
		onShow() {
			this.getuserinfo();
		},
		methods: {
			getuserinfo() {
				this.$api.getuserinfo().then(res => {
					if(res.code == 200) {
						this.nickname = res.data.userName || "这里是会员名";
						this.userMoney = res.data.userMoney || 0;
						this.bill_amount = res.data.bill_amount || 0;
						this.userPhoto = res.data.userPhoto;
						uni.setStorageSync("userName", res.data.userName);
						uni.setStorageSync("userPhoto", res.data.userPhoto);
						uni.setStorageSync("userSex", res.data.userSex);
					}else if (res.code == 300) {
						uni.removeStorageSync("token");
						uni.removeStorageSync("userName");
						uni.removeStorageSync("userPhoto");
						uni.removeStorageSync("userSex");
					}
				})
				
			},
			// 上传自拍照
			uploadSelfieImg() {
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
										that.tempUserPhoto = tempFilePaths[0];
										that.userPhoto = data.data.upHttp;
										that.editUserInfo();
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
			
			bindPickerChange(e) {
				this.userSex = e.target.value;
				this.editUserInfo();
			},
			
			editUserInfo() {
				let config = {
					nickname: this.nickname,
					userSex: this.userSex,
					brithday: this.brithday,
					userPhoto: this.userPhoto
				}
				this.$api.editUserInfo(config).then(res => {
					
				});
			},
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F7F7F7;
		font-size: 28rpx;
	}
	
	.pay-group, .cell-item, .pay-item {
		flex: 1;
		display: flex;
		align-items: center;
	}
	
	.pay-group{
		margin-top: 20rpx;
		flex-flow: column;
	}
	
	.pay-group:last-child{
		border: none;
	}

	.cell-item, .pay-item {
		width: 100%;
		flex-flow: row;
		justify-content: space-between;
		padding: 30rpx 30rpx;
		border-bottom: 1rpx solid #f7f7f7;
		background: #ffffff;
	}
	
	.pay-item image {
		width: 80rpx;
		height: 80rpx;
	}
	
	.pay-item image:last-child {
		width: 24rpx;
		height: 24rpx;
		margin-left: 10rpx;
	}
	
	.pay-item .text:first-child {
		flex:1
	}
	.desc {
		font-size: 26rpx;
		color: #BBBBBB;
	}
	
	.res {
		margin-left: 10rpx;
		display: inline-block;
		font-size: 24rpx;
		background: #ff6619;
		color: #ffffff;
		padding: 4rpx 12rpx;
		border-radius: 20rpx;
	}
</style>
