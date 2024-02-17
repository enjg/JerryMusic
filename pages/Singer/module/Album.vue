<template>
	<view class="Album">
		<view class="Album_bt">
			<p class="p">歌手专辑</p>
		</view>
		<scroll-view :scroll-y="Props.message.tf" class="Album_content">
			<view class="Album_center" @click="routerPush(item.id)" v-for="(item,index) in listArray" :key="index">
				<image :src="item.picUrl" mode=""></image>
				<view class="bj">
				</view>
				<view class="name">
					<p class="p">{{item.name}}</p>
					<view>
						<p class="p">{{formatTimestampToDateString(item.publishTime)}}</p>
						<p class="p">{{item.size}}首</p>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		onMounted,
		defineProps,
		reactive
	} from "vue";
	const Props = defineProps({
		message: Object,
	});
	onMounted(() => {
		getArtistAlbum(Props.message.id);
	})
	let listArray = reactive([]);

	function getArtistAlbum(ids) {
		axios
			.get("/artist/album", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				listArray.push(...res.data.hotAlbums);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function formatTimestampToDateString(timestamp) {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		return year + '-' + month + '-' + day;
	}

	function routerPush(event) {
		wx.navigateTo({
			url: `/pages/Album/index?id=${event}`
		})
	}
</script>

<style scoped>
	.Album {
		width: 100%;
		height: 100%;
	}

	.Album_bt {
		height: 50px;
		width: 100%;
	}

	.Album_bt>.p {
		line-height: 50px;
		font-size: 17px;
		margin-left: 20px;
	}

	.Album_content {
		width: calc(100% - 40px);
		height: calc(100% - 50px);
		padding: 0 20px;
		overflow: hidden;
		position: relative;
	}

	.Album_center {
		width: 100%;
		height: 60px;
		margin-top: 20px;
		position: relative;
	}

	.Album_center>image {
		height: 60px;
		width: 60px;
		border-radius: 10px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
	}

	.bj {
		width: 60px;
		height: 60px;
		position: absolute;
		left: 0;
		top: -5px;
		border-radius: 50%;
		background-color: black;

	}

	.name {
		width: calc(100% - 70px);
		height: 40px;
		position: absolute;
		left: 70px;
		top: 0;
		padding: 10px 0;
	}

	.name>.p {
		height: 25px;
		line-height: 25px;
		font-size: 17px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.name>view {
		height: 15px;
		width: 100%;
	}

	.name>view>.p {
		float: left;
		font-size: 13px;
		margin-right: 5px;
		color: #7f8084;
		line-height: 15px;
	}
</style>