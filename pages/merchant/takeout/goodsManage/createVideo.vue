<template>
	<view class="content">
		<view class="upload-area">
			<view class="upload-box">
				<view class="upload-item">
					<template v-if="tempVideoImg == ''">
						<image class="upload-img" @tap="uploadVideoImg" src="/static/icon_takeout_photo.png" mode="aspectFill"></image>
					</template>
					<template v-else>
						<image class="upload-img" :src="tempVideoImg" mode="aspectFill"></image>
						<image class="upload-close" @tap="delVideoImg" src="/static/icon_video_close.png" mode="aspectFill"></image>
					</template>
				</view>
				<view class="upload-item">
					<template v-if="videoUrl == ''">
						<image class="upload-img" @tap="uploadVideo" src="/static/icon_takeout_video.png" mode="aspectFill"></image>
					</template>
					<template v-else>
						<video class="upload-img" :src="videoUrl" controls></video>
						<!-- <image class="upload-img" :src="videoUrl" mode="aspectFill"></image> -->
						<image class="upload-play" src="/static/icon_video_play.png" mode="aspectFill"></image>
						<image class="upload-close" @tap="delVideo" src="/static/icon_video_close.png" mode="aspectFill"></image>
					</template>
				</view>
			</view>
			<view class="info">
				<textarea class="text" v-model="content" placeholder="输入视频内容，让更多人了解您的商品" placeholder-style="color: #ccc;"></textarea>
			</view>
		</view>
		<view class="goods-area">
			<view class="item" @tap="toPage('/pages/merchant/takeout/goodsManage/goodsList?select=true')">
				<view class="label">
					<image src="/static/icon_small_goods.png" mode="aspectFill"></image>
					<text>关联商品</text>
				</view>
				<image class="arrow" src="/static/icon_small_arrow.png" mode="aspectFill"></image>
			</view>
			<template v-if="Object.keys(goods).length > 0">
				<view class="goods">
					<view class="detail">
						<image class="img" :src="goods.goodsImg" mode="aspectFill"></image>
						<view class="title">{{goods.goodsName}}</view>
						<image class="close" src="/static/icon_small_close.png" @tap="closeGoods"></image>
					</view>
				</view>
			</template>
		</view>
		<view class="footer_box">
			<view class="btn-default" @tap="submit">发布</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/utils/config.js";
	export default {
		data() {
			return {
				content: "",
				tempVideoImg: "",
				videoImg: "",
				videoUrl: "",
				video: "",
				goods: {},
				goodsId: ""
			};
		},
		
		onShow() {
			if (uni.getStorageSync("goods")) {
				let goods = JSON.parse(uni.getStorageSync("goods"));
				this.goods = goods;
				this.goodsId = goods.goodsId;
			}
		},
		
		methods: {
			
			toPage(page) {
				uni.navigateTo({
					url: page
				});
			},
			
			// 上传视频封面
			uploadVideoImg() {
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
										that.tempVideoImg = tempFilePaths[0];
										that.videoImg = data.data.upPath;
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
			
			// 删除视频封面
			delVideoImg() {
				this.tempVideoImg = "";
				this.videoImg = "";
			},
			
			// 上传视频
			uploadVideo() {
				let that = this;
				uni.chooseVideo({
					sourceType:["album"],
					compressed: false,
					success(res) {
						uni.showLoading({
							title: '上传中...',
							mask: true,
							icon: 'loading'
						});
						console.log(res);
						let tempFilePath = res.tempFilePath;
						uni.uploadFile({
							url: config.baseUrl + '/api/TransferNotBase/upShopVideo',
							filePath: tempFilePath,
							name: 'file',
							header: {
								token: uni.getStorageSync("token")
							},
							formData: {
								dir: "shops"
							},
							success(res) {
								console.log(res);
								console.log(JSON.parse(res.data));
								uni.hideLoading();
								let data = JSON.parse(res.data);
								that.videoUrl = data.data.upHttp;
								that.video = data.data.upPath;
							}
						})
					},
					fail(err) {
						console.log(err);
					}
				})
			},
			
			closeGoods() {
				this.goodsId = "";
				this.goods = {};
				uni.removeStorageSync("goods");
			},
			
			// 删除视频
			delVideo() {
				this.videoUrl = "";
				this.video = "";
			},
			
			submit() {
				let config = {
					content: this.content,
					img: this.videoImg,
					video: this.video,
					goodsId: this.goodsId
				}
				if(config.img == "") {
					return uni.showToast({
						title: "请上传视频封面",
						icon: "none"
					})
				}
				if(config.video == "") {
					return uni.showToast({
						title: "请上传视频",
						icon: "none"
					})
				}
				if(config.content == "") {
					return uni.showToast({
						title: "请输入视频内容",
						icon: "none"
					})
				}
				if(config.goodsId == "") {
					return uni.showToast({
						title: "请选择要关联的商品",
						icon: "none"
					})
				}
				this.$api.addVideo(config).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: "发布成功",
							icon: "none"
						});
						this.content = "";
						this.img = "";
						this.video = "";
						this.goodsId = "";
						this.tempVideoImg = "";
						this.videoUrl = "";
						this.goods = {};
						uni.removeStorageSync("goods");
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}
	.content {
		padding-bottom: 100rpx;
	}
	
	.upload-area {
		background-color: #fff;
		padding: 50rpx 30rpx;
		border-top: 20rpx solid #f7f7f7;
		margin-bottom: 20rpx;
		
		.upload-box {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-bottom: 60rpx;
			
			.upload-item {
				width: 270rpx;
				height: 290rpx;
				position: relative;
				
				.upload-img {
					width: 270rpx;
					height: 290rpx;
				}
				
				.upload-play {
					width: 86rpx;
					height: 86rpx;
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;
				}
				
				.upload-close {
					width: 48rpx;
					height: 48rpx;
					position: absolute;
					top: -24rpx;
					right: -24rpx;
				}
			}
		}
		
		.info {
			font-size: 32rpx;
			color: #333;
			
			.text {
				color: #333;
				width: 690rpx;
				height: 300rpx;
			}
		}
		
	}
	
	.goods-area {
		background-color: #fff;
		padding: 0 30rpx;
		
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 90rpx;
			
			.label {
				font-size: 28rpx;
				color: #333;
				display: flex;
				align-items: center;
				justify-content: center;
				
				image {
					width: 48rpx;
					height: 48rpx;
					margin-right: 10rpx;
				}
			}
			
			.arrow {
				width: 17rpx;
				height: 28rpx;
			}
		}
		
		.goods {
			padding: 30rpx 0;
			.detail {
				padding: 14rpx 20rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				position: relative;
				background-color: #f7f7f7;
				border-radius: 8rpx;
			}
			.img {
				width: 80rpx;
				height: 80rpx;
				margin-right: 10rpx;
			}
			
			.title {
				flex: 1;
				font-size: 26rpx;
				color: #333;
			}
			
			.close {
				position: absolute;
				right: 20rpx;
				top: 0;
				bottom: 0;
				margin: auto 0;
				width: 32rpx;
				height: 32rpx;
			}
			
		}
	}
	
	.footer_box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.btn-default {
			width: 690rpx;
			height: 80rpx;
			background-color: #1C7CE9;
			color: #fff;
			border-radius: 6rpx;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	
</style>
