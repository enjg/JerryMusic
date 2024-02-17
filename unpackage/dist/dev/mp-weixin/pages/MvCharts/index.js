"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  MvList();
}
const MvList = () => "./MvAssemble/MvList.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let listArray = ["内地", "港台", "欧美", "韩国", "日本"];
    let bjWidth = common_vendor.ref(0);
    let scrollLeft = common_vendor.ref(10);
    let scrollIndex = common_vendor.ref(0);
    const instance = common_vendor.getCurrentInstance();
    common_vendor.onMounted(() => {
      getWidth();
    });
    function getWidth() {
      const query = common_vendor.index.createSelectorQuery().in(instance);
      query.select("#item1").boundingClientRect((rect) => {
        if (rect) {
          bjWidth.value = rect.width - 20;
        } else {
          getWidth();
        }
      }).exec();
    }
    function changeTitle(event, index) {
      scrollLeft.value = event.currentTarget.offsetLeft + 10;
      scrollIndex.value = index;
    }
    function swiperChange(event) {
      if (scrollIndex.value > event.detail.current) {
        scrollLeft.value -= 50 + bjWidth.value;
      }
      if (scrollIndex.value < event.detail.current) {
        scrollLeft.value += 50 + bjWidth.value;
      }
      scrollIndex.value = event.detail.current;
    }
    function routerReturn() {
      common_vendor.wx$1.navigateBack({
        delta: 1
        // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.o(($event) => routerReturn()),
        c: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index == common_vendor.unref(scrollIndex) ? 1 : "",
            c: common_vendor.o(($event) => changeTitle($event, index), index),
            d: "item" + index,
            e: index
          };
        }),
        d: common_vendor.s("left: " + common_vendor.unref(scrollLeft) + "px; width: " + common_vendor.unref(bjWidth) + "px;"),
        e: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: "6c38df45-0-" + i0,
            b: common_vendor.p({
              message: {
                name: item
              }
            }),
            c: index
          };
        }),
        f: common_vendor.unref(scrollIndex),
        g: common_vendor.o(swiperChange)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6c38df45"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/MvCharts/index.vue"]]);
wx.createPage(MiniProgramPage);
