<template>
	<scroll-view @scrolltolower="scrollToLower" @scrolltoupper="scrollToUpper" scroll-y="true" class="Singer"
		v-if="listObj.artist">
		<view class="bt">
			<image @click="routerReturn()" v-if="!bt" src="../../static/Universalimage/返回three.png" mode=""></image>
			<image @click="routerReturn()" v-else src="../../static/Universalimage/返回.png" mode=""></image>
			<view class="btBj" v-if="bt">

			</view>
		</view>
		<view class="bj"></view>
		<view class="img">
			<image :src="listObj.artist.cover" mode="widthFix"></image>
		</view>
		<view class="Singer_content">
			<view class="Singer_details">
				<p class="p">{{listObj.artist.name}}</p>
				<p class="p">{{listObj.artist.alias[0]}}</p>
				<p class="p" v-if="listObj.identify">{{listObj.identify.imageDesc}}</p>
			</view>
			<view class="content">
				<view class="sort">
					<scroll-view scroll-x="true" class="scroll-view">
						<view @tap="changeTitle($event,0)" id="item1" class="sort_center">
							<p :class="{sortcenterClick:scrollIndex==0}" class="p">{{listArray[0]}}</p>
						</view>
						<view @tap="changeTitle($event,1)" class="sort_center">
							<p :class="{sortcenterClick:scrollIndex==1}" class="p">{{listArray[1]}}</p>
						</view>
						<view @tap="changeTitle($event,2)" class="sort_center">
							<p :class="{sortcenterClick:scrollIndex==2}" class="p">{{listArray[2]}}<span
									class="span">{{listObj.artist.albumSize}}</span></p>
						</view>
						<view @tap="changeTitle($event,3)" class="sort_center">
							<p :class="{sortcenterClick:scrollIndex==3}" class="p">{{listArray[3]}}<span
									class="span">{{listObj.videoCount}}</span></p>
						</view>
						<view :style="'left: ' + (scrollLeft) + 'px; width: ' + bjWidth + 'px;'" class="scrollbj">
						</view>
					</scroll-view>
				</view>
				<view class="center">
					<swiper duration="300" :current="scrollIndex" @change="swiperChange" class="swiper">
						<swiper-item class="swiper-item">
							<HomePage :message="{id:Props.id,tf:bt}"></HomePage>
						</swiper-item>
						<swiper-item class="swiper-item">
							<SongList :message="{id:Props.id,tf:bt}"></SongList>
						</swiper-item>
						<swiper-item class="swiper-item">
							<Album :message="{id:Props.id,tf:bt}"></Album>
						</swiper-item>
						<swiper-item class="swiper-item">
							<MvList :message="{id:Props.id,tf:bt}"></MvList>
						</swiper-item>
					</swiper>
				</view>

			</view>
		</view>
		<Player />
		<MoreDetails v-if="myMore.TF"></MoreDetails>
		<ShareSort v-if="myShare.ShowTF"></ShareSort>
	</scroll-view>
</template>

<script setup>
	import ShareSort from '@/pages/module/ShareSort.vue'
	import MvList from './module/MvList.vue'
	import HomePage from './module/HomePage.vue'
	import SongList from './module/SongList.vue'
	import Album from './module/Album.vue'
	import axios from '@/axios.js';
	import MoreDetails from '@/pages/module/MoreDetails.vue';
	import {
		useMyMore
	} from '@/pinia/myMore.js'
	const myMore = useMyMore();
	import {
		useMyShare
	} from '../../pinia/myShare';
	const myShare = useMyShare();
	import {
		onMounted,
		defineProps,
		reactive,
		ref,
		getCurrentInstance,
		nextTick
	} from "vue";
	const Props = defineProps({
		id: String
	});
	let listArray = ['主页', '歌曲', '专辑', '视频']
	onMounted(() => {
		getArtistDetail(Props.id);
	})
	let listObj = reactive({});

	function getArtistDetail(ids) {
		axios
			.get("/artist/detail", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				Object.assign(listObj, res.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	let bjWidth = ref(0);
	let scrollLeft = ref(30);
	let scrollIndex = ref(0);
	const instance = getCurrentInstance();
	onMounted(() => {
		getWidth();
	})

	function getWidth() {
		const query = uni.createSelectorQuery().in(instance);
		query
			.select('#item1')
			.boundingClientRect((rect) => {
				if (rect) {
					bjWidth.value = rect.width - 60;
				} else {
					console.log(rect)
					getWidth();
				}
			})
			.exec();
	}

	function changeTitle(event, index) {
		scrollLeft.value = (event.currentTarget.offsetLeft + 30);
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


	let bt = ref(false);

	function scrollToLower() {
		console.log('底部')
		bt.value = true;
	}

	function scrollToUpper() {
		console.log('离开底部')
		bt.value = false;
	}

	function routerReturn() {
		uni.navigateBack({
			delta: 1
		}); // 返回上一级页面
	}
</script>

<style scoped>
	.Singer {
		width: 100vw;
		height: 100vh;
		position: relative;
		overflow: hidden;
	}

	.bt {
		width: 100%;
		height: 60px;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9999;
	}

	.btBj {
		width: 100%;
		height: 100%;
		background-color: white;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.bt>image {
		width: 20px;
		height: 20px;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.bj {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		bottom: 0;
		background-color: #f5f5f5;
	}

	.img {
		height: calc(100% / 3);
		width: 250%;
		overflow: hidden;
		position: absolute;
		left: 50%;
		top: 0%;
		transform: translateX(-50%);
		border-bottom-left-radius: 50%;
		/* 设置左下角为半圆 */
		border-bottom-right-radius: 50%;
		/* 设置右下角为半圆 */
	}

	.img>image {
		width: 100vw;
		position: absolute;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
	}

	.Singer_content {
		width: 100%;
		height: 100vh;
		display: inline-block;
		position: absolute;
		top: calc(100% / 3);
	}

	.Singer_details {
		width: calc(100% - 40px);
		height: calc((100vw - 40px) / 2.5);
		position: absolute;
		top: -20px;
		left: 50%;
		transform: translateX(-50%);
		background-color: white;
		border-radius: 10px;
		box-shadow:
			5px 5px 5px rgba(0, 0, 0, 0.05),
			-5px 5px 5px rgba(0, 0, 0, 0.05),
			5px -5px 5px rgba(0, 0, 0, 0.05),
			-5px -5px 5px rgba(0, 0, 0, 0.05);
	}

	.Singer_details>.p:nth-of-type(1) {
		font-size: 40rpx;
		margin: 10px 0;
		font-weight: bold;
		text-align: center;
	}

	.Singer_details>.p:nth-of-type(2) {
		text-align: center;
		margin: 5px 0;
		font-weight: 300;
		font-size: 25rpx;
		color: #9a9a9a;
	}

	.Singer_details>.p:nth-of-type(3) {
		text-align: center;
		margin: 5px 0;
		font-size: 25rpx;
		color: #9a9a9a;
	}

	.content {
		width: 100%;
		height: calc(100vh - 60px);
		position: absolute;
		top: calc((100vw - 40px) / 2.5);
	}

	.sort {
		width: 100%;
		height: 50px;
	}

	.scroll-view {
		width: calc(100% - 40px);
		padding: 0 20px;
		height: 100%;
		overflow: hidden;
		position: relative;
	}


	.scrollbj {
		width: 20px;
		height: 3px;
		background-color: red;
		position: absolute;
		top: 35px;
		border-radius: 1.5px;
		transition: left 0.5s ease-out, width 0.5s ease;
		transition-delay: 0.1s;
		z-index: 2;
	}

	.sort_center {
		width: calc(100% / 4);
		height: 100%;
		display: inline-block;
		position: relative;
	}

	.sortcenterClick {
		color: #313131 !important;
	}

	.sort_center>.p {
		text-align: center;
		line-height: 50px;
		font-size: 16px;
		font-weight: bold;
		color: #8e8e96;
	}

	.sort_center>.p>.span {
		font-size: 12px;
		margin-left: 2px;
	}

	.center {
		width: 100%;
		height: calc(100% - 50px);
	}

	.swiper {
		width: 100%;
		height: 100%;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
	}
</style>