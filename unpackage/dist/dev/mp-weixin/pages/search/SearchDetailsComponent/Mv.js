"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const pinia_mySearch = require("../../../pinia/mySearch.js");
const _sfc_main = {
  __name: "Mv",
  setup(__props) {
    const mySearch = pinia_mySearch.useMySearch();
    common_vendor.onMounted(() => {
      getCloudsearch(mySearch.SearchText, 20, listArray.length, "1004");
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
        listArray.push(...res.data.result.mvs);
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
    function routerPush(center, event) {
      common_vendor.wx$1.navigateTo({
        url: center + "?id=" + event
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.cover,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.artists[0].name),
            d: common_vendor.t(formatFansCount(item.playCount)),
            e: index,
            f: common_vendor.o(($event) => routerPush("/pages/VideoPlayback/index", item.id), index)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c2024f16"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/search/SearchDetailsComponent/Mv.vue"]]);
wx.createComponent(Component);
