"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
require("../../axios.js");
const pinia_myPlayBack = require("../../pinia/myPlayBack.js");
if (!Math) {
  SongList();
}
const SongList = () => "./SongList.js";
const _sfc_main = {
  __name: "player",
  setup(__props) {
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    function routerPush() {
      common_vendor.wx$1.navigateTo({
        url: "/pages/PlayDetails/index?sort=1"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(myPlayBack).id
      }, common_vendor.unref(myPlayBack).id ? common_vendor.e({
        b: common_vendor.unref(myPlayBack).CurrentSong.al.picUrl,
        c: common_vendor.o(($event) => routerPush()),
        d: common_vendor.t(common_vendor.unref(myPlayBack).CurrentSong.name),
        e: common_assets._imports_1,
        f: common_vendor.o(($event) => common_vendor.unref(myPlayBack).SongListTF = 1),
        g: common_assets._imports_0,
        h: common_vendor.o(($event) => common_vendor.unref(myPlayBack).play()),
        i: common_vendor.unref(myPlayBack).SongListTF
      }, common_vendor.unref(myPlayBack).SongListTF ? {} : {}) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71318389"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/player.vue"]]);
wx.createComponent(Component);
