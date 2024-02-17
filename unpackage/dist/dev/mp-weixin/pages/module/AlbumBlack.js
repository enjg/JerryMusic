"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "AlbumBlack",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    function Click(event, sort) {
      if (sort == 1) {
        common_vendor.index.navigateTo({
          url: `/pages/DigitalAlbumDetails/index?id=${event}`
        });
      } else if (sort == 2) {
        common_vendor.index.navigateTo({
          url: `/pages/Album/index?id=${event}`
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: Props.message.img,
        b: common_vendor.t(Props.message.name),
        c: common_vendor.f(Props.message.artists, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: index < Props.message.artists.length - 1
          }, index < Props.message.artists.length - 1 ? {} : {}, {
            c: index
          });
        }),
        d: common_vendor.o(($event) => Click(Props.message.id, Props.message.sort))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2cd2f839"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/AlbumBlack.vue"]]);
wx.createComponent(Component);
