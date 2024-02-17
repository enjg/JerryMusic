<template>
	<scroll-view scroll-y="true" class="Album">
		<view class="center" @click="routerPush(item.id)" v-for="(item,index) in listArray" :key="index">
			<view class="img">
				<image :src="item.picUrl" mode=""></image>
				<view></view>
			</view>
			<view class="details">
				<view class="name">
					<p class="p">{{item.name}}</p>
					<p class="p" v-if="item.alias.length">({{item.alias[0]}})</p>
				</view>
				<view class="Singer">
					<p class="p" v-for="(items,indexs) in item.artists" :key="indexs">{{items.name}}<span
							v-if="indexs<item.artists.length-1">/</span></p>
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
		getCloudsearch(mySearch.SearchText, 20, listArray.length, '10');
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
				listArray.push(...res.data.result.albums);
				console.log(listArray);
			})
			.catch((err) => {
				console.error(err);
			});
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


	.center {
		width: calc(100% - 40px);
		height: 50px;
		padding: 0 20px;
		margin-top: 10px;
	}

	.img {
		height: 50px;
		width: 50px;
		position: absolute;
		left: 20px;
	}

	.img>image {
		height: 100%;
		width: 50px;
		border-radius: 5px;
	}

	.img>view {
		height: 100%;
		width: 100%;
		background-color: black;
		position: absolute;
		top: -5px;
		border-radius: 50%;
		z-index: -1;
	}

	.details {
		width: calc(100% - 100px);
		height: 50px;
		position: absolute;
		left: 80px;
		overflow: hidden;
	}

	.name {
		height: 35px;
		width: 100%;
		overflow: hidden;
	}

	.name>.p {

		line-height: 35px;
		font-size: 17px;
		float: left;
	}

	.name>.p:nth-of-type(2) {
		color: #999999;
	}

	.Singer {
		width: 100%;
		height: 15px;
		overflow: hidden;
	}

	.Singer>.p {
		float: left;
		line-height: 15px;
		font-size: 13px;
		color: #808080;
		white-space: nowrap;
		font-weight: 300;
	}
</style>