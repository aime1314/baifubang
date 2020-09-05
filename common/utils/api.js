import http from "./interface.js";
export default {
	
	// 微信支付
	wxPay(data, fn, fn2) {
		var payT = data;
		uni.requestPayment({
			'timeStamp': payT.timeStamp + "", // 时间戳从1970年1月1日至今的秒数，即当前的时间。
			'nonceStr': payT.nonceStr, // 随机字符串，长度为32个字符以下。
			'package': payT.package, // 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。
			'signType': 'MD5', // 签名算法，暂支持 MD5。
			'paySign': payT.paySign, // 签名
			'success'(res) {
				fn(res)
			},
			'fail'(res) {
				fn2(res)
			}
		})
	},
	
	// 支付宝支付
	ALiPay(data, fn, fn2) {
		var payT = data;
		uni.requestPayment({
			orderInfo: payT.orderInfo,
			success(res) {
				fn(res)
			},
			fail(res) {
				fn2(res)
			}
		})
	},
	
	// 获取首页banner
	getBanner(data) {
		return http.request({
			url: "/api/Ads/getIndexAds",
			method: "POST",
			data
		})
	},
	
	// 获取首页超级抢购
	getGoodsHot(data) {
		return http.request({
			url: "/api/GoodsNotBase/getGoodsHot",
			method: "POST",
			data
		})
	},
	
	// 获取推荐商家
	getRecommendShop(data) {
		return http.request({
			url: "/api/ShopsNotBase/getRecommendShop",
			method: "POST",
			data
		})
	},
	
	// 获取精选好物
	getGoodsBest(data) {
		return http.request({
			url: "/api/GoodsNotBase/getGoodsBest",
			method: "POST",
			data
		})
	},
	
	// 获取商品类目列表
	goodsClassList(data) {
		return http.request({
			url: "/api/Goods/goodsClassList",
			method: "POST",
			data
		})
	},
	
	// 关键字搜索商品/店铺
	serachKeywords(data) {
		return http.request({
			url: "/api/Goods/serachKeywords",
			method: "POST",
			data
		})
	},
	
	// 获取商品详情
	getGoodsDetail(data) {
		return http.request({
			url: "/api/GoodsNotBase/getGoodsDetail",
			method: "POST",
			data
		})
	},
	
	// 获取商品规格
	getGoodsSpec(data) {
		return http.request({
			url: "/api/GoodsNotBase/getGoodsSpec",
			method: "POST",
			data
		})
	},
	
	// 加入购物车
	addToCart(data) {
		return http.request({
			url: "/api/Carts/addCart",
			method: "POST",
			data
		})
	},
	
	// 立即购买
	goPayOrder(data) {
		return http.request({
			url: "/api/Carts/goCart",
			method: "POST",
			data
		})
	},
	
	// 获取确认订单页面详情
	confirmOrder(data) {
		return http.request({
			url: "/api/Orders/settlement",
			method: "POST",
			data
		})
	},
	
	// 获取支付的必要参数
	miniPay_lcm(data) {
		return http.request({
			url: "/app/wxpay/miniPay",
			method: 'POST',
			data
		})
	},
	
	// 获取微信支付必要参数
	wxPayOrder(data) {
		return http.request({
			url: "/api/Wx/goto_wx_pay_order",
			method: 'POST',
			data
		})
	},
	
	// 获取微信订单支付必要参数
	wxPayOrderOne(data) {
		return http.request({
			url: "/api/Wx/goto_wx_pay_order_one",
			method: 'POST',
			data
		})
	},
	
	// 获取支付宝支付必要参数
	ALiPayOrder(data) {
		return http.request({
			url: "/api/Wx/goto_ali_pay_order",
			method: 'POST',
			data
		})
	},
	
	// 获取支付宝订单支付必要参数
	ALiPayOrderOne(data) {
		return http.request({
			url: "/api/Wx/goto_ali_pay_order_one",
			method: 'POST',
			data
		})
	},
	
	// 获取钱包支付必要参数
	walletPayOrder(data) {
		return http.request({
			url: "/api/Wx/payByWallet",
			method: 'POST',
			data
		})
	},
	
	// 获取钱包订单支付必要参数
	walletPayOrderOne(data) {
		return http.request({
			url: "/api/Wx/payByWalletOne",
			method: 'POST',
			data
		})
	},
	
	// 获取微信openId
	getOpenid(data) {
		return http.request({
			url: "/api/Login/getOpenid",
			method: "POST",
			data
		})
	},
	
	// 获取支付宝userId
	getUserId(data) {
		return http.request({
			url: "/api/Login/getAliUserId",
			method: "POST",
			data
		})
	},
	
	// 验证获取token
	getUserToken(data) {
		return http.request({
			url: "/api/Login/getXcxSearchOpenid",
			method: "POST",
			data
		});
	},
	
	// 获取注册短信验证码
	getPhoneVerifyCode(data) {
		return http.request({
			url: "/api/Login/getPhoneVerifyCode",
			method: "POST",
			data
		})
	},
	
	// 登录
	login(data) {
		return http.request({
			url: "/api/Login/LoginRegist",
			method: "POST",
			data
		})
	},
	
	// 图片文字识别
	readImg(data) {
		return http.request({
			url: "/api/Transfer/img_read",
			method: "POST",
			data
		})
	},
	
	// 获取支付宝充值必要参数
	getALiPayMent(data) {
		return http.request({
			url: "/api/Wx/ali_prepayment",
			method: "POST",
			data
		});
	},
	
	// 获取微信充值必要参数
	getWxPayMent(data) {
		return http.request({
			url: "/api/Wx/prepayment",
			method: "POST",
			data
		});
	},
	
	// 获取收货地址列表
	getUserAddressList(data) {
		return http.request({
			url: "/api/Useraddress/useraddressList",
			method: "POST",
			data
		});
	},
	
	// 下单
	orderSubmit(data) {
		return http.request({
			url: "/api/Orders/orderSubmit",
			method: "POST",
			data
		});
	},
	
	// 获取用户余额
	getUserBalance(data) {
		return http.request({
			url: "/api/Transfer/getuser_balance",
			method: "POST",
			data
		});
	},
	
	// 获取购物车列表
	getCartList(data) {
		return http.request({
			url: "/api/Carts/cartList",
			method: "POST",
			data
		});
	},
	
	// 修改购物车商品状态
	editGoodsCheck(data) {
		return http.request({
			url: "/api/Carts/editGoodsCheck",
			method: "POST",
			data
		});
	},
	
	// 获取店铺信息
	getShopDetail(data) {
		return http.request({
			url: "/api/Shops/shopDetail",
			method: "POST",
			data
		});
	},
	
	// 用户通过店铺筛选商品
	getShopGoods(data) {
		return http.request({
			url: "/api/Goods/getOtherShopGoods",
			method: "POST",
			data
		});
	},
	
	// 折扣列表
	getDiscount(data) {
		return http.request({
			url: "/api/Shops/getDiscount",
			method: "POST",
			data
		});
	},
	
	// 商家注册第一步
	regShopOne(data) {
		return http.request({
			url: "/api/Shops/regShopOne",
			method: "POST",
			data
		});
	},
	
	// 商家入驻第二步
	regShopTwo(data) {
		return http.request({
			url: "/api/Shops/regShopTwo",
			method: "POST",
			data
		});
	},
	
	// 获取省市区
	getAddressData(data) {
		return http.request({
			url: "/api/Shops/area",
			method: "POST",
			data
		});
	},
	
	// 获取用户订单列表
	getUserOrders(data) {
		return http.request({
			url: "/api/Orders/getUserOrders",
			method: "POST",
			data
		});
	},
	
	// 查看订单详情
	getOrderInfo(data) {
		return http.request({
			url: "/api/Orders/getOrderInfo",
			method: "POST",
			data
		});
	},
	
	// 类目筛选商品/店铺
	goodsListByClass(data) {
		return http.request({
			url: "/api/Goods/goodsListByClass",
			method: "POST",
			data
		});
	},
	
	// 消息列表
	getMessagesList(data) {
		return http.request({
			url: "/api/Messages/getMessagesList",
			method: "POST",
			data
		});
	},
	
	// 消息详情[交易消息列表]
	getMessagesDetail(data) {
		return http.request({
			url: "/api/Messages/getMessagesDetail",
			method: "POST",
			data
		});
	},
	
	// 用户提现页面数据
	toEditByUser(data) {
		return http.request({
			url: "/api/Cashdraws/toEditByUser",
			method: "POST",
			data
		});
	},
	
	// 用户提现
	drawMoneyByUser(data) {
		return http.request({
			url: "/api/Cashdraws/drawMoneyByUser",
			method: "POST",
			data
		});
	},
	
	// 推广员提现页面数据
	toEditByPromoter(data) {
		return http.request({
			url: "/api/Cashdraws/toEditByPromoter",
			method: "POST",
			data
		});
	},
	
	// 推广员提现
	drawMoneyByPromoter(data) {
		return http.request({
			url: "/api/Cashdraws/drawMoneyByPromoter",
			method: "POST",
			data
		});
	},
	
	// 获取商户可提现余额
	getcashdraws(data) {
		return http.request({
			url: "/api/Cashdraws/toEditByShop",
			method: "POST",
			data
		});
	},
	
	// 商家提现
	drawMoneyByShop(data) {
		return http.request({
			url: "/api/Cashdraws/drawMoneyByShop",
			method: "POST",
			data
		});
	},
	
	// 删除收货地址
	delAddress(data) {
		return http.request({
			url: "/api/Useraddress/delAddress",
			method: "POST",
			data
		});
	},
	
	// 添加收货地址
	addUseraddress(data) {
		return http.request({
			url: "/api/Useraddress/addUseraddress",
			method: "POST",
			data
		});
	},
	
	// 编辑收货地址
	editAddress(data) {
		return http.request({
			url: "/api/Useraddress/editAddress",
			method: "POST",
			data
		});
	},
	
	// 获取取消订单原因
	getCancelReason(data) {
		return http.request({
			url: "/api/Orders/getCancelReason",
			method: "POST",
			data
		});
	},
	
	// 用户发起取消订单
	userCancelOrder(data) {
		return http.request({
			url: "/api/Orders/userCancelOrder",
			method: "POST",
			data
		});
	},
	
	// 确认收货
	takeOrder(data) {
		return http.request({
			url: "/api/Orders/userReceive",
			method: "POST",
			data
		});
	},
	
	// 推广员申请入驻
	pushIn(data) {
		return http.request({
			url: "/api/Transfer/shops_insert",
			method: "POST",
			data
		});
	},
	
	// 注册商家前调取查询商家是否注册
	isShop(data) {
		return http.request({
			url: "/api/Shops/isShop",
			method: "POST",
			data
		});
	},
	
	// 获取身份
	getIdentity(data) {
		return http.request({
			url: "/api/Users/getIdentity",
			method: "POST",
			data
		});
	},
	
	// 获取个人中心数据
	getuserinfo(data) {
		return http.request({
			url: "/api/Transfer/getuserinfo",
			method: "POST",
			data
		});
	},
	
	// 获取推广收益头部
	getProIncomeIndex(data) {
		return http.request({
			url: "/api/Transfer/get_pro_income_index",
			method: "POST",
			data
		});
	},
	
	// 获取推广收益列表
	getProIncomeList(data) {
		return http.request({
			url: "/api/Transfer/get_pro_income_list",
			method: "POST",
			data
		});
	},
	
	// 获取跨界收益头部
	getTrProfitIndex(data) {
		return http.request({
			url: "/api/Shopscenter/get_tr_profit_index",
			method: "POST",
			data
		});
	},
	
	// 获取跨界收益列表
	getTrProfitList(data) {
		return http.request({
			url: "/api/Shopscenter/get_tr_profit_list",
			method: "POST",
			data
		});
	},
	
	// 获取记账量列表 个人
	getAmountIndex(data) {
		return http.request({
			url: "/api/Transfer/get_amount_index",
			method: "POST",
			data
		});
	},
	
	// 获取记账量列表 个人
	getAmountList(data) {
		return http.request({
			url: "/api/Transfer/get_amount_list",
			method: "POST",
			data
		});
	},
	
	// 获取账单列表
	getBillList(data) {
		return http.request({
			url: "/api/Transfer/get_bill_list",
			method: "POST",
			data
		});
	},
	
	// 获取商户粉丝列表
	getShopscenterFansList(data) {
		return http.request({
			url: "/api/Shopscenter/get_fans_list",
			method: "POST",
			data
		});
	},
	
	// 获取推广员粉丝列表
	getTransferFansList(data) {
		return http.request({
			url: "/api/Transfer/get_fans_list",
			method: "POST",
			data
		});
	},
	
	// 获取推广收益
	
	
	// 获取商家订单列表
	getShopsOrders(data) {
		return http.request({
			url: "/api/Orders/getShopsOrders",
			method: "POST",
			data
		});
	},
	
	// 店铺查看自己商品
	getShopGoodsList(data) {
		return http.request({
			url: "/api/Goods/getShopGoods",
			method: "POST",
			data
		});
	},
	
	// 商户钱包 数据
	getShopsWallet(data) {
		return http.request({
			url: "/api/Shopscenter/get_shops_wallet",
			method: "POST",
			data
		});
	},
	
	// 获取店铺营业额，订单量
	getShopTurnover(data) {
		return http.request({
			url: "/api/Orders/getShopTurnover",
			method: "POST",
			data
		});
	},
	
	// 修改店铺营业状态
	editShopAtive(data) {
		return http.request({
			url: "/api/Shops/editShopAtive",
			method: "POST",
			data
		});
	},
	
	// 商家收支明细
	getShopsIncomeOrder(data) {
		return http.request({
			url: "/api/Shopscenter/shops_income_order",
			method: "POST",
			data
		});
	},
	
	// 推广员推广商户列表
	getShopsList(data) {
		return http.request({
			url: "/api/Transfer/get_shops_list",
			method: "POST",
			data
		});
	},
	
	// 修改用户信息
	editUserInfo(data) {
		return http.request({
			url: "/api/Users/editUserInfo",
			method: "POST",
			data
		});
	},
	
	// 获取店铺信息
	getShopsInfo(data) {
		return http.request({
			url: "/api/Shops/getShopsInfo",
			method: "POST",
			data
		});
	},
	
	// 修改店铺信息
	editShopInfo(data) {
		return http.request({
			url: "/api/Shops/editShopInfo",
			method: "POST",
			data
		});
	},
	
	// 获取快递列表
	getExpressList(data) {
		return http.request({
			url: "/api/Orders/getExpressList",
			method: "POST",
			data
		});
	},
	
	// 商家发货
	shopDeliver(data) {
		return http.request({
			url: "/api/Orders/shopDeliver",
			method: "POST",
			data
		});
	},
	
	// 重置支付密码发送短信
	getUserPhoneVerifyCode(data) {
		return http.request({
			url: "/api/Users/getPhoneVerifyCode",
			method: "POST",
			data
		});
	},
	
	// 用户重置支付密码
	resetbackPay(data) {
		return http.request({
			url: "/api/Users/resetbackPay",
			method: "POST",
			data
		});
	},
	
	// 生成商品编号货号
	getGoodsNumber(data) {
		return http.request({
			url: "/api/Goods/getGoodsNumber",
			method: "POST",
			data
		});
	},
	
	// 商家添加商品
	addGoods(data) {
		return http.request({
			url: "/api/Goods/addGoods",
			method: "POST",
			data
		});
	},
	
	// 商家编辑商品信息
	editGoodsInfo(data) {
		return http.request({
			url: "/api/Goods/editGoodsInfo",
			method: "POST",
			data
		});
	},
	
	// 店铺删除商品
	delGoods(data) {
		return http.request({
			url: "/api/Goods/delGoods",
			method: "POST",
			data
		});
	},
	
	// 通过商品id查看商品详情
	getGoodsInfoById(data) {
		return http.request({
			url: "/api/Goods/getGoodsInfoById",
			method: "POST",
			data
		});
	},
	
	// 通过商品id查看外卖商品详情
	getGoodsTakeInfoById(data) {
		return http.request({
			url: "/api/GoodsTake/getGoodsInfoById",
			method: "POST",
			data
		});
	},
	
	// 修改购物车商品数量
	editGoodsNum(data) {
		return http.request({
			url: "/api/Carts/editGoodsNum",
			method: "POST",
			data
		});
	},
	
	// 批量删除购物车
	delCart(data) {
		return http.request({
			url: "/api/Carts/delCart",
			method: "POST",
			data
		});
	},
	
	// 获取购物车数量
	getCartCount(data) {
		return http.request({
			url: "/api/Carts/cartCount",
			method: "POST",
			data
		});
	},
	
	// 商家入驻提交意向信息
	setSettleInfo(data) {
		return http.request({
			url: "/api/Shops/setSettleInfo",
			method: "POST",
			data
		});
	},
	
	// 首页导航控制
	getIndexType(data) {
		return http.request({
			url: "/api/TransferNotBase/get_index",
			method: "POST",
			data
		});
	},
	
	// 开启外卖服务
	openService(data) {
		return http.request({
			url: "/api/Shops/openKake",
			method: "POST",
			data
		});
	},
	
	// 添加视频
	addVideo(data) {
		return http.request({
			url: "/api/TakeOut/video_insert",
			method: "POST",
			data
		});
	},
	
	// 编辑视频
	editVideo(data) {
		return http.request({
			url: "/api/TakeOut/video_insert",
			method: "POST",
			data
		});
	},
	
	// 获取视频列表 商铺发布
	getMyVideoList(data) {
		return http.request({
			url: "/api/TakeOut/get_my_video_list",
			method: "POST",
			data
		});
	},
	
	// 获取视频详情
	getVideoDetail(data) {
		return http.request({
			url: "/api/TakeOut/getvideo",
			method: "POST",
			data
		});
	},
	
	// 获取视频是否点赞 zan 1 为点赞视频 follow 1 为关注了这个商户
	getVideoZan(data) {
		return http.request({
			url: "/api/TakeOut/get_video_zan",
			method: "POST",
			data
		});
	},
	
	// 视频点赞
	switchVodeoLike(data) {
		return http.request({
			url: "/api/TakeOut/dianzan",
			method: "POST",
			data
		});
	},
	
	// 关注商户
	followShop(data) {
		return http.request({
			url: "/api/TakeOut/follow",
			method: "POST",
			data
		});
	},
	
	// 商品分类添加
	addGoodsClassify(data) {
		return http.request({
			url: "/api/GoodsTake/sort_insert",
			method: "POST",
			data
		});
	},
	
	// 获取外卖商品分类列表
	getCategoryList(data) {
		return http.request({
			url: "/api/GoodsTake/goodsSort",
			method: "POST",
			data
		});
	},
	
	// 添加外卖商品
	addTakeGoods(data) {
		return http.request({
			url: "/api/GoodsTake/addGoods",
			method: "POST",
			data
		});
	},
	
	// 商家编辑外卖商品信息
	editTakeGoods(data) {
		return http.request({
			url: "/api/GoodsTake/editGoodsInfo",
			method: "POST",
			data
		});
	},
	
	// 获取外卖商品类目列表
	getTaleGoodsClassList(data) {
		return http.request({
			url: "/api/GoodsTake/goodsClassList",
			method: "POST",
			data
		});
	},
	
	// 获取店铺外卖商品列表
	getTakeGoodsList(data) {
		return http.request({
			url: "/api/GoodsTake/getShopGoods",
			method: "POST",
			data
		});
	},
	
	// 获取商户自己发布视频
	getMyVideoList(data) {
		return http.request({
			url: "/api/TakeOut/get_my_video_list",
			method: "POST",
			data
		});
	},
	
	// 获取推荐视频列表
	getVideoList(data) {
		return http.request({
			url: "/api/TakeOut/get_video_list",
			method: "POST",
			data
		});
	},
	
	// 获取关注商户的视频列表
	getGVideoList(data) {
		return http.request({
			url: "/api/TakeOut/get_g_video_list",
			method: "POST",
			data
		});
	},
	
	// 获取收藏的视频列表
	getFollowVideoList(data) {
		return http.request({
			url: "/api/TakeOut/get_follow_video_list",
			method: "POST",
			data
		});
	},
	
	// 获取视频评论列表
	getVideoCommentList(data) {
		return http.request({
			url: "/api/TakeOut/get_video_comment_list",
			method: "POST",
			data
		});
	},
	
	// 视频评论
	postComment(data) {
		return http.request({
			url: "/api/TakeOut/video_comment",
			method: "POST",
			data
		});
	},
	
	// 获取关注的商户列表
	getShopsFollowList(data) {
		return http.request({
			url: "/api/TakeOut/get_shops_follow_list",
			method: "POST",
			data
		});
	},
	
	// 删除视频
	delVideo(data) {
		return http.request({
			url: "/api/TakeOut/del_video",
			method: "POST",
			data
		});
	},
	
	// 店铺批量删除商品
	delTakeGoods(data) {
		return http.request({
			url: "/api/GoodsTake/delGoods",
			method: "POST",
			data
		});
	},
	
	// 删除店内分类
	delSort(data) {
		return http.request({
			url: "/api/GoodsTake/delSort",
			method: "POST",
			data
		});
	},
	
	// 代理中心-首页数据
	getAgentIndex(data) {
		return http.request({
			url: "/api/Agentcenter/get_index",
			method: "POST",
			data
		});
	},
	
	// 代理中心 商户列表
	getAgentShops(data) {
		return http.request({
			url: "/api/Agentcenter/get_shops_list",
			method: "POST",
			data
		});
	},
	
	// 代理中心 粉丝列表
	getAgentfans(data) {
		return http.request({
			url: "/api/Agentcenter/get_fans_list",
			method: "POST",
			data
		});
	},
	
	// 代理中心 推广员列表
	getAgentPromoter(data) {
		return http.request({
			url: "/api/Agentcenter/get_promoter_list",
			method: "POST",
			data
		});
	},
	
	// 代理中心-获取代理收益
	getAgentProfit(data) {
		return http.request({
			url: "/api/Agentcenter/get_agent_profit",
			method: "POST",
			data
		});
	},
	
	// 代理中心- 代理收益列表
	getAgentProfitList(data) {
		return http.request({
			url: "/api/Agentcenter/get_agent_profit_list",
			method: "POST",
			data
		});
	},
	
	// 代理中心- 团队、选择三级联动
	getAgentTeamList2(data) {
		return http.request({
			url: "/api/Agentcenter/get_team_list",
			method: "POST",
			data
		});
	},
	
	// 代理中心- 团队、选择三级联动
	getAgentTeamList(data) {
		return http.request({
			url: "/api/Agentcenter/get_linkage_list",
			method: "POST",
			data
		});
	},
	
	// 代理商提现页面数据
	toEditByAgent(data) {
		return http.request({
			url: "/api/Cashdraws/toEditByAgent",
			method: "POST",
			data
		});
	},
	
	// 代理商提现
	drawMoneyByAgent(data) {
		return http.request({
			url: "/api/Cashdraws/drawMoneyByAgent",
			method: "POST",
			data
		});
	}
	
	
}
