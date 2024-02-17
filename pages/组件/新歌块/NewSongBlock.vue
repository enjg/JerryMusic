<template>
	<view class="NewSongBlock">
		<view class="bt">
			<img v-if="Props.message.name=='全部'" src="./img/全部.png" alt="">
			<img v-if="Props.message.name=='华语'" src="./img/华语.png" alt="">
			<img v-if="Props.message.name=='欧美'" src="./img/欧美.png" alt="">
			<img v-if="Props.message.name=='韩国'" src="./img/韩国.png" alt="">
			<img v-if="Props.message.name=='日本'" src="./img/日本.png" alt="">
		</view>
		<view class="content">
			<view class="content_bt">
				<view>
					<img src="@/static/SongList/播放3.png" alt="">
				</view>
				<view>
					<p>播放全部</p>
					<p>({{listArray.length}})</p>
				</view>
				<view>
					<img src="@/static/SongList/列表.png" alt="">
				</view>
			</view>
			<view class="center">
				<view class="content_center" v-for="(item,index) in listArray" :key="index">
					<view class="img">
						<img :src="item.album.picUrl" alt="">
					</view>
					<view class="name">
						<view>
							<p>{{item.name}}</p>
							<view>
								<p v-if="item.fee == 1" class="mv vip">VIP</p>
								<p v-if="item.fee == 1" class="mv vip">试听</p>
								<P v-for="(items,index) in item.artists" :key="index">{{items.name}}<span v-if="index<item.artists.length-1">/</span></P>
								<p>&nbsp;-&nbsp;</p>
								<p>{{item.album.name}}</p>
							</view>
						</view>
						<view v-if="item.mvid!==0">
							<img src="@/static/SongList/播放2.png" alt="">
						</view>
					</view>
					<view class="bd">
						<img src="@/static/SongList/更多.png" alt="">
					</view>
				</view>
			</view>



		</view>
	</view>
</template>

<script setup>
	import axios from 'axios';
	import {
		defineProps,
		onMounted,
		reactive
	} from "vue";
	import 全部 from './img/全部.png'

	const Props = defineProps({
		message: Object
	});

	onMounted(() => {
		console.log(Props.message);
		getTopSong(Props.message.type)
	});
	let listArray = reactive([]);

	function getTopSong(types) {
		axios
			.get("http://116.205.238.28:8090/top/song", {
				params: {
					type: types
				},
			})
			.then((res) => {
				console.log(res.data.data)
				listArray.push(...res.data.data)
			})
			.catch((err) => {
				console.error(err);
			});
	}
	
</script>

<style scoped>
	.mv {
		height: 12px;
		margin: 0 !important;
		color: #bcb682 !important;
		font-size: 8px !important;
		padding: 0 3px;
		line-height: 10px !important;
		box-sizing: border-box;
		border: 1px solid #bcb682;
		margin-right: 5px !important;
	}

	.vip {
		color: #d14a57 !important;
		border: 1px solid #d14a57 !important;
	}

	.NewSongBlock {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.bt>img {
		width: 100%;
		height: 160px;
	}

	.content {
		width: 100%;
		height: calc(100% - 150px);
		background-color: white;
		position: absolute;
		top: 150px;
		z-index: 2;
		border-radius: 15px;
		overflow: hidden;
	}

	.content_bt {
		height: 60px;
		width: 100%;
	}

	.content_bt>view:nth-of-type(1) {
		width: 50px;
		height: 60px;
		position: absolute;
		left: 20px;
	}

	.content_bt>view:nth-of-type(1)>img {
		width: 8px;
		padding: 6px;
		border: 2px solid black;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.content_bt>view:nth-of-type(2) {
		position: absolute;
		left: 70px;
		height: 60px;
		width: calc(100% - 100px);
	}

	.content_bt>view:nth-of-type(2)>p {
		float: left;
		line-height: 60px;
	}

	.content_bt>view:nth-of-type(2)>p:nth-of-type(1) {
		font-size: 17px;
		color: black;
	}

	.content_bt>view:nth-of-type(2)>p:nth-of-type(2) {
		font-size: 14px;
		color: #868485;
	}

	.content_bt>view:nth-of-type(3)>img {
		position: absolute;
		width: 20px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.content_bt>view:nth-of-type(3) {
		position: absolute;
		height: 50px;
		width: 50px;
		right: 0px;
	}

	.center {
		width: 100%;
		height: calc(100% - 60px);
		overflow-y: auto;
	}

	.content_center {
		width: 100%;
		height: 40px;
		padding: 10px 0;
		position: relative;
	}

	.img {
		width: 40px;
		height: 40px;
		border-radius: 3px;
		overflow: hidden;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.img>img {
		width: 100%;
	}

	.bd {
		width: 50px;
		height: 40px;
		position: absolute;
		right: 0px;
		top: 50%;
		transform: translateY(-50%);
	}

	.bd>img {
		width: 20px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.name {
		width: calc(100% - 120px);
		height: 40px;
		position: absolute;
		left: 70px;
		display: flex;
	}
	.name>view:nth-of-type(1){
		flex-grow: 1;
	}
	.name>view:nth-of-type(1)>p {
		line-height: 25px;
		color: black;
		font-size: 16px;
		height: 25px;
		width: 100%;
		overflow: hidden;
	}
	.name>view:nth-of-type(2) {
		width: 40px;
		height: 100%;
		flex: 0 0 auto;
		position: relative;
	}
	.name>view:nth-of-type(2)>img {
		position: absolute;
		width: 20px;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	}
	.name>view:nth-of-type(1)>view {
		width: 100%;
		height: 15px;
		overflow: hidden;
		
	}

	.name>view:nth-of-type(1)>view>p {
		float: left;
		line-height: 15px;
		font-size: 13px;
		color: #808080;
		white-space: nowrap;
		font-weight: 300;
	}
</style>