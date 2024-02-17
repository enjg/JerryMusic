<template>
	<view class="NewSongBlock">
		<!-- 		<view class="bt">
			<image v-if="Props.message.name=='全部'" src="./img/全部.png" alt=""></image>
			<image v-if="Props.message.name=='华语'" src="./img/华语.png" alt=""></image>
			<image v-if="Props.message.name=='欧美'" src="./img/欧美.png" alt=""></image>
			<image v-if="Props.message.name=='韩国'" src="./img/韩国.png" alt=""></image>
			<image v-if="Props.message.name=='日本'" src="./img/日本.png" alt=""></image>
		</view> -->
		<p v-if="Props.message.content.name=='全部'" class="p">推荐</p>
<!-- 		<p v-if="Props.message.content.name=='全部'" class="p">你不能改变命运，但是你可以改变决定命运的态度。</p> -->
		<p v-if="Props.message.content.name=='华语'" class="p">华语</p>
<!-- 		<p v-if="Props.message.content.name=='华语'" class="p">我原谅不了我，就请你当作我已不在。</p> -->
		<p v-if="Props.message.content.name=='欧美'" class="p">欧美</p>
<!-- 		<p v-if="Props.message.content.name=='欧美'" class="p">雨下整夜我的爱溢出就像雨水，窗台蝴蝶像诗里纷飞的美丽章节。我接着写把永远爱你写进诗的结尾，你是我唯一想要的了解。</p> -->
		<p v-if="Props.message.content.name=='韩国'" class="p">韩国</p>
<!-- 		<p v-if="Props.message.content.name=='韩国'" class="p">我一路向北，离开有你的季节，你说你好累，已无法再爱上谁。风在山路吹，过往的画面全都是不对，细数惭愧，我伤你几回。</p> -->
		<p v-if="Props.message.content.name=='日本'" class="p">日本</p>
<!-- 		<p v-if="Props.message.content.name=='日本'" class="p">能不能给我一首歌的时间，紧紧的把那拥抱变成永远。</p> -->
		<NewSongBj></NewSongBj>
		<view class="content">
			<view class="content_bt">
				<view>
					<image src="@/static/SongList/播放3.png" alt=""></image>
				</view>
				<view>
					<p class="p">播放全部</p>
					<p class="p">({{listArray.length}})</p>
				</view>
				<view>
					<image src="@/static/SongList/列表.png" alt=""></image>
				</view>
			</view>
			<view class="center" @click="SongClick(listArray)">
				<SongBlockTwo
					:message="{name:item.name,mv:item.mvid,ar:item.artists,fee:item.fee,hr:null,sq:null,al:item.album,img:item.album.blurPicUrl,id:item.id,index:index}"
					v-for="(item,index) in listArray" :key="index"></SongBlockTwo>
				<load v-if="!listArray.length"></load>
				<!-- 				<view class="content_center" v-for="(item,index) in listArray" :key="index">
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
				</view> -->
			</view>


		</view>
	</view>
</template>

<script setup>
	import load from '@/pages/module/load.vue'
	import NewSongBj from '@/pages/module/NewSongBj.vue'
	import axios from '@/axios.js';
	import {
		defineProps,
		onMounted,
		reactive,
		watch
	} from "vue";
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js'

	const myPlayBack = useMyPlayBack();
	import SongBlockTwo from '@/pages/module/SongBlockStyle/SongBlockTwo.vue'
	const Props = defineProps({
		message: Object
	});

	onMounted(() => {
		if (Props.message.index == Props.message.sort && !listArray.length) {
			getTopSong(Props.message.content.type)
		}
	});
	let listArray = reactive([]);

	watch(() => Props.message.sort, (newValue) => {
		if (Props.message.index == newValue && !listArray.length) {
			getTopSong(Props.message.content.type)
		}
	})

	function getTopSong(types) {
		axios
			.get("/top/song", {
				params: {
					type: types

				},
			})
			.then((res) => {
				listArray.push(...res.data.data)
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function SongClick(lisArray) {
		myPlayBack.PostAddSongList(listArray)
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

	.NewSongBlock>.p:nth-of-type(1) {
		position: absolute;
		top: 90px;
		left: 30px;
		font-size: 35px;
		color: white;
		font-weight: bold;
		z-index: 9999;
		text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
	}

	.NewSongBlock>.p:nth-of-type(2) {
		position: absolute;
		top: 10px;
		left: 30px;
		height: 130px;
		color: white;
		writing-mode: vertical-rl;
		/* 垂直从右到左 */
		text-orientation: upright;
		/* 保持文字正向 */
		z-index: 9999;
		font-weight: 300;
		text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
	}

	.bt>image {
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

	.content_bt>view:nth-of-type(1)>image {
		width: 8px;
		height: 8px;
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

	.content_bt>view:nth-of-type(2)>.p {
		float: left;
		line-height: 60px;
	}

	.content_bt>view:nth-of-type(2)>.p:nth-of-type(1) {
		font-size: 17px;
		color: black;
	}

	.content_bt>view:nth-of-type(2)>.p:nth-of-type(2) {
		font-size: 14px;
		color: #868485;
	}

	.content_bt>view:nth-of-type(3)>image {
		position: absolute;
		width: 20px;
		height: 20px;
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
		width: calc(100% - 40px);
		padding: 0 20px;
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

	.name>view:nth-of-type(1) {
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