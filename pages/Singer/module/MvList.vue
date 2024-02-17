<template>
	<view :scroll-y="Props.message.tf" class="MvList">
		<view class="MvList_bt">
			<p class="p">歌手MV</p>
		</view>
		<scroll-view :scroll-y="Props.message.tf" class="MvList_content">
			<view class="MvList_center" @click="routerPush('/pages/VideoPlayback/index',item.id)"
				v-for="(item,index) in listArray " :key="index">
				<view class="img">
					<image :src="item.imgurl16v9" mode="heightFix"></image>
				</view>
				<view class="name">
					<p class="p">{{item.name}}</p>
					<p class="p">{{item.publishTime}}</p>
					<p class="p">{{formatNumber(item.playCount)}}</p>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		onMounted,
		defineProps,
		reactive
	} from "vue";
	const Props = defineProps({
		message: Object,
	});
	onMounted(() => {
		getArtistMv(Props.message.id)
	})
	let listArray = reactive([]);

	function getArtistMv(ids) {
		axios
			.get("/artist/mv?", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				listArray.push(...res.data.mvs);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function formatNumber(number) {
		if (number >= 100000000) {
			return Math.floor(number / 100000000) + "亿";
		} else if (number >= 100000 && number < 100000000) {
			return Math.floor(number / 10000) + "万";
		} else {
			return number.toString();
		}
	}

	function routerPush(center, event) {
		wx.navigateTo({
			url: center + '?id=' + event
		})
	}
</script>

<style scoped>
	.MvList {
		width: 100%;
		height: 100%;
	}

	.MvList_bt {
		height: 50px;
	}

	.MvList_bt>.p {
		line-height: 50px;
		font-size: 17px;
		margin-left: 20px;
	}

	.MvList_content {
		width: calc(100% - 40px);
		height: calc(100% - 50px);
		overflow: auto;
		position: relative;
		padding: 0 20px;
	}

	.MvList_center {
		width: 100%;
		height: 80px;
		margin-bottom: 10px;
		display: flex;
	}

	.img {
		height: 100%;
	}

	.img>image {
		height: 100%;
		border-radius: 5px;
	}

	.name {
		flex-grow: 1;
		overflow: hidden;
	}

	.name>.p {
		line-height: 20px;
		margin-left: 10px;
		font-size: 12px;
		color: #999798;
	}

	.name>.p:nth-of-type(1) {
		font-size: 15px;
		color: black;
	}
</style>