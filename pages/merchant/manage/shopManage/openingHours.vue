<template>

	<view>

		<view class="form-box">
			<view class="form-area set_align">
				<view class="label">营业时间</view>
				<view class="radio" @tap="changeType(1)" :class="{active: type == 1}">
					<image v-if="type == 1" src="/static/wancheng.png"></image>
				</view>
				<view class="text" @tap="changeType(1)">全天</view>
				<view class="radio"  @tap="changeType(2)" :class="{active: type == 2}">
					<image v-if="type == 2" src="/static/wancheng.png"></image>
				</view>
				<view class="text"  @tap="changeType(2)">自定义时间</view>
			</view>
			<view class="form-area set_align">
				<view class="text7">开始时间</view>
				<view class="text7">结束时间</view>
			</view>
			<view class="form-area set_align" style="width: 80%;margin: auto;">
				<view class="text">
					<picker class="set_inupt" mode="time" :value="serviceStartTime" start="00:00" end="23:59" @change="bindStartChange">
						{{serviceStartTime}}
					</picker>
				</view>
				<view class="text7">
					至
				</view>
				<view class="text">
					<picker class="set_inupt" mode="time" :value="serviceEndTime" start="00:00" end="23:59" @change="bindEndChange">
						{{serviceEndTime}}
					</picker>
				</view>
			</view>
		</view>
		<view class="set_foot">
			<view class="btn_big" @tap="editShopInfo">保存</view>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				type: 2,
				serviceStartTime: "09:00",
				serviceEndTime: "21:00"
			}
		},
		onLoad() {

		},
		methods: {
			bindStartChange(e) {
				this.serviceStartTime = e.target.value
			},
			bindEndChange() {
				this.serviceEndTime = e.target.value
			},
			changeType(type) {
				if (this.type == type) return;
				this.type = type;
			},
			
			editShopInfo() {
				if(this.type == 1) {
					uni.setStorageSync("serviceStartTime", "00:00");
					uni.setStorageSync("serviceEndTime", "23:59");
				}else {
					uni.setStorageSync("serviceStartTime", this.serviceStartTime);
					uni.setStorageSync("serviceEndTime", this.serviceEndTime);
				}
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.form-box {
		padding: 10rpx 21rpx 0rpx 21rpx;
		margin-top: 21rpx;
		margin-left: 29rpx;
		width: 692rpx;
		background: #FFFFFF;
		border-radius: 5px;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, .18);
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

	.cat_detail_img {
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
		/* 		text-align: right; */
	}

	.text7 {
		width: 50%;
		text-align: center;
	}

	.set_arrow {
		width: 28rpx;
		height: 34rpx;
	}

	.set_arrow_logo {
		width: 60rpx;
		height: 60rpx;
	}

	.set_bor {
		border-bottom: 1rpx solid #f5f5f5;
	}

	.set_align {
		align-items: center;
		justify-content: space-between;
	}

	.set_inupt {
		width: 200rpx;
		font-size: 28rpx;
		border: #999999 1rpx solid;
		height: 60rpx;
		text-align: center;
		line-height: 58rpx;
	}

	.set_bigbtn {
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
	
	.radio {
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		border: 1px solid #f5f5f5;
		margin-right: 20rpx;
		
		&.active {
			border: none;
			
			image {
				width: 30rpx;
				height: 30rpx;
			}
		}
	}

	/*btn*/
	.set_foot {
		width: 690rpx;
		margin: 80rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.set_btn_a {
		width: 320rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #FF6619;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #FFFFFF;
	}

	.set_btn_n {
		width: 320rpx;
		height: 78rpx;
		line-height: 78rpx;
		text-align: center;
		border: 1rpx solid #FF6619;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #FF6619;
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
