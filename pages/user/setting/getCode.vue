<template>
	<view class="getCodeMsgBox">
		<view class="getCodeTips">
			<text>为了您的支付安全，请先设置密码</text>
		</view>
		<view class="getCodeMsg">
			<!-- <view>
				<input class="uni-input" v-model="tel" placeholder-style="color:#ccc;" placeholder="手机号" />
			</view> -->
			<view class="yzmBox">
				<input class="uni-input" v-model="smscode" type="number" maxlength="6" placeholder-style="color:#ccc;" placeholder="验证码" />
				<text class="getyzm" :class="{active : !getCodeisWaiting}" @click="getCode()">{{getCodeText}}</text>
			</view>
		</view>
		<view class="btnBox">
			<view class="btn_big" @tap="toPage('/pages/user/setting/setPayPass?smscode=' + smscode)">下一步</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: "",
				smscode: "",
				getCodeText: "获取验证码",
				getCodeisWaiting: false,
			}
		},
		methods: {
			// 获取验证码
			getCode() {
				this.getCodeText = "发送中...";
				this.getCodeisWaiting = true;
				this.$api.getUserPhoneVerifyCode().then(res => {
					console.log(res);
					if(res.code == 200) {
						uni.showToast({
							title: "验证码已发送",
							icon: "none"
						});
						this.getCodeisFocus = true;
						this.setTimer();
					}else {
						uni.showToast({
							title: res.message,
							icon: "none"
						});
						this.getCodeText = "获取验证码";
						this.getCodeisWaiting = false;
					}
				})
			},
			// 获取验证码倒计时
			setTimer() {
				let holdTime = 60;
				this.getCodeText = "重新获取(60)"
				this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						this.getCodeisWaiting = false;
						this.getCodeText = "获取验证码";
						clearInterval(this.Timer);
						return;
					}
					this.getCodeText = "重新获取(" + holdTime + ")"
					holdTime--;
			
				}, 1000)
			},
			toPage(page) {
				if(this.smscode.length < 6) {
					return uni.showToast({
						title: '请填写验证码',
						icon: "none"
					});
				}
				uni.navigateTo({
					url: page
				})
			}
		}
	}
</script>

<style lang="scss">
	.getCodeMsgBox{display: flex; flex-direction: column;background-color: #F4F4F4; color: #333;height: 100%;
		.getCodeTips{text-align: center; padding: 40rpx 0;height:49rpx; line-height:49rpx; 
			text{display:inline-block; background: url(../../../static/safe.png) left center no-repeat; background-size: 40rpx 49rpx; padding-left: 55rpx; height:49rpx; line-height:49rpx; color:#999;}
		}
		.getCodeMsg{background: #FFFFFF; padding:0 30rpx; margin-top: 50rpx;
			.yzmBox{ position: relative;
				.getyzm{display: inline-block; color:#ff6600; position: absolute; top:20rpx; right:10rpx; z-index: 2;}
			}
		}
		.btnBox{margin: 80rpx auto 0; padding: 0 30rpx; width: 100%;
			.btn_big{width: 100%;height: 80rpx;	line-height: 80rpx;	text-align: center;font-size: 28rpx;color: #FFFFFF;background: #ff6619;border-radius: 8rpx;}
		}	
	}
</style>
