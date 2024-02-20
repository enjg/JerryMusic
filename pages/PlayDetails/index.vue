<template>
	<view class="PlayDetails" v-if="myPlayBack.CurrentSong.name">
		<image :src="myPlayBack.CurrentSong.al.picUrl" mode="heightFix"></image>
		<view class="PlayDetails_bt">
			<image src="./img/下拉.png" @click="fhClick()" mode=""></image>
			<image src="./img/分享.png" mode=""></image>
			<view class="name" v-if="myPlayBack.SongSort==1">
				<p class="p">{{myPlayBack.CurrentSong.name}}</p>
				<p class="p">
					<span @click.stop="routerPushTwo(item.id)"
						v-for="(item,index) in myPlayBack.CurrentSong.ar">{{item.name}}
						<span v-if="index<myPlayBack.CurrentSong.ar.length-1">/</span>
					</span>
				</p>
			</view>
			<view class="bt" v-if="myPlayBack.SongSort==2">
				<p class="p">私人漫游</p>
				<p class="p">.</p>
				<p class="p">{{myPlayBack.CurrentSong.name}}</p>
			</view>
		</view>

		<view class="SongProgress">
			<p class="p">{{formatTime(myPlayBack.CurrentSong.dt / 1000)}}</p>
			<p class="p">{{formatTime(myPlayBack.SongPlayProgress)}}</p>
			<view class="progress" id="progress" @click="clickjdt($event)">
				<view class="bj">
				</view>
				<span :style="{'left': dynamicWidth + '%'}" class="span"></span>
				<span v-if="myPlayBack.songTime!==myPlayBack.CurrentSong.dt"
					:style="{'left': myPlayBack.songTime/myPlayBack.CurrentSong.dt*100 + '%'}" class="spanTwo"></span>
			</view>
		</view>
		<view class="player">
			<image :src="imgObj[index]" @click="myPlayBack.play()" mode=""></image>
			<image src="./img/上一首.png" @click="myPlayBack.SwitchSongs(0)" mode=""></image>
			<image src="./img/下一首.png" @click="myPlayBack.SwitchSongs(1)" mode=""></image>
			<image src="./img/列表.png" @click="myPlayBack.SongListTF=1" v-if="myPlayBack.SongSort==1" mode=""></image>
			<image v-if="myPlayBack.PlayMode==0 && myPlayBack.SongSort==1" @click="myPlayBack.postPlayMode()"
				src="./img/列表循环.png" mode=""></image>
			<image v-if="myPlayBack.PlayMode==1 && myPlayBack.SongSort==1" @click="myPlayBack.postPlayMode()"
				src="./img/随机播放.png" mode=""></image>
			<image v-if="myPlayBack.PlayMode==2 && myPlayBack.SongSort==1" @click="myPlayBack.postPlayMode()"
				src="./img/单曲循环.png" mode=""></image>
		</view>

		<view class="playpage" v-show="lyricdiscTF==1" @click="lyricdiscTF=0">
			<image :class="{ click :myPlayBack.PlayPause}" src="./img/唱片指针.png"></image>
			<view class="songdisc">
				<view class="songClickTwo">
					<image :class="[myPlayBack.PlayPause ? 'cpt' : 'cpf']" :src="myPlayBack.CurrentSong.al.picUrl"
						mode="">
					</image>
				</view>
			</view>
			<view class="input" v-if="myPlayBack.SongSort==1">
				<image src="./img/爱心.png" mode=""></image>
				<image src="./img/下载.png" mode=""></image>
				<image src="./img/评论.png" @click.stop="routerPush('/pages/Review/index',0,myPlayBack.CurrentSong.id)"
					mode="">
				</image>
				<image src="./img/更多.png" mode=""></image>
			</view>

			<view class="inputTwo" v-if="myPlayBack.SongSort==2">
				<view class="details">
					<view class="name">
						<p class="p">{{myPlayBack.CurrentSong.name}}</p>
					</view>
					<view class="Singer">
						<p class="p" @click.stop="routerPushTwo(item.id)"
							v-for="(item,index) in myPlayBack.CurrentSong.ar" :key="index">
							{{item.name}}<span v-if="index<myPlayBack.CurrentSong.ar.length-1">/</span>
						</p>
					</view>
				</view>

				<image src="./img/爱心.png" mode=""></image>
				<image src="./img/评论.png" @click.stop="routerPush('/pages/Review/index',0,myPlayBack.CurrentSong.id)"
					mode="">
				</image>
			</view>
		</view>
		<view class="playlyrics" v-show="lyricdiscTF==0" @click="lyricdiscTF=1">
			<lyric></lyric>
		</view>
		<SongList v-if="myPlayBack.SongListTF"></SongList>
	</view>
</template>

<script setup>
	import SongList from '@/pages/module/SongList.vue';
	import lyric from './module/lyric.vue'
	import imageOne from './img/播放.png';
	import imageTwo from './img/暂停.png';
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js';
	const myPlayBack = useMyPlayBack();
	import {
		onMounted,
		ref,
		watch,
		defineProps,
		onBeforeMount
	} from 'vue';
	const Props = defineProps({
		sort: String
	})

	let index = ref(1);
	onMounted(() => {
		if (!Props.sort) {
			myPlayBack.SongSort = 2;
		}

		if (!myPlayBack.PlayPause) {
			index.value = 0;
		} else {
			index.value = 1;
		}
	})

	function fhClick() {
		wx.navigateBack({
			delta: 1
		});
	}
	let imgObj = {
		0: imageOne,
		1: imageTwo
	}
	let lyricdiscTF = ref(1);
	watch(() => myPlayBack.PlayPause, (newValue) => {
		if (!newValue) {
			index.value = 0;
		} else {
			index.value = 1;
		}

	})

	function formatTime(seconds) {
		seconds = Math.floor(seconds); // 移除小数部分
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
		const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
		return `${formattedMinutes}:${formattedSeconds}`;
	}
	let progress = ref(null);
	let dynamicWidth = ref(50);

	function clickjdt(event) {
		let resWatch;
		let leftwatch = event.detail.x;
		const query = wx.createSelectorQuery();
		query.select('.progress').boundingClientRect(function(rect) {
			resWatch = rect.width;
			const lent = (leftwatch - 60) / resWatch;
			myPlayBack.UpdatePlaybackProgress(lent);
		}).exec();

	}
	watch(() => myPlayBack.SongPlayProgress, (newValue) => {
		dynamicWidth.value = (newValue / (myPlayBack.CurrentSong.dt / 1000) * 100);
	})

	function routerPush(center, type, event) {
		uni.navigateTo({
			url: center + '?type=' + type + '&id=' + event + '&content='+ encodeURIComponent(JSON.stringify(myPlayBack.CurrentSong))
		})
	}

	function routerPushTwo(event) {
		wx.navigateTo({
			url: '/pages/Singer/index?id=' + event
		})
	}
	watch(() => myPlayBack.id, (newValue) => {
		if (newValue == null) {
			fhClick()
		}
	})
</script>

<style scoped>
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.click {
		transform: rotate(35deg) !important;
		/* 		transform-origin: 18vw -3vw; */
	}


	.PlayDetails {
		width: 100vw;
		height: 100vh;
		position: relative;
		overflow: hidden;
	}

	.PlayDetails>image:nth-of-type(1) {
		z-index: -1;
		height: 150%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		filter: blur(100px) brightness(0.8);
	}


	.PlayDetails_bt {
		height: 60px;
		position: relative;
	}

	.PlayDetails_bt>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.PlayDetails_bt>image:nth-of-type(1) {
		left: 20px;
	}

	.PlayDetails_bt>image:nth-of-type(2) {
		right: 20px;
	}

	.PlayDetails_bt>.name {
		width: 50vw;
		height: 100%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.PlayDetails_bt>.name>.p {
		width: 100%;
		height: 30px;
		white-space: nowrap;
		/* 不换行 */
		overflow: hidden;
		/* 溢出部分隐藏 */
		text-overflow: ellipsis;
		/* 使用省略号代替溢出部分 */
		line-height: 30px;
		text-align: center;
	}

	.PlayDetails_bt>.name>.p:nth-of-type(1) {
		color: white;
		font-size: 18px;
	}

	.PlayDetails_bt>.name>.p:nth-of-type(2) {
		color: rgba(255, 255, 255, 0.6);
		font-size: 15px;
	}

	.PlayDetails_bt>.bt {
		width: 50vw;
		height: 100%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		line-height: 60px;
		font-size: 15px;
		color: rgba(255, 255, 255, 0.5);
	}

	.PlayDetails_bt>.bt>.p {
		height: 100%;
		position: absolute;
	}

	.PlayDetails_bt>.bt>.p:nth-of-type(1) {
		width: calc((100% - 30px) / 2);
		left: 0;
		text-align: right;
	}

	.PlayDetails_bt>.bt>.p:nth-of-type(2) {
		width: 30px;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
	}

	.PlayDetails_bt>.bt>.p:nth-of-type(3) {
		width: calc((100% - 30px) / 2);
		right: 0;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}



	.playpage {
		width: 100%;
		height: calc(100% - 180px);
		position: absolute;
		top: 60px;
	}

	.playpage>image:nth-of-type(1) {
		width: calc((100vh - 180px - (100vh - 180px) * 0.5 - 45vw) + 15vh);
		height: calc((100vh - 180px - (100vh - 180px) * 0.5 - 45vw) + 15vh);
		z-index: 99999;
		transition: all 500ms cubic-bezier(0.42, 0, 0.58, 1);
		transform-origin: 50%, 50%;
		margin-left: calc((100vw - ((100vh - 180px - (100vh - 180px) * 0.5 - 45vw) + 15vh)) / 2);
		margin-top: calc(-7.5vh);
		z-index: 99999999;
	}

	.songdisc {
		width: 75vw;
		height: 75vw;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.4);
		position: absolute;
		top: calc(50% - 45vw);
		left: 50%;
		transform: translateX(-50%);
		z-index: -1;
	}

	.songClickTwo {
		width: 90%;
		height: 90%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1));
	}

	.songClickTwo>image {
		width: 70%;
		height: 70%;
		border-radius: 50%;
		margin: calc(75vw * 0.9 * 0.15 - 5px);
		border: 5px solid black;
		animation: rotate 20s infinite linear;

	}

	.songClickTwo>image.cpt {
		animation-play-state: running;
	}

	.songClickTwo>image.cpf {
		animation-play-state: paused;
	}

	.player {
		height: 80px;
		width: 100%;
		position: absolute;
		bottom: 0px;
		left: 0;
	}

	.player>image:nth-of-type(1) {
		width: 50px;
		height: 50px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

	}

	.player>image:nth-of-type(2) {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		left: calc(100% / 6 * 2);
		transform: translate(-50%, -50%);
	}

	.player>image:nth-of-type(3) {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		right: calc(100% / 6 * 2);
		transform: translate(50%, -50%);
	}

	.player>image:nth-of-type(4) {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		right: calc(100% / 6);
		transform: translate(50%, -50%);
	}

	.player>image:nth-of-type(5) {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		right: calc(100% / 6 * 5);
		transform: translate(50%, -50%);
	}

	.SongProgress {
		width: 100vw;
		height: 40px;
		position: absolute;
		left: 0;
		bottom: 80px;
	}

	.SongProgress>.p {
		width: 50px;
		height: 100%;
		line-height: 40px;
		position: absolute;
		text-align: center;
		font-size: 12px;
		color: white;
	}

	.SongProgress>.p:nth-of-type(1) {
		right: 0;
	}

	.SongProgress>.p:nth-of-type(2) {
		left: 0;
	}

	.progress {
		width: calc(100% - 120px);
		height: 10px;
		position: absolute;
		top: 50%;
		left: 60px;
		transform: translateY(-50%);
	}

	.bj {
		width: 100%;
		height: 1px;
		background-color: rgba(255, 255, 255, 0.5);
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.span {
		height: 10px;
		width: 10px;
		border-radius: 50%;
		background-color: white;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(-50%, -50%);
		  transition: left 0.1s ease, top 0.1s ease;
	}

	.spanTwo {
		height: 4px;
		width: 4px;
		border-radius: 50%;
		background-color: white;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(-50%, -50%);
	}

	.input {
		width: 100%;
		height: 40px;
		position: absolute;
		bottom: 0px;
	}

	.input>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.input>image:nth-of-type(1) {
		left: 20%;
	}

	.input>image:nth-of-type(2) {
		left: 40%;
	}

	.input>image:nth-of-type(3) {
		left: 60%;
	}

	.input>image:nth-of-type(4) {
		left: 80%;
	}

	.inputTwo {
		width: 100%;
		height: 50px;
		position: absolute;
		bottom: 0px;
	}

	.inputTwo>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.inputTwo>image:nth-of-type(2) {
		right: 20px;
	}

	.inputTwo>image:nth-of-type(1) {
		right: 75px;
	}

	.inputTwo>.details {
		width: calc(100% - 170px);
		height: 100%;
		position: absolute;
		left: 20px;
	}

	.inputTwo>.details>.name {
		height: 30px;
		width: 100%;
		line-height: 30px;
		font-size: 18px;
		font-weight: bold;
		overflow: hidden;
		white-space: nowrap;
		color: rgba(255, 255, 255, 0.8);
	}

	.inputTwo>.details>.name>.p {
		animation: scroll 15s linear infinite;
	}

	@keyframes scroll {
		0% {
			transform: translateX(100%);
		}

		100% {
			transform: translateX(-150%);
		}
	}

	.inputTwo>.details>.Singer {
		height: 20px;
		width: 100%;
		line-height: 20px;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.5);
		overflow: hidden;
		white-space: nowrap;
	}

	.inputTwo>.details>.Singer>.p {
		float: left;
	}

	.playlyrics {
		width: 100%;
		height: calc(100% - 180px);
		position: absolute;
		top: 60px;
	}
</style>