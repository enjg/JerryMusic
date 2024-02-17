"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let HeadSort = common_vendor.ref(0);
    let type = common_vendor.ref("daily");
    let year = common_vendor.ref(2023);
    common_vendor.onMounted(() => {
      getAlbumSongsaleboard(HeadSort.value, type.value);
    });
    let listArray = common_vendor.reactive([]);
    function getAlbumSongsaleboard(albumTypes, types, years) {
      axios.instance.get("/album/songsaleboard", {
        params: {
          // limit: 50,
          // offset: 0,
          albumType: albumTypes,
          type: types,
          year: years
        }
      }).then((res) => {
        listArray.push(...res.data.products);
      }).catch((err) => {
        console.error(err);
      });
    }
    common_vendor.watch(() => HeadSort.value, (newValue) => {
      listArray.length = 0;
      getAlbumSongsaleboard(HeadSort.value, type.value);
    });
    common_vendor.watch(() => type.value, (newValue) => {
      listArray.length = 0;
      if (newValue == "total") {
        getAlbumSongsaleboard(HeadSort.value, type.value, year.value);
      } else {
        getAlbumSongsaleboard(HeadSort.value, type.value);
      }
    });
    function routerReturn() {
      common_vendor.wx$1.navigateBack({
        delta: 1
        // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
      });
    }
    function Click(event) {
      common_vendor.wx$1.navigateTo({
        url: `/pages/DigitalAlbumDetails/index?id=${event}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => routerReturn()),
        b: common_assets._imports_0$2,
        c: common_vendor.unref(HeadSort) == 0 ? 1 : "",
        d: common_vendor.o(($event) => common_vendor.isRef(HeadSort) ? HeadSort.value = 0 : HeadSort = 0),
        e: common_vendor.unref(HeadSort) == 1 ? 1 : "",
        f: common_vendor.o(($event) => common_vendor.isRef(HeadSort) ? HeadSort.value = 1 : HeadSort = 1),
        g: common_vendor.unref(type) == "daily" ? 1 : "",
        h: common_vendor.o(($event) => common_vendor.isRef(type) ? type.value = "daily" : type = "daily"),
        i: common_vendor.unref(type) == "week" ? 1 : "",
        j: common_vendor.o(($event) => common_vendor.isRef(type) ? type.value = "week" : type = "week"),
        k: common_vendor.t(common_vendor.unref(year)),
        l: common_vendor.unref(type) == "year" ? 1 : "",
        m: common_vendor.o(($event) => common_vendor.isRef(type) ? type.value = "year" : type = "year"),
        n: common_vendor.unref(type) == "total" ? 1 : "",
        o: common_vendor.o(($event) => common_vendor.isRef(type) ? type.value = "total" : type = "total"),
        p: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return common_vendor.e({
            a: item.rankIncr > 0 ? 1 : "",
            b: item.rankIncr < 0 ? 1 : "",
            c: item.rankIncr == 0 ? 1 : "",
            d: common_vendor.t(index + 1),
            e: index + 1 <= 3 ? 1 : "",
            f: item.rankIncr !== 0
          }, item.rankIncr !== 0 ? {
            g: common_vendor.t(Math.abs(item.rankIncr))
          } : {}, {
            h: item.coverUrl,
            i: common_vendor.t(item.albumName),
            j: common_vendor.t(item.saleNum),
            k: common_vendor.o(($event) => Click(item.albumId), index),
            l: index
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f55ace09"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/BestSellerList/index.vue"]]);
wx.createPage(MiniProgramPage);
