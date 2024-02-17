<template>
	<view class="BestSellerList">
		<view class="bt">
			<image @click="routerReturn()" src="@/static/Universalimage/返回.png" mode=""></image>
			<p class="p">畅销榜</p>
		</view>
		<scroll-view scroll-y="true" class="content">
			<view class="head">
				<view class="head_sortOne">
					<p class="p" :class="{HeadSortClick:HeadSort==0}" @click="HeadSort=0">数字专辑榜</p>
				</view>
				<view class="head_sortTwo">
					<p class="p" :class="{HeadSortClick:HeadSort==1}" @click="HeadSort=1">数字单曲榜</p>
				</view>
			</view>
			<view class="sort">
				<view class="sort_center">
					<p class="p" :class="{sortClick:type=='daily'}" @click="type='daily'">日榜</p>
				</view>
				<view class="sort_center">
					<p class="p" :class="{sortClick:type=='week'}" @click="type='week'">周榜</p>
				</view>
				<view class="sort_center">
					<p class="p" :class="{sortClick:type=='year'}" @click="type='year'">{{year}}年榜</p>
				</view>
				<view class="sort_center">
					<p class="p" :class="{sortClick:type=='total'}" @click="type='total'">总榜</p>
				</view>
			</view>
			<view class="center">
				<view class="center_bt">
					<p class="p">榜单半个小时更新一次</p>
				</view>
				<view class="center_block" @click="Click(item.albumId)" v-for="(item,index) in listArray" :key="index">
					<view class="index">
						<view :class="{
            rise: item.rankIncr>0,
            descend: item.rankIncr<0,
            hold: item.rankIncr==0,
          }">
						</view>
						<p class="p" :class="{indexTop:index+1<=3}">{{index+1}}</p>
						<p class="pTwo" v-if="(item.rankIncr!==0)">{{ Math.abs(item.rankIncr)}}</p>
						<!-- 						<p class="p">{{index+1}}</p> -->
					</view>
					<view class="image">
						<view class="bj">

						</view>
						<view class="bjTwo">

						</view>
						<image :src="item.coverUrl" mode=""></image>
					</view>
					<view class="details">
						<view class="name">
							<p class="p">{{item.albumName}}</p>
						</view>
						<view class="saleNum">
							<p class="p">已售{{item.saleNum}}张</p>
						</view>
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
		reactive,
		ref,
		watch
	} from 'vue';

	let HeadSort = ref(0);
	let type = ref('daily');
	let year = ref(2023);
	onMounted(() => {
		getAlbumSongsaleboard(HeadSort.value, type.value);
	})

	let listArray = reactive([]);

	function getAlbumSongsaleboard(albumTypes, types, years) {
		axios
			.get("/album/songsaleboard", {
				params: {
					// limit: 50,
					// offset: 0,
					albumType: albumTypes,
					type: types,
					year: years
				},
			})
			.then((res) => {
				listArray.push(...res.data.products);
				// listArray.push(...res.data.songs);
				// Object.assign(albumObj, res.data.album);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	watch(() => HeadSort.value, (newValue) => {
		listArray.length = 0;
		getAlbumSongsaleboard(HeadSort.value, type.value);
	})
	watch(() => type.value, (newValue) => {
		listArray.length = 0;
		if (newValue == 'total') {
			getAlbumSongsaleboard(HeadSort.value, type.value, year.value);
		} else {
			getAlbumSongsaleboard(HeadSort.value, type.value);
		}
	})


	function routerReturn() {
		wx.navigateBack({
			delta: 1, // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
		});
	}

	function Click(event) {
		wx.navigateTo({
			url: `/pages/DigitalAlbumDetails/index?id=${event}`
		});
	}
</script>

<style scoped>
	.BestSellerList {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.bt {
		width: 100%;
		height: 60px;
		position: absolute;
		top: 0;
	}

	.bt>image {
		width: 20px;
		height: 20px;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}

	.bt>.p {
		line-height: 60px;
		position: absolute;
		left: 60px;
		font-size: 17px;
		font-weight: bold;
	}

	.content {
		width: 100%;
		height: calc(100% - 60px);
		position: absolute;
		top: 60px;
	}

	.head {
		width: 65vw;
		height: 30px;
		border-radius: 15px;
		position: absolute;
		left: 50%;
		top: 10px;
		transform: translateX(-50%);
		box-sizing: border-box;
		border: 1px solid #999999;
	}

	.HeadSortClick {
		border-radius: 15px;
		background-color: #999999;
		color: white;
	}

	.head>view {
		width: calc(50%);
		height: 100%;
		float: left;
		text-align: center;
		line-height: 30px;
		font-size: 16px;
	}

	.sort {
		width: 100%;
		height: 40px;
		border-top: 1px solid #999999;
		border-bottom: 1px solid #999999;
		box-sizing: border-box;
		position: absolute;
		top: 50px;
	}

	.sort_center {
		float: left;
		height: 100%;
		width: calc(25vw);
		position: relative;
	}

	.sortClick {
		color: #df3a34 !important;
		border-bottom: 2px solid #df3a34 !important;
	}

	.sort_center>.p {
		text-align: center;
		line-height: 38px;
		font-size: 16px;
		color: #303030;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		white-space: nowrap;
	}

	.center {
		width: 100%;
		display: inline-block;
		position: absolute;
		top: 90px;
	}

	.center_bt {
		height: 30px;
		width: calc(100% - 20px);
		padding: 0 10px;
		line-height: 30px;
		font-size: 14px;
	}

	.center_block {
		height: 100px;
		width: calc(100% - 40px);
		padding: 0 20px;
		position: relative;
		margin-bottom: 10px;
	}

	.index {
		width: 50px;
		height: 100%;
		position: absolute;
		left: 0px;
	}

	.image {
		width: 115px;
		height: 100%;
		position: absolute;
		left: 50px;
	}

	.image>image {
		width: 100px;
		height: 100px;
		border-radius: 5px;
		z-index: 3;
	}

	.image>.bj {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		position: absolute;
		right: 0;
		background-color: black;
		z-index: -1;
	}

	.image>.bjTwo {
		height: 95px;
		width: 95px;
		border: 1px solid #999999;
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		border-radius: 0px;
		z-index: -2;
	}

	.details {
		position: absolute;
		left: 175px;
		height: calc(100% - 40px);
		padding: 20px 0;
		width: calc(100% - 195px);
		line-height: 30px;
	}

	.details>.name {
		font-size: 18px;
		color: #373737;
	}

	.details>.saleNum {
		font-size: 13px;
		color: rgba(0, 0, 0, 0.5);
	}

	.indexTop {
		font-weight: bold;
		color: #c94036 !important;
	}

	.index>.p {
		position: absolute;
		font-size: 20px;
		left: 50%;
		top: 25%;
		transform: translate(-50%, -50%);
		color: #a2a2a2;
	}

	.index>.pTwo {
		position: absolute;
		top: 75%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 11px;
	}

	.rise {
		width: 1px;
		height: 6px;
		position: absolute;
		background-color: red;
		top: 75%;
		left: calc(50% - 10px);
		transform: translate(-50%, -50%);
		/* transform: rotate(-40deg);  /* 旋转角度 */
	}

	.rise::after {
		content: "";
		display: block;
		position: absolute;
		left: 50%;
		/* 箭头位置 */
		top: -2px;
		/* 箭头位置 */
		transform: translateX(-50%);
		border-bottom: 4px solid red;
		/* 箭头高低 */
		border-left: 4px solid transparent;
		/* 箭头高低 */
		border-right: 4px solid transparent;
		/* 箭头长度*/
	}

	.descend {
		width: 1px;
		height: 6px;
		position: absolute;
		background-color: green;
		top: 75%;
		left: calc(50% - 10px);
		transform: translate(-50%, -50%);
		/* transform: rotate(-40deg);  /* 旋转角度 */
	}

	.descend::after {
		content: "";
		display: block;
		position: absolute;
		left: 50%;
		/* 箭头位置 */
		bottom: -2px;
		/* 箭头位置 */
		transform: translateX(-50%);
		border-top: 4px solid green;
		/* 箭头高低 */
		border-left: 4px solid transparent;
		/* 箭头高低 */
		border-right: 4px solid transparent;
		/* 箭头长度*/
	}

	.hold {
		width: 5px;
		height: 1.5px;
		position: absolute;
		background-color: #b2b2b2;
		top: 75%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>