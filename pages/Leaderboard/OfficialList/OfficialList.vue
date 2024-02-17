<template>
	<view>
		<view class="content" @click="routerPush(Props.message.id)">
			<view class="center-bt">
				<p class="p">{{Props.message.name}}</p>
			</view>
			<view class="center_zt">
				<view class="center_img">
					<image :src="items.al.picUrl" v-for="(items, indexs) in listArray" :key="indexs"></image>
					<image src="@/static/Universalimage/播放.png" alt=""></image>
				</view>
				<view class="center_name">
					<view class="name" v-for="(items, indexs) in listArray" :key="indexs">
						<view>
							<p class="p">{{indexs+1}}</p>
						</view>
						<view>
							<p class="p">{{items.name}}</p>
							<p class="p">-</p>
							<p class="p" v-for="(itemss,indexss) in items.ar" :key="indexss">{{itemss.name}}<span
									v-if="indexss<items.ar.length-1">/</span></p>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		defineProps,
		onMounted,
		reactive
	} from "vue";
	const Props = defineProps({
		message: Object
	});
	onMounted(() => {
		getPlaylistDetail(Props.message.id);
		// for (let i = 0; i < Props.message.length; i++) {
		// 	getPlaylistDetail(Props.message[i].id, i);
		// }
		// 	getTopMv();
	})

	let listArray = reactive([]);

	function getPlaylistDetail(ids) {
		axios
			.get("/playlist/detail", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				listArray.push(...res.data.playlist.tracks.slice(0, 3));
			})
			.catch((err) => {
				console.error(err);
			});

	}
	function routerPush(event){
		wx.navigateTo({
			url: `/pages/OfficialListDetails/index?id=${event}`
		})
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 100px;
		background-color: bisque;
		border-radius: 15px;
		background-color: white;
		box-shadow:
			2px 0px 2px rgba(200, 200, 200, 0.1),
			0px 2px 2px rgba(200, 200, 200, 0.1),
			-2px 0px 2px rgba(200, 200, 200, 0.1),
			0px -2px 2px rgba(200, 200, 200, 0.1);
		overflow: hidden;
		margin-bottom: 20px;
	}

	.center-bt {
		width: calc(100% - 40px);
		height: 35px;
		padding: 0 20px;
	}

	.center-bt>.p {
		line-height: 35px;
		font-weight: bold;
	}

	.center_zt {
		width: calc(100% - 40px);
		height: 55px;
		padding: 0 20px;
		position: relative;
	}

	.center_img {
		height: 55px;
		width: 75px;
		position: absolute;
		left: 20px;
	}

	.center_img>image:nth-of-type(1) {
		z-index: 3;
		position: absolute;
		left: 0;
		height: 100%;
		width: 55px;
		border-radius: 10px;
	}

	.center_img>image:nth-of-type(2) {
		z-index: 2;
		position: absolute;
		left: 20px;
		height: 80%;
		width: 44px;
		bottom: 0;
		opacity: 0.3;
		border-radius: 10px;
	}

	.center_img>image:nth-of-type(3) {
		z-index: 1;
		position: absolute;
		left: 40px;
		height: 60%;
		bottom: 0;
		opacity: 0.1;
		border-radius: 10px;
		width: 33px;
	}

	.center_img>image:nth-of-type(4) {
		width: 15px;
		height: 15px;
		position: absolute;
		top: 50%;
		left: 28px;
		transform: translate(-50%, -50%);
		z-index: 4;
		opacity: 0.7;
	}

	.center_name {
		width: calc(100% - 130px);
		height: 100%;
		position: absolute;
		left: 110px;
	}

	.name {
		height: 15px;
	}

	.name>view:nth-of-type(1) {
		width: 20px;
	}

	.name>view:nth-of-type(2) {
		width: calc(100% - 20px);
		height: 100%;
		overflow: hidden;
	}

	.name>view:nth-of-type(2)>.p {
		float: left;
	}

	.name>view:nth-of-type(2)>.p:nth-of-type(2) {
		margin: 0 5px;
	}

	.name>view {
		float: left;
	}

	.name .p {
		margin: 0;
		height: 15px;
		font-size: 10px;
		line-height: 15px;
		font-weight: 300;
	}

	.name>view>.p:nth-child(1) {
		font-weight: bold;
	}

	.name:nth-of-type(3n-1) {
		margin: 5px 0;
	}
</style>