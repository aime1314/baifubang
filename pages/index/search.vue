<template>
	<view class="content">
		<view class="search_box_top">
			<view class="search_top">
				<view class="index_search">
					<image src="/static/search.png"></image>
					<input type="text" placeholder="请输入搜索关键词" :focus="focus" confirm-type="search" v-model="goodsSerachKeywords" @blur="serachKeywords" />
				</view>
			</view>
			<view class="search_box_bar">
				<view class="search_bar" :class="{sear_active: serachType == 1}" @tap="changeSerachType(1)">商品</view>
				<view class="search_bar" :class="{sear_active: serachType == 2}" @tap="changeSerachType(2)">店铺</view>
			</view>
			<view class="search_box_attr" v-if="serachType == 1">
				<view class="search_attr" :class="{sear_active: sort == 'saleNum'}" @tap="changeSerachAttr('saleNum')">销量</view>
				<view class="search_attr" :class="{sear_active: sort == 'distance'}" @tap="changeSerachAttr('distance')">距离</view>
			</view>
		</view>
		<!--产品列表-->
		<template v-if="(serachType == 1 && isData == true && goodsList.length == 0) || (serachType == 2 && isData == true && shopList.length == 0)">
			<view class="no-goods">
				<view class="box">
					<image class="no-goods-img" src="http://img.bfb360.cn/upload/goods/2020-06/5ef1a2dac6c48.png"></image>
					<view class="no-goods-text">实在没有找到您想要的东西，换个词试试吧</view>
				</view>
			</view>
		</template>
		<template v-if="serachType == 1 && isData == true && goodsList.length > 0">
			<view class="index_box_fine">
				<template v-for="(item, index) in goodsList" >
					<view class="fine_box" :key="index" @tap="toGoodsDetail(item.goodsId)">
						<image class="fine_img" :src="item.goodsImg"></image>
						<view class="fine_tit">{{item.goodsName}}</view>
						<view class="fine_price">
							<view class="fine_y">￥{{item.shopPrice}}</view>
							<image src="/static/index_add.png" @tap.stop="goGroup(item)"></image>
						</view>
						<view class="fine_pro">
							<image class="fine_pro_img" :src="item.shopImg"></image>
							<view class="fine_pro_infor">
								<view class="fine_pro_tit">{{item.shopName}}</view>
							</view>
						</view>
					</view>
				</template>
			</view>
		</template>
		<!--店铺列表-->
		<template v-if="serachType == 2 && isData == true && shopList.length > 0">
			<view class="index_box_recom">
				<template v-for="(item, index) in shopList">
					<view class="recom_list" :key="index">
						<view class="recom_item">
							<image class="recom_img" :src="item.shopImg"></image>
							<view class="recom_info">
								<view class="recom_tit">{{item.shopName}}</text></view>
								<view class="recom_class" @tap="toPage('/pages/shop/shop?shopId=' + item.shopId)">进店</view>
							</view>
						</view>
						<view class="recom_box_dec" v-if="item.goodsList.length > 0">
							<view class="recom_dec" v-for="(citem, cindex) in item.goodsList" :key="cindex" >
								<image class="recom_img_goods" :src="citem.goodsImg"></image>
								<view class="recom_pri">¥{{citem.shopPrice}}</view>
							</view>
						</view>
					</view>
				</template>
			</view>
		</template>
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
				focus: false,
				serachType: 1, // 查询类别 1商品 2店铺
				page: 1, // 第几页
				pageSize: 20, // 每页显示几条
				goodsSerachKeywords: "", // 商品关键字
				shopName: "", // 店铺名称
				sort: "saleNum", // 	排序字段
				sortType: "asc", // 排序方式
				longitude: uni.getStorageSync("longitude") || "", // 经度(serachType为2 查询店铺时必填)
				latitude: uni.getStorageSync("latitude") || "", // 纬度(serachType为2 查询店铺时必填)
				goodsList: [],
				shopList: [],
				isGoodsSpecDialog: false,
				goodsDetail: {},
				cartNum: 1,
				pageLength: 0,
				isLoad: false,
				isData: false
			}
		},
		// 上拉加载
		onReachBottom() {
			if(!this.isLoad) return;
			if(this.pageLength ==  20) {
				this.isLoad = false;
				this.page = this.page+1;
				this.serachKeywords(1);
			}
		},
		methods: {
			serachKeywords(load = 2) {
				if(this.goodsSerachKeywords == "") return;
				let config = {};
				if(this.serachType == 1) {
					config = {
						serachType: this.serachType,
						page: this.page,
						pageSize: this.pageSize,
						serachKeywords: this.goodsSerachKeywords,
						sort: this.sort,
						sortType: this.sortType,
						lat: uni.getStorageSync("latitude") || "",
						lng: uni.getStorageSync("longitude") || ""
						
					}
				}
				if(this.serachType == 2) {
					config = {
						serachType: this.serachType,
						page: this.page,
						pageSize: this.pageSize,
						serachKeywords: this.goodsSerachKeywords,
					}
				}
				this.$api.serachKeywords(config).then(res => {
					console.log(res);
					if(res.code == 200) {
						let data = Object.values(res.data);
						this.isLoad = true;
						this.isData = true;
						this.pageLength = data.length;
						if(this.serachType == 1) {
							if(load == 1) {
								this.goodsList = this.goodsList.concat(data);
							}else {
								this.goodsList = data;
							}
						}
						if(this.serachType == 2) {
							if(load == 1) {
								this.shopList = this.shopList.concat(data);
							}else {
								this.shopList = data;
							}
						}
						
					}
				});
			},
			changeSerachType(type) {
				if (this.serachType == type) return;
				this.goodsList = [];
				this.shopList = [];
				this.page = 1;
				this.serachType = type;
				this.isData = false;
				this.serachKeywords();
			},
			
			changeSerachAttr(sort) {
				if (this.sort == sort) return;
				this.goodsList = [];
				this.shopList = [];
				this.page = 1;
				this.isData = false;
				this.sort = sort;
				this.serachKeywords();
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
			toPage(page) {
				uni.navigateTo({
					url: page
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

<style lang="scss">
	page{
		background: #f7f7f7;
	}
	.content {
		height: 100%;
	}
	.search_box_top {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		background: #F7f7f7;
		z-index: 100;
	}

	.search_top {
		display: flex;
		align-items: center;
		background: #ffffff;
	}

	.search_retur {
		margin-left: 29rpx;
		width: 44rpx;
		height: 44rpx;
	}

	.index_search {
		margin: 22rpx auto 0;
		width: 690rpx;
		height: 64rpx;
		background: #F7f7f7;
		border-radius: 28rpx;
		display: flex;
		align-items: center;
	}

	.index_search image {
		margin-left: 57rpx;
		width: 38rpx;
		height: 38rpx;
		flex-shrink: 0;
	}

	.index_search input {
		margin-left: 10rpx;
		width: 690rpx;
		font-size: 28rpx;
	}

	.search_box_bar {
		height: 90rpx;
		background: #Ffffff;
		display: flex;
		align-items: center;
	}

	.search_bar {
		margin-left: 30rpx;
		font-size: 28rpx;
		color: #999999;
	}

	.search_attr {
		margin-right: 40rpx;
		font-size: 28rpx;
		color: #999999;
	}

	.sear_active {
		color: #ED6C1B;
	}

	.search_box_attr {
		width: 690rpx;
		height: 70rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}

	/*产品列表*/
	.index_box_fine {
		width: 700rpx;
		margin: 0 auto;
		padding-top: 260rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.fine_box {
		padding: 22rpx 22rpx;
		margin-bottom: 28rpx;
		width: 330rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, .1);
	}

	.fine_img {
		width: 286rpx;
		height: 286rpx;
	}

	.fine_tit {
		margin-top: 18rpx;
		font-size: 24rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.fine_tit2 {
		margin-top: 5rpx;
		font-size: 20rpx;
		color: #999999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.fine_price {
		margin-top: 18rpx;
		margin-bottom: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.finer_py {
		display: flex;
		flex-direction: column;
	}

	.fine_y {
		font-size: 30rpx;
		color: #FF0000;
		flex-shrink: 0;
	}

	.fine_price image {
		width: 34rpx;
		height: 34rpx;
		flex-shrink: 0;
	}

	.fine_pro {
		padding-top: 14rpx;
		border-top: 1rpx solid #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.fine_pro_img {
		width: 60rpx;
		height: 60rpx;
	}

	.fine_pro_infor {
		margin-left: 12rpx;
		width: 210rpx;
		display: flex;
		flex-direction: column;
	}

	.fine_pro_tit {
		font-size: 20rpx;
		color: #666666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.fine_pro_num {
		margin-top: 10rpx;
		font-size: 20rpx;
		color: #999999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/*店铺列表*/
	.index_box_recom {
		width: 700rpx;
		margin: 0 auto 0;
		padding-top: 200rpx;
	}

	.recom_list {
		padding: 30rpx;
		margin-top: 27rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}
	
	.recom_item {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.recom_img {
		width: 60rpx;
		height: 60rpx;
		border-radius: 8rpx;
		flex-shrink: 0;
	}
	
	.recom_img_goods {
		width: 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		flex-shrink: 0;
	}
	
	.recom_pri {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		padding: 6rpx 20rpx;
		background: #000000;
		border-bottom-left-radius: 12rpx;
		border-top-rigjt-radius: 12rpx;
		opacity: 0.3;
		color: #ffffff;
		font-size: 26rpx;
	}

	.recom_tel {
		width: 55rpx;
		height: 55rpx;
		flex-shrink: 0;
	}

	.recom_info {
		display: flex;
		justify-content: center;
		align-items: center;
		justify-content:space-between;
		margin-left: 12rpx;
		width: 560rpx;
	}

	.recom_tit {
		font-size: 30rpx;
		/* font-weight: bold; */
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

	}

	.recom_con {
		margin-top: 12rpx;
	}

	.recom_con text {
		font-size: 22rpx;
	}

	.recom_num {
		font-weight: bold;
		color: #ED6C18;
	}

	.recom_distance {
		margin-left: 12rpx;
		margin-right: 30rpx;
		font-weight: bold;
		color: #333333;
	}

	.recom_time {
		color: #666666;
	}

	.recom_class {
		margin-top: 10rpx;
		font-size: 22rpx;
		color: #ff6619;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		border: 1rpx solid #ff6619;
		padding: 6rpx 20rpx;
		border-radius: 30rpx;
	}

	.recom_box_dec {
		display: flex;
		flex-wrap: wrap;
		margin-top: 30rpx;
	}

	.recom_dec {
		padding: 40rpx 40rpx;
		margin-top: 10rpx;
		border-radius: 8rpx;
		font-size: 22rpx;
		color: #666666;
		background: #f7f7f7;
		display: flex;
		justify-content: center;
		position: relative;
		margin-right: 20rpx;
		
		&:nth-child(3n) {
			margin-right: 0;
		}
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
	.no-goods {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.no-goods .box {
		margin-top: 60rpx;
	}
	.no-goods-img {
		width: 400rpx;
		height: 400rpx;
		margin: 0 auto;
	}
	.no-goods-text {
		font-size: 32rpx;
		color: #999;
		margin: 65rpx auto 60rpx;
		text-align: center;
	}
</style>
