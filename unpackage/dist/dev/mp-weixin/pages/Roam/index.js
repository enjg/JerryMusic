"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.wx$1.navigateTo({
      url: "/pages/PlayDetails/index"
    });
    common_vendor.onMounted(() => {
      common_vendor.index.hideTabBar();
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/Roam/index.vue"]]);
wx.createPage(MiniProgramPage);
