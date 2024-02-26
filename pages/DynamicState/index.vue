<template>
	<view class="DynamicState">
		<view class="bt">
			<More :sort='1'></More>
		</view>
		<view class="DynamicState_bt">
			<p class="p">关注</p>
		</view>
		<scroll-view class="scroll-view" scroll-y="true">
			<p class="ts" @click="routerPush()" v-if="!myUser.profile.code">请登录</p>
			<DynamicStateBlockOne :message="item" v-for="(item,index) in listArray" :key="index"></DynamicStateBlockOne>
		</scroll-view>
	</view>
</template>

<script setup>
	import DynamicStateBlockOne from '@/pages/module/DynamicStateBlock/DynamicStateBlockOne.vue'
	import More from '@/pages/module/More.vue'
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive,
		ref,
		watch
	} from 'vue';
	import {
		useMyUser
	} from '@/pinia/myUser.js'
	const myUser = useMyUser();

	onMounted(() => {
		if (myUser.profile.code) {
			getEvent(lasttime.value);
		}
		getEvent(lasttime.value);
		if (myUser.cookie !== null) {
			getTopic()
		}
	})
	watch(() => myUser.profile, () => {
		getEvent(lasttime.value);
	}, {
		deep: true
	})
	let listArray = reactive([])
	let lasttime = ref(null);

	function getEvent(lasttimes) {
		axios
			.get("/event", {
				params: {
					lasttime: lasttimes,
					cookie: myUser.cookie
				}
			})
			.then((res) => {
				console.log(res.data)
				listArray.push(...res.data.event);
			})
			.catch((err) => {
				console.error(err);
			});
	}
	// watch(()=>myUser.cookie,(newValue)=>{
	// 	getTopic();
	// })
	// function getTopic() {
	// 	console.log(myUser.cookie)
	// 	axios.get("/hot/topic", {
	// 			params: {
	// 				limit: 30,
	// 				cookie: myUser.cookie
	// 			}
	// 		})
	// 		.then((res) => {
	// 			console.log(res.data);
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 		});
	// }

	function routerPush() {
		wx.navigateTo({
			url: '/pages/LogIn/index'
		})
	}

	function JsonStringObj(event) {
		return JSON.parse(event);
	}

	function formatTimestampToDateString(timestamp) {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		return year + '-' + month + '-' + day;
	}
</script>

<style scoped>
	.bt {
		position: fixed;
		width: 100%;
		height: 60px;
		top: 0;
		left: 0;
		z-index: 999;
	}

	.DynamicState {
		width: 100vw;
		height: 100vh;
		position: relative;
		background-color: #f8f9fe;
	}

	.DynamicState_bt {
		width: 100%;
		height: 60px;
		position: relative;
	}

	.DynamicState_bt>.p {
		text-align: center;
		line-height: 60px;
		color: #31333f;
		font-size: 18px;
	}

	.scroll-view {
		width: 100%;
		height: calc(100% - 60px);
		position: relative;
	}

	.ts {
		text-align: center;
		font-size: 25px;
		font-weight: bold;
		position: absolute;
		top: 25%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.Review_content_center {
		width: calc(100% - 40px);
		padding: 0px 20px;
		position: relative;
		content: "";
		display: table;
		clear: both;
		margin-top: 10px;
	}

	.Review_content_center:nth-of-type(2n) {}

	.Review_content_center>.image {
		width: 35px;
		height: 35px;
		background-color: olivedrab;
		border-radius: 50%;
		float: left;
		position: relative;
		overflow: hidden;
	}

	.Review_content_center>.image>image {
		height: 100%;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.Review_content_center>.details {
		width: calc(100% - 50px);
		float: left;
		margin-left: 10px;
		border-bottom: 1px solid #e9e9e9;
		/* 		padding: 10px 0; */
		padding-bottom: 10px;
	}

	.Review_content_center>.details>.name {
		width: 100%;
		height: 35px;
		position: relative;
	}

	.Review_content_center>.details>.name>.UserDetails {
		width: calc(100% - 50px);
		height: 100%;
		position: absolute;
		left: 0;
	}

	.Review_content_center>.details>.name>.UserDetails>.p:nth-of-type(1) {
		line-height: 25px;
		font-size: 14px;
		color: #676566;
		font-weight: bold;
	}

	.Review_content_center>.details>.name>.UserDetails>.p:nth-of-type(2) {
		line-height: 10px;
		font-size: 10px;
		color: #a19fa0;
	}

	.Review_content_center>.details>.name>.giveLike {
		width: 50px;
		height: 100%;
		position: absolute;
		right: 0;
	}

	.Review_content_center>.details>.name>.giveLike>.p {
		font-weight: 300;
		font-size: 12px;
		line-height: 35px;
	}

	.Review_content_center>.details>.content {
		width: 100%;
		margin-top: 10px;
	}

	.Review_content_center>.details>.content>.p {
		font-size: 14px;
		line-height: 25px;
		color: #343440;
	}
</style>