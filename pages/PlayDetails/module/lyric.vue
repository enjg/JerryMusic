<template>
	<view class="lyric">
		<scroll-view :scroll-top="scrollTop" behavior="smooth" class="songlyric" scroll-y="true" show-scrollbar='false'
			scroll-with-animation="true">
			<view class="line" :id="'line' + index" :class="{PClick:id-1==index,
			PClickTwo:id==index||id-2==index,
			PClickThree:id-2>index||id<index}" v-for="(item,index) in childNodes" key="index">
				<p class="p">{{item.data}}</p>
			</view>
			<view class="Abc" id="abc">

			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import {
		useMyPlayBack
	} from '@/pinia/myPlayBack.js';
	import {
		onMounted,
		reactive,
		ref,
		watch,
		defineProps
	} from 'vue';

	const myPlayBack = useMyPlayBack();
	let myDiv = ref(null);
	let listArray = reactive([])
	let childNodes = reactive([]);
	let scrollTop = ref(0);
	onMounted(() => {
		getLyricNew(myPlayBack.id);
		// 	click()
	})
	watch(() => myPlayBack.id, (newValue) => {
		listArray.length = 0;
		childNodes.length = 0;
		scrollTop.value = 0;
		getLyricNew(newValue);
	})


	let id = ref(-1);
	watch(() => myPlayBack.SongPlayProgress, (newValue) => {
		const time = newValue * 1000;
		let indexs = -1;

		for (let i = 0; i < childNodes.length; i++) {
			if (time < childNodes[i].time) {
				indexs = i;
				break;
			}
		}
		if (indexs !== -1) {
			id.value = indexs;
		} else {
			id.value = childNodes.length;
		}
	})
	watch(() => id.value, (newValue) => {
		scrollTop.value = newValue * 50;

	})


	function getLyricNew(ids) {
		axios
			.get("/lyric/new", {
				params: {
					id: ids
				},
			})
			.then((response) => {
				console.log(response.data.lrc.lyric);
				// console.log(response.data.yrc)
				// if (response.data.yrc) {
				// 	processData(response.data.yrc.lyric);
				// } else {
				processDatalrc(response.data.lrc.lyric);
				// }
			})
			.catch((error) => {
				console.error(error);
			});

	}

	function processData(input) {
		const dataArray = input.split("\n"); // 将输入按行切割成数组
		// 过滤掉不是音频数据部分，并保留其中的歌词部分
		const lyricsArray = dataArray
			.filter((item) => !item.startsWith('{"t":'))
			.map((item) => {
				return item.replace(/[{}]/g, ""); // 去除大括号
			});
		// return lyricsArray;
		let listaArray = [];
		for (let i = 0; i < lyricsArray.length; i++) {
			if (lyricsArray[i] !== "") {
				let accc = parseDatas(lyricsArray[i]);
				listaArray.push(accc);
			}
		}
		console.log(listaArray);
		listArray.push(...listaArray);
		// myDiv.value.innerHTML = "";
		listArray.forEach((element, index) => {
			let event = '';
			element.data.forEach((elements) => {
				event += elements.datas
			})
			console.log(event)
			childNodes.push(event);
			// const newElement = document.createElement("span"); // 创建一个新的 <p> 元素
			// newElement.textContent = event; // 设置新元素的文本内容
			// newElement.classList.add("lyricP");
			// 	myDiv.value.appendChild(newElement); // 将新元素添加为 MyDiv 的子元素
		});
	}

	function processDatalrc(data) {
		var startIndex = data.indexOf("[");
		var lyricsData = data.substring(startIndex);
		let lyricsArr = [];

		var lines = lyricsData.split("\n");
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];

			// 使用正则表达式提取时间和歌词内容
			var timeMatch = line.match(/\[(\d+:\d+\.\d+)\]/);
			var contentMatch = line.match(/\]([\s\S]*)/);

			if (timeMatch && contentMatch) {
				var timeString = timeMatch[1];
				var content = contentMatch[1].trim();

				// 将时间字符串转换为时间戳
				var timeParts = timeString.split(":");
				var minutes = parseInt(timeParts[0]);
				var seconds = parseFloat(timeParts[1]);
				var timestamp = (minutes * 60 + seconds) * 1000;

				lyricsArr.push({
					time: timestamp,
					data: content
				});
			}
		}
		console.log(lyricsArr);
		childNodes.push(...lyricsArr);
		// lrclyric.push(...lyricsArr);
		// myDiv.value.innerHTML = "";
		// const newElement = document.createElement("span");
		// newElement.textContent = lrclyric[0].data;
		// newElement.classList.add("lyricP");
		// myDiv.value.appendChild(newElement);
	}

	function parseDatas(str) {
		const dataArr = str.match(/\(([^)]+)\)[^\(\)]+/g);
		const time = str.match(/\[(.*?)\]/)[1].split(",");

		const result = {
			time: time.map(Number),
			data: dataArr.map((item) => {
				const tiems = item
					.match(/\(([^)]+)\)/)[1]
					.split(",")
					.map(Number);
				const datas = item.match(/\)(.*)/)[1];
				return {
					tiems,
					datas
				};
			}),
		};

		return result;
	}
</script>

<style scoped>
	.PClick {
		height: auto !important;
		min-height: 30px !important;
		/* 		background-color: red; */
		/* 		transition: all 0.1s ease !important; */
	}

	.PClick>.p {
		color: white !important;
		font-size: 23px !important;
		line-height: 50px !important;
		transition: all 0.3s ease !important;
		white-space: normal !important;
		overflow: auto !important;
		text-overflow: clip !important;
		text-shadow: 2px 2px 5px black;
	}

	.PClickTwo {
		height: auto !important;
		height: 30px !important;
/* 		background-color: red; */
/* 		transition: all 0.1s ease !important; */
	}

	.PClickTwo>.p {
		/* 		color: red !important; */
		font-size: 17px !important;
		color: white;
		transition: all 0.3s ease !important;
		opacity: 0.6;
	}

	.PClickThree>.p {
		font-size: 15px;
		color: white;
		opacity: 0.3;
		transition: all 0.4s ease !important;
	}

	.lyric {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.songlyric {
		width: 100%;
		height: calc(100vh - 250px);
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		overflow: hidden;
	}

	.line>.p {
		line-height: 30px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
	}

	.line {
		margin: 20px 0;
		height: 30px;
		width: 100%;
	}

	.line:nth-of-type(1) {
		margin-top: calc((100vh - 250px) / 2);
	}

	.Abc {
		height: 30px;
		margin-top: calc((100vh - 250px) / 2);
	}
</style>