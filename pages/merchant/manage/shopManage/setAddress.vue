<template>
	<view>
		<view class="search_box_top">
			<view class="search_top">				
				<view class="index_search">
					<image src="/static/search.png"></image>
					<input type="text" placeholder="请输入搜索关键词" :focus="focus" confirm-type="search" v-model="goodsSerachKeywords" @blur="serachKeywords" />
				</view>
				<view class="text6">
					取消
				</view>
			</view>
		</view>
		<view>
			<view class="order_box addr">
				<image class="addr_icon" src="/static/location.png"></image>
				<view class="addr_info">
					<view class="addr_name">张三 <text>18163248590</text></view>
					<view class="adde_t">山东省青岛市市南区山东路40号广发金融大厦广发金融大厦</view>
				</view>
			</view>
			
			
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.search_box_top {
		
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		
		background: #FFFFFF;
		/* z-index: 100; */
	}
	
	.search_top {
		display: flex;
		align-items: center;
		background: linear-gradient(to right, #F5D737, #ED6C1B) top;
		
	}	
	.index_search {
		margin: 25rpx 0rpx 25rpx 23rpx;
		width: 625rpx;
		height: 63rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
	}
	.index_search image {
		margin-left: 57rpx;
		width: 38rpx;
		height: 38rpx;
		flex-shrink: 0;
	}
	
	.orderdetail_box_state{
		padding: 50rpx;
		background: #F7F7F7;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.orderdetail_state{
		font-size: 38rpx;
		color: #ED6C1B;
	}
	.detail_time{
		margin-top: 5rpx;
		font-size: 24rpx;
		color: #ED6C1B;
	}
	.detail_state_icon{
		width: 80rpx;
		height: 80rpx;
	}
	.order_box{
		padding: 10rpx 21rpx 28rpx 21rpx;
		margin-top: 35rpx;
		margin-left: 29rpx;
		width: 692rpx;
		background: #FFFFFF;
		border-radius: 5px;
		box-shadow: 0px 3px 6px rgba(0,0,0,.18);
	}
	.addr{
		display: flex;
		justify-content: flex-start;
	}
	.addr_icon{
		margin-top: 10rpx;
		width: 37rpx;
		height: 46rpx;
		flex-shrink: 0;
	}
	.addr_info{
		margin-top: 10rpx;
		margin-left: 15rpx;
		display: flex;
		flex-direction: column;
	}
	.addr_name{
		font-size: 33rpx;
		color: #333333;
	}
	.addr_name text{
		margin-left: 10rpx;
	}
	.adde_t{
		margin-top: 15rpx;
		font-size: 24rpx;
	}
	.orderlist_box_top{
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #f5f5f5;
	}
	.orderlist_shop{
		display: flex;
		flex-shrink: 0;
	}
	.orderlist_shop image{
		width: 39rpx;
		height: 35rpx;
	}
	.orderlist_shop text{
		width: 560rpx;
		margin-left: 15rpx;
		font-size: 28rpx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.orderlist_con{
		padding: 28rpx 0rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #f5f5f5;
	}
	.orderlist_pro{
		margin-right: 20rpx;
		width: 152rpx;
		height: 152rpx;
		flex-shrink: 0;
	}.orderlist_info{
		width: 516rpx;
		display: flex;
		flex-direction: column;
	}
	.orderlist_tit{
		width: 480rpx;
		height: 80rpx;
		line-height: 40rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 28rpx;
		color: #333333;
	}
	.orderlist_one{
		margin-top: 18rpx;
		display: flex;
		justify-content: space-between;
	}
	.orderlist_box_num{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.orderlist_y{
		color: #333333;
		font-size: 32rpx;
	}
	.orderlist_n{
		color: #333333;
		font-size: 22rpx;
	}
	.orderlist_g{
		margin-top: 7rpx;
		width: 370rpx;
		font-size: 22rpx;
		color: #999999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.top{
		margin-top: 14rpx;
	}
	.detail_ifo{
		padding-top: 14rpx;
		display: flex;
		justify-content: space-between;
		font-size: 22rpx;
		color: #333333;
	}
	.detail_org{
		margin-left: 15rpx;
		color: #ED6C1B;
	}
	.detail_top{
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #f5f5f5;
		font-size: 28rpx;
		font-weight: bold;
	}
	.detail_ifo2{
		padding: 22rpx 0rpx;
		border-bottom: 1rpx solid #f5f5f5;
		display: flex;
		justify-content: space-between;
		font-size: 22rpx;
		color: #333333;	
	}
	.orderliste_box_btn{
		margin-top: 28rpx;
		display: flex;
		justify-content: flex-end;
	}
	.orderlist_btn{
		margin-left: 18rpx;
		width: 209rpx;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		background: linear-gradient(to right,#F5D737,#ED6C1B);
		border-radius: 8rpx;
		font-size: 22rpx;
		color: #FFFFFF
	}
	.detail_bottom{
		margin-bottom: 120rpx;
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
	.text {
			flex: 1;
		}
	.text6 {
			flex: 1;
			margin-right: 20rpx;
			color: #ffffff;
			padding-left: 20rpx;
	/* 		text-align: right; */
	}
</style>
