<template>
	<view class="VideoPlayback" @click.stop="Click(event)">
		<view class="VideoPlayback_bt">
			<image @click.stop="routerReturn()" src="../../static/Universalimage/返回three.png" mode=""></image>
		</view>
		<video :class="{videoClick:reviewTF}" :src="videoUrl" id="video" @play="onPlay" @pause="onPause"
			:show-progress="false" autoplay="true" :controls="false" @timeupdate="onTimeUpdate" class="video">
		</video>

		<image v-if="VideoPlay==false" src="../../static/SongList/播放.png" mode=""></image>

		<view class="details">
			<view class="name">
				<view class="image">
					<view class="imageData" v-for="(item, index) in data.artists.slice(0,3)" :key="index">
						<image :src="item.img1v1Url" mode="heightFix"></image>
					</view>
				</view>
				<view class="singer">
					<p class="p" @click.stop="routerPushTwo(item.id)" v-for="(item,index) in data.artists.slice(0,3)" :key="index">{{item.name}}<span
							v-if="index<data.artists.length-1">/</span></p>
				</view>
			</view>
			<view class="details_content">
				<view class="name">
					<view class="Mv">
						MV
					</view>
					<p class="p">{{data.name}}</p>
				</view>
				<view class="time">
					<p class="p">{{data.publishTime}}</p>
				</view>
			</view>
			<view class="song">
				<image src="../../static/Universalimage/乐符.png" mode=""></image>
				<view class="song_details">
					<p class="p"><span>{{data.name}}</span>
						<span>&nbsp;-&nbsp;</span>
						<span v-for="(item,index) in data.artists">{{item.name}}<span
								v-if="index<data.artists.length-1">/</span></span>
					</p>
				</view>
			</view>
		</view>

		<view class="input">
			<view class="dz">
				<image src="@/static/Universalimage/点赞.png" mode=""></image>
				<p class="p">{{count.likedCount}}</p>
			</view>
			<view class="pl">
				<image src="../../static/SongList/评论.png" @click.stop="reviewClick()" mode=""></image>
				<p class="p">{{count.commentCount}}</p>
			</view>
			<view class="fx">
				<image src="../../static/SongList/分享.png" mode=""></image>
				<p class="p">{{count.shareCount}}</p>
			</view>
			<view class="sc">
				<image src="../../static/SongList/文件夹.png" mode=""></image>
				<p class="p">收藏</p>
			</view>
			<view class="song">
				<view class="image">
					<image :src="data.cover" mode="heightFix"></image>
				</view>
			</view>
		</view>
		<view class="review" v-if="reviewTF">
			<view class="review_content">
				<image src="@/static/Universalimage/下拉.png" mode=""></image>
				<view class="review_content_bt">
					<p class="p">评论({{count.commentCount}})</p>
					<view class="review_content_sort">
						<p class="p" @click.stop="sortType=1" :class="{sortClick:sortType==1}">推荐</p>
						<p class="p" @click.stop="sortType=2" :class="{sortClick:sortType==2}">最热</p>
						<p class="p" @click.stop="sortType=3" :class="{sortClick:sortType==3}">最新</p>
					</view>
				</view>
				<scroll-view scroll-y="true" class="scroll-view" @scrolltoupper="handleScrollToUpper"
					@scrolltolower="handleScrollToLower">
					<reviewBlock :event='item' v-for="(item,index) in reviewArray" :key="index"></reviewBlock>
				</scroll-view>
			</view>
			<view class="review_bj" @click.stop="reviewClick()">

			</view>
		</view>

		<view class="play" @click.stop="clickjdt($event)">
			<view class="bj">

			</view>
			<view class="schedule" :style="{'width': dynamicWidth + '%'}">
			</view>
		</view>

		<view class="SendBarrage">
			<p class="p">发条有爱评论吧</p>
		</view>

	</view>
</template>

<script setup>
	import reviewBlock from '@/pages/module/reviewBlock.vue'
	import axios from '@/axios.js';
	import {
		ref,
		defineProps,
		onMounted,
		reactive,
		watch
	} from 'vue';
	const Props = defineProps({
		id: String
	})
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js'

	const myPlayBack = useMyPlayBack();
	onMounted(() => {
		console.log('初始化')
		if (myPlayBack.PlayPause == true) {
			myPlayBack.play();
			console.log('成功')
		} else {
			console.log('错误')
		}
		getMvUrl(Props.id);
		getMvDetail(Props.id);
		getMvDetailInfo(Props.id);
	})
	let videoUrl = ref('');
	let dynamicWidth = ref(0);

	function getMvUrl(ids) {
		axios
			.get("/mv/url", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				videoUrl.value = res.data.data.url;
			})
			.catch((err) => {
				console.error(err);
			});
	}
	let data = reactive({});

	function getMvDetail(ids) {
		axios
			.get("/mv/detail", {
				params: {
					mvid: ids
				},
			})
			.then((res) => {
				Object.assign(data, res.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	let count = reactive({});

	function getMvDetailInfo(ids) {
		axios
			.get("/mv/detail/info", {
				params: {
					mvid: ids
				},
			})
			.then((res) => {
				Object.assign(count, res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}


	function clickjdt(event) {
		let resWatch;
		let leftwatch = event.detail.x;
		const query = wx.createSelectorQuery();
		query.select('.play').boundingClientRect(function(rect) {
			resWatch = rect.width;
			const videoContext = uni.createVideoContext('video');
			videoContext.seek((leftwatch / resWatch) * data.duration / 1000); // 将视频跳转到10秒处
			// const lent = (leftwatch - 60) / resWatch;
			// console.log(lent);
			// myPlayBack.UpdatePlaybackProgress(lent);
		}).exec();

	}

	function onTimeUpdate(e) {
		// console.log(data.duration)
		// console.log('当前播放时间：' + e.detail.currentTime);
		dynamicWidth.value = (e.detail.currentTime * 1000) / data.duration * 100;
	}

	let VideoPlay = ref(null);

	function onPlay() {
		VideoPlay.value = true;
	}

	function onPause() {
		VideoPlay.value = false;
	}

	function Click() {
		const videoContext = uni.createVideoContext('video');
		if (VideoPlay.value) {
			videoContext.pause();
		} else {
			videoContext.play();
		}
	}

	function routerReturn() {
		uni.navigateBack({
			delta: 1
		}); // 返回上一级页面
	}

	let reviewTF = ref(false);

	function reviewClick() {
		reviewTF.value = !reviewTF.value;
	}
	let reviewArray = reactive([]);
	watch(() => reviewTF.value, (newValue) => {
		if (newValue) {
			getCommentNew(Props.id, 1, sortType.value, reviewArray.length / 20 + 1, timeData.value);
		} else {
			sortType.value = 1;
			reviewArray.length = 0;
		}
	})
	let sortType = ref(1);
	let timeData = ref(null);

	function getCommentNew(id, type, sortType, pageNo, time) {
		axios
			.get("/comment/new", {
				params: {
					id: id,
					type: type,
					pageSize: 20,
					sortType: sortType,
					pageNo: pageNo,
					cursor: time
				},
			})
			.then((res) => {
				reviewArray.push(...res.data.data.comments)
				if (sortType == 3) {
					timeData.value = res.data.data.comments[res.data.data.comments.length - 1].time;
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function handleScrollToUpper() {
		console.log('头部')
	}

	function handleScrollToLower() {
		console.log('底部');
		getCommentNew(Props.id, 1, sortType.value, reviewArray.length / 20 + 1, timeData.value);
	}
	watch(() => sortType.value, (newValue) => {
		reviewArray.length = 0;
		getCommentNew(Props.id, 1, sortType.value, reviewArray.length / 20 + 1, timeData.value);
	})
	function routerPushTwo(event) {
		wx.navigateTo({
			url: '/pages/Singer/index?id=' + event
		})
	}
</script>

<style scoped>
	.review {
		width: 100%;
		height: 100%;
		/* 		height: calc(100vh - 58.5vw);
		background-color: white; */
		position: absolute;
		bottom: 0;
		/* 		border-top-right-radius: 15px;
		border-top-left-radius: 15px; */
		z-index: 2;
	}

	@keyframes slideInFromBottom {
		0% {
			transform: translateY(100%);
			opacity: 0;
		}

		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.review_content {
		width: 100%;
		height: calc(100vh - 58.5vw);
		background-color: white;
		position: absolute;
		bottom: 0;
		border-top-right-radius: 15px;
		border-top-left-radius: 15px;
		animation: slideInFromBottom 0.3s ease-in-out;
	}

	.scroll-view {
		width: 100%;
		height: calc(100% - 60px);
		position: absolute;
		top: 60px;
	}

	.review_content>image {
		width: 30px;
		height: 20px;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.review_content_bt {
		width: 100%;
		height: 40px;
		position: absolute;
		top: 20px;
	}

	.review_content_bt .p {
		color: #333333;
	}

	.review_content_bt>.p {
		position: absolute;
		top: 50%;
		left: 20px;
		transform: translateY(-50%);
		font-size: 14px;
		font-weight: bold;
	}

	.sortClick {
		color: #333333 !important;
		font-weight: bold !important;
	}

	.review_content_sort {
		width: 150px;
		height: 100%;
		position: absolute;
		right: 0;
	}

	.review_content_sort>.p {
		float: left;
		width: calc(50px);
		line-height: 15px;
		margin-top: 12.5px;
		text-align: center;
		font-size: 14px;
		box-sizing: border-box;
		border-left: 1px solid #f9f9f9;
		color: #969696;
	}

	.review_bj {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		z-index: -1;
	}

	.VideoPlayback {
		width: 100vw;
		height: 100vh;
		background-color: black;
		position: relative;
	}

	.VideoPlayback>image {
		width: 15vw;
		height: 15vw;
		position: absolute;
		left: 50%;
		top: 40%;
		transform: translate(-50%, -50%);
	}

	.VideoPlayback_bt {
		width: 100%;
		height: 60px;
		position: relative;
	}

	.VideoPlayback_bt>image {
		width: 20px;
		height: 20px;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.video {
		width: 100%;
		/* 		height: 54.285vw; */
		position: absolute;
		top: 40%;
		transform: translateY(-50%);
		transition: all 0.3s ease;
	}

	.videoClick {
		position: absolute;
		top: 0 !important;
		transform: none;
	}

	.input {
		width: 15vw;
		height: calc(40vh);
		position: absolute;
		bottom: 70px;
		right: 0;
	}

	.input>view {
		height: calc(20%);
		width: 100%;
		position: relative;
	}

	.input>view>image {
		width: calc(4vh);
		height: 4vh;
		position: absolute;
		top: 0vh;
		left: 50%;
		transform: translateX(-50%);
	}

	.input>view>.p {
		height: calc(3vh);
		width: 100%;
		text-align: center;
		line-height: 3vh;
		color: white;
		font-size: 12px;
		position: absolute;
		top: 4vh;
		font-weight: bold;
	}

	.input>.song {}

	.input>.song>.image {
		width: 3.5vh;
		height: 3.5vh;
		border: 0.75vh solid rgba(255, 255, 255, 0.5);
		position: relative;
		margin-top: 1.5vh;
		margin-left: calc((15vw - 5vh) / 2);
		overflow: hidden;
		border-radius: 50%;
		animation: rotate 10s linear infinite;
	}

	.input>.song>.image>image {
		height: 100%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}


	.details {
		height: 20vh;
		width: 60vw;
		padding-left: 20px;
		position: absolute;
		left: 0;
		bottom: 70px;
	}

	.details>.name {
		width: 100%;
		height: 5vh;
		display: flex;
	}

	.details>.name>.image {
		position: relative;
		float: left;
		flex: 0 0 auto;
	}

	.details>.name>.image>.imageData {
		width: 5vh;
		height: 5vh;
		box-sizing: border-box;
		border: 2px solid white;
		border-radius: 50%;
		overflow: hidden;
		float: left;
		position: relative;
		margin-left: -20px;
	}

	.details>.name>.image>.imageData:nth-of-type(1) {
		margin-left: 0;
	}

	.imageData>image {
		height: 100%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.details>.name>.singer {
		flex: 1;
		box-sizing: border-box;
		padding-left: 10px;
		float: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.details>.name>.singer>.p {
		float: left;
		line-height: 5vh;
		font-size: 14px;
		font-weight: bold;
		color: white;
	}

	.details>.details_content {
		width: 100%;
		height: 10vh;
	}

	.details>.details_content>.name {
		height: 5vh;
		width: 100%;
	}

	.details>.details_content>.name>.Mv {
		float: left;
		height: calc(2.5vh - 10px);
		line-height: calc(2.5vh - 10px);
		color: white;
		margin-top: 1.25vh;
		font-size: 12px;
		padding: 5px;
		font-weight: bold;
		background-color: rgba(255, 255, 255, 0.3);
	}

	.details>.details_content>.name>.p {
		float: left;
		height: 5vh;
		margin: 0;
		line-height: 5vh;
		color: white;
		margin-left: 5px;
		background-color: black;
		width: calc(100% - 50px);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.details>.details_content>.time {
		height: 5vh;
		width: 100%;
		line-height: 5vh;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.8);
	}

	.details>.song {
		width: 100%;
		height: 5vh;
		position: relative;
	}

	.details>.song>image {
		width: 2vh;
		height: 2vh;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.details>.song>.song_details {
		width: calc(70%);
		height: 100%;
		position: absolute;
		left: calc(2vh + 10px);
		white-space: nowrap;
		overflow: hidden;
	}

	.details>.song>.song_details>.p {
		line-height: 5vh;
		color: white;
		animation: scroll 8s linear infinite;
	}

	@keyframes scroll {
		0% {
			transform: translateX(100%);
		}

		100% {
			transform: translateX(-150%);
		}
	}




	.play {
		height: 20px;
		width: 100%;
		position: absolute;
		bottom: 50px;
	}

	.play>.bj {
		width: 100%;
		height: 2px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background-color: rgba(255, 255, 255, 0.3);
	}

	.play>.schedule {
		height: 2px;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		background-color: white;
	}

	.SendBarrage {
		width: calc(100% - 40px);
		padding: 0 20px;
		height: 50px;
		position: absolute;
		bottom: 0;
	}

	.SendBarrage>.p {
		line-height: 50px;
		font-size: 15px;
		color: rgba(255, 255, 255, 0.5);
	}
</style>