"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (Single + SongList + Mv + Singer + Album)();
}
const Album = () => "../SearchDetailsComponent/Album.js";
const Singer = () => "../SearchDetailsComponent/Singer.js";
const Mv = () => "../SearchDetailsComponent/Mv.js";
const SongList = () => "../SearchDetailsComponent/SongList.js";
const Single = () => "../SearchDetailsComponent/Single.js";
const _sfc_main = {
  __name: "PostSearch",
  setup(__props) {
    let sortList = ["单曲", "歌单", "视频", "歌手", "专辑"];
    let bjWidth = common_vendor.ref(0);
    let scrollLeft = common_vendor.ref(20);
    let scrollIndex = common_vendor.ref(0);
    const instance = common_vendor.getCurrentInstance();
    common_vendor.onMounted(() => {
      getWidth();
    });
    function getWidth() {
      const query = common_vendor.index.createSelectorQuery().in(instance);
      query.select("#item1").boundingClientRect((rect) => {
        if (rect) {
          bjWidth.value = rect.width - 40;
        } else {
          getWidth();
        }
      }).exec();
    }
    function changeTitle(event, index) {
      scrollLeft.value = event.currentTarget.offsetLeft + 20;
      scrollIndex.value = index;
    }
    function swiperChange(event) {
      if (scrollIndex.value > event.detail.current) {
        scrollLeft.value -= 40 + bjWidth.value;
      }
      if (scrollIndex.value < event.detail.current) {
        scrollLeft.value += 40 + bjWidth.value;
      }
      scrollIndex.value = event.detail.current;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(sortList), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index == common_vendor.unref(scrollIndex) ? 1 : "",
            c: common_vendor.o(($event) => changeTitle($event, index), index),
            d: "item" + index,
            e: index
          };
        }),
        b: common_vendor.s("left: " + common_vendor.unref(scrollLeft) + "px; width: " + common_vendor.unref(bjWidth) + "px;"),
        c: common_vendor.unref(scrollIndex),
        d: common_vendor.o(swiperChange)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7142d596"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/search/module/PostSearch.vue"]]);
wx.createComponent(Component);
