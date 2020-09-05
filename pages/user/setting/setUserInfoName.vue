<template>
	<view>
		<view class="pay-item">
			<view class="text">昵称</view>
			<input type="text" v-model="nickname" placeholder="请输入昵称" />
		</view>
		
		<view class="but" @tap="editUserInfo">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: "",
				userPhoto: "",
				brithday: "",
				userSex: 0,
			}
		},
		onLoad(options) {
			this.nickname = options.nickname;
			this.userPhoto = options.userPhoto;
			this.brithday = options.brithday;
			this.userSex = options.userSex;
		},
		methods: {
			editUserInfo() {
				let config = {
					nickname: this.nickname,
					userSex: this.userSex,
					brithday: this.brithday,
					userPhoto: this.userPhoto
				}
				this.$api.editUserInfo(config).then(res => {
					if(res.code == 200) {
						uni.navigateBack({
							delta: 1
						});
					}
				});
			}
		}
	}
</script>

<style>
	page {
		background: #F7F7F7;
		font-size: 28rpx;
	}
	
    .pay-item {
		flex: 1;
		display: flex;
		align-items: center;
		flex-flow: row;
		justify-content: space-between;
		margin-top: 20rpx;
		background: #ffffff;
		padding: 28rpx 30rpx;
	}
	
	 .pay-item input {
		 flex: 1;
		 margin-left: 10rpx;
	 }
	 
	 .but {
		 width: 650rpx;
		 height: 80rpx;
		 margin: 100rpx auto 0;
		 background: #FF6619;
		 color: #FFFFFF;
		 font-size: 28rpx;
		 border-radius: 16rpx;
		 line-height: 80rpx;
		 text-align: center;
	 }
</style>
