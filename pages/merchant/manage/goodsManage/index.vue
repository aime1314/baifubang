<template>
	<view class="content">
		<view class="payo_top">
			<view class="payo_tab" :class="{payo_active: type == 1}" @tap="changeType(1)">出售中</view>
			<view class="payo_tab" :class="{payo_active: type == 2}" @tap="changeType(2)">仓库中</view>
			<view class="payo_tab" :class="{payo_active: type == 3}" @tap="changeType(3)">已售罄</view>
		</view>
		<template v-if="isData == true && list.length == 0">
			<view class="no-goods">
				<view class="box">
					<image class="no-goods-img" src="http://img.bfb360.cn/upload/goods/2020-06/5ef1a355af756.png"></image>
					<view class="no-goods-text">您还没有相关订单</view>
				</view>
			</view>
		</template>
		<template v-if="isData == true && list.length > 0">
			<view class="form-box"  v-for="(item, index) in list" :key="index">
				<view class="cat_detail_list">
					<view class="cat_detail_box">
						<image class="cat_detail_img" :src="item.goodsImg"></image>
						<view class="cat_detail_info">
							<view class="cat_detail_tit">{{item.goodsName}}</view>
							<!-- <view class="cat_detail_g">销量：999 库存：99</view> -->
							<view class="cat_detail_y">
								<text>￥{{item.shopPrice}}</text>
								<view class="img" @tap="changeMark(item,index)">
									<image mode="aspectFill" v-if="type == 1 || type == 2" src="/static/merchant_more.png"></image>
								</view>
							</view>
							
						</view>
					</view>
				</view>
				<view class="mark-box" v-if="item.isMark" @tap="closeMark(item)"></view>
				<view class="mark" v-if="item.isMark">
					<view class="item" @tap="editItem(item)">
						<image src="/static/dis.png"></image>
						<view>编辑</view>
					</view>
					<view v-if="type == 2" class="item" @tap="upItem(item)">
						<image src="/static/dload.png"></image>
						<view>上架</view>
					</view>
					<view v-if="type == 1" class="item" @tap="downItem(item)">
						<image src="/static/dload.png"></image>
						<view>下架</view>
					</view>
					<view class="item" @tap="delItem(item)">
						<image src="/static/delete.png"></image>
						<view>删除</view>
					</view>
				</view>
			</view>
			
		</template>
		
		<view class="footer_box">
			<view class="btn-item" @tap="toIndex">
				<view class="btn-icon">
					<image src="/static/icon_manage_index_d.png"></image>
					<text>首页</text>
				</view>
			</view>
			<view class="btn-item" @tap="redirectPage('/pages/merchant/manage/index')">
				<view class="btn-icon">
					<image src="/static/icon_manage_shop_d.png"></image>
					<text>店铺</text>
				</view>
			</view>
			<view class="btn-item add-action" @tap="toCreateVideo">
				<view class="add-icon">
					<image src="/static/icon_add_action.png"></image>
				</view>
			</view>
			<view class="btn-item active">
				<view class="btn-icon">
					<image src="/static/icon_manage_goods_a.png"></image>
					<text>商品</text>
				</view>
			</view>
			<view class="btn-item" @tap="redirectPage('/pages/merchant/manage/earnings/earnings')">
				<view class="btn-icon">
					<image src="/static/icon_manage_earnings_d.png"></image>
					<text>收益</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,	// 筛选类别 1上架的商品 2下架的商品 3售罄的商品
				page: 1,
				pagesize: 20,
				list: [],
				pageLength: 0,
				isLoad: false,
				shopType: 1,	// 1 未开启外卖服务 2 已开启外卖服务
				shopName: "",
				shopImg: "",
				isData: false
			}
		},
		
		onLoad() {
			
		},
		onShow() {
			// 获取店铺营业额，订单量
			this.getShopTurnover();
			// 店铺查看自己商品
			this.getShopGoodsList();
		},
		
		// 上拉加载
		onReachBottom() {
			if(!this.isLoad) return;
			if(this.pageLength ==  20) {
				this.isLoad = false;
				this.isData = false;
				this.page = this.page+1;
				this.getShopGoodsList();
			}
		},
		
		methods: {
			
			// 获取店铺营业额，订单量
			getShopTurnover() {
				this.$api.getShopTurnover().then(res => {
					if(res.code == 200) {
						this.shopName = res.data.shopName;
						this.shopImg = res.data.shopImg;
						this.shopType = res.data.type;
					}
				});
			},
			
			toCreateVideo() {
				if(this.type == 1) {
					uni.showToast({
						title: "请前往开启外卖服务",
						icon: "none"
					})
					setTimeout(()=> {
						uni.navigateTo({
							url: '/pages/merchant/manage/shopManage/shopList?shopImg=' + this.shopImg +  '&shopName=' + this.shopName + '&type=' + this.shopType
						})
					}, 1500);
				}else {
					uni.navigateTo({
						url: "/pages/merchant/takeout/goodsManage/createVideo"
					})
				}
			},
			
			// 店铺查看自己商品
			getShopGoodsList() {
				let config = {
					type: this.type,
					page: this.page,
					pageSize: this.pagesize
				}
				this.$api.getShopGoodsList(config).then(res => {
					if(res.code == 200) {
						let list = res.data;
						for(let i = 0; i<list.length; i++) {
							list[i].isMark = false;
						}
						this.isData = true;
						this.isLoad = true;
						this.pageLength = list.length;
						this.list = this.list.concat(list);
					}
				});
			},
			
			changeMark(item, index) {
				item.isMark = true;
			},
			
			closeMark(item) {
				item.isMark = false;
			},
			editItem(item) {
				uni.navigateTo({
					url: "/pages/merchant/manage/goodsManage/createGoods?type=2&goodsId=" + item.goodsId
				})
			},
			
			upItem(item) {
				let config = {
					editType: 2,
					goodsId: item.goodsId,
					isSale: 1
				}
				this.$api.editGoodsInfo(config).then(res => {
					this.page = 1;
					this.list = [];
					this.getShopGoodsList();
				});
			},
			
			downItem(item) {
				let config = {
					editType: 2,
					goodsId: item.goodsId,
					isSale: 0
				}
				this.$api.editGoodsInfo(config).then(res => {
					this.page = 1;
					this.list = [];
					this.getShopGoodsList();
				});
			},
			
			// 下架
			delItem(item) {
				console.log(item);
				let goodsId = item.goodsId;
				let config = {
					goodsId
				}
				this.$api.delGoods(config).then(res => {
					this.page = 1;
					this.list = [];
					this.getShopGoodsList();
				});
			},
			
			changeType(type) {
				if(this.type == type) return;
				this.type = type;
				this.page = 1;
				this.isData = false;
				this.list = [];
				this.getShopGoodsList();
			},
			
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			},
			
			redirectPage(page) {
				uni.redirectTo({
					url: page
				})
			},
			
			// 返回首页
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
		}
	}
</script>

<style lang="scss">
	.content {
		height: 100%;
	}
	.payo_top {
		padding: 0rpx 48rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #f5f5f5;
		background-color: #fff;
	}
	
	.payo_tab {
		height: 85rpx;
		line-height: 85rpx;
		font-size: 28rpx;
		color: #666666;
		width: 33.3%;
		text-align: center;
	}
	
	.payo_active {
		font-weight: bold;
		color: #333333;
		border-bottom: 6rpx solid #ff6619;
	}
	.content{
		min-height: 100%;
		background: #F4F4F4;
		padding-top: 40rpx;
		padding-bottom: 30rpx;
	}
	.form-box {
		padding: 10rpx 21rpx 28rpx 21rpx;
		margin-top: 21rpx;
		margin-left: 29rpx;
		width: 692rpx;
		background: #FFFFFF;
		border-radius: 5px;
		box-shadow: 0px 3px 6px rgba(0,0,0,.18);
		position: relative;
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
	.text {
		flex: 1;
	}
	.set_arrow{
		width: 28rpx;
		height: 34rpx;
	}
	.set_bor{
		border-bottom: 1rpx solid #f5f5f5;
	}	
	.set_align{
		align-items: center;
		justify-content: space-between;
	}
	.set_inupt{
		width: 470rpx;
		font-size: 28rpx;
	}
	.set_bigbtn{
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
	.pushin_top{
		padding: 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.pushin_tit{
		font-size: 28rpx;
		color: #333333;
	}
	.pushin_h{
		margin: 0rpx 30rpx;
		width: 60rpx;
		height: 4rpx;
		background: #DADCDF;
	}
	.pushin_con{
		padding: 0rpx 30rpx;
		min-height: 300rpx;
		font-size: 26rpx;
		color: #666666;
		line-height: 40rpx;
	}
	.cat_detail{
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
		padding: 27rpx 0rpx 0rpx;
		/* border-bottom: 1rpx solid #f5f5f5; */
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
		margin-left: 30rpx;
		width: 70%;
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
	.cat_detail_y .img {
		width: 56rpx;
		height: 30rpx;
		border-radius: 15rpx;
		border: 2rpx solid #999;
		display: inline-flex;
		justify-content: center;
	}
	.cat_detail_y image{
		width: 40rpx;
		height: 30rpx;
	}
	
	.footer_box {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 100rpx;
		background: #fff;
		display: flex;
		
		.btn-item {
			flex: 1;
			align-items: center;
			height: 100rpx;
			
			.btn-icon {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 100rpx;
				
				image {
					width: 48rpx;
					height: 48rpx;
				}
				
				text {
					font-size: 24rpx;
					color: #333;
				}
				
			}
			&.active text {
				color: #1C7CE9;
			}
		}
		
		.add-action {
			display: flex;
			align-items: center;
			justify-content: center;
			
			.add-icon {
				width: 104rpx;
				height: 104rpx;
				margin-bottom: 60rpx;
				border: 10rpx solid #fff;
				border-radius: 52rpx;
				
				image {
					width: 84rpx;
					height: 84rpx;
				}
			}
		}
	}
	
	.mark-box {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 9;
	}
	
	.mark {
		position: absolute;
		bottom: 30rpx;
		right: 100rpx;
		width: 240rpx;
		z-index: 10;
		
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		
		.item {
			width: 80rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			color: #fff;
			font-size: 28rpx;
			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	.no-goods {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.no-goods .box {
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
