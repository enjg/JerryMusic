"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "sort",
  setup(__props) {
    let listArray = common_vendor.reactive([
      {
        name: "每日推荐",
        img: common_assets.mrtj,
        path: "/pages/DailyRecommendation/index"
      },
      {
        name: "私人漫游",
        img: common_assets.srmy,
        path: "/pages/PlayDetails/index"
      },
      {
        name: "歌单",
        img: common_assets.gd,
        path: "/pages/SongList/index"
      },
      {
        name: "排行榜",
        img: common_assets.phb,
        path: "/pages/Leaderboard/index"
      },
      {
        name: "数字专辑",
        img: common_assets.szzj,
        path: "/pages/DigitalAlbum/index"
      },
      {
        name: "关注新歌",
        img: common_assets.gzxg
      }
    ]);
    function routerPush(center) {
      common_vendor.index.navigateTo({
        url: center,
        animationType: "fade-in",
        animationDuration: 200
      });
    }
    let scrollLeft = common_vendor.ref(0);
    function onScroll(event) {
      scrollLeft.value = event.target.scrollLeft / event.target.scrollWidth * 100;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => routerPush(item.path), index)
          };
        }),
        b: common_vendor.o(onScroll),
        c: common_vendor.s("left:" + common_vendor.unref(scrollLeft) + "%;")
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cdd0828c"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/discover/sort/sort.vue"]]);
wx.createComponent(Component);
