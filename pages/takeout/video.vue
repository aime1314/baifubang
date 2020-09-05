<template>
	<view class="page" :style="{ height: height + 'px', width: width }">
		<view class="nav" :style="{'padding-top': statusBarHeight + 'px', height: statusBarHeight + 45 + 'px'}">
			<view class="nav-title">
				<image class="back" @tap="back" src="/static/ic_back_white.png"></image>
			</view>
		</view>
		<view class="swiper" :style="{ height: height + 'px', width: width }">
			<movable-area :style="{height: heigh + 'px', width: width}">
				<movable-view :style="{height: height + 'px', width: width}" @touchstart="touchstart" @vtouchmove="touchmove" @touchend="touchend">
					<view class="touch-item"  :style="{height: height + 'px', width: width}">
						<video 
						:style="{height: height + 'px', width: width}"
						:src="src" 
						:autoplay="true"
						:loop="true"
						:show-fullscreen-btn="false"
						:enable-progress-gesture="false"
						controls
						></video>
					</view>
				</movable-view>
			</movable-area>
			
			<view class="cover-view-right">
				<image :src="shopImg != '' ? shopImg : '/static/default.png'" class="avater"></image>
				<image src="/static/icon_follow.png" class="right-text-avater" @tap="followShop" v-if="follow == 2"></image>
				<image :src="zan == 1 ? '/static/icon_live_a.png' : '/static/icon_live_d.png'" class="img" @tap="switchVodeoLike"></image>
				<view class="right-text">{{like}}</view>
				<image src="/static/icon_comments.png" class="img" @tap="changeComment"></image>
				<view class="right-text">{{comment}}</view>
				<view class="img btn">
					<image src="/static/share-fill.png" class="imgs"></image>
					<button type="default" class="btns" open-type="share"></button>
				</view>
				
				<!-- <image src="/static/share-fill.png" class="img"></image> -->
			</view>
			<view class="comment-mark" v-if="isCommentMark" @tap="closeConnent"></view>
			<view class="comment-box" :style="{height: commentHeight + 'px'}" v-if="isCommentMark">
				<view class="head">
					<text>{{commentCount > 0 ? commentCount+'条评论' : '暂无评论'}}</text>
					<image src="/static/icon_takeout_comment_close.png"  class="close" @tap="closeConnent"></image>
				</view>
				<scroll-view scroll-y class="list" @scrolltolower="loadComment" :style="{height: scrollHeight + 'px'}">
					<view class="item" v-for="(item, index) in commentList" :key="index">
						<view class="l">
							<image :src="item.userPhoto" class="avatar"></image>
						</view>
						<view class="r">
							<view class="name">{{item.userName}}</view>
							<view class="text">{{item.content}}<text class="time">{{item.time}}</text></view>
						</view>
					</view>
				</scroll-view>
			</view>
			<template v-if="false">
				<cover-view class="cover-view-left">
					<cover-view class="goods-box">
						<cover-view class="goods_base" @tap="isGoodsMark = true">
							<cover-image src="/static/icon_takeout_img.png" class="goods_img"></cover-image>
							<cover-view class="goods_name">{{goodsName}}</cover-view>
						</cover-view>
						
					</cover-view>
					<cover-view class="left-view">
						<cover-view class="left-text">{{content}}</cover-view>
					</cover-view>
					
					<cover-view class="mark-box" v-if="isGoodsMark">
						<cover-view class="head">
							<cover-image src="/static/icon_takeout_shop.png" class="mark-shop"></cover-image>
							<cover-view class="mark-title">视频同款商品</cover-view>
							<cover-image src="/static/icon_takeout_close.png" class="mark-close" @tap="isGoodsMark = false"></cover-image>
						</cover-view>
						<cover-view class="goods">
							<cover-image :src="goodsImg" class="goods-img"></cover-image>
							<cover-view class="info">
								<cover-view class="desc">{{goodsContent}}</cover-view>
								<cover-view class="price">￥{{price}}</cover-view>
							</cover-view>
							<cover-image src="/static/icon_takeout_cart.png" class="goods-cart"></cover-image>
						</cover-view>
					</cover-view>
				</cover-view>
				<cover-view class="cover-view-right">
					<cover-image :src="shopImg != '' ? shopImg : '/static/default.png'" class="avater"></cover-image>
					<cover-image src="/static/icon_follow.png" class="right-text-avater" @tap="followShop" v-if="follow == 2"></cover-image>
					<cover-image :src="zan == 1 ? '/static/icon_live_a.png' : '/static/icon_live_d.png'" class="img" @tap="switchVodeoLike"></cover-image>
					<cover-view class="right-text">{{like}}</cover-view>
					<cover-image src="/static/icon_comments.png" class="img" @tap="changeComment"></cover-image>
					<cover-view class="right-text">{{comment}}</cover-view>
					
					<cover-image src="/static/share-fill.png" class="img"></cover-image>
				</cover-view>
				
				<cover-view class="comment-mark" v-if="isCommentMark">
					<cover-view class="head">
						{{commentCount > 0 ? commentCount+'条评论' : '暂无评论'}}
						<cover-image src="/static/icon_takeout_comment_close.png" class="close" @tap="isCommentMark = false"></cover-image>
					</cover-view>
					<cover-view class="list" scroll-y >
						<cover-view class="item" v-for="(item, index) in commentList" :key="index">
							<cover-view class="l">
								<cover-image :src="item.userPhoto" class="avatar"></cover-image>
							</cover-view>
							<cover-view class="r">
								<cover-view class="name">{{item.userName}}</cover-view>
								<cover-view class="text">{{item.content}}<cover-view class="time">{{item.time}}</cover-view></cover-view>
							</cover-view>
						</cover-view>
					</cover-view>
					<!-- <cover-view class="btn-area">
						<input type="text" v-model="text" placeholder="快来写下你的评论吧~" class="input" />
						<cover-view class="submit">发送</cover-view>
					</cover-view> -->
				</cover-view>
				
			</template>
			
			<view class="mask" v-if="isInputMark" @tap="closeInputMask"></view>
			<view class="btn-area" :style="{bottom: bottom + 'px'}" v-if="isCommentMark">
				<input type="text" v-model="text" :adjust-position="false" @focus="focus" @blur="blur" placeholder="快来写下你的评论吧~" class="input" />
				<view class="submit" @tap="postComment">发送</view>
			</view>
		</view>
		
	</view>
</template>
<script>
	
	export default {
		data() {
			return {
				id: "",
				statusBarHeight: 0,
				sysheight: 0,
				height: "667",
				width: "",
				commentHeight: "400",
				scrollHeight: "360",
				index: 0,
				videoList: [],
				oldIndex:0,
				playCount:2,//剩余多少视频加载视频列表
				startX: "",
				startY: "",
				isTouchMove: false,
				src: "",
				content: "",
				zan: 2,	// zan 1 为点赞视频
				follow: 2,	// follow 1 为关注了这个商户
				like: 0,	// 点赞数量
				comment: 0,	// 评论数量
				shopId: "",	// 店铺id
				price: "",	// 商品价格
				goodsContent: "",	// 商品简介
				goodsId: "",	// 商品id
				goodsName: "",	// 商品名
				goodsImg: "",	// 商品照片
				isGoodsMark: false,
				shopImg: "",
				text: "",
				isCommentMark: false,
				commentCount: 0,
				commentList: [],
				isInputMark: false,
				bottom: 0,
				page: 1,
				page_size: 20,
				pageLength: 0,
				isLoad: false,
				img: ""
			}
		},
		onLoad(options) {
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			// 获取可使用窗口高度
			this.sysheight = uni.getSystemInfoSync().windowHeight;
			// 设置页面高度
			this.height = `${this.sysheight}`;
			let width = uni.getSystemInfoSync().windowWidth;
			this.width = `${width}px`;
			this.id = options.id || 9;
			this.commentHeight = Math.floor(this.sysheight / 3 * 2);
			this.scrollHeight = Math.floor(this.sysheight / 3 * 2) - 40;
			
		},
		
		onShow() {
			// 获取视频详情
			this.getVideoDetail();
			// 获取视频是否点赞
			this.getVideoZan();
		},
		
		onHide() {
			
		},
		
		onReady() {
			
		},
		
		onShareAppMessage(res) {
			return {
				title: this.content,
				path: '/pages/takeout/video?id=' + this.id,
				imageUrl: this.img
			}
		},
		
		methods: {
			
			focus(e) {
				this.isInputMark = true;
				this.bottom = e.detail.height;
			},
			
			blur(e) {
				this.bottom = 0;
				this.isInputMark = false;
			},
			
			closeInputMask() {
				this.isInputMark = false;
				this.bottom = 0;
			},
			
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			
			// 获取视频详情
			getVideoDetail() {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) return;
				// #endif
				let config = {
					id: this.id
				}
				this.$api.getVideoDetail(config).then(res => {
					this.src = res.data.video;
					this.content = res.data.content;
					this.goodsName = res.data.goodsName;
					this.like = res.data.zan;
					this.comment = res.data.ping;
					this.shopId = res.data.shopId;
					this.price = res.data.price;
					this.goodsContent = res.data.content;
					this.goodsId = res.data.goodsId;
					this.goodsImg = res.data.goodsImg;
					this.shopImg = res.data.shopImg;
					this.img = res.data.img;
					
				});
			},
			
			// 获取视频是否点赞
			getVideoZan() {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) return;
				// #endif
				let config = {
					id: this.id
				}
				this.$api.getVideoZan(config).then(res => {
					this.zan = res.data.zan;
					this.follow = res.data.follow;
				});
			},
			
			// 关注商户
			followShop() {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) {
					return uni.navigateTo({ url: "/pages/auth/impower" });
				}
				// #endif
				let config = {
					shopId: this.shopId
				}
				this.$api.followShop(config).then(res => {
					if(res.code == 200) {
						if(res.data.type == 2) {
							this.follow = 1;
							uni.showToast({
								title: "关注成功"
							})
						}
						if(res.data.type == 1) {
							this.follow = 2;
						}
					}
				});
			},
			
			// 视频点赞
			switchVodeoLike() {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) {
					return uni.navigateTo({ url: "/pages/auth/impower" });
				}
				// #endif
				let config = {
					id: this.id
				}
				this.$api.switchVodeoLike(config).then(res => {
					if(res.code == 200) {
						if(res.data.type == 1) {
							this.zan = 2;
							this.like = this.like-1;
						}
						if(res.data.type == 2) {
							this.zan = 1;
							this.like = this.like+1;
						}
					}
				});
			},
			
			// 打开评论列表，加载评论数据
			changeComment() {
				// #ifdef MP-WEIXIN
				if (!uni.getStorageSync("openId") || !uni.getStorageSync('token')) {
					return uni.navigateTo({ url: "/pages/auth/impower" });
				}
				// #endif
				this.isCommentMark = true;
				this.getVideoCommentList();
			},
			
			// 关闭评论列表
			closeConnent() {
				this.isCommentMark = false;
				this.isInputMark = false;
				this.commentList = [];
			},
			
			// 获取视频评论列表
			getVideoCommentList() {
				let config = {
					id: this.id,
					page: this.page,
					page_size: this.page_size
				}
				this.$api.getVideoCommentList(config).then(res => {
					if(res.code == 200) {
						this.pageLength = res.data.list.length;
						this.isLoad = true;
						this.commentCount = res.data.count;
						this.commentList = this.commentList.concat(res.data.list);
					}
				});
			},
			
			loadComment() {
				if(!this.isLoad) return;
				if(this.pageLength ==  20) {
					this.isLoad = false;
					this.page = this.page+1;
					this.getVideoCommentList();
				}
			},
			
			// 评论
			postComment() {
				let config = {
					id: this.id,
					content: this.text
				}
				this.$api.postComment(config).then(res => {
					
					if(res.code == 200) {
						this.isInputMark = false;
						this.text = "";
						this.commentList = [];
						this.page = 1;
						this.getVideoCommentList();
						
					}
				});
			},
			
			// 手指触摸动作开始 记录起点Y坐标
			touchstart(e) {
				this.startX = e.changedTouches[0].clientX;
				this.startY = e.changedTouches[0].clientY;
			},
			
			// 滑动事件处理
			touchmove(e) {
				// 开始X坐标
				let startX = this.startX;
				// 开始Y坐标
				let startY = this.startY;
				// 滑动变化X坐标
				let touchMoveX = e.changedTouches[0].clientX;
				// 滑动变化Y坐标
				let touchMoveY = e.changedTouches[0].clientY;
				let angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
				// console.log(Math.abs(angle));
				// console.log("开始坐标 "+ startY, "滑动后坐标 " + touchMoveY);
				
				// 滑动超过30度角 return
				if (Math.abs(angle) < 65) return;
				let distance = touchMoveY - startY;
				if(touchMoveY > startY) {
					if((touchMoveY - startY) > 50) {
						if(this.isTouchMove == false) {
							return false;
						}else {
							console.log("下滑");
							this.isTouchMove = false;
						}
					}
					
				}else {
					if((startY - touchMoveY) > 50) {
						if(this.isTouchMove == true) {
							return false;
						}else {
							console.log("上滑");
							this.isTouchMove = true;
						}
					}
				}
			},
			
			touchend() {
				console.log("触摸结束")
			},
			
			
			/**
			   * 计算滑动角度
			   * @param {Object} start 起点坐标
			   * @param {Object} end 终点坐标
			   */
			angle(start, end) {
				var _X = end.X - start.X,
				_Y = end.Y - start.Y
				//返回角度 /Math.atan()返回数字的反正切值
				return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
			},
			
		},
		
		watch: {
		}
	}
	
</script>

<style lang="scss">
	cover-view {
		line-height: 1;
		overflow: initial;
		white-space: normal;
	}
	.nav {
		width: 750rpx;
		height: 45px;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10005;
	}
	.nav-title {
		width: 750rpx;
		height: 45px;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.back {
		width: 20rpx;
		height: 36rpx;
		position: absolute;
		top: 7rpx;
		left: 10rpx;
		padding: 10px 15px;
		z-index: 10000;
	}
	.swiper {
		position: relative;
	}
	
	.comment-mark {
		z-index: 9999;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.6);
		position: absolute;
		top: 0;
	}
	
	.comment-box {
		position: absolute;
		bottom: 72rpx;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 800rpx;
		background-color: #fff;
		z-index: 10000;
		
		.head {
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			color: #333;
			position: relative;
			
			.close {
				position: absolute;
				width: 32rpx;
				height: 32rpx;
				top: 30rpx;
				right: 30rpx;
			}
		}
		
		.list {
			padding: 0 30rpx;
			height: 360rpx;
			overflow-y: scroll;
			box-sizing: border-box;
			.item {
				display: flex;
				margin-bottom: 20rpx;
				
				.l {
					width: 68rpx;
					height: 68rpx;
					margin-right: 20rpx;
					
					.avatar {
						width: 68rpx;
						height: 68rpx;
						border-radius: 50%;
					}
				}
				
				.r {
					flex: 1;
					
					.name {
						font-size: 28rpx;
						color: #333;
						line-height: 40rpx;
						padding: 14rpx 0;
					}
					
					.text {
						font-size: 28rpx;
						color: #333;
						line-height: 40rpx;
					}
					
					.time {
						display: inline-flex;
						line-height: 40rpx;
						margin-left: 30rpx;
						font-size: 24rpx;
						color: #999;
					}
				}
			}
		}
		
		
	}
	.mask {
		z-index: 10001;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.6);
		position: absolute;
		top: 0;
	}
	
	.btn-area {
		z-index: 10002;
		position: fixed;
		left: 0;
		right: 0;
		width: 100%;
		height: 84rpx;
		border-top: 1rpx solid #999;
		padding-left: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		box-sizing: border-box;
		
		.input {
			width: 590rpx;
			padding: 12rpx 0;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 28rpx;
			color: #333;
		}
		
		.submit {
			height: 80rpx;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #333;
			padding: 0 30rpx;
		}
	}
	
	.cover-view-left {
		position: absolute;
		margin-left: 40rpx;
		// max-width: 500rpx;
		bottom: 120rpx;
		z-index: 9999;
		
		.left-view {
			max-width: 500rpx;
			white-space: pre-wrap;
			text-overflow: ellipsis;
			overflow: hidden;
			font-size: 28rpx;
			color: #fff;
		}
	}
	
	.goods_base {
		background-color: #5a5a5a;
		border-radius: 8rpx;
		padding: 10rpx 10rpx;
		margin-bottom: 10rpx;
		display: inline-flex;
		align-items: center;
		
		.goods_img {
			width: 48rpx;
			height: 48rpx;
			margin-right: 15rpx;
		}
		
		.goods_name {
			font-size: 26rpx;
			color: #fff;
		}
	}
	
	
	.mark-box {
		position: absolute;
		left: 0;
		bottom: 140rpx;
		background-color: #fff;
		border-radius: 20rpx;
		width: 500rpx;
		
		.head {
			height: 80rpx;
			border-bottom: 1rpx solid #999;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			position: relative;
			
			.mark-shop {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
			
			.mark-title {
				font-size: 26rpx;
				color: #333;
			}
			
			.mark-close {
				position: absolute;
				right: 22rpx;
				top: 22rpx;
				width: 36rpx;
				height: 36rpx;
			}
			
		}
		
		.goods {
			padding: 20rpx 20rpx;
			display: flex;
			
			.goods-img {
				width: 114rpx;
				height: 80rpx;
				margin-right: 10rpx;
			}
			
			.info {
				flex: 1;
				padding-right: 60rpx;
				
				.desc {
					font-size: 26rpx;
					color: #333;
				}
				
				.price {
					font-size: 30rpx;
					color: #ED6C1B;
				}
				
			}
			.goods-cart {
				position: absolute;
				bottom: 20rpx;
				right: 20rpx;
				width: 40rpx;
				height: 40rpx;
			}
			
			
		}
	}
	
	.cover-view-right {
		position: absolute;
		bottom: 160rpx;
		right: 50rpx;
		display: flex;
		flex-direction: column;
		z-index: 9999;
		align-items: center;
		
		.btn {
			position: relative;
			
			.imgs {
				width: 80rpx;
				height: 80rpx;
				
			}
			
			.btns {
				position: absolute;
				width: 80rpx;
				height: 80rpx;
				top: 0;
				left: 0;
				opacity: 0;
			}
		}
	}
	
	.avater {
		width: 94rpx;
		height: 94rpx;
		border-radius: 50rpx;
		border-color: #fff;
		border-style: solid;
		border-width: 2px;
		margin-bottom: 50rpx;
	}
	
	.right-text-avater {
		position: absolute;
		font-size: 28rpx;
		top: 80rpx;
		left: 31rpx;
		height: 40rpx;
		width: 40rpx;
		background-color: #DD524D;
		color: #FFFFFF;
		border-radius: 50%;
		text-align: center;
		line-height: 40rpx;
		z-index: 999;
	}
	
	.right-text {
		text-align: center;
		font-size: 28rpx;
		color: #FFFFFF;
		margin-bottom: 40rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
	}
	
	.img {
		height: 80rpx;
		width: 80rpx;
	}
	
	
	
</style>
