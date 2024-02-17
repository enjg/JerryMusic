"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const pinia_mySearch = require("../../../pinia/mySearch.js");
const _sfc_main = {
  __name: "SongList",
  setup(__props) {
    const mySearch = pinia_mySearch.useMySearch();
    common_vendor.onMounted(() => {
      getCloudsearch(mySearch.SearchText, 20, listArray.length, "1000");
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
        listArray.push(...res.data.result.playlists);
      }).catch((err) => {
        console.error(err);
      });
    }
    function formatFansCount(fansCount) {
      if (fansCount >= 1e8) {
        return Math.floor(fansCount / 1e8) + " 亿";
      } else if (fansCount >= 1e4) {
        return Math.floor(fansCount / 1e4) + " 万";
      } else {
        return fansCount;
      }
    }
    function routerPush(event) {
      common_vendor.wx$1.navigateTo({
        url: `/pages/PlaylistDetails/index?id=${event}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.coverImgUrl,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.trackCount),
            d: common_vendor.t(item.creator.nickname),
            e: common_vendor.t(formatFansCount(item.playCount)),
            f: common_vendor.o(($event) => routerPush(item.id), index),
            g: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-84424257"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/search/SearchDetailsComponent/SongList.vue"]]);
wx.createComponent(Component);
