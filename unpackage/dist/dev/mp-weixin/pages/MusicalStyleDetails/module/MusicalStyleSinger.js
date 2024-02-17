"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const _sfc_main = {
  __name: "MusicalStyleSinger",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    let listArray = common_vendor.reactive([]);
    common_vendor.onMounted(() => {
      getStyleArtist(Props.message.id);
    });
    function getStyleArtist(id) {
      axios.instance.get("/style/artist", {
        params: {
          tagId: id,
          cursor: listArray.length
        }
      }).then((res) => {
        listArray.push(...res.data.data.artists);
      }).catch((err) => {
        console.error(err);
      });
    }
    function formatFansCount(fansCount) {
      if (fansCount >= 1e8) {
        return Math.floor(fansCount / 1e8) + " 亿";
      } else if (fansCount >= 1e4) {
        return Math.floor(fansCount / 1e4) + " 万";
      } else {
        return fansCount;
      }
    }
    function routerPush(event) {
      common_vendor.wx$1.navigateTo({
        url: "/pages/Singer/index?id=" + event
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.picUrl,
            b: common_vendor.t(item.name),
            c: common_vendor.t(formatFansCount(item.fansCount)),
            d: index,
            e: common_vendor.o(($event) => routerPush(item.id), index)
          };
        }),
        b: Props.message.tf
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fbf2582f"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/MusicalStyleDetails/module/MusicalStyleSinger.vue"]]);
wx.createComponent(Component);
