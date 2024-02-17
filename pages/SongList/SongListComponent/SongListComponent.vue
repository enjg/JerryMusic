<template>
	<scroll-view scroll-y="true" @scrolltolower="scrolltolower()" class="SongListComponent"
		:id="'SongListComponent_content_' + Props.message.id">
		<view class="content" v-for="(item,index) in listArray" :key="index">
			<SongListBlock :message="{id:item.id,name:item.name,img:item.coverImgUrl,playCount:item.playCount}">
			</SongListBlock>
		</view>
		<load></load>
	</scroll-view>
</template>

<script setup>
	import load from '@/pages/module/load.vue'
	import SongListBlock from '@/pages/module/SongListBlock/SongListBlock.vue'
	import axios from '@/axios.js';
	import {
		defineProps,
		onMounted,
		reactive,
		ref
	} from "vue";

	const Props = defineProps({
		message: Object,
	});
	let myDiv = ref(null);
	let listArray = reactive([]);
	onMounted(() => {
		getPlaylistDetail(Props.message.name);
	})


	function getPlaylistDetail(name) {
		axios
			.get("/top/playlist", {
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
	
	function scrolltolower(){
		console.log('到底部了')
		getPlaylistDetail(Props.message.name);
	}
	
	
</script>

<style scoped>
	.SongListComponent {
		width: calc(100vw - 40px);
		height: 100%;
		margin-left: 20px;
	}

	.content {
		height: calc((100vw - 60px) / 3 + 40px);
		width: calc((100% - 20px) / 3);
		box-sizing: border-box;
		float: left;
		margin: 10px 0;
	}

	.content:nth-of-type(3n-1) {
		margin: 10px 10px;
	}
</style>