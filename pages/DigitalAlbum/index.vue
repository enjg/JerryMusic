<template>
	<view class="DigitalAlbum">
		<view class="bt">
			<image @click="routerReturn()" src="@/static/Universalimage/返回.png" mode=""></image>
			<p class="p">数字专辑</p>
		</view>
		<scroll-view class="scroll-view" scroll-y="true">
			<GarouselMap></GarouselMap>
			<sort></sort>
			<hr class="hr">
			<LatestRelease></LatestRelease>
			<DigitalAlbumChart></DigitalAlbumChart>
			<DigitalSinglesChart></DigitalSinglesChart>
		</scroll-view>
	</view>
</template>

<script setup>
	import DigitalSinglesChart from './module/DigitalSinglesChart.vue'
	import DigitalAlbumChart from './module/DigitalAlbumChart.vue'
	import GarouselMap from '@/pages/module/GarouselMap.vue'
	import sort from './module/sort.vue'
	import LatestRelease from './module/LatestRelease.vue'

	function routerReturn() {
		wx.navigateBack({
			delta: 1, // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
		});
	}
</script>

<style scoped>
	.DigitalAlbum {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.bt {
		width: 100%;
		height: 60px;
		position: absolute;
		top: 0;
	}

	.bt>image {
		width: 20px;
		height: 20px;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.bt>.p {
		line-height: 60px;
		position: absolute;
		left: 60px;
		font-size: 17px;
		font-weight: bold;
	}

	.hr {
		margin-top: 20px;
		height: 1px;
		background-color: rgba(0, 0, 0, 0.2);
	}

	.scroll-view {
		position: absolute;
		top: 60px;
		height: calc(100% - 60px);
		width: 100%;
	}
</style>