<template>
	<scroll-view class="NewAlbum" scroll-y="true">
		<view class="DigitalAlbum">
			<view class="DigitalAlbum_bt">
				<p class="p">数字专辑</p>
			</view>
			<view class="DigitalAlbum_content">
				<view class="DigitalAlbum_center" v-for="(item,index) in DigitalAlbumListArray" :key="index">
					<AlbumBlack
						:message="{sort:1,img:item.coverUrl,name:item.albumName,id:item.albumId,artists:[{name:item.artistName}]}">
					</AlbumBlack>
				</view>
			</view>
		</view>
		<view class="LatestAlbum">
			<view class="LatestAlbum_bt">
				<p class="p">本周新碟</p>
			</view>
			<view class="LatestAlbum_content">
				<view class="LatestAlbum_center" v-for="(item,index) in listArray" :key="index">
					<AlbumBlack :message="{sort:2,img:item.picUrl,name:item.name,id:item.id,artists:item.artists}">
					</AlbumBlack>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import AlbumBlack from '@/pages/module/AlbumBlack.vue'
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive
	} from 'vue';

	onMounted(() => {
		getAlbum()
		getAlbumList()
	})

	let listArray = reactive([]);

	function getAlbum() {
		axios
			.get("/album/new", {
				params: {
					limit: 50,
					area: 'ALL'
				},
			})
			.then((res) => {
				listArray.push(...res.data.albums);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	let DigitalAlbumListArray = reactive([])

	function getAlbumList() {
		axios
			.get("/album/list", {
				params: {
					limit: 3
				},
			})
			.then((res) => {
				DigitalAlbumListArray.push(...res.data.products);
				console.log(DigitalAlbumListArray)
			})
			.catch((err) => {
				console.error(err);
			});
	}
</script>

<style scoped>
	.NewAlbum {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
	}

	.LatestAlbum {
		width: 100%;
	}

	.LatestAlbum_bt {
		width: calc(100% - 40px);
		height: 50px;
		padding: 0 20px;
		color: #313131;
		font-size: 17px;
		font-weight: bold;
		line-height: 50px;
	}

	.LatestAlbum_content {
		width: calc(100% - 40px);
		padding: 0 20px;
	}

	.LatestAlbum_center {
		float: left;
		width: calc((100vw - 70px) / 2);
		height: calc((100vw - 70px) / 2 * 0.85 + 6vh);
		margin-bottom: 20px;
	}

	.LatestAlbum_center:nth-of-type(2n) {
		margin-left: 30px;
	}

	.DigitalAlbum {
		width: 100%;
	}

	.DigitalAlbum_bt {
		width: calc(100% - 40px);
		height: 50px;
		padding: 0 20px;
		color: #313131;
		font-size: 17px;
		font-weight: bold;
		line-height: 50px;
	}

	.DigitalAlbum_content {
		width: calc(100% - 40px);
		padding: 0 20px;
		display: inline-block;
	}

	.DigitalAlbum_center {
		float: left;
		width: calc((100vw - 80px) / 3);
		height: calc((100vw - 80px) / 3 * 0.85 + 6vh);
	}

	.DigitalAlbum_center:nth-of-type(2) {
		margin: 0 20px;
	}
</style>