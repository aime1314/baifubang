<template>
	<view>
		<view class="index_bg"></view>
		<view class="index_box">
			<view class="index_adderss">
				<image src="/static/adderss2.png"></image>
				<view class="index_addr_t" v-if="addressName">{{addressName}}</view>
			</view>
			<view class="index_search" @tap="toPage('/pages/index/search')">
				<image mode="aspectFill" src="/static/search.png"></image>
				<text>请输入搜索关键词</text>
			</view>
			<view class="swiper-wrap top">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper swiper_b" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
						 :duration="duration" indicator-color="#ffffff" indicator-active-color="#cccccc">
							<swiper-item v-for="(item, index) in bannerList" :key="index">
								<view class="swiper-item swiper-item-b">
									<image mode="aspectFill" :src="item.adFile"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<template v-if="type ==1">
				<view class="index_box_icon">
					<view class="index_icon" @tap="toPage('/pages/index/category')">
						<image src="/static/index_icon1.png"></image>
						<text>美食天地</text>
					</view>
					<view class="index_icon" @tap="showToast">
						<image src="/static/index_icon2.png"></image>
						<text>生活服务</text>
					</view>
					<view class="index_icon" @tap="showToast">
						<image src="/static/index_icon3.png"></image>
						<text>休闲娱乐</text>
					</view>
					<view class="index_icon" @tap="showToast">
						<image src="/static/index_icon4.png"></image>
						<text>酒店住宿</text>
					</view>
					<view class="index_icon">
						<image src="/static/index_icon5.png"></image>
						<text>更多分类</text>
					</view>
				</view>
			</template>
			
			<!--超级抢购-->
			<template v-if="goodsHotList.length > 0">
				<view class="index_box_super">
					<view class="index_super_top">
						<image src="/static/index_super.png"></image>
						<view class="index_super_tit"><text>超级</text>抢购</view>
					</view>
					<view class="index_super_con">
						<template v-for="(item, index) in goodsHotList">
							<view class="index_sup" :key="index" @tap="toGoodsDetail(item.goodsId)">
								<image mode="aspectFill" class="index_sup_img" :src="item.goodsImg"></image>
								<view class="index_suo_tit">{{item.goodsName}}</view>
								<view class="index_super_price">
									<view class="index_super_py">
										<view class="index_sup_y">￥{{item.shopPrice}}</view>
										<view class="index_sup_g">￥{{item.marketPrice}}</view>
									</view>
									<image @tap.stop="goGroup(item)" src="/static/index_add.png"></image>
								</view>
							</view>
						</template>
					</view>
				</view>
			</template>
			
			<!--推荐商家、精选好物-->
			<view class="index_box_shop">
				<view class="index_shop_top">
					<view class="index_shop_nav" :class="{shop_active : currentTab == 0}" @tap="changeTab(0)">{{nav1}}</view>
					<view class="index_shop_nav" :class="{shop_active : currentTab == 1}" @tap="changeTab(1)">{{nav2}}</view>
				</view>
				<!--推荐商家-->
				<view class="index_box_recom" v-if="currentTab == 0">
					<view class="recom_top">
						<view class="recom_top_tit" :class="{recon_active: sortType == 1}" @tap="changeSortType(1)">距离</image>
						</view>
						<view class="recom_top_tit" :class="{recon_active: sortType == 2}" @tap="changeSortType(2)">销量</view>
					</view>
					<template v-if="loadType == 1">
						<template v-for="(item, index) in recommendShop">
							<view class="recom_list" :key="index" @tap="toPage('/pages/shop/shop?shopId=' + item.shopId)">
								<image mode="aspectFill" class="recom_img" :src="item.shopImg"></image>
								<view class="recom_info">
									<view class="recom_tit">
										<text>{{item.shopName}}</text>
									</view>
									<view class="recom_con">
										<text class="recom_num">月售{{item.xl}}</text>
										<text class="recom_distance">{{item.jl}}</text>
									</view>
									<view class="recom_class">营业时间：{{item.serviceStartTime}} - {{item.serviceEndTime}}</view>
								</view>
							</view>
						</template>
					</template>
					<template v-if="loadType == 2">
						<template v-for="(item, index) in recommendShop2">
							<view class="recom_list" :key="index" @tap="toPage('/pages/shop/shop?shopId=' + item.shopId)">
								<image mode="aspectFill" class="recom_img" :src="item.shopImg"></image>
								<view class="recom_info">
									<view class="recom_tit">
										<text>{{item.shopName}}</text>
									</view>
									<view class="recom_con">
										<text class="recom_num">月售{{item.xl}}</text>
										<text class="recom_distance">{{item.jl}}</text>
									</view>
									<view class="recom_class">营业时间：{{item.serviceStartTime}} - {{item.serviceEndTime}}</view>
									<!-- <view class="recom_class">分类：百付邦商圈、理财</view> -->
								</view>
							</view>
						</template>
					</template>
					
				</view>
				<!--精选好物-->
				<view class="index_box_fine" v-if="currentTab == 1">
					<template v-for="(item, index) in goodsBaseList">
						<view class="fine_box" :key="index" @tap="toGoodsDetail(item.goodsId)">
							<image mode="aspectFill" class="fine_img" :src="item.goodsImg"></image>
							<view class="fine_tit">{{item.goodsName}}</view>
							<view class="fine_price">
								<view class="fine_y">￥{{item.shopPrice}}</view>
								<image @tap.stop="goGroup(item)" src="/static/index_add.png"></image>
							</view>
							<view class="fine_pro">
								<image mode="aspectFill" class="fine_pro_img" :src="item.shopImg"></image>
								<view class="fine_pro_infor">
									<view class="fine_pro_tit">{{item.shopName}}</view>
								</view>
							</view>
						</view>
					</template>

				</view>
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
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 500,
				page: 1,
				pageSize: 20,
				bannerList: [],
				goodsHotList: [],
				recommendShop: [],
				recommendShop2: [],
				goodsBaseList: [],
				amapPlugin: null,
				key: "58266a04ba4d85d62f696641cf7b9e53",
				addressName: "",
				sortType: 1, // 排序方式 默认销量排序 1销量排序 2距离排序
				currentTab: 0,
				isLoad: false,
				loadType: 1,	// 1 推荐商家-距离 2 推荐商家-销量 3 精选好物
				loadOne: 0,
				loadTow: 0,
				loadThree: 0,
				onePage: 1,
				towPage: 1,
				threePage: 1,
				isGoodsSpecDialog: false,
				goodsDetail: {},
				cartNum: 1,
				type: 2,
				nav1: "",
				nav2: ""
			}
		},
		onLoad() {
			this.amapPlugin = new amapFile.AMapWX({ key: this.key });
			let that = this;
			// #ifdef MP-WEIXIN
			uni.getSetting({
				success(res) {
					console.log(res);
					if (res.authSetting['scope.userLocation']) {
					}
				},
			});
			// #endif
			// 获取定位
			this.getRegeo();
			this.getIndexType();
			// 获取banner
			this.getBanner();
			// 获取超值抢购
			this.getGoodsHot();
			// 获取精选好物
			this.getGoodsBest(1);
			
			// 获取token
			// 如果有token
			// 请求接口，
			// 返回200 正常操作
			// 返回300 token已过期，需要删除缓存中的token，和其他用户信息
			// 获取token
			// #ifdef MP-WEIXIN
			if(uni.getStorageSync("token")) {
				// 请求接口
				// 获取用户身份
				this.getIdentity();
				// 返回200 正常操作
				// 返回300 token已过期，需要删除缓存中的token，和其他用户信息
			}else {
				// 没有token
				// 获取缓存中的openId
				if(uni.getStorageSync("openId")) {
					// 请求接口获取token
					this.getUserToken(uni.getStorageSync("openId"), 1);
				}else {
					// 没有缓存中的openId
					// 不执行操作，待用户点击，进内页的时候判断，跳转微信授权页面
				}
			}
			// #endif
			// 如果没有token 获取openId

			
			// 获取用户信息
			// this.getuserinfo();
			return;
			if (uni.getStorageSync("token")) return;
			
			// #ifdef MP-ALIPAY
			console.log("支付宝小程序");
			if (uni.getStorageSync("userId")) {
				console.log("有缓存支付宝userId");
				// 请求小程序openid判断账号是否已经存在
				// 判断返回code == 200 获取token，缓存token
				// 判断code == 1000 去注册页面
				this.getUserToken(uni.getStorageSync("userId"), 2);
			} else {
				console.log("没有缓存支付宝userId");
				// 跳转授权页面
				// 请求小程序openid判断账号是否已经存在
				// 判断返回code == 200 获取token，缓存token
				// 判断code == 1000 去注册页面
				uni.login({
					scopes: "auth_base",
					success(res) {
						console.log(res);
						that.getUserId(res.code);
					},
					fail(err) {
						console.log("未获取支付宝授权");
						console.log(err);
						return;
						uni.navigateTo({
							url: "/pages/auth/impower"
						});
					}
				});
			}
			// #endif
			// #ifdef MP-WEIXIN
			console.log("微信小程序");
			if (uni.getStorageSync("openId")) {
				console.log("有缓存微信小程序openId");
				this.getUserToken(uni.getStorageSync("openId"), 1);
			} else {
				console.log("没有缓存微信小程序openId");
				// uni.navigateTo({
				// 	url: "/pages/auth/impower"
				// });
			}
			// #endif
		},
		onShow() {
			// 获取购物车商品数量
			this.getCartCount();
		},
		// 上拉加载
		onReachBottom() {
			if (!this.isLoad) return;
			// 1 推荐商家-距离
			if(this.loadType == 1 && this.loadOne == 20) {
				this.isLoad = false;
				this.onePage = this.onePage+1;
				this.getRecommendShop();
			}
			// 2 推荐商家-销量
			if(this.loadType == 2 && this.loadTow == 20) {
				this.isLoad = false;
				this.towPage = this.towPage+1;
				this.getRecommendShop2();
			}
			// 3 精选好物
			if(this.loadType == 3 && this.loadThree == 20) {
				this.isLoad = false;
				this.threePage = this.threePage+1;
				this.getGoodsBest();
			}
		},
		methods: {
			
			// 获取身份
			getIdentity() {
				if (!uni.getStorageSync("token")) return;
				this.$api.getIdentity().then(res => {
					if (res.code == 200) {
						uni.setStorageSync("shopType", res.data.shopType);
						uni.setStorageSync("agent", res.data.agent);
						uni.setStorageSync("promoter", res.data.promoter);
					}else if (res.code == 300) {
						console.log("token过期了");
						uni.removeStorageSync("token");
						uni.removeStorageSync("shopType");
						uni.removeStorageSync("agent");
						uni.removeStorageSync("promoter");
					}
				});
			},
			
			// 获取个人中心数据
			getuserinfo() {
				if (!uni.getStorageSync("token")) return;
				this.$api.getuserinfo().then(res => {
					if (res.code == 200) {
						uni.setStorageSync("userName", res.data.userName);
						uni.setStorageSync("userPhoto", res.data.userPhoto);
						uni.setStorageSync("userSex", res.data.userSex);
					}
				});
			},
			
			// 加入购物车
			goGroup(item) {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) {
					return uni.navigateTo({
						url: "/pages/auth/impower"
					});
				}
				// #endif
				this.goodsDetail = item;
				this.isGoodsSpecDialog = true;
			},
			
			closeGoodsSpecDialog() {
				this.isGoodsSpecDialog = false;
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
					// 获取购物车商品数量
					this.getCartCount();
				});
			},
			
			// 提示
			showToast() {
				uni.showToast({
					title: "功能模版正在开发中，敬请期待...",
					icon: 'none'
				})
			},
			
			// 获取定位
			getRegeo() {
				// #ifdef MP-WEIXIN
				// uni.showLoading({
				// 	title: '获取信息中'
				// });
				// #endif
				this.amapPlugin.getRegeo({
					success: res => {
						this.addressName = res[0].name;
						// 纬度
						this.latitude = res[0].latitude;
						// 经度
						this.longitude = res[0].longitude;
						uni.setStorageSync("latitude", res[0].latitude);
						uni.setStorageSync("longitude", res[0].longitude);
						// 获取推荐商家
						this.getRecommendShop();
						this.getRecommendShop2();
						// #ifdef MP-WEIXIN
						// uni.hideLoading();
						// #endif
					},
					fail: err => {
						this.addressName = "请选择定位";
						// 获取推荐商家
						this.getRecommendShop();
						this.getRecommendShop2();
						// #ifdef MP-WEIXIN
						// uni.hideLoading();
						// #endif
						console.log(err);
					}
				});
			},

			// 获取banner图片
			getBanner() {
				let config = {
					positionType: 3,
					positionCode: "ads-index"
				}
				this.$api.getBanner(config).then(res => {
					this.bannerList = res.data;
				});
			},
			
			// 首页导航控制
			getIndexType() {
				this.$api.getIndexType().then(res => {
					if(res.code == 200) {
						this.type = res.data.type;
						this.nav1 = res.data.nav1;
						this.nav2 = res.data.nav2;
					}
				});
			},

			// 获取超值抢购
			getGoodsHot() {
				let config = {
					page: 1,
					pageSize: 3,
				}
				this.$api.getGoodsHot(config).then(res => {
					if (res.code == 200) {
						this.goodsHotList = res.data;
					}
				});
			},

			// 获取推荐商家
			getRecommendShop() {
				let config = {
					lat: this.latitude,
					lng: this.longitude,
					page: this.onePage,
					pageSize: this.pageSize,
					sortType: 1
				}
				this.$api.getRecommendShop(config).then(res => {
					if (res.code == 200) {
						this.isLoad = true;
						this.loadOne = res.data.length;
						this.recommendShop = this.recommendShop.concat(res.data.list);
					}
				});
			},
			
			getRecommendShop2() {
				let config = {
					lat: this.latitude,
					lng: this.longitude,
					page: this.towPage,
					pageSize: 20,
					sortType: 2
				}
				this.$api.getRecommendShop(config).then(res => {
					if (res.code == 200) {
						this.isLoad = true;
						this.loadTow = res.data.length;
						this.recommendShop2 = this.recommendShop2.concat(res.data.list);
					}
				});
			},

			changeSortType(sortType) {
				if (this.sortType == sortType) return;
				this.sortType = sortType;
				this.loadType = sortType;
				// this.page = 1;
				// this.recommendShop = [];
				// this.getRecommendShop();
			},

			// 获取精选好物
			getGoodsBest() {
				let config = {
					page: this.threePage,
					pageSize: 20
				}
				this.$api.getGoodsBest(config).then(res => {
					if (res.code == 200) {
						this.isLoad = true;
						this.loadThree = res.data.length;
						this.goodsBaseList = this.goodsBaseList.concat(res.data);
					}
				});
			},

			// #ifdef MP-ALIPAY
			// 获取支付宝userId
			getUserId(code) {
				console.log(code);
				let config = {
					code: code
				}
				this.$api.getUserId(config).then(res => {
					uni.setStorageSync("userId", res.data.zfb_user_id);
					this.getUserToken(res.data.zfb_user_id, 2);
				})
			},
			// #endif
			
			// 获取用户token
			getUserToken(id, type) {
				let config = {
					type: type
				}
				if (type == 1) config.openid = id;
				if (type == 2) config.zfb_user_id = id;
				this.$api.getUserToken(config).then(res => {
					if (res.code == 200) {
						let token = res.data.token;
						// #ifdef MP-WEIXIN
						uni.setStorageSync("token", token);
						// #endif
						// #ifdef MP-ALIPAY
						uni.setStorageSync("token", token);
						// #endif
					} else if (res.code == 1000) {
						uni.navigateTo({
							url: "/pages/auth/login"
						});
					}
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
			
			toPage(page) {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) {
					return uni.navigateTo({
						url: "/pages/auth/impower"
					});
				}
				// #endif
				uni.navigateTo({ url: page });
			},
			
			// 查看商品详情
			toGoodsDetail(data) {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) {
					return uni.navigateTo({ url: "/pages/auth/impower" });
				}
				// #endif
				uni.navigateTo({
					url: `/pages/shop/detail?data=${data}`
				})
			},
			
			// 切换精选好物和推荐商家
			changeTab(num) {
				if (this.currentTab == num) return;
				this.currentTab = num;
				if(this.currentTab == 1) {
					this.loadType = 3;
				}else {
					this.loadType = this.sortType;
				}
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
					}else if(res.code == 300) {
						return;
					}else if(res.code == 400) {
						return;
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
		display: felx;
		justify-content: center;
	}

	.index_bg {
		width: 100%;
		height: 400rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.index_box {
		background: linear-gradient(to top, #f7f7f7, #ff6619 70%) top;
		background-size: 750rpx 400rpx;
		background-repeat: no-repeat;
	}

	.index_adderss {
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
	}

	.index_adderss image {
		width: 44rpx;
		height: 44rpx;
		flex-shrink: 0;
	}

	.index_addr_t {
		margin-left: 20rpx;
		width: 600rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.index_search {
		margin-bottom: 20rpx;
		margin-left: 29rpx;
		width: 692rpx;
		height: 70rpx;
		background: #FFFFFF;
		border-radius: 36rpx;
		display: flex;
		align-items: center;
	}

	.index_search image {
		margin-left: 57rpx;
		width: 38rpx;
		height: 38rpx;
		flex-shrink: 0;
	}

	.index_search text {
		margin-left: 10rpx;
		width: 560rpx;
		font-size: 30rpx;
		color: #ccc;
	}
	
	.swiper-wrap {
		width: 690rpx;
		margin: 0 auto;
	}

	.swiper_b {
		width: 690rpx;
		height: 275rpx;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, .1);
		border-radius: 15rpx;
	}
	
	.swiper_b swiper-item {
		border-radius: 15rpx;
		overflow: hidden;
	}

	.swiper-item-b {
		width: 692rpx;
		height: 275rpx;
		border-radius: 15rpx;
	}

	.swiper-item-b image {
		
		border-radius: 15rpx;
	}

	.index_note {
		margin: 22rpx auto 0;
		width: 690rpx;
		height: 70rpx;
		border-radius: 10rpx;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		box-shadow: 0 3rpx 6rpx rgba(0, 0, 0, 0.16);
	}

	.index_note image {
		margin-left: 40rpx;
		width: 44rpx;
		height: 44rpx;
		flex-shrink: 0;
	}

	.swiper_n {
		width: 560rpx;
		height: 80rpx;
	}

	.swiper-item-n {
		width: 560rpx;
		height: 80rpx;
		line-height: 80rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.index_box_icon {
		margin-top: 28rpx;
		// margin-left: 29rpx;
		width: 720rpx;
		margin: 30rpx auto 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.index_icon {
		margin: 0rpx 20rpx;
		text-align: center;
	}

	.index_icon image {
		width: 100rpx;
		height: 100rpx;
	}

	.index_icon text {
		font-size: 26rpx;
		color: #000000;
	}

	/*超级抢购*/
	.index_box_super {
		padding: 0rpx 20rpx 8rpx 20rpx;
		margin-left: 20rpx;
		margin-top: 40rpx;
		width: 710rpx;
		background: #ffffff;
		border-radius: 10rpx;
	}

	.index_super_top {
		padding-top: 27rpx;
		margin-bottom: 29rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.index_super_top image {
		width: 44rpx;
		height: 44rpx;
	}

	.index_super_tit {
		margin-left: 5rpx;
		font-size: 34rpx;
		color: #333333;
	}

	.index_super_tit text {
		color: #FF6619;
	}

	.index_super_con {
		display: flex;
		justify-content: space-between;
	}

	.index_sup {
		padding: 10rpx 0;
		width: 200rpx;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
	}

	.index_sup_img {
		width: 200rpx;
		height: 180rpx;
		border: 1rpx solid #E5E5E5;
		border-radius: 10rpx;
	}

	.index_suo_tit {
		margin: 12rpx 0;
		font-size: 30rpx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.index_suo_tit2 {
		font-size: 20rpx;
		color: #666666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.index_super_price {
		margin-bottom: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.index_super_py {
		display: flex;
		flex-direction: column;
	}

	.index_sup_y {
		font-size: 32rpx;
		font-weight: bold;
		color: #FF6619;
		flex-shrink: 0;
	}
	.index_sup_y text{
		font-size: 26rpx;
	}

	.index_sup_g {
		font-size: 26rpx;
		color: #999999;
		text-decoration: line-through;
		flex-shrink: 0;
	}

	.index_super_price image {
		width: 40rpx;
		height: 40rpx;
		flex-shrink: 0;
	}

	/*推荐商家、精选好物*/
	.index_box_shop {
		margin: 24rpx auto 0;
		width: 710rpx;
		padding-bottom: 20rpx;
	}

	.index_shop_top {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.index_shop_nav {
		position: relative;
		margin-right: 90rpx;
		width: 140rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 32rpx;
		color: #999999;
	}

	.index_shop_nav.shop_active {
		color: #333;
	}

	.index_shop_nav.shop_active::before {
		content: "";
		position: absolute;
		bottom: 5rpx;
		left: 0;
		right: 0;
		width: 50%;
		height: 7rpx;
		background: #ff6619;
		margin: 0 auto;
		border-radius: 3rpx;
	}

	/*精选好物*/
	.index_box_fine {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.fine_box {
		padding: 22rpx 22rpx;
		margin-top: 28rpx;
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
		margin-top: 14rpx;
		font-size: 30rpx;
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
		margin-top: 12rpx;
		margin-bottom: 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.finer_py {
		display: flex;
		flex-direction: column;
	}

	.fine_y {
		font-size: 34rpx;
		/* font-weight: bold; */
		color: #FF6619;
		flex-shrink: 0;
	}
	.fine_y text {
		font-size: 28rpx;
	}

	.fine_price image {
		width: 40rpx;
		height: 40rpx;
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
		border-radius: 10rpx;
		border: solid 1rpx #E5E5E5;
	}

	.fine_pro_infor {
		margin-left: 12rpx;
		width: 236rpx;
		display: flex;
		flex-direction: column;
	}

	.fine_pro_tit {
		font-size: 24rpx;
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

	/*推荐商家*/
	.recom_top {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.recom_top_tit {
		margin-right: 30rpx;
		font-size: 30rpx;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.recon_active {
		color: #ED6C18;
	}

	.recom_top_tit image {
		margin-left: 12rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.recom_list {
		padding: 20rpx;
		margin: 20rpx auto 0;
		width: 710rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.recom_img {
		width: 140rpx;
		height: 140rpx;
		border-radius: 8rpx;
		border: solid 2rpx #E5E5E5;
		flex-shrink: 0;
	}

	.recom_tel {
		width: 55rpx;
		height: 55rpx;
		flex-shrink: 0;
	}

	.recom_info {
		margin-left: 20rpx;
		width: 512rpx;
	}

	.recom_tit {
		margin-bottom: 12rpx;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.recom_tit text {
		font-size: 34rpx;
		// font-weight: bold;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.recom_con text {
		font-size: 28rpx;
	}

	.recom_num {
		/* font-weight: bold; */
		color: #ED6C18;
	}

	.recom_distance {
		margin-left: 12rpx;
		margin-right: 30rpx;
		/* font-weight: bold; */
		color: #333333;
	}

	.recom_time {
		color: #666666;
	}

	.recom_class {
		margin-top: 2rpx;
		font-size: 28rpx;
		color: #999999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.recom_box_dec {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.recom_dec {
		padding: 2rpx 26rpx;
		margin-top: 10rpx;
		margin-right: 12rpx;
		border: 1rpx solid #999999;
		border-radius: 8rpx;
		font-size: 22rpx;
		color: #666666;
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
