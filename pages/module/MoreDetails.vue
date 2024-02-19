<template>
	<view class="MoreDetails" v-if="myMore.TF!==false">
		<view class="bj" @click="Click()" v-if="MoreDetailsTF">
		</view>
		<view class="MoreDetails_content" v-if="MoreDetails.name"
			:class="{'MoreDetailsTF': !MoreDetailsTF, 'MoreDetailsTFTwo': MoreDetailsTF}">
			<view class="image">
				<image :src="MoreDetails.al.picUrl" mode=""></image>
				<view class="details">
					<view class="name">
						<p class="p">歌曲：{{MoreDetails.name}}</p>
					</view>
					<view class="singer">
						<p class="p"><span v-for="(item,index) in MoreDetails.ar" :key="index">
								{{item.name}}</span><span v-if="index < MoreDetails.ar.length-1">/</span></p>
					</view>
				</view>

			</view>
			<view class="intro">
				<p class="p">少年没有乌托邦，心向远方自明朗</p>
			</view>
			<view class="center" :class="{centerClick:centerClick==0}" @click="NextSong()">
				<view class="center_image">
					<image src="@/static/Universalimage/播放5.png" mode=""></image>
				</view>
				<p class="p">下一首播放</p>
			</view>
			<view class="center" :class="{centerClick:centerClick==1}" @click="Review()">
				<view class="center_image">
					<image src="../Album/img/评论.png" mode=""></image>
				</view>
				<p class="p">评论</p>
			</view>
			<view class="center" :class="{centerClick:centerClick==2}" @click="Singer()">
				<view class="center_image">
					<image src="../../static/Universalimage/歌手.png" mode=""></image>
				</view>
				<p class="p">歌手：
					<span v-for="(item,index) in MoreDetails.ar" :key="index">
						{{item.name}}</span>
					<span v-if="index < MoreDetails.ar.length-1">/</span>
				</p>
			</view>
			<view class="center" :class="{centerClick:centerClick==3}" @click="Album()">
				<view class="center_image">
					<image src="../../static/Universalimage/专辑.png" mode=""></image>
				</view>
				<p class="p">专辑：{{MoreDetails.al.name}}</p>
			</view>
			<view class="center" v-if="MoreDetails.mv!==0" :class="{centerClick:centerClick==4}"
				@click="Mv(MoreDetails.mv)">
				<view class="center_image">
					<image src="../OfficialListDetails/img/收藏.png" mode=""></image>
				</view>
				<p class="p">相关视频</p>
			</view>
			<view class="center" :class="{centerClick:centerClick==5}" @click="Share()">
				<view class="center_image">
					<image src="../Album/img/链接.png" mode=""></image>
				</view>
				<p class="p">分享</p>
			</view>
		</view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';

	import {
		ref,
		defineProps,
		watch,
		reactive,
		onBeforeUnmount,
		onMounted
	} from 'vue';
	import {
		useMyMore
	} from '@/pinia/myMore.js'
	const myMore = useMyMore();
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js';
	const myPlayBack = useMyPlayBack();
	import {
		useMyShare
	} from '../../pinia/myShare';
	const myShare = useMyShare();
	onMounted(() => {
		getSongDetail(myMore.id);
	})
	onBeforeUnmount(() => {
		console.log('销毁');
		myMore.TF = false;
		myMore.id = null;
	})
	let MoreDetailsTF = ref(true);

	function Click() {
		MoreDetailsTF.value = false;
		setTimeout(function() {
			myMore.TF = false;
			myMore.id = null;
			console.log('退出')
		}, 300)
	}

	let MoreDetails = reactive({});

	function getSongDetail(id) {
		console.log(id)
		axios
			.get("/song/detail", {
				params: {
					ids: id
				},
			})
			.then((res) => {
				Object.assign(MoreDetails, res.data.songs[0]);
				console.log(MoreDetails);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	let centerClick = ref(null);

	function NextSong() {
		centerClick.value = 0;
		myPlayBack.SongListAddSong(MoreDetails);
		myMore.TF = false;
	}

	function Review() {
		centerClick.value = 1;		
		uni.navigateTo({
			url: '/pages/Review/index' + '?type=' + 0 + '&id=' + myMore.id + '&content=' + encodeURIComponent(JSON.stringify(MoreDetails))
		})
		myMore.TF = false;
	}

	function Singer() {
		centerClick.value = 2;
		uni.navigateTo({
			url: '/pages/Singer/index' + '?id=' + MoreDetails.ar[0].id
		});
		myMore.TF = false;
	}

	function Album() {
		centerClick.value = 3;
		uni.navigateTo({
			url: `/pages/Album/index?id=${MoreDetails.al.id}`
		});
		myMore.TF = false;
	}

	function Mv(event) {
		centerClick.value = 4;
		wx.navigateTo({
			url: '/pages/VideoPlayback/index' + '?id=' + event
		})
		myMore.TF = false;
	}

	function Share() {
		console.log(1111111)
		centerClick.value = 5;
		myShare.SharePost(1, myMore.id)
		myMore.TF = false;
	}
</script>

<style scoped>
	.MoreDetails {
		width: 100vw;
		height: 100vh;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99999;
	}

	.bj {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: -1;
	}

	.MoreDetails_content {
		width: 100%;
		height: 70vh;
		position: absolute;
		bottom: 0;
		background-color: white;
		border-top-left-radius: 2.5vh;
		border-top-right-radius: 2.5vh;
	}

	.MoreDetailsTF {
		animation: slideFromLeft 0.3s forwards;
	}

	.MoreDetailsTFTwo {
		animation: slideFromLeftTwo 0.3s forwards;
	}

	@keyframes slideFromLeft {
		from {
			transform: translateY(0);
		}

		to {
			transform: translateY(100%);
		}
	}

	@keyframes slideFromLeftTwo {
		from {
			transform: translateY(100%);
		}

		to {
			transform: translateY(0);
		}
	}

	.image {
		width: calc(100% - 40px);
		height: 50px;
		padding: 0 20px;
		margin-top: 20px;
		position: relative;
	}

	.image>image {
		float: left;
		width: 50px;
		height: 50px;
		border-radius: 5px;
	}

	.image>.details {
		width: calc(100% - 60px);
		height: 100%;
		float: left;
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.image>.details>.name {
		max-height: 40px;
		width: 100%;
	}

	.image>.details>.name>.p {
		width: 100%;
		height: 100%;
		line-height: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #313131;
		font-size: 15px;
	}

	.image>.details>.singer {
		width: 100%;
		height: 10px;
		line-height: 10px;
		font-size: 10px;
		color: rgba(0, 0, 0, 0.4);
	}

	.intro {
		width: calc(100% - 40px);
		padding: 0 20px;
		height: 40px;
		line-height: 40px;
		color: rgba(0, 0, 0, 0.4);
		font-size: 10px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.centerClick {
		background-color: rgba(0, 0, 0, 0.15);
	}

	.center {
		width: calc(100% - 40px);
		padding: 0 20px;
		height: 40px;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.center_image {
		width: 20px;
		height: 100%;
		float: left;
		position: relative;
	}

	.center>.center_image>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.center>.p {
		float: left;
		line-height: 40px;
		color: #313131;
		width: calc(100% - 35px);
		margin-left: 15px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 15px;
	}
</style>