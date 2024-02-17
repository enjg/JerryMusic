<template>
	<view class="LatestRelease">
		<view class="LatestRelease_bt">
			<p class="p">最新上架&nbsp;></p>
		</view>
		<view class="center" @click="Click(item.albumId)" v-for="(item,index) in listArray" :key="index">
			<view class="img">
				<image :src="item.coverUrl" mode=""></image>
				<view class="bj">

				</view>
			</view>
			<view class="albumName">
				<p class="p">{{item.albumName}}</p>
			</view>
			<view class="artisName">
				<p class="p">{{item.artistName}}</p>
			</view>
			<view class="price">
				<p class="p">￥{{item.price}}</p>
			</view>
		</view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive
	} from 'vue';

	onMounted(() => {
		getAlbumList();
	})
	let listArray = reactive([]);

	function getAlbumList() {
		axios
			.get("/album/list", {
				params: {
					limit: 6
				},
			})
			.then((res) => {
				listArray.push(...res.data.products);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function Click(event) {
		wx.navigateTo({
			url: `/pages/DigitalAlbumDetails/index?id=${event}`
		});
	}
</script>

<style scoped>
	.LatestRelease {
		width: 100%;
		display: inline-block;
		margin-top: 20px;
	}

	.LatestRelease_bt {
		width: calc(100% - 20px);
		height: 50px;
		padding: 0 10px;
		line-height: 50px;
		font-size: 18px;
		font-weight: bold;
	}

	.center {
		width: calc((100vw - 40px) / 3);
		height: calc((100vw - 40px) / 3 + 10vw);
		float: left;
		margin-left: 10px;
		margin-bottom: 20px;
	}

	.center>.img>image {
		height: 100%;
		width:  calc((100vw - 40px) / 3 - 5vw);
		position: absolute;
		left: 0;
		z-index: 2;
		border-radius: 5px;
	}

	.center>.img {
		width: calc((100vw - 40px) / 3);
		height: calc((100vw - 40px) / 3 - 5vw);
		position: relative;
	}

	.center>.img>.bj {
		width: calc((100vw - 40px) / 3 - 5vw);
		height: calc((100vw - 40px) / 3 - 5vw);
		background-color: black;
		border-radius: 50%;
		position: absolute;
		right: 0;
	}

	.center>view {
		width: 100%;
		height: 5vw;
		line-height: 5vw;
		
	}
	.center>.albumName>.p{
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.center>.artisName>.p{
		font-size: 12px;
		color: rgba(0, 0, 0, 0.5);
	}
	.center>.price>.p{
		font-size: 13px;
		color: #995250;
	}

</style>