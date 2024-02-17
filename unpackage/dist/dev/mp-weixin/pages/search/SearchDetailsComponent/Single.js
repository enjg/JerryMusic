"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const axios = require("../../../axios.js");
const pinia_mySearch = require("../../../pinia/mySearch.js");
const pinia_myPlayBack = require("../../../pinia/myPlayBack.js");
const pinia_myMore = require("../../../pinia/myMore.js");
const _sfc_main = {
  __name: "Single",
  setup(__props) {
    const mySearch = pinia_mySearch.useMySearch();
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    const myMore = pinia_myMore.useMyMore();
    common_vendor.onMounted(() => {
      getCloudsearch(mySearch.SearchText, 20, listArray.length, "1");
    });
    let listArray = common_vendor.reactive([]);
    function getCloudsearch(keywordss, limits, offsets, types) {
      axios.instance.get("/cloudsearch", {
        params: {
          keywords: keywordss,
          limit: limits,
          offset: offsets,
          type: types
        }
      }).then((res) => {
        listArray.push(...res.data.result.songs);
      }).catch((err) => {
        console.error(err);
      });
    }
    function moreClick(event) {
      myMore.TF = true;
      myMore.id = event;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.unref(myPlayBack).PlayDifference(common_vendor.unref(listArray))),
        b: common_assets._imports_0$4,
        c: common_vendor.o(($event) => common_vendor.unref(myPlayBack).PlayDifference(common_vendor.unref(listArray))),
        d: common_assets._imports_1,
        e: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: item.fee == 1
          }, item.fee == 1 ? {} : {}, {
            c: item.fee == 1
          }, item.fee == 1 ? {} : {}, {
            d: item.sq !== null && item.hr == null
          }, item.sq !== null && item.hr == null ? {} : {}, {
            e: item.hr !== null
          }, item.hr !== null ? {} : {}, {
            f: common_vendor.t(item.ar[0].name),
            g: common_vendor.t(item.al.name),
            h: common_vendor.o(($event) => moreClick(item.id), index),
            i: common_vendor.o(($event) => common_vendor.unref(myPlayBack).SongListAddSong(item), index),
            j: common_vendor.o(($event) => common_vendor.unref(myPlayBack).SongListAdd(item), index),
            k: index
          });
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4ab38561"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/search/SearchDetailsComponent/Single.vue"]]);
wx.createComponent(Component);
