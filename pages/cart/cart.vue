<template>
	<view class="content">
		<template v-if="isPower == 1">
			<!-- <view>没有授权</view> -->
		</template>
		<template v-if="Object.keys(cartsData).length == 0 && isPower == 2">
			<view class="no-goods">
				<view class="box">
					<image class="no-goods-img" src="http://img.bfb360.cn/upload/goods/2020-06/5ef1a1e7a6c7e.png"></image>
					<view class="no-goods-text">购物车空空如也</view>
					<view class="go-home" @tap="toIndex">去逛逛</view>
				</view>
			</view>
		</template>
		<template v-if="Object.keys(cartsData).length > 0 && isPower == 2">
			<view class="cart-manage">
				<view class="cart-manage-btn" @tap="bindShowDel" v-if="!isShowdel">编辑</view>
				<view class="cart-manage-btn" @tap="bindHideDel" v-if="isShowdel">完成</view>
			</view>
			
			<view class="cart-box">
				<template v-for="(item, index) in cartsData">
					<view class="cart_box" :key="index">
						<view class="cart_top">
							<view class="cart_radio" :class="{radio: item.isCheck == 1}" @tap="checkedGroup(index)">
								<image v-if="item.isCheck == 1" src="/static/icon_small_success.png"></image>
							</view>
							<image class="cart_shop_icon" src="/static/detail_shop.png"></image>
							<text class="cart_shop_tit">{{item.shopName}}</text>
							<image class="cart_arrow" src="/static/arrow.png"></image>
						</view>
						<template v-for="(citem, idx) in item.list">
							
							<movable-area>
								<movable-view>
									<!-- <view class="cart_list touch-item touch-move-active" :key="idx"> -->
									<view class="cart_list touch-item" 
									
									:class="{'touch-move-active' : citem.isTouchMove }"
									
									:data-index="index"
									:data-idx="idx"
									@touchstart="touchstart"
									@touchmove="touchmove"
									:key="idx">
										<view class="inner">
											<view class="cart_radio" :class="{radio: citem.isCheck == 1}" @tap="checkedGoods(index, idx)">
												<image v-if="citem.isCheck == 1" src="/static/icon_small_success.png"></image>
											</view>
											<view class="cart_info">
												<image class="cart_list_img" :src="citem.goodsImg"></image>
												<view class="cart_r">
													<view class="cart_pro_tit">{{citem.goodsName}}</view>
													<view class="catr_y">
														<text>￥{{citem.shopPrice}}</text>
														<view class="mask_num">
															<view class="mask_num_j" @tap="minusCount(citem)">-</view>
															<view class="num">{{citem.cartNum}}</view>
															<view class="mask_num_j mask_ja" @tap="addCount(citem)">+</view>
														</view>
													</view>
												</view>
											</view>
										</view>
										<view class="del" @tap.stop="delGoods(citem.cartId)">删除</view>
									</view>
								</movable-view>
							</movable-area>
						</template>
					</view>
				</template>
			</view>
			
			<view class="cart_foot">
				<view>
					<view class="cart_radio" :class="{radio: isCheck == 1}" @tap="checkedAll()">
						<image v-if="isCheck == 1" src="/static/icon_small_success.png"></image>
					</view>
					<text class="cart_all">全选</text>
				</view>
				<view @tap="confirmCheckDel" v-if="isShowdel" class="checkdel">删除</view>
				<view class="cart_comb" v-if="!isShowdel">
					<view class="cart_w">
						<view class="cart_hj">合计：<text>￥{{goodsTotalMoney}}</text></view>
						<!-- <view class="cart_note">{{promotionMoney == 0 && "不含运费" || promotionMoney != 0 && promotionMoney}}</view> -->
					</view>
					<view class="cart_cal cart_orger" @tap="checkout">结算（{{goodsTotalNum}}）</view>
				</view>
			</view>
			
		</template>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartsData: {},
				goodsTotalNum: 0,
				goodsTotalMoney: 0,
				promotionMoney: 0,
				isCheck: 0,
				isShowdel: false,
				startX: "",
				startY: "",
				isPower: 0,	// 1 未授权 2 已授权
			}
		},
		onLoad() {
			
		},
		onShow() {
			// 获取购物车列表
			this.getCartList();
			// 获取购物车商品数量
			this.getCartCount();
		},
		onHide() {
			this.isPower = 0;
			this.isShowdel = false;
		},
		onUnload() {
			this.isShowdel = false;
		},
		methods: {
			// 获取购物车列表
			getCartList() {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) {
					return this.isPower = 1;
				}
				// #endif
				this.$api.getCartList().then(res => {
					if(res.code == 200) {
						this.isPower = 2;
						let cartsData = Object.values(res.data.carts);
						this.goodsTotalNum = res.data.goodsTotalNum;
						this.goodsTotalMoney = res.data.goodsTotalMoney.toFixed(2);
						this.promotionMoney = res.data.promotionMoney;
						for(let i = 0; i<cartsData.length; i++) {
							cartsData[i].list.map((ele, index) => {
								ele.isTouchMove = false;
							});
							let result = cartsData[i].list.every((ele, index) => {
								return ele.isCheck == 1;
							});
							if(result) {
								cartsData[i].isCheck = 1;
							}else {
								cartsData[i].isCheck = 0;
							}
						}
						let result = cartsData.every((ele, index) => {
							return ele.isCheck == 1;
						});
						if(result) {
							this.isCheck = 1;
						}else {
							this.isCheck = 0;
						}
						this.cartsData = cartsData;
					}
				})
			},
			
			// 选中/取消选中商品
			checkedGoods(index, idx) {
				// index 当前商品所在店铺中的下标
				// idx 当前店铺下标
				// 购物车数据
				let cartsData = this.cartsData;
				// 当前点击的商品
				let currentCart = cartsData[index].list[idx];
				// 当前点击的商品选中状态
				let isCheck = currentCart.isCheck;
				if(isCheck == 0) {
					let config = {
						cartId: [currentCart.cartId],
						isCheck: 1
					}
					this.editGoodsCheck(config).then(res => {
						currentCart.isCheck = 1;
						for(let i = 0; i<cartsData.length; i++) {
							let result = cartsData[i].list.every((ele, index) => {
								return ele.isCheck == 1;
							});
							if(result) {
								cartsData[i].isCheck = 1;
							}else {
								cartsData[i].isCheck = 0;
							}
						}
						let result = cartsData.every((ele, index) => {
							return ele.isCheck == 1;
						});
						if(result) {
							this.isCheck = 1;
						}else {
							this.isCheck = 0;
						}
						this.getallprices();
					}).catch(err => {
						console.log(err);
					});
					
				}else {
					let config = {
						cartId: [currentCart.cartId],
						isCheck: 0
					}
					this.editGoodsCheck(config).then(res => {
						currentCart.isCheck = 0;
						for(let i = 0; i<cartsData.length; i++) {
							let result = cartsData[i].list.every((ele, index) => {
								return ele.isCheck == 1;
							});
							if(result) {
								cartsData[i].isCheck = 1;
							}else {
								cartsData[i].isCheck = 0;
							}
						}
						let result = cartsData.every((ele, index) => {
							return ele.isCheck == 1;
						});
						if(result) {
							this.isCheck = 1;
						}else {
							this.isCheck = 0;
						}
						this.getallprices();
					}).catch(err => {
						console.log(err);
					});
				}
			},
			
			// 选中当前店铺所有商品
			checkedGroup(index) {
				// index 当前商品所在店铺中的下标
				// 购物车数据
				let cartsData = this.cartsData;
				// 当前点击的店铺
				let cartGroup = cartsData[index];
				if(cartGroup.isCheck == 1) {
					let cartId = [];
					let isCheck = 0;
					for (let i= 0; i<cartGroup.list.length; i++) {
						cartId.push(cartGroup.list[i].cartId);
					}
					let config = {
						cartId: cartId,
						isCheck: isCheck
					}
					this.editGoodsCheck(config).then(res => {
						cartGroup.isCheck = isCheck;
						for(let i = 0; i<cartGroup.list.length; i++) {
							cartGroup.list[i].isCheck = isCheck;
						}
						let result = cartsData.every((ele, index) => {
							return ele.isCheck == 1;
						});
						if(result) {
							this.isCheck = 1;
						}else {
							this.isCheck = 0;
						}
						this.getallprices();
					}).catch(err => {
						console.log(err);
					});
				}else {
					let cartId = [];
					let isCheck = 1;
					for (let i= 0; i<cartGroup.list.length; i++) {
						cartId.push(cartGroup.list[i].cartId);
					}
					let config = {
						cartId: cartId,
						isCheck: isCheck
					}
					this.editGoodsCheck(config).then(res => {
						cartGroup.isCheck = isCheck;
						for(let i = 0; i<cartGroup.list.length; i++) {
							cartGroup.list[i].isCheck = isCheck;
						}
						let result = cartsData.every((ele, index) => {
							return ele.isCheck == 1;
						});
						if(result) {
							this.isCheck = 1;
						}else {
							this.isCheck = 0;
						}
						this.getallprices();
					}).catch(err => {
						console.log(err);
					});
				}
			},
			
			// 全选/取消全选购物车
			checkedAll() {
				// 购物车数据
				let cartsData = this.cartsData;
				let isCheck = this.isCheck;
				if(isCheck == 0) {
					let cartId = [];
					for(let i = 0; i<cartsData.length; i++) {
						let list = cartsData[i].list
						for(let j = 0; j<list.length; j++) {
							cartId.push(list[j].cartId);
						}
					}
					let config = {
						cartId: cartId,
						isCheck: 1
					}
					this.editGoodsCheck(config).then(res => {
						this.isCheck = 1;
						for(let i = 0; i<cartsData.length; i++) {
							let list = cartsData[i].list;
								cartsData[i].isCheck = 1;
							for(let j = 0; j<list.length; j++) {
								list[j].isCheck = 1;
							}
						}
						this.getallprices();
					}).catch(err => {
						console.log(err);
					});
				}else {
					let cartId = [];
					for(let i = 0; i<cartsData.length; i++) {
						let list = cartsData[i].list;
						console.log(list);
						for(let j = 0; j<list.length; j++) {
							cartId.push(list[j].cartId);
						}
					}
					let config = {
						cartId: cartId,
						isCheck: 0
					}
					this.editGoodsCheck(config).then(res => {
						this.isCheck = 0;
						for(let i = 0; i<cartsData.length; i++) {
							let list = cartsData[i].list;
								cartsData[i].isCheck = 0;
							for(let j = 0; j<list.length; j++) {
								list[j].isCheck = 0;
							}
						}
						this.getallprices();
					}).catch(err => {
						console.log(err);
					});
				}
			},
			
			// 修改购物车商品状态
			editGoodsCheck(config) {
				return new Promise((resolve, reject) => {
					this.$api.editGoodsCheck(config).then(res => {
						if(res.code == 200) {
							resolve();
						}else {
							reject();
						}
					});
				});
				
			},
			
			// 计算总价格  所有选中商品的 （价格*数量）相加
			getallprices() {
				let cartsData = this.cartsData;
				// 总价
				let allprices = 0;
				// 选中商品数量
				let allnum = 0;
				for(let i = 0; i<cartsData.length; i++) {
					let list = cartsData[i].list;
					for(let j = 0; j<list.length; j++) {
						if(list[j].isCheck == 1) {
							let price = Number(list[j].shopPrice);
							let num = parseInt(list[j].cartNum);
							allprices += price * num;
							allnum++;
						}
					}
				}
				this.goodsTotalMoney = allprices.toFixed(2);
				this.goodsTotalNum = allnum;
			},
			
			// 减少商品数据
			minusCount(citem) {
				// 商品数量
				let cartNum = citem.cartNum;
				// 商品总库存
				let goodsStock = citem.goodsStock;
				if(cartNum <= 1) {
					return uni.showToast({
						title: "亲,该宝贝不能再减少了~",
						icon: "none"
					})
				}
				cartNum--;
				citem.cartNum = cartNum;
				this.editGoodsNum(citem.cartId, 2);
				this.getallprices();
				
			},
			
			// 增加商品数据
			addCount(citem) {
				// 商品数量
				let cartNum = citem.cartNum;
				// 商品总库存
				let goodsStock = citem.goodsStock;
				cartNum++;
				citem.cartNum = cartNum;
				this.editGoodsNum(citem.cartId, 1);
				this.getallprices();
			},
			
			editGoodsNum(cartId, editType) {
				let config = {
					cartId: cartId,
					editType: editType
				}
				console.log(config);
				this.$api.editGoodsNum(config).then(res => {
					
				});
			},
			
			// 结算
			checkout() {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) {
					uni.navigateTo({
						url: "/pages/auth/impower"
					});
					return;
				}
				// #endif
				if (this.goodsTotalNum == 0) {
					return uni.showToast({
						title: '请选择要购买的商品~',
						icon: 'none'
					})
				}
				uni.navigateTo({
					url: "/pages/cart/payOrder"
				});
			},
			
			bindShowDel() {
				this.isShowdel = true;
			},
			bindHideDel() {
				this.isShowdel = false;
			},
			// 删除
			confirmCheckDel() {
				let cartsData = this.cartsData;
				let cartId = [];
				for(let i = 0; i<cartsData.length; i++) {
					let list = cartsData[i].list;
					for(let j = 0; j<list.length; j++) {
						if(list[j].isCheck == 1) {
							cartId.push(list[j].cartId);
						}
					}
				}
				let config = {
					cartId: cartId
				}
				this.$api.delCart(config).then(res => {
					if(res.code == 200) {
						this.isShowdel = false;
						this.getCartList();
						// 获取购物车商品数量
						this.getCartCount();
					}
				})
			},
			
			// 获取购物车商品数量
			getCartCount() {
				if(!uni.getStorageSync("token")) return;
				this.$api.getCartCount().then(res => {
					if(res.code == 200) {
						if(res.data.count != 0) {
							uni.setTabBarBadge({
								index: 2,
								text: res.data.count.toFixed()
							})
						}else {
							uni.removeTabBarBadge({
								index: 2
							})
						}
					}
				});
			},
			
			// 手指触摸动作开始 记录起点X坐标
			touchstart(e) {
				let cartsData = this.cartsData;
				cartsData.find((item, index) => {
					item.list.find((childItem, childIdx)=>{
						childItem.isTouchMove = false;
					});
				});
				this.cartsData = cartsData;
				this.startX = e.changedTouches[0].clientX;
				this.startY = e.changedTouches[0].clientY;
			},
			
			// 滑动事件处理
			touchmove(e) {
				let cartsData = this.cartsData;
				// 当前商品所在店铺中的下标
				let index = e.currentTarget.dataset.index;
				// 当前店铺下标
				let idx = e.currentTarget.dataset.idx;
				// 开始X坐标
				let startX = this.startX;
				// 开始Y坐标
				let startY = this.startY;
				// 滑动变化X坐标
				let touchMoveX = e.changedTouches[0].clientX;
				// 滑动变化Y坐标
				let touchMoveY = e.changedTouches[0].clientY;
				let angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
				
				let cai = cartsData[index].list;
				let curt = cai[idx];
				
				// 滑动超过30度角 return
				if (Math.abs(angle) > 30) return;
				if(touchMoveX > startX) {
					curt.isTouchMove = false;
				}else {
					curt.isTouchMove = true;
				}
				this.cartsData = cartsData;
			},
			
			/**
			   * 计算滑动角度
			   * @param {Object} start 起点坐标
			   * @param {Object} end 终点坐标
			   */
			angle(start, end) {
				var _X = end.X - start.X,
				_Y = end.Y - start.Y
				//返回角度 /Math.atan()返回数字的反正切值
				return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
			},
			
			// 删除单个商品
			delGoods(cartId) {
				let config = {
					cartId: [cartId]
				}
				this.$api.delCart(config).then(res => {
					if(res.code == 200) {
						this.getCartList();
						// 获取购物车商品数量
						this.getCartCount();
					}
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
	page {
		background: #f7f7f7;
	}
	.content {
		height: 100%;
		padding-bottom: 120rpx;
	}
	.cart-box {
		// margin-bottom: 120rpx;
	}
	.cart_box{
		width: 690rpx;
		margin: 0 auto 40rpx;
		border-radius: 5px;
		background: #FFFFFF;
	}
	.cart-box:first-child {
		margin-top: 40rpx;
	}
	.cart_top{
		padding-top: 22rpx;
		padding-bottom: 18rpx;
		width: 100%;
		border-bottom: 1rpx solid #E8E8E8;
		display: flex;
		align-items: center;
	}
	.cart_radio {
		float: left;
		margin-left: 18rpx;
		width: 40rpx;
		height: 40rpx;
		border: 1px solid #707070;
		border-radius: 50%;
		background: #fff;
		
		&.radio {
			border: none;
		}
		
		image {
			width: 40rpx;
			height: 40rpx;
		}
	}
	.cart_shop_icon{
		margin: 0rpx 14rpx 0rpx 12rpx;
		width: 44rpx;
		height: 44rpx;
	}
	.cart_shop_tit{
		margin-right: 6rpx;
		font-size: 28rpx;
		color: #707070;
	}
	.cart_arrow{
		width: 20rpx;
		height: 24rpx;
	}
	.cart_list{
		padding: 27rpx 0rpx;
		width: 100%;
		border-bottom: 1rpx solid #F7F7F7;
		display: flex;
		align-items: center;
		justify-content:space-between;
	}
	.cart_list:last-child{
		border: none;
	}
	.cart_list_img{
		width: 152rpx;
		height: 152rpx;
	}
	.cart_info{
		margin-left: 18rpx;
		width: 600rpx;
		display: flex;
		justify-content: space-between;
	}
	.cart_r{
		width: 430rpx;
	}
	.cart_pro_tit{
		height: 64rpx;
		line-height: 32rpx;
		font-size: 28rpx;
		color: #666666;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.catr_y{
		margin-top: 36rpx;
		display: flex;
		justify-content: space-between;
	}
	.catr_y text{
		font-size: 32rpx;
		color: #FF0000;
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
	.mask_num .num {
		width: 62rpx;
		height: 46rpx;
		line-height: 46rpx;
		font-size: 30rpx;
		text-align: center;
	}
	.cart_foot{
		z-index: 100;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 98rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1rpx solid #E8E8E8;
	}
	.mleft{
		margin-left: 47rpx;
	}
	.cart_all{
		margin-left: 10rpx;
		font-size: 28rpx;
		color: #333333;
	}
	.cart_comb{
		display: flex;
		justify-content: flex-end;
	}
	.cart_w{
		margin-top: 13rpx;
		text-align: right;
		display: flex;
		align-items: center;
	}
	.cart_hj{
		font-size: 28rpx;
		color: #333333;
	}
	.cart_hj text{
		color: #FF0000;
	}
	.cart_note{
		font-size: 22rpx;
		color: #999999;
	}
	.cart_cal{
		margin-left: 29rpx;
		width: 197rpx;
		height: 98rpx;
		line-height: 98rpx;
		text-align: center;
		font-size: 33rpx;
		color: #FFFFFF;
		background: #BDBDBD;
	}
	.cart_orger{
		background: #ff6619;
	}
	.cart-manage {
		padding: 20rpx 20rpx;
		display: flex;
		justify-content: flex-end;
	}
	.cart-manage-btn {
		font-size: 28rpx;
		color: #333;
	}
	.checkdel {
		padding: 0 40rpx;
		margin-right: 10rpx;
		height: 64rpx;
		line-height: 64rpx;
		display: flex;
		align-items: center;
		text-align: center;
		color: #666;
		font-size: 28rpx;
		border-radius: 37rpx;
		border: 1rpx solid #666;
	}
	
	.inner{
		width: 100%;
		margin-right:0;
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
		-webkit-transform: translateX(45px);
		transform: translateX(45px);
		margin-left: -48px;
		display: flex;
		align-items: center;
	}
	
	.touch-item {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
	movable-area {
		width: 100%;
		height: 200rpx;
	}
	
	movable-view {
		width: 100%;
		height: 100%;
	}
	
	.del{
		background-color: #ff4747;
		width: 45px;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
		-webkit-transform: translateX(50px);
		transform: translateX(50px);
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
	}
	
	.touch-move-active .inner,
	.touch-move-active .del {
	  -webkit-transform: translateX(0);
	  transform: translateX(0);
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
	.go-home {
		margin: 0 auto;
		width: 240rpx;
		height: 72rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ff6619;
		text-align: center;
		border-radius: 36rpx;
		border: 1rpx solid #ff6619;
	}
</style>
