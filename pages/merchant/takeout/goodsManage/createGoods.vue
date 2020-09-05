<template>
	<view class="content">
		<view class="form-box">
			<view class="form-area set_bor">
				<view class="label">商品名称</view>
				<view class="text">
					<input class="set_inupt" type="text" v-model="goodsName" placeholder="请输入商品名称" placeholder-style="color: #999;" />
				</view>
			</view>
			<view class="form-area set_bor">
				<view class="label">商品分类</view>
				<view class="text arrow" :style="{color: '#999'}" @tap="toCategory" v-if="!isCategory">请选择商品的店内分类</view>
				<view class="text arrow" v-if="isCategory">
					<picker @change="changeCategory" :value="categoryIndex" :range="categoryArray">
						<view class="shopstatusMsg">{{categoryArray[categoryIndex]}}</view>
					</picker>
				</view>
				<image class="set_arrow" src="/static/arrow.png"></image>
			</view>
			<view class="form-area set_bor">
				<view class="label">标准分类</view>
				<view class="text arrow" :class="{gray: categoryText == ''}" @tap="toPage('/pages/merchant/takeout/goodsManage/setCategory')">{{categoryText ? categoryText : "请选择商城标准分类"}}</view>
				<image class="set_arrow" src="/static/arrow.png"></image>
			</view>
			<view class="form-area set_align">
				<view class="label">商品图片</view>
				<view class="img-box">
					<template v-for="(item, index) in tempImgList">
						<view class="img-items">
							<image :key="index" class="imgs" :src="item" mode="aspectFill"></image>
							<view class="delPhoto" @tap="delImg(index)">
								<image src='/static/icon_video_close.png'></image>
							</view>
						</view>
					</template>
					<template v-if="tempImgList.length < 6">
						<view class="img-items">
							<image class="imgs" @tap="uploadImg" src="/static/icon_takeout_upload_img.png"></image>
						</view>
					</template>
				</view>
			</view>
			<view class="form-area set_bor">
				<view class="label">商品描述</view>
				<view class="text">
					<input class="set_inupt" type="text" v-model="goodssynopsis" placeholder="请输入商品描述" placeholder-style="color: #999;" />
				</view>
			</view>
		</view>
		
		<view class="specification">
			<view class="head">
				<text class="title">商品规格</text>
				<text class="desc">商品规格决定价格和库存，如1人份、2~3人份</text>
			</view>
			<view class="box">
				<view class="box-head">
					<view class="title">价格</view>
					<view class="title">分量</view>
					<view class="title">库存</view>
				</view>
				<view class="list">
					<view class="item" v-for="(item, index) in specList" :key="index">
						<view class="input">
							<input type="text" v-model="item.price" />
						</view>
						<view class="input">
							<input type="text" v-model="item.weight" />
						</view>
						<view class="input">
							<input type="text" v-model="item.stock" />
						</view>
						<view class="del" @tap="delSpec(index)">删除</view>
					</view>
				</view>
				<view class="bottom">
					<view class="add" @tap="addSpec">添加规格</view>
				</view>
			</view>
		</view>
		
		<view class="property">
			<view class="head">
				<text class="title">商品属性</text>
				<text class="desc">商品属性是配料不同口味不同，如原味、微辣</text>
			</view>
			<view class="list">
				<view class="property-box" v-for="(item, index) in attrList" :key="index">
					<view class="title gray">属性名称</view>
					<view class="desc">
						<view class="input">
							<input type="text" v-model="item.title" placeholder="如：辣度" placeholder-style="color: #999; text-align: center;" />
						</view>
						<view class="del-box" @tap="delAttr(index)">删除</view>
					</view>
					<view class="title">属性细分</view>
					<view class="property-list">
						<view class="property-item" v-for="(citem, idx) in item.son" :key="idx">
							<input type="text" value="" v-model="citem.title" />
							<view class="delText" @tap="delAttrInfo(idx, index)">
								<image src='/static/icon_video_close.png'></image>
							</view>
						</view>
						
						<view class="add-item" @tap="addAttrInfo(index)">+添加</view>
					</view>
				</view>
			</view>
			<view class="bottom">
				<view class="add" @tap="addAttr">添加属性</view>
			</view>
		</view>
		
		<view class="form-box">
			<view class="form-area set_bor">
				<view class="label">商品单位</view>
				<view class="text">
					<input class="set_inupt" type="text" v-model="goodsUnit" placeholder="请输入商品单位" placeholder-style="color: #999;" />
				</view>
			</view>
		</view>
		
		<view class="footer_box">
			<view class="btn-default" @tap="submit">保存</view>
		</view>
	</view>
</template>

<script>
	import config from "@/common/utils/config.js";
	export default {
		data() {
			return {
				goodsName: "",	// 商品名称
				categoryList: [],	// 商品分类
				categoryArray: [],	// 商品分类数组
				categoryIndex: 0,	// 商品分类数组index
				tempImgList: [],	// 临时的商品照片列表
				imgList: [],	// 商品照片列表
				Path1: "", // 一级分类id
				Path2: "", // 二级分类id
				goodsCatId: "", // 最后一级商品分类ID
				categoryText: "",	// 分类名
				goodssynopsis: "",	// 商品简介
				goodsUnit: "份", // 商品单位
				goodsSn: "",	// 商品编号
				specList: [
					{price: "", weight: "", stock: ""}
				],	// 商品规格
				attrList: [
					{title: "", son: [{title: ""}]}
				],	// 商品属性
				isCategory: false
			};
		},
		
		onLoad(options) {
			this.type = options.type || 1;
			if(this.type == 1) {
				this.getGoodsNumber();
			}
			if(this.type == 2) {
				this.goodsId = options.goodsId;
				this.getGoodsTakeInfoById();
			}
		},
		
		onShow() {
			// 获取外卖商品分类列表
			this.getCategoryList();
			if (uni.getStorageSync("Path1") && uni.getStorageSync("Path2") && uni.getStorageSync("goodsCatId")) {
				this.Path1 = uni.getStorageSync("Path1");
				this.Path2 = uni.getStorageSync("Path2");
				this.goodsCatId = uni.getStorageSync("goodsCatId");
				this.categoryText = uni.getStorageSync("categoryText");
			}
		},
		
		methods: {
			
			getGoodsTakeInfoById() {
				let config = {
					goodsId: this.goodsId
				}
				this.$api.getGoodsTakeInfoById(config).then(res => {
					if(res.code == 200) {
						this.goodsName = res.data.goodsName;
						this.tempImgList = res.data.newgallery;
						this.imgList = res.data.gallery;
						this.goodssynopsis = res.data.goodssynopsis;
						this.goodsUnit = res.data.goodsUnit;
						this.Path1 = res.data.path1;
						this.Path2 = res.data.path2;
						this.goodsCatId = res.data.goodsCatId;
						this.specList = res.data.spe;
						this.attrList = res.data.attr;
						this.categoryText = res.data.path1_name + ' - ' + res.data.path2_name + ' - ' + res.data.goodsCatId_name;
					}
				});
			},
			
			// 生成商品编号货号
			getGoodsNumber() {
				this.$api.getGoodsNumber().then(res => {
					if(res.code == 200) {
						this.goodsSn = res.data.goodsSn;
						console.log(this.goodsSn);
					}
				});
			},
			
			// 获取外卖商品分类列表
			getCategoryList() {
				this.$api.getCategoryList().then(res => {
					if(res.code == 200) {
						if(res.data.length > 0) {
							this.isCategory = true;
							this.categoryList = res.data;
							let categoryArray = [];
							res.data.map((item, index) => {
								categoryArray.push(item.title);
							})
							this.categoryArray = categoryArray;
						}else {
							this.isCategory = false;
						}
					}
				});
			},
			
			toCategory() {
				uni.showToast({
					title: '暂无商店商品分类，请前去添加分类',
					icon: "none"
				});
				setTimeout(() => {
					uni.navigateTo({
						url: "/pages/merchant/takeout/goodsManage/addCategory"
					})
				},1500);
			},
			
			// 选择店内分类
			changeCategory(e) {
				this.categoryIndex = e.target.value;
			},
			
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			},
			
			// 上传照片
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
			// 删除照片
			delImg(index) {
				this.imgList.splice(index, 1);
				this.tempImgList.splice(index, 1);
			},
			
			// 添加一条商品规格
			addSpec() {
				this.specList.push({price: "", weight: "", stock: ""});
			},
			
			// 删除一条商品规格
			delSpec(index) {
				if (this.specList.length <= 1) return;
				this.specList.splice(index, 1);
			},
			
			// 添加一条商品属性
			addAttr() {
				this.attrList.push({title: "", son:[{title: ""}]});
			},
			
			// 删除一条商品属性
			delAttr(index) {
				if (this.attrList.length <= 1) return;
				this.attrList.splice(index, 1);
			},
			
			// 添加一条商品属性细分
			addAttrInfo(index) {
				this.attrList[index].son.push({title: ""});
			},
			
			// 删除一条商品属性细分
			delAttrInfo(idx, index) {
				if (this.attrList[index].son.length <= 1) return;
				this.attrList[index].son.splice(idx, 1);
			},
			
			// 保存
			submit() {
				if(this.goodsName == "") {
					return uni.showToast({
						title: '请输入商品名称',
						icon: "none"
					});
				}
				if(this.imgList.length == 0) {
					return uni.showToast({
						title: '请上传商品照片',
						icon: "none"
					});
				}
				if(!this.categoryList[this.categoryIndex]) {
					return uni.showToast({
						title: '请选择商店商品分类',
						icon: "none"
					});
				}
				if(this.Path1 == "" || this.Path2 == "" || this.goodsCatId == "") {
					return uni.showToast({
						title: '请选择商城标准分类',
						icon: "none"
					});
				}
				if(this.goodssynopsis == "") {
					return uni.showToast({
						title: '请输入商品描述',
						icon: "none"
					});
				}
				let vSpecList = this.specList.every((item, index) => {
					return item.price != "" && item.stock != "" && item.weight != "";
				});
				if(!vSpecList) {
					return uni.showToast({
						title: '请检查商品规格是否输入正确',
						icon: "none"
					});
				}
				let vAttrList = this.attrList.every((item, index) => {
					return item.title != "";
				});
				if(!vAttrList) {
					return uni.showToast({
						title: '请检查商品属性是否输入正确',
						icon: "none"
					});
				}
				if(this.goodsUnit == "") {
					return uni.showToast({
						title: '请输入商品单位',
						icon: "none"
					});
				}
				let attrList = JSON.parse(JSON.stringify(this.attrList));
				for(let i = 0; i<attrList.length; i++) {
					attrList[i].info = attrList[i].son;
					delete attrList[i].son;
				}
				if(this.type == 1) {
					let config = {
						goodsName: this.goodsName,
						sid: this.categoryList[this.categoryIndex].id,
						gallery: this.imgList.toString(),
						Path1: this.Path1,
						Path2: this.Path2,
						goodsCatId: this.goodsCatId,
						goodssynopsis: this.goodssynopsis,
						goodsUnit: this.goodsUnit,
						goodsSn: this.goodsSn,
						isSale: 1,
						spe: JSON.stringify(this.specList),
						attr: JSON.stringify(attrList)
					}
					this.$api.addTakeGoods(config).then(res => {
						if(res.code == 200) {
							uni.removeStorageSync("Path1");
							uni.removeStorageSync("Path2");
							uni.removeStorageSync("goodsCatId");
							uni.removeStorageSync("categoryText");
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
				}
				if(this.type == 2) {
					let config = {
						editType: 1,
						goodsId: this.goodsId,
						goodsName: this.goodsName,
						sid: this.categoryList[this.categoryIndex].id,
						gallery: this.imgList.toString(),
						Path1: this.Path1,
						Path2: this.Path2,
						goodsCatId: this.goodsCatId,
						goodssynopsis: this.goodssynopsis,
						goodsUnit: this.goodsUnit,
						isSale: 1,
						spe: JSON.stringify(this.specList),
						attr: JSON.stringify(attrList)
					}
					this.$api.editTakeGoods(config).then(res => {
						if(res.code == 200) {
							uni.removeStorageSync("Path1");
							uni.removeStorageSync("Path2");
							uni.removeStorageSync("goodsCatId");
							uni.removeStorageSync("categoryText");
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
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}
	
	.content {
		padding-top: 20rpx;
		
	}
	
	.form-box {
		background-color: #fff;
		margin-bottom: 30rpx;
		
		.form-area {
			display: flex;
			align-items: center;
			padding: 0 40rpx;
			
			
			.label {
				font-size: 28rpx;
				color: #333;
				margin-right: 30rpx;
			}
			
			.text {
				font-size: 28rpx;
				flex: 1;
				color: #333;
				
				&.gray {
					color: #999;
				}
				
			}
			
			.set_arrow {
				width: 28rpx;
				height: 34rpx;
			}
			
			.img-box {
				display: flex;
				flex-wrap: wrap;
				flex: 1;
			}
			
			.img-items {
				width: 130rpx;
				height: 130rpx;
				flex-shrink: 0;
				margin-top: 15rpx;
				margin-bottom: 15rpx;
				margin-right: 30rpx;
				position: relative;
			
				.imgs {
					width: 130rpx;
					height: 130rpx;
				}
				
				.delPhoto {
					position: absolute;
					top: 0;
					right: 0;
					width: 34rpx;
					height: 34rpx;
					
					image {
						width: 34rpx;
						height: 34rpx;
					}
				}
			}
			
			
		}
		.set_bor {
			height: 100rpx;
			border-bottom: 1rpx solid #f7f7f7;
		}
		
		.set_align {
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #f7f7f7;
		}
	}
	
	.specification {
		padding: 0 30rpx 30rpx;
		background-color: #fff;
		border-bottom: 1rpx solid #f7f7f7;
		
		.head {
			height: 100rpx;
			display: flex;
			align-items: center;
			
			.title {
				font-size: 28rpx;
				color: #333;
				margin-right: 30rpx;
			}
			
			.desc {
				font-size: 26rpx;
				color: #999;
			}
		}
		
		.box {
			background-color: #f7f7f7;
			padding: 0 20rpx 30rpx;
			
			.box-head {
				height: 94rpx;
				display: flex;
				align-items: center;
				
				.title {
					width: 180rpx;
					font-size: 28rpx;
					color: #666;
					margin-right: 10rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				
			}
			
			.list {
				margin-bottom: 16rpx;
				
				.item {
					display: flex;
					align-items: center;
					margin-bottom: 24rpx;
					
					.input {
						width: 180rpx;
						height: 54rpx;
						margin-right: 10rpx;
						background-color: #fff;
						box-sizing: border-box;
						
						input {
							width: 178rpx;
							height: 100%;
							background-color: #fff;
							font-size: 28rpx;
							color: #333;
							padding: 0 10rpx;
							box-sizing: border-box;
							border: 1rpx solid #e6e6e6;
							text-align: center;
						}
					}
					
					.del {
						font-size: 26rpx;
						color: #ff0000;
						width: 100rpx;
						height: 54rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
			
			.bottom {
				
				.add {
					width: 160rpx;
					height: 70rpx;
					border: 1px solid #999;
					background-color: #fff;
					border-radius: 8rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;
					color: #999;
				}
			}
			
		}
	}
	
	.property {
		background-color: #fff;
		padding: 0 30rpx 30rpx;
		border-bottom: 1rpx solid #f7f7f7;
		
		.head {
			height: 100rpx;
			display: flex;
			align-items: center;
			
			.title {
				font-size: 28rpx;
				color: #333;
				margin-right: 30rpx;
			}
			
			.desc {
				font-size: 26rpx;
				color: #999;
			}
		}
		
		.list {
			
			.property-box {
				background-color: #f7f7f7;
				padding: 0 20rpx 0rpx;
				margin-bottom: 30rpx;
				
				.title {
					font-size: 28rpx;
					color: #333;
					height: 94rpx;
					display: flex;
					align-items: center;
					
					&.gray {
						color: #666;
					}
				}
				
				.desc {
					display: flex;
					align-items: center;
					
					.input {
						width: 180rpx;
						height: 54rpx;
						font-size: 26rpx;
						color: #999;
						margin-right: 26rpx;
						
						input {
							width: 180rpx;
							height: 100%;
							background-color: #fff;
							font-size: 28rpx;
							color: #333;
							padding: 0 10rpx;
							box-sizing: border-box;
							border: 1rpx solid #e6e6e6;
							text-align: center;
						}
					}
					
					.del-box {
						display: flex;
						align-items: center;
						height: 54rpx;
						font-size: 28rpx;
						color: #f00;
					}
					
				}
				
				.property-list {
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					align-items: center;
					align-content: space-between;
					
					& > view {
						margin-bottom: 30rpx;
						margin-right: 55rpx;
					}
					
					& > view:nth-child(3n) {
						margin-right: 0;
					}
					
					
					.property-item {
						width: 180rpx;
						height: 54rpx;
						position: relative;
						
						input {
							width: 180rpx;
							height: 100%;
							background-color: #fff;
							font-size: 26rpx;
							color: #333;
							padding: 0 10rpx;
							box-sizing: border-box;
							border: 1rpx solid #e6e6e6;
							text-align: center;
						}
						
						.delText {
							width: 24rpx;
							height: 24rpx;
							position: absolute;
							top: -12rpx;
							right: -12rpx;
							z-index: 10;
						}
						
					}
					
					.add-item {
						width: 180rpx;
						height: 54rpx;
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #999;
					}
				}
				
			}
		}
		
		.bottom {
			
			.add {
				width: 160rpx;
				height: 70rpx;
				border: 1px solid #999;
				background-color: #fff;
				border-radius: 8rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				color: #999;
			}
		}
		
	}
	
	.footer_box {
		margin: 70rpx 30rpx;
		
		.btn-default {
			width: 690rpx;
			height: 80rpx;
			border-radius: 8rpx;
			color: #fff;
			background-color: #1C7CE9;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	
</style>
