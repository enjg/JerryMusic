<template>
	<scroll-view scroll-y="true" @scrolltolower="scrollToLower" @scrolltoupper="scrollToUpper" class="User">
		<view class="bt">
			<view class="bt_bj" v-if="bt">

			</view>
			<More :sort='sort'></More>
			<image v-if="!bt" src="@/static/Search/更多2.png" mode=""></image>
			<image v-else src="@/static/Search/更多.png" mode=""></image>
			<image @click="routerPush('/pages/search/index')" v-if="!bt" src="@/static/Search/放大镜3.png" mode="">
			</image>
			<image @click="routerPush('/pages/search/index')" v-else src="@/static/Search/放大镜2.png" mode=""></image>
		</view>
		<view class="User_contetn" :class="{LogIn:myUser.profile.code}">
			<view class="image">
				<image v-if="myUser.profile.code==200" :src="myUser.profile.profile.avatarUrl" mode="">
				</image>
			</view>
			<view class="UserDetails" v-if="!myUser.profile.code">
				<p class="p" @click="routerPush('/pages/LogIn/index')">立即登录</p>
			</view>
			<view class="UserProfile" v-if="myUser.profile.code==200">
				<view class="name">
					<p class="p">{{myUser.profile.profile.nickname}}</p>
				</view>
				<view class="address">
					<p class="p">村龄{{myUser.profile.createDays}}天</p>
				</view>
				<view class="details">
					<p class="p">
						<span class="span">{{myUser.profile.profile.follows}}</span>&nbsp;关注&nbsp;&nbsp;
						<span class="span">{{myUser.profile.profile.followeds}}</span>&nbsp;粉丝&nbsp;&nbsp;
						<span class="span">Lv.{{myUser.profile.level}}</span>&nbsp;等级&nbsp;&nbsp;
						<span class="span">{{myUser.profile.listenSongs}}次</span>&nbsp;听歌
					</p>
				</view>
			</view>

			<view class="input">
				<view class="input_content" v-for="(item,index) in listArray" :key="index">
					<p class="p">{{item}}</p>
				</view>
			</view>
		</view>
		<view class="content" :class="{contentRadius:!bt}">
			<view class="content_bt">
				<scroll-view scroll-x="true" class="scroll-view">
					<view id="item1" @tap="changeTitle($event,0)" class="content_bt_center">
						<p :class="{contentBtCenterClick:scrollIndex==0}" class="p">音乐</p>
					</view>
					<view @tap="changeTitle($event,1)" class="content_bt_center">
						<p :class="{contentBtCenterClick:scrollIndex==1}" class="p">动态</p>
					</view>
					<view :style="'left: ' + (scrollLeft) + 'px; width: ' + bjWidth + 'px;'" class="scrollBj">
					</view>
				</scroll-view>
			</view>
			<view class="content_center">
				<swiper duration="300" :current="scrollIndex" @change="swiperChange" class="swiper">
					<swiper-item class="swiper-item">
						1
					</swiper-item>
					<swiper-item class="swiper-item">
						<DynamicState></DynamicState>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<Player />
	</scroll-view>
</template>

<script setup>
	import DynamicState from './DynamicState/DynamicState.vue';
	import More from '@/pages/module/More.vue'
	import {
		useMyUser
	} from '@/pinia/myUser.js'
	import {
		onMounted,
		ref,
		getCurrentInstance
	} from 'vue';
	const myUser = useMyUser();

	let listArray = [
		'最近', '本地', '云盘', '以购', '更多'
	]

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
	let bt = ref(false);
	let sort = ref(2);

	function scrollToLower() {
		console.log('底部')
		bt.value = true;
		sort.value = 1;
	}

	function scrollToUpper() {
		console.log('离开底部')
		bt.value = false;
		sort.value = 2;
	}

	function routerPush(event) {
		wx.navigateTo({
			url: event
		})
	}
</script>

<style scoped>
	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}

	.bt {
		width: 100%;
		height: 60px;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}

	.bt>image {
		width: 20px;
		height: 20px;
	}

	.bt>image:nth-of-type(1) {
		position: absolute;
		top: 50%;
		right: 20px;
		transform: translateY(-50%);
	}

	.bt>image:nth-of-type(2) {
		position: absolute;
		top: 50%;
		right: 60px;
		transform: translateY(-50%);
	}

	.bt_bj {
		background-color: white;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		z-index: -1;
	}

	.User {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.LogIn {
		height: 50vh !important;
	}

	.User_contetn {
		width: 100vw;
		height: 40vh;
		background-color: brown;
		background-color: yellow;
		background: linear-gradient(to right, #86442c, #84432d);
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

	}

	.User_contetn>.image>image {
		width: 100%;
		height: 100%;
	}

	.User_contetn>.UserDetails {
		width: 100%;
		height: 5vh;
		/* 		background-color: coral; */
		margin-top: 2vh;
		line-height: 5vh;
		text-align: center;
		color: white;
		font-weight: bold;
		font-size: 18px;
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

	.input_content {
		width: calc((100% - 40px) / 5);
		height: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		float: left;
		margin-right: 10px;
		border-radius: 1vh;
		text-align: center;
		line-height: 5vh;
		color: rgba(255, 255, 255, 0.7);
		font-size: 28rpx;
	}

	.input_content:nth-of-type(5) {
		margin-right: 0;
	}

	.contentRadius {
		border-top-right-radius: 15px;
		border-top-left-radius: 15px;
	}

	.content {
		width: 100%;
		height: calc(100% - 60px);
		margin-top: -1.5vh;
		z-index: 2;

		background-color: white;
		position: relative;
		overflow: hidden;
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

	.contentBtCenterClick {
		color: #313131 !important;
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