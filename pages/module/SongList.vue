<template>
	<view class="SongListArray">
		<view class="bj" @click="myPlayBack.SongListTF=0">

		</view>
		<view class="Tips" v-if="ClearTipsTF">
			<view class="Tips_content">
				<p class="p">确定要清空播放列表？</p>
				<view class="input" @click="PostTips">
					取消
				</view>
				<view class="input" @click="PostClearPlaylist">
					清空
				</view>
			</view>
			<view class="Tips_bj" @click="PostTips">
			</view>
		</view>
		<view class="songlist">
			<scroll-view scroll-x="true" class="songList_bt">
				<view @tap="changeTitle($event,0)" id="item1" class="songList_center">
					<p :class="{songListClick:scrollIndex==0}" class="p">当前播放<span
							class="span">({{myPlayBack.SongList.length}})</span></p>
				</view>
				<view @tap="changeTitle($event,1)" class="songList_center">
					<p :class="{songListClick:scrollIndex==1}" class="p">历史播放</p>
				</view>
				<view :style="'left: ' + (scrollLeft) + 'px; width: ' + bjWidth + 'px;'" class="songlistBj">

				</view>
			</scroll-view>

			<swiper duration="300" :current="scrollIndex" @change="swiperChange" class="swiper">
				<swiper-item class="swiper-item">
					<view class="CurrentSongPlay">
						<view class="CurrentSongPlay_bt">
							<view class="PlayState" @click="PlayStateClick()">
								<image v-if="myPlayBack.PlayMode==0" src="@/static/PlayState/列表循环.png" mode=""></image>
								<p v-if="myPlayBack.PlayMode==0" class="p">列表循环</p>
								<image v-if="myPlayBack.PlayMode==1" src="@/static/PlayState/随机播放.png" mode=""></image>
								<p v-if="myPlayBack.PlayMode==1" class="p">随机播放</p>
								<image v-if="myPlayBack.PlayMode==2" src="@/static/PlayState/单曲循环.png" mode=""></image>
								<p v-if="myPlayBack.PlayMode==2" class="p">单曲循环</p>
							</view>
							<image src="@/static/Universalimage/下载.png" mode=""></image>
							<image src="@/static/Universalimage/删除.png" @click.stop="PostClearTipsTF(1)" mode="">
							</image>
						</view>
						<view class="center">
							<view class="song" v-if="myPlayBack.PlayMode!==1"
								:class="{ songClick: item.id===myPlayBack.CurrentSong.id }"
								@click="SongClick(item,index)" v-for="(item,index) in myPlayBack.SongList" :key="index">
								<view class="songName">
									<view class="">
										<p v-if="item.fee == 1" class="mv vip">VIP</p>
										<p v-if="item.fee == 1" class="mv vip">试听</p>
									</view>
									<p class="p" style="color: #323a47; font-size: 15px;">{{item.name}}</p>
									<p class="p" style="margin: 0 5px;">.</p>
									<p class="p" v-for="(items,indes) in item.ar">
										{{items.name}}<span v-if="indes<item.ar.length-1">&nbsp;-&nbsp;</span>
									</p>
								</view>
								<image src="@/static/PlayState/差.png" mode=""></image>
							</view>
							<view v-else class="song" :class="{ songClick: item.id===myPlayBack.CurrentSong.id }"
								@click="SongClick(item,index)" v-for="(item,index) in myPlayBack.RandomPlayListArray"
								:key="index">
								<view class="songName">
									<view class="">
										<p v-if="item.fee == 1" class="mv vip">VIP</p>
										<p v-if="item.fee == 1" class="mv vip">试听</p>
									</view>
									<p class="p" style="color: #323a47; font-size: 15px;">{{item.name}}</p>
									<p class="p" style="margin: 0 5px;">.</p>
									<p class="p" v-for="(items,indes) in item.ar">
										{{items.name}}<span v-if="indes<item.ar.length-1">&nbsp;-&nbsp;</span>
									</p>
								</view>
								<image src="@/static/PlayState/差.png" mode=""></image>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<view class="HistoricalSongPlay">
						<view class="HistoricalSongPlay_bt">
							<p class="p">全部歌曲{{myPlayBack.HistoryPlayArray.length}}首</p>
							<image src="@/static/Universalimage/下载.png" mode=""></image>
							<image src="@/static/Universalimage/删除.png" @click.stop="PostClearTipsTF(2)" mode="">
							</image>
						</view>
						<view class="center">
							<view class="song" @click="SongClick(item,index)"
								v-for="(item,index) in myPlayBack.HistoryPlayArray" :key="index">
								<view class="songName">
									<view class="">
										<p v-if="item.fee == 1" class="mv vip">VIP</p>
										<p v-if="item.fee == 1" class="mv vip">试听</p>
									</view>
									<p class="p" style="color: #323a47; font-size: 15px;">{{item.name}}</p>
									<p class="p" style="margin: 0 5px;">.</p>
									<p class="p" v-for="(items,indes) in item.ar">
										{{items.name}}<span v-if="indes<item.ar.length-1">&nbsp;-&nbsp;</span>
									</p>
								</view>
								<!-- 								<image src="@/static/PlayState/差.png" mode=""></image> -->
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js';
	import {
		onMounted,
		ref,
		watch,
		getCurrentInstance,
		nextTick,
		reactive
	} from "vue";
	const myPlayBack = useMyPlayBack();
	// let tfbool = ref(-1);


	function SongClick(event, index) {
		myPlayBack.index = index;
		myPlayBack.id = event.id;
	}


	const instance = getCurrentInstance();
	let bjWidth = ref(0);
	let scrollLeft = ref(75);
	let scrollIndex = ref(0);

	onMounted(() => {
		getWidth();
	})


	function getWidth() {
		const query = uni.createSelectorQuery().in(instance);
		query
			.select('#item1')
			.boundingClientRect((rect) => {
				if (rect && rect.width) {
					bjWidth.value = rect.width - 150;
				} else {
					console.log(rect)
					getWidth();
				}
			})
			.exec();
	}

	function changeTitle(event, index) {
		scrollLeft.value = (event.currentTarget.offsetLeft + 75);
		scrollIndex.value = index;
	}

	function swiperChange(event) {
		if (scrollIndex.value > event.detail.current) {
			scrollLeft.value -= (150 + bjWidth.value);
		}
		if (scrollIndex.value < event.detail.current) {
			scrollLeft.value += (150 + bjWidth.value);
		}
		scrollIndex.value = event.detail.current;
	}

	let ClearTipsTF = ref(false);
	let ClearTipsSort = ref(null);

	function PostClearTipsTF(event) {
		ClearTipsTF.value = true;
		ClearTipsSort.value = event;
	}

	function PostTips() {
		ClearTipsTF.value = false;
		ClearTipsSort.value = null;
	}

	function PostClearPlaylist() {
		myPlayBack.SongListTF = 0;
		ClearTipsTF.value = false;
		myPlayBack.ClearPlaylist(ClearTipsSort.value);

	}


	function PlayStateClick() {
		if (myPlayBack.SongSort == 1) {
			myPlayBack.postPlayMode();
		}
	}
</script>

<style scoped>
	.SongListArray {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
	}

	.mv {
		height: 11px;
		border-radius: 2px;
		margin: 0 !important;
		color: #bcb682 !important;
		font-size: 8px !important;
		padding: 0 3px;
		line-height: 9px !important;
		box-sizing: border-box;
		border: 1px solid #bcb682;
		margin-right: 5px !important;
		float: left;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}

	.vip {
		color: #d14a57 !important;
		border: 1px solid #d14a57 !important;
	}

	.songName>view {
		display: inline-block;
		position: relative;
		float: left;
		height: 100%;
	}


	.songClick .p {
		color: #fc3d44 !important;
	}

	.bj {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.songlist {
		width: 100vw;
		height: 70vh;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: white;
		border-radius: 20px 20px 0 0px;
		overflow: hidden;
				animation: slideInFromBottom 0.5s ease forwards;
	}

	@keyframes slideInFromBottom {
		from {
			transform: translateY(100%);
		}

		to {
			transform: translateY(0);
		}
	}

	.songlistBj {
		height: 3px;
		border-radius: 1.5px;
		background-color: red;
		position: absolute;
		top: 50px;
		transition: left 0.5s;
		transition-delay: 0.1s;
		z-index: 2;
	}

	.songList_bt {
		height: 70px;
		position: relative;
		width: 100%;
		white-space: nowrap;
		/* 不换行 */
		overflow: hidden;
	}

	.songList_center {
		width: 50%;
		height: 70px;
		float: left;
	}

	.songListClick {
		color: #313131 !important;
	}

	.songList_center>.p {
		font-size: 18px;
		font-weight: bold;
		line-height: 70px;
		text-align: center;
		color: #9a9a9a;
	}

	.songList_bt .span {
		font-size: 15px !important;
	}

	.swiper {
		width: 100%;
		height: calc(100% - 70px);
	}

	.swiper-item {}

	.CurrentSongPlay {
		width: 100%;
		height: 100%;
	}

	.CurrentSongPlay_bt {
		width: 100%;
		height: 50px;
		position: relative;
	}

	.PlayState {
		width: 100px;
		height: 30px;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
		background-color: #f9f9f9;
		border-radius: 15px;
		box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
	}

	.PlayState>image {
		width: 15px;
		height: 15px;
		position: absolute;
		top: 50%;
		left: 10px;
		transform: translateY(-50%);
	}

	.PlayState>.p {
		width: calc(100% - 45px);
		text-align: center;
		position: absolute;
		top: 50%;
		left: 35px;
		transform: translateY(-50%);
		font-size: 13px;
	}

	.CurrentSongPlay_bt>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.CurrentSongPlay_bt>image:nth-of-type(1) {
		right: 60px;
	}

	.CurrentSongPlay_bt>image:nth-of-type(2) {
		right: 20px;
	}

	.center {
		width: 100%;
		height: calc(100% - 50px);
		overflow-y: auto;
	}

	.song {
		height: 50px;
		width: calc(100% - 0px);
		position: relative;
	}

	.song>image {
		width: 15px;
		height: 15px;
		position: absolute;
		top: 50%;
		right: 20px;
		transform: translateY(-50%);
	}

	.songName {
		height: 100%;
		width: calc(100% - 70px);
		position: absolute;
		left: 20px;
		overflow: hidden;
		/* 		width: calc(100% - ); */
	}

	.songName>.p {
		float: left;
		line-height: 50px;
		color: #999b9a;
		font-size: 14px;
	}


	.HistoricalSongPlay {
		width: 100%;
		height: 100%;
	}

	.HistoricalSongPlay_bt {
		width: 100%;
		height: 50px;
		position: relative;
	}

	.HistoricalSongPlay_bt>.p {
		line-height: 50px;
		position: relative;
		left: 20px;
		font-size: 13px;
		font-weight: 300;
	}

	.HistoricalSongPlay_bt>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.HistoricalSongPlay_bt>image:nth-of-type(1) {
		right: 60px;
	}

	.HistoricalSongPlay_bt>image:nth-of-type(2) {
		right: 20px;
	}

	.Tips {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99999;
	}

	.Tips_bj {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 1;
	}

	.Tips_content {
		width: calc(100% - 80px);
		/* 		box-sizing: border-box; */
		padding: 20px;
		height: 60px;
		border-radius: 10px;
		background-color: white;
		z-index: 2;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.Tips_content>.p {
		color: #999999;
		font-size: 12px;
		font-weight: 300;
		letter-spacing: 2px;
	}

	.Tips_content>.input {
		background-color: red;
		text-align: center;
		font-size: 14px;
		width: 60px;
		height: 30px;
		line-height: 30px;
		border-radius: 3px;
		color: #fe3a3b;
		background-color: white;
		transition: background-color 0.5s ease;
	}

	.Tips_content>.input:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.Tips_content>.input:nth-of-type(3) {
		position: absolute;
		right: 20px;
		bottom: 20px;
	}

	.Tips_content>.input:nth-of-type(2) {
		position: absolute;
		right: 100px;
		bottom: 20px;
	}
</style>