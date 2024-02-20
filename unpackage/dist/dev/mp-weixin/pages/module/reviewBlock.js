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
      console.log(event, "点击");
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
      return common_vendor.e({
        a: Props.event.user.avatarUrl,
        b: Props.event.pendantData
      }, Props.event.pendantData ? {
        c: Props.event.pendantData.imageUrl
      } : {}, {
        d: common_vendor.o(($event) => routerPush(Props.event.user.userId)),
        e: common_vendor.t(Props.event.user.nickname),
        f: Props.event.user.vipRights && Props.event.user.vipRights.associator
      }, Props.event.user.vipRights && Props.event.user.vipRights.associator ? {
        g: Props.event.user.vipRights.associator.iconUrl
      } : {}, {
        h: common_vendor.t(formatTimestampToDateString(Props.event.time)),
        i: common_assets._imports_0$18,
        j: common_vendor.t(Props.event.likedCount),
        k: common_vendor.t(Props.event.content)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2fba72db"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/reviewBlock.vue"]]);
wx.createComponent(Component);
