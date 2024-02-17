<template>
	<view class="PreSearch">
		<view class="sort">
			<view class="sort_center" @click="routerPush('/pages/SingerList/index')">
				<image src="../img/歌手.png" mode=""></image>
				<p class="p">歌手</p>
			</view>
			<view class="sort_center" @click="routerPush('/pages/MusicalStyle/index')">
				<image src="../img/曲风.png" mode=""></image>
				<p class="p">曲风</p>
			</view>
			<view class="sort_center">
				<image src="../img/专区.png" mode=""></image>
				<p class="p">专区</p>
			</view>
			<view class="sort_center" @click="routerPush('/pages/Sensibilities/index')">
				<image src="../img/识曲.png" mode=""></image>
				<p class="p">识曲</p>
			</view>
		</view>
		<view class="content">
			<view class="RecommendedKeywords">
				<view class="RecommendedKeywords_bt">
					<p class="p">猜你喜欢</p>
				</view>
				<view class="RecommendedKeywords_center">
					<p class="p">{{mySearch.DefaultSearch}}</p>
				</view>
			</view>
			<view class="center">
				<swiper class="swiper" circular=true previous-margin="40px" next-margin="40px">
					<swiper-item class="swiper-item" v-for="(item,index) in PlaylistChart" :key="index">
						<Leaderboard :Obj="item"></Leaderboard>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useMySearch
	} from '@/pinia/mySearch.js';
	const mySearch = useMySearch();
	import Leaderboard from './Leaderboard.vue'
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	onMounted(() => {
		getSearchDefault();
		getTopList();
	})
	let DefaultSearch = ref(null);

	function getSearchDefault() {
		let time = Date.now();
		axios
			.get("/search/default", {
				params: {
					timestamp: time,
				},
			})
			.then((res) => {
				DefaultSearch.value = res.data.data.realkeyword;
				mySearch.DefaultSearch = res.data.data.realkeyword;
			})
			.catch((err) => {
				console.error(err);
			});
	}
	let PlaylistChart = reactive([{
		name: '热搜榜',
		id: null
	}]);

	function getTopList() {
		axios
			.get("/toplist")
			.then((res) => {
				getRandomElements(res.data.list, 6)

			})
			.catch((err) => {
				console.error(err);
			});
	}

	function getRandomElements(arr, num) {
		const result = [];
		const len = arr.length;
		if (num >= len) {
			return arr; // 如果数组长度小于等于num，则直接返回整个数组
		}
		while (result.length < num) {
			const randomIndex = Math.floor(Math.random() * len);
			const randomElement = arr[randomIndex];
			if (result.indexOf(randomElement) === -1) {
				result.push(randomElement);
			}
		}
		result.forEach((element) => {
			PlaylistChart.push({
				name: element.name,
				id: element.id
			})
		})
	}

	function routerPush(center) {
		wx.navigateTo({
			url: center
		})
	}
</script>

<style scoped>
	.PreSearch {
		width: 100%;
		height: calc(100% - 50px);
		position: absolute;
		top: 50px;
		left: 0;
	}


	.sort {
		width: 100%;
		height: 40px;
		position: absolute;
		top: 0;
		left: 0;
	}

	.sort_center {
		width: calc(100% / 4);
		box-sizing: border-box;
		height: 20px;
		position: relative;
		float: left;
		margin-top: 10px;
		border-right: 1px solid #e5e6ea;
	}

	.sort_center>image {
		width: 20px;
		height: 20px;
		position: absolute;
		left: calc(25vw / 4);
		top: 50%;
		transform: translateY(-50%);
	}

	.sort_center>.p {
		width: 12.5vw;
		height: 20px;
		line-height: 20px;
		position: absolute;
		left: 12.5vw;
		font-weight: bold;
	}

	.content {
		width: 100%;
		height: calc(100% - 40px);
		overflow-y: auto;
		position: absolute;
		left: 0;
		top: 40px;
	}

	.RecommendedKeywords {
		width: calc(100% - 40px);
		height: 60px;
		padding: 0 20px;
	}

	.RecommendedKeywords_bt {
		height: 30px;
		width: 100%;
	}

	.RecommendedKeywords_bt>.p {
		line-height: 30px;
		font-size: 13px;
		font-weight: bold;
	}

	.RecommendedKeywords_center {
		width: 100%;
		height: 30px;
	}

	.RecommendedKeywords_center>.p {
		float: left;
		height: 30px;
		line-height: 30px;
		padding: 0 15px;
		border-radius: 15px;
		background-color: white;
		box-sizing: border-box;
		border: 1px solid #e5e6ea;
		font-size: 14px;
		color: #5b6066;
	}

	.center {
		width: calc(100%);
		height: 800px;
		margin-top: 20px;
	}

	.swiper {
		width: 100%;
		height: 100%;
	}

	.swiper-item {
		box-sizing: border-box;
	}
</style>