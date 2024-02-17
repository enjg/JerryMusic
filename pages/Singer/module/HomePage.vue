<template>
	<scroll-view :scroll-y="Props.message.tf" class="HomePage">
		<view class="hotsong">
			<p class="p">TA的热门作品</p>
			<view class="hotsong_img">
				<swiper class="swiper" circular="true" next-margin="10px">
					<swiper-item class="swiper-item" v-for="(item,index) in hotSongs.slice(0,10)" :key="index">
						<image :src="item.al.picUrl" alt=""></image>
						<view class="hotsong_content">
							<p class="p">{{item.name}}</p>
							<p class="p">&nbsp;-&nbsp;</p>
							<p class="p" v-for="(items,indexs) in item.ar" :key="indexs">{{items.name}}<span
									v-if="indexs<item.ar.length-1">/</span></p>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="SingerDetails">
			<p class="p">艺人百科</p>
			<p class="p">{{artist.briefDesc}}</p>
		</view>
		<view class="SimilarSinger">
			<view class="SimilarSinger_bt">
				<p class="p">相似艺人</p>
			</view>
			<view class="SimilarSinger_content">

			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		onMounted,
		defineProps,
		reactive
	} from "vue";
	import {
		useMyUser
	} from '@/pinia/myUser.js'
	const myUser = useMyUser();
	const Props = defineProps({
		message: Object,
	});
	onMounted(() => {
		getArtists(Props.message.id);
		getSimiArtist(Props.message.id);
	})
	let artist = reactive({});
	let hotSongs = reactive([]);

	function getArtists(ids) {
		axios
			.get("/artists", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				Object.assign(artist, res.data.artist);
				hotSongs.push(...res.data.hotSongs);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function getSimiArtist(ids) {
		console.log(ids)
		axios
			.get("/simi/artist", {
				params: {
					id: ids
				},
			})
			.then((res) => {
				console.log(res.data)
			})
			.catch((err) => {
				console.error(err);
			});
	}
</script>

<style scoped>
	.HomePage {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}

	.hotsong {
		width: calc(100% - 80px);
		height: 100px;
		padding: 10px 20px;
		background-color: yellow;
		margin-left: 20px;
		background-color: white;
		border-radius: 10px;
		box-shadow:
			2px 2px 10px rgba(0, 0, 0, 0.05),
			-2px 2px 10px rgba(0, 0, 0, 0.05),
			2px -2px 10px rgba(0, 0, 0, 0.05),
			-2px -2px 10px rgba(0, 0, 0, 0.05);
	}

	.hotsong>.p {
		line-height: 30px;
		font-size: 18px;
		font-weight: 300;
	}

	.hotsong_img {
		height: 50px;
		width: 100%;
		margin-top: 20px;
	}

	.swiper {
		width: 100%;
		height: 100%;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.swiper-item>image {
		height: 50px;
		width: 50px;
		border-radius: 5px;
		position: absolute;
		top: 0;
		left: 0px;
	}

	.hotsong_content {
		width: calc(100% - 60px);
		height: 50px;
		position: absolute;
		top: 0;
		left: 60px;
	}

	.hotsong_content>.p {
		line-height: 50px;
		float: left;
		color: #9b9b9d;
		font-size: 13px;
	}

	.hotsong_content>.p:nth-of-type(1) {
		font-size: 17px;
		color: black;
	}

	.SingerDetails {
		margin-top: 20px;
		width: calc(100% - 80px);
		height: 140px;
		padding: 10px 20px;
		margin-left: 20px;
		background-color: white;
		border-radius: 10px;
		box-shadow:
			2px 2px 10px rgba(0, 0, 0, 0.05),
			-2px 2px 10px rgba(0, 0, 0, 0.05),
			2px -2px 10px rgba(0, 0, 0, 0.05),
			-2px -2px 10px rgba(0, 0, 0, 0.05);
	}

	.SingerDetails>.p:nth-of-type(1) {
		line-height: 30px;
		font-size: 18px;
		font-weight: bold;
	}

	.SingerDetails>.p:nth-of-type(2) {
		margin-top: 10px;
		width: 100%;
		height: calc(100% - 40px);
		overflow: hidden;
		font-weight: 300;
		font-size: 14px;
		line-height: 20px;
		text-overflow: ellipsis;
	}

	.SimilarSinger {
		margin-top: 20px;
		width: calc(100% - 40px);
		height: 220px;
		padding: 0;
		margin-left: 20px;
		background-color: white;
		border-radius: 10px;
		box-shadow:
			2px 2px 10px rgba(0, 0, 0, 0.05),
			-2px 2px 10px rgba(0, 0, 0, 0.05),
			2px -2px 10px rgba(0, 0, 0, 0.05),
			-2px -2px 10px rgba(0, 0, 0, 0.05);
	}

	.SimilarSinger>.SimilarSinger_bt {
		line-height: 50px;
		height: 50px;
		width: calc(100% - 40px);
		padding: 0 20px;
		font-size: 18px;
		font-weight: bold;
	}

	.SimilarSinger_content {
		width: 100%;
		height: calc(100% - 70px);
	}
</style>