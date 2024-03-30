"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const pinia_myPlayBack = require("../../../pinia/myPlayBack.js");
const _sfc_main = {
  __name: "lyric",
  setup(__props) {
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    common_vendor.ref(null);
    let listArray = common_vendor.reactive([]);
    let childNodes = common_vendor.reactive([]);
    let scrollTop = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      getLyricNew(myPlayBack.id);
    });
    common_vendor.watch(() => myPlayBack.id, (newValue) => {
      listArray.length = 0;
      childNodes.length = 0;
      scrollTop.value = 0;
      getLyricNew(newValue);
    });
    let id = common_vendor.ref(-1);
    common_vendor.watch(() => myPlayBack.SongPlayProgress, (newValue) => {
      const time = newValue * 1e3;
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
    });
    common_vendor.watch(() => id.value, (newValue) => {
      scrollTop.value = newValue * 50;
    });
    function getLyricNew(ids) {
      axios.instance.get("/lyric/new", {
        params: {
          id: ids
        }
      }).then((response) => {
        console.log(response.data.lrc.lyric);
        processDatalrc(response.data.lrc.lyric);
      }).catch((error) => {
        console.error(error);
      });
    }
    function processDatalrc(data) {
      var startIndex = data.indexOf("[");
      var lyricsData = data.substring(startIndex);
      let lyricsArr = [];
      var lines = lyricsData.split("\n");
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var timeMatch = line.match(/\[(\d+:\d+\.\d+)\]/);
        var contentMatch = line.match(/\]([\s\S]*)/);
        if (timeMatch && contentMatch) {
          var timeString = timeMatch[1];
          var content = contentMatch[1].trim();
          var timeParts = timeString.split(":");
          var minutes = parseInt(timeParts[0]);
          var seconds = parseFloat(timeParts[1]);
          var timestamp = (minutes * 60 + seconds) * 1e3;
          lyricsArr.push({
            time: timestamp,
            data: content
          });
        }
      }
      console.log(lyricsArr);
      childNodes.push(...lyricsArr);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(childNodes), (item, index, i0) => {
          return {
            a: common_vendor.t(item.data),
            b: "line" + index,
            c: common_vendor.unref(id) - 1 == index ? 1 : "",
            d: common_vendor.unref(id) == index || common_vendor.unref(id) - 2 == index ? 1 : "",
            e: common_vendor.unref(id) - 2 > index || common_vendor.unref(id) < index ? 1 : ""
          };
        }),
        b: common_vendor.unref(scrollTop)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5af958d9"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/PlayDetails/module/lyric.vue"]]);
wx.createComponent(Component);
