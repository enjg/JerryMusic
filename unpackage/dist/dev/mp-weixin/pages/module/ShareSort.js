"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pinia_myShare = require("../../pinia/myShare.js");
const pinia_myUser = require("../../pinia/myUser.js");
const _sfc_main = {
  __name: "ShareSort",
  setup(__props) {
    const myShare = pinia_myShare.useMyShare();
    const myUser = pinia_myUser.useMyUser();
    let sortArray = [{
      name: "云音乐动态",
      img: common_assets.yyydt
    }, {
      name: "私信",
      img: common_assets.sx
    }];
    let ShowTF = common_vendor.ref(true);
    function Click() {
      ShowTF.value = false;
      setTimeout(function() {
        myShare.ShowTF = false;
      }, 300);
    }
    let sortClick = common_vendor.ref(null);
    function touchstart(event) {
      sortClick.value = event;
    }
    function touchend() {
      sortClick.value = null;
    }
    function routerPush(event) {
      if (myUser.profile.code == 200) {
        myShare.ShareSortPost(event);
        if (event == 0) {
          common_vendor.wx$1.navigateTo({
            url: "/pages/ShareDT/index"
          });
        }
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/LogIn/index"
        });
      }
      Click();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => Click()),
        b: common_assets._imports_0$9,
        c: common_vendor.f(common_vendor.unref(sortArray), (item, index, i0) => {
          return common_vendor.e({
            a: item.img,
            b: common_vendor.t(item.name),
            c: common_vendor.unref(sortClick) == index
          }, common_vendor.unref(sortClick) == index ? {} : {}, {
            d: common_vendor.o(($event) => touchstart(index), index),
            e: common_vendor.o(($event) => routerPush(index), index),
            f: common_vendor.o(($event) => touchend(), index),
            g: index
          });
        }),
        d: common_vendor.unref(ShowTF) ? 1 : "",
        e: !common_vendor.unref(ShowTF) ? 1 : ""
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-78b2b4e0"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/ShareSort.vue"]]);
wx.createComponent(Component);
