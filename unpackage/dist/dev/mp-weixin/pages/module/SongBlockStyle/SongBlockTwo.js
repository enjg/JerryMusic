"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const pinia_myPlayBack = require("../../../pinia/myPlayBack.js");
const pinia_myMore = require("../../../pinia/myMore.js");
require("../../../axios.js");
const _sfc_main = {
  __name: "SongBlockTwo",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    const myMore = pinia_myMore.useMyMore();
    let ClickBJ = common_vendor.ref(null);
    function click(index, center) {
      myPlayBack.postCurrentSong(index, center);
      ClickBJ.value = 1;
      setTimeout(function() {
        ClickBJ.value = null;
        common_vendor.index.navigateTo({
          url: "/pages/PlayDetails/index?sort=1"
        });
      }, 400);
    }
    function moreClick(event) {
      myMore.TF = true;
      myMore.id = event.id;
    }
    function Mv(event) {
      common_vendor.wx$1.navigateTo({
        url: "/pages/VideoPlayback/index?id=" + event
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(ClickBJ) === 1 ? 1 : "",
        b: common_vendor.unref(ClickBJ) === 1 ? 1 : "",
        c: Props.message.img,
        d: common_vendor.t(Props.message.name),
        e: Props.message.fee == 1
      }, Props.message.fee == 1 ? {} : {}, {
        f: Props.message.fee == 1
      }, Props.message.fee == 1 ? {} : {}, {
        g: Props.message.sq !== null && Props.message.hr == null
      }, Props.message.sq !== null && Props.message.hr == null ? {} : {}, {
        h: Props.message.hr !== null
      }, Props.message.hr !== null ? {} : {}, {
        i: common_vendor.f(Props.message.ar, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: index < Props.message.ar.length - 1
          }, index < Props.message.ar.length - 1 ? {} : {}, {
            c: index
          });
        }),
        j: common_vendor.t(Props.message.al.name),
        k: Props.message.mv
      }, Props.message.mv ? {
        l: common_assets._imports_0$15,
        m: common_vendor.o(($event) => Mv(Props.message.mv))
      } : {}, {
        n: common_vendor.o(($event) => moreClick(Props.message)),
        o: common_assets._imports_1$14,
        p: common_vendor.o(($event) => click(Props.message.index, Props.message.id))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c0533e2c"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/SongBlockStyle/SongBlockTwo.vue"]]);
wx.createComponent(Component);
