<template>
	<view class="PlaylistTag">
		<view class="bt">
			<image src="../../static/Universalimage/返回.png" alt="" @click="routerReturn()"></image>
			<p class="p">歌单标签</p>
		</view>
		<scroll-view scroll-y="true" class="content">
			<view class="center" v-for="(item,index) in sortObj" :key="index">
				<p>{{item}}</p>
				<view class="mainbody">
					<view @click="routerPush(items.name)" class="block" v-for="(items,indexs) in listArray"
						:key="indexs" v-show="items.category==index">
						<p class="p">{{items.name}}</p>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive
	} from "vue";

	onMounted(() => {
		getPlaylistCatlist();
	})
	let listArray = reactive([]);
	let sortObj = reactive({});

	function getPlaylistCatlist() {
		axios
			.get("/playlist/catlist")
			.then((res) => {
				Object.assign(sortObj, res.data.categories);
				listArray.push(...res.data.sub);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function routerReturn() {
		wx.navigateBack({
			delta: 1, // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
		});
	}

	function routerPush(event) {
		wx.navigateTo({
			url: `/pages/PlaylistTabDetails/index?name=${event}`
		});
	}
</script>

<style scoped>
	.PlaylistTag {
		width: 100vw;
		height: 100vh;
	}

	.bt {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background-color: white;
	}

	.bt>image {
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
		height: 20px;
		width: 20px;
	}

	.bt>.p {
		position: absolute;
		top: 0;
		left: 60px;
		top: 50%;
		transform: translateY(-50%);
		line-height: 60px;
		font-size: 18px;
		color: #283349;
	}

	.content {
		position: absolute;
		top: 60px;
		width: calc(100% - 40px);
		padding: 0 20px;
		height: calc(100% - 60px);
	}

	.center {
		margin-top: 20px;
		width: 100%;
	}

	.center>p {
		line-height: 30px;
		font-size: 15px;
	}

	.mainbody {
		width: 100%;
		display: inline-block;
	}



	.block {
		border-radius: 17.5px;
		padding: 0 5px;
		margin: 5px 7.5px !important;
		background-color: rgba(0, 0, 0, 0.08);
		height: 35px;
		width: calc((100% - 60px) / 4 - 10px);
		float: left;
		overflow: hidden;
	}

	.block>.p {
		line-height: 35px;
		font-size: 13px;
		width: 100%;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>