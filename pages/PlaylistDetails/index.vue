<template>
	<scroll-view scroll-y="true" @scrolltolower="scrollToLower" @scrolltoupper="scrollToUpper" @scroll="handleScroll"
		class="PlaylistDetails" v-if="listObj.name">
		<view class="bt">
			<image src="@/static/Universalimage/返回three.png" alt="" @click="routerReturn()"></image>
			<p class="p" v-if="listObj.backgroundCoverUrl!=null">官方动态歌单</p>
			<p class="p" v-if="listObj.backgroundCoverUrl==null&&opc<0.5">歌单</p>
			<view class="image" v-show="listObj.backgroundCoverUrl!=null" :style="{opacity:opc}">
				<image mode="widthFix" :src="listObj.backgroundCoverUrl">
				</image>
			</view>
			<view class="bj" v-show="listObj.backgroundCoverUrl==null" :style="{opacity:opc}">
			</view>
			<view class="name" v-show="listObj.backgroundCoverUrl==null&&opc>0.5">
				<p class="p">{{listObj.name}}</p>
			</view>
		</view>
		<view class="content" v-if="listObj.backgroundCoverUrl!=null">
			<image mode="widthFix" :src="listObj.backgroundCoverUrl"
				@click="routerPush(listObj.coverImgUrl,listObj.name,listObj.description)" alt=""></image>
			<view class="center">
				<p class="p">{{extractData(listObj.name)}}</p>
				<p class="p">{{listObj.updateFrequency }}</p>
				<p class="p">{{listObj.description }}</p>
			</view>
			<view class="Button">
				<view class="Button_center" @click.stop="myShare.SharePost(2,Props.id)">
					<p class="p" v-if="countObj.shareCount">{{formatFansCount(countObj.shareCount)}}</p>
					<p class="p" v-else>分享</p>
					<image src="@/static/SongList/分享.png" alt=""></image>
				</view>
				<view class="Button_center" @click="routerPushTwo('/pages/Review/index',2,Props.id,listObj)">
					<p class="p" v-if="countObj.commentCount">{{formatFansCount(countObj.commentCount)}}</p>
					<p class="p" v-else>评论</p>
					<image src="@/static/SongList/评论.png" alt=""></image>
				</view>
				<view class="Button_center">
					<p class="p" v-if="countObj.bookedCount">{{formatFansCount(countObj.bookedCount)}}</p>
					<p class="p" v-else>收藏</p>
					<image src="@/static/SongList/文件夹.png" alt=""></image>
				</view>
			</view>

		</view>
		<view class="contentTwo" v-else>
			<view class="contentTwo_center">
				<view>
					<image mode="widthFix" :src="listObj.coverImgUrl" alt=""></image>
					<view></view>
					<view class="contentTwo_center_details">
						<p class="p">{{listObj.name}}</p>
						<view @click="routerPushThree(listObj.creator.userId)">
							<image mode="widthFix" :src="listObj.creator.avatarUrl" alt=""></image>
							<p class="p">{{listObj.creator.nickname}}</p>
						</view>
					</view>
				</view>
				<view @click="routerPush(listObj.coverImgUrl,listObj.name,listObj.description)">
					<p class="p" v-if="listObj.description">{{listObj.description}}</p>
					<p class="p" v-else>介绍：无</p>
					<p class="p">&nbsp;></p>
				</view>
			</view>
			<view class="Button">
				<view class="Button_center" @click.stop="myShare.SharePost(2,Props.id)">
					<p class="p" v-if="countObj.shareCount">{{formatFansCount(countObj.shareCount)}}</p>
					<p class="p" v-else>分享</p>
					<image src="@/static/SongList/分享.png" alt=""></image>
				</view>
				<view class="Button_center" @click="routerPushTwo('/pages/Review/index',2,Props.id,listObj)">
					<p class="p" v-if="countObj.commentCount">{{formatFansCount(countObj.commentCount)}}</p>
					<p class="p" v-else>评论</p>
					<image src="@/static/SongList/评论.png" alt=""></image>
				</view>
				<view class="Button_center">
					<p class="p" v-if="countObj.bookedCount">{{formatFansCount(countObj.bookedCount)}}</p>
					<p class="p" v-else>收藏</p>
					<image src="@/static/SongList/文件夹.png" alt=""></image>
				</view>
			</view>
		</view>
		<view class="songList" id="item1" v-if="listObj.name">
			<view class="songList_bt">
				<view>
					<image @click.stop="myPlayBack.PlayDifference(listObj.tracks)" src="@/static/SongList/播放.png"
						alt=""></image>
				</view>
				<view>
					<p class="p" @click.stop="myPlayBack.PlayDifference(listObj.tracks)">播放全部</p>
					<p class="p">({{listObj.tracks.length}})</p>
				</view>
				<view>
					<image src="@/static/SongList/下载.png" alt=""></image>
				</view>
				<view>
					<image src="@/static/SongList/列表.png" alt=""></image>
				</view>
			</view>
			<scroll-view :scroll-y="bt" class="songList_content" @click="clickSongList(listObj.tracks)">
				<SongBlockOne
					:message="{name:item.name,index:index,mv:item.mv,ar:item.ar,fee:item.fee,hr:item.hr,sq:item.sq,id:item.id}"
					v-for="(item,index) in listObj.tracks" :key="index"></SongBlockOne>
			</scroll-view>
		</view>
		<Player />
		<MoreDetails v-if="myMore.TF"></MoreDetails>
		<ShareSort v-if="myShare.ShowTF"></ShareSort>
	</scroll-view>
</template>

<script setup>
	import ShareSort from '@/pages/module/ShareSort.vue'
	import SongBlockOne from '@/pages/module/SongBlockStyle/SongBlockOne.vue';
	import MoreDetails from '@/pages/module/MoreDetails.vue';
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive,
		ref,
		getCurrentInstance
	} from "vue";
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js'
	const myPlayBack = useMyPlayBack();
	import {
		useMyShare
	} from '../../pinia/myShare';
	const myShare = useMyShare();
	import {
		useMyMore
	} from '@/pinia/myMore.js'
	const myMore = useMyMore();

	const Props = defineProps({
		id: String,
	});

	onMounted(() => {
		console.log(Props.id);
		getPlaylistDetail(Props.id);
		getPlaylistDetailDynamic(Props.id);
		getWidth()
	})
	let listObj = reactive({});

	function getPlaylistDetail(ids) {
		axios
			.get("/playlist/detail", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				Object.assign(listObj, res.data.playlist);

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

	function formatFansCount(fansCount) {
		if (fansCount >= 100000000) {
			return (Math.floor(fansCount / 10000000) / 10).toFixed(1) + ' 亿';
		} else if (fansCount >= 10000) {
			return (Math.floor(fansCount / 1000) / 10).toFixed(1) + ' 万';
		} else {
			return fansCount;
		}
	}

	function routerReturn() {
		uni.navigateBack({
			delta: 1
		}); // 返回上一级页面
	}

	function extractData(str) {
		const index = str.indexOf('|');
		if (index !== -1) {
			return str.substring(0, index).trim();
		}
		return str.trim();
	}

	function routerPush(img, name, intro) {
		const encodedName = encodeURIComponent(name);
		const encodedIntro = encodeURIComponent(intro);
		const encodedimg = encodeURIComponent(img);
		wx.navigateTo({
			url: `/pages/PlaylistCover/index?name=${encodedName}&img=${encodedimg}&intro=${encodedIntro}`
		});
	}

	function clickSongList(listArray) {
		myPlayBack.PostAddSongList(listArray);
		// myPlayBack.postCurrentSong(index,listArray,song);
	}

	function routerPushTwo(center, type, event, content) {
		let Obj = {
			name: content.name
		}
		uni.navigateTo({
			url: center + '?type=' + type + '&id=' + event + '&content=' + encodeURIComponent(JSON.stringify(
				content))
		})
	}

	let bt = ref(false);

	function scrollToLower() {
		console.log('底部')
		bt.value = true;
	}

	function scrollToUpper() {
		console.log('离开底部')
		bt.value = false;
	}
	const instance = getCurrentInstance();

	let height = ref(null);

	function getWidth() {
		const query = uni.createSelectorQuery().in(instance);
		query
			.select('#item1')
			.boundingClientRect((rect) => {
				if (rect) {
					console.log(rect)
					height.value = rect.height + 60;
					// 	bjWidth.value = rect.width - 20;
				} else {
					getWidth();
				}
			})
			.exec();
	}
	let opc = ref(0);

	function handleScroll(event) {
		opc.value = event.target.scrollTop / (event.target.scrollHeight - height.value);
		console.log(opc.value)
		// const {
		// 	scrollTop,
		// 	scrollHeight,
		// 	scrollWidth
		// } = event.detail;
		// console.log('scrollTop:', scrollTop); // 滚动条在垂直方向已滚动的距离  
		// console.log('scrollHeight:', scrollHeight); // 滚动视图的总高度  
		// console.log('scrollWidth:', scrollWidth); // 滚动视图的总宽度  
		// 可以在这里执行你的逻辑，比如根据滚动位置改变某些元素的样式或显示/隐藏某些内容  
	}

	function routerPushThree(event) {
		wx.navigateTo({
			url: '/pages/UserDetails/index' + '?id=' + event
		})
	}
</script>

<style scoped>
	.mv {
		height: 12px;
		margin: 0 !important;
		color: #bcb682 !important;
		font-size: 8px !important;
		padding: 0 3px;
		line-height: 10px !important;
		box-sizing: border-box;
		border: 1px solid #bcb682;
		margin-right: 5px !important;
	}

	.vip {
		color: #d14a57 !important;
		border: 1px solid #d14a57 !important;
	}

	.PlaylistDetails {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.bt {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		z-index: 99999;
		overflow: hidden;
	}


	.bt>image:nth-of-type(1) {
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
	}

	.bt>.p {
		line-height: 60px;
		font-size: 17px;
		color: white;
		position: absolute;
		left: 60px;
	}

	.bt>.image {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: -1;
		will-change: opacity;
		transition: opacity 0.1s ease;
	}

	.bt>.image>image {
		width: 120%;
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 24%);
	}

	.bt>.bj {
		width: 100%;
		height: 100%;
		background-color: #bcb682;
		z-index: -100;
		position: absolute;
		top: 0;
		will-change: opacity;
		transition: opacity 0.1s ease;
	}

	.bt>.name {
		width: 45vw;
		height: 100%;
		position: absolute;
		left: calc(60px);
		white-space: nowrap;
		overflow: hidden;
		z-index: 9999;
	}

	.bt>.name>.p {
		line-height: 60px;
		color: white;
		font-size: 18px;
		font-weight: bold;
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



	.content {
		width: 100vw;
		height: 100vw;
		position: relative;
		overflow: hidden;
	}

	.content>image {
		width: 120%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	}

	.contentTwo {
		width: 100vw;
		height: 90vw;
		position: relative;
		overflow: hidden;
		background-color: #bcb682;
	}

	.contentTwo_center {
		width: calc(100% - 40px);
		padding: 0 20px;
		height: calc((100vw - 40px)/3 + 30px);
		position: absolute;
		bottom: 150px;
	}

	.contentTwo_center>view:nth-of-type(1) {
		background-color: #bcb682;
		position: absolute;
		bottom: 30px;
		left: 20px;
		width: calc(100% - 40px);
		height: calc((100vw - 40px)/3 - 20px);
	}

	.contentTwo_center>image {
		width: calc((100vw - 40px)/3.5);
		border-radius: 10px;
		position: absolute;
		top: 0;
		left: 20px;
	}

	.contentTwo_center>view:nth-of-type(1)>image {
		width: calc(100% / 3.8);
		position: absolute;
		bottom: 0;
		z-index: 2;
		border-radius: 10px;
	}

	.contentTwo_center>view:nth-of-type(1)>view:nth-of-type(1) {
		width: calc(100% / 4);
		height: 100%;
		position: absolute;
		top: 0;
		border-radius: 15%;
		background-color: rgba(255, 255, 255, 0.3);
	}

	.contentTwo_center_details {
		width: calc(100% - (100% / 3.8) - 20px);
		height: 100%;
		position: absolute;
		right: 0px;
		bottom: 0;
	}

	.contentTwo_center_details>.p {
		line-height: 25px;
		font-weight: bold;
		color: white;
		font-size: 16px;
	}

	.contentTwo_center_details>view:nth-of-type(1) {
		margin-top: 5px;
	}

	.contentTwo_center_details>view>image {
		height: 25px;
		width: 25px;
		border-radius: 50%;
		float: left;
	}

	.contentTwo_center_details>view>.p {
		line-height: 25px;
		float: left;
		margin-left: 10px;
		color: rgba(255, 255, 255, 0.7);
		font-size: 15px;
	}

	.contentTwo_center>view:nth-of-type(2) {
		width: calc(100% - 40px);
		height: 20px;
		position: absolute;
		bottom: 0;
	}

	.contentTwo_center>view:nth-of-type(2)>.p {
		line-height: 20px;
		font-size: 13px;
		color: rgba(255, 255, 255, 0.7);
		float: left;
		overflow: hidden;
		white-space: nowrap;

	}

	.contentTwo_center>view:nth-of-type(2)>.p:nth-of-type(1) {
		height: 50px;
		max-width: calc(100% - 20px);
		display: inline-block;
		overflow: hidden;
		background-image: linear-gradient(to left, transparent, #ffffff, #ffffff, #ffffff);
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
	}

	.contentTwo_center>view:nth-of-type(2)>.p:nth-of-type(2) {
		height: 50px;
		width: 20px;
	}

	.center {
		width: calc(100% - 40px);
		height: 100px;
		position: absolute;
		bottom: 150px;
		padding: 0 20px;
		z-index: 2;
	}

	.center>.p {
		margin: 0;
		text-align: center;
		color: white;
	}

	.center>.p:nth-of-type(1) {
		font-size: 25px;
		font-weight: bold;
		line-height: 40px;
	}

	.center>.p:nth-of-type(2) {
		font-size: 12px;
		line-height: 30px;
	}

	.center>.p:nth-of-type(3) {
		height: 30px;
		line-height: 15px;
		font-size: 12px;
		overflow: hidden;
		color: rgba(255, 255, 255, 0.8);
	}

	.Button {
		height: 80px;
		width: calc(100% - 40px);
		padding: 0 20px;
		position: absolute;
		bottom: 70px;
		z-index: 2;
	}

	.Button_center {
		width: calc((100% - 100px) / 3);
		height: 40px;
		border-radius: 22.5px;
		background-color: rgba(255, 255, 255, 0.25);
		margin-top: 20px;
		padding: 0 10px;
		position: relative;
		float: left;
	}

	.Button_center:nth-of-type(2) {
		margin: 20px 20px;
	}

	.Button_center:nth-of-type(3) {
		background-color: #fd3245;
	}

	.Button_center>image {
		width: 20px;
		height: 20px;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.Button_center>.p {
		position: absolute;
		left: 45px;
		max-width: calc(100% - 45px);
		line-height: 40px;
		text-align: left;
		font-size: 13px;
		color: rgba(255, 255, 255, 0.7);
	}

	.songList {
		width: 100%;
		height: calc(100vh - 60px);
		margin-top: -70px;
		border-radius: 15px;
		position: relative;
		overflow: hidden;
		z-index: 2;
		/* 		scroll-padding-top: 60px; */
	}

	.songList_bt {
		height: 60px;
		width: 100%;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1));
		position: sticky;
		top: 0;
	}

	.songList_content {
		background-color: white;
		width: calc(100% - 40px);
		padding: 0 20px;
		height: calc(100vh - 135px);
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