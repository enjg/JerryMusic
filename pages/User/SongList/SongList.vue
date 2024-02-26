<template>
	<scroll-view class="Song" :scroll-y="Props.message.TF">
		<view class="SongList">
			<view class="bt">
				<p class="p">创建的歌单({{listArray.length}})</p>
			</view>
			<view class="SongList_content" @click="routerPush(item.id)" v-for="(item,index) in listArray" :key="index">
				<view class="image">
					<image :src="item.coverImgUrl" mode="heightFix"></image>
				</view>
				<view class="details">
					<view class="name">
						<p class="p">{{item.name}}</p>
					</view>
					<view class="intro">
						<p class="p">{{item.trackCount}}首</p>
						<p class="p">&nbsp;.&nbsp;</p>
						<p class="p">{{item.playCount}}次播放</p>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		ref,
		defineProps,
		reactive,
		onMounted
	} from 'vue';
	const Props = defineProps({
		message: Object
	})

	onMounted(() => {
		getUserPlaylist();
	})
	let listArray = reactive([]);

	function getUserPlaylist(ids) {
		axios
			.get("/user/playlist", {
				params: {
					uid: 8866570372
				},
			})
			.then((res) => {
				console.log(res.data.playlist, '123456789/')
				listArray.push(...res.data.playlist);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function routerPush(event) {
		wx.navigateTo({
			url: `/pages/PlaylistDetails/index?id=${event}`
		})
	}
</script>

<style scoped>
	.Song {
		width: 100%;
		height: 100%;
	}

	.SongList {
		width: calc(100vw - 40px);
		padding: 0 20px;
	}

	.bt {
		height: 50px;
		width: 100%;
		line-height: 50px;
		font-size: 15px;
		color: #424450;
	}

	.SongList_content {
		width: 100%;
		height: 60px;
		margin-bottom: 15px;
		position: relative;
	}

	.SongList_content>.image {
		width: 60px;
		height: 60px;
		position: absolute;
		left: 0;
		overflow: hidden;
		border-radius: 10px;
	}

	.SongList_content>.image>image {
		height: 100%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.SongList_content>.details {
		width: calc(100% - 70px);
		height: calc(100% - 20px);
		padding: 10px 0;
		position: absolute;
		left: 70px;
	}

	.SongList_content>.details>.name {
		width: 100%;
		height: 20px;
		line-height: 20px;
		font-size: 15px;
		color: #424357;
		font-weight: bold;
	}

	.SongList_content>.details>.intro {
		width: 100%;
		height: 20px;
		line-height: 20px;
	}

	.SongList_content>.details>.intro>.p {
		float: left;
		font-size: 13px;
		color: #818287;
	}
</style>