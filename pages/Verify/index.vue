<template>
	<view class="Verify">
		<view class="content">
			<view class="phone">
				<p class="p">已发送至{{Props.phone}}</p>
			</view>
			<view class="inputText">
				<input type="number" v-model="VerificationCode" class="input" maxlength="6" placeholder="请输入验证码" />
				<p class="p">重新获取</p>
			</view>
			<view class="fh">
				<image src="/static/Universalimage/返回.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		ref,
		defineProps,
		watch
	} from 'vue';
	import {
		useMyUser
	} from '@/pinia/myUser.js'
	const myUser = useMyUser();
	let VerificationCode = ref('');

	const Props = defineProps({
		phone: String
	})

	watch(() => VerificationCode.value, (newValue) => {
		if (newValue.length == 4) {
			postCaptchaVerify(Props.phone, newValue);
		}
	})

	function postCaptchaVerify(phones, captchas) {
		axios
			.get("/captcha/verify", {
				params: {
					phone: phones,
					captcha: captchas
				},
			})
			.then((res) => {
				if (res.data.code == 200) {
					postLoginCellphone(phones, captchas);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function postLoginCellphone(phones, captchas) {
		axios
			.get("/login/cellphone", {
				params: {
					phone: phones,
					captcha: captchas
				},
			})
			.then((res) => {
				console.log(res.data.cookie)
				myUser.cookie = res.data.cookie;
				getUserDetail(res.data.account.id);
				// Object.assign(myUser.profile, res.data.profile);
				// uni.switchTab({
				// 	url: '/pages/User/index'
				// })
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function getUserDetail(ids) {
		axios
			.get("/user/detail", {
				params: {
					uid: ids
				},
			})
			.then((res) => {
				console.log(res.data)
				Object.assign(myUser.profile, res.data);
				wx.navigateBack({
					delta: 2, // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}
</script>

<style scoped>
	.Verify {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.content {
		width: 70vw;
		height: 20vh;
		position: absolute;
		top: 25%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.content>.phone {
		width: 100%;
		height: 4vh;
		lighting-color: 4vh;
		line-height: 4vh;
		color: #727274;
		font-size: 13px;
	}

	.content>.inputText {
		width: 100%;
		height: 7vh;
		border-radius: 1vh;
		background-color: #f3f3f3;
		position: relative;
	}

	.inputText>.p {
		width: 80px;
		height: 2vh;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		line-height: 2vh;
		font-size: 22rpx;
		font-weight: bold;
		color: #61729d;
		text-align: center;
		border-left: 1px solid #dfe0e2;
	}

	.fh {
		width: 6vh;
		height: 6vh;
		background-color: #f3f3f3;
		border-radius: 50%;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.input {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-left: 20px;
		font-weight: bold;
		font-size: 35rpx;
		color: #2e3142;
		padding-right: 80px;
	}

	.fh>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>