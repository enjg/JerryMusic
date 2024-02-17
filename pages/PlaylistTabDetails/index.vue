<template>
	<view class="PlaylistTabDetails">
		<view class="bt">
			<image src="@/static/Universalimage/返回.png" alt="" @click="routerReturn()">
			</image>
			<p class="p">{{Props.name}}</p>
		</view>
		<scroll-view @scrolltolower="scrolltolower()" scroll-y="true" class="content">
			<view class="center" v-for="(item,index) in listArray" :key="index">
				<SongListBlock :message="{id:item.id,name:item.name,img:item.coverImgUrl,playCount:item.playCount}">
				</SongListBlock>
			</view>
			<load></load>
		</scroll-view>
	</view>
</template>
<script setup>
	import axios from '@/axios.js';
	import SongListBlock from '@/pages/module/SongListBlock/SongListBlock.vue'
	import load from '@/pages/module/load.vue'
	import {
		onMounted,
		defineProps,
		reactive
	} from 'vue';
	const Props = defineProps({
		name: String,
	});
	onMounted(() => {
		getPlaylistDetail(Props.name);
	});


	function routerReturn() {
		uni.navigateBack({
			delta: 1
		}); // 返回上一级页面
	}
	let listArray = reactive([]);

	function getPlaylistDetail(name) {
		axios
			.get("top/playlist", {
				params: {
					cat: name,
					limit: 30,
					offset: listArray.length
				},
			})
			.then((res) => {
				listArray.push(...res.data.playlists);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function scrolltolower() {
		console.log('到底部了')
		getPlaylistDetail(Props.name);
	}
</script>

<style scoped>
	.PlaylistTabDetails {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.bt {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background-color: white;
	}


	.bt>image {
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
	}

	.bt>.p {
		position: absolute;
		top: 50%;
		left: 60px;
		transform: translateY(-50%);
		line-height: 50px;
		font-size: 16px;
		font-weight: bold;
		color: #283349;
	}

	.content {
		width: calc(100vw - 40px);
		height: calc(100vh - 60px);
		position: absolute;
		top: 60px;
		overflow-x: hidden;
		overflow-y: auto;
		padding: 0 20px;
	}

	.center {
		height: calc((100vw - 60px) / 3 + 40px);
		width: calc((100vw - 60px) / 3);
		float: left;
		margin: 10px 0;
	}

	.center:nth-of-type(3n-1) {
		margin: 10px 10px;
	}
</style>