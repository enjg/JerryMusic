<template>
	<view class="More">
		<image v-if="Props.sort==1" @click="Click(1)" src="../../static/Search/分类.png" mode=""></image>
		<image v-if="Props.sort==2"  @click="Click(1)" src="../../static/Search/分类2.png" mode=""></image>
		<view class="content" v-if="ClickTF==1" :class="{contentTwo:ClickCssTF==1}">
			<view class="content_bt">
				<image v-if="myUser.profile.code==200" :src="myUser.profile.profile.avatarUrl" mode=""></image>
				<image v-else src="../../static/Universalimage/用户.png" mode=""></image>
				<p @click="method('用户')" v-if="myUser.profile.code==200" class="p">{{myUser.profile.profile.nickname}}
				</p>
				<p @click="method('立即登录')" v-else class="p">立即登录&nbsp;></p>
			</view>
			<scroll-view class="center" scroll-y="true">
				<view class="content_Tips">
					<image src="../LogIn/img/杰瑞.jpg" mode="widthFix"></image>
					<p class="name">老铁牛逼666</p>
					<p class="Tips">个人项目禁止转载</p>
				</view>

				<view class="center_block" v-for="(item,index) in listArray" :key="index">
					<view class="center_block_bt" v-if="item.name">
						<p class="p">{{item.name}}</p>
					</view>
					<view class="center_block_content" @click="method(items.dataName)"
						v-for="(items,indexs) in item.data" :key="indexs">
						<image :src="items.image" mode=""></image>
						<p class="name">{{items.dataName}}</p>
						<p class="p">></p>
					</view>

				</view>

			</scroll-view>

		</view>
		<view class="bj" @click="Click(0)" v-if="ClickTF==1" :class="{contentTwo:ClickCssTF==1}">

		</view>
	</view>
</template>

<script setup>
	import wdxx from '@/static/Universalimage/邮件.png'
	import zjsc from '@/static/Universalimage/专辑.png'
	import gd from '@/static/Universalimage/歌单.png'
	import fx from '../Album/img/链接.png'
	import gy from '@/static/Universalimage/关于.png'

	import {
		onMounted,
		defineProps
	} from 'vue'
	import {
		ref
	} from 'vue';
	import {
		useMyUser
	} from '@/pinia/myUser.js'
	const myUser = useMyUser();
	const Props = defineProps({
		sort: String
	})
	let listArray = [{
			name: null,
			data: [{
				dataName: '我的消息',
				image: wdxx
			}]
		},
		{
			name: '音乐服务',
			data: [{
					dataName: '专辑商城',
					image: zjsc
				},
				{
					dataName: '歌单广场',
					image: gd
				},
			]
		},
		{
			name: null,
			data: [{
					dataName: '分享杰瑞音乐',
					image: fx
				},
				{
					dataName: '关于',
					image: gy
				},
			]
		}

	]

	function method(event) {
		switch (event) {
			case "专辑商城":
				routerPush('/pages/DigitalAlbum/index')
				break;
			case "歌单广场":
				routerPush('/pages/SongList/index')
				break;
			case "立即登录":
				routerPush('/pages/LogIn/index')
				break;
			case "用户":
				routerPush('/pages/UserDetails/index')
				break;
		}
	}

	function routerPush(center) {
		ClickCssTF.value = 1;
		setTimeout(function() {
			ClickCssTF.value = -1;
			ClickTF.value = 0;
			uni.navigateTo({
				url: center,
			})
		}, 300)

	}

	let ClickTF = ref(-1);
	let ClickCssTF = ref(-1);

	function Click(event) {
		if (event == 0) {
			ClickCssTF.value = 1;
			setTimeout(function() {
				ClickCssTF.value = -1;
				ClickTF.value = 0;
			}, 300)
		} else {
			ClickTF.value = event;
		}
	}
</script>

<style scoped>
	.More {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 20px;
		z-index: 9999999;
	}

	.More>image {
		width: 20px;
		height: 20px;
	}

	.content {
		width: 85vw;
		height: 100vh;
		position: fixed;
		top: -20px;
		left: -20px;
		background-color: #f5f5f5;
		z-index: 2;
		animation: slideFromLeft 0.5s forwards;
	}

	.contentTwo {
		animation: slideFromLeftTwo 0.3s forwards;
	}

	.bj {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: -20px;
		left: -20px;
		background-color: rgba(0, 0, 0, 0.5);
	}

	@keyframes slideFromLeft {
		from {
			transform: translateX(-100%);
		}

		to {
			transform: translateX(0);
		}
	}

	@keyframes slideFromLeftTwo {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(-100%);
		}
	}

	.content_bt {
		width: 100%;
		height: 60px;
		position: absolute;
		top: 0;
		background-color: white;
	}

	.content_bt>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		left: 20px;
		transform: translateY(-50%);
		border: 1px solid black;
		border-radius: 50%;
	}

	.content_bt>.p {
		width: calc(100% - 70px);
		line-height: 60px;
		position: absolute;
		top: 50%;
		left: 50px;
		transform: translateY(-50%);
		color: #313131;
		font-size: 17px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.center {
		width: calc(100% - 40px);
		height: calc(100% - 60px);
		padding: 0 20px;
		position: absolute;
		top: 60px;
	}

	.content_Tips {
		width: calc(100% - 40px);
		padding: 0 20px;
		height: 40vw;
		margin-top: 20px;
		border-radius: 20px;
		position: relative;
		overflow: hidden;
	}

	.content_Tips>image {
		width: 120%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		filter: blur(0px) brightness(0.5);
		opacity: 0.8;
		z-index: -1;
	}

	.content_Tips>.name {
		width: 100%;
		height: 20vw;
		z-index: 2;
		color: white;
		font-size: 45rpx;
		line-height: 20vw;
		font-weight: bold;
		border-bottom: 1px solid rgba(255, 255, 255, 0.5);
		box-sizing: border-box;
	}

	.content_Tips>.Tips {
		width: 100%;
		height: 20vw;
		color: rgba(255, 255, 255, 0.5);
		font-size: 25rpx;
		line-height: 20vw;
	}

	.center_block {
		background-color: white;
		width: 100%;
		margin-top: 20px;
		border-radius: 2vw;
	}

	.center_block_bt {
		height: 40px;
		width: calc(100% - 40px);
		padding: 0 20px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.center_block_bt>.p {
		line-height: 40px;
		color: #989898;
		font-size: 12px;
	}

	.center_block_content {
		height: 60px;
		width: 100%;
		position: relative;
	}

	.center_block_content>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		left: 20px;
		transform: translateY(-50%);
	}

	.center_block_content>.name {
		width: calc(100% - 90px);
		line-height: 60px;
		position: absolute;
		left: 55px;
		color: #323232;
		font-size: 16px;
	}

	.center_block_content>.p {
		line-height: 60px;
		position: absolute;
		right: 20px;
		color: #989898;
	}
</style>