<template>
	<view class="LeaderboardBlock">
		<view class="bt">
			<p class="p">{{listObj.name}}></p>
		</view>
		<view class="content">
			<view class="center" :class="{ pulseClick:pulseId==item.id}" @click="pulseClick(index,item.id,listArray)"
				v-for="(item,index) in listArray.slice(0,3)" :key="index">
				<image mode="heightFix" :src="item.al.picUrl" alt=""></image>
				<p class="p">{{index+1}}</p>
				<view class="details">
					<p class="p">{{item.name}}</p>
					<view>
						<p v-for="(items,indexs) in item.ar" :key="indexs" class="p">
							{{items.name}}<span v-if="indexs<item.ar.length-1">&nbsp;/&nbsp;</span>
						</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		defineProps,
		onMounted,
		reactive,
		ref
	} from "vue";
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js'

	const myPlayBack = useMyPlayBack();
	const Props = defineProps({
		message: Object,
	});
	let listObj = reactive({
		name: '111'
	});
	let listArray = reactive([]);
	onMounted(() => {
		getPlaylistDetail(Props.message.id)
	})

	function getPlaylistDetail(ids) {
		axios
			.get("/playlist/detail", {
				params: {
					id: ids,
				},
			})

			.then((response) => {
				listObj.name = response.data.playlist.name;
				listObj.playCount = response.data.playlist.playCount;
				listArray.push(...response.data.playlist.tracks);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	let pulseId = ref(null);

	function pulseClick(index, event, list) {
		pulseId.value = event;
		setTimeout(function() {
			pulseId.value = null;
			if (myPlayBack.id == event) {
				uni.navigateTo({
					url: "/pages/PlayDetails/index?sort=1"
				});
			} else {
				myPlayBack.PostAddSongList(list);
				myPlayBack.postCurrentSong(index, event);
			}
		}, 500)
	}

	// function formatNumber(number) {
	// 	if (number >= 100000000) {
	// 		return Math.floor(number / 100000000) + "亿";
	// 	} else if (number >= 100000 && number < 100000000) {
	// 		return Math.floor(number / 10000) + "万";
	// 	} else {
	// 		return number.toString();
	// 	}
	// }
</script>

<style scoped>
	.p {
		margin: 0;
	}

	.LeaderboardBlock {
		width: calc(100% - 50px);
		height: calc(200px - 20px);
		border-radius: 10px;
		background-color: white;
		box-shadow:
			2px 0px 5px rgba(200, 200, 200, 0.2),
			/* 右侧阴影效果 */
			0px 2px 5px rgba(200, 200, 200, 0.2),
			/* 底部阴影效果 */
			-2px 0px 5px rgba(200, 200, 200, 0.2),
			/* 左侧阴影效果 */
			0px -2px 5px rgba(200, 200, 200, 0.2);
		/* 顶部阴影效果 */
		margin: 5px;
		padding: 10px 20px;
	}

	.content {
		clear: both;
		height: 150px;
	}

	.center {
		height: 40px;
		position: relative;
		margin-top: 10px;
	}

	.pulseClick {
		animation: pulse 500ms 1;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 1;
		}

		50% {
			transform: scale(0.95);
			opacity: 0.5;
		}

		100% {
			transform: scale(1);
			opacity: 1;
		}
	}


	.center>image {
		height: 100%;
		border-radius: 5px;
		position: absolute;
		left: 0;
		top: 0;
	}

	.center>.p:nth-of-type(1) {
		font-weight: bold;
		width: 30px;
		text-align: center;
		position: absolute;
		left: 45px;
		top: 50%;
		transform: translateY(-50%);
	}

	.center:nth-of-type(1)>.p:nth-of-type(1) {
		color: #c1952a;
	}

	.center:nth-of-type(2)>.p:nth-of-type(1) {
		color: #868cac;
	}

	.center:nth-of-type(3)>.p:nth-of-type(1) {
		color: #c47a4b;
	}

	.bt {
		height: 30px;
		position: relative;
	}

	.bt>.p {
		margin: 0;
		line-height: 30px;
		font-weight: bold;
		font-size: 16px;
		color: #313131;
	}

	.details {
		position: absolute;
		left: 75px;
		padding: 0px;
		height: 100%;
		width: calc(100% - 105px);
	}

	.details>.p {
		font-weight: bold;
		line-height: 25px;
		height: 25px;
		overflow: hidden;
		font-size: 13px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.details>view {
		width: 100%;
		height: 15px;
		overflow: hidden;
	}

	.details>view>.p {
		color: #44404e;
	}

	.details>view .p {
		font-weight: 300;
		float: left;
		line-height: 15px;
		font-size: 12px;
	}
</style>