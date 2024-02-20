<template>
	<scroll-view scroll-y="true" @scrolltolower="scrollToLower" @scrolltoupper="scrollToUpper" @scroll="handleScroll"
		class="MusicalStyleDetails" v-if="listObj.code">
		<view class="bt">
			<image @click="routerReturn()" src="@/static/Universalimage/返回three.png" alt=""></image>
			<view class="image" :style="{opacity:opc}">
				<image mode="heightFix" :src="listObj.data.cover[0]" alt=""></image>
			</view>
		</view>
		<view class="img">
			<image mode="heightFix" :src="listObj.data.cover[0]" alt=""></image>
			<p class="p">{{listObj.data.parentNames}}</p>
			<p class="p">{{listObj.data.name}}</p>
			<p class="p">{{listObj.data.desc}}</p>
			<view class="img_center img_center_one">
				<p class="p">{{listObj.data.songNum}}</p>
				<p class="p">歌曲</p>
			</view>
			<view class="img_center img_center_two">
				<p class="p">{{listObj.data.artistNum}}</p>
				<p class="p">艺人</p>
			</view>
		</view>

		<view class="intro" v-if="listObj.data.professionalReviews">
			<swiper next-margin="30px" previous-margin="30px" class="swiper-container">
				<swiper-item class="swiper-item">
					<view class="intro_center">
						<p class="p">你的曲风非专业点评</p>
						<p class="p">
							{{processMessage(listObj.data.professionalReviews.templateContent,listObj.data.professionalReviews.pattern)}}
						</p>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<view class="intro_center">
						<p class="p">你的曲风画像</p>
						<p class="p">
							{{processMessage(listObj.data.tagPortrait.templateContent,listObj.data.tagPortrait.pattern)}}
						</p>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view v-else class="playAll">
			<image src="@/static/SongList/播放.png" alt=""></image>
			<p class="p">听听看</p>
		</view>
		<view class="content" id="content">

			<view class="sort">
				<scroll-view class="scroll-view" scroll-x="true">
					<view class="sort_center" @tap="changeTitle($event,index)" :id="'item' + index"
						v-for="(item,index) in listArray" :key="index">
						<p :class="{sortcenterClick:index==scrollIndex}" class="p">{{item}}</p>
					</view>
					<view :style="'left: ' + (scrollLeft) + 'px; width: ' + bjWidth + 'px;'" class="scrollbj">
					</view>
				</scroll-view>
			</view>
			<view class="details">
				<swiper duration="300" :current="scrollIndex" @change="swiperChange" class="details_swiper">
					<swiper-item class="details_swiper_item">
						<MusicalStyleSong :message="{id:Props.id,tf:bt}"></MusicalStyleSong>
					</swiper-item>
					<swiper-item class="details_swiper_item">
						<MusicalStyleAlbum :message="{id:Props.id,tf:bt}"></MusicalStyleAlbum>
					</swiper-item>
					<swiper-item class="details_swiper_item">
						<MusicalStyleSongList :message="{id:Props.id,tf:bt}"></MusicalStyleSongList>
					</swiper-item>
					<swiper-item class="details_swiper_item">
						<MusicalStyleSinger :message="{id:Props.id,tf:bt}"></MusicalStyleSinger>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<MoreDetails v-if="myMore.TF"></MoreDetails>
		<Player />
		<ShareSort v-if="myShare.ShowTF"></ShareSort>

	</scroll-view>
</template>

<script setup>
	import ShareSort from '@/pages/module/ShareSort.vue'

	import MoreDetails from '@/pages/module/MoreDetails.vue';
	import MusicalStyleSong from './module/MusicalStyleSong.vue';
	import MusicalStyleAlbum from './module/MusicalStyleAlbum.vue';
	import MusicalStyleSongList from './module/MusicalStyleSongList.vue';
	import MusicalStyleSinger from './module/MusicalStyleSinger.vue';
	import axios from '@/axios.js';
	import {
		defineProps,
		onMounted,
		reactive,
		ref,
		getCurrentInstance,
		nextTick
	} from "vue";
	import {
		useMyMore
	} from '@/pinia/myMore.js'
	const myMore = useMyMore();
	import {
		useMyShare
	} from '../../pinia/myShare';
	const myShare = useMyShare();
	const instance = getCurrentInstance();
	const Props = defineProps({
		id: String,
	});
	let bjWidth = ref(0);
	let scrollLeft = ref(30);
	let scrollIndex = ref(0);
	onMounted(() => {
		getStyleDetail(Props.id);
		getWidth();
		getHeight();
	})

	function getWidth() {
		const query = uni.createSelectorQuery().in(instance);
		query
			.select('#item1')
			.boundingClientRect((rect) => {
				if (rect) {
					bjWidth.value = rect.width - 20;
				} else {
					getWidth();
				}
			})
			.exec();
	}

	function changeTitle(event, index) {
		scrollLeft.value = (event.currentTarget.offsetLeft + 10);
		scrollIndex.value = index;
	}

	function swiperChange(event) {
		if (scrollIndex.value > event.detail.current) {
			scrollLeft.value -= (60 + bjWidth.value);
		}
		if (scrollIndex.value < event.detail.current) {
			scrollLeft.value += (60 + bjWidth.value);
		}
		scrollIndex.value = event.detail.current;
	}

	let listObj = reactive({});
	let listArray = ['歌曲', '专辑', '歌单', '艺人']

	function getStyleDetail(ids) {
		axios
			.get("/style/detail", {
				params: {
					tagId: ids
				},
			})
			.then((res) => {
				Object.assign(listObj, res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function processMessage(message, variables) {
		const regex = /\${(.*?)}/g;
		return message.replace(regex, (match, capture) => variables[capture].text || match);
	}

	function routerReturn() {
		wx.navigateBack({
			delta: 1, // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
		});
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

	let height = ref(null);

	function getHeight() {
		const query = uni.createSelectorQuery().in(instance);
		query
			.select('#content')
			.boundingClientRect((rect) => {
				if (rect) {
					height.value = rect.height + 60;
					// 	bjWidth.value = rect.width - 20;
				} else {
					getHeight();
				}
			})
			.exec();
	}
	let opc = ref(0);

	function handleScroll(event) {
		opc.value = event.target.scrollTop / (event.target.scrollHeight - height.value);
	}
</script>

<style scoped>
	.bt {
		width: 100vw;
		height: 60px;
		position: fixed;
		top: 0;
		z-index: 999999;
		overflow: hidden;
	}

	.bt>image:nth-of-type(1) {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 20px;
		left: 20px;
		z-index: 2;
	}

	.bt>.image {
		width: 100%;
		height: 100%;
		position: absolute;
		bottom: 0;
		will-change: opacity;
		transition: opacity 0.1s ease;
	}

	.bt>.image>image {
		height: calc((100vh / 3) * 1.5);
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
	}

	.MusicalStyleDetails {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.img {
		height: calc(100% / 3);
		width: 250%;
		position: static;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		position: relative;
		overflow: hidden;
		border-bottom-left-radius: 50%;
		/* 设置左下角为半圆 */
		border-bottom-right-radius: 50%;
		/* 设置右下角为半圆*/
	}

	.img>image {
		height: calc(100% * 1.5);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}

	.img>.p:nth-of-type(1) {
		color: white;
		position: absolute;
		top: 60px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9999;
		font-size: 12px;
		font-weight: 300;
		line-height: 15px;
	}

	.img>.p:nth-of-type(2) {
		color: white;
		position: absolute;
		top: 75px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9999;
		font-size: 25px;
	}

	.img>.p:nth-of-type(3) {
		line-height: 20px;
		height: 40px;
		padding: 0 20px;
		width: calc(100vw - 40px);
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 12px;
		font-weight: 300;
		color: rgba(255, 255, 255, 0.8);
		position: absolute;
		top: 70%;
		left: 50%;
		transform: translateX(-50%);
	}

	.img_center_one {
		position: absolute;
		top: 50%;
		width: 120px;
		left: 50%;
		transform: translateX(-100%);
	}

	.img_center_two {
		position: absolute;
		top: 50%;
		width: 120px;
		left: 50%;
		transform: translateX(0%);
	}

	.img_center>.p {
		color: white !important;
		text-align: center;

	}

	.img_center>.p:nth-of-type(1) {
		line-height: 25px;
		font-size: 15px;
		font-weight: bold;
	}

	.img_center>.p:nth-of-type(2) {
		line-height: 15px;
		font-weight: 300;
		font-size: 12px;
	}


	.content {
		width: 100%;
		height: calc(100vh - 60px);
	}

	.intro {
		width: 100%;
		height: 105px;
		margin-top: -20px;
	}

	.playAll {
		height: 10vw;
		width: 30vw;
		position: relative;
		top: -5vw;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 5vw;
		background-color: white;
		box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1),
			-5px 5px 5px 0px rgba(0, 0, 0, 0.1);
	}

	.playAll>image {
		width: 10px;
		height: 10px;
		padding: 6px;
		background-color: #ff393b;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 10%;
		transform: translateY(-50%);
	}

	.playAll>.p {
		width: calc(80% - 22px);
		line-height: 10vw;
		position: absolute;
		right: 10%;
		text-align: center;
		color: #323033;
		font-size: 15px;
		font-weight: bold;
	}

	.swiper-container {
		width: 100%;
		height: 100%;
	}

	.swiper-item {
		position: relative;
	}

	.intro_center {
		background-color: white;
		width: calc(100% - 30px);
		height: calc(100% - 30px);
		border-radius: 10px;
		position: absolute;
		padding: 10px 10px;
		top: 0px;
		overflow: hidden;
	}

	.swiper-item:nth-of-type(1)>.intro_center {
		/* 		margin-left: 40px; */
		left: 5px;
		box-shadow: 0px 3px 15px rgb(200, 200, 200), -2px 0px 5px rgba(200, 200, 200, 0.1);
	}

	.swiper-item:nth-of-type(2)>.intro_center {
		right: 5px;
		box-shadow: 0px 3px 15px rgb(200, 200, 200), 2px 0px 5px rgba(200, 200, 200, 0.1);
	}

	.intro_center>.p:nth-of-type(1) {
		line-height: 20px;
		font-size: 14px;
	}

	.intro_center>.p:nth-of-type(2) {
		line-height: 15px;
		font-weight: 300;
		font-size: 10px;
		height: 45px;
		margin-top: 10px;
		overflow: hidden;
	}

	.sort {
		height: 40px;
		width: 100%;
		z-index: 999999;
		overflow: hidden;
	}

	.scroll-view {
		white-space: nowrap;
		/* 不换行 */
		overflow: hidden;
		height: 40px;
		width: 100%;
		position: relative;
	}

	.scrollbj {
		width: 20px;
		height: 5px;
		background-color: red;
		position: absolute;
		top: 30px;
		border-radius: 2.5px;
		transition: left 0.5s ease-out, width 0.5s ease;
		transition-delay: 0.1s;
		z-index: 2;
	}

	.sort_center {
		width: calc((100% - 160px) / 4);
		display: inline-block;
		position: relative;
		height: 40px;
		margin: 0 20px;
	}

	.sort_center>.p {
		line-height: 40px;
		font-size: 15px;
		text-align: center;
		color: #2a2a2a;

	}

	.sortcenterClick {
		color: #313131 !important;
		font-weight: bold !important;
	}

	.details {
		width: 100%;
		height: calc(100% - 40px);
	}

	.details_swiper {
		width: 100%;
		height: 100%;
	}

	.details_swiper_item {
		width: 100%;
		height: 100%;
	}
</style>