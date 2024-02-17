"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  SortingBlock();
}
const SortingBlock = () => "../module/SortingBlock/SortingBlock.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onMounted(() => {
      getStyleList();
    });
    let Obj = common_vendor.reactive({});
    let listArray = common_vendor.reactive([]);
    function getStyleList() {
      axios.instance.get("/style/list").then((response) => {
        listArray.push(...response.data.data);
        postObj(listArray[0]);
      }).catch((error) => {
        console.error(error);
      });
    }
    function postObj(center) {
      Object.assign(Obj, center);
      ClickName.value = center.tagName;
    }
    let ClickName = common_vendor.ref(null);
    let ClassName = common_vendor.ref(null);
    function onTouchStart(event) {
      ClassName.value = event;
    }
    function onTouchEnd(event) {
      ClassName.value = null;
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
            a: common_vendor.t(item.tagName),
            b: common_vendor.unref(ClickName) == item.tagName ? 1 : "",
            c: common_vendor.unref(ClassName) == item.tagName ? 1 : "",
            d: common_vendor.o(($event) => onTouchStart(item.tagName), index),
            e: common_vendor.o(onTouchEnd, index),
            f: common_vendor.o(($event) => postObj(item), index),
            g: index
          };
        }),
        d: common_vendor.p({
          message: common_vendor.unref(Obj)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-484a4914"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/MusicalStyle/index.vue"]]);
wx.createPage(MiniProgramPage);
