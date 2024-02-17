<template>
	<view class="SearchBox">
		<More :sort='1'></More>
		<!-- 		<image src="@/static/Search/分类.png" alt=""></image> -->
		<image src="@/static/Search/麦克风.png" alt=""></image>
		<view class="content" @click="routerPush()">
			<image src="@/static/Search/放大镜.png" alt=""></image>
		</view>
	</view>
</template>

<script setup>
	import More from '@/pages/module/More.vue'

	function routerPush() {
		wx.navigateTo({
			url: "/pages/search/index"
		})
	}
</script>

<style scoped>
	.SearchBox {
		width: 100%;
		height: 60px;
		/* 		position: absolute;
		left: 0px;
		top: 0px; */
		z-index: 9999;
		position: relative;
		background: linear-gradient(to bottom right, #e7e5fb, #fff);
	}

	.content {
		width: calc(100% - 100px);
		height: 30px;
		background-color: orange;
		border-radius: 15px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 50px;
		background: linear-gradient(to right, #dbdcfb, #e8dafd, #f2d8f1);
	}

	.content image {
		width: 15px;
		height: 15px;
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
	}

	.SearchBox>image {
		width: 20px;
		height: 20px;
	}

	/* 	.SearchBox>image:nth-of-type(1) {
		position: absolute;
		top: 25px;
		left: 20px;
	} */

	.SearchBox>image:nth-of-type(1) {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 20px;
	}
</style>