<template>
	<view class="content">
		<!--商户入驻-->
		<view v-if="status == 0">
			<view class="set_top">
				<view class="set_top_box">
					<view class="set_top_num set_orage">1</view>
					<view class="set_top_tit set_orage_f">商户入驻</view>
				</view>
				<view class="set_h"></view>
				<view class="set_top_box">
					<view class="set_top_num">2</view>
					<view class="set_top_tit">身份认证</view>
				</view>
				<view class="set_h"></view>
				<view class="set_top_box">
					<view class="set_top_num">3</view>
					<view class="set_top_tit">受理完成</view>
				</view>
			</view>
			<view class="form-box">
				<view class="form-area set_bor">
					<view class="label">推荐人手机号</view>
					<view class="text">
						<input class="set_inupt" type="number" maxlength="11" v-model="mobile" placeholder="请输入推荐人手机号" placeholder-style="color:#ccc;" />
					</view>
				</view>
				<view class="form-area set_align">
					<view class="label">折扣比例</view>
					<view class="text arrow">
						<picker @change="bindPickerChange" :value="index" :range="discountArray">
							<view class="uni-input">{{discountArray[index]}}</view>
						</picker>
					</view>
					<image class="set_arrow" src="/static/arrow.png"></image>
				</view>
			</view>
			<view class="form-box">
				<view class="form-area set_bor">
					<view class="label">营业执照</view>
					<view class="upload-img">
						<view class="img-item">
							<template v-if="tempBusinessLicenceImg == ''">
							  <image class="img" @tap="uploadBusinessLicense" src="/static/setupload.png"></image>
							</template>
							<template v-else>
							  <image class="img" :src='tempBusinessLicenceImg'></image>
							  <view class='delPhoto' @tap="deleteBusinessLicenceImg">
							    <image src='/static/icon_1.png'></image>
							  </view>
							</template>
						</view>
					</view>
				</view>
				<view class="form-area set_bor">
					<view class="label">商户名称</view>
					<view class="text">
						<input class="set_inupt" type="text" placeholder="营业执照名称" placeholder-style="color:#ccc;" v-model="shopName" />
					</view>
				</view>
				<view class="form-area set_bor">
					<view class="label">主营项目</view>
					<view class="text">
						<input class="set_inupt" type="text" placeholder="例如鞋帽、化妆品等" placeholder-style="color:#ccc;" v-model="empiricalRange" />
					</view>
				</view>
				<view class="form-area set_align set_bor" @tap="changeAddress">
					<view class="label">商户所在地区</view>
					<view class="text" :class="{ccc: !address}">
						{{address ? address : "请选择所在地区"}}
					</view>
					<image class="set_arrow" src="/static/arrow.png"></image>
				</view>
				<view class="form-area set_bor">
					<view class="label">详细地址</view>
					<view class="text arrow">
						<input class="set_inupt" type="text" placeholder="营业执照上的地址" placeholder-style="color:#ccc;" v-model="licenseAddress" />
					</view>
				</view>
				<view class="form-area set_bor">
					<view class="label">营业执照号</view>
					<view class="text arrow">
						<input class="set_inupt" type="text" placeholder="请输入营业执照号" placeholder-style="color:#ccc;" v-model="businessLicence" />
					</view>
				</view>
				<view class="form-area set_bor">
					<view class="label set_lable">
						<view>自拍照</view>
						<text>(手持身份证)</text>
					</view>
					<view class="upload-img">
						<view class="img-item">
							<template v-if="tempSelfieImg == ''">
							  <image class="img" @tap="uploadSelfieImg" src="/static/setupload.png"></image>
							</template>
							<template v-else>
							  <image class="img" :src='tempSelfieImg'></image>
							  <view class='delPhoto' @tap="deleteSelfieImg">
							    <image src='/static/icon_1.png'></image>
							  </view>
							</template>
						</view>
					</view>
				</view>
				<view class="form-area set_bor">
					<view class="label set_lable">门头照片</view>
					<view class="upload-img">
						<view class="img-item">
							<template v-if="tempFrontDoorPhoto == ''">
							  <image class="img" @tap="uploadDoorHeadPhoto" src="/static/setupload.png"></image>
							</template>
							<template v-else>
							  <image class="img" :src='tempFrontDoorPhoto'></image>
							  <view class='delPhoto' @tap="deleteDoorHeadPhoto">
							    <image src='/static/icon_1.png'></image>
							  </view>
							</template>
						</view>
					</view>
				</view>
				<view class="form-area set_bor">
					<view class="label set_lable">经营场所照片</view>
					<view class="upload-img">
						<view class="img-item">
							<template v-if="tempPlaceOfBusinessImg == ''">
							  <image class="img" @tap="uploadPlaceOfBusinessImg" src="/static/setupload.png"></image>
							</template>
							<template v-else>
							  <image class="img" :src='tempPlaceOfBusinessImg'></image>
							  <view class='delPhoto' @tap="deletePlaceOfBusinessImg">
							    <image src='/static/icon_1.png'></image>
							  </view>
							</template>
						</view>
					</view>
				</view>
				<view class="form-area">
					<view class="label set_lable">商品照片</view>
					<view class="upload-img">
						<view class="img-item">
							<template v-if="tempShopGoodImg == ''">
							  <image class="img" @tap="uploadShopGoodImg" src="/static/setupload.png"></image>
							</template>
							<template v-else>
							  <image class="img" :src='tempShopGoodImg'></image>
							  <view class='delPhoto' @tap="deleteShopGoodImg">
							    <image src='/static/icon_1.png'></image>
							  </view>
							</template>
						</view>
					</view>
				</view>
			</view>
			<view class="set_foot">
				<view class="set_btn_a" @tap="regShopOne(1)">继续认证</view>
				<view class="set_btn_n" @tap="regShopOne(2)">下次认证</view>
			</view>
		</view>
		<!--身份验证2-->
		<view v-if="status == 2">
			<view class="set_top">
				<view class="set_top_box">
					<view class="set_top_num ">1</view>
					<view class="set_top_tit">商户入驻</view>
				</view>
				<view class="set_h"></view>
				<view class="set_top_box">
					<view class="set_top_num set_orage">2</view>
					<view class="set_top_tit set_orage_f">身份认证</view>
				</view>
				<view class="set_h"></view>
				<view class="set_top_box">
					<view class="set_top_num">3</view>
					<view class="set_top_tit">受理完成</view>
				</view>
			</view>
			<view class="set_note">请拍摄并上传身份证</view>
			<view class="form-box">
				<view class="form-area set_align">
					<view class="upload-imgs">
						<view class="img-items">
							<template v-if="tempLegalCertificateImg == ''">
								<image class="imgs" @tap="uploadIdCardImg" src="/static/set_uploadcart.png"></image>
							</template>
							<template v-else>
								<image class="imgs" :src="tempLegalCertificateImg"></image>
								<view class="delPhoto" @tap="delIdCardImg">
									<image src='/static/icon_1.png'></image>
								</view>
							</template>
						</view>
						<view class="set_uploadtit">点击上传带头像一面</view>
					</view>
				</view>
				<view class="form-area set_align">
					<view class="upload-imgs">
						<view class="img-items">
							<template v-if="tempLegalCertificateBackImg == ''">
								<image class="imgs" @tap="uploadIdCardBackImg" src="/static/set_uploadcart2.png"></image>
							</template>
							<template v-else>
								<image class="imgs" :src="tempLegalCertificateBackImg"></image>
								<view class="delPhoto" @tap="delIdCardBackImg">
									<image src='/static/icon_1.png'></image>
								</view>
							</template>
						</view>
						<view class="set_uploadtit">点击上传国徽一面</view>
					</view>
				</view>
			</view>
			<view class="set_note">请确认您的个人信息，若有误请点击修改</view>
			<view class="form-box">
				<view class="form-area set_bor">
					<view class="label">姓名</view>
					<view class="text" :class="{ccc: !legalPersonName}">
						{{legalPersonName ? legalPersonName : ""}}
						<!-- <input class="set_inupt" type="text" v-model="legalPersonName" placeholder="请输入您的真实姓名" /> -->
					</view>
				</view>
				<view class="form-area set_bor">
					<view class="label set_lable2">身份证号</view>
					<view class="text2" :class="{ccc: !legalCertificate}">
						{{legalCertificate ? legalCertificate : ""}}
						<!-- <input class="set_inupt" type="number" maxlength="18" v-model="legalCertificate" placeholder="请输入您的有效身份证信息" /> -->
					</view>
				</view>
				<view class="form-area">
					<view class="label set_lable2">有效期限</view>
					<view class="text2" :class="{ccc: !legalCertificateStartDate}">
						{{legalCertificateStartDate ? (legalCertificateStartDate + " " + legalCertificateEndDate)  : ""}}
						<!-- <view class="set_inupt">{{legalCertificateStartDate}} {{legalCertificateEndDate}}</view> -->
					</view>
				</view>
			</view>
			<view class="form-box">
				<view class="form-area2">
					<view class="label set_lable2">银行卡号</view>
					<view class="text3">
						<input class="set_inupt" type="number" v-model="bankNo" placeholder-style="color:#ccc;" placeholder="请输入银行卡号" />
					</view>
					<view class="set_add" @tap="uploadBankImg">
						<image src="/static/set_photo.png"></image>
						<text>拍照添卡</text>
					</view>
				</view>
				<view class="form-area set_align set_bor" @tap="changeAddress">
					<view class="label set_lable2">开户地区</view>
					<view class="text2" :class="{ccc: !address}">
						{{address ? address : "请输入开户地区"}}
					</view>
				</view>
				<view class="form-area set_align set_bor">
					<view class="label set_lable2">开户行</view>
					<view class="text2 arrow">
						<input class="set_inupt" type="text" v-model="bankName" placeholder-style="color:#ccc;" placeholder="请输入开户行" />
					</view>
				</view>
				<view class="form-area set_bor">
					<view class="label set_lable2">支行名称</view>
					<view class="text2">
						<input class="set_inupt" type="text" v-model="bankBranchName" placeholder-style="color:#ccc;" placeholder="请输入支行名称" />
					</view>
				</view>
				<view class="form-area set_bor">
					<view class="label set_lable2">开户地址</view>
					<view class="text2">
						<input class="set_inupt" type="text" v-model="bankAddress" placeholder-style="color:#ccc;" placeholder="请输入开户地址" />
					</view>
				</view>
			</view>
			<view class="set_bigbtn" @tap="regShopTwo">立即提交</view>
		</view>
		<!--受理完成-->
		<view v-if="status == 1">
			<view class="set_top">
				<view class="set_top_box">
					<view class="set_top_num ">1</view>
					<view class="set_top_tit">商户入驻</view>
				</view>
				<view class="set_h"></view>
				<view class="set_top_box">
					<view class="set_top_num">2</view>
					<view class="set_top_tit">身份认证</view>
				</view>
				<view class="set_h"></view>
				<view class="set_top_box">
					<view class="set_top_num set_orage">3</view>
					<view class="set_top_tit set_orage_f">受理完成</view>
				</view>
			</view>
			<view class="set_state">
				<image src="/static/set_state.png"></image>
				<view class="set_state_tit">受理成功</view>
				<view class="set_state_f">工作人员将会在1个工作日内审核您的申请， 请耐心等待！</view>
			</view>
			<view class="set_bigbtn" @tap="toIndex">返回首页</view>
		</view>
		<view v-if="status == 4">
			<view class="set_state" style="padding-top: 110rpx;">
				<image src="/static/set_state2.png"></image>
				<view class="set_state_tit">受理失败</view>
				<view class="set_state_f">抱歉您的资料受理失败，失败原因为{{message}}</view>
			</view>
			<view class="set_bigbtn" @tap="status = 0">重新提交</view>
		</view>
		<pickerAddress v-model="addressShow" @confirm="addresspick" />
	</view>
</template>

<script>
	import config from "@/common/utils/config.js";
	import pickerAddress from "@/components/pickerAddress/index.vue";
	export default {
		components: {
			pickerAddress
		},
		data() {
			return {
				isDoConfirm: true,
				status: -1,	// 0 返回相关shopInfo内容 2 直接跳转到第二步身份证提交 1 直接提示信息
				// status: 1,	// 0 返回相关shopInfo内容 2 直接跳转到第二步身份证提交 1 直接提示信息
				discountArray: [],	// 折扣列表
				index: 0,	// 折扣index
				shopStep: "",	// 判断是否验证身份证 1:认证 2:直接提交
				mobile: uni.getStorageSync("mobile") || "",	// 推荐人手机号
				discountInt: uni.getStorageSync("discountInt") || "",	// 选择的折扣key
				shopName: uni.getStorageSync("shopName") || "",	// 商户名称
				empiricalRange: uni.getStorageSync("empiricalRange") || "",	// 主营项目
				province: uni.getStorageSync("province") || "",	// 省id
				city: uni.getStorageSync("city") || "",	// 市id
				areaId: uni.getStorageSync("areaId") || "",	// 区县id
				licenseAddress: uni.getStorageSync("licenseAddress") || "",	// 详细地址
				businessLicence: uni.getStorageSync("businessLicence") || "",	// 营业执照号
				tempBusinessLicenceImg: uni.getStorageSync("businessLicenceImg") || "",
				businessLicenceImg: uni.getStorageSync("businessLicenceImg") || "",	// 营业执照照片
				tempSelfieImg: uni.getStorageSync("selfieImg") || "",
				selfieImg: uni.getStorageSync("selfieImg") || "",	// 自拍照
				tempFrontDoorPhoto: uni.getStorageSync("frontDoorPhoto") || "",
				frontDoorPhoto: uni.getStorageSync("frontDoorPhoto") || "",	// 门头照
				tempPlaceOfBusinessImg: uni.getStorageSync("placeOfBusinessImg") || "",
				placeOfBusinessImg: uni.getStorageSync("placeOfBusinessImg") || "",	// 经营场所照片
				tempShopGoodImg: uni.getStorageSync("shopGoodImg") || "",
				shopGoodImg: uni.getStorageSync("shopGoodImg") || "",	// 商品照片
				addressShow: false,
				form: {
					province: "",
					city: "",
					area: "",
				},
				address: uni.getStorageSync("address") || "",	// 页面展示列表
				
				// 商家入驻第二步
				legalPersonName: uni.getStorageSync("legalPersonName") || "", // 真实姓名
				legalCertificate: uni.getStorageSync("legalCertificate") || "",	// 身份证号
				legalCertificateImg: uni.getStorageSync("legalCertificateImg") || "",	// 身份证带头像一面
				tempLegalCertificateImg: uni.getStorageSync("legalCertificateImg") || "",
				legalCertificateBackImg: uni.getStorageSync("legalCertificateBackImg") || "",	// 身份证国徽一面
				tempLegalCertificateBackImg: uni.getStorageSync("legalCertificateBackImg") || "",
				legalCertificateStartDate: uni.getStorageSync("legalCertificateStartDate") || "",	// 身份证有效期开始时间
				legalCertificateEndDate: uni.getStorageSync("legalCertificateEndDate") || "",	// 身份证有效期结束时间
				
				bankNo: uni.getStorageSync("bankNo") || "",		// 银行卡号
				bankName: uni.getStorageSync("bankName") || "",	// 银行名称
				bankBranchName: uni.getStorageSync("bankBranchName") || "",	// 支行名称
				bankProvince: uni.getStorageSync("province") || "",	// 开户行省
				bankCity: uni.getStorageSync("city") || "",	// 开户行市
				bankAreaId: uni.getStorageSync("areaId") || "",	// 开户行区
				bankAddress: uni.getStorageSync("address") || "",	// 开户行详细地址
				message: ""
			}
		},
		onLoad() {
			// 获取折扣列表
			this.getDiscount();
			// 注册商家前调取查询商家是否注册
			this.isShop();
		},
		onHide() {
			console.log("onHide");
		},
		onUnload() {
			console.log("onUnload");
			if(this.status == 0) {
				
				// 商家入驻第一步
				uni.setStorageSync("mobile", this.mobile);	// 推荐人手机号
				uni.setStorageSync("discountInt", this.discountInt);	// 选择的折扣key
				uni.setStorageSync("shopName", this.shopName);	// 商户名称
				uni.setStorageSync("empiricalRange", this.empiricalRange);	// 主营项目
				uni.setStorageSync("province", this.province);	// 省id
				uni.setStorageSync("city", this.city);	// 市id
				uni.setStorageSync("areaId", this.areaId);	// 区县id
				uni.setStorageSync("licenseAddress", this.licenseAddress);	// 详细地址
				uni.setStorageSync("businessLicence", this.businessLicence);	// 营业执照号
				uni.setStorageSync("businessLicenceImg", this.businessLicenceImg);	// 营业执照照片
				uni.setStorageSync("selfieImg", this.selfieImg);	// 自拍照
				uni.setStorageSync("frontDoorPhoto", this.frontDoorPhoto);	// 门头照
				uni.setStorageSync("placeOfBusinessImg", this.placeOfBusinessImg);	// 经营场所照片
				uni.setStorageSync("shopGoodImg", this.shopGoodImg);	// 商品照片
				uni.setStorageSync("address", this.address);	// 地址
				
			}
			
			if(this.status == 2) {
				
				// 商家入驻第二步
				uni.setStorageSync("legalPersonName", this.legalPersonName);	// 真实姓名
				uni.setStorageSync("legalCertificate", this.legalCertificate);	// 身份证号
				uni.setStorageSync("legalCertificateImg", this.legalCertificateImg);	// 身份证带头像一面
				uni.setStorageSync("legalCertificateBackImg", this.legalCertificateBackImg);	// 身份证国徽一面
				uni.setStorageSync("legalCertificateStartDate", this.legalCertificateStartDate);	// 身份证有效期开始时间
				uni.setStorageSync("legalCertificateEndDate", this.legalCertificateEndDate);	// 身份证有效期结束时间
				uni.setStorageSync("bankNo", this.bankNo);	// 银行卡号
				uni.setStorageSync("bankName", this.bankName);	// 银行名称
				uni.setStorageSync("bankBranchName", this.bankBranchName);	// 支行名称
				uni.setStorageSync("province", this.province);	// 开户行省
				uni.setStorageSync("city", this.city);	// 开户行市
				uni.setStorageSync("areaId", this.areaId);	// 开户行区
				uni.setStorageSync("address", this.address);	// 地址
				uni.setStorageSync("bankAddress", this.bankAddress);	// 开户行详细地址
				
			}
			
			if(this.status == 1) {
				
				uni.removeStorageSync("mobile");
				uni.removeStorageSync("discountInt");
				uni.removeStorageSync("shopName");
				uni.removeStorageSync("empiricalRange");
				uni.removeStorageSync("province");
				uni.removeStorageSync("city");
				uni.removeStorageSync("areaId");
				uni.removeStorageSync("address");
				uni.removeStorageSync("licenseAddress");
				uni.removeStorageSync("businessLicence");
				uni.removeStorageSync("businessLicenceImg");
				uni.removeStorageSync("selfieImg");
				uni.removeStorageSync("frontDoorPhoto");
				uni.removeStorageSync("placeOfBusinessImg");
				uni.removeStorageSync("shopGoodImg");
				uni.removeStorageSync("legalPersonName");
				uni.removeStorageSync("legalCertificate");
				uni.removeStorageSync("legalCertificateImg");
				uni.removeStorageSync("legalCertificateBackImg");
				uni.removeStorageSync("legalCertificateStartDate");
				uni.removeStorageSync("legalCertificateEndDate");
				uni.removeStorageSync("bankNo");
				uni.removeStorageSync("bankName");
				uni.removeStorageSync("bankBranchName");
				
			}
			
		},
		methods: {
			// 注册商家前调取查询商家是否注册
			isShop() {
				this.$api.isShop().then(res => {
					if(res.code == 200) {
						this.status = res.data.status;
						if(this.status == 4) {
							this.message = res.message;
							this.mobile = res.data.shopInfo.mobile;
							this.discountInt = res.data.shopInfo.discountInt;
							this.shopName = res.data.shopInfo.shopName;
							this.empiricalRange = res.data.shopInfo.empiricalRange;
							this.province = res.data.shopInfo.province;
							this.city = res.data.shopInfo.city;
							this.areaId = res.data.shopInfo.areaId;
							this.licenseAddress = res.data.shopInfo.licenseAddress;
							this.businessLicence = res.data.shopInfo.businessLicence;
							this.tempBusinessLicenceImg = res.data.shopInfo.businessLicenceImgUrl;
							this.businessLicenceImg = res.data.shopInfo.businessLicenceImg;
							this.tempSelfieImg = res.data.shopInfo.selfieImgUrl;
							this.selfieImg = res.data.shopInfo.selfieImg;
							this.tempFrontDoorPhoto = res.data.shopInfo.frontDoorPhotoUrl;
							this.frontDoorPhoto = res.data.shopInfo.frontDoorPhoto;
							this.tempPlaceOfBusinessImg = res.data.shopInfo.placeOfBusinessImgUrl;
							this.placeOfBusinessImg = res.data.shopInfo.placeOfBusinessImg;
							this.tempShopGoodImg = res.data.shopInfo.shopGoodImgUrl;
							this.shopGoodImg = res.data.shopInfo.shopGoodImg;
							this.address = res.data.shopInfo.provinceName + res.data.shopInfo.cityName + res.data.shopInfo.areaName;
						}
					}
				});
			},
			
			// 获取折扣列表
			getDiscount() {	
				this.$api.getDiscount().then(res => {
					if(res.code == 200) {
						this.discountList = res.data;
						let discountArray = [];
						for(let i in res.data) {
							discountArray.push(res.data[i].discount);
						}
						this.discountArray = discountArray;
						this.discountInt = Object.keys(this.discountList)[0];
					}
				});
			},
			
			// 弹起滚动选择器
			changeAddress() {
				this.addressShow = true;
			},
			
			// 选择省市区
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
				this.areaId = obj.area.areaId;
				this.areaName = obj.area.areaName;
				console.log(this.form);
			},
			
			// 商家注册第一步
			regShopOne(step) {
				let config = {
					mobile: this.mobile,	// 推荐人手机号
					discountInt: this.discountInt,	// 选择的折扣key
					shopStep: step,	// 判断是否验证身份证 1:认证 2:直接提交
					shopName: this.shopName,	// 商户名称
					empiricalRange: this.empiricalRange,	// 主营项目
					province: this.province,	// 省id
					city: this.city,	// 市id
					areaId: this.areaId,	// 区县id
					licenseAddress: this.licenseAddress,	// 详细地址
					businessLicence: this.businessLicence,	// 营业执照号
					businessLicenceImg: this.businessLicenceImg,	// 营业执照照片
					selfieImg: this.selfieImg,	// 	自拍照
					frontDoorPhoto: this.frontDoorPhoto,	// 门头照
					placeOfBusinessImg: this.placeOfBusinessImg,	// 经营场所照片
					shopGoodImg: this.shopGoodImg	// 商品照片
				}
				console.log(config);
				if(!this.isDoConfirm) return;
				this.$api.regShopOne(config).then(res => {
					if(res.code == 200) {
						this.province = "";
						this.city = "";
						this.areaId = "";
						this.provinceName = "";
						this.cityName = "";
						this.areaName = "";
						this.address = "";
						if(step == 2) {
							return uni.navigateBack({
								delta: 2
							});
						}
						if(step == 1) {
							this.status = 2;
						}
					}else {
						uni.showToast({
							title: res.message,
							icon: "none"
						});
					}
					uni.removeStorageSync("mobile");
					uni.removeStorageSync("discountInt");
					uni.removeStorageSync("shopName");
					uni.removeStorageSync("empiricalRange");
					uni.removeStorageSync("province");
					uni.removeStorageSync("city");
					uni.removeStorageSync("areaId");
					uni.removeStorageSync("address");
					uni.removeStorageSync("licenseAddress");
					uni.removeStorageSync("businessLicence");
					uni.removeStorageSync("businessLicenceImg");
					uni.removeStorageSync("selfieImg");
					uni.removeStorageSync("frontDoorPhoto");
					uni.removeStorageSync("placeOfBusinessImg");
					uni.removeStorageSync("shopGoodImg");
				});
			},
			
			// 商家入驻第二步
			regShopTwo() {
				let config = {
					legalPersonName: this.legalPersonName,	// 真实姓名
					legalCertificate: this.legalCertificate,	// 身份证号
					legalCertificateImg: this.legalCertificateImg,	// 身份证带头像一面
					legalCertificateBackImg: this.legalCertificateBackImg,	// 	身份证国徽一面
					legalCertificateStartDate: this.legalCertificateStartDate,	// 身份证有效期开始时间
					legalCertificateEndDate: this.legalCertificateEndDate,	// 身份证有效期结束时间
					bankNo: this.bankNo,	// 银行卡号
					bankName: this.bankName,	// 银行名称
					bankBranchName: this.bankBranchName,	// 支行名称
					bankProvince: this.province,	// 开户行省
					bankCity: this.city,	// 开户行市
					bankAreaId: this.areaId,	// 开户行区
					bankAddress: this.bankAddress,	// 开户行详细地址
				}
				console.log(config);
				if(!this.isDoConfirm) return;
				this.$api.regShopTwo(config).then(res => {
					if(res.code == 200) {
						this.status = 1;
						uni.removeStorageSync("legalPersonName");
						uni.removeStorageSync("legalCertificate");
						uni.removeStorageSync("legalCertificateImg");
						uni.removeStorageSync("legalCertificateBackImg");
						uni.removeStorageSync("legalCertificateStartDate");
						uni.removeStorageSync("legalCertificateEndDate");
						uni.removeStorageSync("bankNo");
						uni.removeStorageSync("bankName");
						uni.removeStorageSync("bankBranchName");
						uni.removeStorageSync("province");
						uni.removeStorageSync("city");
						uni.removeStorageSync("areaId");
						uni.removeStorageSync("address");
					}else {
						uni.showToast({
							title: res.message,
							icon: "none"
						});
					}
				});
			},
			
			// 返回首页
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			
			// 选择折扣比例
			bindPickerChange(e) {
				this.index = e.target.value;
				this.discountInt = Object.keys(this.discountList)[e.target.value];
			},
			
			// 上传营业执照
			uploadBusinessLicense() {
				let that = this;
				this.isDoConfirm = false;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// #ifdef MP-WEIXIN
						uni.showLoading({
							title: '上传中...',
							mask: true,
							icon: 'loading'
						});
						// #endif
						let tempFilesSize = res.tempFiles.size;
						let filePath = res.tempFiles;
						let tempFilePaths = res.tempFilePaths;
						if (filePath[0].size <= 3000000) {
							uni.uploadFile({
								url: config.baseUrl + '/api/Shops/upShopImg?dir=shops',
								filePath: tempFilePaths[0],
								name: 'file',
								formData: {
									"isThumb": "1"
								},
								header: {
									token: uni.getStorageSync("token")
								},
								success(res) {
									// #ifdef MP-WEIXIN
									uni.hideLoading();
									// #endif
									console.log(res);
									let data = JSON.parse(res.data);
									console.log(data);
									if(data.code == 200) {
										that.tempBusinessLicenceImg = tempFilePaths[0];
										that.businessLicenceImg = data.data.upPath;
										that.isDoConfirm = true;
										that.readImg(3, data.data.upPath);
									}else {
										uni.showToast({
											title: data.message,
											icon: 'none',
											duration: 2000
										})
									}
								}
							})
						}else {
							console.log("图片太大");
							// #ifdef MP-WEIXIN
							uni.hideLoading();
							// #endif
							uni.showToast({
								title: '上传图片不能大于3M!',
								icon: 'none',
								duration: 2000
							})
							that.isDoConfirm = true;
						}
					}
				})
			},
			
			// 图片文字识别
			readImg(type, img_url) {
				// type 图片类型 1 身份证正面 2 身份证反面 3 营业执照 4 银行卡
				console.log(img_url);
				let config = {
					type,
					img_url
				}
				this.$api.readImg(config).then(res => {
					if(res.code == 200) {
						// 营业执照
						if(res.info.card && res.info.card != "无" && res.info.card != "空" && type == 3) {
							this.businessLicence = res.info.card;
						}
						// 营业执照地址
						if(res.info.address && res.info.address != "无" && res.info.address != "空") {
							this.licenseAddress = res.info.address;
						}
						// 商户名称
						if(res.info.merchname && res.info.merchname != "无" && res.info.merchname != "空") {
							this.shopName = res.info.merchname;
						}
						if(res.info.card && res.info.card != "无" && res.info.card != "空" && type == 1) {
							this.legalCertificate = res.info.card;
						}
						if(res.info.name && res.info.name != "无" && res.info.name != "空") {
							this.legalPersonName = res.info.name;
						}
						if(res.info.card_stard && res.info.card_stard != "无" && res.info.card_stard !="空") {
							this.legalCertificateStartDate = res.info.card_stard;
						}
						if(res.info.card_end && res.info.card_end !="无" && res.info.card_end !="空") {
							this.legalCertificateEndDate = res.info.card_end;
						}
						if(res.info.bank_card && res.info.bank_card !="无" && res.info.bank_card !="空") {
							this.bankNo = res.info.bank_card;
						}
						if(res.info.kai_bank && res.info.kai_bank !="无" && res.info.kai_bank !="空") {
							this.bankName = res.info.kai_bank;
						}
					}
				});
			},
			
			// 删除营业执照
			deleteBusinessLicenceImg() {
				this.businessLicenceImg = "";
				this.tempBusinessLicenceImg = "";
			},
			
			// 上传自拍照
			uploadSelfieImg() {
				let that = this;
				this.isDoConfirm = false;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						uni.showLoading({
							title: '上传中...',
							mask: true,
							icon: 'loading'
						});
						let tempFilesSize = res.tempFiles.size;
						let filePath = res.tempFiles;
						let tempFilePaths = res.tempFilePaths;
						if (filePath[0].size <= 3000000) {
							uni.uploadFile({
								url: config.baseUrl + '/api/Shops/upShopImg?dir=shops',
								filePath: tempFilePaths[0],
								name: 'file',
								header: {
									token: uni.getStorageSync("token")
								},
								success(res) {
									uni.hideLoading();
									console.log(res);
									let data = JSON.parse(res.data);
									console.log(data);
									if(data.code == 200) {
										that.tempSelfieImg = tempFilePaths[0];
										that.selfieImg = data.data.upPath;
										that.isDoConfirm = true;
									}else {
										uni.showToast({
											title: '上传失败',
											icon: 'none',
											duration: 2000
										})
									}
								}
							})
						}else {
							uni.showToast({
								title: '上传图片不能大于3M!',
								icon: 'none',
								duration: 2000
							})
							that.isDoConfirm = true;
						}
					}
				})
			},
			
			// 删除自拍照
			deleteSelfieImg() {
				this.selfieImg = "";
				this.tempSelfieImg = "";
			},
			
			// 上传门头照片
			uploadDoorHeadPhoto() {
				let that = this;
				this.isDoConfirm = false;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						uni.showLoading({
							title: '上传中...',
							mask: true,
							icon: 'loading'
						});
						let tempFilesSize = res.tempFiles.size;
						let filePath = res.tempFiles;
						let tempFilePaths = res.tempFilePaths;
						if (filePath[0].size <= 3000000) {
							uni.uploadFile({
								url: config.baseUrl + '/api/Shops/upShopImg?dir=shops',
								filePath: tempFilePaths[0],
								name: 'file',
								header: {
									token: uni.getStorageSync("token")
								},
								success(res) {
									uni.hideLoading();
									console.log(res);
									let data = JSON.parse(res.data);
									console.log(data);
									if(data.code == 200) {
										that.tempFrontDoorPhoto = tempFilePaths[0];
										that.frontDoorPhoto = data.data.upPath;
										that.isDoConfirm = true;
									}else {
										uni.showToast({
											title: '上传失败',
											icon: 'none',
											duration: 2000
										})
									}
								}
							})
						}else {
							uni.showToast({
								title: '上传图片不能大于3M!',
								icon: 'none',
								duration: 2000
							})
							that.isDoConfirm = true;
						}
					}
				})
			},
			
			// 删除门头照片
			deleteDoorHeadPhoto() {
				this.frontDoorPhoto = "";
				this.tempFrontDoorPhoto = "";
			},
			
			// 上传经营场所照片
			uploadPlaceOfBusinessImg() {
				let that = this;
				this.isDoConfirm = false;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						uni.showLoading({
							title: '上传中...',
							mask: true,
							icon: 'loading'
						});
						let tempFilesSize = res.tempFiles.size;
						let filePath = res.tempFiles;
						let tempFilePaths = res.tempFilePaths;
						if (filePath[0].size <= 3000000) {
							uni.uploadFile({
								url: config.baseUrl + '/api/Shops/upShopImg?dir=shops',
								filePath: tempFilePaths[0],
								name: 'file',
								header: {
									token: uni.getStorageSync("token")
								},
								success(res) {
									uni.hideLoading();
									console.log(res);
									let data = JSON.parse(res.data);
									console.log(data);
									if(data.code == 200) {
										that.tempPlaceOfBusinessImg = tempFilePaths[0];
										that.placeOfBusinessImg = data.data.upPath;
										that.isDoConfirm = true;
									}else {
										uni.showToast({
											title: '上传失败',
											icon: 'none',
											duration: 2000
										})
									}
								}
							})
						}else {
							uni.showToast({
								title: '上传图片不能大于3M!',
								icon: 'none',
								duration: 2000
							})
							that.isDoConfirm = true;
						}
					}
				})
			},
			
			// 删除经营场所照片
			deletePlaceOfBusinessImg() {
				this.placeOfBusinessImg = "";
				this.tempPlaceOfBusinessImg = "";
			},
			
			// 上传商品照片
			uploadShopGoodImg() {
				let that = this;
				this.isDoConfirm = false;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						uni.showLoading({
							title: '上传中...',
							mask: true,
							icon: 'loading'
						});
						let tempFilesSize = res.tempFiles.size;
						let filePath = res.tempFiles;
						let tempFilePaths = res.tempFilePaths;
						if (filePath[0].size <= 3000000) {
							uni.uploadFile({
								url: config.baseUrl + '/api/Shops/upShopImg?dir=shops',
								filePath: tempFilePaths[0],
								name: 'file',
								header: {
									token: uni.getStorageSync("token")
								},
								success(res) {
									uni.hideLoading();
									console.log(res);
									let data = JSON.parse(res.data);
									console.log(data);
									if(data.code == 200) {
										that.tempShopGoodImg = tempFilePaths[0];
										that.shopGoodImg = data.data.upPath;
										that.isDoConfirm = true;
									}else {
										uni.showToast({
											title: '上传失败',
											icon: 'none',
											duration: 2000
										})
									}
								}
							})
						}else {
							uni.showToast({
								title: '上传图片不能大于3M!',
								icon: 'none',
								duration: 2000
							})
							that.isDoConfirm = true;
						}
					}
				})
			},
			
			// 删除商品照片
			deleteShopGoodImg() {
				this.shopGoodImg = "";
				this.tempShopGoodImg = "";
			},
			
			// 上传身份证带头像一面
			uploadIdCardImg() {
				let that = this;
				this.isDoConfirm = false;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// #ifdef MP-WEIXIN
						uni.showLoading({
							title: '上传中...',
							mask: true,
							icon: 'loading'
						});
						// #endif
						let tempFilesSize = res.tempFiles.size;
						let filePath = res.tempFiles;
						let tempFilePaths = res.tempFilePaths;
						if (filePath[0].size <= 3000000) {
							uni.uploadFile({
								url: config.baseUrl + "/api/Shops/upShopImg?dir=shops",
								filePath: tempFilePaths[0],
								name: 'file',
								formData: {
									"isThumb": "1"
								},
								header: {
									token: uni.getStorageSync("token")
								},
								success(res) {
									// #ifdef MP-WEIXIN
									uni.hideLoading();
									// #endif
									console.log(res);
									let data = JSON.parse(res.data);
									console.log(data);
									if(data.code == 200) {
										that.tempLegalCertificateImg = tempFilePaths[0];
										that.legalCertificateImg = data.data.upPath;
										that.isDoConfirm = true;
										// type 图片类型 1 身份证正面 2 身份证反面 3 营业执照 4 银行卡
										that.readImg(1, data.data.upPath);
									}else {
										uni.showToast({
											title: data.message,
											icon: 'none',
											duration: 2000
										})
									}
								}
							})
						}else {
							// #ifdef MP-WEIXIN
							uni.hideLoading();
							// #endif
							uni.showToast({
								title: '上传图片不能大于3M!',
								icon: 'none',
								duration: 2000
							})
							that.isDoConfirm = true;
						}
					},
					fail(err) {
						that.isDoConfirm = true;
					}
				})
			},
			
			// 删除身份证带头像一面
			delIdCardImg() {
				this.legalCertificateImg = "";
				this.tempLegalCertificateImg = "";
			},
			
			// 上传身份证国徽一面
			uploadIdCardBackImg() {
				let that = this;
				this.isDoConfirm = false;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// #ifdef MP-WEIXIN
						uni.showLoading({
							title: '上传中...',
							mask: true,
							icon: 'loading'
						});
						// #endif
						let tempFilesSize = res.tempFiles.size;
						let filePath = res.tempFiles;
						let tempFilePaths = res.tempFilePaths;
						if (filePath[0].size <= 3000000) {
							uni.uploadFile({
								url: config.baseUrl + "/api/Shops/upShopImg?dir=shops",
								filePath: tempFilePaths[0],
								name: 'file',
								formData: {
									"isThumb": "1"
								},
								header: {
									token: uni.getStorageSync("token")
								},
								success(res) {
									// #ifdef MP-WEIXIN
									uni.hideLoading();
									// #endif
									console.log(res);
									let data = JSON.parse(res.data);
									console.log(data);
									if(data.code == 200) {
										that.tempLegalCertificateBackImg = tempFilePaths[0];
										that.legalCertificateBackImg = data.data.upPath;
										that.isDoConfirm = true;
										// type 图片类型 1 身份证正面 2 身份证反面 3 营业执照 4 银行卡
										that.readImg(2, data.data.upPath);
									}else {
										uni.showToast({
											title: data.message,
											icon: 'none',
											duration: 2000
										})
									}
								}
							})
						}else {
							// #ifdef MP-WEIXIN
							uni.hideLoading();
							// #endif
							uni.showToast({
								title: '上传图片不能大于3M!',
								icon: 'none',
								duration: 2000
							})
							that.isDoConfirm = true;
						}
					},
					fail(err) {
						that.isDoConfirm = true;
					}
				})
			},
			
			// 删除身份证国徽一面
			delIdCardBackImg() {
				this.legalCertificateBackImg = "";
				this.tempLegalCertificateBackImg = "";
			},
			
			// 上传银行卡
			uploadBankImg() {
				let that = this;
				this.isDoConfirm = false;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// #ifdef MP-WEIXIN
						uni.showLoading({
							title: '上传中...',
							mask: true,
							icon: 'loading'
						});
						// #endif
						let tempFilesSize = res.tempFiles.size;
						let filePath = res.tempFiles;
						let tempFilePaths = res.tempFilePaths;
						if (filePath[0].size <= 3000000) {
							uni.uploadFile({
								url: config.baseUrl + "/api/Shops/upShopImg?dir=shops",
								filePath: tempFilePaths[0],
								name: 'file',
								formData: {
									"isThumb": "1"
								},
								header: {
									token: uni.getStorageSync("token")
								},
								success(res) {
									// #ifdef MP-WEIXIN
									uni.hideLoading();
									// #endif
									console.log(res);
									let data = JSON.parse(res.data);
									console.log(data);
									if(data.code == 200) {
										that.isDoConfirm = true;
										// type 图片类型 1 身份证正面 2 身份证反面 3 营业执照 4 银行卡
										that.readImg(4, data.data.upPath);
									}else {
										uni.showToast({
											title: data.message,
											icon: 'none',
											duration: 2000
										})
									}
								}
							})
						}else {
							// #ifdef MP-WEIXIN
							uni.hideLoading();
							// #endif
							uni.showToast({
								title: '上传图片不能大于3M!',
								icon: 'none',
								duration: 2000
							})
							that.isDoConfirm = true;
						}
					},
					fail(err) {
						that.isDoConfirm = true;
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F4F4F4;
	}
	.content{
		height: 100%;
		padding-bottom: 30rpx;
	}
	.ccc {
		color: #ccc;
	}
	/*top*/
	.set_top{
		width: 710rpx;
		margin: 0 auto 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.set_top_box{
		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}
	.set_top_num{
		width: 44rpx;
		height: 44rpx;
		line-height: 44rpx;
		text-align: center;
		background: #BDBDBD;
		border-radius: 50%;
		font-size: 28rpx;
		color: #FFFFFF;
	}
	.set_orage{
		background: #ED6C18;
	}
	.set_top_tit{
		margin: 20rpx 0;
		font-size: 32rpx;
		color: #BDBDBD;
	}
	.set_orage_f{
		color: #ED6C18;
	}
	.set_h{
		width: 120rpx;
		height: 5rpx;
		background: #DADCDF;
	}
	/*top end*/
	.set_bor{
		border-bottom: 1rpx solid #f5f5f5;
	}
	.set_arrow{
		width: 28rpx;
		height: 34rpx;
	}
	.set_align{
		align-items: center;
		justify-content: space-between;
	}
	.set_inupt{
		font-size: 32rpx;
	}
	.set_lable{
		width: 135rpx;
		flex-direction: column;
	}
	.set_lable text{
		font-size: 28rpx;
		color: #999;
	}
	.uni-input{
		padding: 0rpx;
		font-size: 32rpx;
	}
	/*btn*/
	.set_foot{
		width: 710rpx;
		margin: 80rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.set_btn_a{
		width: 320rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #FF6619;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #FFFFFF;
	}
	.set_btn_n{
		width: 320rpx;
		height: 78rpx;
		line-height: 78rpx;
		text-align: center;
		border: 1rpx solid #FF6619;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #FF6619;
	}
	/*身份验证*/
	.set_note{
		width: 710rpx;
		margin-left: 30rpx;
		font-size: 30rpx;
		color: #ccc;
	}
	.set_uploadtit{
		margin-top: 20rpx;
		// width: 320rpx;
		text-align: center;
		font-size: 30rpx;
		color: #999999;
	}
	.set_add image{
		margin-left: 20rpx;
		width: 40rpx;
		height: 34rpx;
	}
	.set_add text{
		font-size: 22rpx;
		color: #666666;
	}
	.set_lable2{
		// width: 160rpx;
	}
	.text2 {
		flex: 1;
		margin-left: 10rpx;
	}
	.text3 {
		flex: 1;
		width: 200rpx;
		margin-left: 10rpx;
	}
	.set_bigbtn{
		margin: 80rpx 30rpx 50rpx 30rpx;
		width: 690rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background: #FF6619;
		border-radius: 8rpx;
		font-size: 36rpx;
		color: #FFFFFF;	
	}
	/*受理成功*/
	.set_state{
		margin-top: 40rpx;
		margin-left: 30rpx;
		width: 690rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	.set_state image{
		margin-left: 245rpx;
		width: 200rpx;
		height: 200rpx;
	}
	.set_state_tit{
		margin-top: 40rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}
	.set_state_f{
		margin-left: 70rpx;
		margin-top: 20rpx;
		width: 550rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #999999;
	}
	.form-box {
		width: 710rpx;
		margin: 10rpx auto 20rpx;
		background: #fff;
		// box-shadow: 3rpx 3rpx 6rpx rgba(0,0,0,0.28);
		border-radius: 12rpx;
	
		.form-area {
			display: flex;
			justify-content: center;
			padding: 34rpx 20rpx;
			
			.label {
				// width: 130rpx;
				font-size: 32rpx;
				color: #333;
				margin-right: 20rpx;
			}
			
			.text {
				flex: 1;
				margin-left: 20rpx;
			}
			
			.upload-img {
				flex: 1;
				margin-left: 20rpx;
				
				.img-item {
					width: 360rpx;
					height: 270rpx;
					position: relative;
					
					.img {
						width: 360rpx;
						height: 270rpx;
					}
					
					.delPhoto {
						position: absolute;
						top: 0;
						right: 0;
						width: 36rpx;
						height: 36rpx;
						
						image {
							width: 36rpx;
							height: 36rpx;
						}
					}
				}
			}
			.upload-imgs {
				// flex: 1;
				margin-left: 8rpx;
				justify-content: center;
				align-items: center;
				
				.img-items {
					width: 480rpx;
					height: 320rpx;
					position: relative;
					
					.imgs {
						width: 480rpx;
						height: 320rpx;
					}
					
					.delPhoto {
						position: absolute;
						top: 0;
						right: 0;
						width: 36rpx;
						height: 36rpx;
						
						image {
							width: 36rpx;
							height: 36rpx;
						}
					}
				}
			}
			
		}
		.form-area2 {
			padding: 24rpx 20rpx;
			border-bottom: 1rpx solid #f5f5f5;
			display: flex;
			align-items: center;
			justify-content: space-between;	
			
			.label {
				font-size: 32rpx;
				color: #333;
				margin-right: 20rpx;
			}
		}
	}
	.contact-imgs {
		width: 690rpx;
		margin: 0 30rpx 0;

		.contact-title {
			font-size: 28rpx;
			color: #333;
			margin-bottom: 30rpx;
		}

		.contact-imgs-list {
			display: flex;
			flex-wrap: wrap;

			.contact-imgs-item {
				width: 120rpx;
				height: 120rpx;
				display: inline-block;
				margin-right: 50rpx;
				margin-bottom: 30rpx;
			}

			.contact-imgs-item:nth-child(3n) {
				margin-right: 0;
			}

			.contact-imgs-detail {
				position: relative;

				.img {
					width: 120rpx;
					height: 120rpx;

				}

				.close-imgs {
					position: absolute;
					top: 10rpx;
					right: 10rpx;

					image {
						width: 34rpx;
						height: 34rpx;
					}
				}
			}

			.contact-imgs-upload {
				border: 2rpx solid #E0E0E0;
				background: #FAFAFA;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 52rpx;
					height: 40rpx;
				}
			}
		}

	}
</style>
