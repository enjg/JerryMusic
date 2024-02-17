<template>
	<scroll-view :scroll-y="Props.message.tf" class="MusicalStyleSongList">
		<view class="center" @click="routerPush(item.id)" v-for="(item,index) in listArray" :key="index">
			<view class="img">
				<image mode="heightFix" :src="item.cover" alt=""></image>
			</view>
			<view class="name">
				<p class="p">{{item.name}}</p>
				<view>
					<p class="p">{{item.songCount}}首,</p>
					<p class="p">by {{item.userName}}</p>
					<p class="p">播放{{formatFansCount(item.playCount)}}次</p>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
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
	let listArray = reactive([]);
	onMounted(() => {
		getStylePlaylist(Props.message.id);
	})

	function getStylePlaylist(id) {
		axios
			.get("/style/playlist", {
				params: {
					tagId: id,
					cursor: listArray.length
				},
			})
			.then((res) => {
				listArray.push(...res.data.data.playlist);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function formatFansCount(fansCount) {
		if (fansCount >= 100000000) {
			return Math.floor(fansCount / 100000000) + ' 亿';
		} else if (fansCount >= 10000) {
			return Math.floor(fansCount / 10000) + ' 万';
		} else {
			return fansCount;
		}
	}

	function routerPush(event) {
		wx.navigateTo({
			url: `/pages/PlaylistDetails/index?id=${event}`
		})
	}
</script>

<style scoped>
	.MusicalStyleSongList {
		width: calc(100% - 40px);
		height: 100%;
		padding: 0 20px;
		position: relative;
		overflow: hidden;
	}

	.center {
		width: 100%;
		height: 50px;
		margin-top: 10px;
	}

	.img {
		position: relative;
		width: 50px;
		height: 50px;
		float: left;
	}

	.img>image {
		height: 100%;
		float: left;
		border-radius: 5px;
	}

	.name {
		float: left;
		height: 100%;
		width: calc(100% - 60px);
		margin-left: 10px;
	}

	.name>.p {
		line-height: 35px;
		font-size: 17px;
		width: 100%;
		height: 35px;
		white-space: nowrap;
		/* 防止文本换行 */
		overflow: hidden;
		/* 隐藏超出部分的文本 */
		text-overflow: ellipsis;
		/* 用省略号代替超出部分的文本 */
	}

	.name>view {
		width: 100%;
		height: 15px;
		overflow: hidden;
	}

	.name>view>.p {
		float: left;
		line-height: 15px;
		font-size: 13px;
		color: #808080;
		white-space: nowrap;
		font-weight: 300;
	}
</style>