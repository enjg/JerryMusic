"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "NewSongBj",
  setup(__props) {
    const gradientStyle = common_vendor.ref({
      background: "linear-gradient(-45deg, #000000, #000000, #000000, #000000, #000000)"
    });
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    common_vendor.onMounted(() => {
      const colors = Array.from({
        length: 5
      }, () => getRandomColor());
      gradientStyle.value.background = `linear-gradient(-45deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]}, ${colors[4]})`;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(gradientStyle.value)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bcedbbcf"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/NewSongBj.vue"]]);
wx.createComponent(Component);
