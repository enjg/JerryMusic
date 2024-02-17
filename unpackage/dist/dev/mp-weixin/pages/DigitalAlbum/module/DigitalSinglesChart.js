"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const _sfc_main = {
  __name: "DigitalSinglesChart",
  setup(__props) {
    let sort = common_vendor.ref("daily");
    common_vendor.onMounted(() => {
      getAlbumSongsaleboard("daily");
    });
    let listArray = common_vendor.reactive([]);
    function getAlbumSongsaleboard(types) {
      axios.instance.get("/album/songsaleboard", {
        params: {
          albumType: 1,
          type: types
        }
      }).then((res) => {
        listArray.push(...res.data.products.slice(0, 12));
      }).catch((err) => {
        console.error(err);
      });
    }
    common_vendor.watch(() => sort.value, (newValue) => {
      listArray.length = 0;
      getAlbumSongsaleboard(newValue);
    });
    function Click(event) {
      common_vendor.wx$1.navigateTo({
        url: `/pages/DigitalAlbumDetails/index?id=${event}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(sort) == "daily" ? 1 : "",
        b: common_vendor.o(($event) => common_vendor.isRef(sort) ? sort.value = "daily" : sort = "daily"),
        c: common_vendor.unref(sort) == "week" ? 1 : "",
        d: common_vendor.o(($event) => common_vendor.isRef(sort) ? sort.value = "week" : sort = "week"),
        e: common_vendor.unref(sort) == "total" ? 1 : "",
        f: common_vendor.o(($event) => common_vendor.isRef(sort) ? sort.value = "total" : sort = "total"),
        g: common_vendor.f(Array.from({
          length: 3
        }), (item, index, i0) => {
          return common_vendor.e(common_vendor.unref(listArray).length ? {
            a: common_vendor.f(Array.from({
              length: 4
            }), (item2, indexs, i1) => {
              return {
                a: common_vendor.unref(listArray)[index * 3 + indexs].coverUrl,
                b: common_vendor.t(index * 4 + indexs + 1),
                c: common_vendor.t(common_vendor.unref(listArray)[index * 3 + indexs].albumName),
                d: common_vendor.o(($event) => Click(common_vendor.unref(listArray)[index * 3 + indexs].albumId), indexs),
                e: indexs
              };
            })
          } : {}, {
            b: index
          });
        }),
        h: common_vendor.unref(listArray).length
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-84bd3001"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/DigitalAlbum/module/DigitalSinglesChart.vue"]]);
wx.createComponent(Component);
