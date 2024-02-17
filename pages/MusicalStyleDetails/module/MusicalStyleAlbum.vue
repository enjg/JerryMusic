<template>
	<scroll-view :scroll-y="Props.message.tf" class="MusicalStyleAlbum">
		<view class="bt">
			<view>
				<p class="p" v-if="sort==0">按最热排序</p>
				<p class="p" v-if="sort==1">按最新排序</p>
			</view>
			<view>
				<p class="p" :class="{click:sort==0}" @click="sort=0">最热</p>
				<p class="p">|</p>
				<p class="p" :class="{click:sort==1}" @click="sort=1">最新</p>
			</view>
		</view>
		<view class="center" @click="routerPush(item.id)" v-for="(item,index) in listArray" :key="index">
			<view class="img">
				<image mode="" :src="item.blurPicUrl" alt=""></image>
				<view></view>
			</view>
			<view class="name">
				<p class="p">{{item.name}}</p>
				<view>
					<p class="p">{{item.artists[0].name}},</p>
					<p class="p">{{formatTimestampToDateString(item.publishTime)}}</p>
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
	let sort = ref(0);
	onMounted(() => {
		getStyleAlbum(Props.message.id, sort.value);
	})

	function getStyleAlbum(id, sort) {
		axios
			.get("/style/album", {
				params: {
					tagId: id,
					sort: sort,
					cursor: listArray.length
				},
			})
			.then((res) => {
				listArray.push(...res.data.data.albums);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function formatTimestampToDateString(timestamp) {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		return year + '-' + month + '-' + day;
	}

	function routerPush(event) {
		wx.navigateTo({
			url: `/pages/Album/index?id=${event}`
		})
	}
</script>

<style sc>
	.click {
		color: black !important;
		font-weight: bold !important;
	}

	.MusicalStyleAlbum {
		width: calc(100% - 40px);
		padding: 0 20px;
		height: 100%;
		overflow: hidden;
		position: relative;
	}

	.bt {
		height: 60px;
		width: 100%;
		position: relative;
	}

	.bt>view:nth-of-type(1) {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}

	.bt>view:nth-of-type(1)>.p {
		line-height: 60px;
		font-size: 16px;
	}

	.bt>view:nth-of-type(2) {
		position: absolute;
		height: 60px;
		right: 0px;
		top: 50%;
		transform: translateY(-50%);
	}

	.bt>view:nth-of-type(2)>.p {
		float: left;
		line-height: 60px;
		margin-left: 8px;
		font-size: 13px;
		font-weight: 300;
		color: #8e8e8e;
	}

	.center {
		width: 100%;
		height: 50px;
		display: flex;
		margin-top: 10px;
	}

	.img {
		width: 50px;
		height: 50px;
		position: relative;
	}

	.img>image {
		height: 100%;
		width: 100%;
		float: left;
		border-radius: 5px;
	}

	.img>view {
		height: 100%;
		width: 100%;
		background-color: black;
		position: absolute;
		top: -5px;
		border-radius: 50%;
		z-index: -1;
	}

	.name {
		flex-grow: 1;
		float: left;
		overflow: hidden;
		padding-left: 10px;
	}

	.name>.p {
		width: 100%;
		height: 35px;
		line-height: 35px;
		font-size: 17px;
		overflow: hidden;
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