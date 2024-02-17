"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
if (!Math) {
  (SongListBlock + load)();
}
const load = () => "../../module/load.js";
const SongListBlock = () => "../../module/SongListBlock/SongListBlock.js";
const _sfc_main = {
  __name: "SongListComponent",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    common_vendor.ref(null);
    let listArray = common_vendor.reactive([]);
    common_vendor.onMounted(() => {
      getPlaylistDetail(Props.message.name);
    });
    function getPlaylistDetail(name) {
      axios.instance.get("/top/playlist", {
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
      getPlaylistDetail(Props.message.name);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: "1fdd17c9-0-" + i0,
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
        b: common_vendor.o(($event) => scrolltolower()),
        c: "SongListComponent_content_" + Props.message.id
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1fdd17c9"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/SongList/SongListComponent/SongListComponent.vue"]]);
wx.createComponent(Component);
