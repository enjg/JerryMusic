"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const axios = require("../../../axios.js");
const pinia_myPlayBack = require("../../../pinia/myPlayBack.js");
if (!Math) {
  SongBlockTwo();
}
const SongBlockTwo = () => "../../module/SongBlockStyle/SongBlockTwo.js";
const _sfc_main = {
  __name: "MusicalStyleSong",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    let total = common_vendor.ref();
    let sort = common_vendor.ref(0);
    let listArray = common_vendor.reactive([]);
    common_vendor.onMounted(() => {
      getStyleSong(Props.message.id, sort.value);
    });
    function getStyleSong(id, sort2) {
      axios.instance.get("/style/song", {
        params: {
          tagId: id,
          sort: sort2,
          cursor: listArray.length
        }
      }).then((res) => {
        listArray.push(...res.data.data.songs);
        total.value = res.data.data.page.total;
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
        d: common_vendor.t(common_vendor.unref(total)),
        e: common_vendor.unref(sort) == 0 ? 1 : "",
        f: common_vendor.o(($event) => common_vendor.isRef(sort) ? sort.value = 0 : sort = 0),
        g: common_vendor.unref(sort) == 1 ? 1 : "",
        h: common_vendor.o(($event) => common_vendor.isRef(sort) ? sort.value = 1 : sort = 1),
        i: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: index,
            b: "7f8cec61-0-" + i0,
            c: common_vendor.p({
              message: {
                name: item.name,
                index,
                mv: item.mv,
                ar: item.ar,
                fee: item.fee,
                hr: item.hr,
                sq: item.sq,
                al: item.al,
                img: item.al.picUrl,
                id: item.id
              }
            })
          };
        }),
        j: common_vendor.o(($event) => SongClick(common_vendor.unref(listArray))),
        k: Props.message.tf
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7f8cec61"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/MusicalStyleDetails/module/MusicalStyleSong.vue"]]);
wx.createComponent(Component);
