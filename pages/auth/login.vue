<template>
	<view class="content">
		<view class="login-bg">
			<image src="/static/login_bg.png"></image>
		</view>
		<view class="form-box">
			<view class="logo-area">
				<image class="logo-img" src="/static/ic_logo.png"></image>
				<view class="">欢迎来到百付邦</view>
			</view>
			<view class="logo-desc">首次登录将自动注册</view>
			<view class="login-area">
				<view class="login-item">
					<view class="input-con">
						<image src="/static/login_user.png"></image>
						<input type="number" maxlength="11" v-model="phone" placeholder="请输入手机号" />
					</view>
					<view class="input-con">
						<image src="/static/login_pass.png"></image>
						<input type="number" maxlength="6" v-model="smscode" placeholder="请输入验证码" />
						<view class="quick-btn">
							<view class="btn" :class="{active : !getCodeisWaiting}" @click="getCode()">{{getCodeText}}</view>
						</view>
					</view>
					<view class="btn-default" @click="login()">立即登录</view>
					<view class="user-service">
						<view class="read-area" :class="{active: isRead}" @tap="toggleRead">
							<image v-if="isRead" src="/static/icon_small_success.png"></image>
						</view>
						<text @tap="goAgreement">《百付邦平台用户协议》</text>
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
				openId: "",
				unionId: "",
				userId: "",
				phone: "",
				smscode: "",
				getCodeText: "获取验证码",
				getCodeisWaiting: false,
				isRead: true,
				// #ifdef MP-WEIXIN
				type: 1,
				// #endif
				// #ifdef MP-ALIPAY
				type: 2,
				// #endif
			}
		},
		onLoad() {
			// #ifdef MP-WEIXIN
			if(uni.getStorageSync("openId")) {
				this.openId = uni.getStorageSync("openId");
				if(uni.getStorageSync("unionId")) {
					this.unionId = uni.getStorageSync("unionId");
				}
			}else {
				uni.navigateTo({
					url: "/pages/auth/impower"
				});
			}
			// #endif
			// #ifdef MP-ALIPAY
			if(uni.getStorageSync("userId")) {
				this.userId = uni.getStorageSync("userId");
				console.log(this.userId);
			}else {
				uni.login({
					scopes: "auth_base",
					success(res) {
						console.log(res);
					},
					fail(err) {
						console.log("未获取支付宝授权");
						console.log(err);
					}
				});
			}
			// #endif
		},
		methods: {
			// 获取验证码
			getCode() {
				if (this.getCodeisWaiting) return;
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))) {
					return uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
				}
				let config = {
					userPhone: this.phone,
					type: this.type,
					// #ifdef MP-WEIXIN
					openid: this.openId,
					// #endif
					// #ifdef MP-ALIPAY
					zfb_user_id: this.userId,
					// #endif
				}
				this.getCodeText = "发送中...";
				this.getCodeisWaiting = true;
				this.$api.getPhoneVerifyCode(config).then(res => {
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
			toggleRead() {
				this.isRead ? this.isRead = false : this.isRead = true;
			},
			login() {
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))) {
					return uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
				}
				if (this.smscode.length  == 0) {
					return uni.showToast({
						title: '请填写验证码',
						icon: "none"
					});
				}
				if (!this.isRead) {
					return uni.showToast({
						title: '请查看并同意用户协议',
						icon: "none"
					});
				}
				
				let config = {
					mobile: this.phone,
					smscode: this.smscode,
					type: this.type,
					// #ifdef MP-WEIXIN
					openid: this.openId,
					unionid: this.unionId,
					nickName: JSON.parse(uni.getStorageSync("userInfo")).nickName || "",
					userPhoto: JSON.parse(uni.getStorageSync("userInfo")).avatar || "",
					// #endif
					// #ifdef MP-ALIPAY
					zfb_user_id: this.userId
					// #endif
				}
				console.log(config);
				this.$api.login(config).then(res => {
					console.log(res);
					if(res.code == 200) {
						uni.setStorageSync("token", res.data.token);
						uni.switchTab({
							url: "/pages/index/index"
						});
					}
				})
			},
			goAgreement() {
				console.log("跳转到入驻协议页面");
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f7f7f7;
	}
	.content {
		position: relative;
		display: flex;
		justify-content: center;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
	}
	.login-bg {
		width: 750rpx;
		height: 449rpx;
		position: relative;
		image {
			position: absolute;
			top: -100rpx;
			left: 0;
			width: 750rpx;
			height: 549rpx;
			z-index: 0;
		}
	}
	.logo-area {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		.logo-img {
			width: 102rpx;
			height: 102rpx;
			margin-right: 20rpx;
		}
		view {
			font-size: 32rpx;
			color: #333;
		}
	}
	
	.logo-desc {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 60rpx;
	}
	
	.form-box {
		position: relative;
		margin: -120rpx auto 0;
		width: 690rpx;
		background: #fff;
		box-shadow: 0 -5rpx 20rpx rgba(0,0,0,0.1);
		border-radius: 8rpx;
		padding: 20rpx;
		
		.login-area {
			
			.login-item {
				
				.input-con {
					width: 650rpx;
					height: 85rpx;
					border-bottom: 1rpx solid rgba(153, 153, 153, 0.39);
					display: flex;
					align-items: center;
					image {
						width: 44rpx;
						height: 44rpx;
						margin-right: 20rpx;
					}
					input {
						flex: 1;
						font-size: 28rpx;
						color: #666;
					}
				}
				.quick-btn {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 26rpx;
					color: #FF6619;
				}
				.btn-default {
					margin: 80rpx auto 50rpx;
					width: 500rpx;
					height: 70rpx;
					background-color: #FF6619;
					border-radius: 8rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					font-size: 28rpx;
					
				}
				
				.user-service {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24rpx;
					color: #999;
					
					.read-area {
						width: 30rpx;
						height: 30rpx;
						border-radius: 15rpx;
						border: 1px solid #ccc;
						margin: 26rpx 0;
						
						&.active {
							border: none;
						}
						
						image {
							width: 30rpx;
							height: 30rpx;
						}
					}
				}
			}
		}
	}
</style>
