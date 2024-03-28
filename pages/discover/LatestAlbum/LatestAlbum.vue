<template>
	<view class="LatestAlbum">
		<view class="bt">
			<p class="p" @click="routerPush()">新歌新碟></p>
		</view>
		<swiper class="swiper" next-margin="20px">
			<swiper-item class="swiper-item">
				<view class="content">
					<view class="center" :class="{ pulseClick:pulseId==item.id}" @click="Click(index,item.id,listArray)"
						v-for="(item,index) in listArray" :key="index" v-show="index<3">
						<image mode="heightFix" :src="item.picUrl+'?param=100y100'" alt=""></image>
						<view class="details">
							<p class="p">{{item.name}}</p>
							<view>
								<view v-for="(items,indexs) in item.song.artists" :key="indexs">
									<p class="p">{{items.name}}</p>
									<p class="p" v-if="indexs<item.song.artists.length-1">&nbsp;/&nbsp;</p>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<view class="content">
					<view class="center" :class="{ pulseClick:pulseId==item.id}" @click="Click(index,item.id,listArray)"
						v-for="(item,index) in listArray" :key="index" v-show="index>2">
						<image mode="heightFix" :src="item.picUrl+'?param=100y100'" alt=""></image>
						<view class="details">
							<p class="p">{{item.name}}</p>
							<view>
								<view v-for="(items,indexs) in item.song.artists" :key="indexs">
									<p class="p">{{items.name}}</p>
									<p class="p" v-if="indexs<item.song.artists.length-1">&nbsp;/&nbsp;</p>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<view class="content">
					<view class="center" :class="{ pulseClick:pulseId==item.id}" @click="albumClick(item.id)"
						v-for="(item,index) in albumListArray" :key="index" v-show="index<3">
						<view class="bj">

						</view>
						<image mode="heightFix" :src="item.picUrl+'?param=100y100'" alt=""></image>
						<view class="details">
							<p class="p">{{item.name}}</p>
							<view>
								<p class="p">{{item.company}}</p>
								<p class="p">&nbsp;-&nbsp;</p>
								<p class="p">{{item.artist.name}}</p>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<view class="content">

					<view class="center" :class="{ pulseClick:pulseId==item.id}" @click="albumClick(item.id)"
						v-for="(item,index) in albumListArray" :key="index" v-show="index>2">
						<view class="bj">

						</view>
						<image mode="heightFix" :src="item.picUrl+'?param=100y100'" alt=""></image>
						<view class="details">
							<p class="p">{{item.name}}</p>
							<view>
								<p class="p">{{item.company}}</p>
								<p class="p">&nbsp;-&nbsp;</p>
								<p class="p">{{item.artist.name}}</p>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive,
		ref
	} from "vue";
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js'

	const myPlayBack = useMyPlayBack();
	// onMounted(() => {
		getPersonalizedNewsong();
		getAlbumNewest();
	// })
	let listArray = reactive([]);

	function getPersonalizedNewsong() {
		axios
			.get("/personalized/newsong", {
				params: {
					limit: 6,
				},
			})

			.then((response) => {
				listArray.push(...response.data.result);
			})
			.catch((error) => {
				console.error(error);
			});
	}
	let albumListArray = reactive([])

	function getAlbumNewest() {
		axios
			.get("/album/newest", {
				params: {
					limit: 6,
				},
			})

			.then((response) => {
				albumListArray.push(...response.data.albums.slice(0, 6));
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function Click(index, event, list) {
		pulseId.value = event;
		setTimeout(function() {
			pulseId.value = null;
			if (myPlayBack.id == event) {
				uni.navigateTo({
					url: "/pages/PlayDetails/index?sort=1"
				});
			} else {
				myPlayBack.PostAddSongList(list);
				myPlayBack.postCurrentSong(index, event);
			}
		}, 500)
	}

	let pulseId = ref(null);


	function albumClick(event) {
		pulseId.value = event;
		setTimeout(function() {
			pulseId.value = null;
			wx.navigateTo({
				url: `/pages/Album/index?id=${event}`
			})
		}, 500)

	}

	function routerPush() {
		wx.navigateTo({
			url: '/pages/NewSongsAlbums/index'
		})
	}
</script>

<style scoped>
	.LatestAlbum {
		width: calc(100% - 20px);
		margin-left: 20px;
	}

	.bt {
		height: 50px;
	}

	.bt>.p {
		line-height: 50px;
		font-weight: bold;
		font-size: 18px;
	}

	.swiper {
		height: 200px;
	}

	.swiper-item {
		width: 100%;
		height: 200px;
	}

	.content {
		width: calc(100% - 10px);
		height: 100%;
	}

	.center {
		height: 56.5px;
		position: relative;
		margin-top: 10px;
	}

	.pulseClick {
		animation: pulse 500ms 1;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 1;
		}

		50% {
			transform: scale(0.95);
			opacity: 0.5;
		}

		100% {
			transform: scale(1);
			opacity: 1;
		}
	}


	.center.center:nth-of-type(3n-1) {}

	.center>image {
		height: 100%;
		border-radius: 8px;
		position: absolute;
		left: 0;
		top: 0;
	}

	.details {
		position: absolute;
		left: 70px;
		height: calc(100% - 20px);
		padding: 10px 0px;
		width: calc(100% - 70px);
	}

	.details>view>view {
		float: left;
	}

	.details>.p {
		line-height: 25px;
		color: #44404e;
		font-weight: bold;
		font-size: 14px;
		width: 100%;
		white-space: nowrap;
		/* 防止文本换行 */
		overflow: hidden;
		/* 隐藏超出容器的文本 */
		text-overflow: ellipsis;
		/* 用省略号代替超出的文本 */
	}

	.details>view .p {
		float: left;
		line-height: 15px;
		font-size: 12px;
		color: #757a80;
	}

	.bj {
		height: 50.5px;
		background-color: black;
		width: 50.5px;
		position: absolute;
		z-index: -1;
		border-radius: 50%;
		top: -5px;
		left: 2.5px;
	}
</style>