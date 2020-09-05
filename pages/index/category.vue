<template>
	<view>
		<view class="index_box_icon">
			<view class="index_icon" v-for="(item, index) in classList" :key="index" @tap="toPage('/pages/index/categoryDatail?catId=' + item.catId)">
				<image mode="aspectFill" :src="item.catImg"></image>
				<text>{{item.simpleName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				classList: []
			}
		},
		onLoad() {
			this.goodsClassList();
		},
		methods: {
			goodsClassList() {
				let config = {
					catId: 0
				}
				this.$api.goodsClassList(config).then(res => {
					this.classList = res.data;
				})
			},
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			}
		}
	}
</script>

<style>
	.category_bar{
		padding-left: 29rpx;
		height: 90rpx;
		background: #F7F7F7;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
	}
	.category_box_class{
		margin-left: 29rpx;
		width: 692rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.category_class{
		margin-top: 25rpx;
		width: 217rpx;
		height: 75rpx;
		line-height: 75rpx;
		text-align: center;
		background: #F8F8F8;
		border-radius: 20rpx;
		font-size: 28rpx;
		color: #666666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.category_tit{
		margin: 50rpx 0rpx 50rpx 29rpx;
		width: 692rpx;	
		font-size: 28rpx;
		/* font-weight: bold; */
		color: #333333;
	}
	.index_box_icon {
		margin-top: 28rpx;
		margin-left: 29rpx;
		width: 692rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.index_icon {
		margin: 0rpx 20rpx 50rpx 20rpx;
		text-align: center;
	}
	
	.index_icon image {
		width: 130rpx;
		height: 130rpx;
	}
	
	.index_icon text {
		font-size: 26rpx;
		color: #000000;
	}
</style>
