"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const pinia_mySearch = require("../../../pinia/mySearch.js");
const _sfc_main = {
  __name: "Album",
  setup(__props) {
    const mySearch = pinia_mySearch.useMySearch();
    common_vendor.onMounted(() => {
      getCloudsearch(mySearch.SearchText, 20, listArray.length, "10");
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
        listArray.push(...res.data.result.albums);
        console.log(listArray);
      }).catch((err) => {
        console.error(err);
      });
    }
    function routerPush(event) {
      common_vendor.wx$1.navigateTo({
        url: `/pages/Album/index?id=${event}`
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
            e: common_vendor.f(item.artists, (items, indexs, i1) => {
              return common_vendor.e({
                a: common_vendor.t(items.name),
                b: indexs < item.artists.length - 1
              }, indexs < item.artists.length - 1 ? {} : {}, {
                c: indexs
              });
            }),
            f: common_vendor.o(($event) => routerPush(item.id), index),
            g: index
          });
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-843ebd76"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/search/SearchDetailsComponent/Album.vue"]]);
wx.createComponent(Component);
