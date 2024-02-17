"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
const pinia_myMore = require("../../pinia/myMore.js");
const pinia_myPlayBack = require("../../pinia/myPlayBack.js");
const pinia_myShare = require("../../pinia/myShare.js");
const _sfc_main = {
  __name: "MoreDetails",
  setup(__props) {
    const myMore = pinia_myMore.useMyMore();
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    const myShare = pinia_myShare.useMyShare();
    common_vendor.onMounted(() => {
      getSongDetail(myMore.id);
    });
    common_vendor.onBeforeUnmount(() => {
      console.log("销毁");
      myMore.TF = false;
      myMore.id = null;
    });
    let MoreDetailsTF = common_vendor.ref(true);
    function Click() {
      MoreDetailsTF.value = false;
      setTimeout(function() {
        myMore.TF = false;
        myMore.id = null;
        console.log("退出");
      }, 300);
    }
    let MoreDetails = common_vendor.reactive({});
    function getSongDetail(id) {
      console.log(id);
      axios.instance.get("/song/detail", {
        params: {
          ids: id
        }
      }).then((res) => {
        Object.assign(MoreDetails, res.data.songs[0]);
        console.log(MoreDetails);
      }).catch((err) => {
        console.error(err);
      });
    }
    let centerClick = common_vendor.ref(null);
    function NextSong() {
      centerClick.value = 0;
      myPlayBack.SongListAddSong(MoreDetails);
      myMore.TF = false;
    }
    function Review() {
      centerClick.value = 1;
      common_vendor.index.navigateTo({
        url: "/pages/Review/index?type=0&id=" + myMore.id
      });
      myMore.TF = false;
    }
    function Singer() {
      centerClick.value = 2;
      common_vendor.index.navigateTo({
        url: "/pages/Singer/index?id=" + MoreDetails.ar[0].id
      });
      myMore.TF = false;
    }
    function Album() {
      centerClick.value = 3;
      common_vendor.index.navigateTo({
        url: `/pages/Album/index?id=${MoreDetails.al.id}`
      });
      myMore.TF = false;
    }
    function Mv(event) {
      centerClick.value = 4;
      common_vendor.wx$1.navigateTo({
        url: "/pages/VideoPlayback/index?id=" + event
      });
      myMore.TF = false;
    }
    function Share() {
      console.log(1111111);
      centerClick.value = 5;
      myShare.SharePost(1, myMore.id);
      myMore.TF = false;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(myMore).TF !== false
      }, common_vendor.unref(myMore).TF !== false ? common_vendor.e({
        b: common_vendor.unref(MoreDetailsTF)
      }, common_vendor.unref(MoreDetailsTF) ? {
        c: common_vendor.o(($event) => Click())
      } : {}, {
        d: common_vendor.unref(MoreDetails).name
      }, common_vendor.unref(MoreDetails).name ? common_vendor.e({
        e: common_vendor.unref(MoreDetails).al.picUrl,
        f: common_vendor.t(common_vendor.unref(MoreDetails).name),
        g: common_vendor.f(common_vendor.unref(MoreDetails).ar, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index
          };
        }),
        h: _ctx.index < common_vendor.unref(MoreDetails).ar.length - 1
      }, _ctx.index < common_vendor.unref(MoreDetails).ar.length - 1 ? {} : {}, {
        i: common_assets._imports_0$16,
        j: common_vendor.unref(centerClick) == 0 ? 1 : "",
        k: common_vendor.o(($event) => NextSong()),
        l: common_assets._imports_1$6,
        m: common_vendor.unref(centerClick) == 1 ? 1 : "",
        n: common_vendor.o(($event) => Review()),
        o: common_vendor.f(common_vendor.unref(MoreDetails).ar, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index
          };
        }),
        p: _ctx.index < common_vendor.unref(MoreDetails).ar.length - 1
      }, _ctx.index < common_vendor.unref(MoreDetails).ar.length - 1 ? {} : {}, {
        q: common_vendor.unref(centerClick) == 2 ? 1 : "",
        r: common_vendor.o(($event) => Singer()),
        s: common_vendor.t(common_vendor.unref(MoreDetails).al.name),
        t: common_vendor.unref(centerClick) == 3 ? 1 : "",
        v: common_vendor.o(($event) => Album()),
        w: common_vendor.unref(MoreDetails).mv !== 0
      }, common_vendor.unref(MoreDetails).mv !== 0 ? {
        x: common_assets._imports_2$3,
        y: common_vendor.unref(centerClick) == 4 ? 1 : "",
        z: common_vendor.o(($event) => Mv(common_vendor.unref(MoreDetails).mv))
      } : {}, {
        A: common_assets._imports_3$3,
        B: common_vendor.unref(centerClick) == 5 ? 1 : "",
        C: common_vendor.o(($event) => Share()),
        D: !common_vendor.unref(MoreDetailsTF) ? 1 : "",
        E: common_vendor.unref(MoreDetailsTF) ? 1 : ""
      }) : {}) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7a177fe5"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/MoreDetails.vue"]]);
wx.createComponent(Component);
