<template>
	<view class="SingerList">
		<view class="SingerList_bt">
			<image src="@/static/Universalimage/返回.png" @click="routerReturn()" mode=""></image>
			<p class="p">歌手分类</p>
		</view>
		<view class="typearea">
			<p class="p" :class="{ click: area == 7 }" @click="area=7">华语</p>
			<p class="p" :class="{ click: area == 96 }" @click="area=96">欧美</p>
			<p class="p" :class="{ click: area == 8 }" @click="area=8">日本</p>
			<p class="p" :class="{ click: area == 16 }" @click="area=16">韩国</p>
			<p class="p" :class="{ click: area == 0 }" @click="area=0">其他</p>
		</view>
		<view class="typearea">
			<p class="p" :class="{ click: type == 1 }" @click="type=1">男</p>
			<p class="p" :class="{ click: type == 2 }" @click="type=2">女</p>
			<p class="p" :class="{ click: type == 3 }" @click="type=3">乐队/组合</p>
		</view>
		<scroll-view class="content" scroll-y @scrolltoupper="handleScrollToUpper" @scrolltolower="handleScrollToLower">
			<view class="center" v-for="(item,index) in ListObj" :key="index">
				<view class="block" v-if="item.list.length">
					<view class="Singer_bt">
						<p class="p">{{item.name}}</p>
					</view>
					<view class="Singer" @click="routerPush(items.id)" v-for="(items,indexs) in item.list"
						:key="indexs">
						<view class="image">
							<image :src="items.img1v1Url" mode="heightFix"></image>
						</view>
						<view class="name">
							<p class="p">{{items.name}}</p>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<Player />
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		onMounted,
		reactive,
		ref,
		watch
	} from 'vue';
	onMounted(() => {
		getArtistList(0, 20, -1, -1, null)
	})
	let ListObj = reactive(
		[{
				name: '热门歌手',
				list: []
			},
			{
				name: 'A',
				list: []
			},
			{
				name: 'B',
				list: []
			},
			{
				name: 'C',
				list: []
			},
			{
				name: 'D',
				list: []
			},
			{
				name: 'E',
				list: []
			},
			{
				name: 'F',
				list: []
			},
		])

	function getArtistList(offsets, limits, types, areas, initials) {
		axios
			.get("/artist/list", {
				params: {
					limit: limits,
					offset: offsets,
					type: types,
					area: areas,
					initial: initials
				},
			})
			.then((res) => {
				postListObj(res.data.artists);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function handleScrollToUpper() {
	}
	let type = ref(-1);
	let area = ref(-1);
	watch(() => type.value, (newValue) => {
		if (area.value == -1) {
			area.value = 7;
		} else {
			ClearData();
		}
	})
	watch(() => area.value, (newValue) => {
		if (type.value == -1) {
			type.value = 1;
		} else {
			ClearData();
		}
	})

	function ClearData() {
		index.value = 0;
		ListObj.forEach((element, index) => {
			element.list.length = 0;
		})
		getArtistList(ListObj[index.value].list.length, 20, type.value, area.value, null);
	}

	function handleScrollToLower() {
		if (type.value == -1 && ListObj[0].list.length < 100) {
			getArtistList(ListObj[0].list.length, 20, type.value, area.value, null);

		}
		if (type.value != -1) {
			switch (index.value) {
				case 0:
					getArtistList(ListObj[index.value].list.length, 20, type.value, area.value, null);
					break;
				case 1:
					getArtistList(ListObj[index.value].list.length, 20, type.value, area.value, 'a');
					break;
				case 2:
					getArtistList(ListObj[index.value].list.length, 20, type.value, area.value, 'b');
					break;
				case 3:
					getArtistList(ListObj[index.value].list.length, 20, type.value, area.value, 'c');
					break;
				case 4:
					getArtistList(ListObj[index.value].list.length, 20, type.value, area.value, 'd');
					break;
				case 5:
					getArtistList(ListObj[index.value].list.length, 20, type.value, area.value, 'e');
					break;
			}
		}


	}
	let index = ref(0);

	function postListObj(center) {
		if (ListObj[index.value].list.length == 100) {
			index.value += 1;
		}
		ListObj[index.value].list.push(...center);
	}

	function routerPush(event) {
		wx.navigateTo({
			url: '/pages/Singer/index?id=' + event
		})
	}
	function routerReturn() {
		wx.navigateBack({
			delta: 1, 
		});
	}
</script>

<style scoped>
	.click {
		color: #e33f3e !important;
	}

	.SingerList {
		width: 100vw;
		height: 100vh;
	}

	.SingerList_bt {
		height: 60px;
		width: 100%;
		position: relative;
	}

	.SingerList_bt>image {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 50%;
		left: 20px;
		transform: translateY(-50%);
	}

	.SingerList_bt>.p {
		line-height: 60px;
		font-size: 18px;
		position: absolute;
		left: 60px;
	}

	.typearea {
		width: calc(100% - 40px);
		padding: 0 20px;
		height: 40px;
	}

	.typearea>.p {
		float: left;
		font-size: 15px;
		line-height: 40px;
		margin-right: 30px;
		color: #6b6b6b;
	}

	.content {
		width: 100%;
		height: calc(100% - 140px);
		overflow-y: auto;
	}

	.Singer_bt {
		width: calc(100% - 20px);
		padding: 0 10px;
		height: 25px;
		background-color: #f3f3f3;
		font-size: 14px;
		line-height: 25px;
	}

	.Singer {
		height: 50px;
		width: 100%;
		padding: 10px 0;
		position: relative;
	}

	.image {
		width: 50px;
		height: 50px;
		overflow: hidden;
		border-radius: 50%;
		position: absolute;
		left: 10px;
	}

	.image>image {
		height: 100%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.name {
		line-height: 50px;
		position: absolute;
		left: 70px;
		font-size: 15px;
	}
</style>