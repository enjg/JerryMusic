<template>
	<view class="LogIn">
		<image src="./img/杰瑞.jpg" mode="widthFix"></image>
		<view class="image">
			<image src="./img/杰瑞.jpg" mode="widthFix"></image>
		</view>
		<view class="content">
			<view class="inputText">
				<p class="p">+86</p>
				<input type="number" v-model="phone" class="input" placeholder="输入手机号" />
			</view>
			<view class="inputButton" :class="{ClickTF:LogInTF===1}">
				<p class="p" @click="LogInClick()">登录</p>
			</view>
		</view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		ref
	} from 'vue';
	let phone = ref('');
	let LogInTF = ref(null);

	function LogInClick() {
		if (phone.value.length != 11) {
			LogInTF.value = 1;
			phone.value = '';
			setTimeout(function() {
				LogInTF.value = -1;
			}, 250);
		} else {
			postCaptchSent(phone.value);
			wx.navigateTo({
				url: '/pages/Verify/index' + '?phone=' + phone.value
			})
		}
	}

	function postCaptchSent(phones) {
		axios
			.get("/captcha/sent", {
				params: {
					phone: phones
				},
			})
			.then((res) => {
			})
			.catch((err) => {
				console.error(err);
			});
	}
</script>

<style scoped>
	.LogIn {
		width: 100vw;
		height: 100vh;
		position: relative;
		overflow: hidden;
		background-color: white;
	}

	.LogIn>image {
		width: 110%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		filter: blur(30px);
	}

	.image {
		width: 65vw;
		height: 65vw;
		position: absolute;
		left: 50%;
		top: 10vh;
		transform: translateX(-50%);
		background-color: red;
		overflow: hidden;
		border-radius: 30px;
		border: 10px solid rgba(255, 255, 255, 1);
	}

	.image>image {
		width: 100%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.content {
		width: 70vw;
		height: 15vh;
		z-index: 9999;
		position: absolute;
		top: 60%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.inputText {
		width: 70vw;
		height: 7vh;
		position: relative;
		border-radius: 1vh;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.inputText>.p {
		width: 80px;
		height: 2vh;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		line-height: 2vh;
		font-size: 35rpx;
		font-weight: bold;
		color: #7a7c88;
		text-align: center;
		border-right: 1px solid #dfe0e2;
	}

	.input {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-left: 100px;
		font-weight: bold;
		font-size: 35rpx;
		color: #2e3142;
	}

	.inputButton {
		width: 70vw;
		height: 6vh;
		position: relative;
		margin-top: 2vh;
		border-radius: 3vh;
		background-color: rgba(82, 134, 148, 0.7);
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		color: rgba(255, 255, 255, 0.8);
		line-height: 6vh;
		text-align: center;
		font-size: 40rpx;
	}

	.ClickTF {
		animation: shake 50ms infinite;
	}

	@keyframes shake {
		0% {
			transform: translateX(0);
		}

		/* 初始位置 */
		25% {
			transform: translateX(-5px);
		}

		/* 左侧移动 */
		75% {
			transform: translateX(5px);
		}

		/* 右侧移动 */
		100% {
			transform: translateX(0);
		}

		/* 返回初始位置 */
	}
</style>