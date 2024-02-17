<template>
	<view class="discover">
		<SearchBox></SearchBox>
		<view class="bj">
		</view>
		<scroll-view class="scroll-view" scroll-y="true">
			<GarouselMap></GarouselMap>
			<sort></sort>
			<RecommendedPlaylist></RecommendedPlaylist>
			<hr>
			<Leaderboard></Leaderboard>
			<hr>
			<RecommendedReview></RecommendedReview>
			<hr>
			<LatestAlbum></LatestAlbum>
			<hr>
		</scroll-view>
		<Player />
	</view>
</template>

<script setup>
	import GarouselMap from '@/pages/module/GarouselMap.vue'
	import sort from '@/pages/discover/sort/sort.vue'
	import RecommendedPlaylist from './RecommendedPlaylist/RecommendedPlaylist.vue'
	import SearchBox from '@/pages/discover/SearchBox/SearchBox.vue'
	import Leaderboard from './Leaderboard/Leaderboard.vue'
	import LatestAlbum from './LatestAlbum/LatestAlbum.vue'
	import RecommendedReview from './RecommendedReview/RecommendedReview.vue'
</script>

<style scoped>
	.discover {
		clear: both;
		width: 100vw;
		height: 100vh;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.bj {
		width: 100%;
		height: 200px;
		z-index: -2;
		position: fixed;
		top: 0px;
		background: linear-gradient(to bottom right, #e7e5fb, #fff, #fff, #fff);
	}

	hr {
		margin-top: 20px;
		border: none;
		border-top: 1px solid #ecedf1;
		/* 设置线条的宽度和颜色 */
	}

	.scroll-view {
		width: 100%;
		flex: 1;
		overflow: hidden;
		/* 		height: calc(100% - 60px); */
		/* 		position: absolute;
		top: 60px; */

	}
</style>