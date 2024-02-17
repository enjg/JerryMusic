<template>
	<view class="NewSong">
		<scroll-view class="scroll-view" scroll-x="true">
			<view class="center" @tap="changeTitle($event,index)" data-index="{{index}}" :id="'item' + index"
				v-for="(item,index) in listArray" :key="index">
				<p :class="{centerClick:index==scrollIndex}" class="p">{{item.name}}</p>
			</view>
			<view :style="'left: ' + (scrollLeft) + 'px; width: ' + bjWidth + 'px;'" class="bj">
			</view>
		</scroll-view>
		<view class="content">
			<swiper duration="300" :current="scrollIndex" @change="swiperChange" class="swiper">
				<swiper-item v-for="(item,index) in listArray" :key="index" class="swiper-item">
					<NewSongBlock :message="{content:item,index:index,sort:scrollIndex}"></NewSongBlock>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script setup>
	import NewSongBlock from '@/pages/module/NewSongBlock/NewSongBlock.vue'
	import {
		onMounted,
		ref,
		getCurrentInstance,
		watch
	} from 'vue';
	let listArray = [{
			name: '全部',
			type: 0
		},
		{
			name: '华语',
			type: 7
		},
		{
			name: '欧美',
			type: 96
		},
		{
			name: '日本',
			type: 8
		},
		{
			name: '韩国',
			type: 16
		}
	]

	let scrollIndex = ref(0);
	let scrollLeft = ref(0);
	let bjWidth = ref(0);

	const instance = getCurrentInstance();
	onMounted(() => {
		const query = uni.createSelectorQuery().in(instance);
		query
			.select("#item0")
			.boundingClientRect((rect) => {
				if (rect) {
					bjWidth.value = rect.width;
				}
			})
			.exec();
	})

	function changeTitle(event, index) {
		scrollLeft.value = event.target.offsetLeft;
		scrollIndex.value = index;
	}

	function swiperChange(event) {
		if (scrollIndex.value > event.detail.current) {
			scrollLeft.value -= (20 + bjWidth.value);
		}
		if (scrollIndex.value < event.detail.current) {
			scrollLeft.value += (20 + bjWidth.value);
		}
		scrollIndex.value = event.detail.current;
	}
</script>

<style scoped>
	.NewSong {
		width: 100%;
		height: 100%;
	}

	.scroll-view {
		width: calc(100% - 40px);
		padding: 0 20px;
		height: 30px;
		white-space: nowrap;
		overflow: hidden;
		position: relative;
	}

	.bj {
		width: 15px;
		height: 5px;
		background-color: red;
		position: absolute;
		top: 25px;
		z-index: 9999;
		border-radius: 2.5px;
		transition: left 0.5s ease-out, width 0.5s ease;
		transition-delay: 0.1s;
		z-index: -1;
	}


	.center {
		float: left;
		width: calc((100% - 80px) / 5);
		height: 30px;
		margin: 0 10px;
	}

	.centerClick {
		color: #292929 !important;
		font-weight: bold !important;
	}

	.center:nth-of-type(1) {
		margin-left: 0;
	}

	.center:nth-of-type(5) {
		margin-right: 0px;
	}

	.center>.p {
		text-align: center;
		line-height: 30px;
		font-size: 14px;
		color: #656565;
		font-weight: 300;
	}

	.content {
		width: 100%;
		height: calc(100% - 30px);
	}

	.swiper {
		width: 100%;
		height: 100%;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
	}
</style>