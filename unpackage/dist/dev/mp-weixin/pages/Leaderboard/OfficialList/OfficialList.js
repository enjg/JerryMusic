"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const axios = require("../../../axios.js");
const _sfc_main = {
  __name: "OfficialList",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    common_vendor.onMounted(() => {
      getPlaylistDetail(Props.message.id);
    });
    let listArray = common_vendor.reactive([]);
    function getPlaylistDetail(ids) {
      axios.instance.get("/playlist/detail", {
        params: {
          id: ids
        }
      }).then((res) => {
        listArray.push(...res.data.playlist.tracks.slice(0, 3));
      }).catch((err) => {
        console.error(err);
      });
    }
    function routerPush(event) {
      common_vendor.wx$1.navigateTo({
        url: `/pages/OfficialListDetails/index?id=${event}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(Props.message.name),
        b: common_vendor.f(common_vendor.unref(listArray), (items, indexs, i0) => {
          return {
            a: items.al.picUrl,
            b: indexs
          };
        }),
        c: common_assets._imports_0$6,
        d: common_vendor.f(common_vendor.unref(listArray), (items, indexs, i0) => {
          return {
            a: common_vendor.t(indexs + 1),
            b: common_vendor.t(items.name),
            c: common_vendor.f(items.ar, (itemss, indexss, i1) => {
              return common_vendor.e({
                a: common_vendor.t(itemss.name),
                b: indexss < items.ar.length - 1
              }, indexss < items.ar.length - 1 ? {} : {}, {
                c: indexss
              });
            }),
            d: indexs
          };
        }),
        e: common_vendor.o(($event) => routerPush(Props.message.id))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f1deb230"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/Leaderboard/OfficialList/OfficialList.vue"]]);
wx.createComponent(Component);
