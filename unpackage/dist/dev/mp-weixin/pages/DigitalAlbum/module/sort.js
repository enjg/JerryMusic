"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "sort",
  setup(__props) {
    function routerPush(center) {
      common_vendor.wx$1.navigateTo({
        url: center
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$19,
        b: common_vendor.o(($event) => routerPush("/pages/BestSellerList/index")),
        c: common_assets._imports_1$16,
        d: common_vendor.o(($event) => routerPush("/pages/LanguageStyleAlbum/index")),
        e: common_assets._imports_2$9,
        f: common_assets._imports_3$8
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5f9d4a83"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/DigitalAlbum/module/sort.vue"]]);
wx.createComponent(Component);
