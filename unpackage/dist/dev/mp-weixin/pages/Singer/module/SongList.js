"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const axios = require("../../../axios.js");
const pinia_myPlayBack = require("../../../pinia/myPlayBack.js");
if (!Math) {
  SongBlockOne();
}
const SongBlockOne = () => "../../module/SongBlockStyle/SongBlockOne.js";
const _sfc_main = {
  __name: "SongList",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    common_vendor.onMounted(() => {
      getArtistTopSong(Props.message.id);
    });
    let listArray = common_vendor.reactive([]);
    function getArtistTopSong(ids) {
      axios.instance.get("/artist/top/song", {
        params: {
          id: ids
        }
      }).then((res) => {
        listArray.push(...res.data.songs);
      }).catch((err) => {
        console.error(err);
      });
    }
    function SongClick(listArray2) {
      myPlayBack.PostAddSongList(listArray2);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.unref(myPlayBack).PlayDifference(common_vendor.unref(listArray))),
        b: common_assets._imports_0$4,
        c: common_vendor.o(($event) => common_vendor.unref(myPlayBack).PlayDifference(common_vendor.unref(listArray))),
        d: common_assets._imports_1$4,
        e: common_assets._imports_1,
        f: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: index,
            b: "3b9f9f93-0-" + i0,
            c: common_vendor.p({
              message: {
                name: item.name,
                index,
                mv: item.mv,
                ar: item.ar,
                fee: item.fee,
                hr: item.hr,
                sq: item.sq,
                id: item.id
              }
            })
          };
        }),
        g: Props.message.tf,
        h: common_vendor.o(($event) => SongClick(common_vendor.unref(listArray)))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3b9f9f93"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/Singer/module/SongList.vue"]]);
wx.createComponent(Component);
