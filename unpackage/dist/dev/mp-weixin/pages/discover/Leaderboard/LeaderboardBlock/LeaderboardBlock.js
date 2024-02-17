"use strict";
const common_vendor = require("../../../../common/vendor.js");
const axios = require("../../../../axios.js");
const pinia_myPlayBack = require("../../../../pinia/myPlayBack.js");
const _sfc_main = {
  __name: "LeaderboardBlock",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    let listObj = common_vendor.reactive({
      name: "111"
    });
    let listArray = common_vendor.reactive([]);
    common_vendor.onMounted(() => {
      getPlaylistDetail(Props.message.id);
    });
    function getPlaylistDetail(ids) {
      axios.instance.get("/playlist/detail", {
        params: {
          id: ids
        }
      }).then((response) => {
        listObj.name = response.data.playlist.name;
        listObj.playCount = response.data.playlist.playCount;
        listArray.push(...response.data.playlist.tracks);
      }).catch((error) => {
        console.error(error);
      });
    }
    let pulseId = common_vendor.ref(null);
    function pulseClick(index, event, list) {
      pulseId.value = event;
      setTimeout(function() {
        pulseId.value = null;
        if (myPlayBack.id == event) {
          common_vendor.index.navigateTo({
            url: "/pages/PlayDetails/index?sort=1"
          });
        } else {
          myPlayBack.PostAddSongList(list);
          myPlayBack.postCurrentSong(index, event);
        }
      }, 500);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(listObj).name),
        b: common_vendor.f(common_vendor.unref(listArray).slice(0, 3), (item, index, i0) => {
          return {
            a: item.al.picUrl,
            b: common_vendor.t(index + 1),
            c: common_vendor.t(item.name),
            d: common_vendor.f(item.ar, (items, indexs, i1) => {
              return common_vendor.e({
                a: common_vendor.t(items.name),
                b: indexs < item.ar.length - 1
              }, indexs < item.ar.length - 1 ? {} : {}, {
                c: indexs
              });
            }),
            e: common_vendor.unref(pulseId) == item.id ? 1 : "",
            f: common_vendor.o(($event) => pulseClick(index, item.id, common_vendor.unref(listArray)), index),
            g: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-54980e23"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/discover/Leaderboard/LeaderboardBlock/LeaderboardBlock.vue"]]);
wx.createComponent(Component);
