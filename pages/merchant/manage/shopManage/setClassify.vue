<template>
	<view class="content">
		<view class="cat_detail_right">
			<view class="cat_detail_list">
				<template v-for="(item, index) in list">
					<view class="cat_detail_box" :key="index" @tap="changeClass(item,index)">
						{{item.simpleName}}
						<view class="radio" :class="{active: item.isActive == true}">
							<image v-if="item.isActive == true" src="/static/wancheng.png"></image>
						</view>
					</view>
				</template>
			</view>
			<view class="set_foot">
				<view class="btn_big" @tap="editShopInfo">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.goodsClassList();
		},
		methods: {
			// 获取商品类目列表
			goodsClassList() {
				let config = {
					catId: 0
				}
				this.$api.goodsClassList(config).then(res => {
					if(res.code == 200) {
						let data = res.data;
						for(let i = 0; i<data.length; i++) {
							data[i].isActive = false;
						}
						this.list = data;
					}
				})
			},
			
			changeClass(item,index) {
				item.isActive ? item.isActive = false : item.isActive = true;
			},
			
			editShopInfo() {
				let cat_shop = [];
				for(let i = 0; i<this.list.length; i++) {
					if(this.list[i].isActive) {
						cat_shop.push(this.list[i].catId);
					}
				}
				console.log(cat_shop);
				uni.setStorageSync("cat_shop", JSON.stringify(cat_shop));
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		display: flex;
		justify-content: space-between;
		height: 100%;
	}
	.cat_detail_right{
		width: 690rpx;
		margin: 0 auto;
		flex-shrink: 0;
	}
	.cat_detail_banner{
		width: 563rpx;
		height: 150rpx;
	}
	.cat_detail_list{
		padding: 0rpx 22rpx;
	}
	.cat_detail_box{
		padding: 27rpx 0rpx;
		border-bottom: 1rpx solid #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.cat_detail_img{
		width: 152rpx;
		height: 152rpx;
		flex-shrink: 0;
	}
	.radio {
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		border: 1px solid #f5f5f5;
		
		&.active {
			border: none;
			
			image {
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
	.set_foot {
		width: 690rpx;
		margin: 80rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.btn_big {
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
		background: #1C7CE9;
		border-radius: 8rpx;
	}
</style>
