<template>
	<view>
		<view>
			<picker class="setyear_flex" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="setyear_font">{{date}}
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
