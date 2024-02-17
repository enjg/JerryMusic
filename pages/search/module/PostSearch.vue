<template>
	<view class="PostSearch">
		<scroll-view scroll-x="true" class="PostSearch_bt">
			<view class="PostSearch_bt_content" @tap="changeTitle($event,index)" :id="'item' + index"
				v-for="(item,index) in sortList" :key="index">
				<p :class="{PostSearchBtContentClick:index==scrollIndex}" class="p">{{item}}</p>
			</view>
			<view :style="'left: ' + (scrollLeft) + 'px; width: ' + bjWidth + 'px;'" class="scrollbj">
			</view>
		</scroll-view>
		<swiper duration="300" :current="scrollIndex" @change="swiperChange" class="swiper">
			<swiper-item>
				<Single></Single>
			</swiper-item>
			<swiper-item>
				<SongList></SongList>
			</swiper-item>
			<swiper-item>
				<Mv></Mv>
			</swiper-item>
			<swiper-item>
				<Singer></Singer>
			</swiper-item>
			<swiper-item>
				<Album></Album>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import Album from '../SearchDetailsComponent/Album.vue'
	import Singer from '../SearchDetailsComponent/Singer.vue'
	import Mv from '../SearchDetailsComponent/Mv.vue'
	import SongList from '../SearchDetailsComponent/SongList.vue'
	import Single from '../SearchDetailsComponent/Single.vue'
	import {
		ref,
		onMounted,
		getCurrentInstance
	} from 'vue'
	let sortList = ['单曲', '歌单', '视频', '歌手', '专辑']

	let bjWidth = ref(0);
	let scrollLeft = ref(20);
	let scrollIndex = ref(0);
	const instance = getCurrentInstance();
	onMounted(() => {
		getWidth();
	})

	function getWidth() {
		const query = uni.createSelectorQuery().in(instance);
		query
			.select('#item1')
			.boundingClientRect((rect) => {
				if (rect) {
					bjWidth.value = rect.width - 40;
				} else {
					getWidth();
				}
			})
			.exec();
	}

	function changeTitle(event, index) {
		scrollLeft.value = (event.currentTarget.offsetLeft + 20);
		scrollIndex.value = index;
	}

	function swiperChange(event) {
		if (scrollIndex.value > event.detail.current) {
			scrollLeft.value -= (40 + bjWidth.value);
		}
		if (scrollIndex.value < event.detail.current) {
			scrollLeft.value += (40 + bjWidth.value);
		}
		scrollIndex.value = event.detail.current;
	}
</script>

<style scoped>
	.PostSearch {
		width: 100%;
		height: calc(100% - 50px);
		position: absolute;
		top: 50px;
		left: 0;
	}

	.PostSearch_bt {
		width: 100%;
		height: 40px;
		position: absolute;
		top: 0;
		white-space: nowrap;
		/* 不换行 */
		overflow: hidden;
	}

	.scrollbj {
		width: 20px;
		height: 5px;
		background-color: red;
		position: absolute;
		top: 25px;
		border-radius: 2.5px;
		transition: left 0.5s ease-out, width 0.5s ease;
		transition-delay: 0.1s;
		z-index: 1;
	}
	.PostSearchBtContentClick{
		font-weight: bold !important;
		color: #313131 !important;
	}
	.PostSearch_bt_content {
		height: 100%;
		width: 20vw;
		float: left;
		text-align: center;
		line-height: 40px;
		font-size: 14px;
		color: #646464;
		z-index: 2;
	}

	.swiper {
		width: 100%;
		height: calc(100% - 40px);
		position: absolute;
		top: 40px;
	}
</style>