<template>
	<scroll-view scroll-y="true" @scrolltolower="scrollToLower" @scrolltoupper="scrollToUpper"
		class="OfficialListDetails">
		<view class="bt">
			<image @click="routerReturn()" src="../../static/Universalimage/返回three.png" mode=""></image>
			<image v-show="bt==1" :src="listObj.coverImgUrl" mode="widthFix"></image>
			<p class="name" v-show="bt===1">{{listObj.name}}</p>
		</view>
		<view class="img">
			<image :src="listObj.coverImgUrl" mode="widthFix"></image>
			<p class="p">{{getCurrentMonthDay()}}更新</p>
		</view>
		<view class="content">
			<view class="DataDetail">
				<view>
					<image src="./img/收藏.png" alt=""></image>
					<p class="p">{{formatFansCount(countObj.bookedCount)}}</p>
				</view>
				<view @click="routerPush('/pages/Review/index',2,Props.id)">
					<image src="./img/评论.png" alt=""></image>
					<p class="p">{{formatFansCount(countObj.commentCount)}}</p>
				</view>
				<view @click="myShare.SharePost(2,Props.id)">
					<image src="./img/链接.png" alt=""></image>
					<p class="p">{{formatFansCount(countObj.shareCount)}}</p>
				</view>
			</view>
			<view class="songList">
				<view class="songList_bt">
					<view>
						<image src="@/static/SongList/播放.png" alt=""></image>
					</view>
					<view>
						<p class="p" @click.stop="myPlayBack.PlayDifference(listArray)">播放全部</p>
						<p class="p">({{listObj.trackCount}})</p>
					</view>
					<view>
						<image src="@/static/SongList/下载.png" alt=""></image>
					</view>
					<view>
						<image src="@/static/SongList/列表.png" alt=""></image>
					</view>
				</view>
				<view class="songList_content" @click="SongClick(listArray)">
					<SongBlockOne
						:message="{name:item.name,index:index,mv:item.mv,ar:item.ar,fee:item.fee,hr:item.hr,sq:item.sq,id:item.id}"
						v-for="(item,index) in listArray" :key="index"></SongBlockOne>
				</view>
			</view>
		</view>
		<Player />
		<MoreDetails v-if="myMore.TF"></MoreDetails>
		<ShareSort v-if="myShare.ShowTF"></ShareSort>

	</scroll-view>
</template>

<script setup>
	import ShareSort from '@/pages/module/ShareSort.vue'
	import MoreDetails from '@/pages/module/MoreDetails.vue';
	import SongBlockOne from '@/pages/module/SongBlockStyle/SongBlockOne.vue';
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive,
		ref
	} from "vue";
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
	const Props = defineProps({
		id: String,
	});

	onMounted(() => {
		getPlaylistDetail(Props.id);
		getPlaylistDetailDynamic(Props.id);
	})
	let listObj = reactive({});
	let listArray = reactive([]);

	function getPlaylistDetail(ids) {
		axios
			.get("/playlist/detail", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				Object.assign(listObj, res.data.playlist);
				listArray.push(...res.data.playlist.tracks);


			})
			.catch((err) => {
				console.error(err);
			});
	}
	let countObj = reactive({});

	function getPlaylistDetailDynamic(ids) {
		axios
			.get("/playlist/detail/dynamic", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				Object.assign(countObj, res.data);

			})
			.catch((err) => {
				console.error(err);
			});
	}


	function getCurrentMonthDay() {
		const currentDate = new Date();
		const month = currentDate.getMonth() + 1;
		const day = currentDate.getDate();
		const monthDay = month.toString().padStart(2, '0') + '月' + day.toString().padStart(2, '0') + '日';
		return monthDay;
	}

	function formatFansCount(fansCount) {
		if (fansCount >= 100000000) {
			return (Math.floor(fansCount / 10000000) / 10).toFixed(1) + ' 亿';
		} else if (fansCount >= 10000) {
			return (Math.floor(fansCount / 1000) / 10).toFixed(1) + ' 万';
		} else {
			return fansCount;
		}
	}

	function routerPush(center, type, event) {
		uni.navigateTo({
			url: center + '?type=' + type + '&id=' + event + '&content=' + encodeURIComponent(JSON.stringify(
				listObj))
		})
	}

	function SongClick(lisArray) {
		myPlayBack.PostAddSongList(listArray)
	}
	let bt = ref(null);

	function scrollToLower() {
		console.log('底部')
		bt.value = 1;
	}

	function scrollToUpper() {
		console.log('离开底部')
		bt.value = null;
	}

	function routerReturn() {
		uni.navigateBack({
			delta: 1
		}); // 返回上一级页面
	}
</script>

<style scoped>
	.OfficialListDetails {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.bt {
		width: 100%;
		height: 60px;
		position: fixed;
		top: 0;
		z-index: 99999;
	}

	.bt>image:nth-of-type(1) {
		width: 20px;
		height: 20px;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.bt>image:nth-of-type(2) {
		width: 100%;
		position: absolute;
		bottom: 0;
		z-index: -1;
	}

	.bt>.name {
		line-height: 60px;
		position: absolute;
		left: 60px;
		font-size: 17px;
		color: white;
	}

	.img {
		width: 100%;
		height: calc(100% / 4);
		overflow: hidden;
		position: relative;
	}

	.img>image {
		width: 100%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.img>.p {
		z-index: 999;
		position: absolute;
		left: 50%;
		bottom: 40px;
		font-size: 14px;
		transform: translateX(-50%);
		color: rgba(255, 255, 255, 0.8);
	}

	.content {
		width: 100%;
		height: calc(100% - 10px);
		position: relative;
	}

	.DataDetail {
		width: 80vw;
		height: 40px;
		background-color: white;
		position: absolute;
		top: -20px;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 20px;
		box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.05),
			-5px 5px 5px 0px rgba(0, 0, 0, 0.05)
	}

	.DataDetail>view {
		float: left;
		width: calc(100% / 3);
		height: 20px;
		margin-top: 10px;
		position: relative;
	}

	.DataDetail>view:nth-of-type(2) {
		box-sizing: border-box;
		border-left: 2px solid #e2e2e2;
		border-right: 2px solid #e2e2e2;
	}

	.DataDetail>view>image {
		height: 20px;
		width: 20px;
		position: absolute;
		left: 20px;
	}

	.DataDetail>view>.p {
		line-height: 20px;
		position: absolute;
		left: 45px;
		font-size: 12px;
		font-weight: bold;
	}

	.songList {
		width: 100%;
		height: calc(100% - 50px);
		position: relative;
		overflow: hidden;
		position: absolute;
		top: 50px;
		/* 		scroll-padding-top: 60px; */
	}

	.songList_bt {
		height: 50px;
		width: 100%;
		background-color: white;
	}

	.songList_content {
		width: calc(100% - 40px);
		padding: 0 20px;
		height: calc(100% - 50px);
		overflow-y: auto;
	}

	.songList_bt>view:nth-of-type(1) {
		width: 25px;
		height: 50px;
		position: absolute;
		left: 20px;
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
		left: 65px;
		height: 50px;
		width: calc(100% - 155px);
	}

	.songList_bt>view:nth-of-type(2)>.p {
		float: left;
		line-height: 50px;
		margin-right: 10px;
	}

	.songList_bt>view:nth-of-type(2)>.p:nth-of-type(1) {
		font-size: 18px;
		font-weight: bold;
	}

	.songList_bt>view:nth-of-type(2)>.p:nth-of-type(2) {
		font-size: 15px;
		color: #868485;
	}

	.songList_bt>view:nth-of-type(3) {
		position: absolute;
		height: 50px;
		width: 50px;
		right: 40px;
	}

	.songList_bt>view:nth-of-type(3)>image {
		position: absolute;
		width: 20px;
		height: 20px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.songList_bt>view:nth-of-type(4)>image {
		position: absolute;
		width: 20px;
		height: 20px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.songList_bt>view:nth-of-type(4) {
		position: absolute;
		height: 50px;
		width: 20px;
		right: 20px;
	}
</style>