<template>
	<view>
		<view class="location_search_wrap">
			<view class="location_search_left" @tap="">
				<image src="/static/search.png"></image>
				<text>请输入搜索关键词</text>
			</view>
			<view class="location_search_right">
				<text>取消</text>
			</view>
		</view>
		<view class="location_top">
			<image src="/static/location.png"></image>
			<text>送至：</text>
			<text class="location_top_addr">山东省青岛市市南区山东路40号广发金融大厦</text>
		</view>
		<view class="location_box">
			<view class="loaction_tit loca_bor">我的收货地址</view>
			<view class="loaction_con loca_bor">
				<view class="loaction_infor">
					<view class="loaction_addr">山东省青岛市市南区山东路40号广发金融大厦号广发金融大厦</view>
					<view class="loaction_name">
						<text>张三</text>
						<text>18153249525</text>
					</view>
				</view>
				<view class="loaction_radio" >
					<image src="/static/icon_small_success.png"></image>
				</view>	
			</view>
			<view class="loaction_con loca_bor">
				<view class="loaction_infor">
					<view class="loaction_addr"><text>公司</text>青岛市市南区山东路40号广发金融大厦</view>
					<view class="loaction_name">
						<text>张三</text>
						<text>18153249525</text>
					</view>
				</view>
				<view class="loaction_radio" >
					<image src="/static/icon_small_success.png"></image>
				</view>	
			</view>
		</view>
		
		<view class="btn_big">+新增地址</view>
	</view>	
</template>

<script>
</script>

<style>
	.location_search_wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 30rpx 0;
	}
	.location_search_left {
		width: 600rpx;
		height: 72rpx;
		background: #f7f7f7;
		border-radius: 36rpx;
		display: flex;
		align-items: center;
	}
	
	.location_search_left image {
		margin-left: 57rpx;
		width: 32rpx;
		height: 32rpx;
		flex-shrink: 0;
	}
	
	.location_search_left text {
		margin-left: 20rpx;
/* 		width: 560rpx; */
		font-size: 28rpx;
		color: #999999;
	}
	.location_search_right text {
		margin-left: 10rpx;
		font-size: 28rpx;
		color: #ff6619;
	}
	.location_top{
		padding: 0rpx 29rpx;
		height: 90rpx;
		background: #F7F7F7;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.location_top image{
		margin-right: 20rpx;
		width: 37rpx;
		height: 46rpx;
		flex-shrink: 0;
	}
	.location_top text{
		font-size: 26rpx;
		color: #ED6C1B;
		flex-shrink: 0;

	}
	.location_top_addr{
		width: 550rpx;
	}
	.location_box{
		width: 100%;
		background: #F7F7F7;
	}
	.loaction_tit {
		font-size: 28rpx;
		color: #bdbdbd;
	}
	.loca_bor {
		padding: 30rpx 30rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}
	.loca_bor:last-child{
		border-bottom: none;
	}
	.loaction_con{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.loaction_infor{
		margin-right: 10rpx;
		width: 580rpx;
	}
	.loaction_addr{
		margin-bottom: 12rpx;
		font-size: 28rpx;
		color: #333333;
	}
	.loaction_addr text{
		margin-right: 8rpx;
		color: #ED6C1B;
	}
	.loaction_name text{
		margin-right: 30rpx;
		font-size: 26rpx;
		color: #999999;
	}
	.loaction_radio image{
		width: 40rpx;
		height: 40rpx;
	}
	.loaction_p{
		padding: 30rpx 0rpx;
	}
	.loaction_tit2{
		font-size: 28rpx;
		color: #999999;
	}
	.loaction_r{
		display: flex;
	}
	.loaction_orage{
		margin-left: 15rpx;
		display: flex;
	}
	.loaction_orage image{
		width: 41rpx;
		height: 41rpx;
	}
	.loaction_orage text{
		font-size: 28rpx;
		color: #ED6C1B;
	}
	.btn_big{
		/* position: fixed;
		bottom: 60rpx;
		left: 29rpx; */
		width: 650rpx;
		height: 80rpx;
		margin: 60rpx auto 0;
		line-height: 80rpx;
		text-align: center;
		font-size: 28rpx;
		/* font-weight: bold; */
		color: #FFFFFF;
		background: #ff6619;
		border-radius: 8rpx;
	}
</style>
