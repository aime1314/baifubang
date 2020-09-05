<template>
	<view>
		<view class="shop_banner">
			<image mode="aspectFill" :src="shopDetail.shopMoveBanner"></image>
		</view>
		<view class="shop_con">
			<view class="shop_con_top">
				<view class="shop_con_tit">{{shopDetail.shopName}}</view>
			</view>
			<view class="shop_con_bar">
				<view class="shop_bar" :class="{shop_active : currentTab == 0}" @tap="changeTab(0)">商品</view>
				<view class="shop_bar" :class="{shop_active : currentTab == 1}" @tap="changeTab(1)">商家详情</view>
			</view>
			<!--产品列表-->
			<view class="index_box_fine" v-if="currentTab == 0">
				<template v-for="(item, index) in goodsList">
					<view class="fine_box" :key="index" @tap="toGoodsDetail(item.goodsId)">
						<image mode="aspectFill" class="fine_img" :src="item.goodsImg"></image>
						<view class="fine_tit">{{item.goodsName}}</view>
						<view class="fine_price">
							<view class="fine_y">￥{{item.shopPrice}}</view>
							<image @tap.stop="goGroup(item)" src="/static/index_add.png"></image>
						</view>
					</view>
				</template>
				
			</view>
			<!--商家详情-->
			<view class="shop_con_box" v-if="currentTab == 1">
				<view class="shop_time_box">
					<image class="shop_icon" src="/static/shop_icon.png"></image>
					<view class="shop_time">
						<text class="shop_time_tit">营业时间</text>
						<text class="shop_time_tim">{{shopDetail.serviceStartTime}} - {{shopDetail.serviceEndTime}}</text>
					</view>
				</view>	
				<view class="shop_time_box2">
					<image class="shop_icon2" src="/static/address.png"></image>
					<view class="shop_time2">
						<text class="shop_time_tit">{{shopDetail.provinceName}}{{shopDetail.cityName}}{{shopDetail.areaName}}{{shopDetail.shopAddress}}</text>
						<image class="shop_tel" @tap="callPhone" src="/static/shop_tel.png"></image>
					</view>
				</view>	
				<!--地图-->	
				<map class="map" id="map" :style="{height: mapHeight + 'vh'}" :latitude="latitude" :longitude="longitude"
				 :show-compass="showCompass" scale="14" :show-location="showLocation"></map>
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
	import amapFile from "../../common/amap-wx.js";
	export default {
		data() {
			return {
				currentTab: 0,
				page: 1,
				pageSize: 20,
				shopId: "",
				shopDetail: {},
				goodsList: [],
				pageLength: 0,
				isLoad: false,
				isGoodsSpecDialog: false,
				goodsDetail: {},
				cartNum: 1,
				key: "58266a04ba4d85d62f696641cf7b9e53",
				latitude: 36.1214120, //116.403124,39.940693
				longitude: 116.481028,
				navBarH: 40, // 自定义导航栏高度，默认高度40rpx，iPhone6标准
				mapHeight: 40, // 地图高度
				locationAddress: null, // 街道地址
				subLocationAddress: null, // 地址备用
				currentLocation: '', // 当前定位地址
				showCompass: true,
				showLocation: true,
			}
		},
		onLoad(options) {
			this.shopId = options.shopId;
			this.getShopDetail();
			this.getShopGoods();
		},
		// 上拉加载
		onReachBottom() {
			if(!this.isLoad) return;
			if(this.pageLength ==  20) {
				this.isLoad = false;
				this.page = this.page+1;
				this.getShopGoods();
			}
		},
		methods: {
			// 获取店铺信息
			getShopDetail() {
				let config = {
					shopId: this.shopId
				}
				this.$api.getShopDetail(config).then(res => {
					this.shopDetail = res.data;
					// this.latitude = res.data.latitude;
					// this.longitude = res.data.longitude;
					this.openMap();
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
			
			// 
			getShopGoods() {
				let config = {
					page: this.page,
					pageSize: this.pageSize,
					shopId: this.shopId,
					sort: "",
					sortType: ""
				}
				this.$api.getShopGoods(config).then(res => {
					if(res.code == 200) {
						this.isLoad = true;
						this.pageLength = res.data.length;
						this.goodsList = this.goodsList.concat(res.data);
					}
				})
			},
			changeTab(num) {
				if(this.currentTab == num) return;
				this.currentTab = num;
			},
			toGoodsDetail(data) {
				uni.navigateTo({
					url: `/pages/shop/detail?data=${data}`
				})
			},
			
			// 拨打电话
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: String(this.shopDetail.telephone)
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
			
			// 开启地图
			openMap() {
				let that = this;
				// 生成地图实例
				let myAmapFun = new amapFile.AMapWX({
					key: that.key
				});
				// 定位
				myAmapFun.getRegeo({
					success: res => {
						console.log(res, "高德地图定位回调数据");
						let {
							desc,
							regeocodeData: {
								formatted_address: currentLocation,
								addressComponent: {
									streetNumber: {
										street,
										number
									}
								}
							}
						} = res[0];
						that.desc = desc;
						that.currentLocation = currentLocation;
						that.latitude = res[0].latitude;
						that.longitude = res[0].longitude;
						that.locationAddress = street + number;
						that.subLocationAddress = street + number;
					},
					fail: res => {
						console.log(res, "高德地图定位失败，请查看openMap()");
					}
				});
				
			}
		}
	}
</script>

<style>
	.shop_banner{
		width: 100%;
		height: 300rpx;
		background: #FF6619;
	}
	.shop_banner img{
		width: 100rpx;
		height: 356rpx;
	}
	.shop_con{
		position: relative;
		margin-top: -30rpx;
		width: 100%;
		min-height: 400rpx;
		background: #FFFFFF;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		z-index: 10;
	}
	.shop_con_top{
		padding: 37rpx 29rpx 20rpx 29rpx;
		border-bottom: 1rpx solid #f5f5f5;
		display: flex;
		flex-direction: column;
	}
	.shop_con_tit{
		line-height: 46rpx;
		font-size: 33rpx;
		font-weight: bold;
		color: #333333;
	}
	.shop_con_dec{
		margin-top: 7rpx;
		line-height: 32rpx;
		font-size: 22rpx;
		color: #999999;
	}
	.shop_con_bar{
		margin-left: 29rpx;
		display: flex;
		justify-content: flex-start;
	}
	.shop_bar{
		margin-left: 29rpx;
		margin-right: 114rpx;
		margin-top: 10rpx;
		line-height: 52rpx;
		font-size: 28rpx;
		color: #999999;
	}
	.shop_active{
		font-weight: bold;
		color: #333333;
		border-bottom: 5rpx solid #ED6C1B;
	}
	/*产品列表*/
	.index_box_fine{
		margin-top: 20rpx;
		margin-left: 29rpx;
		margin-bottom: 50rpx;
		width: 692rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.fine_box{
		padding: 22rpx 22rpx;
		margin-bottom: 28rpx;
		width: 330rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 0px 3px 6px rgba(0,0,0,.1);
	}
	.fine_img{
		width: 286rpx;
		height: 286rpx;
	}
	.fine_tit{
		margin-top: 18rpx;
		font-size: 24rpx;
		overflow:hidden;
		text-overflow:ellipsis;	
		white-space:nowrap;
	}
	.fine_tit2{
		margin-top: 5rpx;
		font-size: 20rpx;
		color: #999999;
		overflow:hidden;
		text-overflow:ellipsis;	
		white-space:nowrap;
	}
	.fine_price{
		margin-top: 18rpx;
		margin-bottom: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.finer_py{
		display: flex;
		flex-direction: column;
	}
	.fine_y{
		font-size: 31rpx;
		font-weight: bold;
		color: #FF0000;
		flex-shrink: 0;
	}
	.fine_price image{
		width: 34rpx;
		height: 34rpx;
		flex-shrink: 0;
	}
	/*商家详情*/
	.shop_con_box{
		margin-left: 29rpx;
		width: 692rpx;
	}
	.shop_time_box{
		margin-top: 30rpx;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
	}
	.shop_icon{
		width: 39rpx;
		height: 35rpx;
	}
	.shop_icon2{
		width: 44rpx;
		height: 44rpx;
	}
	.shop_time{
		margin-left: 17rpx;
		display: flex;
		flex-direction: column;
	}
	.shop_time_tit{
		font-size: 26rpx;
		/* font-weight: bold; */
		color: #333333;
	}
	.shop_time_tim{
		margin-top: 14rpx;
		font-size: 26rpx;
		color: #999999;
	}
	.shop_time_box2{
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.shop_time2{
		margin-left: 17rpx;
		width: 630rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.shop_tel{
		width: 42rpx;
		height: 49rpx;
		flex-shrink: 0;
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
	.map {
		margin-top: 40rpx;
		width: 100vw;
		transition: all .2s;
	}
</style>
