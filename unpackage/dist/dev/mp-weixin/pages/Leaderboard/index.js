"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  OfficialList();
}
const OfficialList = () => "./OfficialList/OfficialList.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onMounted(() => {
      getToplist();
      getTopMv();
    });
    let listArray = common_vendor.reactive([]);
    let authorityArray = common_vendor.reactive([]);
    function getToplist() {
      axios.instance.get("/toplist/detail").then((res) => {
        listArray.push(...res.data.list);
        listArray.splice(0, 4);
        authorityArray.push(...res.data.list.slice(0, 4));
        getRandomElements(listArray, 3);
      }).catch((err) => {
        console.error(err);
      });
    }
    let RecommendedListArray = common_vendor.reactive([]);
    function getRandomElements(arr, n) {
      const randomElements = [];
      const cloneArr = arr.slice();
      for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * cloneArr.length);
        const element = cloneArr.splice(randomIndex, 1)[0];
        randomElements.push(element);
      }
      RecommendedListArray.push(...randomElements);
    }
    let mvListArray = common_vendor.reactive([]);
    function getTopMv() {
      axios.instance.get("/top/mv", {
        params: {
          limit: 3
        }
      }).then((res) => {
        mvListArray.push(...res.data.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    function routerPush(event) {
      common_vendor.wx$1.navigateTo({
        url: `/pages/PlaylistDetails/index?id=${event}`
      });
    }
    function routerPushTwo() {
      common_vendor.wx$1.navigateTo({
        url: "/pages/MvCharts/index"
      });
    }
    function routerReturn() {
      common_vendor.wx$1.navigateBack({
        delta: 1
        // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
      });
    }
    function routerPushThree() {
      common_vendor.wx$1.navigateTo({
        url: "/pages/MusicalStyle/index"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.o(($event) => routerReturn()),
        c: common_vendor.f(common_vendor.unref(RecommendedListArray), (item, index, i0) => {
          return {
            a: item.coverImgUrl,
            b: common_vendor.o(($event) => routerPush(item.id), index),
            c: index
          };
        }),
        d: common_assets._imports_0$6,
        e: common_assets._imports_2$2,
        f: common_vendor.f(common_vendor.unref(authorityArray), (item, index, i0) => {
          return {
            a: index,
            b: "e6ce7603-0-" + i0,
            c: common_vendor.p({
              message: item
            })
          };
        }),
        g: common_vendor.f(common_vendor.unref(mvListArray), (item, index, i0) => {
          return {
            a: item.cover,
            b: index
          };
        }),
        h: common_assets._imports_3$2,
        i: common_vendor.f(common_vendor.unref(mvListArray), (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.t(item.name),
            c: index
          };
        }),
        j: common_vendor.o(($event) => routerPushTwo()),
        k: common_vendor.o(($event) => routerPushThree()),
        l: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.coverImgUrl,
            b: common_vendor.o(($event) => routerPush(item.id), index),
            c: index
          };
        }),
        m: common_assets._imports_0$6
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e6ce7603"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/Leaderboard/index.vue"]]);
wx.createPage(MiniProgramPage);
