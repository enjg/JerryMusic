<template>
	<view class="DigitalAlbumDetails">
		<image v-if="AlbumDetail.code" :src="AlbumDetail.album.blurImgUrl" mode="heightFix"></image>
		<image v-if="AlbumDetail.code && !AlbumDetail.album.blurImgUrl" :src="AlbumDetail.album.coverUrl"
			mode="heightFix"></image>
		<view class="DigitalAlbumDetails_bt">
			<image @click="routerReturn()" src="../../static/Universalimage/返回three.png" mode=""></image>
		</view>
		<scroll-view v-if="AlbumDetail.code" class="scroll-view" scroll-y="true">
			<view class="head">
				<view class="head_content">
					<view class="image">
						<image :src="AlbumDetail.album.coverUrl" mode=""></image>
						<view class="bj">

						</view>
					</view>
					<view class="head_content_name">
						<p class="p">{{AlbumDetail.album.albumName}}</p>
					</view>
					<view class="head_content_singer">
						<p @click="routerPush('/pages/Singer/index',null,AlbumDetail.album.artistId)">
							{{AlbumDetail.album.artistName}}&nbsp;>
						</p>
					</view>
					<view class="head_content_price">
						<p class="p">￥{{AlbumDetail.product.price}}</p>
					</view>
				</view>
				<view class="tag">
					<view class="tag_content" v-for="(item,index) in AlbumDetail.product.tags" :key="index">
						<view class="bj">
							<p class="p">&#10003;</p>
						</view>
						<p class="p">{{item}}</p>
					</view>
				</view>
			</view>

			<view class="content">
				<view class="content_AlbumDetails">
					<view class="content_AlbumDetails_bt">
						<p class="p">专辑详情</p>
					</view>
					<view :style="{ height: myHeight }" class="content_AlbumDetails_center">
						<p class="p" v-for="(item,index) in AlbumDetail.product.descr" :key="index">
							<span v-if="formTimeData(item.resource)">{{item.resource}}</span>
							<span><br></span>
						</p>
					</view>
					<view class="content_AlbumDetails_click">
						<p class="p" @click="myHeight='auto'" v-if="myHeight=='15vh'">全部展开&nbsp;&#9660;</p>
						<p v-else @click="myHeight='15vh'">收起&nbsp;▲</p>
					</view>
					<view class="content_AlbumDetails_video" v-if="AlbumDetail.product.mvPlayUrl">
						<video object-fit="cover" :src="AlbumDetail.product.mvPlayUrl"></video>
					</view>
				</view>
				<view class="content_SongList" v-if="listArray.length">
					<view class="content_SongList_bt">
						<p class="p">歌曲列表<span class="span">(共{{listArray.length}}首)</span></p>
					</view>
					<view class="content_SongList_center" v-for="(item,index) in listArray" :key="index">
						<p class="p">{{index+1}}</p>
						<p class="p">{{item.name}}</p>
					</view>
				</view>
				<view class="content_Review">
					<view class="content_Review_bt">
						<p class="p">精彩评论</p>
					</view>
					<view class="content_Review_center" v-for="(item,index) in AlbumReviewList" :key="index">
						<view class="image">
							<image :src="item.user.avatarUrl" mode="heightFix"></image>
						</view>
						<view class="details">
							<view class="name">
								<p class="p">{{item.user.nickname}}</p>
							</view>
							<view class="time">
								<p class="p">{{item.timeStr}}</p>
							</view>
							<view class="review">
								<p class="p">{{item.content}}</p>
							</view>
							<view class="recover" v-if="item.beReplied.length">
								<p class="p">@{{item.beReplied[0].user.nickname}}:&nbsp;{{item.beReplied[0].content}}
								</p>
							</view>
						</view>
					</view>
				</view>
				<view class="content_Review_click">
					<p class="p" @click="routerPush('/pages/Review/index',3,Props.id)">查看更多精彩评论</p>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		ref,
		defineProps,
		reactive,
		onMounted
	} from 'vue';

	const Props = defineProps({
		id: String
	})
	let myHeight = ref('15vh')
	onMounted(() => {
		getAlbumDetail(Props.id);
		getAlbum(Props.id);
		getCommentAlbum(Props.id);
	})

	let AlbumDetail = reactive({});

	function getAlbumDetail(ids) {
		axios
			.get("/album/detail", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				Object.assign(AlbumDetail, res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}
	// http://116.205.238.28:8090/digitalAlbum/sales?ids=182106250
	// let DigitalAlbumSalse=rea
	let listArray = reactive([]);

	function getAlbum(ids) {
		axios
			.get("/album", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				listArray.push(...res.data.songs);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	let AlbumReviewList = reactive([]);

	function getCommentAlbum(ids) {
		// http://116.205.238.28:8090/comment/album?id=181956474
		axios
			.get("/comment/album", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				AlbumReviewList.push(...res.data.hotComments);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function formTimeData(cever) {
		if (cever !== '<br>' && cever !== '</br>') {
			return true;
		}
	}


	function routerPush(center, type, event) {
		uni.navigateTo({
			url: center + '?type=' + type + '&id=' + event
		})
	}

	function routerReturn() {
		wx.navigateBack({
			delta: 1, // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
		});
	}
</script>

<style scoped>
	.DigitalAlbumDetails {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.DigitalAlbumDetails>image {
		height: 100%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		filter: blur(100px);
	}

	.DigitalAlbumDetails_bt {
		width: 100%;
		height: 60px;
		position: absolute;
		top: 0;
		/* 		background-color: white; */
		background-color: rgba(255, 255, 255, 0.1);
	}

	.DigitalAlbumDetails_bt>image {
		width: 20px;
		height: 20px;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.scroll-view {
		width: 100%;
		height: calc(100% - 60px);
		position: absolute;
		top: 60px;
		left: 0;
	}

	.head {
		width: 100%;
		background-color: rgba(255, 255, 255, 0.1);
		display: inline-block;
	}

	.head>.head_content>.image {
		width: 65vw;
		height: 70vw;
		margin-left: 17.5vw;
		position: relative;
		margin-top: 20px;
	}

	.head>.head_content>.image>image {
		width: 65vw;
		height: 65vw;
		position: absolute;
		bottom: 0;
		border-radius: 5vw;
		z-index: 2;
	}

	.head>.head_content>.image>.bj {
		width: 65vw;
		height: 65vw;
		border-radius: 50%;
		background-color: black;
		position: absolute;
		top: 0;
	}

	.head>.head_content>.head_content_name {
		width: 100%;
		height: 5vh;
		margin-top: 10px;
		text-align: center;
		line-height: 5vh;
		font-size: 40rpx;
		font-weight: bold;
		color: white;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.head>.head_content>.head_content_singer {
		width: 100%;
		height: 5vh;
		text-align: center;
		line-height: 5vh;
		font-size: 25rpx;
		color: rgba(255, 255, 255, 0.8);
	}

	.head>.head_content>.head_content_price {
		width: 100%;
		height: 8vh;
		text-align: center;
		line-height: 8vh;
		font-size: 40rpx;
		font-weight: bold;
		color: #fcbf7e;
	}

	.tag>.tag_content {
		width: calc(50vw - 40px);
		height: 30px;
		padding: 0 20px;
		float: left;

		position: relative;
	}

	.tag>.tag_content>.bj {
		width: 15px;
		height: 15px;
		background-color: red;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
		line-height: 15px;
		text-align: center;
		color: white;
		font-size: 10px;
		background-color: #ffbd64;
		border-radius: 50%;
	}

	.tag>.tag_content>.p {
		line-height: 30px;
		font-size: 13px;
		color: rgba(255, 255, 255, 0.8);
		width: calc(100% - 20px);
		height: 100%;
		position: absolute;
		left: 40px;
		top: 0;
	}

	.content {
		width: 100%;
		display: inline-block;
		margin-top: 15px;
		background-color: rgba(255, 255, 255, 0.1);
	}

	.content_AlbumDetails_bt {
		width: calc(100% - 40px);
		height: 50px;
		padding: 0 20px;
		line-height: 50px;
		font-size: 17px;
		color: white;
	}

	.content_AlbumDetails_center {
		width: calc(100% - 40px);
		padding: 0 20px;
		color: white;
		font-size: 12px;
		overflow: hidden;
	}

	.content_AlbumDetails_click {
		height: 30px;
		width: 100%;
		text-align: center;
		line-height: 30px;
		color: white;
		font-size: 12px;
	}

	.content_AlbumDetails_video {
		width: 100%;
		margin-top: 20px;
	}

	.content_AlbumDetails_video>video {
		width: calc(100vw - 40px);
		border-radius: 10px;
		margin-left: 20px;
	}

	.content_SongList {
		margin-top: 20px;
		width: 100%;
	}

	.content_SongList_bt {
		width: calc(100% - 40px);
		height: 50px;
		padding: 0 20px;
		line-height: 50px;
		font-size: 17px;
		color: white;
	}

	.content_SongList_bt .span {
		font-size: 12px !important;
		color: rgba(255, 255, 255, 0.7);
		margin-left: 5px;
	}

	.content_SongList_center {
		width: calc(100% - 40px);
		height: 50px;
		padding: 0 20px;
		line-height: 50px;
		color: white;
		font-size: 16px;
	}

	.content_SongList_center>.p {
		float: left;
	}

	.content_SongList_center>.p:nth-of-type(1) {
		width: 30px;
		color: rgba(255, 255, 255, 0.7);
	}

	.content_SongList_center>.p:nth-of-type(2) {
		width: calc(100% - 50px);
	}

	.content_Review {
		width: 100%;
		margin-top: 20px;
	}

	.content_Review_bt {
		width: calc(100% - 40px);
		height: 50px;
		padding: 0 20px;
		line-height: 50px;
		font-size: 17px;
		color: white;
	}

	.content_Review_center {
		width: 100%;
		display: inline-block;
		margin-top: 20px;
	}

	.content_Review_center>.image {
		float: left;
		width: 40px;
		height: 40px;
		margin-left: 20px;
		border-radius: 50%;
		overflow: hidden;
		position: relative;
	}

	.content_Review_center>.image>image {
		height: 100%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.content_Review_center>.details {
		float: left;
		width: calc(100% - 90px);
		color: white;
		margin-left: 10px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.5);
		padding: 0 20px 20px 0;
	}

	.content_Review_center>.details>.name {
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.8);
	}

	.content_Review_center>.details>.time {
		height: 20px;
		line-height: 20px;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.5);
	}

	.content_Review_center>.details>.review {
		line-height: 30px;
		font-size: 16px;
	}

	.content_Review_center>.details>.recover {
		width: calc(100% - 20px);
		padding: 10px;
		background-color: rgba(255, 255, 255, 0.2);
		border-radius: 10px;
		font-size: 14px;
		line-height: 25px;
		color: rgba(255, 255, 255, 0.8);
		margin-top: 20px;
	}

	.content_Review_click {
		text-align: center;
		height: 35px;
		line-height: 35px;
		color: rgba(255, 255, 255, 0.7);
		font-size: 13px;
	}
</style>