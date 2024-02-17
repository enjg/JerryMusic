<template>
	<view class="SongList">
		<view class="bt">
			<view class="bt_name">
				<image src="@/static/Universalimage/返回.png" alt="" @click="routerReturn()"></image>
				<p class="p">歌单广场</p>
			</view>
			<view class="Topsongscategory">
				<view class="Topsongscategory_content">
					<scroll-view :scroll-with-animation="true" :scroll-animation-duration="500"
						:scroll-left="scrollLeft" 
						class="scroll-view"
						 scroll-x="true" show-scrollbar="false">
						<view :class="{scrollLeft:index==scrollIndex}" 
						class="center" 
						@tap="changeTitle($event,index)"
							data-index="{{index}}" :id="'item' + index" v-for="(item,index) in 
							listArray" :key="index">
							<p class="p">{{item.name}}</p>

						</view>
						<view :style="'left: ' + (scrollLeft + 150) + 'px; width: ' + bjWidth + 'px;'" class="bj">
						</view>
					</scroll-view>
				</view>
				<image @click="routerPush()" src="./img/分类.png" alt=""></image>
			</view>
		</view>
		<swiper duration="300" :current="scrollIndex" @change="swiperChange" class="swiper">
			<swiper-item class="swiper-item" v-for="(item,index) in listArray" :key="index">
				<SongListComponent :message="{name:item.name,id:item.id}"></SongListComponent>
			</swiper-item>
		</swiper>
		<Player />
	</view>
</template>

<script setup>
	import SongListComponent from './SongListComponent/SongListComponent.vue';
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive,
		ref
	} from "vue";


	onMounted(() => {
		getPlaylistHot();
	})

	let listArray = reactive([]);

	function getPlaylistHot() {
		axios
			.get("/playlist/hot")
			.then((res) => {
				listArray.push(...res.data.tags);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function routerReturn() {
		uni.navigateBack({
			delta: 1,
			animationType: 'fade-out',
			animationDuration: 2000
		});
	}

	function routerPush() {
		wx.navigateTo({
			url: "/pages/PlaylistTag/index"
		})
	}

	let scrollLeft = ref(-150);

	let scrollIndex = ref('0');
	let bjWidth = ref(28);

	function changeTitle(event, index) {
		scrollLeft.value = event.target.offsetLeft - 150;
		scrollIndex.value = index;
		let id = '#item' + index;
		const query = uni.createSelectorQuery();
		query.select(id).boundingClientRect(rect => {
			console.log(rect);
			bjWidth.value = rect.width;
		}).exec();
	}

	let swiperIndex = ref(0);

	function swiperChange(event) {
		if (event.detail.current !== scrollIndex.value) {
			swiperIndex.value = event.detail.current;
			let id = '#item' + swiperIndex.value;
			let widthOne = bjWidth.value;
			uni.createSelectorQuery().select(id).boundingClientRect(rect => {
				bjWidth.value = rect.width;
				if (swiperIndex.value < scrollIndex.value) {
					scrollLeft.value = (scrollLeft.value - bjWidth.value - 35);
				}
				if (swiperIndex.value > scrollIndex.value) {
					scrollLeft.value = (scrollLeft.value + widthOne + 35);
				}
				scrollIndex.value = swiperIndex.value;
			}).exec();
		}


	}
</script>

<style scoped>
	.SongList {
		position: relative;
	}

	.bt {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100px;
	}

	.bt_name {
		width: 100%;
		height: 30px;
		position: absolute;
		top: 20px;
	}

	.bt_name>image {
		position: absolute;
		left: 20px;
		width: 20px;
		top: 5px;
		height: 20px;
	}

	.bt_name>.p {
		width: calc(100%);
		height: 30px;
		margin-left: 50px;
		line-height: 30px;
		font-size: 18px;
		font-weight: bold;
		color: #283349;
	}

	.Topsongscategory {
		height: 50px;
		position: absolute;
		top: 50px;
		width: 100%;
	}

	.Topsongscategory>image {
		height: 25px;
		width: 25px;
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.Topsongscategory_content {
		width: calc(100% - 70px);
		height: 50px;
		position: absolute;
		left: 20px;
		overflow: hidden;
	}

	.scrollLeft {
		/* 		transition: all 0.3s ease; */
	}

	.scrollLeft>.p {
		color: #282e3a !important;
	}

	.scroll-view {
		width: 100%;
		height: 100%;
		white-space: nowrap;
		overflow: hidden;
		position: relative;
	}

	.center {
		height: 50px;
		display: inline-block;
		margin-right: 35px;
		z-index: -1;
	}
	.bj {
		width: 15px;
		height: 2px;
		background-color: red;
		position: absolute;
		top: 45px;
		z-index: 9999;
		transition: left 0.5s ease-out, width 0.5s ease;
		transition-delay: 0.1s;
	}

	.center>.p {
		line-height: 50px !important;
		font-weight: bold;
		font-size: 14px;
		color: #9296a2;
	}

	.swiper {
		position: absolute;
		top: 100px;
		width: 100%;
		height: calc(100vh - 100px);
	}

	.swiper-item {
		height: 100%;
	}
</style>