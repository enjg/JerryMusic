"use strict";
const common_vendor = require("../../common/vendor.js");
const axios = require("../../axios.js");
const pinia_myMore = require("../../pinia/myMore.js");
const pinia_myShare = require("../../pinia/myShare.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  (HomePage + SongList + Album + MvList + MoreDetails + ShareSort)();
}
const ShareSort = () => "../module/ShareSort.js";
const MvList = () => "./module/MvList.js";
const HomePage = () => "./module/HomePage.js";
const SongList = () => "./module/SongList.js";
const Album = () => "./module/Album.js";
const MoreDetails = () => "../module/MoreDetails.js";
const _sfc_main = {
  __name: "index",
  props: {
    id: String
  },
  setup(__props) {
    const Props = __props;
    const myMore = pinia_myMore.useMyMore();
    const myShare = pinia_myShare.useMyShare();
    let listArray = ["主页", "歌曲", "专辑", "视频"];
    common_vendor.onMounted(() => {
      getArtistDetail(Props.id);
    });
    let listObj = common_vendor.reactive({});
    function getArtistDetail(ids) {
      axios.instance.get("/artist/detail", {
        params: {
          id: ids
        }
      }).then((res) => {
        Object.assign(listObj, res.data.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    let bjWidth = common_vendor.ref(0);
    let scrollLeft = common_vendor.ref(30);
    let scrollIndex = common_vendor.ref(0);
    const instance = common_vendor.getCurrentInstance();
    common_vendor.onMounted(() => {
      getWidth();
      getHeight();
    });
    function getWidth() {
      const query = common_vendor.index.createSelectorQuery().in(instance);
      query.select("#item1").boundingClientRect((rect) => {
        if (rect) {
          bjWidth.value = rect.width - 60;
        } else {
          console.log(rect);
          getWidth();
        }
      }).exec();
    }
    function changeTitle(event, index) {
      scrollLeft.value = event.currentTarget.offsetLeft + 30;
      scrollIndex.value = index;
    }
    function swiperChange(event) {
      if (scrollIndex.value > event.detail.current) {
        scrollLeft.value -= 60 + bjWidth.value;
      }
      if (scrollIndex.value < event.detail.current) {
        scrollLeft.value += 60 + bjWidth.value;
      }
      scrollIndex.value = event.detail.current;
    }
    let bt = common_vendor.ref(false);
    function scrollToLower() {
      console.log("底部");
      bt.value = true;
    }
    function scrollToUpper() {
      console.log("离开底部");
      bt.value = false;
    }
    function routerReturn() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    let height = common_vendor.ref(null);
    function getHeight() {
      const query = common_vendor.index.createSelectorQuery().in(instance);
      query.select("#content").boundingClientRect((rect) => {
        if (rect) {
          height.value = rect.height + 60;
        } else {
          getHeight();
        }
      }).exec();
    }
    let opc = common_vendor.ref(0);
    function handleScroll(event) {
      opc.value = event.target.scrollTop / (event.target.scrollHeight - height.value);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(listObj).artist
      }, common_vendor.unref(listObj).artist ? common_vendor.e({
        b: common_vendor.unref(opc) < 0.5
      }, common_vendor.unref(opc) < 0.5 ? {
        c: common_vendor.o(($event) => routerReturn())
      } : {
        d: common_vendor.o(($event) => routerReturn())
      }, {
        e: common_vendor.unref(opc),
        f: common_vendor.unref(listObj).artist.cover,
        g: common_vendor.t(common_vendor.unref(listObj).artist.name),
        h: common_vendor.t(common_vendor.unref(listObj).artist.alias[0]),
        i: common_vendor.unref(listObj).identify
      }, common_vendor.unref(listObj).identify ? {
        j: common_vendor.t(common_vendor.unref(listObj).identify.imageDesc)
      } : {}, {
        k: common_vendor.t(common_vendor.unref(listArray)[0]),
        l: common_vendor.unref(scrollIndex) == 0 ? 1 : "",
        m: common_vendor.o(($event) => changeTitle($event, 0)),
        n: common_vendor.t(common_vendor.unref(listArray)[1]),
        o: common_vendor.unref(scrollIndex) == 1 ? 1 : "",
        p: common_vendor.o(($event) => changeTitle($event, 1)),
        q: common_vendor.t(common_vendor.unref(listArray)[2]),
        r: common_vendor.t(common_vendor.unref(listObj).artist.albumSize),
        s: common_vendor.unref(scrollIndex) == 2 ? 1 : "",
        t: common_vendor.o(($event) => changeTitle($event, 2)),
        v: common_vendor.t(common_vendor.unref(listArray)[3]),
        w: common_vendor.t(common_vendor.unref(listObj).videoCount),
        x: common_vendor.unref(scrollIndex) == 3 ? 1 : "",
        y: common_vendor.o(($event) => changeTitle($event, 3)),
        z: common_vendor.s("left: " + common_vendor.unref(scrollLeft) + "px; width: " + common_vendor.unref(bjWidth) + "px;"),
        A: common_vendor.p({
          message: {
            id: Props.id,
            tf: common_vendor.unref(bt)
          }
        }),
        B: common_vendor.p({
          message: {
            id: Props.id,
            tf: common_vendor.unref(bt)
          }
        }),
        C: common_vendor.p({
          message: {
            id: Props.id,
            tf: common_vendor.unref(bt)
          }
        }),
        D: common_vendor.p({
          message: {
            id: Props.id,
            tf: common_vendor.unref(bt)
          }
        }),
        E: common_vendor.unref(scrollIndex),
        F: common_vendor.o(swiperChange),
        G: common_vendor.unref(myMore).TF
      }, common_vendor.unref(myMore).TF ? {} : {}, {
        H: common_vendor.unref(myShare).ShowTF
      }, common_vendor.unref(myShare).ShowTF ? {} : {}, {
        I: common_vendor.o(scrollToLower),
        J: common_vendor.o(scrollToUpper),
        K: common_vendor.o(handleScroll)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-740b96fd"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/Singer/index.vue"]]);
wx.createPage(MiniProgramPage);
