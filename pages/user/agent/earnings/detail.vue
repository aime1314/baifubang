<template>
	<view :class="['content', 'revenueDetailMsgBox', isShow ? 'hidden' : '']">
		<view class="revenueSearchBox" @tap="changeArea">
			<view>{{name}}代理中心</view>
			<image src="/static/icon_jt.png" ></image>
		</view>
		<view class="setyear">
			<picker fields="month" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="setyear_font">{{date}}</view>
			</picker>
			<image src="/static/icon_xl.png" ></image>
		</view>
		<view class="money-m">
			<view><text>收入<text  style="color:#FF6619; margin-left: 10rpx;">¥{{s_sum}}</text></text></view>
		</view>
		<view class="moneyListBox">
			<template v-for="(item, index) in list">
				<view class="moneyListMsg" :key="index">
					<view class="name">
						<view class="l">商户：{{item.shopName}}</view>
						<view class="r">消费会员：{{item.userName}}</view>
					</view>
					<view class="money">
						<view class="l">收入时间：{{item.time}}</view>
						<view class="r">推广收益：<text>+{{item.nub}}</text></view>
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
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
				areaId: "",
				start: "",
				page: 1,
				page_size: 20,
				list: [],
				s_sum: 0,
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
			};
		},
		onLoad() {
			this.getAgentTeamList();
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			
			getAgentProfitList() {
				let config = {
					areaId: this.areaId,
					start: this.start,
					page: this.page,
					page_size: this.page_size
				}
				this.$api.getAgentProfitList(config).then(res => {
					if(res.code == 200) {
						this.s_sum = res.data.s_sum;
						this.list = res.data.list;
					}
				})
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
						this.getAgentProfitList();
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
				this.getAgentProfitList();
			},
			
			bindDateChange(e) {
				this.date = e.target.value;
				this.start = e.target.value;
				this.page = 1;
				this.pageLength = 0;
				this.getAgentProfitList();
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
	.revenueDetailMsgBox{display: flex; flex-direction: column;background-color: #F4F4F4; color: #333;height: 100%;
		.revenueSearchBox {margin-top: 30rpx;font-size: 32rpx;display: flex;align-items: center;justify-content: center;
			image {padding-left: 16rpx;width: 30rpx;height: 20rpx;}
		}
		.setyear {margin: 30rpx 0 0 30rpx;display: flex;justify-content: flex-start;align-items: center;
			.setyear_font {font-size: 32rpx;}
			image {	padding-left: 16rpx;width: 30rpx;height: 30rpx;}
		}
		.money-m {margin: 20rpx 0 0 30rpx;font-size: 30rpx;color: #999;
			view{display: inline-block; margin-right: 30rpx;
				text{color: #999;}
			}
		}
		.moneyListBox{background: #FFFFFF; margin-top: 50rpx;
			.moneyListMsg{
				border-bottom: solid 1rpx #d7d7d7;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				padding: 26rpx 30rpx;
				
				.name {
					width: 100%;
					margin-bottom: 8rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					view {
						
						white-space:nowrap;
						text-overflow:ellipsis;
						-o-text-overflow:ellipsis;
						overflow: hidden;
					}
					.l {
						width: 50%;
						font-size: 28rpx;
						color: #333;
					}
					.r {
						width: 50%;
						font-size: 28rpx;
						color: #333;
						text-align: right;
					}
				}
				
				.money {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					view {
						white-space:nowrap;
						text-overflow:ellipsis;
						-o-text-overflow:ellipsis;
						overflow: hidden;
					}
					
					.l {
						width: 50%;
						font-size: 28rpx;
						color: #999;
					}
					
					.r {
						width: 50%;
						font-size: 28rpx;
						color: #333;
						text-align: right;
						
						text {
							color: #FF6619;
						}
					}
				}
			}
			.moneyListMsg:last-child{border-bottom: 0; padding-bttom:0;}
		}
	}
	
	.content {
		
		&.hidden {
			overflow: hidden;
			height: 100%;
		}
	}
	
	.mask {
		position: fixed;
		top: 100rpx;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		visibility: hidden;
		background-color: rgba(0,0,0,0.6);
	}
	
	.picker-view {
		position: fixed;
		top: 100rpx;
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
	
</style>
