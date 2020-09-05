<template>
	<view class="getpaypassMsgBox">
		<view class="getpaypassTips">
			<text>为了您的支付安全，请先设置密码</text>
		</view>
		<view class="paypassTitle">请输入支付密码</view>
		<view class="getpaypassMsg">
			<view class="code-box" @tap="changeKey('pwd')">
				<block v-for="(item, index) in 6" :key="index">
					<view class="code-box-item">{{ (pwd[index] && '●') || '' }}</view>
				</block>
			</view>
			<input class="uni-input" type="number" v-model="pwd" maxlength="6" />
		</view>
		<view class="paypassTitle">请再次输入支付密码</view>
		<view class="getpaypassMsg">
			<view class="code-box" @tap="changeKey('vpwd')">
				<block v-for="(item, index) in 6" :key="index">
					<view class="code-box-item">{{ (vpwd[index] && '●') || '' }}</view>
				</block>
			</view>
			<input class="uni-input" type="number" v-model="vpwd" maxlength="6" />
		</view>
		<view class="btnBox">
			<view class="btn_big" @tap="resetbackPay">提交</view>
		</view>
		<view :class="['keyboard', show ? '' : 'active', isIphoneX ? 'isIphone' : '']">
			<block v-for="(item, index) in 9" :key="index">
				<view class="keyboard-item" @tap="key(index + 1)">{{index + 1}}</view>
			</block>
			<view class="keyboard-item hide"></view>
			<view class="keyboard-item" @tap="key(0)"><text>0</text></view>
			<view class="keyboard-item delte" @tap="del()"><image class="img" src="/static/icon_pay_del.png" mode="aspectFill" :lazy-load="true"></image></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pwd: "",
				vpwd: "",
				smscode: "",
				show: false,
				isIphoneX: false,
				type: ""
			}
		},
		onLoad(options) {
			this.smscode = options.smscode;
		},
		methods: {
			changeKey(type) {
				this.show = true;
				this.type = type;
			},
			key(key) {
				if(this.type == 'pwd') {
					if (this.pwd.length < 6) {
						this.pwd += key;
						if (this.pwd.length == 6) {
							this.isShow = false;
						}
					}
				}
				if(this.type == 'vpwd') {
					if (this.vpwd.length < 6) {
						this.vpwd += key;
						if (this.vpwd.length == 6) {
							this.isShow = false;
						}
					}
				}
				
			},
			clear() {
				if(this.type == 'pwd') {
					this.pwd = '';
				}
				if(this.type == 'vpwd') {
					this.vpwd = '';
				}
			},
			close() {
				if(this.type == 'pwd') {
					this.pwd = '';
					this.trantision = false;
					this.show = false;
				}
				if(this.type == 'vpwd') {
					this.vpwd = '';
					this.trantision = false;
					this.show = false;
				}
				
			},
			del() {
				if(this.type == 'pwd') {
					if (this.pwd.length > 0) {
						this.pwd = this.pwd.substring(0, this.pwd.length - 1);
					}
				}
				if(this.type == 'vpwd') {
					if (this.vpwd.length > 0) {
						this.vpwd = this.vpwd.substring(0, this.vpwd.length - 1);
					}
				}
			},
			resetbackPay() {
				if (this.pwd.length < 6) {
					uni.showToast({
						title: '密码输入有误',
						icon: "none"
					});
					return false;
				}
				if (this.vpwd.length < 6) {
					uni.showToast({
						title: '密码输入有误',
						icon: "none"
					});
					return false;
				}
				if (this.pwd != this.vpwd) {
					uni.showToast({
						title: '密码输入有误',
						icon: "none"
					});
					return false;
				}
				let config = {
					payPwd: this.pwd,
					smscode: this.smscode
				}
				this.$api.resetbackPay(config).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: "修改完成",
							icon: "none"
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 2
							});
						}, 1500)

					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.getpaypassMsgBox {
		display: flex;
		flex-direction: column;
		background-color: #F4F4F4;
		color: #333;
		height: 100%;

		.getpaypassTips {
			text-align: center;
			padding: 40rpx 0 60rpx 0;
			height: 49rpx;
			line-height: 49rpx;

			text {
				display: inline-block;
				background: url(../../../static/safe.png) left center no-repeat;
				background-size: 40rpx 49rpx;
				padding-left: 55rpx;
				height: 49rpx;
				line-height: 49rpx;
				color: #999;
			}
		}

		.paypassTitle {
			padding: 30rpx 30rpx 0 30rpx;
		}

		.getpaypassMsg {
			width: 670rpx;
			margin: 20rpx auto 0;
			
			input {
				display: none;
			}
			
			.code-box {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				border: 1px solid #d0d0d0;
			}
			
			.code-box-item {
				width: 110rpx;
				height: 60rpx;
				background: #fff;
				font-size: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.code-box-item:not(:last-child) {
				border-right: 1px solid #d0d0d0;
			}
		}

		.btnBox {
			margin: 60rpx auto 0;
			padding: 0 30rpx;
			width: 100%;

			.btn_big {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 28rpx;
				color: #FFFFFF;
				background: #ff6619;
				border-radius: 8rpx;
			}
		}
	}
	
	.keyboard {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #EBEBEB;
		display: flex;
		justify-content: center;
		z-index: 2;
		flex-wrap: wrap;
		transition:all 0.2s ease-in 0.2s;
	}
	
	.active {
		bottom: -400rpx;
	}
	.keyboard-item {
		box-sizing: border-box;
		width: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		font-size: 40rpx;
		color: #333;
		height: 99rpx;
		border: 1rpx solid #EBEBEB;
		border-top:none;
		border-left:none;
	}
	.hide {
		opacity: 0;
	}
	.delte {
		background: none;
		box-shadow: none;
	}
	.delte image {
		width: 60rpx;
		height: 60rpx;
	}
	.isIphone {
		padding-bottom: 68rpx !important;
	}
	
	
	.cell-group, .pay-group, .cell-item, .pay-item {
		flex: 1;
		display: flex;
		align-items: center;
	}
	
	.cell-group, .pay-group{
		margin-top: 20rpx;
		flex-flow: column;
		background: #ffffff;
	}
	
	.cell-group:last-child, .pay-group:last-child{
		border: none;
	}
	
	.cell-item, .pay-item {
		width: 100%;
		flex-flow: row;
		justify-content: space-between;
		padding: 30rpx 30rpx;
		border-bottom: 1rpx solid #f7f7f7;
	}
	
	.pay-item {
		
		.l {
			display: flex;
			align-items: center;
		}
	}
	
	.pay-item image {
		width: 48rpx;
		height: 48rpx;
	}
	
	.pay-item image:last-child {
		width: 24rpx;
		height: 24rpx;
	}
	
	.label {
		flex: 1;
		margin-left: 16rpx;
		padding-left: 16rpx;
		border-left: 1rpx solid #F4F4F4;
	}
	
	.desc {
		font-size: 26rpx;
		color: #BBBBBB;
		
		.red {
			
		}
	}
	
	.res {
		margin-left: 10rpx;
		display: inline-block;
		font-size: 24rpx;
		background: #ff6619;
		color: #ffffff;
		padding: 4rpx 12rpx;
		border-radius: 20rpx;
	}
</style>
