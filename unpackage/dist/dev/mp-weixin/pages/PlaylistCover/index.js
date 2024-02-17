"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
require("../../axios.js");
const _sfc_main = {
  __name: "index",
  props: {
    name: String,
    img: String,
    intro: String
  },
  setup(__props) {
    const Props = __props;
    function routerReturn() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    return (_ctx, _cache) => {
      return {
        a: Props.img,
        b: Props.img,
        c: common_vendor.o(($event) => routerReturn()),
        d: common_assets._imports_0$5,
        e: common_vendor.t(Props.name),
        f: common_vendor.t(Props.intro)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5fcc4554"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/PlaylistCover/index.vue"]]);
wx.createPage(MiniProgramPage);
