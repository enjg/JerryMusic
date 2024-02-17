"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
if (!Math) {
  (SongListBlock + load)();
}
const SongListBlock = () => "../module/SongListBlock/SongListBlock.js";
const load = () => "../module/load.js";
const _sfc_main = {
  __name: "index",
  props: {
    name: String
  },
  setup(__props) {
    const Props = __props;
    common_vendor.onMounted(() => {
      getPlaylistDetail(Props.name);
    });
    function routerReturn() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    let listArray = common_vendor.reactive([]);
    function getPlaylistDetail(name) {
      axios.instance.get("top/playlist", {
        params: {
          cat: name,
          limit: 30,
          offset: listArray.length
        }
      }).then((res) => {
        listArray.push(...res.data.playlists);
      }).catch((err) => {
        console.error(err);
      });
    }
    function scrolltolower() {
      console.log("到底部了");
      getPlaylistDetail(Props.name);
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.o(($event) => routerReturn()),
        c: common_vendor.t(Props.name),
        d: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: "eb19378d-0-" + i0,
            b: common_vendor.p({
              message: {
                id: item.id,
                name: item.name,
                img: item.coverImgUrl,
                playCount: item.playCount
              }
            }),
            c: index
          };
        }),
        e: common_vendor.o(($event) => scrolltolower())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eb19378d"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/PlaylistTabDetails/index.vue"]]);
wx.createPage(MiniProgramPage);
