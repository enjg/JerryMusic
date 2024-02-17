"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const _sfc_main = {
  __name: "Album",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    common_vendor.onMounted(() => {
      getArtistAlbum(Props.message.id);
    });
    let listArray = common_vendor.reactive([]);
    function getArtistAlbum(ids) {
      axios.instance.get("/artist/album", {
        params: {
          id: ids
        }
      }).then((res) => {
        listArray.push(...res.data.hotAlbums);
      }).catch((err) => {
        console.error(err);
      });
    }
    function formatTimestampToDateString(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return year + "-" + month + "-" + day;
    }
    function routerPush(event) {
      common_vendor.wx$1.navigateTo({
        url: `/pages/Album/index?id=${event}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.picUrl,
            b: common_vendor.t(item.name),
            c: common_vendor.t(formatTimestampToDateString(item.publishTime)),
            d: common_vendor.t(item.size),
            e: common_vendor.o(($event) => routerPush(item.id), index),
            f: index
          };
        }),
        b: Props.message.tf
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9bb9039e"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/Singer/module/Album.vue"]]);
wx.createComponent(Component);
