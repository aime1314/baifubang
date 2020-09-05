<template>
	<view class="content">
		<view class="form-box">
			<view class="form-area set_bor">
				<view class="label">真实姓名</view>
				<view class="text">
					<input class="set_inupt" type="text" v-model="real_name" placeholder="请输入您的真实姓名" />
				</view>
			</view>
			<view class="form-area set_bor">
				<view class="label">手机号</view>
				<view class="text2">
					<input class="set_inupt" type="number" maxlength="11" v-model="mobile" placeholder="请输入您的手机号" />
				</view>
			</view>
			<view class="form-area set_align set_bor" @tap="changeAddress">
				<view class="label">所在地区</view>
				<view class="set_inupt" :class="{ccc: !address}">
					{{address ? address : "请输入所在地区"}}
				</view>
				<image class="set_arrow" src="/static/arrow.png"></image>
			</view>
			<view class="form-area">
				<view class="label">详细地址</view>
				<view class="text2">
					<input class="set_inupt" type="text" v-model="userAddress" placeholder="请输入详细地址" />
				</view>
			</view>
		</view>
		<view class="set_bigbtn" @tap="pushIn">提交审核</view>
		<view class="form-box">
			<view class="pushin_top">
				<view class="pushin_h"></view>
				<view class="pushin_tit">推广员入驻须知</view>
				<view class="pushin_h"></view>
			</view>
			<view class="pushin_con">
				1、推广员的须知推广员的须知推广员的须知推广员的须知推广员的须知推广员的须知推广员的须知推广员的须知推广员的须知推广员的须知 <br>2、推广员的须知推广员的须知推广员的须知推广员的须知推广…
			</view>
		</view>
		<picker-address v-model="addressShow" @confirm="addresspick"></picker-address>
	</view>
</template>

<script>
	import pickerAddress from "@/components/pickerAddress/index.vue";
	export default {
		components: {
			pickerAddress
		},
		data() {
			return {
				addressShow: false,
				form: {
					province: '',
					city: '',
					area: '',
				},
				address: '',
				real_name: "",
				mobile: "",
				province: "",
				city: "",
				area: "",
				userAddress: ""
			}
		},
		onLoad() {
			
		},
		methods: {
			changeAddress() {
				this.addressShow = true;
			},
			addresspick(obj) {
				console.log(obj);
				let arr = [ 'province', 'city', 'area'];
				let place = '';
				arr.map(key => {
					this.form[key] = obj[key].areaId
					place += obj[key].areaName
				})
				this.address = place;
				this.province = obj.province.areaId;
				this.provinceName = obj.province.areaName;
				this.city = obj.city.areaId;
				this.cityName = obj.city.areaName;
				this.area = obj.area.areaId;
				this.areaName = obj.area.areaName;
				console.log(this.form);
			},
			
			// 提交审核
			pushIn() {
				let config = {
					real_name: this.real_name,
					mobile: this.mobile,
					province: this.province,
					city: this.city,
					area: this.area,
					address: this.userAddress
				}
				if(config.real_name == "") {
					uni.showToast({
						title: '请输入您的真实姓名',
						icon: "none"
					});
					return false;
				}
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(config.mobile))) {
					uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
					return false;
				}
				if(config.area == "") {
					uni.showToast({
						title: '请输入您的所在地区',
						icon: "none"
					});
					return false;
				}
				if(config.address == "") {
					uni.showToast({
						title: '请输入您的详细地址',
						icon: "none"
					});
					return false;
				}
				console.log(config);
				this.$api.pushIn(config).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: '申请成功',
							icon: "none"
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						},1500)
						
					}else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						},1500)
					}
				});
			}
		}
	}
</script>

<style>
	.content{
		min-height: 100%;
		background: #F4F4F4;
		padding-top: 40rpx;
		padding-bottom: 30rpx;
	}
	.form-box {
		width: 690rpx;
		margin: 10rpx auto 20rpx;
		background: #fff;
		box-shadow: 3rpx 3rpx 6rpx rgba(0,0,0,0.28);
		border-radius: 8rpx;
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
	.text {
		flex: 1;
	}
	.set_arrow{
		width: 28rpx;
		height: 34rpx;
	}
	.set_bor{
		border-bottom: 1rpx solid #f5f5f5;
	}	
	.set_align{
		align-items: center;
		justify-content: space-between;
	}
	.set_inupt{
		width: 470rpx;
		font-size: 28rpx;
	}
	.set_inupt.ccc {
		color: #777;
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
	.pushin_top{
		padding: 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.pushin_tit{
		font-size: 28rpx;
		color: #333333;
	}
	.pushin_h{
		margin: 0rpx 30rpx;
		width: 60rpx;
		height: 4rpx;
		background: #DADCDF;
	}
	.pushin_con{
		padding: 0rpx 30rpx;
		min-height: 300rpx;
		font-size: 26rpx;
		color: #666666;
		line-height: 40rpx;
	}
	
	
	
	
	
	
	
	
	.wd-log {
	  padding-top: 30rpx;
	  background-color: #fff;
	}
	
	.wd-scroll {
	  flex: 1;
	  overflow: hidden;
	  flex-direction: column;
	  background-color: #fff;
	  padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
	}
	
	.wd-title2 {
	  padding: 0 30rpx;
	  font-size: 32rpx;
	  font-family: PingFangSC-Medium;
	  font-weight: 500;
	  color: rgba(51, 51, 51, 1);
	  line-height: 44rpx;
	  margin-bottom: 30rpx;
	}
	
	.wd-table {
	  display: flex;
	  border-bottom: 1rpx solid #eaecf1;
	}
	
	.wd-table text {
	  width: 33.3%;
	  text-align: center;
	}
	
	.wd-table-title {
	  font-size: 30rpx;
	  font-family: PingFangSC-Regular;
	  font-weight: 400;
	  color: rgba(51, 51, 51, 1);
	  line-height: 42rpx;
	  padding-bottom: 20rpx;
	}
	
	.wd-table-content {
	  font-size: 28rpx;
	  font-family: PingFangSC-Regular;
	  font-weight: 400;
	  color: rgba(102, 102, 102, 1);
	  line-height: 40rpx;
	  padding: 30rpx 0;
	}
	
	.color-blue {
	  color: #3c78ff;
	}
	
	.color-red {
	  color: #e02e24;
	}
	
	.color-green {
	  color: #0eab83;
	}
	
	.color-gray {
	  color: #999;
	}
	.withdraw-type {
	  border-bottom: 10rpx solid #f4f4f4;
	}
	.withdraw-type-box {
	  display: flex;
	  align-items: center;
	  height: 116rpx;
	  padding: 20rpx 30rpx;
	  background: #fff;
	}
	.withdraw-icon {
	  width: 46rpx;
	  height: 36rpx;
	  margin-right: 20rpx;
	}
	.withdraw-title {
	  flex: 1;
	  font-size: 32rpx;
	  color: #666;
	}
	.withdraw-checkbox {
	  display: inline-block;
	  width: 34rpx;
	  height: 34rpx;
	  border: 2rpx solid #999;
	  border-radius: 50%;
	  margin-right: 20rpx;
	}
	.withdraw-checkbox image {
	  display: none;
	}
	.withdraw-checkbox.selected {
	  background: linear-gradient(135deg, #FC6868 0%, #E02E24 100%);
	  border: none;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	
	.withdraw-checkbox.selected image {
	  display: inline-block;
	  margin-top: 4rpx;
	  width: 20rpx;
	  height: 16rpx;
	}
	
</style>
