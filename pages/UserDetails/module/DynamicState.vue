<template>
	<scroll-view :scroll-y="Props.message.TF" class="DynamicState">
		<DynamicStateBlockOne v-for="(item,index) in listArray" :key="index" :message="item"></DynamicStateBlockOne>
		<!-- <view class="Review_content_center" v-for="(item,index) in listArray" :key="index">
			<view class="image">
				<image :src="item.user.avatarUrl" mode="heightFix"></image>
			</view>
			<view class="details">
				<view class="name">
					<view class="UserDetails">
						<p class="p">{{item.user.nickname}}</p>
						<p class="p">{{formatTimestampToDateString(item.showTime)}}</p>
					</view>
				</view>
				<view class="content">
					<p class="p">{{JsonStringObj(item.json).msg}}</p>
					<view class="Song" v-if="JsonStringObj(item.json).song">
						<view class="image">
							<image :src="JsonStringObj(item.json).song.album.picUrl" mode="heightFix"></image>
						</view>
						<view class="details">
							<view class="SongName">
								<p class="p">{{JsonStringObj(item.json).song.name}}</p>
							</view>
							<view class="SongSinger">
								<p class="p" v-for="(item,index) in JsonStringObj(item.json).song.artists" :key="indes">
									{{item.name}}
									<span>/</span>
								</p>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view> -->
	</scroll-view>
</template>



<script setup>
	import DynamicStateBlockOne from '../../module/DynamicStateBlock/DynamicStateBlockOne.vue';
	import axios from '@/axios.js';
	import {
		ref,
		defineProps,
		reactive,
		onMounted
	} from 'vue';
	const Props = defineProps({
		message: Object
	})

	onMounted(() => {
		// 	getUserPlaylist(Props.id);
		getUserEvent(Props.message.id);
	})
	let listArray = reactive([]);
	let lasttimes = ref(-1);

	function getUserEvent(ids) {
		axios
			.get("/user/event", {
				params: {
					uid: ids
				},
			})
			.then((res) => {
				lasttimes.value = res.data.lasttime;
				listArray.push(...res.data.events);
				console.log(res.data)
			})
			.catch((err) => {
				console.error(err);
			});
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
	.DynamicState {
		width: 100%;
		height: 100%;
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

	.Review_content_center>.details>.content>.Song {
		width: calc(100% - 10px);
		padding: 0 5px;
		height: 45px;
		background-color: #ecedf1;
		position: relative;
	}

	.Review_content_center>.details>.content>.Song>.image {
		width: 35px;
		height: 35px;
		position: absolute;
		left: 5px;
		top: 50%;
		transform: translateY(-50%);
		overflow: hidden;
		border-radius: 5px;

	}

	.Review_content_center>.details>.content>.Song>.image>image {
		height: 100%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.Review_content_center>.details>.content>.Song>.details {
		width: calc(100% - 45px);
		height: calc(100% - 10px);
		position: absolute;
		left: 45px;
		padding: 5px 0;
	}

	.Review_content_center>.details>.content>.Song>.details>.SongName {
		height: 20px;
		width: 100%;
		line-height: 20px;
		font-size: 14px;
		color: #2d2c31;
	}

	.Review_content_center>.details>.content>.Song>.details>.SongName>.p {
		width: 100%;
		height: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.Review_content_center>.details>.content>.Song>.details>.SongSinger {
		height: 15px;
		width: 100%;
	}

	.Review_content_center>.details>.content>.Song>.details>.SongSinger>.p {
		float: left;
		line-height: 15px;
		font-size: 12px;
		font-weight: 300;
		color: #77767c;
	}
</style>