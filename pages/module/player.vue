<template>
	<view class="player" v-if="myPlayBack.id">

		<view class="content">
			<view class="img" @click="routerPush()">
				<image :src="myPlayBack.CurrentSong.al.picUrl" mode=""></image>
			</view>
			<view class="name">
				<p class="p">{{myPlayBack.CurrentSong.name}}</p>
			</view>
		</view>
		<view class="input">
			<image src="@/static/SongList/列表.png" @click="myPlayBack.SongListTF=1" mode=""></image>
			<image src="@/static/SongList/播放3.png" @click="myPlayBack.play()" mode=""></image>
		</view>
		<SongList v-if="myPlayBack.SongListTF"></SongList>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import SongList from '@/pages/module/SongList.vue';
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

	function routerPush() {
		wx.navigateTo({
			url: "/pages/PlayDetails/index?sort=1"
		});
	}
</script>

<!-- 样式部分未作修改 -->
<style scoped>
	.player {
		width: 100vw;
		height: 50px;
		position: fixed;
		bottom: 0;
		z-index: 99999;
		background-color: white;
	}

	.content {
		width: calc(100% - 100px);
		height: 50px;
		position: absolute;
		left: 0;
	}

	.img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		background-color: black;
		position: absolute;
		top: 50%;
		left: 20px;
		transform: translateY(-50%);
	}

	.img>image {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.name {
		width: calc(100% - 70px);
		height: 50px;
		overflow: hidden;
		position: absolute;
		left: 70px;
	}

	.name>.p {
		float: left;
		line-height: 50px;
		font-size: 14px;
	}

	.input {
		width: 100px;
		height: 50px;
		position: absolute;
		right: 0;
	}

	.input>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.input>image:nth-of-type(1) {
		left: 60px;
	}

	.input>image:nth-of-type(2) {
		left: 20px;
		border: 1px solid black;
		padding: 5px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}
</style>