<template>
	<view class="content">
		<view class="list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="img-box">
					<image class="img" mode="aspectFill" :src="item.img" ></image>
					<image class="play" src="/static/icon_takeout_play.png" mode="aspectFill"></image>
				</view>
				<view class="info-box">
					<view class="desc">{{item.content}}</view>
					<view class="toolbar">
						<view class="handle" @tap="toDetail(item.id)">
							<image src="/static/icon_small_mess.png" mode="aspectFill"></image>
							<text>评论</text>
						</view>
						<view class="handle" @tap="delVideo(item.id, index)">
							<image src="/static/icon_small_del.png" mode="aspectFill"></image>
							<text>删除</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				pagesize: 20,
				list: [],
				pageLength: 0,
				isLoad: false,
			};
		},
		
		onShow() {
			this.getMyVideoList();
		},
		
		onHide() {
			this.page = 1;
			this.pageLength = 0;
			this.list = [];
		},
		
		// 上拉加载
		onReachBottom() {
			if(!this.isLoad) return;
			if(this.pageLength ==  20) {
				this.isLoad = false;
				this.page = this.page+1;
				this.getMyVideoList();
			}
		},
		
		methods: {
			getMyVideoList() {
				let config = {
					page: this.page,
					page_size: this.pagesize
				}
				this.$api.getMyVideoList(config).then(res => {
					if(res.code == 200) {
						let list = res.data;
						this.isLoad = true;
						this.pageLength = list.length;
						this.list = this.list.concat(list);
					}
				})
			},
			
			// 查看视频详情
			toDetail(id) {
				uni.navigateTo({
					url: "/pages/takeout/video?id=" + id
				})
			},
			
			delVideo(id, index) {
				let config = {
					id: id
				}
				this.$api.delVideo(config).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: "删除成功",
							icon: "none"
						});
						this.list = [];
						this.page = 1;
						this.getMyVideoList();
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
	}
	
	.list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 10rpx 0 0;
		
		.item {
			width: 750rpx;
			background-color: #fff;
			padding: 30rpx 30rpx;
			margin-bottom: 20rpx;
			
			.img-box {
				width: 690rpx;
				height: 480rpx;
				margin: 0 auto 20rpx;
				position: relative;
				
				.img {
					width: 690rpx;
					height: 480rpx;
				}
				
				.play {
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					margin: auto;
					width: 80rpx;
					height: 80rpx;
				}
			}
		}
	}
	
	.info-box {
		margin: 0 auto;
		background-color: #fff;
		
		.desc {
			font-size: 30rpx;
			color: #333;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			margin-bottom: 38rpx;
		}
		
		.toolbar {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			
			.handle {
				display: flex;
				align-items: center;
				margin-left: 30rpx;
				
				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
				}
				
				text {
					font-size: 26rpx;
					color: #999;
				}
			}
			
		}
	}
	
</style>
