<template>
	<view class="SortingBlock">
		<view class="img">
			<p class="p">{{Props.message.tagName}}</p>
			<p class="p">{{Props.message.enName}}</p>
			<image mode="widthFix" :src="Props.message.picUrl" alt=""></image>
			<view class="content">
				<scroll-view scroll-x="true" class="scroll-view">
					<view class="center" v-for="(item,index) in Props.message.childrenTags">
						<p class="p">{{item.tagName}}</p>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="SortingBlock_content">
			<view class="SortingBlock_content_center" v-for="(item,index) in Props.message.childrenTags">
				<view @touchstart="onTouchStart(item.tagName)" @touchend="onTouchEnd" @click="routerPush(item.tagId)"
					class="SortingBlock_content_center_view SortingBlock_content_center_view_One">
					<p :class="{ClassName:ClassName==item.tagName}" class="p">{{item.tagName}}</p>
					<p :class="{ClassName:ClassName==item.tagName}" class="p">{{item.enName}}</p>
				</view>
				<view @touchstart="onTouchStart(items.tagName)" @touchend="onTouchEnd" @click="routerPush(items.tagId)"
					class="SortingBlock_content_center_view" v-for="(items,indexs) in item.childrenTags" :key="indexs">
					<p :class="{ClassName:ClassName==items.tagName}" class="p">{{items.tagName}}</p>
					<p :class="{ClassName:ClassName==items.tagName}" class="p">{{items.enName}}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		watch,
		defineProps,
		ref
	} from "vue";
	const Props = defineProps({
		message: Object,
	});

	function routerPush(event) {
		wx.navigateTo({
			url: '/pages/MusicalStyleDetails/index?id=' + event
		})
	}

	let ClassName = ref(null);

	function onTouchStart(event) {
		ClassName.value = event;
	}

	function onTouchEnd(event) {
		ClassName.value = null;
	}
</script>

<style scoped>
	.SortingBlock {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.img {
		display: inline-block;
		width: 100%;
	}

	.img>image {
		width: 100%;
	}

	.img>.p:nth-of-type(1) {
		font-size: 20px;
		color: white;
		position: absolute;
		top: 10px;
		left: 20px;
	}

	.img>.p:nth-of-type(2) {
		font-size: 10px;
		color: rgba(255, 255, 255, 0.7);
		position: absolute;
		top: 40px;
		left: 20px;
	}

	.content {
		width: 100%;
		height: 40px;
		background-color: #e7eaf1;
		margin-top: -4px;
	}

	.scroll-view {
		width: 100%;
		height: 40px;
		white-space: nowrap;
		overflow: hidden;
		background-color: #f5f5f5;
	}

	.center {
		margin: 3px 10px;
		height: 34px;
		background-color: #e3e3e3;
		display: inline-block;
		border-radius: 17px;
		padding: 0 10px;
	}

	.center>.p {
		line-height: 34px;
		font-size: 13px;
	}

	.SortingBlock_content {
		width: 100%;
		flex: 1;
		overflow-y: auto;

	}

	.SortingBlock_content_center_view_One>.p:nth-of-type(1) {
		font-size: 16px !important;
		font-weight: bold !important;
	}

	.SortingBlock_content_center_view_One {
		border-bottom: 1px solid #d0d0d0;
		margin-top: 20px;
	}

	.SortingBlock_content_center_view {
		width: calc(100% - 10px);
		height: 40px;
		padding: 10px 0;
		margin-left: 10px;
	}

	.ClassName {
		opacity: 0.3;
	}

	.SortingBlock_content_center_view>.p {
		font-weight: 300;
	}

	.SortingBlock_content_center_view>.p:nth-of-type(1) {
		line-height: 25px;
		font-size: 14px;
	}

	.SortingBlock_content_center_view>.p:nth-of-type(2) {
		line-height: 15px;
		font-size: 12px;
		color: #d0d0d0;
	}
</style>