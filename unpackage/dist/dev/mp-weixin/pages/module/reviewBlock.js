"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "reviewBlock",
  props: {
    event: Object
  },
  setup(__props) {
    const Props = __props;
    function routerPush(event) {
      common_vendor.wx$1.navigateTo({
        url: "/pages/UserDetails/index?id=" + event
      });
    }
    function formatTimestampToDateString(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return year + "-" + month + "-" + day;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => routerPush(Props.event.user.userId)),
        b: Props.event.user.avatarUrl,
        c: common_vendor.t(Props.event.user.nickname),
        d: common_vendor.t(formatTimestampToDateString(Props.event.time)),
        e: common_assets._imports_0$18,
        f: common_vendor.t(Props.event.likedCount),
        g: common_vendor.t(Props.event.content)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2fba72db"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/reviewBlock.vue"]]);
wx.createComponent(Component);
