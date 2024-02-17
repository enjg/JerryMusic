"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const pinia_mySearch = require("../../../pinia/mySearch.js");
const _sfc_main = {
  __name: "Leaderboard",
  props: {
    Obj: Object
  },
  setup(__props) {
    const Props = __props;
    const mySearch = pinia_mySearch.useMySearch();
    common_vendor.onMounted(() => {
      if (Props.Obj.id) {
        getPlaylistDetail(Props.Obj.id);
      } else {
        getSearchHotDetail();
      }
    });
    let listArray = common_vendor.reactive([]);
    function getPlaylistDetail(ids) {
      axios.instance.get("/playlist/detail", {
        params: {
          id: ids
        }
      }).then((res) => {
        listArray.push(...res.data.playlist.tracks.slice(0, 20));
      }).catch((err) => {
        console.error(err);
      });
    }
    function getSearchHotDetail() {
      axios.instance.get("/search/hot/detail").then((res) => {
        listArray.push(...res.data.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    let zindex = common_vendor.ref(null);
    function onTouchStart(event) {
      zindex.value = event;
    }
    function onTouchEnd() {
      zindex.value = null;
    }
    function Click(name, searchWord) {
      console.log(name, searchWord);
      if (name) {
        mySearch.SearchText = name;
      } else {
        mySearch.SearchText = searchWord;
      }
      mySearch.Tips = -1;
      mySearch.SearchTF = 1;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(Props.Obj.name),
        b: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(index + 1),
            b: index < 3 ? 1 : "",
            c: item.name
          }, item.name ? {
            d: common_vendor.t(item.name),
            e: index < 3 ? 1 : ""
          } : {}, {
            f: item.searchWord
          }, item.searchWord ? {
            g: common_vendor.t(item.searchWord),
            h: index < 3 ? 1 : ""
          } : {}, {
            i: common_vendor.unref(zindex) == index ? 1 : "",
            j: common_vendor.o(($event) => onTouchStart(index), index),
            k: common_vendor.o(onTouchEnd, index),
            l: common_vendor.o(($event) => Click(item.name, item.searchWord), index),
            m: index
          });
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4f1cca8"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/search/module/Leaderboard.vue"]]);
wx.createComponent(Component);
