<template>
	<scroll-view scroll-y="true" class="Single">
		<view class="songList_bt">
			<view>
				<image @click.stop="myPlayBack.PlayDifference(listArray)"  src="@/static/SongList/播放.png" alt=""></image>
			</view>
			<view>
				<p @click.stop="myPlayBack.PlayDifference(listArray)" class="p">播放全部</p>
			</view>
			<view>
				<image src="@/static/SongList/列表.png" alt=""></image>
			</view>
		</view>
		<view class="Single_content" @click="myPlayBack.SongListAdd(item)" v-for="(item,index) in listArray"
			:key="index">
			<view class="center">
				<view class="name">
					<p class="p">{{item.name}}</p>
				</view>
				<view class="details">
					<p v-if="item.fee == 1" class="p mv vip">VIP</p>
					<p v-if="item.fee == 1" class="p mv vip">试听</p>
					<p v-if="item.sq !== null && item.hr == null" class="p mv">SQ</p>
					<p v-if="item.hr !== null" class="p mv">Hi-Res</p>
					<p class="p">{{item.ar[0].name}}</p>
					<p class="p">&nbsp;-&nbsp;</p>
					<p class="p">{{item.al.name}}</p>
				</view>
			</view>
			<image @click.stop="moreClick(item.id)" src="../../../static/SongList/更多.png" mode="heightFix"></image>
			<image @click.stop="myPlayBack.SongListAddSong(item)" src="../../../static/Universalimage/播放4.png" mode="">
			</image>
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
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js'
	const myPlayBack = useMyPlayBack();
	import {
		useMyMore
	} from '@/pinia/myMore.js'
	const myMore = useMyMore();
	onMounted(() => {
		getCloudsearch(mySearch.SearchText, 20, listArray.length, '1');
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
				listArray.push(...res.data.result.songs);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function moreClick(event) {
		myMore.TF = true;
		myMore.id = event;
	}
</script>

<style scoped>
	.mv {
		height: 11px;
		border-radius: 2px;
		margin: 0 !important;
		margin-top: 2px !important;
		color: #bcb682 !important;
		font-size: 8px !important;
		padding: 0 3px;
		line-height: 9px !important;
		box-sizing: border-box;
		border: 1px solid #bcb682;
		margin-right: 5px !important;
	}

	.vip {
		color: #d14a57 !important;
		border: 1px solid #d14a57 !important;
	}

	.Single {
		width: calc(100% - 40px);
		height: 100%;
		padding: 0 20px;
	}

	.songList_bt {
		height: 50px;
		width: 100%;
		position: relative;
		border-bottom: 1px solid #eeeff4;
	}


	.songList_bt>view:nth-of-type(1) {
		width: 25px;
		height: 50px;
		position: absolute;
		left: 0px;
	}

	.songList_bt>view:nth-of-type(1)>image {
		width: 9px;
		height: 9px;
		padding: 8px;
		background-color: #f43226;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.songList_bt>view:nth-of-type(2) {
		position: absolute;
		left: 35px;
		height: 50px;
		width: calc(100% - 155px);
	}

	.songList_bt>view:nth-of-type(2)>.p {
		float: left;
		line-height: 50px;
		margin-right: 10px;
		font-size: 17px;
		font-weight: bold;
	}


	.songList_bt>view:nth-of-type(3)>image {
		position: absolute;
		width: 20px;
		height: 20px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.songList_bt>view:nth-of-type(3) {
		position: absolute;
		height: 50px;
		width: 20px;
		right: 0px;
	}

	.Single_content {
		width: calc(100% - 40px);
		height: 60px;
		padding: 10px 20px;
		position: relative;
		border-bottom: 1px solid #eeeff4;
	}

	.Single_content>image:nth-of-type(1) {
		height: 20px;
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	}

	.Single_content>image:nth-of-type(2) {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		right: 45px;
		transform: translateY(-50%);
	}

	.center {
		height: 60px;
		width: calc(100% - 100px);
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
	}

	.name {
		height: 30px;
		width: 100%;
		line-height: 30px;
	}

	.name>.p {
		width: 100%;
		height: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.details {
		height: 30px;
		width: 100%;
	}

	.details>.p {
		float: left;
		line-height: 15px;
		font-size: 12px;
		font-weight: 300;
		color: #9a9a9a;

	}
</style>