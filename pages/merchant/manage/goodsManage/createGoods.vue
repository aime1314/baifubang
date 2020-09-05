<template>
	<view>
		<view class="form-box">
			<view class="form-area set_bor">
				<view class="label">商品名称</view>
				<view class="text">
					<input class="set_inupt" type="text" v-model="goodsName" placeholder="请输入商品名称" />
				</view>
			</view>
			<view class="form-area set_bor">
				<view class="label">商品类型</view>
				<view class="text arrow">
					<picker @change="bindTypePickerChange" :value="type_index" :range="array_type">
						<view class="shopstatusMsg">{{array_type[type_index]}}</view>
					</picker>
				</view>
				<image class="set_arrow" src="/static/arrow.png"></image>
			</view>
			<view class="form-area set_bor">
				<view class="label">商品分类</view>
				<view class="text arrow" @tap="toPage('/pages/merchant/manage/goodsManage/setCategory')">未设置</view>
				<image class="set_arrow" src="/static/arrow.png"></image>
			</view>
			<view class="form-area set_bor">
				<view class="label">商品属性</view>
				<view class="text arrow">
					<picker @change="bindAttrPickerChange" :value="attr_index" :range="array_attr">
						<view class="shopstatusMsg">{{array_attr[attr_index]}}</view>
					</picker>
				</view>
				<image class="set_arrow" src="/static/arrow.png"></image>
			</view>
			<view class="form-area set_align">
				<view class="label">商品图片</view>
				<view class="img-box">
					<template v-for="(item, index) in tempImgList">
						<view class="img-items">
							<image :key="index" class="imgs" :src="item"></image>
							<view class="delPhoto" @tap="delImg(index)">
								<image src='/static/icon_1.png'></image>
							</view>
						</view>
					</template>
					<template v-if="tempImgList.length < 6">
						<view class="img-items">
							<image class="imgs" @tap="uploadImg" src="/static/setupload.png"></image>
						</view>
					</template>
				</view>
			</view>
			<view class="form-area set_align">
				<view class="label">商品描述</view>
				<view class="text arrow">
					<input class="set_inupt" type="text" v-model="goodssynopsis" placeholder="商品描述" />
				</view>
				<image class="set_arrow" src="/static/arrow.png"></image>
			</view>
		</view>

		<view class="form-box">
			<view class="form-area set_bor">
				<view class="label">商场价</view>
				<view class="text">
					<input class="set_inupt" type="text" v-model="marketPrice" placeholder="请输入商品市场价" />
				</view>
			</view>
			<view class="form-area set_bor">
				<view class="label">店铺价</view>
				<view class="text">
					<input class="set_inupt" type="text" v-model="shopPrice" placeholder="请输入商品店铺价" />
				</view>
			</view>
			<view class="form-area set_bor">
				<view class="label">商品库存</view>
				<view class="text">
					<input class="set_inupt" type="text" v-model="goodsStock" placeholder="请输入商品库存" />
				</view>
			</view>
			<view class="form-area set_bor">
				<view class="label">预警库存</view>
				<view class="text">
					<input class="set_inupt" type="text" v-model="warnStock" placeholder="请输入商品预警库存" />
				</view>
			</view>
			<view class="form-area set_align">
				<view class="label">商品单位</view>
				<view class="text">
					<input class="set_inupt" type="text" v-model="goodsUnit" placeholder="请输入商品单位" />
				</view>
			</view>
		</view>

		<view class="form-box" v-if="type != 2">
			<view class="form-area set_align">
				<view class="label">商品编码</view>
				<view class="text">
					<input class="set_inupt" type="text" v-model="goodsSn" placeholder="请输入商品编码" />
				</view>
			</view>
			<view class="form-area set_align set_bor">
				<view class="label">商品货号</view>
				<view class="text">
					<input class="set_inupt" type="text" v-model="productNo" placeholder="请输入商品货号" />
				</view>
			</view>
		</view>
		
		<view class="set_foot" v-if="type == 1">
			<view class="set_btn_a" @tap="addGoods(1)">上架出售</view>
			<view class="set_btn_n" @tap="addGoods(0)">放入仓库</view>
		</view>
		
		<view class="set_foot" v-if="type == 2">
			<view class="set_btn_a" @tap="editGoodsInfo(1)">上架出售</view>
			<view class="set_btn_n" @tap="editGoodsInfo(0)">放入仓库</view>
		</view>
	</view>

</template>

<script>
	import config from "@/common/utils/config.js";
	export default {
		data() {
			return {
				type: 1,
				goodsId: "",
				array_type: ['实物商品', '虚拟商品'],
				array_attr: ['推荐商品', '新品上市', '热卖商品', '包邮商品'],
				type_index: 0,
				attr_index: 0,
				data: "",
				goodsName: "",
				goodsType: 0, // 	商品类型 0:实物商品 1:虚拟商品
				gallery: "", // 商品相册
				Path1: "", // 一级分类id
				Path2: "", // 二级分类id
				goodsCatId: "", // 最后一级商品分类ID
				isRecom: 1, // 是否推荐 0:否 1:是
				isNew: 0, // 是否新品 0:否 1:是
				isHot: 0, // 是否热销产品 0:否 1:是
				isFreeShipping: 0, // 是否包邮 0:否 1:是
				goodssynopsis: "", // 商品简介
				marketPrice: "", // 市场价
				shopPrice: "", // 店铺价
				goodsStock: "", // 商品总库存
				warnStock: "", // 预警库存
				goodsUnit: "", // 单位
				goodsSn: "", // 商品编号
				productNo: "", // 商品货号
				isSale: 1, // 是否上架 0下架 1上架
				tempImgList: [],
				imgList: [],
			}
		},
		onLoad(options) {
			this.type = options.type;
			if(options.type == 1) {
				this.getGoodsNumber();
			}
			if(this.type == 2) {
				this.goodsId = options.goodsId;
				this.getGoodsInfoById();
			}
		},
		onShow() {
			if (uni.getStorageSync("Path1") && uni.getStorageSync("Path2") && uni.getStorageSync("goodsCatId")) {
				this.Path1 = uni.getStorageSync("Path1");
				this.Path2 = uni.getStorageSync("Path2");
				this.goodsCatId = uni.getStorageSync("goodsCatId");
				uni.removeStorageSync("Path1");
				uni.removeStorageSync("Path2");
				uni.removeStorageSync("goodsCatId");
			}
		},
		methods: {
			getGoodsInfoById() {
				let config = {
					goodsId: this.goodsId
				}
				this.$api.getGoodsInfoById(config).then(res => {
					if(res.code == 200) {
						this.goodsId = res.data.goodsId;
						this.goodsName = res.data.goodsName;
						this.goodsType = res.data.goodsType;
						this.imgList = res.data.newgallery;
						this.Path1 = res.data.path1;
						this.Path2 = res.data.path1;
						this.goodsCatId = res.data.goodsCatId;
						this.isRecom = res.data.isRecom;
						this.isFreeShipping = res.data.isFreeShipping;
						this.isHot = res.data.isHot;
						this.isNew = res.data.isNew;
						this.marketPrice = res.data.marketPrice;
						this.shopPrice = res.data.shopPrice;
						this.warnStock = res.data.warnStock;
						this.goodsStock = res.data.goodsStock;
						this.goodssynopsis = res.data.goodssynopsis;
						this.goodsUnit = res.data.goodsUnit;
						this.goodsSn = res.data.goodsSn;
						this.productNo = res.data.productNo;
					}
				})
			},
			// 生成商品编号货号
			getGoodsNumber() {
				this.$api.getGoodsNumber().then(res => {
					if(res.code == 200) {
						this.goodsSn = res.data.goodsSn;
						this.productNo = res.data.productNo;
					}
				});
			},
			
			bindTypePickerChange(e) {
				console.log(e.target);
				this.type_index = e.target.value;
				this.goodsType = e.target.value;
			},
			bindAttrPickerChange(e) {
				this.attr_index = e.target.value;
				if(this.attr_index == 0) {
					this.isRecom = 1;
					this.isNew = 0;
					this.isHot = 0;
					this.isFreeShipping = 0;
				}
				if(this.attr_index == 1) {
					this.isRecom = 0;
					this.isNew = 1;
					this.isHot = 0;
					this.isFreeShipping = 0;
				}
				if(this.attr_index == 2) {
					this.isRecom = 0;
					this.isNew = 0;
					this.isHot = 1;
					this.isFreeShipping = 0;
				}
				if(this.attr_index == 3) {
					this.isRecom = 0;
					this.isNew = 0;
					this.isHot = 0;
					this.isFreeShipping = 1;
				}
			},
			bindDateChange(e) {
				this.date = e.target.value
			},

			toPage(page) {
				uni.navigateTo({
					url: page
				})
			},

			uploadImg() {
				let that = this;
				this.isDoConfirm = false;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// #ifdef MP-WEIXIN
						uni.showLoading({
							title: '上传中...',
							mask: true,
							icon: 'loading'
						});
						// #endif
						let tempFilesSize = res.tempFiles.size;
						let filePath = res.tempFiles;
						let tempFilePaths = res.tempFilePaths;
						if (filePath[0].size <= 3000000) {
							uni.uploadFile({
								url: config.baseUrl + '/api/Shops/upShopImg?dir=goods',
								filePath: tempFilePaths[0],
								name: 'file',
								formData: {
									"isThumb": "1"
								},
								header: {
									token: uni.getStorageSync("token")
								},
								success(res) {
									// #ifdef MP-WEIXIN
									uni.hideLoading();
									// #endif
									console.log(res);
									let data = JSON.parse(res.data);
									console.log(data);
									console.log(data.data.upHttp);
									if (data.code == 200) {
										let tempImgList = that.tempImgList;
										tempImgList.push(tempFilePaths[0]);
										let imgList = that.imgList;
										imgList.push(data.data.upPath);
										that.isDoConfirm = true;
									} else {
										uni.showToast({
											title: data.message,
											icon: 'none',
											duration: 2000
										})
									}
								}
							})
						} else {
							console.log("图片太大");
							// #ifdef MP-WEIXIN
							uni.hideLoading();
							// #endif
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
			// 删除
			delImg(index) {
				this.imgList.splice(index, 1);
				this.tempImgList.splice(index, 1);
			},
			
			// 添加商品
			addGoods(type) {
				let config = {
					goodsName: this.goodsName,
					goodsType: this.goodsType,
					gallery: this.imgList.join(","),
					Path1: this.Path1,
					Path2: this.Path2,
					goodsCatId: this.goodsCatId,
					isRecom: this.isRecom,
					isNew: this.isNew,
					isHot: this.isHot,
					isFreeShipping: this.isFreeShipping,
					goodssynopsis: this.goodssynopsis,
					marketPrice: this.marketPrice,
					shopPrice: this.shopPrice,
					goodsStock: this.goodsStock,
					warnStock: this.warnStock,
					goodsUnit: this.goodsUnit,
					goodsSn: this.goodsSn,
					productNo: this.productNo,
					isSale: type
				}
				console.log(config);
				this.$api.addGoods(config).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: '创建成功',
							icon: "none"
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						},1500);
					}
				});
			},
			
			editGoodsInfo(type) {
				let config = {
					goodsId: this.goodsId,
					editType: 1,
					goodsName: this.goodsName,
					goodsType: this.goodsType,
					gallery: this.imgList.join(","),
					Path1: this.Path1,
					Path2: this.Path2,
					goodsCatId: this.goodsCatId,
					isRecom: this.isRecom,
					isNew: this.isNew,
					isHot: this.isHot,
					isFreeShipping: this.isFreeShipping,
					goodssynopsis: this.goodssynopsis,
					marketPrice: this.marketPrice,
					shopPrice: this.shopPrice,
					goodsStock: this.goodsStock,
					warnStock: this.warnStock,
					goodsUnit: this.goodsUnit,
					goodsSn: this.goodsSn,
					productNo: this.productNo,
					isSale: type
				}
				this.$api.editGoodsInfo(config).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: '修改成功',
							icon: "none"
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						},1500);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F7F7F7;
	}

	.form-box {
		padding: 10rpx 21rpx 0rpx 21rpx;
		margin-top: 21rpx;
		margin-left: 29rpx;
		width: 692rpx;
		background: #FFFFFF;
		border-radius: 5px;
		/* box-shadow: 0px 3px 6px rgba(0,0,0,.18); */
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

	.img-box {
		display: flex;
		flex-wrap: wrap;
		flex: 1;
	}

	.img-items {
		width: 152rpx;
		height: 152rpx;
		flex-shrink: 0;
		margin-right: 4rpx;
		position: relative;

		.imgs {
			width: 152rpx;
			height: 152rpx;
		}
		
		.delPhoto {
			position: absolute;
			top: 0;
			right: 0;
			width: 36rpx;
			height: 36rpx;
			
			image {
				width: 36rpx;
				height: 36rpx;
			}
		}
	}

	.img-con {}

	.cat_detail_img {
		width: 152rpx;
		height: 152rpx;
	}

	.text {
		flex: 1;
	}

	.text2 {
		flex: 1;
		margin-right: 20rpx;
		color: grey;
		text-align: right;
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

	.shopstatusMsg {
		text-align: right;
		color: #666666;
	}
</style>
