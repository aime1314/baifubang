<template>
	<view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in bannerList" :key="index">
				<view class="swiper-item"><image mode="aspectFill" :src="item"></image></view>
			</swiper-item>
		</swiper>
		<view class="detail_box">
			<view class="detail_box_l">
				<view class="detail_tit">{{goodsDetail.goodsName}}</view>
				<view class="detail_rmb">￥{{goodsDetail.shopPrice}}</view>
				<view class="detail_num">累计销量 {{goodsDetail.saleNum}}件</view>
			</view>
		</view>
		<view class="detail_box top">
			<view class="detail_mall">
				<image mode="aspectFill" class="detail_icon2" :src="goodsDetail.shop.shopImg"></image>
				<text>{{goodsDetail.shop.shopName}}</text>
			</view>
			<view class="detail_join" @tap="toPage('/pages/shop/shop?shopId=' + goodsDetail.shopId)">进入店铺</view>
		</view>
		<view class="detail_content">
			<rich-text :nodes="goodsDesc"></rich-text>
		</view>
		<view class="footer_box">
			<view class="btn_box_icon">
				<view class="btn_icon" @tap="toPage('/pages/shop/shop?shopId=' + goodsDetail.shopId)">
					<image src="/static/detail_shop.png"></image>
					<text>店铺</text>
				</view>
				<view class="btn_icon" @tap="toCart">
					<image src="/static/detail_cart.png"></image>
					<text>购物车</text>
					<view class="count" v-if="cartCount != ''">{{cartCount}}</view>
				</view>
			</view>
			<view class="btn_box" @tap="goGroup(1)">加入购物车</view>
			<view class="btn_box orage" @tap="goGroup(2)">立即购买</view>
		</view>
		<!--选择数量-->
		<template v-if="isGoodsSpecDialog">
			<view class="detail_mask_bg">
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
							<input style="text-align: center;" type="number" v-model="cartNum" />
							<view class="mask_num_j mask_ja" @tap="addCount">+</view>
						</view>
					</view>
					<view class="btn_big" @tap="submit">确定</view>
				</view>	
			</view>
		</template>
		
	</view>
</template>

<script>
	import htmlParser from "../../common/html-parser.js";
	export default {
		data() {
			return {
				goodsId: "",
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				goodsDetail: {},
				bannerList: [],
				goodsDesc: [],
				buyType: 0,
				isGoodsSpecDialog: false,
				cartNum: 1,
				cartCount: ""
			}
		},
		onLoad(options) {
			this.goodsId = options.data;
			// 获取商品详情
			this.getGoodsDetail();
			// 获取购物车商品数量
			this.getCartCount();
		},
		methods: {
			// 获取商品详情
			getGoodsDetail() {
				let config = {
					goodsId: this.goodsId
				}
				this.$api.getGoodsDetail(config).then(res => {
					this.goodsDetail = res.data;
					this.bannerList = res.data.gallery;
					let goodsDesc = res.data.goodsDesc.replace(/<img/g, "<img style='max-width:100%;height:auto !important;' ");
					this.goodsDesc = htmlParser(goodsDesc);
				});
			},
			changeIndicatorDots(e) {
            this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			goGroup(type) {
				this.buyType = type;
				this.isGoodsSpecDialog = true;
			},
			closeGoodsSpecDialog() {
				this.isGoodsSpecDialog = false;
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
			submit() {
				let config = {
					goodsId: this.goodsDetail.goodsId,
					goodsSpecId: 1,
					cartNum: this.cartNum
				}
				console.log(config);
				console.log(this.buyType);
				if(this.buyType == 1) {
					this.addToCart(config);
				}
				if(this.buyType == 2) {
					this.goPayOrder(config);
				}
			},
			addToCart(config) {
				this.$api.addToCart(config).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: "加入购物车成功",
							icon: 'none'
						})
						this.isGoodsSpecDialog = false;
						// 获取购物车商品数量
						this.getCartCount();
					}
				});
			},
			goPayOrder(config) {
				this.$api.goPayOrder(config).then(res => {
					if(res.code == 200) {
						uni.navigateTo({
							url: "/pages/cart/payOrder"
						})
					}
				});
			},
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			},
			toCart() {
				uni.switchTab({
					url: "/pages/cart/cart"
				})
			},
			
			// 获取购物车商品数量
			getCartCount() {
				if(!uni.getStorageSync("token")) return;
				this.$api.getCartCount().then(res => {
					if(res.code == 200) {
						if(res.data.count != 0) {
							if(res.data.count > 99) {
								this.cartCount = "99+"
							}else {
								this.cartCount = res.data.count.toFixed();
							}
						}else {
							this.cartCount = "";
						}
					}
				});
			}
		}
	}
</script>

<style>
	.swiper{
		width: 690rpx;
		height: 550rpx;
		margin: 0 auto;
	}
	.swiper-item{
		width: 690rpx;
		height: 550rpx;
	}
	.detail_box{
		padding: 20rpx 44rpx 20rpx 35rpx;
		margin-top: 21rpx;
		background: #FFFFFF;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.detail_tit{
		font-size: 28rpx;
		color: #333333;
	}
	.detail_rmb{
		margin-top: 4rpx;
		font-size: 32rpx;
		color: #FF0000;
	}
	.detail_num{
		margin-top: 4rpx;
		font-size: 26rpx;
		color: #999999;
	}
	.detail_box_r{
		position: relative;
		width: 140rpx;
		flex-shrink: 0;
		flex-direction: column;
		align-items: center;
		text-align: right;
	}
	.detail_icon{
		position: absolute;
		top: 0;
		right: 0;
		width: 44rpx;
		height: 44rpx;
	}
	.top{
		margin-top: 5rpx;
		border-top: 12rpx #f7f7f7 solid;
		border-bottom: 12rpx #f7f7f7 solid;
	}
	.detail_s{
		margin-bottom: 5px;
		font-size: 22rpx;
		color: #FF0000;
	}
	.detail_mall{
		display: flex;
		flex-shrink: 1;
		align-items: center;

	}
	.detail_mall text{
		margin-left: 20rpx;
		width: 400rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 28rpx;
		color: #333333;
	}
	.detail_icon2{
		width: 44rpx;
		height: 44rpx;
	}
	.detail_join{
		flex-shrink: 0;
		font-size: 26rpx;
		font-weight: bold;
		color: #ff6619;
		border: 1rpx solid #ff6619;
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
	}
	.detail_content{
		margin: 20rpx auto 120rpx;
		width: 690rpx;
	}
	.detail_content image{
		max-width: 100%;
	}
	.footer_box{
		position: fixed;
		bottom: 0;
		left: 0;
		height: 98rpx;
		background: #F6F6F6;
		display: flex;
		justify-content: space-between;
	}
	.btn_box{
		width: 238rpx;
		height: 98rpx;
		line-height: 98rpx;
		text-align: center;
		background: #F5D737;
		font-size: 28rpx;
		color: #FFFFFF;
	}
	.orage{
		background: #ED6C18;
	}
	.btn_box_icon{
		width: 280rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.btn_icon{
		padding: 0rpx 18rpx;
		text-align: center;
		position: relative;
	}
	.btn_icon image{
		width: 44rpx;
		height: 44rpx;
		margin: 0 auto;
	}
	.btn_icon text{
		text-align: center;
		font-size: 24rpx;
		color: #333333;
	}
	.btn_icon .count{
		position:absolute;
		top: 0rpx;
		right: 2rpx;
		min-width: 24rpx;
		height: 38rpx;
		border-radius: 38rpx;
		text-align: center;
		line-height: 38rpx;
		background: #fb0220;
		color: #fff;
		font-size: 26rpx;
		padding: 0 15rpx;
		display:block;
		overflow:hidden;
		white-space:nowrap;
		pointer-events:auto;
	}
	/*选择数量*/
	.detail_mask_bg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.detail_mask{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgb(0,0,0,.74);
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
		color: #ff6619;
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
