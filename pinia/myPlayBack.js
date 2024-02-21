import {
	defineStore
} from 'pinia';
import {
	reactive,
	ref,
	watch
} from "vue";
import axios from '@/axios.js';

export const useMyPlayBack = defineStore('myPlayBack', () => {

	//当前播放歌曲ID
	let id = ref(null);
	//当前播放歌曲
	let CurrentSong = reactive({});
	//音频时长
	let songTime = ref(null);
	//播放歌曲数组坐标
	let index = ref(null);
	//播放数组
	let SongList = reactive([]);
	//随机播放数组
	let RandomPlayListArray = reactive([]);
	//随机播放坐标
	let RandomPlayIndex = ref(null);
	//歌曲类别
	let SongSort = ref(null);
	//歌曲播放状态
	let PlayPause = ref(null);
	//歌曲时长
	let SongLength = ref(null);
	//歌曲播放进度
	let SongPlayProgress = ref(null);
	//创建播放器
	let innerAudioContext = wx.getBackgroundAudioManager();
	//历史播放
	let HistoryPlayArray = reactive([]);
	//播放模式
	let PlayMode = ref(0);
	//列表显示
	let SongListTF = ref(0);
	//切换播放模式
	function postPlayMode() {
		if (PlayMode.value < 2) {
			PlayMode.value++;
		} else {
			PlayMode.value = 0;
		}
	}
	watch(() => PlayMode.value, (newValue) => {
		console.log(newValue)

		if (newValue == 1) {
			RandomPlayIndex.value = 0;
			RandomPlayListArray.length = 0;
			RandomPlayListArray.push(...SongList);
			const removedElement = RandomPlayListArray.splice(index.value, 1);
			console.log(removedElement);
			RandomPlayListArray.sort(() => Math.random() - 0.5);
			RandomPlayListArray.unshift(...removedElement);
			console.log(RandomPlayListArray);
		} else {
			index.value = SongList.findIndex(obj => obj.id === id.value);
		}
		if (newValue == 2) {
			innerAudioContext.loop = true;
		} else {
			innerAudioContext.loop = false;
		}
	})


	//更新当前播放歌曲和坐标
	function postCurrentSong(indexs, center) {
		index.value = indexs;
		id.value = center;
	}

	function ClearPlaylist(event) {
		if (event == 1) {
			id.value = null;
			// 清空 CurrentSong 对象
			Object.keys(CurrentSong).forEach((key) => {
				delete CurrentSong[key];
			});
			index.value = null;
			SongList.length = 0;
			SongSort.value = null;
			PlayPause.value = null;
			SongLength.value = null;
			RandomPlayListArray.length = 0;
			RandomPlayIndex.value = null;
			PlayMode.value = 0;
			SongListTF = 0;
			SongPlayProgress.value = null;
			url.value = '';
			innerAudioContext.stop();
			innerAudioContext.reset();
			// 	innerAudioContext = uni.createInnerAudioContext();
		} else if (event == 2) {
			HistoryPlayArray.length = 0;
		}
	}
	//跟新播放数组
	function PostAddSongList(ListArray) {
		SongSort.value = 1;
		SongList.splice(0, SongList.length, ...ListArray);
	}
	watch(() => SongSort.value, (newValue) => {
		if (newValue === 2) {
			PlayMode.value = 0;
			SongList.length = 0;
			index.value = 0;
			getPersonalFm();
		}
	})
	//获取私人FM
	function getPersonalFm() {
		let time = Date.now();

		axios
			.get("/personal_fm", {
				params: {
					timestamp: time,
				}
			})
			.then((res) => {
				SongList.push(...res.data.data);
				id.value = SongList[index.value].id;
			})
			.catch((err) => {
				console.error(err);
			});
	}

	//插入歌单序列并切换
	function SongListAdd(event) {
		postInsertData(event, 1);
	}

	//插入歌单序列到下一首
	function SongListAddSong(event) {
		postInsertData(event, 0);
	}

	//添加单曲
	function postInsertData(event, sort) {
		if (SongSort.value === 2) {
			SongSort.value = 1;
			SongList.splice(0, SongList.length, event);
			index.value = 0;
			id.value = event.id;
		} else {
			SongSort.value = 1;
			if (findIndexById(SongList, event.id) !== -1) {
				if ((findIndexById(SongList, event.id)) < index.value) {
					SongList.splice(findIndexById(SongList, event.id), 1);
					index.value--;
					postArrayAdd(event)
					if (sort == 1) {
						SwitchSongs(1)
					}
				} else if (findIndexById(SongList, event.id) > index.value) {
					SongList.splice(findIndexById(SongList, event.id), 1);
					postArrayAdd(event)
					if (sort == 1) {
						SwitchSongs(1)
					}
				}
			} else if (SongList.length == 0) {
				postCurrentSong(0, event.id);
				SongList.splice(0, SongList.length, event);
			} else {
				postArrayAdd(event);
				if (sort == 1) {
					SwitchSongs(1)
				}
			}



		}

	}

	function postArrayAdd(event) {
		SongList.splice(index.value + 1, 0, event);
	}

	//遍历数组是否重复值
	function findIndexById(array, id) {
		return array.findIndex(item => item.id === id);
	}

	//切歌
	function SwitchSongs(event) {
		if (event == 1) {
			if (PlayMode.value == 1) {
				if (RandomPlayIndex.value < RandomPlayListArray.length - 1) {
					RandomPlayIndex.value += 1;
				} else {
					RandomPlayIndex.value = 0;
				}
			} else {
				if (index.value < SongList.length - 1) {
					index.value += 1;
				} else {
					index.value = 0;
				}
			}
		} else {
			if (PlayMode.value == 1) {
				if (RandomPlayIndex.value > 0) {
					RandomPlayIndex.value -= 1;
				} else {
					RandomPlayIndex.value = RandomPlayListArray.length - 1;
				}
			} else {
				if (index.value > 0) {
					index.value -= 1;
				} else {
					index.value = SongList.length - 1;
				}
			}
		}
		if (PlayMode.value == 1) {
			console.log('111')
			id.value = RandomPlayListArray[RandomPlayIndex.value].id;
		} else {
			console.log('222')
			id.value = SongList[index.value].id;
		}
	}
	watch(() => index.value, (newValue) => {
		if (SongSort.value == 2) {
			if (newValue >= SongList.length - 2) {
				getPersonalFm()
			}
		}
	})



	//监听变化
	watch(() => id.value, (newValue) => {
		if (newValue != null) {
			getSongUrlV1(newValue);
			getSongDetail(newValue);
		}
	}, {
		deep: true
	})

	function getSongDetail(id) {
		axios
			.get("/song/detail", {
				params: {
					ids: id
				},
			})
			.then((res) => {
				console.log(res.data.songs[0], '输出')
				Object.assign(CurrentSong, res.data.songs[0]);
				innerAudioContext.title = res.data.songs[0].name;
				innerAudioContext.epname = res.data.songs[0].al.name;
				innerAudioContext.singer = res.data.songs[0].ar[0].name;
				innerAudioContext.coverImgUrl = res.data.songs[0].al.picUrl;
				if (!findDuplicateIdIndex(res.data.songs[0].id, HistoryPlayArray)) {
					HistoryPlayArray.push(res.data.songs[0]);
				} else {
					const index = findDuplicateIdIndex(res.data.songs[0].id, HistoryPlayArray);
					const thirdElement = HistoryPlayArray.splice(index, 1)[0];
					HistoryPlayArray.push(thirdElement);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function findDuplicateIdIndex(id, arrayOfObjects) {
		const index = arrayOfObjects.findIndex(obj => obj.id === id);
		return index !== -1 ? index : false;
	}


	let url = ref('');
	//获取当前当前播放语言url
	function getSongUrlV1(ids) {
		axios
			.get("/song/url/v1", {
				params: {
					id: ids,
					level: 'standard'
				},
			})
			.then((res) => {
				console.log(res.data.data[0].url, '输出2')
				songTime.value = res.data.data[0].time;
				url.value = res.data.data[0].url;
			})
			.catch((err) => {
				console.error(err);
			});
	}
	watch(() => url.value, (newValue) => {
		if (newValue) {
			innerAudioContext.src = newValue;
			console.log(innerAudioContext, '输出999')
			// 	innerAudioContext.play();
		}

	})
	innerAudioContext.onEnded(() => {
		if (PlayMode.value !== 2) {
			SwitchSongs(1);
		}
	})
	innerAudioContext.onPlay(() => {
		console.log('播放')
		PlayPause.value = true;
	})
	innerAudioContext.onPause(() => {
		console.log('暂停播放')
		PlayPause.value = false;
	})
	innerAudioContext.onCanplay(() => {
		SongLength.value = innerAudioContext.duration;
	})
	innerAudioContext.onTimeUpdate(() => {
		SongPlayProgress.value = innerAudioContext.currentTime;
	})
	innerAudioContext.onNext(() => {
		console.log('后台下一首')
		SwitchSongs(1);
	})
	innerAudioContext.onPrev(()=>{
		SwitchSongs(0);
	})

	function play() {
		if (innerAudioContext.paused) {
			innerAudioContext.play();
		} else {
			innerAudioContext.pause();
		}
	}



	function UpdatePlaybackProgress(center) {
		const time = center * (CurrentSong.dt / 1000);
		innerAudioContext.seek(time);
	}

	function PlayDifference(event) {
		SongSort.value = 1;
		SongList.splice(0, SongList.length, ...event);
		index.value = 0;
		id.value = event[index.value].id;
	}


	return {
		CurrentSong,
		index,
		SongList,
		PlayPause,
		SongLength,
		SongPlayProgress,
		postCurrentSong,
		PostAddSongList,
		SwitchSongs,
		play,
		UpdatePlaybackProgress,
		SongSort,
		id,
		SongListAdd,
		SongListAddSong,
		PlayDifference,
		HistoryPlayArray,
		ClearPlaylist,
		RandomPlayIndex,
		RandomPlayListArray,
		PlayMode,
		postPlayMode,
		SongListTF,
		songTime
	}
})