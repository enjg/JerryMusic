<template>
	<view class="Leaderboard">
		<view class="bt">
			<image src="@/static/Universalimage/返回.png" alt="" @click="routerReturn()"></image>
			<p class="p">排行榜</p>
		</view>
		<scroll-view scroll-y="true" class="content">
			<view class="GlobalRanking">
				<view class="GlobalRanking_bt">
					<p class="p">榜单推荐</p>
				</view>
				<view class="GlobalRanking_content">
					<view class="GlobalRanking_content_center" v-for="(item,index) in RecommendedListArray"
						:key="index">
						<image mode="widthFix" :src="item.coverImgUrl" @click="routerPush(item.id)" alt=""></image>
						<image src="@/static/Universalimage/播放.png" alt=""></image>
					</view>
				</view>
			</view>
			<view class="OfficialList">
				<view class="OfficialList_bt">
					<image src="@/static/Universalimage/logo.png" alt=""></image>
					<p class="p">官方榜</p>
				</view>
				<OfficialList v-for="(item,index) in authorityArray" :key="index" :message="item">
				</OfficialList>
				<view class="OfficialList_content" @click="routerPushTwo()">
					<view class="OfficialList_center-bt">
						<p class="p">MV榜</p>
					</view>
					<view class="OfficialList_center_zt">
						<view class="OfficialList_center_img">
							<image :src="item.cover" v-for="(item, index) in mvListArray" :key="index"></image>
							<image class="mvImg" src="@/static/Universalimage/播放3.png" alt=""></image>
						</view>
						<view class="OfficialList_center_name">
							<view class="name" v-for="(item, index) in mvListArray" :key="index">
								<view>
									<p class="p">{{index+1}}</p>
								</view>
								<view>
									<p class="p">{{item.name}}</p>
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
			<view class="GlobalRanking">
				<view class="GlobalRanking_bt">
					<p class="p">精选榜</p>
					<p class="p" @click="routerPushThree()">更多 ></p>
				</view>
				<view class="GlobalRanking_content">
					<view class="GlobalRanking_content_center" v-for="(item,index) in listArray" :key="index">
						<image mode="widthFix" :src="item.coverImgUrl" @click="routerPush(item.id)" alt=""></image>
						<image src="@/static/Universalimage/播放.png" alt=""></image>
					</view>
				</view>
			</view>

		</scroll-view>
		<Player />
	</view>
</template>

<script setup>
	import OfficialList from '@/pages/Leaderboard/OfficialList/OfficialList.vue'
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive
	} from "vue";

	onMounted(() => {
		getToplist();
		getTopMv();
	})
	let listArray = reactive([]);
	let authorityArray = reactive([]);

	function getToplist() {
		axios
			.get("/toplist/detail")
			.then((res) => {
				listArray.push(...res.data.list);
				listArray.splice(0, 4);
				authorityArray.push(...res.data.list.slice(0, 4));
				getRandomElements(listArray, 3);
			})
			.catch((err) => {
				console.error(err);
			});
	}
	let RecommendedListArray = reactive([]);

	function getRandomElements(arr, n) {
		const randomElements = [];
		const cloneArr = arr.slice(); // 避免修改原始数组

		for (let i = 0; i < n; i++) {
			const randomIndex = Math.floor(Math.random() * cloneArr.length);
			const element = cloneArr.splice(randomIndex, 1)[0];
			randomElements.push(element);
		}

		RecommendedListArray.push(...randomElements);
	}
	let mvListArray = reactive([])

	function getTopMv() {
		axios
			.get("/top/mv", {
				params: {
					limit: 3
				},
			})
			.then((res) => {
				mvListArray.push(...res.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function routerPush(event) {
		wx.navigateTo({
			url: `/pages/PlaylistDetails/index?id=${event}`
		})
	}

	function routerPushTwo() {
		wx.navigateTo({
			url: '/pages/MvCharts/index'
		})
	}

	function routerReturn() {
		wx.navigateBack({
			delta: 1, // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
		});
	}

	function routerPushThree() {
		wx.navigateTo({
			url: '/pages/MusicalStyle/index'
		})
	}
</script>

<style scoped>
	.Leaderboard {
		width: 100vw;
		height: 100vh;
		position: relative;
		background: linear-gradient(to bottom, rgba(230, 236, 250, 1), rgba(230, 236, 250, 0.2));
	}

	.bt {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background-color: rgba(230, 236, 250, 1);
		z-index: 9999;
	}

	.bt>image {
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
	}

	.bt>.p {
		position: absolute;
		left: 60px;
		top: 50%;
		transform: translateY(-50%);
		line-height: 60px;
		font-size: 18px;
		font-weight: bold;
		color: #283349;
	}

	.content {
		width: 100vw;
		height: calc(100vh - 60px);
		position: absolute;
		top: 60px;
	}

	.GlobalRanking {
		width: calc(100% - 40px);
		padding: 0 20px;
	}

	.GlobalRanking_bt {
		height: 40px;
	}

	.GlobalRanking_bt>.p {
		line-height: 40px;
		font-size: 17px;
		font-weight: bold;
		float: left;
		color: #273039;
	}

	.GlobalRanking_bt>.p:nth-of-type(2) {
		font-size: 14px;
		height: 15px;
		margin: 10px;
		padding: 2.5px 10px;
		line-height: 15px;
		background-color: #ecedf2;
		border-radius: 20px;
		color: #58595e;
	}

	.GlobalRanking_content {}

	.GlobalRanking_content_center {
		width: calc((100% - 20px) / 3);
		height: calc((100vw - 60px) / 3);
		float: left;
		margin-bottom: 10px;
		position: relative;
	}

	.GlobalRanking_content_center:nth-of-type(3n-1) {
		margin: 0 10px;
	}

	.GlobalRanking_content_center>image:nth-of-type(1) {
		width: 100%;
		border-radius: 15px;
	}

	.GlobalRanking_content_center>image:nth-of-type(2) {
		width: 18px;
		height: 18px;
		position: absolute;
		bottom: 10px;
		right: 10px;
		opacity: 0.7;
	}


	.OfficialList {
		padding: 0 20px;
		width: calc(100vw - 40px);
		position: relative;
		display: inline-block;
		margin-top: 20px;
	}

	.OfficialList_bt {
		height: 40px;
		position: relative;
	}

	.OfficialList_bt>.p {
		position: absolute;
		left: 30px;
		line-height: 40px;
		font-size: 16px;
		font-weight: bold;
	}

	.OfficialList_bt>image {
		float: left;
		width: 15px;
		height: 15px;
		padding: 5px;
		border-radius: 50%;
		background-color: #f63d43;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.OfficialList_content {
		width: 100%;
		height: 100px;
		background-color: bisque;
		border-radius: 15px;
		background-color: white;
		box-shadow:
			2px 0px 2px rgba(200, 200, 200, 0.1),
			0px 2px 2px rgba(200, 200, 200, 0.1),
			-2px 0px 2px rgba(200, 200, 200, 0.1),
			0px -2px 2px rgba(200, 200, 200, 0.1);
		overflow: hidden;
		margin-bottom: 20px;
	}

	.OfficialList_center-bt {
		width: calc(100% - 40px);
		height: 35px;
		padding: 0 20px;
	}

	.OfficialList_center-bt>.p {
		line-height: 35px;
		font-weight: bold;
	}

	.OfficialList_center_zt {
		width: calc(100% - 40px);
		height: 55px;
		padding: 0 20px;
		position: relative;
	}

	.OfficialList_center_img {
		height: 55px;
		width: 75px;
		position: absolute;
		left: 20px;
	}

	.OfficialList_center_img>image:nth-of-type(1) {
		z-index: 3;
		position: absolute;
		left: 0;
		height: 100%;
		width: 55px;
		border-radius: 10px;
	}

	.OfficialList_center_img>image:nth-of-type(2) {
		z-index: 2;
		position: absolute;
		left: 20px;
		height: 80%;
		width: 44px;
		bottom: 0;
		opacity: 0.3;
		border-radius: 10px;
	}

	.OfficialList_center_img>image:nth-of-type(3) {
		z-index: 1;
		position: absolute;
		left: 40px;
		height: 60%;
		bottom: 0;
		opacity: 0.1;
		border-radius: 10px;
		width: 33px;
	}

	.OfficialList_center_name {
		width: calc(100% - 130px);
		height: 100%;
		position: absolute;
		left: 110px;
	}

	.name {
		height: 15px;
	}

	.name>view:nth-of-type(1) {
		width: 20px;
	}

	.name>view:nth-of-type(2) {
		width: calc(100% - 20px);
		height: 100%;
		overflow: hidden;
	}

	.name>view:nth-of-type(2)>.p {
		float: left;
	}

	.name>view:nth-of-type(2)>.p:nth-of-type(2) {
		margin: 0 5px;
	}

	.name>view {
		float: left;
	}

	.name .p {
		margin: 0;
		height: 15px;
		font-size: 10px;
		line-height: 15px;
		font-weight: 300;
	}

	.name>view>.p:nth-child(1) {
		font-weight: bold;
	}

	.name:nth-of-type(3n-1) {
		margin: 5px 0;
	}

	.mvImg {
		width: 15px;
		height: 15px;
		position: absolute;
		z-index: 999;
		left: 35px;
		bottom: 5px;
	}
</style>