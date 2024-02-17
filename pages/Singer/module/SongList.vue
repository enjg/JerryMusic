<template>
	<view class="SongList">
		<view class="songList_bt">
			<view>
				<image @click.stop="myPlayBack.PlayDifference(listArray)" src="@/static/SongList/播放.png" alt=""></image>
			</view>
			<view>
				<p @click.stop="myPlayBack.PlayDifference(listArray)" class="p">播放热门50</p>
			</view>
			<view>
				<image src="@/static/SongList/下载.png" alt=""></image>
			</view>
			<view>
				<image src="@/static/SongList/列表.png" alt=""></image>
			</view>
		</view>
		<scroll-view :scroll-y="Props.message.tf" class="songList_content" @click="SongClick(listArray)">
			<SongBlockOne
				:message="{name:item.name,index:index,mv:item.mv,ar:item.ar,fee:item.fee,hr:item.hr,sq:item.sq,id:item.id}"
				v-for="(item,index) in listArray" :key="index"></SongBlockOne>
		</scroll-view>
	</view>
</template>

<script setup>
	import SongBlockOne from '@/pages/module/SongBlockStyle/SongBlockOne.vue';
	import axios from '@/axios.js';
	import {
		onMounted,
		defineProps,
		reactive,
		watch
	} from "vue";
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js'

	const myPlayBack = useMyPlayBack();
	const Props = defineProps({
		message: Object,
	});
	onMounted(() => {
		getArtistTopSong(Props.message.id);
	})
	let listArray = reactive([]);

	function getArtistTopSong(ids) {
		axios
			.get("/artist/top/song", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				listArray.push(...res.data.songs);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function SongClick(listArray) {
		myPlayBack.PostAddSongList(listArray)
	}
</script>

<style scoped>
	.SongList {
		width: 100%;
		height: 100%;
		background-color: white;

	}

	.songList_bt {
		height: 50px;
		width: 100%;
		position: sticky;
		top: 0;
	}

	.songList_bt>view:nth-of-type(1) {
		width: 25px;
		height: 50px;
		position: absolute;
		left: 20px;
	}

	.songList_bt>view:nth-of-type(1)>image {
		width: 9px;
		height: 9px;
		padding: 8px;
		background-color: #f43226;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.songList_bt>view:nth-of-type(2) {
		position: absolute;
		left: 65px;
		height: 50px;
		width: calc(100% - 155px);
	}

	.songList_bt>view:nth-of-type(2)>.p {
		float: left;
		line-height: 50px;
		margin-right: 10px;
	}

	.songList_bt>view:nth-of-type(2)>.p:nth-of-type(1) {
		font-size: 18px;
		font-weight: bold;
	}


	.songList_bt>view:nth-of-type(3) {
		position: absolute;
		height: 50px;
		width: 50px;
		right: 40px;
	}

	.songList_bt>view:nth-of-type(3)>image {
		position: absolute;
		width: 20px;
		height: 20px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.songList_bt>view:nth-of-type(4)>image {
		position: absolute;
		width: 20px;
		height: 20px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.songList_bt>view:nth-of-type(4) {
		position: absolute;
		height: 50px;
		width: 20px;
		right: 20px;
	}

	.songList_content {
		width: calc(100% - 40px);
		padding: 0 20px;
		height: calc(100% - 50px);
		overflow: hidden;
		position: relative;
	}
</style>