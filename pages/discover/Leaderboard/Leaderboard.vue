<template>
	<view class="Leaderboard">
		<view class="bt">
			<p class="p" @click="routerPush('/pages/Leaderboard/index')">排行榜></p>
		</view>
		<swiper next-margin="20px" class="swiper-container">
			<swiper-item class="center" v-for="(item,index) in listArray" :key="index">
				<LeaderboardBlock :message="{id:item}"></LeaderboardBlock>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import LeaderboardBlock from './LeaderboardBlock/LeaderboardBlock.vue'
	import {
		reactive
	} from "vue";
	let listArray = reactive([5059642708, 71384707, 991319590, 3779678, 2884035, 6723173524])

	function routerPush(center) {
		wx.navigateTo({
			url: center
		})
	}
</script>

<style scoped>
	.Leaderboard {
		margin-left: 20px;
		height: 280px;
/* 		margin-top: 20px; */
	}

	.swiper-container {
		height: 230px;
	}

	.bt {
		width: 100%;
		height: 50px;
	}

	.bt>.p {
		line-height: 50px;
		font-weight: bold;
		font-size: 18px;
	}

	.center {
		width: 100%;
	}
</style>