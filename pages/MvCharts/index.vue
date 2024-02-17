<template>
	<view class="MvCharts">
		<view class="bt">
			<view class="bt_name">
				<image src="@/static/Universalimage/返回.png" alt="" @click="routerReturn()"></image>
				<p class="p">MV排行榜</p>
			</view>
			<view class="Topsongscategory">
				<view class="Topsongscategory_content">
					<scroll-view class="scroll-view" scroll-x="true" show-scrollbar="false">
						<view class="center" @tap="changeTitle($event,index)" :id="'item' + index"
							v-for="(item,index) in listArray" :key="index">
							<p :class="{centerClick:index==scrollIndex}" class="p">{{item}}</p>
						</view>
						<view :style="'left: ' + (scrollLeft) + 'px; width: ' + bjWidth + 'px;'" class="scrollbj">
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
	<swiper duration="300" :current="scrollIndex" @change="swiperChange" class="swiper">
		<swiper-item class="swiper-item" v-for="(item,index) in listArray" :key="index">
			<MvList :message="{name:item}"></MvList>
			<!-- 						<SongListComponent :message="{name:item.name,id:item.id}"></SongListComponent> -->
		</swiper-item>
	</swiper>

</template>

<script setup>
	import {
		onMounted,
		ref,
		getCurrentInstance
	} from 'vue';
	import MvList from './MvAssemble/MvList.vue'
	let listArray = ['内地', '港台', '欧美', '韩国', '日本']
	let bjWidth = ref(0);
	let scrollLeft = ref(10);
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
					bjWidth.value = rect.width - 20;
				} else {
					getWidth();
				}
			})
			.exec();
	}


	function changeTitle(event, index) {
		scrollLeft.value = (event.currentTarget.offsetLeft + 10);
		scrollIndex.value = index;
	}

	function swiperChange(event) {
		if (scrollIndex.value > event.detail.current) {
			scrollLeft.value -= (50 + bjWidth.value);
		}
		if (scrollIndex.value < event.detail.current) {
			scrollLeft.value += (50 + bjWidth.value);
		}
		scrollIndex.value = event.detail.current;
	}

	function routerPush(event) {
		wx.navigateTo({
			url: `/pages/PlaylistDetails/index?id=${event}`
		})
	}

	function routerReturn() {
		wx.navigateBack({
			delta: 1, // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
		});
	}
</script>

<style scoped>
	.SongList {
		position: relative;
	}

	.bt {
		position: fixed;
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
		top: 5px;
		width: 20px;
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

	.Topsongscategory_content {
		width: calc(100% - 40px);
		height: 50px;
		position: absolute;
		left: 20px;
		white-space: nowrap;
		overflow: hidden;
	}

	.scroll-view {
		white-space: nowrap;
		/* 不换行 */
		overflow: hidden;
		height: 50px;
		width: 100%;
		position: relative;
	}

	.scrollbj {
		width: 20px;
		height: 5px;
		background-color: red;
		position: absolute;
		top: 35px;
		border-radius: 2.5px;
		transition: left 0.5s ease-out, width 0.5s ease;
		transition-delay: 0.1s;
		z-index: 2;
	}

	.centerClick {
		font-weight: bold !important;
		color: #313131 !important;
	}

	.center {
		float: left;
		height: 50px;
		width: calc((100% - 120px) / 5);
		margin: 0 15px;
		text-align: center;
	}

	.center:nth-of-type(1) {
		margin-left: 0;
	}

	.center:nth-of-type(5) {
		margin-right: 0;
	}

	.center>.p {
		line-height: 50px;
		font-size: 15px;
		color: #9296a2;
	}

	.swiper {
		position: fixed;
		top: 100px;
		width: 100%;
		height: calc(100vh - 100px);
	}

	.swiper-item {
		height: 100%;
	}
</style>