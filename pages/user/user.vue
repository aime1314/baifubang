<template>
	<veiw>
		<!-- 其它 -->
		<view class="page-heard">
			<view class="iconfont icon-setting user_icon" @tap="toPage('/pages/user/setting/setting')"></view>
			<view class="iconfont icon-message user_icon" @tap="toPage('/pages/user/message/message')"></view>
		</view>
		<!-- 商户 -->
		<view class="page-heard-b">
			<template v-if="userPhoto == ''">
				<view class="tab-heard" @tap="toPage('/pages/user/auth/impower')">
					<image class="heard-image" src="/static/default.png"></image>
					<view class="heard-ct">
						<view class="name-edit">{{userName}}</view>
						<view class="desc">查看并编辑个人资料</view>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="tab-heard">
					<image class="heard-image" @tap="toPage('/pages/user/setting/setting')" :src="userPhoto"></image>
					<view class="heard-ct" @tap="toPage('/pages/user/setting/setting')">
						<view class="name-edit">{{userName}}</view>
						<view class="desc">查看并编辑个人资料</view>
					</view>
				</view>
			</template>

		</view>
		<!-- 记账量/钱包 -->
		<view class="money">
			<view class="money-m" @tap="toPage('/pages/user/manage/incomeAmount')">
				<view>{{bill_amount}}</view>
				<view>记账量</view>
			</view>
			<view class="money-m" v-if="wallet == 1" @tap="toPage('/pages/user/wallet')">
				<view>{{userMoney}}</view>
				<view>钱包</view>
			</view>
		</view>
		<view class="page-body">
			<view class="body-tab">
				<view class="tab-heard">
					<view class="mine-title">我的订单</view>
					<view class="sel-more"  @tap="toPage('/pages/order/orderList')">
						查看全部
						<image class="left-icon" src="/static/Left.png"></image>
					</view>
				</view>
				<view class="tab-body-b">
					<view class="body-ct" @tap="toPage('/pages/order/orderList?type=1')">
						<image src="/static/ic_user_wpay.png"></image>
						<view>待付款</view>
					</view>
					<view class="body-ct" @tap="toPage('/pages/order/orderList?type=2')">
						<image src="/static/ic_user_wsend.png"></image>
						<view>待发货</view>
					</view>
					<view class="body-ct" @tap="toPage('/pages/order/orderList?type=3')">
						<image src="/static/ic_user_shipped.png"></image>
						<view>已发货</view>
					</view>
					<view class="body-ct" @tap="toPage('/pages/order/orderList?type=4')">
						<image src="/static/ic_user_accomplish.png"></image>
						<view>已完成</view>
					</view>
				</view>
			</view>
			<view class="body-tab">
				<view class="tab-heard">
					<view class="mine-title">我的工具栏</view>
				</view>
				<view class="tab-body-f">
					<template>
						<template v-if="shopType != 1 && shop_display == 1">
							<view class="body-ct" @tap="toPage('/pages/auth/settleInfo')">
								<image src="/static/ic_user_kd2.png"></image>
								<text>商家入驻</text>
							</view>
						</template>
						<template v-if="promoter == 1">
							<view class="body-ct" @tap="toPage('/pages/user/manage/unionMerchants')">
								<image src="/static/ic_user_sh.png"></image>
								<text>联盟商户</text>
							</view>
						</template>
						<template v-if="shopType == 1">
							<view class="body-ct" @tap="toPage('/pages/merchant/manage/index')">
								<image src="/static/ic_user_kd.png"></image>
								<text>进入商家中心</text>
							</view>
						</template>
						<template v-if="agent == 1">
							<view class="body-ct" @tap="toPage('/pages/user/agent/index')">
								<image src="/static/ic_user_dl.png"></image>
								<text>进入代理中心</text>
							</view>
						</template>
						<view class="body-ct" @tap="toPage('/pages/takeout/follow')">
							<image src="/static/icon_focus.png"></image>
							<text>我的关注</text>
						</view>
						<view class="body-ct" @tap="toPage('/pages/takeout/collection')">
							<image src="/static/icon_collection.png"></image>
							<text>我的收藏</text>
						</view>
						<template v-if="false">
							<view class="body-ct" @tap="toPage('/pages/user/view?token=' + token)">
								<image src="/static/ic_user_dl.png"></image>
								<text>跳转页面</text>
							</view>
						</template>
					</template>
				</view>
			</view>
			<!-- 推广员拥有此广告位 -->
			<view class="body-tab" @tap="toPage('/pages/auth/pushIn')" v-if="shopType != 0 && promoter !=0 && agent != 0">
				<image class="body-gg" src="/static/icon_promoter.png"></image>
			</view>
			
		</view>
		
	</veiw>

</template>

<script>
	export default {

		data() {
			return {
				navheight: 0,
				userName: uni.getStorageSync('userName') || "立即登录",
				openid: "",
				unionid: "",
				userMoney: 0,
				bill_amount: 0,
				identity: 0,
				userPhoto: uni.getStorageSync('userPhoto') || "",
				shopType: 0,	// 是否商家0:否 1:是
				promoter: 0,	// 是否推广员0:否 1:是
				agent: 0,		// 是否代理0:否 1:是
				shop_display: 2,
				wallet: 2,
				loadIdentity: false,
				token: uni.getStorageSync("token") || ""
			}
		},
		onLoad() {
			
		},
		onShow() {
			// #ifdef MP-WEIXIN
			if (uni.getStorageSync("openId") && uni.getStorageSync('token')) {
				// 获取个人中心数据
				this.getuserinfo();
				this.getIdentity();
				this.getIndexType();
			}
			// #endif
		},
		methods: {
			// 首页导航控制
			getIndexType() {
				this.$api.getIndexType().then(res => {
					if(res.code == 200) {
						this.shop_display = res.data.shop_display;
						this.wallet = res.data.wallet;
					}
				});
			},
			// 获取身份
			getIdentity() {
				this.$api.getIdentity().then(res => {
					if(res.code == 200) {
						this.shopType = res.data.shopType;	// 是否商家
						this.agent = res.data.agent;	// 是否代理
						this.promoter = res.data.promoter;	// 是否推广员
						uni.setStorageSync("shopType", res.data.shopType);
						uni.setStorageSync("agent", res.data.agent);
						uni.setStorageSync("promoter", res.data.promoter);
						this.loadIdentity = true;
						if(this.promoter == 1) {
							this.toEditByPromoter();
						}
					}else if (res.code == 300) {
						uni.removeStorageSync("token");
						uni.removeStorageSync("shopType");
						uni.removeStorageSync("agent");
						uni.removeStorageSync("promoter");
					}
				});
			},
			
			// 推广员提现页面数据
			toEditByPromoter() {
				this.$api.toEditByPromoter().then(res => {
					if(res.code == 200) {
						this.userMoney = res.data.money;
					}
				});
			},
			
			// 获取个人中心数据
			getuserinfo() {
				this.$api.getuserinfo().then(res => {
					if(res.code == 200) {
						this.userName = res.data.userName || "这里是会员名";
						this.userMoney = res.data.userMoney || 0;
						this.bill_amount = res.data.bill_amount || 0;
						this.userPhoto = res.data.userPhoto;
						uni.setStorageSync("userName", res.data.userName);
						uni.setStorageSync("userPhoto", res.data.userPhoto);
						uni.setStorageSync("userSex", res.data.userSex);
					}else if (res.code == 300) {
						uni.removeStorageSync("token");
						uni.removeStorageSync("userName");
						uni.removeStorageSync("userPhoto");
						uni.removeStorageSync("userSex");
					}
				});
			},
			
			toPage(page) {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) {
					return uni.navigateTo({ url: "/pages/auth/impower" });
				}
				// #endif
				uni.navigateTo({ url: page })
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}
	.nav-bar {
		background-color: #ff6600;
		color: #FFFFFF;
		display: flex;
		justify-content: space-between;
	}

	.page-heard {
		padding: 0 20rpx;
		background-color: #ff6600;
		color: #FFFFFF;
		display: flex;
	}

	.page-heard {
		.icon-st {
			height: 50rpx;
			width: 50rpx;
		}

		.iconfont {
			margin-right: 30rpx;
		}

		.user_icon {
			font-size: 40rpx;
		}

	}

	.page-heard-b {
		background-color: #ff6600;
		color: #FFFFFF;
		display: flex;
		justify-content: space-between;

		.tab-heard {
			display: flex;
			align-content: flex-start;
			padding: 20rpx 0;
			width: 100%;
			justify-content: center;

			.heard-image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				border: 1rpx solid #fff;
			}

			.heard-ct {
				width: 350rpx;
				display: flex;
				padding-left: 10rpx;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				align-content: center;
				
				.name-edit {
					white-space:nowrap;
					text-overflow:ellipsis;
					-o-text-overflow:ellipsis;
					overflow: hidden;
					font-size: 28rpx;
				}
				view {
					width: 100%;
				}
				.desc {
					font-size: 26rpx;
				}

			}

			.store-st {
				padding: 10rpx 0 10rpx 0;
				background-color: #fcb36b;
				width: 35%;
				border-radius: 15rpx 0 0 15rpx;
				text-align: center;
				color: #FFFFFF;
			}

			.store-st-jinpai {
				padding: 10rpx 0 10rpx 0;
				width: 35%;
				border-radius: 15rpx 0 0 15rpx;
			}

			.mine-title {
				font-size: 30rpx;
			}

			.sel-more {
				font-size: 25rpx;
				padding: 0 20rpx;

			}


		}
	}

	.money {
		background-color: #ff6600;
		color: #FFFFFF;
		display: flex;
		justify-content: space-around;
		padding: 20rpx 0rpx;
		border-radius: 0 0 10rpx 10rpx;

		.money-m {
			align-items: center;
			
			view {
				text-align: center;
			}
		}

	}

	.page-body {
		padding: 0 20rpx;
		font-size: 30rpx;
		background-color: #f7f7f7;
	}

	.page-body {
		// margin-top: -50rpx;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 30rpx;

		.body-tab {
			display: flex;
			flex-direction: column;
			width: 101%;
			background-color: #ffffff;
			border-radius: 15rpx;
			margin-top: 20rpx;

			.tab-heard {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 20rpx 20rpx 20rpx;

				.heard-image {
					margin-top: -50rpx;
					width: 120rpx;
					height: 120rpx;
				}

				.heard-ct {
					display: flex;
					padding-left: 10rpx;
					justify-content: space-between;
					width: 50%;

					.role-st {
						display: flex;
						flex-direction: column;

						.name-st {
							display: flex;
							color: #ff6600;

							.name-edit {
								padding: 10rpx 15rpx;
							}
						}
					}

				}

				.store-st {
					padding: 10rpx 0 10rpx 0;
					background-color: #fcb36b;
					width: 35%;
					border-radius: 15rpx 0 0 15rpx;
					text-align: center;
					color: #FFFFFF;
				}

				.store-st-jinpai {
					padding: 10rpx 0 10rpx 0;
					width: 35%;
					border-radius: 15rpx 0 0 15rpx;
				}

				.mine-title {
					font-size: 28rpx;
				}

				.sel-more {
					font-size: 28rpx;
					align-items: center;
					padding: 0 20rpx;
					color: #cccccc;
					display: flex;

					.left-icon {
						width: 40rpx;
						height: 40rpx;
					}
				}

			}

			.tab-body-a {
				display: flex;
				justify-content: space-around;
				// padding: 20rpx 0;

				.body-ct {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 0 30rpx;
					// width: 21%;
				}

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}

			.line {
				height: 20rpx;
				width: 100%;
				background-color: #ff6600;
				margin-bottom: 20rpx;
				border-radius: 0 0 15rpx 15rpx;
			}

			.tab-body-b {
				display: flex;
				justify-content: space-around;
				margin: 0 0 20rpx;
				flex-wrap: wrap;
				border-top: 1rpx solid #eeeeee;

				.body-ct {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 0 35rpx;
					margin: 20rpx 0 0 0;
					font-size: 24rpx;
					text-align: center;

					view {
						margin-top: 10rpx;
					}
				}

				image {
					width: 60rpx;
					height: 60rpx;
				}
			}

			// 我的工具栏
			.tab-body-f {
				display: flex;
				justify-content: flex-start;
				margin: 0 0 20rpx;
				flex-wrap: wrap;
				// padding: 0 20rpx;
				border-top: 1rpx solid #eeeeee;

				.body-ct {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 0 15rpx;
					margin: 50rpx 0 0 0;
					font-size: 24rpx;
					text-align: center;

					text {
						margin-top: 16rpx;
						width: 150rpx;
					}
				}

				image {
					width: 60rpx;
					height: 60rpx;
				}
			}

			.tab-body-c {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.total-price {
					display: flex;
					flex-direction: column;
					align-items: center;
					// padding: 10rpx 0;

					.dec-text {
						font-size: 25rpx;
					}

					.dec-price {
						font-size: 40rpx;
					}
				}

				.profit-st {
					display: flex;
					justify-content: space-between;
					padding: 10rpx 40rpx;

					.profit-ct {
						display: flex;
						flex-direction: column;
						align-items: center;

						.dec-text {
							font-size: 25rpx;
							color: #a1a1a1;
						}

						.dec-price {
							font-size: 25rpx;
						}
					}
				}

				.save-btn {
					display: flex;
					justify-content: space-between;
					padding: 10rpx 40rpx;

					.btn-info-a {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 280rpx;
						height: 80rpx;
						margin: 20rpx 0;
						color: #fea042;
						background-color: #f9e3cd;
					}

					.btn-info-b {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 280rpx;
						height: 80rpx;
						margin: 20rpx 0;
						color: #FFFFFF;
						background-color: #ff6600;
					}


				}
			}

			.tab-body-d {
				display: flex;
				justify-content: space-around;
				margin: 20rpx 0;
				flex-wrap: wrap;
				padding: 0 20rpx;

				.body-ct {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 0 35rpx;
					margin: 20rpx 0;
				}

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}

			.tab-body-e {
				display: flex;
				justify-content: space-around;
				margin: 20rpx 0;
				flex-wrap: wrap;
				// padding: 0 20rpx;
				border-top: 1rpx solid #eeeeee;

				.body-ct {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 0 35rpx;
					margin: 20rpx 0;
				}


				.turnover {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 30rpx;
					margin: 20rpx 0;

					.yesterday {
						font-size: 25rpx;
						color: #9e9e9e;
					}
				}

				.order {
					display: flex;
					flex-direction: column;
					align-items: center;
					border-left: 1rpx dotted #000000;
					border-right: 1rpx dotted #000000;
					padding: 0 30rpx;
					margin: 20rpx 0;

					.yesterday {
						font-size: 25rpx;
						color: #9e9e9e;
					}
				}

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}

			image {
				width: 100%;
				height: 200rpx;
				border-radius: 15rpx;
			}
		}

		.body-gg {
			display: flex;
			background-color: #e5e5e5;
			justify-content: center;
			align-items: center;
			color: #f39d64;
			height: 160rpx;
			border-radius: 20rpx;
			font-weight: bold;
		}

		.body-pour {
			margin-top: 16rpx;
			color: #ed1a1a;
		}
	}
</style>
