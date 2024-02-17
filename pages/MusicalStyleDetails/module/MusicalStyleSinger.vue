<template>
	<scroll-view :scroll-y="Props.message.tf" class="MusicalStyleSinger">
		<view class="center" v-for="(item,index) in listArray" :key="index" @click="routerPush(item.id)">
			<view class="img">
				<image mode="heightFix" :src="item.picUrl" alt=""></image>
			</view>
			<view class="name">
				<p class="p">{{item.name}}</p>
				<view>
					<p class="p">{{formatFansCount(item.fansCount)}}粉丝</p>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		defineProps,
		onMounted,
		reactive,
		ref
	} from "vue";
	const Props = defineProps({
		message: Object,
	});
	let listArray = reactive([]);
	onMounted(() => {
		getStyleArtist(Props.message.id);
	})

	function getStyleArtist(id) {
		axios
			.get("/style/artist", {
				params: {
					tagId: id,
					cursor: listArray.length
				},
			})
			.then((res) => {
				listArray.push(...res.data.data.artists);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function formatFansCount(fansCount) {
		if (fansCount >= 100000000) {
			return Math.floor(fansCount / 100000000) + ' 亿';
		} else if (fansCount >= 10000) {
			return Math.floor(fansCount / 10000) + ' 万';
		} else {
			return fansCount;
		}
	}

	function routerPush(event) {
		wx.navigateTo({
			url: '/pages/Singer/index?id=' + event
		})
	}
</script>

<style scoped>
	.MusicalStyleSinger {
		height: 100%;
		width: calc(100% - 40px);
		padding: 0 20px;
		overflow: hidden;
		position: relative;
	}

	.center {
		width: 100%;
		height: 50px;
		margin-top: 10px;
	}

	.img {
		position: relative;
		width: 50px;
		height: 50px;
		float: left;
		overflow: hidden;
		border-radius: 50%;
	}

	.img>image {
		height: 100%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}


	.name {
		float: left;
		height: 100%;
		width: calc(100% - 60px);
		margin-left: 10px;
	}

	.name>.p {
		line-height: 35px;
		font-size: 17px;
		width: 100%;
		height: 35px;
		white-space: nowrap;
		/* 防止文本换行 */
		overflow: hidden;
		/* 隐藏超出部分的文本 */
		text-overflow: ellipsis;
		/* 用省略号代替超出部分的文本 */
	}

	.name>view {
		width: 100%;
		height: 15px;
		overflow: hidden;
	}

	.name>view>.p {
		float: left;
		line-height: 15px;
		font-size: 13px;
		color: #808080;
		white-space: nowrap;
		font-weight: 300;
	}
</style>