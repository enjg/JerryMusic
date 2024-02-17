<template>
	<scroll-view :scroll-y="Props.message.tf" class="MusicalStyleSong">
		<view class="bt">
			<view>
				<image @click.stop="myPlayBack.PlayDifference(listArray)" src="@/static/SongList/播放.png" alt=""></image>
			</view>
			<view>
				<p @click.stop="myPlayBack.PlayDifference(listArray)" class="p">播放全部</p>
				<p class="p">({{total}})</p>
			</view>
			<view>
				<p class="p" :class="{click:sort==0}" @click="sort=0">最新</p>
				<p class="p">|</p>
				<p class="p" :class="{click:sort==1}" @click="sort=1">最新</p>
			</view>
		</view>
		<view class="" @click="SongClick(listArray)">
			<SongBlockTwo
				:message="{name:item.name,index:index,mv:item.mv,ar:item.ar,fee:item.fee,hr:item.hr,sq:item.sq,al:item.al,img:item.al.picUrl,id:item.id}"
				v-for="(item,index) in listArray" :key="index"></SongBlockTwo>

		</view>


	</scroll-view>
</template>

<script setup>
	import axios from '@/axios.js';
	import SongBlockTwo from '@/pages/module/SongBlockStyle/SongBlockTwo.vue'
	import {
		defineProps,
		onMounted,
		reactive,
		ref
	} from "vue";
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js'

	const myPlayBack = useMyPlayBack();
	const Props = defineProps({
		message: Object,
	});
	let total = ref();
	let sort = ref(0);
	let listArray = reactive([]);
	onMounted(() => {
		getStyleSong(Props.message.id, sort.value);
	})

	function getStyleSong(id, sort) {
		axios
			.get("/style/song", {
				params: {
					tagId: id,
					sort: sort,
					cursor: listArray.length
				},
			})
			.then((res) => {
				listArray.push(...res.data.data.songs);
				total.value = res.data.data.page.total;
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
	.click {
		color: black !important;
		font-weight: bold !important;
	}

	.MusicalStyleSong {
		width: calc(100% - 40px);
		padding: 0 20px;
		height: 100%;
		overflow: hidden;
		position: relative;
	}

	.bt {
		height: 60px;
		width: 100%;
		position: relative;
	}

	.bt>view:nth-of-type(1) {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.bt>view:nth-of-type(1)>image {
		width: 10px;
		height: 10px;
		padding: 6px;
		background-color: #ff393b;
		border-radius: 50%;

	}

	.bt>view:nth-of-type(2) {
		position: absolute;
		left: 30px;
		height: 60px;
		width: calc(100% - 100px);
	}

	.bt>view:nth-of-type(2)>.p {
		float: left;
		line-height: 60px;
	}

	.bt>view:nth-of-type(2)>.p:nth-of-type(1) {
		font-size: 17px;
		color: black;
	}

	.bt>view:nth-of-type(2)>.p:nth-of-type(2) {
		font-size: 12px;
		color: #868485;
		margin-left: 5px;
		font-weight: 300;
	}

	.bt>view:nth-of-type(3) {
		position: absolute;
		height: 60px;
		right: 0px;
		top: 50%;
		transform: translateY(-50%);
	}

	.bt>view:nth-of-type(3)>.p {
		float: left;
		line-height: 60px;
		margin-left: 8px;
		font-size: 13px;
		font-weight: 300;
		color: #8e8e8e;
	}
</style>