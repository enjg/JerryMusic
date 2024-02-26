"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const pinia_mySearch = require("../../../pinia/mySearch.js");
const axios = require("../../../axios.js");
if (!Math) {
  Leaderboard();
}
const Leaderboard = () => "./Leaderboard.js";
const _sfc_main = {
  __name: "PreSearch",
  setup(__props) {
    const mySearch = pinia_mySearch.useMySearch();
    common_vendor.onMounted(() => {
      getSearchDefault();
      getTopList();
    });
    let DefaultSearch = common_vendor.ref(null);
    function getSearchDefault() {
      let time = Date.now();
      axios.instance.get("/search/default", {
        params: {
          timestamp: time
        }
      }).then((res) => {
        DefaultSearch.value = res.data.data.realkeyword;
        mySearch.DefaultSearch = res.data.data.realkeyword;
      }).catch((err) => {
        console.error(err);
      });
    }
    let PlaylistChart = common_vendor.reactive([{
      name: "热搜榜",
      id: null
    }]);
    function getTopList() {
      axios.instance.get("/toplist").then((res) => {
        getRandomElements(res.data.list, 6);
      }).catch((err) => {
        console.error(err);
      });
    }
    function getRandomElements(arr, num) {
      const result = [];
      const len = arr.length;
      if (num >= len) {
        return arr;
      }
      while (result.length < num) {
        const randomIndex = Math.floor(Math.random() * len);
        const randomElement = arr[randomIndex];
        if (result.indexOf(randomElement) === -1) {
          result.push(randomElement);
        }
      }
      result.forEach((element) => {
        PlaylistChart.push({
          name: element.name,
          id: element.id
        });
      });
    }
    function routerPush(center) {
      common_vendor.wx$1.navigateTo({
        url: center
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$17,
        b: common_vendor.o(($event) => routerPush("/pages/SingerList/index")),
        c: common_assets._imports_1$15,
        d: common_vendor.o(($event) => routerPush("/pages/MusicalStyle/index")),
        e: common_assets._imports_2$8,
        f: common_assets._imports_3$7,
        g: common_vendor.o(($event) => routerPush("/pages/Sensibilities/index")),
        h: common_vendor.t(common_vendor.unref(mySearch).DefaultSearch),
        i: common_vendor.f(common_vendor.unref(PlaylistChart), (item, index, i0) => {
          return {
            a: "ee75a3c8-0-" + i0,
            b: common_vendor.p({
              Obj: item
            }),
            c: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ee75a3c8"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/search/module/PreSearch.vue"]]);
wx.createComponent(Component);
