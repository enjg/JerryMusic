<template>
	<view class="RecommendedPlaylist" @click="clisc()">
		<view class="bt">
			<p @click="routerPushTwo('/pages/SongList/index')" class="bt_name">推荐歌单></p>
		</view>
		<scroll-view scroll-x="true" class="songList" show-scrollbar="false">
			<view class="center" @click="routerPush(item.id)" v-for="(item,index) in listArray" :key="index">
				<view class="playcount">
					<image src="./img/播放.png" alt="">
					</image>
					<p class="p">{{formatNumber(item.playcount)}}</p>
				</view>
				<image src="./img/播放.png" alt=""></image>
				<image :class="{Click:ClickId==item.id}" :src="item.picUrl" alt=""></image>
				<p class="p">{{item.name}}</p>
				<view class="bj"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import SongListBlock from '@/pages/module/SongListBlock/SongListBlock.vue'
	import axios from '@/axios.js';
	import {
		useMyUser
	} from '@/pinia/myUser.js'
	import {
		onMounted,
		reactive,
		ref,
		watch
	} from "vue";


	const myUser = useMyUser();

	getRecommendResource();

	function getRegisterAnonimous() {
		let time = Date.now();
		return axios.get("/register/anonimous", {
				params: {
					timestamp: time,
				},
			})
			.then((res) => {
				myUser.cookie = res.data.cookie;
				console.log(res.data.cookie)
			})
			.catch((err) => {
				console.error(err);
			});
	}

	let listArray = reactive([]);
	watch(() => myUser.cookie, (newValue) => {
		listArray.length = 0;
		getRecommendResource(newValue)
	})

	function getRecommendResource(cookies) {
		let time = Date.now();
		axios
			.get("/recommend/resource", {
				params: {
					limit: 9,
					timestamp: time,
					cookie: cookies,
				},
			})
			.then((res) => {
				listArray.push(...res.data.recommend);
				// let Array = res.data.result.slice(0, 9);
				// Object.assign(abc, Array);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function formatNumber(number) {
		if (number >= 100000000) {
			return Math.floor(number / 100000000) + "亿";
		} else if (number >= 100000 && number < 100000000) {
			return Math.floor(number / 10000) + "万";
		} else {
			return number.toString();
		}
	}

	let ClickId = ref(null);

	function routerPush(event) {
		ClickId.value = event;
		setTimeout(function() {
			ClickId.value = null;
			uni.navigateTo({
				url: `/pages/PlaylistDetails/index?id=${event}`
			})
		}, 100)

	}

	function routerPushTwo(center) {
		wx.navigateTo({
			url: center
		})
	}
</script>

<style scoped>
	.Click {
		filter: brightness(0.8) !important;
	}

	.RecommendedPlaylist {
		margin-left: 20px;
		/* 		margin-top: 20px;
		background-color: yellow; */
	}

	.bt {
		height: 50px;
	}

	.bt_name {
		line-height: 50px;
		font-weight: bold;
		font-size: 18px;
	}

	.songList {
		white-space: nowrap;
		overflow: hidden;
	}

	.center {
		width: calc((100vw - 20px) / 2.8);
		height: calc((100vw - 20px) / 2.8 + 40px);
		display: inline-block;
		margin-right: 10px;
		position: relative;
	}

	.bj {
		width: 80%;
		height: 20;
		padding-bottom: 80%;
		border-radius: 10px;
		background-color: #ebecf0;
		position: absolute;
		top: 0;
		left: 10%;
		z-index: -1;
	}

	.center>image:nth-of-type(1) {
		position: absolute;
		width: 20px;
		height: 20px;
		bottom: 40px;
		right: 5px;
	}

	.center>image:nth-of-type(2) {
		width: 100%;
		height: calc((100vw - 20px) / 2.8);
		margin-top: 5px;
		border-radius: 10px;
		z-index: 2;
	}

	.playcount {
		height: 15px;
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 99999;
	}

	.playcount>image {
		height: 8px;
		width: 8px;
		float: left;
		margin: 3.5px 0;
	}

	.playcount>.p {
		float: left;
		margin: 0;
		margin-left: 3px;
		color: white;
		font-size: 12px;
		line-height: 15px;
		font-weight: bold;
	}

	.center>.p {
		margin: 0;
		white-space: pre-line;
		line-height: 15px;
		font-size: 13px;
		font-weight: 300;
		height: 30px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>