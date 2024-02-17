"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  LeaderboardBlock();
}
const LeaderboardBlock = () => "./LeaderboardBlock/LeaderboardBlock.js";
const _sfc_main = {
  __name: "Leaderboard",
  setup(__props) {
    let listArray = common_vendor.reactive([5059642708, 71384707, 991319590, 3779678, 2884035, 6723173524]);
    function routerPush(center) {
      common_vendor.wx$1.navigateTo({
        url: center
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => routerPush("/pages/Leaderboard/index")),
        b: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: "7baa6792-0-" + i0,
            b: common_vendor.p({
              message: {
                id: item
              }
            }),
            c: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7baa6792"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/discover/Leaderboard/Leaderboard.vue"]]);
wx.createComponent(Component);
