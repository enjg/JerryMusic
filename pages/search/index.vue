<template>
	<view class="search">
		<view class="SearchBox">
			<image @click="routerReturn()" src="@/static/Universalimage/返回.png" mode=""></image>
			<view class="SearchBox_content">
				<input v-on:focus="mySearch.Tips=1" type="text" class="input" v-model="mySearch.SearchText"
					:placeholder="mySearch.DefaultSearch">
				<image src="@/static/Search/放大镜.png" alt=""></image>
			</view>
			<p class="p" @click="SearchClick()">搜索</p>
		</view>
		<Tips v-if="mySearch.SearchText!=='' && mySearch.SearchTF==-1"></Tips>
		<PostSearch v-if="mySearch.SearchText!=='' && mySearch.Tips==-1 && mySearch.SearchTF==1"></PostSearch>
		<PreSearch v-if="mySearch.SearchText==''"></PreSearch>
		<Player />
		<MoreDetails v-if="myMore.TF"></MoreDetails>
		<ShareSort v-if="myShare.ShowTF"></ShareSort>

	</view>
</template>

<script setup>
	import ShareSort from '@/pages/module/ShareSort.vue'
	import MoreDetails from '@/pages/module/MoreDetails.vue';
	import PostSearch from './module/PostSearch.vue'
	import PreSearch from './module/PreSearch.vue'
	import Tips from './module/Tips.vue'
	import {
		useMySearch
	} from '@/pinia/mySearch.js';
	import {
		onMounted,
		ref
	} from 'vue';
	const mySearch = useMySearch();
	import {
		useMyShare
	} from '../../pinia/myShare';
	const myShare = useMyShare();
	import {
		useMyMore
	} from '@/pinia/myMore.js'
	const myMore = useMyMore();

	function routerReturn() {
		wx.navigateBack({
			delta: 1,
		});
	}

	function SearchClick() {
		if (mySearch.SearchText !== '') {
			mySearch.SearchTF = 1;
		}
	}
	onMounted(() => {
		mySearch.SearchText = '';
		mySearch.SearchTF = -1;
		mySearch.Tips = -1;
	})
</script>

<style scoped>
	.search {
		width: 100vw;
		height: 100vh;
		background: linear-gradient(to bottom, #f8f9fd, #f8f9fd, #f8f9fd, #ffffff);
	}

	.SearchBox {
		width: 100%;
		height: 50px;
		position: absolute;
		left: 0px;
		top: 0px;
		z-index: 9999;
	}

	.SearchBox_content {
		width: calc(100% - 100px);
		height: 35px;
		position: absolute;
		top: 50%;
		left: 50px;
		transform: translateY(-50%);
	}

	.SearchBox_content>.input {
		height: 100%;
		width: calc(100% - 30px);
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		border-radius: 17.5px;
		/* 		caret-color: white; */
		padding-left: 30px;
		/* 为图标留出空间 */
		color: black;
		font-size: 12px;
		background-color: white;
		border: 1px solid #e5e6ea;
	}

	.SearchBox_content image {
		width: 15px;
		height: 15px;
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
	}

	.SearchBox>image {
		width: 20px;
		height: 20px;
	}

	.SearchBox>image:nth-of-type(1) {
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.SearchBox>image:nth-of-type(2) {
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.SearchBox>.p {
		width: calc(50px);
		height: 100%;
		position: absolute;
		top: 0;
		left: calc(100% - 50px);
		text-align: center;
		line-height: 50px;
	}
</style>