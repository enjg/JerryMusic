<template>
	<view class="GarouselMap">
		<swiper class="swiper-wrap" circular="true" interval="5000" autoplay="true">
			<swiper-item v-for="(item,index) in listAarray" :key="index" class="center">
				<image mode="widthFix" class="imgs" :src="item.pic" alt=""></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive
	} from "vue";
	let listAarray = reactive([])
	onMounted(() => {
		getcarousel()
	})

	function getcarousel() {
		axios
			.get("/banner", {
				params: {
					type: 1
				}
			})
			.then((response) => {
				listAarray.push(...response.data.banners);
			})
			.catch((error) => {
				console.error(error);
			});
	}
</script>

<style scoped>
	.GarouselMap {
		width: 100%;
	}

	.imgs {
		width: calc(100% - 40px);
		margin: 0 20px;
		border-radius: 15px;
	}

	.center {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>