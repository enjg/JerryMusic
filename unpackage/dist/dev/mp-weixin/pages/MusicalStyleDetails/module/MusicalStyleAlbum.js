"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const _sfc_main = {
  __name: "MusicalStyleAlbum",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    let listArray = common_vendor.reactive([]);
    let sort = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      getStyleAlbum(Props.message.id, sort.value);
    });
    function getStyleAlbum(id, sort2) {
      axios.instance.get("/style/album", {
        params: {
          tagId: id,
          sort: sort2,
          cursor: listArray.length
        }
      }).then((res) => {
        listArray.push(...res.data.data.albums);
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
      return common_vendor.e({
        a: common_vendor.unref(sort) == 0
      }, common_vendor.unref(sort) == 0 ? {} : {}, {
        b: common_vendor.unref(sort) == 1
      }, common_vendor.unref(sort) == 1 ? {} : {}, {
        c: common_vendor.unref(sort) == 0 ? 1 : "",
        d: common_vendor.o(($event) => common_vendor.isRef(sort) ? sort.value = 0 : sort = 0),
        e: common_vendor.unref(sort) == 1 ? 1 : "",
        f: common_vendor.o(($event) => common_vendor.isRef(sort) ? sort.value = 1 : sort = 1),
        g: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.blurPicUrl,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.artists[0].name),
            d: common_vendor.t(formatTimestampToDateString(item.publishTime)),
            e: common_vendor.o(($event) => routerPush(item.id), index),
            f: index
          };
        }),
        h: Props.message.tf
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/MusicalStyleDetails/module/MusicalStyleAlbum.vue"]]);
wx.createComponent(Component);
