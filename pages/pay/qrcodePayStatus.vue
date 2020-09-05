<template>
	<view class="content">
		<view class="status-box">
			<image style="width: 235rpx;height: 240rpx;" src="/static/ic_pay_success.png"></image>
			<view class="text">支付成功</view>
			<view class="price"><text>¥</text>{{payMoney}}</view>
		</view>
		<view class="card-area">
			<view class="card-header">
				<view class="before">
					<image class="img" src="/static/icon_gift.png"></image>
				</view>
				<view class="card-title">一重好礼</view>
			</view>
			<view class="card-info">活动规则：点击任意牌子即可领取礼物</view>
			<view class="card-module">
				<view class="card" v-for="(item, index) in cardData" :key="index" :class="item.showClass ? 'change' : ''" @click="changeCard(index)">
					<view class="card-item front">
						<image src="/static/icon_prize.png"></image>
					</view>
					<view class="card-item back">{{item.back}}</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardData: [
					{
						back: "反面1",
						showClass: false
					},
					{
						back: "反面2",
						showClass: false
					},
					{
						back: "反面3",
						showClass: false
					},
					{
						back: "反面4",
						showClass: false
					},
					{
						back: "反面5",
						showClass: false
					},
					{
						back: "反面6",
						showClass: false
					},
					{
						back: "反面7",
						showClass: false
					},
					{
						back: "反面8",
						showClass: false
					},
					{
						back: "反面9",
						showClass: false
					}
				],
				payMoney: 0
			}
		},
		onLoad(options) {
			console.log(options);
			this.payMoney = options.payMoney;
		},
		methods: {
			changeCard(index) {
				this.cardData[index].showClass ? this.cardData[index].showClass = false : this.cardData[index].showClass = true;
				
			}
		}
	}
</script>

<style lang="scss">
	.status-box {
		padding-top: 50rpx;
		margin: 0 auto 50rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	
		image {
			margin: 0 auto 10rpx;
		}
	
		.text {
			font-size: 38rpx;
			color: #666;
			font-weight: 500;
			text-align: center;
			margin-bottom: 12rpx;
			font-weight: bold;
		}
		
		.price {
			font-size: 75rpx;
			color: #666;
			font-weight: bold;
			text-align: center;
			text {
				font-size: 43rpx;
				font-weight: 400;
				margin-right: 5rpx;
			}
		}
	}
	
	.card-area {
		.card-header {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 13rpx;
			
			.before {
				width: 68rpx;
				height: 68rpx;
				position: relative;
				margin-left: 102rpx;
				&::before {
					position: absolute;
					left: -102rpx;
					top: 34rpx;
					content: "";
					width: 86rpx;
					height: 2rpx;
					background-color: #666;
				}
				.img {
					width: 68rpx;
					height: 68rpx;
				}
			}
			
			.card-title {
				margin-left: 23rpx;
				font-size: 33rpx;
				color: #666;
				font-weight: 500;
			}
		}
		.card-info {
			font-size: 22rpx;
			font-weight: 500;
			color: #666;
			text-align: center;
			margin-bottom: 30rpx;
		}
	}
	.card-module {
		margin: 0 auto;
		width: 590rpx;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		transform:translate3d(0,0,0);
		.card {
			width: 195rpx;
			height: 194rpx;
			position:relative;
			overflow:hidden;
			
			.card-item {
				position:absolute;
				left:0;
				top:0;
				width:100%;
				height:100%;
				transition:all .5s ease-in-out;
				transform-style:preserve-3d;
				backface-visibility:hidden;
				box-sizing:border-box;
				
				image {
					width: 195rpx;
					height: 194rpx;
				}
			}
			.front{
				transform: rotateY(0deg);
				z-index:2;
			}
			.back{
				background-color: #009fff;
				transform: rotateY(180deg);
				z-index:1;
			}
		}
		
		
		.card.change{
		    .front{
		      z-index:1;
		      transform: rotateY(180deg);
		    }
		    .back{
		      z-index:2;
		        transform: rotateY(0deg);
		    }
		  }
	}
	
	.mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:rgba(0,0,0,1);
		border:1rpx solid rgba(112,112,112,1);
		filter:blur(49rpx);
		opacity:1;
	}
</style>
