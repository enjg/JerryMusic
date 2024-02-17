<template>
	<view class="DigitalAlbumChart">
		<view class="bt">
			<p class="p">数字单曲榜&nbsp;></p>
			<view class="sort">
				<p class="p" :class="{sortClick:sort=='daily'}" @click="sort='daily'">日榜</p>
				<p class="p" :class="{sortClick:sort=='week'}" @click="sort='week'">周榜</p>
				<p class="p" :class="{sortClick:sort=='total'}" @click="sort='total'">总榜</p>
			</view>
		</view>
		<swiper class="swiper" next-margin="20px">
			<swiper-item class="swiper-item" v-for="(item, index) in Array.from({ length: 3 })" :key="index">
				<view class="content" v-if="listArray.length">
					<view class="center" @click="Click(listArray[index*3+indexs].albumId)"
						v-for="(item, indexs) in Array.from({ length: 4 })" :key="indexs">
						<view class="image">
							<image :src="listArray[index*3+indexs].coverUrl" mode=""></image>
							<view class="bj">
							</view>
						</view>
						<view class="index">
							<p class="p">{{index*4+indexs+1}}</p>
						</view>
						<view class="name">
							<p class="p">{{listArray[index*3+indexs].albumName}}</p>
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
		ref,
		watch
	} from 'vue';
	let sort = ref('daily');
	onMounted(() => {
		getAlbumSongsaleboard('daily')
	})
	let listArray = reactive([]);

	function getAlbumSongsaleboard(types) {
		axios
			.get("/album/songsaleboard", {
				params: {
					albumType: 1,
					type: types
				},
			})
			.then((res) => {
				listArray.push(...res.data.products.slice(0, 12));
			})
			.catch((err) => {
				console.error(err);
			});
	}
	watch(() => sort.value, (newValue) => {
		listArray.length = 0;
		getAlbumSongsaleboard(newValue);
	})

	function Click(event) {
		wx.navigateTo({
			url: `/pages/DigitalAlbumDetails/index?id=${event}`
		});
	}
</script>

<style scoped>
	.DigitalAlbumChart {
		width: 100%;
		height: 250px;
		margin-top: 20px;
	}

	.bt {
		width: calc(100% - 20px);
		height: 50px;
		padding: 0 10px;

		position: relative;
	}

	.bt>.p {
		line-height: 50px;
		font-size: 18px;
		font-weight: bold;
	}

	.sort {
		width: 150px;
		height: 20px;
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
	}

	.sort>.p {
		float: left;
		line-height: 20px;
		font-size: 13px;
		width: 50px;
		height: 100%;
		text-align: center;
		box-sizing: border-box;
		color: #313234;
	}

	.sortClick {
		color: #b7403a !important;
		font-weight: bold !important;
	}

	.sort>.p:nth-of-type(2) {
		border-left: 1px solid #dedfe1;
		border-right: 1px solid #dedfe1;
	}

	.swiper {
		width: 100%;
		height: 200px;
	}

	.content {
		width: calc(100% - 20px);
		padding: 0 10px;
	}

	.center {
		width: 100%;
		height: 50px;
		box-sizing: border-box;
		border-top: 1px solid #e8e9eb;
		border-bottom: 1px solid #e8e9eb;
		position: relative;
	}

	.center>.image {
		width: 45px;
		height: 50px;
		position: absolute;
		left: 0;
	}

	.center>.image>image {
		height: 40px;
		width: 40px;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		z-index: 2;
		border-radius: 3px;
	}

	.center>.image>.bj {
		height: 40px;
		width: 40px;
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		border-radius: 50%;
		background-color: black;
	}

	.center>.index {
		width: 50px;
		height: 100%;
		position: absolute;
		left: 45px;
		text-align: center;
		line-height: 50px;
		color: #6a6a6c;
		font-size: 15px;
		font-weight: bold;
	}

	.center>.name {
		height: 100%;
		position: absolute;
		left: 95px;
		line-height: 50px;
		color: #363638;
		font-size: 13px;
	}
</style>