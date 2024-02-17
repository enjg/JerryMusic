<template>

	<div :style="gradientStyle" class="gradient">
		<view class="bj">
		</view>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';

	const gradientStyle = ref({
		background: 'linear-gradient(-45deg, #000000, #000000, #000000, #000000, #000000)',
	});

	// 随机生成颜色的函数  
	function getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	// 生成五个随机颜色并更新渐变样式  
	onMounted(() => {
		const colors = Array.from({
			length: 5
		}, () => getRandomColor());
		gradientStyle.value.background =
			`linear-gradient(-45deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]}, ${colors[4]})`;
	});
</script>

<style scoped>
	.gradient {
		width: 100%;
		height: 160px;
		background-size: 600% 600% !important;
		animation: gradientBG 15s ease infinite;
		position: relative;
	}

	@keyframes gradientBG {
		0% {
			background-position: 0% 50%;
		}

		50% {
			background-position: 100% 50%;
		}

		100% {
			background-position: 0% 50%;
		}
	}

	.bj {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.2);
	}
</style>