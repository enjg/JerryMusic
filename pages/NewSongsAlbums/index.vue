<template>
	<view class="NewSongsAlbums">
		<view class="bt">
			<image src="@/static/Universalimage/返回.png" @click="routerReturn()" alt=""></image>
			<view class="input">
				<view @click="index=0" :class="index == 0 ? 'nameOne' : 'nameTwo'">新歌</view>
				<view @click="index=1" :class="index == 1 ? 'nameOne' : 'nameTwo'">新碟</view>
				<view :style="'left: ' + (index * 65) + 'px;'" class="inputBj">

				</view>
			</view>
		</view>
		<view class="NewSongsAlbums_content">
			<swiper :current="index" @change="swiperChange" class="swiper">
				<swiper-item class="swiper-item">
					<NewSong></NewSong>
				</swiper-item>
				<swiper-item class="swiper-item">
					<NewAlbum></NewAlbum>
				</swiper-item>
			</swiper>
		</view>
		<Player />
		<MoreDetails v-if="myMore.TF"></MoreDetails>
		<ShareSort v-if="myShare.ShowTF"></ShareSort>

	</view>
</template>

<script setup>
	import ShareSort from '@/pages/module/ShareSort.vue'
	import MoreDetails from '@/pages/module/MoreDetails.vue';
	import {
		ref
	} from 'vue';
	import NewSong from './NewSong/NewSong.vue'
	import NewAlbum from './NewAlbum/NewAlbum.vue'
	import {
		useMyMore
	} from '@/pinia/myMore.js'
	const myMore = useMyMore();
	import {
		useMyShare
	} from '../../pinia/myShare';
	const myShare = useMyShare();
	let index = ref(0);

	function routerReturn() {
		uni.navigateBack({
			delta: 1
		}); // 返回上一级页面
	}

	function swiperChange(event) {
		index.value = event.detail.current;
	}
</script>

<style scoped>
	.bt {
		height: 60px;
		position: relative;
	}

	.bt>image {
		width: 20px;
		height: 20px;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.input {
		width: 130px;
		height: 30px;
		border-radius: 15px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		border: 1px solid #fe3a3c;
	}

	.inputBj {
		height: 30px;
		width: 65px;
		position: absolute;
		top: 0;
		border-radius: 15px;
		background-color: #fe3a3c;
		z-index: -1;
		transition: left 0.3s ease-out;
	}

	.inputBjTwo {
		left: 65px;
	}

	.input>view {
		width: 50%;
		height: 100%;
		float: left;
		text-align: center;
		line-height: 30px;
		border-radius: 15px;
	}

	.nameOne {
		color: white;
	}

	.nameTwo {
		color: #fe3a3c;
	}

	.NewSongsAlbums_content {
		width: 100%;
		height: calc(100vh - 60px);
	}

	.swiper {
		height: 100%;
	}

	.swiper-item {
		height: 100%;
		width: 100%;
	}
</style>