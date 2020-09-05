<template>

	<view class="content">
		<view class="status_bar" :style="{height: statusBarHeight + 'px'}"></view>
		<view class="logo-area">
			<image class="logo-img" src="/static/logo.png" mode=""></image>
			<view class="logo-title">商家名称</view>
		</view>
		<view class="fui-cell-group">
			<view class="fui-cell">
				<view class="fui-cell-label">金额：</view>
				<view class="ui-cell-info">
					<input type="digit" contenteditable="true" v-model="payMoney" class="inputText" placeholder="输入金额" focus @input="oninput"
					 :maxlength="moneyMaxLeng" @confirm="submit" />
				</view>
			</view>
		</view>
		<view class="" v-if="isShowBtn">
			<button class="btn-primary" @click="getAuthorize">获取支付宝授权</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payMoney: "",
				moneyMaxLeng: 8,
				tradeNO: "2020051022001495371447580359",
				isShowBtn: false,
				demo: {
					top: 0,
					height: 0
				},
				titleBarHeight: 0,
				statusBarHeight: 0
			}
		},
		onLoad() {
			this.titleBarHeight = uni.getSystemInfoSync()['titleBarHeight'];
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			console.log(uni.getSystemInfoSync()['statusBarHeight']);
			console.log(this.titleBarHeight);
			// const demo = uni.getMenuButtonBoundingClientRect()
			// this.demo.top = demo.top
			// this.demo.height = demo.height
		},
		onShow() {
			let that = this;
			// #ifdef MP-WEIXIN
			console.log("微信小程序");
			uni.login({
				provider: 'weixin',
				success(res) {
					console.log(res);
				}
			});
			// #endif 
			// #ifdef MP-ALIPAY
			console.log("支付宝小程序");
			uni.login({
				scopes: 'auth_user',
				success(res) {
					console.log(res);
					that.getUserId(res.code);
				},
				fail(res) {
					console.log("不配合");
					console.log(res);
					that.isShowBtn = true;
				}
			});
			// #endif
		},
		methods: {
			getUserId(code) {
				console.log(code);
				let config = {
					code: code
				}
				this.$api.getUserId(config).then(res => {
					console.log(res);
				})
			},
			getAuthorize() {
				uni.getAuthCode({
					scopes: 'auth_user',
					success: (res) => {
						console.log(res);
					},
				});
			},
			oninput(e) {
				this.$nextTick(() => {
					let val = e.target.value.toString();
					val = val.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
					val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
					val = val.replace(/^0+\./g, '0.');
					val = val.match(/^0+[1-9]+/) ? val = val.replace(/^0+/g, '') : val
					val = (val.match(/^\d*(\.?\d{0,2})/g)[0]) || ''

					if (val.includes(".")) {
						let numDian = val.toString().split(".")[1].length;
						if (numDian === 2) {
							this.moneyMaxLeng = val.length;
						}
					} else {
						this.moneyMaxLeng = 8;
					}
					this.payMoney = val;
				});
			},
			handleInput(e) {
				let val = e.target.value;
				val = val.replace(/^./g, "");
				val = val.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				val = val.replace(/.{2,}/g, "."); //只保留第一个. 清除多余的
				val = val.replace(/^0+./g, "0.");
				val = val.match(/^0+[1-9]+/) ? (val = val.replace(/^0+/g, "")) : val;
				val = val.match(/^\d*(.?\d{0,2})/g)[0] || "";
				val = val
					.replace(".", "")
					.replace(/./g, "")
					.replace("", ".");
				if (val.includes(".")) {
					let numDian = val.toString().split(".")[1].length;
					if (numDian === 2) {
						this.moneyMaxLeng = val.length;
					}
				} else {
					this.moneyMaxLeng = 8;
				}
				this.fee = val;
			},
			submit() {
				// #ifdef MP-WEIXIN
				console.log("微信小程序");
				// #endif
				// #ifdef MP-ALIPAY
				console.log("支付宝小程序");
				uni.redirectTo({
					url: "/pages/pay/qrcodePayStatus/qrcodePayStatus?payMoney=" + this.payMoney
				});
				return;
				let promise = {
					orderInfo: this.tradeNO
				}
				this.$api.ALiPay(promise, res => {
					console.log(res);
					if (res.resultCode == 9000) {
						uni.redirectTo({
							url: "/pages/pay/qrcodePayStatus/qrcodePayStatus?payMoney=" + this.payMoney
						});
					}
				}, err => {
					console.log(err);
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.status_bar {
		
		// height: calc(var(--status-bar-height) + 45px);
		padding-top: var(--status-bar-height);
		width: 100%;
	}

	.demo {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		font-size: 26rpx;

		.left {
			float: left;
			position: absolute;
			width: max-content;
			height: max-content;
			top: 0;
			bottom: 0;
			left: 20rpx;
			margin: auto;

			.iconfont {
				color: #3C3C3C;
			}
		}
	}

	.logo-area {
		// padding-top: 124rpx;
		// margin-top: 45px;
		margin-bottom: 60rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f5f5f5;

		.logo-img {
			width: 160rpx;
			height: 160rpx;
			margin-bottom: 24rpx;
		}

		.logo-title {
			font-size: 40rpx;
			font-weight: 500;
			color: #333;
		}
	}

	.fui-cell-group {

		.fui-cell {
			border: 2rpx solid #ee702e;
			border-radius: 6rpx;
			width: 650rpx;
			height: 100rpx;
			margin: 0 auto;
			padding: 0 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.fui-cell-label {
			font-size: 32rpx;
			color: #333;
		}

		.ui-cell-info {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.inputText {
				display: inline-block;
				text-align: right;
			}
		}
	}
</style>
