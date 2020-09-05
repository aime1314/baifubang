<template>
	<view class="content">
		<view class="add-area">
			<input type="text" maxlength="6" v-model="tempText" />
			<view class="btn-default" @tap="addItem">添加分类</view>
		</view>
		<view class="list" v-if="list.length > 0">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="label">分类名称:</view>
				<input type="text" maxlength="6" v-model="item.text" />
				<image src="/static/icon_small_close.png" mode="" @tap="delItem(index)"></image>
			</view>
		</view>
		<view class="footer_box">
			<view class="btn-default" @tap="submit">保存</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tempText: "",
				list: []
			};
		},
		methods: {
			addItem() {
				let tempText = this.tempText;
				if(tempText != "") {
					this.list.push({text: tempText});
					this.tempText = "";
				}
				
			},
			
			delItem(index) {
				this.list.splice(index, 1);
			},
			 
			submit() {
				if(this.list.length == 0) {
					return uni.showToast({
						title: "请添加分类"
					})
				}
				let _arr = [];
				this.list.map((item, index) => {
					_arr.push(item.text);
				});
				let config = {
					title: _arr.toString()
				}
				this.$api.addGoodsClassify(config).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: '添加成功',
							icon: "none"
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						},1500);
					}else {
						uni.showToast({
							title: res.message,
							icon: "none"
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}
	
	.content {
		padding-top: 20rpx;
		padding-bottom: 100rpx;
	}
	
	.add-area {
		background-color: #fff;
		height: 100rpx;
		padding: 0 30rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		input {
			width: 480rpx;
			height: 70rpx;
			border: 1rpx solid #1C7CE6;
			border-radius: 6rpx;
			color: #333;
			font-size: 30rpx;
			padding: 0 10rpx;
		}
		
		.btn-default {
			width: 176rpx;
			height: 70rpx;
			background-color: #1C7CE6;
			color: #fff;
			border-radius: 6rpx;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		
	}
	
	.list {
		background-color: #fff;
		padding: 15rpx 30rpx;
		
		.item {
			height: 100rpx;
			padding: 15rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.label {
				font-size: 28rpx;
				color: #333;
			}
			
			input {
				width: 440rpx;
				height: 70rpx;
				border: 1rpx solid #707070;
				border-radius: 6rpx;
				padding: 0 10rpx;
			}
			
			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	
	.footer_box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.btn-default {
			width: 690rpx;
			height: 80rpx;
			background-color: #1C7CE9;
			color: #fff;
			border-radius: 6rpx;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
