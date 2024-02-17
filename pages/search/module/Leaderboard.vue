<template>
	<view class="Leaderboard">
		<view class="Leaderboard_bt">
			<p class="p">{{Props.Obj.name}}</p>
		</view>
		<view class="content">
			<view class="center" :class="{LeaderboardClick:zindex==index}" @touchstart="onTouchStart(index)"
				@touchend="onTouchEnd" @click="Click(item.name,item.searchWord)" v-for="(item,index) in listArray"
				:key="index">
				<p class="p" :class="{indexTop: index<3}">{{index+1}}</p>
				<p class="p" v-if="item.name" :class="{nameTop: index<3}">{{item.name}}</p>
				<p class="p" v-if="item.searchWord" :class="{nameTop: index<3}">{{item.searchWord}}</p>
			</view>
		</view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		reactive,
		defineProps,
		onMounted,
		ref
	} from 'vue';
	import {
		useMySearch
	} from '@/pinia/mySearch.js';
	const mySearch = useMySearch();
	const Props = defineProps({
		Obj: Object
	})
	onMounted(() => {
		if (Props.Obj.id) {
			getPlaylistDetail(Props.Obj.id);
		} else {
			getSearchHotDetail();
		}
	})
	let listArray = reactive([]);

	function getPlaylistDetail(ids) {
		axios
			.get("/playlist/detail", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				listArray.push(...res.data.playlist.tracks.slice(0, 20));
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function getSearchHotDetail() {
		axios
			.get("/search/hot/detail")
			.then((res) => {
				listArray.push(...res.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	let zindex = ref(null);

	function onTouchStart(event) {
		zindex.value = event;
	}

	function onTouchEnd() {
		zindex.value = null;
	}

	function Click(name, searchWord) {
		console.log(name, searchWord);
		if (name) {
			mySearch.SearchText = name;
		} else {
			mySearch.SearchText = searchWord;
		}
		mySearch.Tips = -1;
		mySearch.SearchTF = 1;
	}
</script>

<style scoped>
	.LeaderboardClick {
		opacity: 0.5;
	}

	.indexTop {
		color: #ff2d40 !important;
		font-weight: bold;
	}

	.nameTop {
		color: #2a303e !important;
		font-weight: bold;
	}

	.Leaderboard {
		margin-top: 15px;
		margin-left: 7.5px;
		width: calc(100% - 55px);
		padding: 0 20px;
		height: 770px;
		background-color: #ffffff;
		border-radius: 10px;
		box-shadow:
			5px 5px 5px 0px rgba(0, 0, 0, 0.02),
			-5px 5px 5px 0px rgba(0, 0, 0, 0.02),
			5px -5px 5px 0px rgba(0, 0, 0, 0.02),
			-5px -5px 5px 0px rgba(0, 0, 0, 0.02);
	}

	.Leaderboard_bt {
		height: 50px;
		box-sizing: border-box;
		width: 100%;
		border-bottom: 1px solid #f5f5f5;
	}

	.Leaderboard_bt>.p {
		line-height: 50px;
		font-size: 17px;
		font-weight: bold;
	}

	.content {
		width: 100%;
		height: calc(100% - 50px);
	}

	.center {
		width: 100%;
		height: 35px;
	}


	.center>.p {
		float: left;
		line-height: 35px;
		font-size: 13px;
	}

	.center>.p:nth-of-type(1) {
		width: 30px;
		color: #7d818c;
	}

	.center>.p:nth-of-type(2) {
		width: calc(100% - 30px);
		height: 100%;
		color: #2c2c38;
		white-space: nowrap;
		/* 防止换行 */
		overflow: hidden;
		/* 隐藏溢出部分 */
		text-overflow: ellipsis;
		/* 使用省略号代替溢出部分 */
	}
</style>