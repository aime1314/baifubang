<template>
	<view class="content">
		<!-- <view class="form-box">
			<view class="form-area">
				<image class="messages_icon" src="/static/message_icon1.png"></image>
				<view class="messages_box">
					<view class="messages_one">
						<view class="messages_tit">优惠精选</view>
						<view class="messages_tim">昨天 17:48</view>
					</view>
					<view class="messages_one messages_align">
						<view class="messages_con">这里是介绍就是介绍这个东西是干啥滴这里是这里是介绍就是介绍这个东西是干啥滴这里是这里是介绍就是介绍这个东西是干啥滴这里是 介绍就是介绍这个东西是干啥滴</view>
						<image class="messages_img" src="/static/img.png"></image>
					</view>
				</view>
			</view>
		</view> -->
		<view class="form-box" v-if="Object.keys(msg).length > 0">
			<view class="form-area" @tap="toPage('/pages/user/message/detail')">
				<image class="messages_icon" src="/static/message_icon2.png"></image>
				<view class="messages_box">
					<view class="messages_one">
						<view class="messages_tit">交易信息</view>
						<view class="messages_tim">{{msg.createTime}}</view>
					</view>
					<view class="messages_one messages_align">
						<view class="messages_con">{{msg.msgContent}}</view>
						<image class="messages_img" :src="msg.msgImg"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="form-box">
			<view class="form-area">
				<image class="messages_icon" src="/static/message_icon3.png"></image>
				<view class="messages_box">
					<view class="messages_one">
						<view class="messages_tit">红包助手</view>
						<view class="messages_tim">昨天 17:48</view>
					</view>
					<view class="messages_one messages_align">
						<view class="messages_con">这里是介绍就是介绍这个东西是干啥滴这里是这里是介绍就是介绍这个东西是干啥滴这里是这里是介绍就是介绍这个东西是干啥滴这里是 介绍就是介绍这个东西是干啥滴</view>
						<image class="messages_img" src="/static/img.png"></image>
					</view>
				</view>
			</view>
		</view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: {}
			}
		},
		onLoad() {
			this.getMessagesList();
		},
		methods: {
			getMessagesList() {
				this.$api.getMessagesList().then(res => {
					if(res.code == 200) {
						if(typeof res.data.msg == 'object') {
							this.msg = res.data.msg;
						}
						
					}
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
	.messages_icon{
		width: 44rpx;
		height: 44rpx;
		flex-shrink: 0;
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
		font-size: 28rpx;
		color: #333333;
	}
	.messages_tim{
		font-size: 22rpx;
		color: #999999;
	}
	.messages_con{
		margin-right: 30rpx;
		font-size: 24rpx;
		color: #666666;
		display: -webkit-box;	
		-webkit-box-orient: vertical;	
		-webkit-line-clamp: 3;	
		overflow: hidden;
	}
	.messages_img{
		width: 88rpx;
		height: 88rpx;
		flex-shrink: 0;
	}
</style>
