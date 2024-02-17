<template>
	<view class="sort">
		<scroll-view class="scroll-view-container" scroll-x="true" show-scrollbar='false' @scroll="onScroll">
			<view class="center" v-for="(item,index) in listArray" :key="index" @click="routerPush(item.path)">
				<view class="content">
					<image :src="item.img" alt=""></image>
				</view>
				<p class="name">{{item.name}}</p>
			</view>
		</scroll-view>
		<view class="scroll">
			<view class="scrollContent">
				<view :style="'left:' + scrollLeft + '%;'"  class="scrollCenter">

				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import mrtj from '@/static/DiscoveryClassification/每日推荐.png'
	import srmy from '@/static/DiscoveryClassification/私人漫游.png'
	import gd from '@/static/DiscoveryClassification/歌单.png'
	import phb from '@/static/DiscoveryClassification/排行榜.png'
	// import yss from '@/static/DiscoveryClassification/有声书.png'
	import szzj from '@/static/DiscoveryClassification/数字专辑.png'
	// import zb from '@/static/DiscoveryClassification/直播.png'
	import gzxg from '@/static/DiscoveryClassification/关注新歌.png'
	// import ygyy from '@/static/DiscoveryClassification/一个一遇.png'
	// import scj from '@/static/DiscoveryClassification/收藏家.png'
	import {
		reactive,
		ref
	} from "vue";
	let listArray = reactive([{
			name: '每日推荐',
			img: mrtj,
			path: '/pages/DailyRecommendation/index'
		},
		{
			name: '私人漫游',
			img: srmy,
			path: '/pages/PlayDetails/index'
		},
		{
			name: '歌单',
			img: gd,
			path: '/pages/SongList/index'
		},
		{
			name: '排行榜',
			img: phb,
			path: '/pages/Leaderboard/index'
		},
		{
			name: '数字专辑',
			img: szzj,
			path: '/pages/DigitalAlbum/index'
		},
		{
			name: '关注新歌',
			img: gzxg
		}
	])

	function routerPush(center) {
		uni.navigateTo({
			url: center,
			animationType: 'fade-in',
			animationDuration: 200
		})
	}
	let scrollLeft = ref(0);

	function onScroll(event) {
		scrollLeft.value = event.target.scrollLeft / event.target.scrollWidth * 100;
	}
</script>

<style scoped>
	.sort {
		width: calc(100% - 40px);
		height: 80px;
		padding: 0 20px;
		margin-top: 10px;
	}

	.scroll {
		width: 100%;
		height: 20px;
		position: relative;
	}

	.scrollContent {
		width: 12vw;
		height: 4px;
		border-radius: 2px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #f0f0f0;
	}

	.scrollContentClick {
		transition: opacity 1s ease;
		opacity: 0;
	}

	.scrollCenter {
		width: 83%;
		height: 100%;
		border-radius: 2px;
		position: absolute;
		left: 0;
		background-color: #fe235d;
	}

	.scroll-view-container {
		white-space: nowrap;
		overflow: hidden;
	}

	.center {
		width: 16%;
		height: 60px;
		display: inline-block;
		position: relative;
		margin: 0 2%;
	}

	.content {
		width: 35px;
		height: 35px;
		position: absolute;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
		background-color: #fe235d;
		border-radius: 5px;
	}

	.content>image {
		width: 23px;
		height: 23px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.name {
		width: 100%;
		text-align: center;
		position: absolute;
		bottom: 0;
		line-height: 25px;
		font-weight: 300;
		font-size: 11px;
		color: #666f7e;
	}
</style>