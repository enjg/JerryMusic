"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const pinia_mySearch = require("../../../pinia/mySearch.js");
const _sfc_main = {
  __name: "Singer",
  setup(__props) {
    const mySearch = pinia_mySearch.useMySearch();
    common_vendor.onMounted(() => {
      getCloudsearch(mySearch.SearchText, 20, listArray.length, "100");
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
        listArray.push(...res.data.result.artists);
      }).catch((err) => {
        console.error(err);
      });
    }
    function routerPush(event) {
      console.log(event);
      common_vendor.wx$1.navigateTo({
        url: "/pages/Singer/index?id=" + event
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return common_vendor.e({
            a: item.picUrl,
            b: common_vendor.t(item.name),
            c: item.alias.length
          }, item.alias.length ? {
            d: common_vendor.t(item.alias[0])
          } : {}, {
            e: common_vendor.o(($event) => routerPush(item.id), index),
            f: index
          });
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dbc1f09e"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/search/SearchDetailsComponent/Singer.vue"]]);
wx.createComponent(Component);
