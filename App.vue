<script>
	export default {
		onLaunch: function() {
			var that=this;
			uni.getSystemInfo({
				success: function(e) {
					if (e.platform == 'android') {
						that.globalData.navheight = e.statusBarHeight + 50
					} else {
						that.globalData.navheight = e.statusBarHeight + 45
					}
				}
			})
		
		},
		globalData:{
			navheight:0
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	@import './common/icon.css';
	@import './common/base.css';
	@import './common/color.css';
	@import './common/iconfont.css';
</style>
