"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Math) {
  More();
}
const More = () => "../../module/More.js";
const _sfc_main = {
  __name: "SearchBox",
  setup(__props) {
    function routerPush() {
      common_vendor.wx$1.navigateTo({
        url: "/pages/search/index"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          sort: 1
        }),
        b: common_assets._imports_0$12,
        c: common_assets._imports_1$9,
        d: common_vendor.o(($event) => routerPush())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-482f8067"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/discover/SearchBox/SearchBox.vue"]]);
wx.createComponent(Component);
