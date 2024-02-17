"use strict";
const common_vendor = require("../common/vendor.js");
const axios = require("../axios.js");
const useMyPlayBack = common_vendor.defineStore("myPlayBack", () => {
  let id = common_vendor.ref(null);
  let CurrentSong = common_vendor.reactive({});
  let songTime = common_vendor.ref(null);
  let index = common_vendor.ref(null);
  let SongList = common_vendor.reactive([]);
  let RandomPlayListArray = common_vendor.reactive([]);
  let RandomPlayIndex = common_vendor.ref(null);
  let SongSort = common_vendor.ref(null);
  let PlayPause = common_vendor.ref(null);
  let SongLength = common_vendor.ref(null);
  let SongPlayProgress = common_vendor.ref(null);
  let innerAudioContext = common_vendor.index.createInnerAudioContext();
  let HistoryPlayArray = common_vendor.reactive([]);
  let PlayMode = common_vendor.ref(0);
  let SongListTF = common_vendor.ref(0);
  function postPlayMode() {
    if (PlayMode.value < 2) {
      PlayMode.value++;
    } else {
      PlayMode.value = 0;
    }
  }
  common_vendor.watch(() => PlayMode.value, (newValue) => {
    console.log(newValue);
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
      index.value = SongList.findIndex((obj) => obj.id === id.value);
    }
    if (newValue == 2) {
      innerAudioContext.loop = true;
    } else {
      innerAudioContext.loop = false;
    }
  });
  function postCurrentSong(indexs, center) {
    index.value = indexs;
    id.value = center;
  }
  function ClearPlaylist(event) {
    if (event == 1) {
      id.value = null;
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
      url.value = "";
      innerAudioContext.stop();
      innerAudioContext.reset();
    } else if (event == 2) {
      HistoryPlayArray.length = 0;
    }
  }
  function PostAddSongList(ListArray) {
    SongSort.value = 1;
    SongList.splice(0, SongList.length, ...ListArray);
  }
  common_vendor.watch(() => SongSort.value, (newValue) => {
    if (newValue === 2) {
      PlayMode.value = 0;
      SongList.length = 0;
      index.value = 0;
      getPersonalFm();
    }
  });
  function getPersonalFm() {
    let time = Date.now();
    axios.instance.get("/personal_fm", {
      params: {
        timestamp: time
      }
    }).then((res) => {
      SongList.push(...res.data.data);
      id.value = SongList[index.value].id;
    }).catch((err) => {
      console.error(err);
    });
  }
  function SongListAdd(event) {
    postInsertData(event, 1);
  }
  function SongListAddSong(event) {
    postInsertData(event, 0);
  }
  function postInsertData(event, sort) {
    if (SongSort.value === 2) {
      SongSort.value = 1;
      SongList.splice(0, SongList.length, event);
      index.value = 0;
      id.value = event.id;
    } else {
      SongSort.value = 1;
      if (findIndexById(SongList, event.id) !== -1) {
        if (findIndexById(SongList, event.id) < index.value) {
          SongList.splice(findIndexById(SongList, event.id), 1);
          index.value--;
          postArrayAdd(event);
          if (sort == 1) {
            SwitchSongs(1);
          }
        } else if (findIndexById(SongList, event.id) > index.value) {
          SongList.splice(findIndexById(SongList, event.id), 1);
          postArrayAdd(event);
          if (sort == 1) {
            SwitchSongs(1);
          }
        }
      } else if (SongList.length == 0) {
        postCurrentSong(0, event.id);
        SongList.splice(0, SongList.length, event);
      } else {
        postArrayAdd(event);
        if (sort == 1) {
          SwitchSongs(1);
        }
      }
    }
  }
  function postArrayAdd(event) {
    SongList.splice(index.value + 1, 0, event);
  }
  function findIndexById(array, id2) {
    return array.findIndex((item) => item.id === id2);
  }
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
      console.log("111");
      id.value = RandomPlayListArray[RandomPlayIndex.value].id;
    } else {
      console.log("222");
      id.value = SongList[index.value].id;
    }
  }
  common_vendor.watch(() => index.value, (newValue) => {
    if (SongSort.value == 2) {
      if (newValue >= SongList.length - 2) {
        getPersonalFm();
      }
    }
  });
  common_vendor.watch(() => id.value, (newValue) => {
    if (newValue != null) {
      getSongUrlV1(newValue);
      getSongDetail(newValue);
    }
  }, {
    deep: true
  });
  function getSongDetail(id2) {
    axios.instance.get("/song/detail", {
      params: {
        ids: id2
      }
    }).then((res) => {
      console.log(res.data.songs[0].dt, "输出");
      Object.assign(CurrentSong, res.data.songs[0]);
      if (!findDuplicateIdIndex(res.data.songs[0].id, HistoryPlayArray)) {
        HistoryPlayArray.push(res.data.songs[0]);
      } else {
        const index2 = findDuplicateIdIndex(res.data.songs[0].id, HistoryPlayArray);
        const thirdElement = HistoryPlayArray.splice(index2, 1)[0];
        HistoryPlayArray.push(thirdElement);
      }
    }).catch((err) => {
      console.error(err);
    });
  }
  function findDuplicateIdIndex(id2, arrayOfObjects) {
    const index2 = arrayOfObjects.findIndex((obj) => obj.id === id2);
    return index2 !== -1 ? index2 : false;
  }
  let url = common_vendor.ref("");
  function getSongUrlV1(ids) {
    axios.instance.get("/song/url/v1", {
      params: {
        id: ids,
        level: "standard"
      }
    }).then((res) => {
      console.log(res.data.data[0].time, "输出2");
      songTime.value = res.data.data[0].time;
      url.value = res.data.data[0].url;
    }).catch((err) => {
      console.error(err);
    });
  }
  common_vendor.watch(() => url.value, (newValue) => {
    if (newValue) {
      innerAudioContext.src = newValue;
      innerAudioContext.play();
    }
  });
  innerAudioContext.onEnded(() => {
    if (PlayMode.value !== 2) {
      SwitchSongs(1);
    }
  });
  innerAudioContext.onPlay(() => {
    console.log("播放");
    PlayPause.value = true;
  });
  innerAudioContext.onPause(() => {
    console.log("暂停播放");
    PlayPause.value = false;
  });
  innerAudioContext.onCanplay(() => {
    SongLength.value = innerAudioContext.duration;
  });
  innerAudioContext.onTimeUpdate(() => {
    SongPlayProgress.value = innerAudioContext.currentTime;
  });
  function play() {
    if (innerAudioContext.paused) {
      innerAudioContext.play();
    } else {
      innerAudioContext.pause();
    }
  }
  function UpdatePlaybackProgress(center) {
    const time = center * (CurrentSong.dt / 1e3);
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
  };
});
exports.useMyPlayBack = useMyPlayBack;
