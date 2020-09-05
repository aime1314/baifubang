<template>
	<view class="content">
		<template v-for="(item, index) in messageList">
			<view class="form-box" :key="index">
				<view class="form-area">
					<image class="messages_img" :src="item.msgImg"></image>
					<view class="messages_box">
						<view class="messages_one">
							<view class="messages_tit">{{item.msgContent}}</view>
							<view class="messages_tim">{{item.createTime}}</view>
						</view>
						<view class="messages_one messages_align">
							<view class="messages_con">{{item.msgContent}}</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messageList: []
			}
		},
		onLoad() {
			this.getMessagesDetail();
		},
		methods: {
			getMessagesDetail() {
				this.$api.getMessagesDetail().then(res => {
					this.messageList = res.data.data;
				});
			}
		}
	}
</script>

<style>
	.content{
		min-height: 100%;
		background: #F4F4F4;
		padding-top: 5rpx;
		padding-bottom: 30rpx;
	}
	.mess_deatil_tim{
		margin: 20rpx auto;
		padding: 4rpx 0rpx;
		width: 180rpx;
		border-radius: 8rpx;
		text-align: center;
		background: #CCCCCC;
		font-size: 24rpx;
		color: #FFFFFF;
	}
	.form-box {
		width: 690rpx;
		margin-top: 20rpx;
		margin-left: 30rpx;
		background: #fff;
		box-shadow: 3rpx 3rpx 6rpx rgba(0,0,0,0.28);
		border-radius: 8rpx;
	}
	.form-area {
		padding: 20rpx;
		display: flex;	
		justify-content: space-between;
	}
	.messages_box{
		margin-left: 12rpx;
	}
	.messages_one{
		display: flex;
		justify-content: space-between;
	}
	.messages_align{
		margin-top: 12rpx;
		align-items: center;
	}
	.messages_tit{
		width: 400rpx;
		font-size: 28rpx;
		color: #333333;
		overflow:hidden;	
		text-overflow:ellipsis;	
		white-space:nowrap;
	}
	.messages_tim{
		font-size: 22rpx;
		color: #999999;
	}
	.messages_con{
		margin-right: 15rpx;
		font-size: 24rpx;
		color: #666666;
		display: -webkit-box;	
		-webkit-box-orient: vertical;	
		-webkit-line-clamp: 2;	
		overflow: hidden;
	}
	.messages_img{
		width: 120rpx;
		height: 120rpx;
		flex-shrink: 0;
	}
</style>
