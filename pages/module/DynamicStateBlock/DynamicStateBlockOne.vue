<template>
	<view class="DynamicStateBlockOne">
		<view class="image">
			<image :src="Props.message.user.avatarUrl" mode=""></image>
		</view>
		<view class="text">
			<view class="name">
				<p class="p">{{Props.message.user.nickname}}</p>
			</view>
			<view class="time">
				<p class="p">{{formatTimestampToDateString(Props.message.showTime)}}</p>
			</view>
			<view class="msg" v-if="EventObj.msg">
				<p class="p">{{EventObj.msg}}</p>
			</view>
			<view class="img" v-if="Props.message.pics.length">
				<view class="img_center" :class="{  
							imgCenterSix:Props.message.pics.length==8,
							imgCenterFive:Props.message.pics.length==7,
					          imgCenterFour: Props.message.pics.length === 5,  
					          imgCenterThree: Props.message.pics.length === 2 || Props.message.pics.length === 4,  
					          imgCenterTwo: Props.message.pics.length === 1,  
					          imgCenterOne: Props.message.pics.length % 3 === 0  
					        }" v-for="(item,index) in Props.message.pics" :key="index">
					<image :src="item.originUrl" @click="imgClick(item.originUrl)"
						:class="[imgMode(item.height,item.width)=='heightFix'?'imgHeight':'imgWidth']"
						:mode="imgMode(item.height,item.width)"></image>
				</view>
			</view>
			<view class="Album content" @click="routerPush('/pages/Album/index',EventObj.album.id)"
				v-if="EventObj.album">
				<view class="image">
					<view class="bjOne">
					</view>
					<view class="bjTwo">
					</view>
					<view class="bjThree">
					</view>
					<image :src="EventObj.album.picUrl" mode=""></image>
				</view>
				<view class="center">
					<view class="name">
						<p class="p">{{EventObj.album.name}}</p>
					</view>
					<view class="singer">
						<p class="p"><span v-for="(item,index) in EventObj.album.artists"
								:key="index">{{item.name}}<span
									v-if="index<EventObj.album.artists.length-1">/</span></span></p>
					</view>
				</view>
			</view>
			<view class="Playlist content" @click="routerPush('/pages/PlaylistDetails/index',EventObj.playlist.id)"
				v-if="EventObj.playlist">
				<image :src="EventObj.playlist.coverImgUrl" mode=""></image>
				<view class="center">
					<view class="name">
						<p class="p">歌单</p>
						<p class="p">{{EventObj.playlist.name}}</p>
					</view>
					<view class="singer">
						<p class="p">by {{EventObj.playlist.creator.nickname}}</p>
					</view>
				</view>
			</view>
			<view class="Mv" @click="routerPush('/pages/VideoPlayback/index',EventObj.mv.id)" v-if="EventObj.mv">
				<view class="name">
					<p class="p">MV</p>
					<p class="p">{{EventObj.mv.name}}</p>
				</view>
				<view class="singer">
					<p class="p"><span v-for="(item,index) in EventObj.mv.artists">{{item.name}}<span
								v-if="index<EventObj.mv.artists.length-1">/</span></span></p>
				</view>
				<image :src="EventObj.mv.imgurl16v9" mode="widthFix"></image>
				<image src="../../../static/SongList/播放.png" mode=""></image>
				<view class="playCount">
					<image src="../SongListBlock/img/播放.png" mode=""></image>
					<p class="p">{{number(EventObj.mv.playCount)}}</p>
				</view>
				<view class="duration">
					<p class="p">{{formatMillisecondsToMinutesSeconds(EventObj.mv.duration)}}</p>
				</view>
			</view>
			<view class="Song" @click="SongClick()" :style="RgbStyle" v-if="EventObj.song">
				<image :src="EventObj.song.album.picUrl" mode=""></image>
				<view class="text">
					<view class="name">
						<p class="p">{{EventObj.song.name}}</p>
					</view>
					<view class="singer">
						<p class="p"><span v-for="(item,index) in EventObj.song.artists">{{item.name}}<span
									v-if="index<EventObj.song.artists.length-1">/</span></span></p>
					</view>
				</view>
				<image @click.stop="SongPlay()"
					v-if="(myPlayBack.id!==EventObj.song.id)||(myPlayBack.id==EventObj.song.id&&!myPlayBack.PlayPause)"
					src="../../../static/SongList/播放.png" mode=""></image>
				<view @click.stop="SongPlay()" v-if="myPlayBack.id==EventObj.song.id&&myPlayBack.PlayPause"
					class="load">
					<view class="loadCenterOne loadCenter">

					</view>
					<view class="loadCenterTwo loadCenter">

					</view>
					<view class="loadCenterThree loadCenter">

					</view>
				</view>
			</view>

			<view class="input">
				<view class="inputContent">
					<image src="./img/分享.png" mode=""></image>
					<p class="p" v-if="Props.message.info.shareCount">{{Props.message.info.shareCount}}</p>
					<p class="p" v-else>分享</p>

				</view>
				<view class="inputContent">
					<image src="./img/评论.png" mode=""></image>
					<p class="p" v-if="Props.message.info.commentCount">{{Props.message.info.commentCount}}</p>
					<p class="p" v-else>评论</p>
				</view>
				<view class="inputContent">
					<image src="./img/点赞.png" mode=""></image>
					<p class="p" v-if="Props.message.info.likedCount">{{Props.message.info.likedCount}}</p>
					<p class="p" v-else>点赞</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineProps,
		onMounted,
		reactive,
		h
	} from 'vue';
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js';
	const myPlayBack = useMyPlayBack();
	import {
		useMyImgReveal
	} from '@/pinia/myImgReveal.js'
	const myImgReveal = useMyImgReveal();
	const Props = defineProps({
		message: Object
	})
	onMounted(() => {
		console.log(Props.message)
		JsonStringObj(Props.message.json)
	})
	let EventObj = reactive({});

	function JsonStringObj(event) {
		// console.log(event);
		Object.assign(EventObj, JSON.parse(event))
		console.log(EventObj)
	}

	function formatTimestampToDateString(timestamp) {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		return year + '-' + month + '-' + day;
	}

	function number(event) {
		if (event > 100000) {
			return Math.floor(event / 10000) + '万';
		} else {
			return event;
		}
	}

	function formatMillisecondsToMinutesSeconds(milliseconds) {
		// 将毫秒转换为秒  
		const seconds = Math.floor(milliseconds / 1000);

		// 获取分钟和剩余的秒数  
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;

		// 格式化为两位数的分钟和秒  
		const formattedMinutes = minutes.toString().padStart(2, '0');
		const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

		// 返回格式化的分钟:秒字符串  
		return `${formattedMinutes}:${formattedSeconds}`;
	}

	function routerPush(event, id) {
		uni.navigateTo({
			url: `${event}?id=${id}`
		})
	}
	let RgbStyle = ref('');
	onMounted(() => {
		if (Props.message.pics.length) {
			console.log(Props.message.pics[0].originUrl);
		}
		let rgb = getRandomRgbColor();
		RgbStyle.value = `background: linear-gradient(to right, rgba(${rgb},1),rgba(${rgb},0.5));`
	})

	function getRandomRgbColor() {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		return r + ', ' + g + ', ' + b;
	}

	function SongClick() {
		if (myPlayBack.id !== EventObj.song.id) {
			myPlayBack.SongListAdd(EventObj.song);
		} else {
			uni.redirectTo({
				url: "/pages/PlayDetails/index?sort=1"
			})
		}
	}

	function SongPlay() {
		if (myPlayBack.id == EventObj.song.id) {
			myPlayBack.play();
		} else {
			SongClick();
		}
	}

	function imgMode(height, width) {
		console.log(height, width);
		if (height > width) {
			return 'widthFix'
		} else {
			return 'heightFix'
		}
	}

	function imgClick(event) {
		const listArray = [];
		for (let i = 0; i < Props.message.pics.length; i++) {
			listArray.push(Props.message.pics[i].originUrl)
		}
		myImgReveal.postImg(event, listArray);
	}
	// onMounted(() => {

	// })
</script>

<style scoped>
	.DynamicStateBlockOne {
		width: 100vh;
		padding: 10px 0;
		position: relative;
		border-bottom: 1px solid #e0e1e3;
		display: inline-block;
	}

	.DynamicStateBlockOne>.image {
		/* 		position: relative; */
		width: 40px;
		float: left;
		margin-left: 20px;
	}

	.DynamicStateBlockOne>.image>image {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.text {
		width: calc(100vw - 110px);
		/* 		position: relative;
		left: 70px;
		top: 0; */
		float: left;
		margin-left: 10px;
	}

	.text>.name {
		height: 25px;
		width: 100%;
		line-height: 25px;
		color: #313332;
		font-weight: bold;
		font-size: 15px
	}

	.time {
		width: 100%;
		height: 15px;
		line-height: 15px;
		margin-bottom: 10px;
		color: #949597;
		font-size: 12px;
		font-weight: 300;
	}

	.msg {
		min-height: 30px;
		width: 100%;
		line-height: 30px;
		font-size: 15px;
		color: #313332;
	}

	.img {
		max-width: calc(100vw - 110px);
		max-height: calc(100vw - 110px);
		display: inline-block;
		border-radius: 3vw;
		overflow: hidden;
	}

	.img_center {
		width: calc((100vw - 110px) / 3);
		height: calc((100vw - 110px) / 3);
		float: left;
		position: relative;
		overflow: hidden;
		border: 1px solid white;
	}

	.imgCenterOne {
		width: calc((100vw - 110px) / 3 - 2px);
		height: calc((100vw - 110px) / 3 - 2px);
	}

	.imgCenterTwo {
		width: calc((100vw - 110px) * 0.6);
		height: calc(100vw - 110px);
		/* 		background-color: wheat; */
	}

	.imgCenterThree {
		width: calc((100vw - 110px) / 2 - 2px);
		height: calc((100vw - 110px) / 2 - 2px);
	}

	.imgCenterFour {
		width: calc((100vw - 110px) / 3 - 2px);
		height: calc((100vw - 110px) / 3 - 2px);
	}

	.imgCenterFour:nth-of-type(1),
	.imgCenterFour:nth-of-type(2) {
		width: calc((100vw - 110px) / 2 - 2px) !important;
		height: calc((100vw - 110px) / 2 - 2px) !important;
	}

	.imgCenterFive {
		width: calc((100vw - 110px) / 4 - 2px);
		height: calc((100vw - 110px) / 4 - 2px);
	}

	.imgCenterFive:nth-of-type(1),
	.imgCenterFive:nth-of-type(2),
	.imgCenterFive:nth-of-type(3) {
		width: calc((100vw - 110px) / 3 - 2px) !important;
		height: calc((100vw - 110px) / 3 - 2px) !important;
	}

	.imgCenterSix {
		width: calc((100vw - 110px) / 4 - 2px);
		height: calc((100vw - 110px) / 4 - 2px);
	}

	.imgHeight {
		max-height: 100%;
	}

	.imgWidth {
		max-width: 100%;
	}

	.img_center>image {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.content {
		width: 100%;
		height: 50px;
		padding: 7.5px;
		box-sizing: border-box;
		background-color: #ecedf1;
		border-radius: 5px;
		position: relative;
	}

	.Album>.image {
		height: 35px;
		width: 45px;
		position: relative;
		float: left;
	}

	.Album>.image>.bjOne {
		width: 35px;
		height: 100%;
		background-color: black;
		border-radius: 50%;
		position: absolute;
		right: 0;
	}

	.Album>.image>.bjTwo {
		width: calc(30px);
		height: calc(30px);
		position: absolute;
		right: 5px;
		top: 50%;
		transform: translateY(-50%);
		border: 1px solid rgba(0, 0, 0, 0.2);
		z-index: 2;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.Album>.image>.bjThree {
		width: 15%;
		height: calc(100% * 0.15);
		background-color: black;
		position: absolute;
		border-radius: 50%;
		right: 4%;
		top: 50%;
		transform: translateY(-50%);
		z-index: 3;
	}

	.Album>.image>image {
		width: 35px;
		height: 100%;
		position: absolute;
		left: 0;
		z-index: 4;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}

	.Album>.center {
		width: calc(100% - 50px);
		float: left;
		margin-left: 5px;
	}

	.Album>.center>.name {
		width: 100%;
		height: 20px;
	}

	.Album>.center>.name>.p {
		width: 100%;
		height: 20px;
		line-height: 20px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #2f2f31 !important;
		font-size: 14px;
	}

	.Album>.center>.singer {
		height: 15px;
		width: 100%;
	}

	.Album>.center>.singer>.p {
		width: 100%;
		height: 15px;
		line-height: 15px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #767779;
		font-size: 11px;
		font-weight: 300;
	}

	.Playlist>image {
		width: 35px;
		height: 35px;
		border-radius: 5px;
		float: left;
	}

	.Playlist>.center {
		width: calc(100% - 40px);
		float: left;
		margin-left: 5px;
	}

	.Playlist>.center>.name {
		width: 100%;
		height: 20px;
	}

	.Playlist>.center>.name>.p:nth-of-type(1) {
		border: 1px solid #f49899;
		border-radius: 2px;
		font-size: 9px;
		font-weight: 300;
		color: #fe4243;
		height: 12px;
		width: 28px;
		text-align: center;
		float: left;
		box-sizing: border-box;
		line-height: 12px;
		display: block;
		margin-top: 4px;
	}

	.Playlist>.center>.name>.p:nth-of-type(2) {
		width: calc(100% - 37px);
		height: 20px;
		margin-left: 5px;
		line-height: 20px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #2f2f31 !important;
		font-size: 14px;
		float: left;
	}

	.Playlist>.center>.singer {
		height: 15px;
		width: 100%;
	}

	.Playlist>.center>.singer>.p {
		width: 100%;
		height: 15px;
		line-height: 15px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #767779;
		font-size: 11px;
		font-weight: 300;
	}

	.Mv {
		width: 100%;
		position: relative;
		display: inline-block;
	}

	.Mv>image:nth-of-type(1) {
		width: 100%;
		border-radius: 10px;
	}

	.Mv>.name {
		width: 100%;
		height: 20px;
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		padding: 0 5px;
	}

	.Mv>.name>.p:nth-of-type(1) {
		float: left;
		display: inline-block;
		border: 1px solid white;
		border-radius: 2px;
		font-size: 10px;
		font-weight: 300;
		width: calc(30px);
		text-align: center;
		height: 15px;
		line-height: 15px;
		margin-top: 2.5px;
		box-sizing: border-box;
		color: white;
	}

	.Mv>.name>.p:nth-of-type(2) {
		float: left;
		line-height: 20px;
		width: calc(100% - 35px);
		margin-left: 5px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: white;
		font-size: 15px;
	}

	.Mv>.singer {
		width: 100%;
		height: 15px;
		padding: 0 5px;
		position: absolute;
		top: 20px;
		left: 0;
	}

	.Mv>.singer>.p {
		line-height: 15px;
		color: white;
		font-size: 11px;
		font-weight: 300;
		height: 100%;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.Mv>image:nth-of-type(2) {
		width: 10vw;
		height: 10vw;
		position: absolute;
		top: 50%;
		left: 50%;
		opacity: 0.8;
		transform: translate(-50%, -50%);
	}

	.Mv>.playCount {
		width: calc(40px);
		height: 15px;
		position: absolute;
		bottom: 15px;
		left: 5px;
	}

	.Mv>.playCount>image {
		width: 10px;
		height: 10px;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.Mv>.playCount>.p {
		color: white;
		font-size: 11px;
		position: absolute;
		right: 0;
		line-height: 15px;
	}

	.Mv>.duration {
		height: 15px;
		position: absolute;
		right: 5px;
		bottom: 15px;
	}

	.Mv>.duration>.p {
		font-size: 11px;
		color: white;
		line-height: 15px;
	}

	.Song {
		width: 100%;
		height: 60px;
		border-radius: 5px;
		overflow: hidden;
		position: relative;
	}

	.Song>image:nth-of-type(1) {
		position: absolute;
		left: 0;
		width: 60px;
		height: 60px;
	}

	.Song>.text {
		width: calc(100% - 120px);
		height: 100%;
		position: absolute;
		left: 60px;
		box-sizing: border-box;
		padding: 10px;
	}

	.Song>.text>.name {
		height: 25px;
		width: 100%;
	}

	.Song>.text>.name>.p {
		color: white;
		font-size: 14px;
		width: 100%;
		height: 100%;
		line-height: 20px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.Song>.text>.singer {
		width: 100%;
		height: 15px;
	}

	.Song>.text>.singer>.p {
		color: rgba(255, 255, 255, 0.5);
		font-size: 11px;
		width: 100%;
		height: 100%;
		line-height: 15px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-weight: 300;
	}

	.Song>image:nth-of-type(2) {
		width: 15px;
		height: 15px;
		position: absolute;
		right: 22.5px;
		top: 50%;
		transform: translateY(-50%);
	}

	.Song>.load {
		width: 15px;
		height: 15px;
		position: absolute;
		right: 22.5px;
		top: 50%;
		transform: translateY(-50%);
	}

	.Song>.load>.loadCenter {
		width: calc((100% - 4px) /3);
		height: 100%;
		border-radius: 5px;
		background-color: rgba(255, 255, 255, 0.8);
		float: left;
	}

	.Song>.load>.loadCenter:nth-of-type(2) {
		margin: 0 2px;
	}

	.Song>.load>.loadCenterOne {
		animation: shrinkAndGrow 1s ease-in-out infinite forwards 0s;
	}

	.Song>.load>.loadCenterTwo {
		animation: shrinkAndGrow 1s ease-in-out infinite forwards 0.25s;
	}

	.Song>.load>.loadCenterThree {
		animation: shrinkAndGrow 1s ease-in-out infinite forwards 0.5s;
	}

	@keyframes shrinkAndGrow {
		0% {
			transform: scaleY(1);
			transform-origin: bottom;
			/* 动画开始时，高度为原始高度 */
		}

		50% {
			transform: scaleY(0);
			transform-origin: bottom;
			/* 动画中间点，高度缩小到原始高度的10% */
		}

		100% {
			transform: scaleY(1);
			transform-origin: bottom;
			/* 动画结束时，高度恢复到原始高度 */
		}
	}

	.input {
		width: 100%;
		height: 30px;
	}

	.inputContent {
		width: calc(33%);
		height: 100%;
		float: left;
		position: relative;
	}

	.inputContent>image {
		width: 20px;
		height: 20px;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.inputContent>.p {
		width: calc(100% - 25px);
		position: absolute;
		left: 25px;
		line-height: 30px;
		font-size: 11px;
		font-weight: 300;
		color: #949597;
	}
</style>