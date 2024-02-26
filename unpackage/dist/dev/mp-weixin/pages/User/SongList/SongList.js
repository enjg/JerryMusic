"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const _sfc_main = {
  __name: "SongList",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    common_vendor.onMounted(() => {
      getUserPlaylist();
    });
    let listArray = common_vendor.reactive([]);
    function getUserPlaylist(ids) {
      axios.instance.get("/user/playlist", {
        params: {
          uid: 8866570372
        }
      }).then((res) => {
        console.log(res.data.playlist, "123456789/");
        listArray.push(...res.data.playlist);
      }).catch((err) => {
        console.error(err);
      });
    }
    function routerPush(event) {
      common_vendor.wx$1.navigateTo({
        url: `/pages/PlaylistDetails/index?id=${event}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(listArray).length),
        b: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.coverImgUrl,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.trackCount),
            d: common_vendor.t(item.playCount),
            e: common_vendor.o(($event) => routerPush(item.id), index),
            f: index
          };
        }),
        c: Props.message.TF
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cb3dec60"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/User/SongList/SongList.vue"]]);
wx.createComponent(Component);
