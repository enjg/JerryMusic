<template>
	<view class="LanguageStyleAlbum">
		<view class="bt">
			<image @click="routerReturn()" src="@/static/Universalimage/返回.png" mode=""></image>
			<p class="p">畅销榜</p>
		</view>
		<scroll-view @scrolltolower="scrolltolower()" class="scroll-view" scroll-y="true">
			<view class="sort">
				<view class="sort_center" @click="area=item.area" v-for="(item,index) in AreaList" :key="index">
					<p class="p" :class="{AreaClick:area==item.area}">{{item.name}}</p>
				</view>
			</view>
			<view class="content">
				<view class="content_center" @click="Click(item.albumId)" v-for="(item,index) in listArray"
					:key="index">
					<view class="image">
						<view class="bj">

						</view>
						<image :src="item.coverUrl" mode=""></image>
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
			<load></load>
		</scroll-view>
	</view>
</template>

<script setup>
	import load from '@/pages/module/load.vue'
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive,
		ref,
		watch
	} from 'vue';

	let AreaList = [{
			name: '华语',
			area: 'Z_H'
		},
		{
			name: '欧美',
			area: 'E_A'
		},
		{
			name: '韩国',
			area: 'KR'
		},
		{
			name: '日本',
			area: 'JP'
		}
	]

	let area = ref('Z_H');

	onMounted(() => {
		getAlbumListStyle(area.value);
	})

	watch(() => area.value, (newValue) => {
		listArray.length=0;
		getAlbumListStyle(newValue);
	})

	let listArray = reactive([]);

	function getAlbumListStyle(areas) {
		axios
			.get("/album/list/style", {
				params: {
					area: areas,
					limit: 30,
					offset: listArray.length
				},
			})
			.then((res) => {
				listArray.push(...res.data.albumProducts);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function scrolltolower() {
		getAlbumListStyle(area.value);
	}

	function routerReturn() {
		wx.navigateBack({
			delta: 1, // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
		});
	}

	function Click(event) {
		wx.navigateTo({
			url: `/pages/DigitalAlbumDetails/index?id=${event}`
		});
	}
</script>

<style scoped>
	.LanguageStyleAlbum {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.bt {
		width: 100%;
		height: 60px;
		position: absolute;
		top: 0;
	}

	.bt>image {
		width: 20px;
		height: 20px;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.bt>.p {
		line-height: 60px;
		position: absolute;
		left: 60px;
		font-size: 17px;
		font-weight: bold;
	}

	.scroll-view {
		width: 100%;
		height: calc(100% - 60px);
		position: absolute;
		top: 60px;
	}

	.sort {
		width: 100%;
		height: 40px;
		border-top: 1px solid #999999;
		border-bottom: 1px solid #999999;
		box-sizing: border-box;
	}

	.AreaClick {
		color: #d33742 !important;
		border-bottom: 2px solid #d33742 !important;
	}

	.sort_center {
		width: 25vw;
		height: 100%;
		float: left;
		position: relative;
	}

	.sort_center>.p {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #353535;
		line-height: 25px;
		box-sizing: border-box;
		border-bottom: 2px solid white;
	}

	.content_center {
		width: calc((100vw - 10vw) / 2 - 10px);
		height: calc((100vw - 10vw) / 2 - 10px + 10vw);
		float: left;
		display: inline-block;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.content_center:nth-of-type(2n-1) {
		margin-left: 10px;
		margin-right: 5vw;
	}

	.content_center:nth-of-type(2n) {
		margin-right: 10px;
		margin-left: 5vw;
	}

	.content_center>.image {
		width: calc((100vw - 10vw) / 2 - 10px);
		height: calc((100vw - 10vw) / 2 - 10px - 5vw);
		position: relative;
	}

	.content_center>.image>image {
		width: calc((100vw - 10vw) / 2 - 10px - 5vw);
		height: calc((100vw - 10vw) / 2 - 10px - 5vw);
		border-radius: 5px;
	}

	.content_center>.image>.bj {
		width: calc((100vw - 10vw) / 2 - 10px - 5vw);
		height: calc((100vw - 10vw) / 2 - 10px - 5vw);
		background-color: black;
		border-radius: 50%;
		position: absolute;
		right: 0;
		z-index: -1;
	}

	.content_center>view {
		width: 100%;
		height: 5vw;
		line-height: 5vw;

	}

	.content_center>.albumName>.p {
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.content_center>.artisName>.p {
		font-size: 12px;
		color: rgba(0, 0, 0, 0.5);
	}

	.content_center>.price>.p {
		font-size: 13px;
		color: #995250;
	}
</style>