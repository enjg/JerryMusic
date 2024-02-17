"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let SensibilitiesTF = common_vendor.ref(-1);
    let time = common_vendor.ref(0);
    let TimeData;
    common_vendor.watch(() => SensibilitiesTF.value, (newValue) => {
      if (newValue == -1) {
        time.value = 0;
        clearInterval(TimeData);
      } else {
        TimeData = setInterval(function() {
          time.value++;
        }, 1e3);
      }
    });
    function routerReturn() {
      common_vendor.wx$1.navigateBack({
        delta: 1
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => routerReturn()),
        b: common_assets._imports_0$3,
        c: common_vendor.o(($event) => common_vendor.isRef(SensibilitiesTF) ? SensibilitiesTF.value *= -1 : SensibilitiesTF *= -1),
        d: common_assets._imports_1$10,
        e: common_vendor.unref(SensibilitiesTF) == 1 ? 1 : "",
        f: common_vendor.unref(SensibilitiesTF) == -1
      }, common_vendor.unref(SensibilitiesTF) == -1 ? {} : {}, {
        g: common_vendor.unref(SensibilitiesTF) == -1
      }, common_vendor.unref(SensibilitiesTF) == -1 ? {} : {}, {
        h: common_vendor.unref(SensibilitiesTF) == 1
      }, common_vendor.unref(SensibilitiesTF) == 1 ? {
        i: common_vendor.t(common_vendor.unref(time))
      } : {}, {
        j: common_vendor.unref(SensibilitiesTF) == 1
      }, common_vendor.unref(SensibilitiesTF) == 1 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-96d6c94b"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/Sensibilities/index.vue"]]);
wx.createPage(MiniProgramPage);
