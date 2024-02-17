"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  (GarouselMap + sort + LatestRelease + DigitalAlbumChart + DigitalSinglesChart)();
}
const DigitalSinglesChart = () => "./module/DigitalSinglesChart.js";
const DigitalAlbumChart = () => "./module/DigitalAlbumChart.js";
const GarouselMap = () => "../module/GarouselMap.js";
const sort = () => "./module/sort.js";
const LatestRelease = () => "./module/LatestRelease.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    function routerReturn() {
      common_vendor.wx$1.navigateBack({
        delta: 1
        // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => routerReturn()),
        b: common_assets._imports_0$2
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a6942f64"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/DigitalAlbum/index.vue"]]);
wx.createPage(MiniProgramPage);
