<template>
	<view class="RecommendedReview">
		<view class="bt">
			<p class="p">云村星评馆></p>
		</view>
		<swiper class="swiper" next-margin="20px">
			<swiper-item class="swiper-item" v-for="(item,index) in listArray" :key="index">
				<view class="content" :style="{ backgroundColor: colorlist[index] }">
					<view class="name">
						<image :src="item.resources[0].resourceExtInfo.songData.album.picUrl" alt=""></image>
						<view>
							<p class="p">{{item.resources[0].resourceExtInfo.songData.name}}</p>
							<p class="p">一</p>
							<p class="p">{{item.resources[0].resourceExtInfo.songData.artists[0].name}}</p>
						</view>
						<image src=" ./img/播放.png" alt=""></image>
					</view>
					<view class="middle">
						<view class="center">
							<p class="p">{{item.uiElement.mainTitle.titleDesc}}</p>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive,
		ref
	} from "vue";
	let divBackground = reactive(["red", "pink"]);
	onMounted(() => {
		getStarpickCommentsSummary();
		generateRandomColors(10);
	})
	let listArray = reactive([])

	function getStarpickCommentsSummary() {
		axios
			.get("/starpick/comments/summary")
			.then((response) => {
				listArray.push(...response.data.data.blocks[0].creatives);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	var colorPalette = [
		"#7c7d92", "#a0768a", "#9c7878", "#967e96", "#9d7f77", "#809681", "#9b7781", "#88888a", "#9d9a77", "#9b8877",
		"#79859b",
		"#878988", "#77949c", "#78879a"
	];

	function generateRandomColor() {
		return colorPalette[Math.floor(Math.random() * colorPalette.length)];
	}
	let colorlist = reactive([])

	function generateRandomColors(num) {
		var colors = [];
		for (var i = 0; i < num; i++) {
			colors.push(generateRandomColor());
		}
		colorlist.push(...colors);
		// 	return colors;
	}
</script>

<style scoped>
	.RecommendedReview {
		width: calc(100% - 20px);
		margin-left: 20px;
	}

	.bt {
		height: 50px;
	}

	.bt>.p {
		line-height: 50px;
		font-size: 18px;
		font-weight: bold;
	}

	.swiper {
		height: 150px;
	}

	.swiper-item {
		height: 150px;
	}

	.content {
		width: calc(100% - 10px);
		height: 150px;
		border-radius: 5px;
		box-sizing: border-box;
		overflow: hidden;
		box-shadow: inset 0px 0px 20px 5px rgba(0, 0, 0, 0.1);
	}

	.name {
		height: 30px;
		position: relative;
	}

	.name>view {
		width: calc(100% - 100px);
		position: absolute;
		left: 50px;
		overflow: hidden;
	}

	.name>view>.p {
		margin: 0;
		line-height: 30px;
		color: white;
		font-size: 12px;
		float: left;
	}

	.name>view>.p:nth-of-type(2) {
		line-height: 30px;
		opacity: 0.5;
	}

	.name>view>.p:nth-of-type(3) {
		font-size: 10px !important;
		line-height: 30px;
		opacity: 0.5;
		margin-left: 5px;
	}

	.name>image:nth-of-type(1) {
		height: 20px;
		width: 20px;
		border-radius: 2px;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.name>image:nth-of-type(2) {
		height: 15px;
		width: 15px;
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.middle {
		height: 120px;
		background-color: rgba(255, 255, 255, 0.2);
	}

	.center {
		padding: 0 20px;
		height: 75px;
		overflow: hidden;
		text-overflow: ellipsis;

	}

	.center>.p {
		margin-top: auto;
		width: 100%;
		font-size: 14px;
		line-height: 25px;
		color: white;
	}
</style>