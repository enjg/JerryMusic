<template>
	<view class="DailyRecommendation">
		<view class="DailyRecommendation_bt">
			<view class="DailyRecommendation_bt_content">
				<image :src="bjOne" mode="widthFix"></image>
				<p class="p">{{getCurrentDay()}}<span class="span">/{{getCurrentMonth()}}</span></p>
			</view>
		</view>
		<view class="DailyRecommendation_content">
			<view class="SongList_bt">
				<view>
					<image src="@/static/SongList/播放.png" alt=""></image>
				</view>
				<view>
					<p class="p">播放全部</p>
					<p class="p">({{listArray.length}})</p>
				</view>
				<view>
					<image src="@/static/SongList/列表.png" alt=""></image>
				</view>
			</view>
			<scroll-view @click="Click(listArray)" scroll-y="true" class="DailyRecommendation_content_center">
				<SongBlockTwo
					:message="{name:item.name,index:index,mv:item.mv,ar:item.ar,fee:item.fee,hr:item.hr,sq:item.sq,al:item.al,img:item.al.picUrl,id:item.id}"
					v-for="(item,index) in listArray" :key="index"></SongBlockTwo>
			</scroll-view>
		</view>
		<Player />
		<MoreDetails v-if="myMore.TF"></MoreDetails>
		<ShareSort v-if="myShare.ShowTF"></ShareSort>

	</view>
</template>

<script setup>
	import ShareSort from '@/pages/module/ShareSort.vue'
	import bjOne from '../LogIn/img/杰瑞.jpg';;
	import MoreDetails from '@/pages/module/MoreDetails.vue';
	import SongBlockTwo from '@/pages/module/SongBlockStyle/SongBlockTwo.vue'
	import axios from '@/axios.js';
	import {
		useMyUser
	} from '@/pinia/myUser.js';
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	const myUser = useMyUser();
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js'

	const myPlayBack = useMyPlayBack();
	import {
		useMyMore
	} from '@/pinia/myMore.js'
	const myMore = useMyMore();
	import {
		useMyShare
	} from '../../pinia/myShare';
	const myShare = useMyShare();
	onMounted(() => {
		getRecommendSongs(myUser.cookie);
	})
	let listArray = reactive([]);

	function getRecommendSongs(cookies) {
		axios
			.get("/recommend/songs", {
				params: {
					cookie: cookies
				},
			})

			.then((res) => {
				listArray.push(...res.data.data.dailySongs);
			})
			.catch((error) => {
				console.error(error);
			});
	}



	function getCurrentMonth() {
		var date = new Date();
		var month = date.getMonth() + 1; // 月份从0开始计数，所以要加1
		return month;
	}

	function getCurrentDay() {
		var date = new Date();
		var day = date.getDate(); // 获取当前日期中的天数
		return day;
	}

	function Click(lisArray) {
		myPlayBack.PostAddSongList(listArray)
	}
</script>

<style scoped>
	.DailyRecommendation {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.DailyRecommendation_bt {
		width: 250%;
		height: 30vh;
		position: static;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		/* 		margin-left: calc(-50% + 50vw); */
		border-bottom-left-radius: 50%;
		border-bottom-right-radius: 50%;
		overflow: hidden;
		position: relative;
	}

	.DailyRecommendation_bt_content {
		width: 100vw;
		height: 30vh;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}


	.DailyRecommendation_bt_content>.p {
		position: absolute;
		bottom: 3vh;
		left: 5vw;
		color: white;
	}

	.DailyRecommendation_bt_content>.p:nth-of-type(1) {
		font-size: 70rpx;
	}

	.DailyRecommendation_bt_content>.p>.span {
		font-size: 35rpx;
	}

	.DailyRecommendation_bt_content>image {
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}

	.DailyRecommendation_content {
		width: calc(100% - 40px);
		height: 70vh;
		padding: 0 20px;
		position: absolute;
		top: 30vh;
		flex: 1;
		overflow: hidden;

	}

	.SongList_bt {
		height: 60px;
		width: 100%;
		position: relative;
	}

	.SongList_bt>view:nth-of-type(1) {
		position: absolute;
		width: 35px;
		top: 50%;
		left: 0;
		transform: translateY(-50%);

	}

	.SongList_bt>view:nth-of-type(1)>image {
		width: 9px;
		height: 9px;
		padding: 8px;
		background-color: #f43226;
		border-radius: 50%;
	}

	.SongList_bt>view:nth-of-type(2) {
		position: absolute;
		left: 45px;
		height: 60px;
		width: calc(100% - 55px);
	}

	.SongList_bt>view:nth-of-type(2)>.p {
		float: left;
		line-height: 60px;
	}

	.SongList_bt>view:nth-of-type(2)>.p:nth-of-type(1) {
		font-size: 17px;
		color: black;
		font-weight: bold;
	}

	.SongList_bt>view:nth-of-type(2)>.p:nth-of-type(2) {
		font-size: 12px;
		color: #868485;
		margin-left: 5px;
		font-weight: 300;
	}

	.SongList_bt>view:nth-of-type(3) {
		position: absolute;
		height: 60px;
		width: 20px;
		right: 0px;

	}

	.SongList_bt>view:nth-of-type(3)>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.DailyRecommendation_content_center {
		width: 100%;
		height: calc(100% - 60px);
	}
</style>