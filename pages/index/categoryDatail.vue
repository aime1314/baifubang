<template>
	<view class="content">
		<view class="cat_detail_left">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" show-scrollbar="false" class="scroll-Y" @scrolltoupper="upper"
			 @scrolltolower="lower" @scroll="scroll">
			 <template v-for="(item, index) in classList">
				<view :id="item.catId" class="scroll-view-item" :class="{scroll_active: classListIndex == index}" @tap="goodsListByClass(item.catId, index)">{{item.simpleName}}</view>
			 </template>
			</scroll-view>
		</view>
		<view class="cat_detail_right">
			<!-- <image class="cat_detail_banner" src="http://test.supuy.com//uploads/attach/2020/04/20200414/49dce24c38f1d7e5dba90a44b9628184.png"></image> -->
			<view class="cat_detail_list">
				<template v-for="(item, index) in goodsList">
					<view class="cat_detail_box" :key="index" @tap="toGoodsDetail(item.goodsId)">
						<image mode="aspectFill" class="cat_detail_img" :src="item.goodsImg"></image>
						<view class="cat_detail_info">
							<view class="cat_detail_tit">{{item.goodsName}}</view>
							<view class="cat_detail_y">
								<text>￥{{item.shopPrice}}</text>
								<image @tap.stop="goGroup(item)" src="/static/index_add.png"></image>
							</view>
						</view>
					</view>
				</template>
				
			</view>
		</view>
		<!--选择数量-->
		<view class="detail_mask_bg" v-if="isGoodsSpecDialog">
			<view class="detail_mask" @tap="closeGoodsSpecDialog"></view>
			<view class="detail_mask_box">
				<view class="mask_img">
					<image mode="aspectFill" :src="goodsDetail.goodsImg"></image>
				</view>
				<view class="mask_info">
					<text class="mask_tit">{{goodsDetail.goodsName}}</text>
					<text class="mask_rmb">￥{{goodsDetail.shopPrice}}</text>
				</view>
				<view class="mask_select">
					<view class="mask_font">数量</view>
					<view class="mask_num">
						<view class="mask_num_j" @tap="minusCount">-</view>
						<input style="text-align: center;" type="number" disabled v-model="cartNum" />
						<view class="mask_num_j mask_ja" @tap="addCount">+</view>
					</view>
				</view>
				<view class="btn_big" @tap="addToCart">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				catId: "",
				goodsListId: "",
				classList: [],
				goodsList: [],
				classListIndex: 0,
				page: 1,
				pageSize: 20,
				serachType: 1,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				isGoodsSpecDialog: false,
				goodsDetail: {},
				cartNum: 1
			}
		},
		onLoad(options) {
			this.catId = options.catId;
			this.goodsClassList();
		},
		methods: {
			// 获取分类
			goodsClassList() {
				let config = {
					catId: this.catId
				}
				this.$api.goodsClassList(config).then(res => {
					this.classList = res.data;
					this.goodsListId = this.classList[0].catId;
					this.goodsListByClass();
				});
			},
			
			// 获取商品列表
			goodsListByClass(id, index) {
				if(this.classListIndex == index) return;
				this.classListIndex = index;
				let config = {
					catId: this.goodsListId,
					page: this.page,
					pageSize: this.pageSize,
					serachType: this.serachType
				}
				this.$api.goodsListByClass(config).then(res => {
					this.goodsList = res.data;
				});
			},
			
			// 加入购物车
			goGroup(item) {
				this.goodsDetail = item;
				this.isGoodsSpecDialog = true;
			},
			
			closeGoodsSpecDialog() {
				this.isGoodsSpecDialog = false;
			},
			
			toGoodsDetail(data) {
				uni.navigateTo({
					url: `/pages/shop/detail?data=${data}`
				})
			},
			minusCount() {
				if (this.cartNum == 1) {
					return uni.showToast({
						title: "亲,该宝贝不能再减少了~",
						icon: 'none'
					})
				}
				this.cartNum--;
			},
			addCount() {
				if (this.cartNum >= this.goodsDetail.goodsStock) {
					return uni.showToast({
						title: "亲,该宝贝不能再增加了~",
						icon: 'none'
					})
				}
				this.cartNum++;
			},
			
			// 添加到购物车
			addToCart() {
				let config = {
					goodsId: this.goodsDetail.goodsId,
					goodsSpecId: 1,
					cartNum: this.cartNum
				}
				console.log(config);
				this.$api.addToCart(config).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: "加入购物车成功",
							icon: 'none'
						})
					}
					this.isGoodsSpecDialog = false;
					this.goodsDetail = {};
					this.cartNum = 1;
				});
			},
		}
	}
</script>

<style>
	.content{
		display: flex;
		justify-content: space-between;
		height: 100%;
	}
	.cat_detail_left {
		position: fixed;
		top: 0;
		left: 0;
		width: 187rpx;
		height: 100%;
		background: #F8F8F8;
		flex-shrink: 0;
	}

	.scroll-Y {
		height: 100%;
	}

	.scroll-view-item {
		padding: 0rpx 10rpx;
		width: 187rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 28rpx;
		color: #333333;
	}
	.scroll_active{
		background: #FFFFFF;
		color: #ED6C1B;
	}
	.cat_detail_right{
		margin-left: 187rpx;
		width: 563rpx;
		flex-shrink: 0;
	}
	.cat_detail_banner{
		width: 563rpx;
		height: 150rpx;
	}
	.cat_detail_list{
		padding: 0rpx 22rpx;
	}
	.cat_detail_box{
		padding: 27rpx 0rpx;
		border-bottom: 1rpx solid #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.cat_detail_img{
		width: 152rpx;
		height: 152rpx;
		flex-shrink: 0;
	}
	.cat_detail_info{
		margin-left: 15rpx;
		width: 350rpx;
		display: flex;
		flex-direction: column;
	}
	.cat_detail_tit{
		font-size: 28rpx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.cat_detail_g{
		margin-top: 14rpx;
		font-size: 22rpx;
		color: #999999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.cat_detail_y{
		margin-top: 18rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.cat_detail_y text{
		font-size: 32rpx;
		color: #FF0000;
	}
	.cat_detail_y image{
		width: 35rpx;
		height: 35rpx;
	}
	/*选择数量*/
	.detail_mask_bg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
	}
	.detail_mask{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.74);
	}
	.detail_mask_box{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 550rpx;
		background: #FFFFFF;
	}
	.mask_img{
		position: absolute;
		top: -60rpx;
		left: 34rpx;
		width: 170rpx;
		height: 170rpx;
		background: #E5E5E5;
	}
	.mask_img image{
		width: 170rpx;
		height: 170rpx;
	}
	.mask_info{
		padding-left: 187rpx;
		margin-left: 29rpx;
		width: 690rpx;
		height: 173rpx;
		border-bottom: 1rpx dotted #ccc;
		display: flex;
		flex-direction: column;
	}
	.mask_tit{
		margin-top: 10rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		/* font-weight: bold; */
		color: #333333;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.mask_rmb{
		margin-top: 16rpx;
		line-height: 40rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #FF0000;
	}
	.mask_select{
		margin-top: 20rpx;
		margin-left: 19px;
		width: 690rpx;
		display: flex;
		justify-content: space-between;	
	}
	.mask_font{
		font-size: 28rpx;
		/* font-weight: bold; */
	}
	.mask_num{
		width: 200rpx;
		display: flex;
		justify-content: space-between;
	}
	.mask_num_j{
		display: block;
		width: 48rpx;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		font-size: 40rpx;
		color: #BDBFC2;
		background: #F4F5F9;
		flex-shrink: 0;
	}
	.mask_ja{
		color: #ED6C1B;
	}
	.mask_num input{
		width: 82rpx;
		height: 46rpx;
		line-height: 46rpx;
		font-size: 32rpx;
	}
	.btn_big{
		position: absolute;
		bottom: 60rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 650rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 28rpx;
		color: #FFFFFF;
		background: #FF6619;
		border-radius: 8rpx;
	}
</style>
