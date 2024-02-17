"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pinia_mySearch = require("../../pinia/mySearch.js");
const pinia_myShare = require("../../pinia/myShare.js");
const pinia_myMore = require("../../pinia/myMore.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  (Tips + PostSearch + PreSearch + MoreDetails + ShareSort)();
}
const ShareSort = () => "../module/ShareSort.js";
const MoreDetails = () => "../module/MoreDetails.js";
const PostSearch = () => "./module/PostSearch.js";
const PreSearch = () => "./module/PreSearch.js";
const Tips = () => "./module/Tips.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const mySearch = pinia_mySearch.useMySearch();
    const myShare = pinia_myShare.useMyShare();
    const myMore = pinia_myMore.useMyMore();
    function routerReturn() {
      common_vendor.wx$1.navigateBack({
        delta: 1
      });
    }
    function SearchClick() {
      if (mySearch.SearchText !== "") {
        mySearch.SearchTF = 1;
      }
    }
    common_vendor.onMounted(() => {
      mySearch.SearchText = "";
      mySearch.SearchTF = -1;
      mySearch.Tips = -1;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => routerReturn()),
        b: common_assets._imports_0$2,
        c: common_vendor.o(($event) => common_vendor.unref(mySearch).Tips = 1),
        d: common_vendor.unref(mySearch).DefaultSearch,
        e: common_vendor.unref(mySearch).SearchText,
        f: common_vendor.o(($event) => common_vendor.unref(mySearch).SearchText = $event.detail.value),
        g: common_assets._imports_1$9,
        h: common_vendor.o(($event) => SearchClick()),
        i: common_vendor.unref(mySearch).SearchText !== "" && common_vendor.unref(mySearch).SearchTF == -1
      }, common_vendor.unref(mySearch).SearchText !== "" && common_vendor.unref(mySearch).SearchTF == -1 ? {} : {}, {
        j: common_vendor.unref(mySearch).SearchText !== "" && common_vendor.unref(mySearch).Tips == -1 && common_vendor.unref(mySearch).SearchTF == 1
      }, common_vendor.unref(mySearch).SearchText !== "" && common_vendor.unref(mySearch).Tips == -1 && common_vendor.unref(mySearch).SearchTF == 1 ? {} : {}, {
        k: common_vendor.unref(mySearch).SearchText == ""
      }, common_vendor.unref(mySearch).SearchText == "" ? {} : {}, {
        l: common_vendor.unref(myMore).TF
      }, common_vendor.unref(myMore).TF ? {} : {}, {
        m: common_vendor.unref(myShare).ShowTF
      }, common_vendor.unref(myShare).ShowTF ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dab939d"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/search/index.vue"]]);
wx.createPage(MiniProgramPage);
