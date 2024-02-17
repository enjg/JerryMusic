<template>
	<view class="AlbumBlack" @click="Click(Props.message.id,Props.message.sort)">
		<view class="image">
			<view class="bjOne">
			</view>
			<view class="bjTwo">
			</view>
			<view class="bjThree">

			</view>
			<image :src="Props.message.img" mode=""></image>
		</view>
		<view class="name">
			<p class="p">{{Props.message.name}}</p>
		</view>
		<view class="artis">
			<p class="p">
				<span class="span" v-for="(item,index) in Props.message.artists" :key="index">
					{{item.name}}<span v-if="index<Props.message.artists.length-1">/</span>
				</span>
			</p>

		</view>

	</view>
</template>

<script setup>
	import {
		defineProps,
		onMounted,
		reactive,
		ref
	} from "vue";

	const Props = defineProps({
		message: Object
	});

	function Click(event, sort) {
		if (sort == 1) {
			uni.navigateTo({
				url: `/pages/DigitalAlbumDetails/index?id=${event}`
			});
		} else if (sort == 2) {
			uni.navigateTo({
				url: `/pages/Album/index?id=${event}`
			})
		}

	}
</script>

<style scoped>
	.AlbumBlack {
		width: 100%;
		height: 100%;
	}

	.image {
		width: 100%;
		height: calc(100% - 6vh);
		position: relative;
	}

	.bjOne {
		width: 85%;
		height: 100%;
		background-color: black;
		border-radius: 50%;
		position: absolute;
		right: 0;
	}

	.bjTwo {
		width: calc(80%);
		height: calc(100% / 0.85 * 0.8);
		position: absolute;
		left: 8%;
		top: 50%;
		transform: translateY(-50%);
		border: 1px solid rgba(0, 0, 0, 0.2);
		z-index: 2;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.bjThree {
		width: 15%;
		height: calc(100% / 0.85 * 0.15);
		background-color: black;
		position: absolute;
		border-radius: 50%;
		right: 4%;
		top: 50%;
		transform: translateY(-50%);
		z-index: 3;
	}

	.image>image {
		width: 85%;
		height: 100%;
		position: absolute;
		left: 0;
		z-index: 4;
		border-radius: 3%;
	}

	.name {
		width: 100%;
		height: 4vh;
		line-height: 4vh;

	}

	.name>.p {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 28rpx;
	}

	.artis {
		width: 100%;
		height: 2vh;
		line-height: 2vh;
		font-size: 11px;
		color: #818181;
	}

	.artis>.p {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>