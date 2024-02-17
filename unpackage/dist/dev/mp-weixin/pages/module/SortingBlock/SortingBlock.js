"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "SortingBlock",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    function routerPush(event) {
      common_vendor.wx$1.navigateTo({
        url: "/pages/MusicalStyleDetails/index?id=" + event
      });
    }
    let ClassName = common_vendor.ref(null);
    function onTouchStart(event) {
      ClassName.value = event;
    }
    function onTouchEnd(event) {
      ClassName.value = null;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(Props.message.tagName),
        b: common_vendor.t(Props.message.enName),
        c: Props.message.picUrl,
        d: common_vendor.f(Props.message.childrenTags, (item, index, i0) => {
          return {
            a: common_vendor.t(item.tagName)
          };
        }),
        e: common_vendor.f(Props.message.childrenTags, (item, index, i0) => {
          return {
            a: common_vendor.t(item.tagName),
            b: common_vendor.unref(ClassName) == item.tagName ? 1 : "",
            c: common_vendor.t(item.enName),
            d: common_vendor.unref(ClassName) == item.tagName ? 1 : "",
            e: common_vendor.o(($event) => onTouchStart(item.tagName)),
            f: common_vendor.o(($event) => routerPush(item.tagId)),
            g: common_vendor.f(item.childrenTags, (items, indexs, i1) => {
              return {
                a: common_vendor.t(items.tagName),
                b: common_vendor.unref(ClassName) == items.tagName ? 1 : "",
                c: common_vendor.t(items.enName),
                d: common_vendor.unref(ClassName) == items.tagName ? 1 : "",
                e: common_vendor.o(($event) => onTouchStart(items.tagName), indexs),
                f: common_vendor.o(onTouchEnd, indexs),
                g: common_vendor.o(($event) => routerPush(items.tagId), indexs),
                h: indexs
              };
            })
          };
        }),
        f: common_vendor.o(onTouchEnd)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c26d8ecb"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/SortingBlock/SortingBlock.vue"]]);
wx.createComponent(Component);
