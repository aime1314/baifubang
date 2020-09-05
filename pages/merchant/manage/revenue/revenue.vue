<template>
	
	<view>
		<view class="form-box">
			<!-- <view class="form-area set_bor">
				<view class="label">单位(元)</view>
				<view>
					<view class="setyear">
						<picker fields="month" mode="date" :value="date" :start="startDate" :end="endDate" >
							<view class="setyear_font">2020年3月</view>
						</picker>2
						<image src="/static/icon_xl.png" ></image>
					</view>					
				</view>					
			</view>
			<view class="form-area set_bor">
				柱状图				
			</view> -->
			<view class="form-area set_bor">
				<view class="form-area-i" >
					<view style="width: 70%;">
						<text>可提现金额</text><br>
						<text class="text2">{{shopMoney}}</text>
					</view>
					<view style="margin: auto 0rpx;">
						<text class="text8">提现</text>
					</view>
				</view>
			</view>	
			<view class="form-area set_align">
				<view class="shopMoneyBox">
					<view class="showMoneyMsgTpye">
						<text >账户余额</text><br>
						<text>{{shopMoney}}</text>
					</view>
					<view  class="showMoneyMsgTpye">
						<text >营业额</text><br>
						<text >{{y_sum}}</text>
					</view>
				</view>			
			</view>
		</view>
		
		<view class="form-box">
			<view class="form-area set_bor" @tap="toPage('/pages/merchant/manage/revenue/revenueDetail')">
				<view class="label">收支明细</view>
				<view class="text arrow">
					<view class="text2"></view>
				</view>
				<image class="set_arrow" src="/static/arrow.png"></image>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
				index: 0,
				start: "",
				page: 1,
				page_size: 20,
				y_sum: 0,	// 营业流水
				k_sum: 0,	// 跨界收益
				t_sum: 0,	// 推广收益
				shopMoney: 0,	// 余额和可提现
			}
		},
		onLoad() {
			// 商户钱包 数据
			this.getShopsWallet();
		},
		methods: {
			// 商户钱包 数据
			getShopsWallet() {
				let config = {
					start: this.start,
				}
				this.$api.getShopsWallet(config).then(res => {
					if(res.code == 200) {
						this.y_sum = res.data.y_sum;
						this.k_sum = res.data.k_sum;
						this.t_sum = res.data.t_sum;
						this.shopMoney = res.data.shopMoney;
					}
				})
			},
			
			toPage(page) {
				uni.navigateTo({
					url: page
				})
			},
			
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}`;
			}
		}
	}
</script>

<style lang="scss">
	.shopMoneyBox{ background: #fff;  border-radius:10rpx;display: flex;}
	.showMoneyMsgList{  }
	
	.showMoneyMsgTpye{justify-content: flex-start;margin-right: 100rpx; }
	.showMoneyMsgTpye1{justify-items: flex-end; }
	.text8{
		color: #FF6619;
		font-size: 32rpx;
		border: 1rpx #FF6619 solid;
		border-radius: 40rpx;
		padding: 2rpx 20rpx;
		margin: 0rpx 10rpx;
	}
	.form-area-i{
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
	
	.setyear {display: flex;justify-content:flex-end}
	.setyear image {	padding-left: 16rpx;width: 30rpx;height: 30rpx;}
	
.form-box {
		padding: 10rpx 21rpx 0rpx 21rpx;
		margin-top: 21rpx;
		margin-left: 29rpx;
		width: 692rpx;
		background: #FFFFFF;
		border-radius: 5px;
		box-shadow: 0px 3px 6px rgba(0,0,0,.18);
	}
	.form-area {
		display: flex;
		padding: 20rpx 20rpx;
	}
	.label {
		width: 120rpx;
		font-size: 28rpx;
		color: #333;
		margin-right: 20rpx;
		flex-shrink: 0;
	}
	.cat_detail_img{
		width: 152rpx;
		height: 152rpx;
		flex-shrink: 0;
		margin-right: 10rpx;
	}
	.text {
		flex: 1;
	}
	.text2 {
		flex: 1;
		margin-right: 20rpx;
		font-size: 32rpx;
		color: #FF6619;
		font-weight: 700;
/* 		text-align: right; */
	}
	.set_arrow{
		width: 28rpx;
		height: 34rpx;
	}
	.set_arrow_logo{
		width: 60rpx;
		height: 60rpx;
	}
	.set_bor{
		border-bottom: 1rpx solid #f5f5f5;
		justify-content: space-between;
	}	
	.set_align{
		align-items: center;
		justify-content: space-between;
	}
	.set_inupt{
		width: 470rpx;
		font-size: 28rpx;
	}
	.set_bigbtn{
		margin: 80rpx 50rpx 50rpx 50rpx;
		width: 650rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background: #FF6619;
		border-radius: 8rpx;
		font-size: 30rpx;
		color: #FFFFFF;	
	}
	/*btn*/
	.set_foot{
		width: 690rpx;
		margin: 80rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.set_btn_a{
		width: 320rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #FF6619;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #FFFFFF;
	}
	.set_btn_n{
		width: 320rpx;
		height: 78rpx;
		line-height: 78rpx;
		text-align: center;
		border: 1rpx solid #FF6619;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #FF6619;
	}
	.btn_big{
		position: fixed;
		bottom: 25rpx;
		left: 29rpx;
		margin-top: 48rpx;
		width: 692rpx;
		height: 67rpx;
		line-height: 67rpx;
		text-align: center;
		font-size: 33rpx;
		font-weight: bold;
		color: #FFFFFF;
		background: linear-gradient(to left,#ED6C1B,#F5D737);
		border-radius: 8rpx;
	}
</style>
