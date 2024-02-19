<template>
	<view class="Album">
		<view class="bt">
			<image src="@/static/Universalimage/返回three.png" alt="" @click="routerReturn()"></image>
			<p class="p">专辑</p>
		</view>
		<view class="img" v-if="albumObj.name">
			<image :src="albumObj.blurPicUrl" alt=""></image>
			<view class="img_content">
				<view>
					<view></view>
					<image mode="heightFix" :src="albumObj.blurPicUrl" alt=""></image>
				</view>
				<view>
					<p class="p">{{albumObj.name}}</p>
					<p class="p">歌手：<span v-for="(item,index) in albumObj.artists" :key="index">{{item.name}}<span
								v-if="index<albumObj.artists.length-1">/</span></span></p>
					<p class="p">发布时间：{{formatTimestampToDateString(albumObj.publishTime)}}</p>
					<p class="p">{{albumObj.description}}</p>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="DataDetail">
				<view>
					<image src="./img/收藏.png" alt=""></image>
					<p class="p">{{formatFansCount(countObj.subCount)}}</p>
				</view>
				<view @click="routerPush('/pages/Review/index',3,Props.id)">
					<image src="./img/评论.png" alt=""></image>
					<p class="p">{{formatFansCount(countObj.commentCount)}}</p>
				</view>
				<view @click="myShare.SharePost(4,Props.id)">
					<image src="./img/链接.png" alt=""></image>
					<p class="p">{{formatFansCount(countObj.shareCount)}}</p>
				</view>
			</view>
			<view class="SongList">
				<view class="SongList_bt">
					<view>
						<image @click.stop="myPlayBack.PlayDifference(listArray)" src="@/static/SongList/播放.png" alt="">
						</image>
					</view>
					<view>
						<p class="p" @click.stop="myPlayBack.PlayDifference(listArray)">播放全部</p>
						<p class="p">({{listArray.length}})</p>
					</view>
					<view>
						<image src="@/static/SongList/列表.png" alt=""></image>
					</view>
				</view>
				<view class="SongList_content" @click="Click(listArray)">
					<SongBlockOne
						:message="{name:item.name,index:index,mv:item.mv,ar:item.ar,fee:item.fee,hr:item.hr,sq:item.sq,id:item.id}"
						v-for="(item,index) in listArray" :key="index"></SongBlockOne>
				</view>
			</view>
		</view>
		<MoreDetails v-if="myMore.TF"></MoreDetails>
		<Player />
		<ShareSort v-if="myShare.ShowTF"></ShareSort>

	</view>
</template>

<script setup>
	import ShareSort from '@/pages/module/ShareSort.vue'

	import MoreDetails from '@/pages/module/MoreDetails.vue';
	import SongBlockOne from '@/pages/module/SongBlockStyle/SongBlockOne.vue';
	import axios from '@/axios.js';
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
	import {
		defineProps,
		onMounted,
		reactive,
		ref
	} from "vue";
	const Props = defineProps({
		id: String,
	});
	onMounted(() => {
		getAlbum(Props.id);
		getAlbumDetailDynamic(Props.id);
	})
	let listArray = reactive([]);
	let albumObj = reactive({});

	function getAlbum(id) {
		let time = Date.now();
		axios
			.get("/album", {
				params: {
					id: id,
					timestamp: time,
				},
			})
			.then((res) => {
				listArray.push(...res.data.songs);
				Object.assign(albumObj, res.data.album);
			})
			.catch((err) => {
				console.error(err);
			});
	}
	let countObj = reactive({});

	function getAlbumDetailDynamic(id) {
		axios
			.get("/album/detail/dynamic", {
				params: {
					id: id
				},
			})
			.then((res) => {
				Object.assign(countObj, res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function formatTimestampToDateString(timestamp) {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1));
		const day = ('0' + date.getDate());
		return year + '.' + month + '.' + day;
	}

	function routerReturn() {
		wx.navigateBack({
			delta: 1, // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
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

	function Click(lisArray) {
		myPlayBack.PostAddSongList(listArray)
	}

	function routerPush(center, type, event) {
		wx.navigateTo({
			url: center + '?type=' + type + '&id=' + event + '&content=' + encodeURIComponent(JSON.stringify(
				albumObj))
		})
	}
</script>

<style scoped>
	.Album {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.bt {
		width: 100%;
		height: 60px;
		position: static;
		top: 0;
		left: 0;
		z-index: 9999999;
	}

	.bt>.p {
		line-height: 60px;
		font-size: 19px;
		color: white;
		position: absolute;
		left: 50px;
	}

	.bt>image {
		height: 20px;
		width: 20px;
		position: absolute;
		left: 20px;
		top: 20px;
	}

	.img {
		width: 200%;
		height: calc(100% / 3);
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		border-bottom-left-radius: 50%;
		border-bottom-right-radius: 50%;
		z-index: -1;
	}

	.img>image {
		width: 100%;
		height: 200%;
		position: absolute;
		top: 0;
		transform: translateY(-50%);
		filter: blur(30px);
	}

	.img_content {
		width: calc(100vw - 40px);
		padding: 0 20px;
		height: calc((100% - 60px) / 1.7);
		position: absolute;
		top: calc(50% + 30px);
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
	}

	.img_content>view:nth-of-type(1) {
		position: relative;
		float: left;
	}

	.img_content image {
		height: 100%;
		border-radius: 15px;
	}

	.img_content>view:nth-of-type(1)>view {
		height: 100%;
		width: 100%;
		position: absolute;
		top: -15%;
		background-color: black;
		border-radius: 50%;
		z-index: -1;
	}

	.img_content>view:nth-of-type(2) {
		flex-grow: 1;
		overflow: hidden;
		position: relative;
	}

	.img_content>view:nth-of-type(2)>.p {
		width: calc(100% - 20px);
		overflow: hidden;
		margin-left: 20px;
		white-space: nowrap;
		/* 防止文本换行 */
		overflow: hidden;
		/* 隐藏超出容器的文本 */
		text-overflow: ellipsis;
		/* 用省略号代替超出的文本 */
	}

	.img_content>view:nth-of-type(2)>.p:nth-of-type(1) {
		line-height: 40px;
		font-weight: bold;
		font-size: 18px;
		color: white;

	}

	.img_content>view:nth-of-type(2)>.p:nth-of-type(2) {
		line-height: 20px;
		color: rgba(255, 255, 255, 0.8);
		font-size: 13px;
		font-weight: bold;
	}

	.img_content>view:nth-of-type(2)>.p:nth-of-type(3) {
		line-height: 20px;
		color: rgba(255, 255, 255, 0.5);
		font-size: 13px;
		font-weight: bold;
		position: absolute;
		bottom: 20px;
	}

	.img_content>view:nth-of-type(2)>.p:nth-of-type(4) {
		line-height: 20px;
		height: 20px;
		color: rgba(255, 255, 255, 0.5);
		font-size: 13px;
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position: absolute;
		bottom: 0;
	}

	.content {
		position: absolute;
		top: calc(100% / 3);
		width: 100%;
		height: calc(100% / 3 * 2);
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
		box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.1),
			-5px 5px 5px 0px rgba(0, 0, 0, 0.1)
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
		font-size: 13px;
		font-weight: bold;
	}

	.SongList {
		width: calc(100% - 40px);
		height: calc(100% - 20px);
		padding: 0 20px;
		position: absolute;
		top: 20px;
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

	.SongList_content {
		width: 100%;
		height: calc(100% - 60px);
		overflow-y: auto;
	}
</style>