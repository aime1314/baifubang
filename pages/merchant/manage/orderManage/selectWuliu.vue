<template>
	
	<view>		
		<view class="form-box">
			<view class="form-area set_bor">
				<view class="label">顺丰快递</view>
				<label class="radio"><radio class="cart_radio" value="r1" color="#ED6C1B" /></label>
			</view>
			<view class="form-area set_bor">
				<view class="label">天天快递</view>
				<label class="radio"><radio class="cart_radio" value="r1" color="#ED6C1B" /></label>
			</view>
			<view class="form-area set_bor">
				<view class="label">百世快递</view>
				<label class="radio"><radio class="cart_radio" value="r1" color="#ED6C1B" /></label>
			</view>
			<view class="form-area set_align">
				<view class="label">中通快递</view>
				<label class="radio"><radio class="cart_radio" value="r1" color="#ED6C1B" /></label>
			</view>
		</view>
		
		
		
		<!-- <view class="set_foot">
			<view class="set_btn_a">上架出售</view>
			<view class="set_btn_n">放入仓库</view>
		</view> -->
	</view>
	
	
</template>

<script>

</script>

<style>
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
		color: grey;
		text-align: right;
	}
	.set_arrow{
		width: 28rpx;
		height: 34rpx;
	}
	.set_bor{
		border-bottom: 1rpx solid #f5f5f5;
		align-items: center;
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
</style>
