<template>
	<view class="ShareSort">
		<view class="bj" @click.stop="Click()">

		</view>
		<view class="content" :class="{'contentShowT': ShowTF, 'contentShowF': !ShowTF}">
			<view class="bt">
				<p class="p">分享</p>
				<p class="p">2024新年快乐</p>
				<view class="image">
					<image src="../LogIn/img/杰瑞.jpg" mode="widthFix"></image>
				</view>
			</view>
			<view class="center">
				<view class="center_sort" @touchstart="touchstart(index)" @click="routerPush(index)"
					@touchend="touchend()" v-for="(item,index) in sortArray" :key="index">
					<image :src="item.img" mode=""></image>
					<p class="p">{{item.name}}</p>
					<view class="center_sort_bj" v-if="sortClick==index">
						<view class="center_sort_bj_two">

						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import yyydt from '@/static/Bottomnavigationbar/发现.png'
	import sx from '@/static/Universalimage/邮件.png'
	import {
		ref
	} from 'vue';
	import {
		useMyShare
	} from '../../pinia/myShare';
	const myShare = useMyShare();
	import {
		useMyUser
	} from '@/pinia/myUser.js'
	const myUser = useMyUser();
	let sortArray = [{
		name: '云音乐动态',
		img: yyydt
	}, {
		name: '私信',
		img: sx
	}]
	let ShowTF = ref(true);

	function Click() {
		ShowTF.value = false;
		setTimeout(function() {
			myShare.ShowTF = false;
		}, 300)
	}

	let sortClick = ref(null);

	function touchstart(event) {
		sortClick.value = event;

	}

	function touchend() {
		sortClick.value = null;
	}

	function routerPush(event) {
		if (myUser.profile.code == 200) {
			myShare.ShareSortPost(event);
			if (event == 0) {
				wx.navigateTo({
					url: '/pages/ShareDT/index'
				});
			}
		} else {
			uni.navigateTo({
				url: '/pages/LogIn/index'
			})
		}
		Click()
	}
</script>

<style scoped>
	.ShareSort {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99999;
	}

	.bj {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: -1;
	}

	.content {
		width: 100%;
		height: 35vh;
		background-color: white;
		position: absolute;
		bottom: 0;
		border-top-left-radius: 2.5vh;
		border-top-right-radius: 2.5vh;
	}

	.contentShowT {
		animation: slideFromLeftTwo 0.3s forwards;
	}

	.contentShowF {
		animation: slideFromLeft 0.3s forwards;
	}

	.content>.bt {
		height: 50px;
		width: 100%;
		position: relative;
	}

	.content>.bt>.p:nth-of-type(1) {
		line-height: 50px;
		color: #666666;
		position: absolute;
		left: 20px;
		font-size: 14px
	}

	.content>.bt>.p:nth-of-type(2) {
		line-height: 50px;
		color: #999999;
		position: absolute;
		right: 60px;
	}

	.content>.bt>.image {
		width: 20px;
		height: 20px;
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
		overflow: hidden;
		border-radius: 3px;
		border: 1px solid #747474;
		box-sizing: border-box;
	}

	.content>.bt>.image>image {
		width: 100%;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.centerClick {
		background-color: rgba(0, 0, 0, 0.01);
	}

	.center {
		width: calc(100% - 40px);
		height: 15vh;
		padding: 0 20px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.center_sort_bj_two {
		width: 150%;
		height: 150%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(0, 0, 0, 0.05);
		clip-path: circle(0% at center);
		animation: diffuse 0.3s ease-out forwards;

	}

	@keyframes diffuse {
		0% {
			clip-path: circle(0% at center);
		}

		100% {
			clip-path: circle(50% at center);
		}
	}

	.center_sort_bj {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.2);
		overflow: hidden;
	}

	.center_sort {
		float: left;
		width: 10vh;
		height: 15vh;
		margin-right: 20px;
		position: relative;
	}

	.center_sort>image {
		width: 7vh;
		height: 7vh;
		box-sizing: border-box;
		padding: 2vh;
		border-radius: 50%;
		background-color: #f8f8f8;
		margin-left: 1.5vh;
		margin-top: 2.5vh;
	}

	.center_sort>.p {
		width: 100%;
		line-height: 3vh;
		font-size: 11px;
		text-align: center;
		color: #333333;
	}

	.MoreDetailsTF {
		animation: slideFromLeft 0.3s forwards;
	}

	.MoreDetailsTFTwo {
		animation: slideFromLeftTwo 0.3s forwards;
	}

	@keyframes slideFromLeft {
		from {
			transform: translateY(0);
		}

		to {
			transform: translateY(100%);
		}
	}

	@keyframes slideFromLeftTwo {
		from {
			transform: translateY(100%);
		}

		to {
			transform: translateY(0);
		}
	}
</style>