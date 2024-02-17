"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const pinia_mySearch = require("../../../pinia/mySearch.js");
const _sfc_main = {
  __name: "Tips",
  setup(__props) {
    const mySearch = pinia_mySearch.useMySearch();
    common_vendor.onMounted(() => {
      getSearchSuggest(mySearch.SearchText, "mobile");
    });
    common_vendor.watch(() => mySearch.SearchText, (newValue) => {
      listArray.length = 0;
      getSearchSuggest(newValue, "mobile");
    });
    let listArray = common_vendor.reactive([]);
    function getSearchSuggest(keywordss, types) {
      axios.instance.get("/search/suggest", {
        params: {
          keywords: keywordss,
          type: types
        }
      }).then((res) => {
        listArray.push(...res.data.result.allMatch);
      }).catch((err) => {
        console.error(err);
      });
    }
    function Click(evetn) {
      mySearch.SearchText = evetn;
      mySearch.SearchTF = 1;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: common_vendor.t(item.keyword),
            b: common_vendor.o(($event) => Click(item.keyword), index),
            c: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c27b4288"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/search/module/Tips.vue"]]);
wx.createComponent(Component);
