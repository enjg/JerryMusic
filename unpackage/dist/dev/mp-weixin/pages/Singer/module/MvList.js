"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const _sfc_main = {
  __name: "MvList",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    common_vendor.onMounted(() => {
      getArtistMv(Props.message.id);
    });
    let listArray = common_vendor.reactive([]);
    function getArtistMv(ids) {
      axios.instance.get("/artist/mv?", {
        params: {
          id: ids
        }
      }).then((res) => {
        listArray.push(...res.data.mvs);
      }).catch((err) => {
        console.error(err);
      });
    }
    function formatNumber(number) {
      if (number >= 1e8) {
        return Math.floor(number / 1e8) + "亿";
      } else if (number >= 1e5 && number < 1e8) {
        return Math.floor(number / 1e4) + "万";
      } else {
        return number.toString();
      }
    }
    function routerPush(center, event) {
      common_vendor.wx$1.navigateTo({
        url: center + "?id=" + event
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.imgurl16v9,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.publishTime),
            d: common_vendor.t(formatNumber(item.playCount)),
            e: common_vendor.o(($event) => routerPush("/pages/VideoPlayback/index", item.id), index),
            f: index
          };
        }),
        b: Props.message.tf,
        c: Props.message.tf
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-baefda82"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/Singer/module/MvList.vue"]]);
wx.createComponent(Component);
