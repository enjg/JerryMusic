<template>
	<view class="MusicalStyle">
		<view class="bt">
			<image src="@/static/Universalimage/返回.png" alt="" @click="routerReturn()"></image>
			<p class="p">曲风分类</p>
		</view>
		<view class="content">
			<view class="content_left">
				<scroll-view scroll-y="true" class="scroll-view">
					<view :class="{ClickName:ClickName==item.tagName,ClassName:ClassName==item.tagName}"
						@touchstart="onTouchStart(item.tagName)" @touchend="onTouchEnd" @click="postObj(item)"
						class="center" v-for="(item,index) in listArray" :key="index">
						<p class="p">{{item.tagName}}</p>
					</view>
				</scroll-view>
			</view>
			<view class="content_right">
				<SortingBlock :message="Obj"></SortingBlock>
			</view>
		</view>
		<Player />
	</view>
</template>

<script setup>
	import SortingBlock from '@/pages/module/SortingBlock/SortingBlock.vue'
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive,
		ref
	} from "vue";
	onMounted(() => {
		getStyleList();
	})
	let Obj = reactive({})

	let listArray = reactive([]);

	function getStyleList() {
		axios
			.get("/style/list")
			.then((response) => {
				listArray.push(...response.data.data);
				postObj(listArray[0]);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function postObj(center) {
		Object.assign(Obj, center);
		ClickName.value = center.tagName;
	}

	let ClickName = ref(null);
	let ClassName = ref(null);

	function onTouchStart(event) {
		ClassName.value = event;
	}

	function onTouchEnd(event) {
		ClassName.value = null;
	}

	function routerReturn() {
		wx.navigateBack({
			delta: 1, // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
		});
	}
</script>

<style scoped>
	.MusicalStyle {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.bt {
		position: absolute;
		top: 0px;
		height: 60px;
		width: 100%;
		z-index: 9999;
	}

	.bt>image {
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
		height: 20px;
		width: 20px;
	}

	.bt>.p {
		width: calc(100%);
		height: 30px;
		line-height: 30px;
		font-size: 18px;
		color: #283349;
		position: absolute;
		left: 80px;
		top: 50%;
		transform: translateY(-50%);
	}

	.content {
		width: 100%;
		height: calc(100vh - 60px);
		position: absolute;
		top: 60px;
	}

	.content_left {
		width: 80px;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.scroll-view {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.center {
		width: 100%;
		height: 50px;
	}

	.center {
		line-height: 50px;
		text-align: center;
		background-color: #fbfbfb;
		font-weight: 300;
	}

	.ClickName {
		font-weight: bold !important;
		background-color: rgba(0, 0, 0, 0.1) !important;
	}

	.ClassName {
		opacity: 0.3;
	}

	.center>.p {
		color: #878787;
		font-size: 13px;
		letter-spacing: 1px;
		/* 		opacity: 0.5; */
	}

	.content_right {
		width: calc(100% - 80px);
		height: 100%;
		position: absolute;
		top: 0;
		left: 80px;
	}
</style>