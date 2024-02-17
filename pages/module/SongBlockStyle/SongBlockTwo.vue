<template>
	<view class="SongBlockTwo" @click="click(Props.message.index,Props.message.id)">
		<view class="" :class="{bj:ClickBJ===1}">
			<view class="" :class="{bjTwo:ClickBJ===1}">

			</view>
		</view>
		<view class="one">
			<image :src="Props.message.img" mode=""></image>
		</view>
		<view class="two">
			<view class="name">
				<p class="p">{{Props.message.name}}</p>
				<view>
					<p v-if="Props.message.fee == 1" class="p mv vip">VIP</p>
					<p v-if="Props.message.fee == 1" class="p mv vip">试听</p>
					<p v-if="Props.message.sq !== null && Props.message.hr == null" class="p mv">SQ</p>
					<p v-if="Props.message.hr !== null" class="p mv">Hi-Res</p>
					<p class="p" v-for="(item,index) in Props.message.ar" :key="index">{{item.name}}
						<span class="span" v-if="index<Props.message.ar.length-1">/</span>
					</p>
					<p class="p">&nbsp;-&nbsp;</p>
					<p class="p">{{Props.message.al.name}}</p>
				</view>
			</view>
			<view class="mvDiv" @click.stop="Mv(Props.message.mv)" v-if="Props.message.mv">
				<image src="@/static/SongList/播放2.png" alt="">></image>
			</view>
		</view>
		<view class="three">
			<image @click.stop="moreClick(Props.message)" src="@/static/SongList/更多.png" alt=""></image>
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
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js';
	const myPlayBack = useMyPlayBack();
	import {
		useMyMore
	} from '@/pinia/myMore.js'
	const myMore = useMyMore();
	const Props = defineProps({
		message: Object
	});
	let ClickBJ = ref(null);

	function click(index, center) {
		myPlayBack.postCurrentSong(index, center);
		ClickBJ.value = 1;
		setTimeout(function() {
			ClickBJ.value = null;
			uni.navigateTo({
				url: "/pages/PlayDetails/index?sort=1"
			});
		}, 400)
	}
	function moreClick(event) {
		myMore.TF = true;
		myMore.id = event.id;
	}
	function Mv(event) {
		wx.navigateTo({
			url: '/pages/VideoPlayback/index' + '?id=' + event
		})
	}
</script>

<style scoped>
	.bj {
		width: 100vw;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.15);
		position: absolute;
		top: 0;
		left: -20px;
		z-index: 1;
	}

	.bjTwo {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0px;
		background-color: rgba(0, 0, 0, 0.4);
		animation: shrink 400ms linear 1;
	}

	@keyframes shrink {
		0% {
			transform: scaleX(0);
			opacity: 0;
		}

		100% {
			transform: scaleX(1);
			opacity: 0.5;
		}
	}

	.mv {
		height: 11px;
		border-radius: 2px;
		margin: 0 !important;
		margin-top: 2px !important;
		color: #bcb682 !important;
		font-size: 8px !important;
		padding: 0 3px;
		line-height: 9px !important;
		box-sizing: border-box;
		border: 1px solid #bcb682;
		margin-right: 5px !important;
	}

	.vip {
		color: #d14a57 !important;
		border: 1px solid #d14a57 !important;
	}

	.SongBlockTwo {
		width: 100%;
		height: 40px;
		padding: 10px 0;
		position: relative;
	}

	.one {
		height: 100%;
		width: 40px;
		float: left;
	}

	.one>image {
		height: 100%;
		width: 100%;
		border-radius: 5px;
	}


	.two {
		height: 100%;
		float: left;
		width: calc(100% - 80px);
		display: flex;
		margin-left: 20px;
	}

	.name {
		flex-grow: 1;
		overflow: hidden;
	}

	.name>.p {
		height: 25px;
		width: 100%;
		line-height: 25px;
		font-size: 16px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.name>view {
		height: 15px;
		width: 100%;
		overflow: hidden;
	}

	.name>view>.p {
		line-height: 15px;
	}

	.mvDiv {
		width: 50px;
		height: 100%;
		position: relative;
	}

	.mvDiv>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.three {
		width: 20px;
		height: 100%;
		float: right;
		position: relative;
	}

	.three>image {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 20px;
		height: 20px;
	}

	.name>view>.p {
		float: left;
		line-height: 15px;
		font-size: 13px;
		color: #808080;
		white-space: nowrap;
		font-weight: 300;
	}
</style>