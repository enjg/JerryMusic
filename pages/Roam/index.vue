<template>
	<view class="Roam">

	</view>
</template>

<script setup>
	import {
		onMounted
	} from 'vue';

	wx.navigateTo({
		url: "/pages/PlayDetails/index"
	});
	onMounted(() => {
		uni.hideTabBar()
	})
</script>

<style>
</style>