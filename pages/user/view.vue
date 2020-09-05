<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url: ""
			}
		},
		onLoad(options) {
			this.url = "https://cms.bfb360.cn/api/Login/setRemoteShop?token=" + options.token;
			console.log(this.url);
		},
	}
	
</script>