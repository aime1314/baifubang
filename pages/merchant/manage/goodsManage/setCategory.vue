<template>
	<view class="center">
		<view class="cat_detail_left">
			<scroll-view class="scroll-Y" scroll-y="true">
				<template v-for="(item, index) in levelOneClass">
					<view class="scroll-view-item" :class="{scroll_active: oneIndex == index}" @tap="getLevelTowClass(item.catId, index)" :key="index">{{item.simpleName}}</view>
				</template>
			</scroll-view>
		</view>
		<view class="cat_detail_con">
			<scroll-view class="scroll-Y" scroll-y="true">
				<template v-for="(item, index) in levelTowClass">
					<view class="scroll-view-item" :class="{scroll_active: towIndex == index}" @tap="getLevelThreeClass(item.catId, index)" :key="index">{{item.simpleName}}</view>
				</template>
			</scroll-view>
		</view>
		<view class="cat_detail_right">
			<scroll-view class="scroll-Y" scroll-y="true">
				<template v-for="(item, index) in levelThreeClass">
					<view class="scroll-view-item" @tap="changeGoodsCatId(item.catId, item.simpleName)">{{item.simpleName}}</view>
				</template>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oneIndex: 0,
				towIndex: 0,
				threeIndex: 0,
				levelOneClass: [],
				levelTowClass: [],
				levelThreeClass: [],
			}
		},
		onLoad() {
			this.getLevelOneClass(this.oneIndex);
		},
		methods: {
			// 获取一级分类
			getLevelOneClass() {
				let config = {
					catId: 0
				}
				this.$api.goodsClassList(config).then(res => {
					this.levelOneClass = res.data;
					this.getLevelTowClass(this.levelOneClass[0].catId, this.oneIndex);
				})
			},
			
			// 获取二级分类
			getLevelTowClass(catId, index) {
				this.oneIndex = index;
				this.levelOneName = this.levelOneClass[index].simpleName;
				this.Path1 = catId;
				this.towIndex = 0;
				let config = {
					catId: catId
				}
				this.$api.goodsClassList(config).then(res => {
					this.levelTowClass = res.data;
					this.getLevelThreeClass(this.levelTowClass[this.towIndex].catId, 0);
				});
			},
			
			// 获取三级分类
			getLevelThreeClass(goodsListId, index) {
				this.towIndex = index;
				this.levelTowName = this.levelTowClass[this.towIndex].simpleName;
				this.Path2 = goodsListId;
				let config = {
					catId: goodsListId
				}
				this.$api.goodsClassList(config).then(res => {
					this.levelThreeClass = res.data;
				});
			},
			
			// 选择分类
			changeGoodsCatId(id, name) {
				this.goodsCatId = id;
				uni.setStorageSync("Path1", this.Path1);
				uni.setStorageSync("Path2", this.Path2);
				uni.setStorageSync("goodsCatId", this.goodsCatId);
				uni.setStorageSync("categoryText", `${this.levelOneName} - ${this.levelTowName} - ${name}`);
				uni.navigateBack({delta: 1});
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.center{
		display: flex;
		// justify-content: space-between;
		height: 100%;
	}
	
	.cat_detail_left {
		width: 187rpx;
		height: 100%;
		background: #e9e9e8;
		flex-shrink: 0;
	}
	.cat_detail_con {
		width: 187rpx;
		height: 100%;
		background: #F5F5F5;
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
	
	
</style>
