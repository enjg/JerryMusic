"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pinia_myMore = require("../../pinia/myMore.js");
const pinia_myShare = require("../../pinia/myShare.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  (NewSong + NewAlbum + MoreDetails + ShareSort)();
}
const ShareSort = () => "../module/ShareSort.js";
const MoreDetails = () => "../module/MoreDetails.js";
const NewSong = () => "./NewSong/NewSong.js";
const NewAlbum = () => "./NewAlbum/NewAlbum.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const myMore = pinia_myMore.useMyMore();
    const myShare = pinia_myShare.useMyShare();
    let index = common_vendor.ref(0);
    function routerReturn() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    function swiperChange(event) {
      index.value = event.detail.current;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$2,
        b: common_vendor.o(($event) => routerReturn()),
        c: common_vendor.o(($event) => common_vendor.isRef(index) ? index.value = 0 : index = 0),
        d: common_vendor.n(common_vendor.unref(index) == 0 ? "nameOne" : "nameTwo"),
        e: common_vendor.o(($event) => common_vendor.isRef(index) ? index.value = 1 : index = 1),
        f: common_vendor.n(common_vendor.unref(index) == 1 ? "nameOne" : "nameTwo"),
        g: common_vendor.s("left: " + common_vendor.unref(index) * 65 + "px;"),
        h: common_vendor.unref(index),
        i: common_vendor.o(swiperChange),
        j: common_vendor.unref(myMore).TF
      }, common_vendor.unref(myMore).TF ? {} : {}, {
        k: common_vendor.unref(myShare).ShowTF
      }, common_vendor.unref(myShare).ShowTF ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-03b6b50a"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/NewSongsAlbums/index.vue"]]);
wx.createPage(MiniProgramPage);
