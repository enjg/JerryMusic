<template>
	<scroll-view scroll-y="true" class="Mv">
		<view class="MvList_center" v-for="(item,index) in listArray " :key="index"
			@click="routerPush('/pages/VideoPlayback/index',item.id)">
			<view class="img">
				<image :src="item.cover" mode="heightFix"></image>
			</view>
			<view class="name">
				<p class="p">{{item.name}}</p>
				<p class="p">{{item.artists[0].name}}</p>
				<p class="p">{{formatFansCount(item.playCount)}}</p>
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
		getCloudsearch(mySearch.SearchText, 20, listArray.length, '1004');
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
				listArray.push(...res.data.result.mvs);
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

	function routerPush(center, event) {
		wx.navigateTo({
			url: center + '?id=' + event
		})
	}
</script>

<style scoped>
	.Mv {
		width: calc(100% - 40px);
		height: 100%;
		padding: 0 20px;
	}

	.MvList_center {
		width: 100%;
		height: 80px;
		margin-bottom: 10px;
		display: flex;
	}

	.img {
		height: 100%;
	}

	.img>image {
		height: 100%;
		border-radius: 5px;
	}

	.name {
		flex-grow: 1;
		overflow: hidden;
	}

	.name>.p {
		line-height: 20px;
		margin-left: 10px;
		font-size: 12px;
		color: #999798;
	}

	.name>.p:nth-of-type(1) {
		font-size: 15px;
		color: black;
	}
</style>