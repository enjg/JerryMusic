<template>
	<view class="SongListBlock" @click="routerPush(Props.message.id)">
		<image :src="Props.message.img" alt=""></image>
		<p class="p">{{Props.message.name}}</p>
		<view :style="{ backgroundColor: colors }" class="count">
			<image src="./img/播放.png" alt=""></image>
			<p class="p">{{formatNumber(Props.message.playCount)}}</p>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		ref,
		onMounted
	} from "vue";

	const Props = defineProps({
		message: Object,
	});
	onMounted(() => {
		generateRandomColor();
	})

	function formatNumber(number) {
		if (number >= 100000000) {
			return Math.floor(number / 100000000) + "亿";
		} else if (number >= 100000 && number < 100000000) {
			return Math.floor(number / 10000) + "万";
		} else {
			return number.toString();
		}
	}
	let colors = ref(null);

	function generateRandomColor() {
		// 随机生成 RGB 分量的值
		var red = Math.floor(Math.random() * 256);
		var green = Math.floor(Math.random() * 256);
		var blue = Math.floor(Math.random() * 256);

		// 将 RGB 分量的值格式化为十六进制
		var color = "#" + red.toString(16) + green.toString(16) + blue.toString(16);

		colors.value = color;
	}

	function routerPush(event) {
		wx.navigateTo({
			url: `/pages/PlaylistDetails/index?id=${event}`
		})
	}
</script>

<style scoped>
	.SongListBlock {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.SongListBlock>image {
		width: 100%;
		height: calc(100% - 40px);
		border-radius: 8px;
	}

	.SongListBlock>.p {
		width: 100%;
		height: 40px;
		line-height: 20px;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 13px;
		color: #3e465b;
	}

	.count {
		position: absolute;
		top: 5px;
		right: 5px;
		border-radius: 15px;
		height: 15px;
		padding: 0 5px;
		box-shadow: 2px 0px 1px rgba(0, 0, 0, 0.1),
			0px 2px 1px rgba(0, 0, 0, 0.1),
			-2px 0px 1px rgba(0, 0, 0, 0.1),
			0px -2px 1px rgba(0, 0, 0, 0.1);
	}

	.count>.p {
		font-size: 12px;
		color: white;
		line-height: 15px;
		float: left;
	}

	.count>image {
		width: 10px;
		height: 10px;
		float: left;
		margin: 2.5px;
	}
</style>