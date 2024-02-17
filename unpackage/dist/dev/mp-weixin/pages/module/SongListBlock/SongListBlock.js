"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "SongListBlock",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    common_vendor.onMounted(() => {
      generateRandomColor();
    });
    function formatNumber(number) {
      if (number >= 1e8) {
        return Math.floor(number / 1e8) + "亿";
      } else if (number >= 1e5 && number < 1e8) {
        return Math.floor(number / 1e4) + "万";
      } else {
        return number.toString();
      }
    }
    let colors = common_vendor.ref(null);
    function generateRandomColor() {
      var red = Math.floor(Math.random() * 256);
      var green = Math.floor(Math.random() * 256);
      var blue = Math.floor(Math.random() * 256);
      var color = "#" + red.toString(16) + green.toString(16) + blue.toString(16);
      colors.value = color;
    }
    function routerPush(event) {
      common_vendor.wx$1.navigateTo({
        url: `/pages/PlaylistDetails/index?id=${event}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: Props.message.img,
        b: common_vendor.t(Props.message.name),
        c: common_assets._imports_0$14,
        d: common_vendor.t(formatNumber(Props.message.playCount)),
        e: common_vendor.unref(colors),
        f: common_vendor.o(($event) => routerPush(Props.message.id))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b56f34e0"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/SongListBlock/SongListBlock.vue"]]);
wx.createComponent(Component);
