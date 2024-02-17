<template>
	<view class="Sensibilities">
		<view class="Sensibilities_bt">
			<image @click="routerReturn()" src="@/static/Universalimage/返回three.png" mode=""></image>
			<p class="p">听歌识曲</p>
		</view>
		<view class="bjOne">
			<view class="bjTwo">
				<view class="bjThree">

				</view>
			</view>
		</view>
		<image @click="SensibilitiesTF*=-1" src="./img/麦克风,录音.png" mode=""></image>
		<view class="bj" :class="{bjClick: SensibilitiesTF==1}">

		</view>
		<view class="text">
			<p class="p" v-if="SensibilitiesTF==-1">点击开始识曲</p>
			<p class="p" v-if="SensibilitiesTF==-1">自动识别歌曲播放/人声哼唱</p>
			<p class="p" v-if="SensibilitiesTF==1">识别中&nbsp;{{time}}S</p>
			<p class="p" v-if="SensibilitiesTF==1">点击停止识别</p>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		watch
	} from 'vue';
	let SensibilitiesTF = ref(-1);
	let time = ref(0);
	let TimeData;
	watch(() => SensibilitiesTF.value, (newValue) => {
		if (newValue == -1) {
			time.value = 0;
			clearInterval(TimeData);
		} else {
			TimeData = setInterval(function() {
				time.value++;
			}, 1000);
		}
	})
	function routerReturn() {
		wx.navigateBack({
			delta: 1,
		});
	}
</script>

<style scoped>
	.Sensibilities {
		width: 100vw;
		height: 100vh;
		background-color: #151515;
		position: relative;
		overflow: hidden;
	}

	.Sensibilities_bt {
		width: 100%;
		height: 60px;
		position: absolute;
		top: 0;
		left: 0;
	}
	.Sensibilities_bt>image{
		width: 20px;
		height: 20px;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}
	.Sensibilities_bt>.p {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 35rpx;
		color: white;
		font-weight: bold;
	}

	.Sensibilities>image {
		width: 20vw;
		height: 20vw;
		padding: 5vw;
		background-color: #e61916;
		border-radius: 50%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 99999;
	}

	.bjOne {
		width: calc(100vw - 17.5vw);
		height: calc(100vw - 17.5vw);
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		box-sizing: border-box;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 50%;
	}

	.bjTwo {
		width: calc(100vw - 35vw);
		height: calc(100vw - 35vw);
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		box-sizing: border-box;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 50%;
	}

	.bjThree {
		width: calc(100vw - 52.5vw);
		height: calc(100vw - 52.5vw);
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		box-sizing: border-box;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
	}

	.bj {
		width: calc(100vw - 17.5vw);
		height: calc(100vw - 17.5vw);
		margin-top: calc((100vh - (100vw - 17.5vw)) / 2);
		margin-left: 8.75vw;
		border-radius: 50%;
	}

	.bjClick {
		background-color: #e61916;
		animation: pulse 1300ms infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 0.3;
		}

		50% {
			transform: scale(0.3);
			opacity: 1;
		}

		100% {
			transform: scale(1);
			opacity: 0.3;
		}
	}

	.text {
		width: 100%;
		height: 50px;
		position: absolute;
		top: calc(50% + (50% - ((100vw - 17.5vw) / 2)));
		left: 0;
		transform: translateY(-50%);
		text-align: center;
	}

	.text>.p:nth-of-type(1) {
		font-size: 18px;
		line-height: 30px;
		color: rgba(255, 255, 255, 1.5);
	}

	.text>.p:nth-of-type(2) {
		font-size: 14px;
		line-height: 20px;
		color: rgba(255, 255, 255, 0.8);
	}
</style>