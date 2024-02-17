"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const _sfc_main = {
  __name: "MusicalStyleSongList",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    let listArray = common_vendor.reactive([]);
    common_vendor.onMounted(() => {
      getStylePlaylist(Props.message.id);
    });
    function getStylePlaylist(id) {
      axios.instance.get("/style/playlist", {
        params: {
          tagId: id,
          cursor: listArray.length
        }
      }).then((res) => {
        listArray.push(...res.data.data.playlist);
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
        url: `/pages/PlaylistDetails/index?id=${event}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.cover,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.songCount),
            d: common_vendor.t(item.userName),
            e: common_vendor.t(formatFansCount(item.playCount)),
            f: common_vendor.o(($event) => routerPush(item.id), index),
            g: index
          };
        }),
        b: Props.message.tf
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ee1ca2ec"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/MusicalStyleDetails/module/MusicalStyleSongList.vue"]]);
wx.createComponent(Component);
