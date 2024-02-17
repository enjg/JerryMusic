"use strict";
const common_vendor = require("../../common/vendor.js");
const axios = require("../../axios.js");
const _sfc_main = {
  __name: "GarouselMap",
  setup(__props) {
    let listAarray = common_vendor.reactive([]);
    common_vendor.onMounted(() => {
      getcarousel();
    });
    function getcarousel() {
      axios.instance.get("/banner", {
        params: {
          type: 1
        }
      }).then((response) => {
        listAarray.push(...response.data.banners);
      }).catch((error) => {
        console.error(error);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listAarray), (item, index, i0) => {
          return {
            a: item.pic,
            b: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8ac89bbf"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/GarouselMap.vue"]]);
wx.createComponent(Component);
