"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "Mvblock",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    function routerPush(center, event) {
      common_vendor.wx$1.navigateTo({
        url: center + "?id=" + event
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => routerPush("/pages/VideoPlayback/index", Props.message.obj.id)),
        b: Props.message.obj.cover,
        c: common_vendor.t(Props.message.index + 1),
        d: Props.message.index < 3 ? 1 : "",
        e: Props.message.index + 1 === Props.message.obj.lastRank
      }, Props.message.index + 1 === Props.message.obj.lastRank ? {} : {}, {
        f: Props.message.index + 1 < Props.message.obj.lastRank
      }, Props.message.index + 1 < Props.message.obj.lastRank ? {
        g: common_vendor.t(Props.message.obj.lastRank - (Props.message.index + 1))
      } : {}, {
        h: Props.message.obj.lastRank === -1
      }, Props.message.obj.lastRank === -1 ? {} : {}, {
        i: Props.message.index + 1 > Props.message.obj.lastRank && Props.message.obj.lastRank !== -1
      }, Props.message.index + 1 > Props.message.obj.lastRank && Props.message.obj.lastRank !== -1 ? {
        j: common_vendor.t(Props.message.index + 1 - Props.message.obj.lastRank)
      } : {}, {
        k: common_vendor.t(Props.message.obj.name),
        l: common_vendor.t(Props.message.obj.artistName)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-93ac99f1"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/MvCharts/MV/Mvblock.vue"]]);
wx.createComponent(Component);
