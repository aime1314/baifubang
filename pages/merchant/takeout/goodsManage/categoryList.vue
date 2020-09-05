<template>
	<view class="content">
		<view class="list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="label">{{item.title}}</view>
				<image src="/static/icon_small_del.png" @tap="delItem(item)" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			this.getCategoryList();
		},
		onShow() {
			
		},
		methods: {
			getCategoryList() {
				this.$api.getCategoryList().then(res => {
					if(res.code == 200) {
						this.list = res.data;
					}
				})
			},
			
			delItem(item) {
				let config = {
					sid: item.id
				}
				this.$api.delSort(config).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: "删除成功",
							icon: "none"
						});
						this.getCategoryList();
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
	
	.list {
		border-top: 20rpx solid #f7f7f7;
		
		.item {
			padding: 0 30rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #f7f7f7;
			
			.label {
				font-size: 28rpx;
				color: #333;
			}
			
			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
</style>
