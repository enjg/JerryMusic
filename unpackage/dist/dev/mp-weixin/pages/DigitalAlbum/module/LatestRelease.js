"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const _sfc_main = {
  __name: "LatestRelease",
  setup(__props) {
    common_vendor.onMounted(() => {
      getAlbumList();
    });
    let listArray = common_vendor.reactive([]);
    function getAlbumList() {
      axios.instance.get("/album/list", {
        params: {
          limit: 6
        }
      }).then((res) => {
        listArray.push(...res.data.products);
      }).catch((err) => {
        console.error(err);
      });
    }
    function Click(event) {
      common_vendor.wx$1.navigateTo({
        url: `/pages/DigitalAlbumDetails/index?id=${event}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.coverUrl,
            b: common_vendor.t(item.albumName),
            c: common_vendor.t(item.artistName),
            d: common_vendor.t(item.price),
            e: common_vendor.o(($event) => Click(item.albumId), index),
            f: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-77c3efb4"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/DigitalAlbum/module/LatestRelease.vue"]]);
wx.createComponent(Component);
