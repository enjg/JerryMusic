<template>
	<scroll-view scroll-y="true" class="SongList">
		<view class="SongList_content" @click="routerPush(item.id)" v-for="(item,index) in listArray" :key="index">
			<image :src="item.coverImgUrl" mode=""></image>
			<view class="center">
				<view class="name">
					<p class="p">{{item.name}}</p>
				</view>
				<view class="details">
					<p class="p">{{item.trackCount}}首,</p>
					<p class="p">by&nbsp;{{item.creator.nickname}},</p>
					<p class="p">播放{{formatFansCount(item.playCount)}}次</p>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		useMySearch
	} from '@/pinia/mySearch.js';
	import {
		onMounted,
		reactive
	} from 'vue';
	const mySearch = useMySearch();

	onMounted(() => {
		getCloudsearch(mySearch.SearchText, 20, listArray.length, '1000');
	})
	let listArray = reactive([]);

	function getCloudsearch(keywordss, limits, offsets, types) {
		axios
			.get("/cloudsearch", {
				params: {
					keywords: keywordss,
					limit: limits,
					offset: offsets,
					type: types
				},
			})
			.then((res) => {
				listArray.push(...res.data.result.playlists);
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
	.SongList {
		width: calc(100%);
		height: 100%;
	}

	.SongList_content {
		width: calc(100%);
		height: 50px;
		position: relative;
		margin-top: 10px;
	}

	.SongList_content>image {
		width: 50px;
		height: 50px;
		position: absolute;
		top: 0;
		left: 20px;
		border-radius: 5px;
	}

	.center {
		width: calc(100% - 100px);
		height: calc(100%);
		padding: 0;
		position: absolute;
		left: 80px;
	}

	.name {
		height: 35px;
		width: 100%;
	}

	.name>.p {
		width: 100%;
		height: 100%;
		font-size: 14px;
		line-height: 35px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.details {
		height: 15px;
		width: 100%;
	}

	.details .p {
		line-height: 15px;
		font-size: 13px;
		color: #898989;
		font-weight: 300;
		float: left;
	}
</style>