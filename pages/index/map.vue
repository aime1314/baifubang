<template>
	<view class="container">
		<view class="map-container">
			<!-- 状态栏 -->
			<view class="custom-nav" :style="{heght: navBarH + 'rpx'}"></view>
			<!-- 自定义导航栏 -->
			<view class="custom-back">
				<button class="custom-back_btn" @tap="goBack" size="mini" type="primary">确定</button>
				<text class="custom-navBar_title">当前位置</text>
			</view>
		</view>
		<map class="map" id="map" :style="{height: mapHeight + 'vh'}" :latitude="latitude" :longitude="longitude"
		 :show-compass="showCompass" scale="14" :show-location="showLocation"></map>
		<!-- 地址列表 -->
		<scroll-view @scroll="onScroll" scroll-y="true" class="list">
			<view class="item" @tap="selectAddress" data-idx="0">
				<view class="address">{{desc}}</view>
				<view class="desc">{{currentLocation}}</view>
				<uni-icons type="success_no_circle" size="20" class="icon" v-if="selectIndex === 0"></uni-icons>
			</view>
			<view class="item" v-for="(item, index) in positionData" :key="index" @tap="selectAddress" :data-idx="index + 1">
				<view class="address">{{item.name}}</view>
				<view class="desc">{{item.pname}}{{item.cityname}}{{item.adname}}{{item.address}}</view>
				<uni-icons v-if="selectIndex === index + 1" class="icon" size="20" type="success_no_circle"></uni-icons>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import amapFile from "../../common/amap-wx.js";
	export default {
		data() {
			return {
				key: "58266a04ba4d85d62f696641cf7b9e53",
				latitude: 39.984120, //116.403124,39.940693
				longitude: 116.307484,
				navBarH: 40, // 自定义导航栏高度，默认高度40rpx，iPhone6标准
				mapHeight: 40, // 地图高度
				positionData: [],
				selectIndex: 0, // 默认选中第一个
				locationAddress: null, // 街道地址
				subLocationAddress: null, // 地址备用
				currentLocation: '', // 当前定位地址
				showCompass: true,
				showLocation: true,
			};
		},
		onLoad() {
			this.setSysNavH(); // 设置自定义导航栏高度
			this.openMap(); // 地图定位
		},

		methods: {

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

				// 周边位置
				myAmapFun.getPoiAround({
					success: res => {
						this.positionData = res.poisData;
					},
					fail: info => {
						uni.showModal({
							title: info.errMsg
						});
					}
				});
			},

			// 滚动监听
			onScroll(e) {
				let scrolly = e.detail.scrollTop;
				if (scrolly > 20) {
					this.mapHeight = 20;
				}
				if (scrolly < 100) {
					this.mapHeight = 40;
				}
			},

			// 选择地址
			selectAddress(e) {
				let index = Number(e.currentTarget.dataset.idx);
				let pos = this.positionData[index].location.split(',');
				this.longitude = Number(pos[0]);
				this.latitude = Number(pos[1]);
				this.selectIndex = index;

				if (index > 0) {
					this.locationAddress = this.positionData[index - 1].address + this.positionData[index - 1].name;
				} else {
					this.locationAddress = this.subLocationAddress;
				}
			},

			// 获取系统状态栏高度，自定义高度
			setSysNavH() {
				uni.getSystemInfo({
					success: res => {
						this.navBarH = res.statusBarHeight * 2
					}
				});
			},

			// 自定义返回
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},

		}
	}
</script>

<style lang="scss">
	.container {
		padding-bottom: env(safe-area-inset-bottom);
		display: flex;
		height: 100vh;
		flex-direction: column;
	}

	.map {
		width: 100vw;
		transition: all .2s;
	}

	/* 状态栏高度 */
	.custom-nav {
		background-color: #fff;
	}

	/* 自定义返回 */
	.custom-back {
		position: relative;
		padding-left: 20rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
	}

	.custom-back_btn {
		border-radius: 8rpx;
	}

	.custom-navBar_title {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		line-height: 88rpx;
		font-size: 36rpx;
		font-weight: 500;
	}

	/* 列表数据 */
	.list {
		flex: 1;
		padding: 0 30rpx;
		overflow: hidden;
	}

	.item {
		width: 690rpx;
		position: relative;
		padding: 16rpx 0;
		border-bottom: 2rpx solid #eee;
	}

	.address {
		font-size: 32rpx;
		line-height: 1.5;
		font-weight: 500;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.desc {
		width: 690rpx;
		font-size: 28rpx;
		line-height: 1.5;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.icon {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 20rpx;
	}
</style>
