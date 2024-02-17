<template>
	<scroll-view scroll-y="true" @scrolltolower="scrollToLower" @scrolltoupper="scrollToUpper" class="UserDetails">
		<view class="bt" v-if="bt">
			<p class="p">{{listObj.profile.nickname}}</p>
		</view>
		<view class="User_contetn" v-if="listObj.code">
			<image :src="listObj.profile.backgroundUrl" mode="heightFix"></image>
			<view class="image">
				<image :src="listObj.profile.avatarUrl" mode="">
				</image>
			</view>
			<view class="UserProfile">
				<view class="name">
					<p class="p">{{listObj.profile.nickname}}</p>
				</view>
				<view class="address">
					<p class="p">{{listObj.profile.signature}}</p>
				</view>
				<view class="details">
					<p class="p">
						<span class="span">{{listObj.profile.follows}}</span>&nbsp;关注&nbsp;&nbsp;
						<span class="span">{{listObj.profile.followeds}}</span>&nbsp;粉丝&nbsp;&nbsp;
						<span class="span">Lv.{{listObj.level}}</span>&nbsp;等级&nbsp;&nbsp;
					</p>
				</view>
			</view>
			<view class="input">
				<view class="inputOne">
					<p class="p">+&nbsp;关注</p>
				</view>
				<view class="inputTwo">
					<p class="p">聊天</p>
				</view>
				<!-- <view class="input_content" v-for="(item,index) in listArray" :key="index">
					<p class="p">{{item}}</p>
				</view> -->
			</view>
		</view>
		<view class="content" :class="{contentBottom:!bt}">
			<view class="content_bt">
				<scroll-view scroll-x="true" class="scroll-view">
					<view id="item1" @tap="changeTitle($event,0)" class="content_bt_center">
						<p :class="{contentBtCenterClick:scrollIndex==0}" class="p">音乐</p>
					</view>
					<view @tap="changeTitle($event,1)" class="content_bt_center">
						<p :class="{contentBtCenterClick:scrollIndex==1}" class="p">动态</p>
					</view>
					<view :style="'left: ' + (scrollLeft) + 'px; width: ' + bjWidth + 'px;'" class="scrollBj"></view>
				</scroll-view>
			</view>
			<view class="content_center">
				<swiper duration="300" :current="scrollIndex" @change="swiperChange" class="swiper">
					<swiper-item class="swiper-item">
						<Song :message="{id:Props.id,TF:bt}"></Song>
					</swiper-item>
					<swiper-item class="swiper-item">
						<DynamicState :message="{id:Props.id,TF:bt}"></DynamicState>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<Player />
	</scroll-view>
</template>

<script setup>
	import DynamicState from './module/DynamicState.vue'
	import Song from './module/Song.vue'
	import axios from '@/axios.js';
	import {
		ref,
		defineProps,
		reactive,
		onMounted,
		getCurrentInstance
	} from 'vue';
	const Props = defineProps({
		id: String
	})
	onMounted(() => {
		getUserDetail(Props.id);
		getUserPlaylist(Props.id)
	})
	let listObj = reactive({});

	function getUserDetail(ids) {
		axios
			.get("/user/detail", {
				params: {
					uid: ids
				},
			})
			.then((res) => {
				Object.assign(listObj, res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function getUserPlaylist(ids) {
		axios
			.get("/user/playlist", {
				params: {
					uid: ids
				},
			})
			.then((res) => {})
			.catch((err) => {
				console.error(err);
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
</script>


<style scoped>
	.contentBtCenterClick {
		color: #313131 !important;
	}
	.bt {
		position: fixed;
		width: 100%;
		height: 60px;
		background-color: white;
		z-index: 999999;
	}

	.bt>.p {
		line-height: 60px;
		position: absolute;
		left: 50%;
		top: 50%;
		color: #3e465b;
		transform: translate(-50%, -50%);
	}

	.UserDetails {
		width: 100vw;
		height: 100vh;
		position: relative;
		overflow-y: auto !important;
		font-size: 16px;
	}

	.User_contetn {
		width: 100vw;
		height: 50vh;
		position: relative;
		overflow: hidden;
		box-shadow: inset 0px -20vh 20vh -30px rgba(0, 0, 0, 0.5);
	}

	.User_contetn>image {
		height: 120%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}

	.User_contetn>.image {
		width: 12vh;
		height: 12vh;
		background-color: white;
		border-radius: 50%;
		margin-top: 10vh;
		margin-left: calc((100vw - 12vh) / 2);
		display: inline-block;
		overflow: hidden;
		border: 1px solid white;
		box-sizing: border-box;

	}

	.User_contetn>.image>image {
		width: 100%;
		height: 100%;
	}


	.User_contetn>.UserProfile {
		width: 100%;
		height: 15vh;
		margin-top: 2vh;
	}

	.User_contetn>.UserProfile>view {
		height: 5vh;
		line-height: 5vh;
	}

	.UserProfile>.name>.p {
		text-align: center;
		color: white;
		font-size: 35rpx;
		font-weight: bold;
	}

	.UserProfile>.address {
		text-align: center;
		color: rgba(255, 255, 255, 0.7);
		font-size: 25rpx;
	}

	.UserProfile>.details {
		text-align: center;
		font-size: 25rpx;
		color: rgba(255, 255, 255, 0.7);
	}

	.UserProfile>.details .span {
		color: white !important;
		font-size: 27rpx;
	}

	.User_contetn>.input {
		width: calc(100% - 40px);
		padding: 0 20px;
		height: 5vh;
		margin-top: 2vh;
	}

	.User_contetn>.input>view {
		width: 30vw;
		height: 5vh;
		position: absolute;
		border-radius: 2.5vh;
		text-align: center;
		line-height: 5vh;
		font-weight: bold;
	}

	.inputOne {
		right: 51%;
		background-color: white;
	}

	.inputTwo {
		left: 51%;
		color: white;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.content {
		width: 100%;
		height: calc(100% - 60px);
		margin-top: -1.5vh;
		z-index: 9999;
		background-color: white;
		position: relative;
		overflow: hidden;
	}

	.contentBottom {
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
	}

	.content_bt {
		height: 50px;
		width: 100%;
	}

	.scroll-view {
		width: 100%;
		height: 100%;
		position: relative;
		white-space: nowrap;
		overflow: hidden;
	}

	.scrollBj {
		height: 3px;
		border-radius: 1.5px;
		background-color: red;
		position: absolute;
		top: 40px;
		transition: left 0.5s;
		transition-delay: 0.1s;
		z-index: 2;
	}

	.content_bt_center {
		width: 50%;
		height: 100%;
		float: left;
		text-align: center;
		line-height: 50px;
		font-size: 18px;
		font-weight: bold;
		color: #94949e;
	}

	.content_center {
		width: 100%;
		height: calc(100% - 50px);
	}

	.swiper {
		width: 100%;
		height: 100%;
	}
</style>