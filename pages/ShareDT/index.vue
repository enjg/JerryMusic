<template>
	<view class="ShareDT">
		<view class="ShareDT_bt">
			<image src="../../static/Universalimage/返回.png" @click="routerReturn()"></image>
			<p class="p">分享到云音乐</p>
			<view class="ShareDT_bt_button" @click.stop="ShareResourcePost()">
				<p class="p">分享</p>
			</view>
		</view>
		<textarea class="textarea" cols="20" rows="7" v-model="text" placeholder="用文字写下此刻的心情,会被更多人看到哦"></textarea>
		<view class="content">
			<view class="SongList" v-if="myShare.ShareContentSort==2">
				<image :src="SongListObj.coverImgUrl" mode=""></image>
				<view class="textContent">
					<view class="name">
						<p class="p">{{SongListObj.name}}</p>
					</view>
					<view class="text">
						<p class="p">创建者：{{SongListObj.creator.nickname}}</p>
					</view>
				</view>
			</view>
			<view class="SongList" v-if="myShare.ShareContentSort==1">
				<image :src="songObj.al.picUrl" mode=""></image>
				<view class="textContent">
					<view class="name">
						<p class="p">{{songObj.name}}</p>
					</view>
					<view class="text">
						<p class="p">歌手：<span v-for="(item,index) in songObj.ar" :key="index">{{item.name}}<span
									v-if="index<songObj.ar.length-1">/</span></span></p>
					</view>
				</view>
			</view>
			<view class="SongList" v-if="myShare.ShareContentSort==4">
				<image :src="AlbumObj.picUrl" mode=""></image>
				<view class="textContent">
					<view class="name">
						<p class="p">{{AlbumObj.name}}</p>
					</view>
					<view class="text">
						<p class="p">歌手：<span v-for="(item,index) in AlbumObj.artists" :key="index">{{item.name}}<span
									v-if="index<AlbumObj.artists.length-1">/</span></span></p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import {
		useMyShare
	} from '../../pinia/myShare';
	const myShare = useMyShare();
	import {
		useMyUser
	} from '@/pinia/myUser.js'
	const myUser = useMyUser();
	let listArray = ['', 'song', 'playlist', 'mv', 'album']

	onMounted(() => {
		if (myShare.ShareContentSort == 2) {
			getPlaylistDetail(myShare.id);
		} else if (myShare.ShareContentSort == 1) {
			getSongDetail(myShare.id);
		} else if (myShare.ShareContentSort == 4) {
			getAlbum(myShare.id);
		}
	})
	let SongListObj = reactive({});

	function getPlaylistDetail(ids) {
		axios
			.get("/playlist/detail", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				Object.assign(SongListObj, res.data.playlist);
				console.log(SongListObj)
			})
			.catch((err) => {
				console.error(err);
			});
	}
	let songObj = reactive({});

	function getSongDetail(id) {
		axios
			.get("/song/detail", {
				params: {
					ids: id
				},
			})
			.then((res) => {
				Object.assign(songObj, res.data.songs[0]);
				console.log(res.data.songs[0]);
			})
			.catch((err) => {
				console.error(err);
			});
	}
	let AlbumObj = reactive({});

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
				console.log(res.data.album);
				Object.assign(AlbumObj, res.data.album);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function routerReturn() {
		uni.navigateBack({
			delta: 1
		}); // 返回上一级页面
	}
	let text = ref('');

	function ShareResourcePost() {
		console.log(text.value)
		axios("/share/resource", {
			params: {
				id: myShare.id,
				type: listArray[myShare.ShareContentSort],
				cookie: myUser.cookie,
				msg: text.value
			},
		}).then((res) => {
			console.log(res.data)
		}).catch((err) => {
			console.log(err)
		})
		routerReturn()
	}
</script>

<style scoped>
	.ShareDT {
		width: 100vw;
		height: 100vh;
	}

	.ShareDT_bt {
		width: 100%;
		height: 60px;
		position: relative;
	}

	.ShareDT_bt>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 20px;
	}

	.ShareDT_bt>.p {
		color: #333333;
		line-height: 60px;
		position: absolute;
		left: 60px;
		font-size: 18px;
		font-weight: bold;
	}

	.ShareDT_bt_button {
		height: 30px;
		border-radius: 15px;
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
		background-color: #fe3a3b;
		padding: 0 10px;
	}

	.ShareDT_bt_button>.p {
		color: white;
		line-height: 30px;
		font-size: 15px
	}

	.textarea {
		width: calc(100% - 40px);
		margin-left: 20px;
		height: 30vh;
		caret-color: #cd3d3d;
		color: #333333;
		/* 		background-color: red; */
	}

	.textarea::placeholder {
		color: red !important;
		/* 设置为红色 */
		font-size: 30px !important;
	}

	.content {
		width: calc(100% - 40px);
		height: 60px;
		position: relative;
		border-radius: 5px;
		background-color: #f9f9f9;
		margin-left: 20px;
		/* 				background-color: red; */
	}

	.SongList {
		width: calc(100% - 20px);
		height: 100%;
		position: relative;
		padding: 10px;
	}

	.SongList>image {
		width: 40px;
		height: 40px;
		border-radius: 5px;
		float: left;
	}

	.textContent {
		margin-left: 10px;
		width: calc(100% - 50px);
		height: 100%;
		float: left;
	}

	.name {
		height: 25px;
		width: 100%;
	}

	.name>.p {
		line-height: 25px;
		font-size: 14px;
		color: #323232;
		white-space: nowrap;
		/* 防止文本换行 */
		overflow: hidden;
		/* 隐藏超出容器的文本 */
		text-overflow: ellipsis;
		/* 用省略号代替超出的文本 */
	}


	.text {
		height: 15px;
		width: 100%;
	}

	.text>.p {
		font-size: 12px;
		line-height: 15px;
		color: #959595;
	}
</style>