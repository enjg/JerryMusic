<template>
	<view class="Review">
		<view class="Review_bt">
			<image src="@/static/Universalimage/返回.png" mode=""></image>
			<p class="p">评论</p>
		</view>
		<view class="Review_head">
			<view class="song" v-if="song.name">
				<view class="image">
					<image :src="song.al.picUrl" mode="heightFix"></image>
				</view>
				<view class="name">
					<p class="p">{{song.name}}</p>
					<p class="p intro">{{song.alia[0]}}</p>
					<p class="p">-&nbsp;{{song.ar[0].name}}</p>
				</view>
			</view>
			<view class="album" v-if="albumObj.name">
				<view class="image">
					<image :src="albumObj.picUrl" mode=""></image>
					<view class="bj">
					</view>
				</view>
				<view class="details">
					<p class="p">{{albumObj.name}}</p>
					<p class="p">{{albumObj.artists[0].name}}</p>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" @scrolltoupper="handleScrollToUpper" @scrolltolower="handleScrollToLower"
			class="Review_content">
			<view class="Review_content_head">
				<p class="p">评论区</p>
				<view class="sort">
					<p class="p" @click="sortType=2" :class="{sortClick:sortType==2}">最热</p>
					<p class="p" @click="sortType=3" :class="{sortClick:sortType==3}">最新</p>
				</view>
			</view>
			<reviewBlock :event='item' v-for="(item,index) in commentListArray" :key="index"></reviewBlock>
			<!-- <view class="Review_content_center" v-for="(item,index) in commentListArray" :key="index">
				<view class="image">
					<image @click="routerPush(item.user.userId)" :src="item.user.avatarUrl" mode="heightFix"></image>
				</view>
				<view class="details">
					<view class="name">
						<view class="UserDetails">
							<p class="p">{{item.user.nickname}}</p>
							<p class="p">{{formatTimestampToDateString(item.time)}}</p>
						</view>
						<view class="giveLike">
							<p class="p">{{item.likedCount}}</p>
						</view>
					</view>
					<view class="content">
						<p class="p">{{item.content}}</p>
					</view>

				</view>
			</view> -->
		</scroll-view>

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
		type: String,
		id: String
	});
	let sortType = ref(2);
	let time = ref(null);
	onMounted(() => {
		if (Props.type == 0) {
			getSongDetail(Props.id);
		}
		if (Props.type == 3) {
			getAlbum(Props.id);
		}
		getCommentHot(Props.id, Props.type, 20, 0);
		// 	getCommentNew(Props.id, Props.type, 5, 20, 1, 1698711541721);
	})
	watch(() => sortType.value, (newValue) => {
		time.value = null;
		commentListArray.length = 0;
		if (newValue == 2) {
			getCommentHot(Props.id, Props.type, 20, time.value);
		}
		if (newValue == 3) {
			getCommentNew(Props.id, Props.type, commentListArray.length / 20 + 1, 20, 3, time.value);
		}
	})


	let song = reactive({});

	function getSongDetail(id) {
		axios
			.get("/song/detail", {
				params: {
					ids: id
				},
			})
			.then((res) => {
				Object.assign(song, res.data.songs[0]);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	let albumObj = reactive({});

	function getAlbum(id) {
		axios
			.get("/album", {
				params: {
					id: id
				},
			})
			.then((res) => {
				Object.assign(albumObj, res.data.album);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	let commentListArray = reactive([]);


	function getCommentHot(ids, types, limits, befores) {
		axios
			.get("/comment/hot", {
				params: {
					id: ids,
					type: types,
					limit: limits,
					before: befores
				},
			})
			.then((res) => {
				commentListArray.push(...res.data.hotComments)
				time.value = res.data.hotComments[res.data.hotComments.length - 1].time;
			})
			.catch((err) => {
				console.error(err);
			});
	}



	function getCommentNew(ids, types, pageNos, pageSizes, sortTypes, cursors) {
		axios
			.get("/comment/new", {
				params: {
					id: ids,
					type: types,
					pageNo: pageNos,
					pageSize: pageSizes,
					sortType: sortTypes,
					cursor: cursors
				},
			})
			.then((res) => {
				commentListArray.push(...res.data.data.comments)
				time.value = res.data.data.comments[res.data.data.comments.length - 1].time;
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
		if (sortType.value == 2) {
			getCommentHot(Props.id, Props.type, 20,time.value);
		}
		if (sortType.value == 3) {
			getCommentNew(Props.id, Props.type, commentListArray.length / 20 + 1, 20, 3, time.value);
		}
	}

	function routerPush(event){
		wx.navigateTo({
			url: '/pages/UserDetails/index' + '?id=' + event
		})
	}
	
	function formatTimestampToDateString(timestamp) {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		return year + '-' + month + '-' + day;
	}
</script>

<style scoped>
	.Review {
		width: 100vw;
		height: 100vh;
	}

	.Review_bt {
		height: 60px;
		position: relative;
	}

	.Review_bt>image {
		width: 20px;
		height: 20px;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.Review_bt>.p {
		position: absolute;
		left: 60px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 18px;
	}

	.Review_head {
		width: 100%;
		padding: 10px 0;
		border-bottom: 8px solid #f7f7f7;
	}

	.song {
		height: 40px;
		width: 100%;
		position: relative;
	}

	.song>.image {
		width: 25px;
		height: 25px;
		border: 7.5px solid black;
		border-radius: 50%;
		position: absolute;
		overflow: hidden;
		left: 20px;
	}

	.song>.image>image {
		height: 100%;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.song>.name {
		width: calc(100% - 90px);
		height: 100%;
		position: absolute;
		left: 70px;
		display: flex;
	}

	.song>.name>.p {
		float: left;
		height: 100%;
		line-height: 40px;
		font-size: 14px;
		margin-right: 5px;
	}

	.song>.name>.p:nth-of-type(1) {
		flex: 0 0 auto;
	}

	.song>.name>.p:nth-of-type(3) {
		flex: 0 0 auto;
	}

	.song>.name>.p:nth-of-type(2) {
		display: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}


	.album {
		width: 100%;
		height: 70px;
		position: relative;
	}

	.album>.image {
		width: 70px;
		height: 70px;
		position: absolute;
		left: 20px;
	}

	.album>.image>image {
		width: 100%;
		height: 100%;
		border-radius: 5px;
		z-index: 2;
	}

	.album>.image>.bj {
		width: 80%;
		height: 80%;
		background-color: black;
		border-radius: 50%;
		position: absolute;
		right: -10px;
		top: 50%;
		transform: translateY(-50%);
		z-index: -1;
	}

	.album>.details {
		width: calc(100% - 130px);
		height: calc(100% - 30px);
		padding: 15px 0;
		position: absolute;
		left: 110px;
	}

	.album>.details>.p:nth-of-type(1) {
		line-height: 25px;
		font-size: 17px;
	}

	.album>.details>.p:nth-of-type(2) {
		line-height: 15px;
		font-size: 14px;
		color: #5578a0;
	}


	.Review_content {
		width: 100vw;
		height: 100vh;
	}

	.sortClick {
		color: black !important;
		font-weight: bold !important;
	}

	.Review_content_head {
		height: 40px;
		width: 100%;
		position: relative;
	}

	.Review_content_head>.p {
		line-height: 40px;
		position: absolute;
		left: 20px;
		font-size: 15px;
		font-weight: bold;
	}

	.Review_content_head>.sort {
		width: 100px;
		height: 100%;
		position: absolute;
		right: 0;
	}

	.Review_content_head>.sort>.p {
		float: left;
		width: calc(50%);
		line-height: 15px;
		margin-top: 12.5px;
		text-align: center;
		font-size: 14px;
		box-sizing: border-box;
		border-left: 1px solid #f9f9f9;
		color: #969696;
	}

	.Review_content_head>.sort>.p:nth-of-type(1) {
		border-left: none;
	}

	.Review_content_center {
		width: calc(100% - 40px);
		padding: 0px 20px;
		position: relative;
		content: "";
		display: table;
		clear: both;
		margin-top: 10px;
	}

	.Review_content_center:nth-of-type(2n) {}

	.Review_content_center>.image {
		width: 35px;
		height: 35px;
		background-color: olivedrab;
		border-radius: 50%;
		float: left;
		position: relative;
		overflow: hidden;
	}

	.Review_content_center>.image>image {
		height: 100%;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.Review_content_center>.details {
		width: calc(100% - 50px);
		float: left;
		margin-left: 10px;
		border-bottom: 1px solid #e9e9e9;
		/* 		padding: 10px 0; */
		padding-bottom: 10px;
	}

	.Review_content_center>.details>.name {
		width: 100%;
		height: 35px;
		position: relative;
	}

	.Review_content_center>.details>.name>.UserDetails {
		width: calc(100% - 50px);
		height: 100%;
		position: absolute;
		left: 0;
	}

	.Review_content_center>.details>.name>.UserDetails>.p:nth-of-type(1) {
		line-height: 25px;
		font-size: 14px;
		color: #676566;
		font-weight: bold;
	}

	.Review_content_center>.details>.name>.UserDetails>.p:nth-of-type(2) {
		line-height: 10px;
		font-size: 10px;
		color: #a19fa0;
	}

	.Review_content_center>.details>.name>.giveLike {
		width: 50px;
		height: 100%;
		position: absolute;
		right: 0;
	}

	.Review_content_center>.details>.name>.giveLike>.p {
		font-weight: 300;
		font-size: 12px;
		line-height: 35px;
	}

	.Review_content_center>.details>.content {
		width: 100%;
		margin-top: 10px;
	}

	.Review_content_center>.details>.content>.p {
		font-size: 14px;
		line-height: 25px;
		color: #343440;
	}
</style>