<template>
	<view class="PlaylistCover">
		<image :src="Props.img" mode="heightFix"></image>
		<view class="content">
			<image mode="widthFix" :src="Props.img" alt=""></image>
			<image @click="routerReturn()" src="./img/差.png" alt=""></image>
			<p class="p">{{Props.name}}</p>
		</view>
		<view class="jianjie">
			<p class="bq p">标签：无</p>
			<p class="center p">{{Props.intro}}</p>
			<view class="input">
				<p class="p">保存封面</p>
			</view>
		</view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js'
	import {
		defineProps,
		onMounted
	} from "vue";
	const Props = defineProps({
		name: String,
		img: String,
		intro: String
	});

	function routerReturn() {
		uni.navigateBack({
			delta: 1
		}); // 返回上一级页面
	}
</script>

<style scoped>
	.PlaylistCover {
		width: 100vw;
		height: 100vh;
		position: relative;
		overflow: hidden;
	}

	.PlaylistCover>image {
		height: 120vh;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		filter: blur(150px);
	}

	.content {
		width: 100vw;
		height: 100vw;
		position: relative;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}

	.content>image:nth-of-type(1) {
		width: 60%;
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 20px;
		transform: translate(-50%, -50%);
	}

	.content>image:nth-of-type(2) {
		width: 15px;
		height: 15px;
		position: absolute;
		right: 15px;
		top: 20px;
	}

	.content>.p {
		color: white;
		font-size: 18px;
		font-weight: bold;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		height: 20vw;
		width: 80vw;
		text-align: center;
		line-height: 20vw;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.jianjie {
		width: calc(100% - 40px);
		padding: 0 20px;
		height: calc(100% - 100vw);
		position: relative;
	}

	.jianjie>.p {
		color: white;
		font-size: 13px;
		line-height: 40px;
	}

	.jianjie>.center {
		line-height: 25px;
		font-size: 12px;
	}

	.input {
		width: 100px;
		height: 30px;
		border-radius: 15px;
		border: 1px solid white;
		position: absolute;
		left: calc(50%);
		bottom: 30px;
		transform: translateX(-50%);
		box-sizing: border-box;
	}

	.input>.p {
		text-align: center;
		line-height: 30px;
		font-size: 15px;
		color: white;
	}
</style>