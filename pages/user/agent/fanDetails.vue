<template>
	<view :class="['content', isShow ? 'hidden' : '']">
		<view class="page-heard">
			<view class="heard-ct">
				<view class="title">数据统计</view>
			</view>
			<view class="heard-ct" @tap="changeArea">{{name}}代理中心<image src="/static/icon_jt.png" ></image></view>
		</view>
		
		<view class="fan">
			<!-- 注:具体到某个推广员时,此处不显示代理中心选择 -->
			<view class="fan_Info">
				<view class="fan_style">
					<view class="fan_text">今日新增</view>
					<view class="fan_num">{{today}}</view>
				</view>
				<view class="fan_style order">
					<view class="fan_text">本月新增</view>
					<view class="fan_num">{{month}}</view>
				</view>
				<view class="fan_style">
					<view class="fan_text">累计粉丝</view>
					<view class="fan_num">{{total}}</view>
				</view>
			</view>
		</view>
		<view class="bill_message">
			<template v-for="(item, index) in list">
				<view class="bill_message_style" :key="index">
					<view class="bill_head">
						<image class="bill_img" :src="item.userPhoto"></image>
					</view>
					<view class="bill_float">
						<view>
							<view class="bill_name">{{item.userName}}</view>
							<view class="bill_date clccc">注册时间:{{item.createTime}}</view>
						</view>
						<view>
							<view class="bill_money clccc">累计消费:{{item.shop_sum}}</view>
							<view class="bill_money clccc">总订单量:{{item.shop_count}}</view>
						</view>
					</view>
				</view>
			</template>
			
		</view>
		
		<view :class="['mask', isShow ? 'mask-show' : '']" @tap="reset"></view>
		
		<view :class="['picker-view', isShow ? 'mask-show' : '']">
			<view class="area-box">
				<view class="area-item provinces" style="height: 100%">
					<scroll-view :scroll-y="true" style="height: 100%">
						<view class="item" v-for="(item, index) in levelOne" :key="index" :class="{active: chooseP == index}" @tap="getCityList(item.areaId, index)">
							<text>{{item.areaName}}</text>
						</view>
					</scroll-view>
				</view>
				
				<view class="area-item city" style="height: 100%">
					<scroll-view :scroll-y="true" style="height: 100%">
						<view class="item" v-for="(item, index) in levelTwo" :key="index" :class="{active: chooseC == index}" @tap="getAreaList(item.areaId, index)">
							<text>{{item.areaName}}</text>
						</view>
					</scroll-view>
				</view>
				
				<view class="area-item area" style="height: 100%">
					<scroll-view :scroll-y="true" style="height: 100%">
						<view class="item" v-for="(item, index) in levelThree" :key="index" :class="{active: chooseA == index}" @tap="selectArea(item.areaId, index)">
							<text>{{item.areaName}}</text>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="tab-area">
				<view class="icon_reset" @tap="reset">
					<image src="/static/icon_reset.png" ></image>
					<view>重置</view>
				</view>
				<view class="btn-box">
					<view class="btn" @tap="chooseArea">确定</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				areaId: "",
				page: 1,
				page_size: 20,
				today: 0,
				month: 0,
				total: 0,
				provinces: [],
				citys: [],
				areas: [],
				levelOne: [],
				levelTwo: [],
				levelThree: [],
				tempLevelTwo: [],
				isShow: false,
				chooseP: 0,
				chooseC: 0,
				chooseA: 0,
				name: "",
				tempAreaId: "",
				levelOneName: "",
				levelTwoName: "",
				levelThreeName: "",
				isLoad: false,
				pageLength: 0
			}
		},
		onLoad() {
			// 获取商户粉丝列表
			this.getAgentTeamList();
		},
		// 上拉加载
		onReachBottom() {
			if(!this.isLoad) return;
			if(this.pageLength ==  20) {
				this.isLoad = false;
				this.page = this.page+1;
				this.getAgentfans();
			}
		},
		methods: {
			// 获取商户粉丝列表
			getAgentfans() {
				let config = {
					areaId: this.areaId,
					page: this.page,
					page_size: this.page_size
				}
				this.$api.getAgentfans(config).then(res => {
					if(res.code == 200) {
						this.isLoad = true;
						this.pageLength = res.data.list.length;
						this.list = this.list.concat(res.data.list);
						this.total = res.data.total;
						this.month = res.data.month;
						this.today = res.data.today;
					}
				});
			},
			
			// 获取一级列表
			getAgentTeamList() {
				let config = {
					areaId: ""
				}
				this.$api.getAgentTeamList(config).then(res => {
					if(res.code == 200) {
						this.levelOne = res.data;
						this.areaId = this.levelOne[this.chooseP].areaId;
						this.tempAreaId = this.levelOne[this.chooseP].areaId;
						this.name = this.levelOne[this.chooseP].areaName;
						this.levelOneName = this.levelOne[this.chooseP].areaName;
						this.getAgentfans();
						// areaType   0 省  1 市  2 区   4 全国
						// 如果是省代理，添加市数据
						if(this.levelOne[this.chooseP].areaType == 0) {
							this.levelTwo = [];
							this.levelThree = [];
							this.levelTwo = [].concat({areaId: this.areaId, areaName: "不限"}, this.levelOne[this.chooseP].list);
							this.tempLevelTwo = [].concat({areaId: this.areaId, areaName: "不限"}, this.levelOne[this.chooseP].list);
						}
						if(this.levelOne[this.chooseP].areaType == 1) {
							this.levelTwo = [];
							this.levelThree = [];
							this.levelTwo = [].concat({areaId: this.areaId, areaName: "不限"}, this.levelOne[this.chooseP].list);
							this.tempLevelTwo = [].concat({areaId: this.areaId, areaName: "不限"}, this.levelOne[this.chooseP].list);
						}
						if(this.levelOne[this.chooseP].areaType == 2) {
							this.levelTwo = [];
							this.levelThree = [];
							this.tempLevelTwo = [];
						}
					}
				});
			},
			
			// 获取一级数据
			getCityList(areaId, index) {
				this.chooseP = index;
				this.chooseC = 0;
				this.chooseA = 0;
				this.tempAreaId = this.levelOne[this.chooseP].areaId;
				this.levelOneName = this.levelOne[this.chooseP].areaName;
				this.levelTwoName = "";
				this.levelThreeName = "";
				// areaType   0 省  1 市  2 区   4 全国
				// 如果是省代理，添加市数据
				if(this.levelOne[this.chooseP].areaType == 0) {
					this.levelTwo = [];
					this.levelThree = [];
					this.levelTwo = [].concat({areaId: areaId, areaName: "不限"}, this.levelOne[this.chooseP].list);
				}
				if(this.levelOne[this.chooseP].areaType == 1) {
					this.levelTwo = [];
					this.levelThree = [];
					this.levelTwo = [].concat({areaId: areaId, areaName: "不限"}, this.levelOne[this.chooseP].list);
				}
				if(this.levelOne[this.chooseP].areaType == 2) {
					this.levelTwo = [];
					this.levelThree = [];
				}
			},
			
			// 获取二级数据
			getAreaList(areaId, index) {
				this.chooseC = index;
				this.tempAreaId = areaId;
				let config = {
					areaId: areaId
				}
				if(index != 0) {
					this.levelTwoName = this.levelTwo[index].areaName;
					this.levelThreeName = "";
				}else {
					this.levelTwoName = "";
					this.levelThreeName = "";
				}
				if(this.levelOne[this.chooseP].areaId == areaId) {
					this.levelThree = [].concat({areaId: areaId, areaName: "不限"});
				}else {
					this.$api.getAgentTeamList(config).then(res => {
						if(res.code == 200) {
							this.levelThree = [];
							if(res.data.length == 0) {
								this.levelThree = [].concat({areaId: areaId, areaName: "不限"});
							}else {
								this.levelThree = [].concat({areaId: areaId, areaName: "不限"}, res.data[0].list);
							}
						}
					});
				}
				
			},
			
			// 三级数据
			selectArea(areaId, index) {
				this.chooseA = index;
				this.tempAreaId = areaId;
				if(index != 0) {
					this.levelThreeName = this.levelThree[index].areaName;
				}else {
					this.levelThreeName = "";
				}
			},
			
			changeArea() {
				if(this.isShow == true) return;
				this.isShow = true;
			},
			
			reset() {
				this.isShow = false;
				this.tempAreaId = "";
				this.levelOneName = "";
				this.levelTwoName = "";
				this.levelThreeName = "";
				this.chooseP = 0;
				this.chooseC = 0;
				this.chooseA = 0;
				this.levelTwo = this.tempLevelTwo;
				this.levelThree = [];
			},
			
			chooseArea() {
				this.areaId = this.tempAreaId;
				this.name = this.levelOneName + this.levelTwoName + this.levelThreeName;
				this.isShow = false;
				this.page = 1;
				this.pageLength = 0;
				this.getAgentfans();
			},
		},
	}
</script>

<style lang="scss">
	page {
		background: #f4f4f4;
	}
	.content {
		
		&.hidden {
			overflow: hidden;
			height: 100%;
		}
	}
	
	.page-heard {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 20rpx;
	
		.heard-ct {
			display: flex;
			padding: 0 10rpx;
			height: 50rpx;
			line-height: 50rpx;
			align-items: center;
	
			.title {
				font-weight: bold;
			}
	
			.profit-dec {
				font-size: 28rpx;
				color: #c3c3c0;
			}
			
			image {
				margin-left: 20rpx;
				width: 30rpx;
				height: 18rpx;
			}
		}
	}
	
	.mask {
		position: fixed;
		top: 90rpx;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		visibility: hidden;
		background-color: rgba(0,0,0,0.6);
	}
	
	.picker-view {
		position: fixed;
		top: 90rpx;
		left: 0;
		right: 0;
		opacity: 0;
		visibility: hidden;
		height: 800rpx;
		
		.area-box {
			height: 700rpx;
			display: flex;
			background-color: #fff;
			
			
			.area-item {
				display: flex;
				
				&.provinces {
					width: 164rpx;
					background-color: #f7f7f7;
				}
				
				&.city {
					width: 164rpx;
					background-color: #fff;
				}
				
				&.area {
					flex: 1;
					background-color: #fff;
				}
				
				.item {
					height: 100rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 32rpx;
					color: #333;
					
					&.active {
						color: #4BA664;
					}
				}
			}
		}
		
		.tab-area {
			height: 100rpx;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.icon_reset {
				width: 164rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				
				image {
					width: 40rpx;
					height: 40rpx;
				}
				view {
					width: 100%;
					text-align: center;
					font-size: 32rpx;
					color: #999;
				}
			}
			
			.btn-box {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				
				.btn {
					width: 500rpx;
					height: 80rpx;
					background-color: #4BA664;
					font-size: 30rpx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				
			}
			
		}
	}
	
	
	.mask-show {
		opacity: 1;
		visibility: visible;
		transform: scale(1);
	}
	
	.nav-bar {
		display: flex;
		background-color: #f8f8f8;
		color: #666666;
		font-size: 35rpx;
	
		.nav-heard {
			display: flex;
			// line-height: 100%;
			width: 100%;
			padding: 120rpx 0 40rpx 0;
			border-bottom: 1rpx solid #e7eae7;
			justify-content: center;
	
			.title {
				font-weight: bold;
			}
		}
	}
	
	.fan {
		padding: 0 20rpx;
	}
	
	.fan_title {
		margin: 30rpx 0 0 0;
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		padding: 0 30rpx;
	
		.fan_agency {
			display: flex;
			align-items: center;
		}
	
		image {
			padding-left: 16rpx;
			width: 30rpx;
			height: 20rpx;
		}
	}
	
	
	
	.fan_Info {
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		text-align: center;
		border-radius: 10rpx;
		height: 200rpx;
		align-items: center;
	
		.fan_style {
			width: 33%;
			padding: 20rpx 0;
			.fan_text {
				font-size: 32rpx;
			}
	
			.fan_num {
				font-size: 30rpx;
			}
		}
		.fan_style:nth-child(2) {
			border-left: 2rpx dotted #ddd;
			border-right: 2rpx dotted #ddd;
		}
	}
	
	.bill_message {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	
		.bill_message_style {
			margin: 20rpx 0 0 0;
			display: flex;
			padding: 30rpx 0;
			background-color: #FFFFFF;
	
			.bill_head {
				width: 100rpx;
				height: 100rpx;
				margin-left: 20rpx;
	
				.bill_img {
					border-radius: 50% !important;
				}
			}
	
			.bill_float {
				flex: 1;
				align-items: center;
				padding: 0 20rpx 0 30rpx;
				display: flex;
				justify-content: space-between;
	
				.clccc {
					line-height: 1.5em;
					color: #666;
				}
			}
	
			.bill_name {
				font-size: 28rpx;
				font-weight: bold;
				max-width: 300rpx;
				white-space:nowrap;
				text-overflow:ellipsis;
				overflow: hidden;
			}
	
			.bill_date {
				font-size: 28rpx;
			}
	
			.bill_money {
				font-size: 28rpx;
			}
		}
		.bill_message_style:last-child {
			margin-bottom: 30rpx;
		}
	}
</style>
