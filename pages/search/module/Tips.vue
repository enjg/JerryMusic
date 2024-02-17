<template>
	<view class="Tips">
		<view class="content" @click="Click(item.keyword)" v-for="(item,index) in listArray" :key="index">
			<image src="../../../static/Search/放大镜.png" mode=""></image>
			<view class="center">
				<p class="p">{{item.keyword}}</p>
			</view>
		</view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive,
		watch
	} from 'vue';
	import {
		useMySearch
	} from '@/pinia/mySearch.js';
	const mySearch = useMySearch();
	onMounted(() => {
		getSearchSuggest(mySearch.SearchText, 'mobile');
	})
	watch(() => mySearch.SearchText, (newValue) => {
		listArray.length = 0;
		getSearchSuggest(newValue, 'mobile');
	})
	let listArray = reactive([]);

	function getSearchSuggest(keywordss, types) {
		axios
			.get("/search/suggest", {
				params: {
					keywords: keywordss,
					type: types
				},
			})
			.then((res) => {
				listArray.push(...res.data.result.allMatch);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function Click(evetn) {
		mySearch.SearchText = evetn;
		mySearch.SearchTF = 1;
	}
</script>

<style scoped>
	.Tips {
		width: 100%;
		height: calc(100% - 50px);
		position: absolute;
		top: 50px;
		left: 0;
		overflow-y: auto;
	}

	.content {
		height: 50px;
		width: 100%;
		position: relative;
	}

	.content>image {
		width: 20px;
		height: 20px;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.center {
		width: calc(100% - 60px);
		height: 100%;
		position: absolute;
		left: 60px;
		top: 50%;
		transform: translateY(-50%);
		box-sizing: border-box;
		border-bottom: 1px solid #eeeff4;
	}

	.center>.p {
		line-height: 50px;
		font-size: 15px;
	}
</style>