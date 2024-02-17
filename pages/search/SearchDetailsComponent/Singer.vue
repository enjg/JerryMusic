<template>
	<scroll-view class="Singer" scroll-y="true">
		<view class="Singer_content" @click="routerPush(item.id)" v-for="(item,index) in listArray" :key="index">
			<view class="image">
				<image :src="item.picUrl" mode="heightFix"></image>
			</view>
			<view class="name">
				<p class="p">{{item.name}}</p>
				<p class="p" v-if="item.alias.length">({{item.alias[0]}})</p>
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
		getCloudsearch(mySearch.SearchText, 20, listArray.length, '100');
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
				listArray.push(...res.data.result.artists);
			})
			.catch((err) => {
				console.error(err);
			});
	}
	function routerPush(event) {
		console.log(event)
		wx.navigateTo({
			url: '/pages/Singer/index?id=' + event
		})
	}
</script>

<style scoped>
	.Singer {
		width: 100%;
		height: 100%;

	}
	.Singer_content{
		height: 50px;
		width: 100%;
		padding: 10px 0;
		position: relative;
	}
	.image{
		width: 50px;
		height: 50px;
		position: absolute;
		left: 20px;
		border-radius: 50%;
		overflow: hidden;
	}
	.image>image{
		height: 100%;
	}
	.name{
		width: calc(100% - 110px);
		height: 50px;
		position: absolute;
		left: 90px;
	}
	.name>.p{
		float: left;
		line-height: 50px;
		font-size: 16px;
		color: black;
	}
	.name>.p:nth-of-type(2){
		color: #999999;
		margin-left: 5px;
	}
</style>