"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  NewSongBlock();
}
const NewSongBlock = () => "../../module/NewSongBlock/NewSongBlock.js";
const _sfc_main = {
  __name: "NewSong",
  setup(__props) {
    let listArray = [
      {
        name: "全部",
        type: 0
      },
      {
        name: "华语",
        type: 7
      },
      {
        name: "欧美",
        type: 96
      },
      {
        name: "日本",
        type: 8
      },
      {
        name: "韩国",
        type: 16
      }
    ];
    let scrollIndex = common_vendor.ref(0);
    let scrollLeft = common_vendor.ref(0);
    let bjWidth = common_vendor.ref(0);
    const instance = common_vendor.getCurrentInstance();
    common_vendor.onMounted(() => {
      const query = common_vendor.index.createSelectorQuery().in(instance);
      query.select("#item0").boundingClientRect((rect) => {
        if (rect) {
          bjWidth.value = rect.width;
        }
      }).exec();
    });
    function changeTitle(event, index) {
      scrollLeft.value = event.target.offsetLeft;
      scrollIndex.value = index;
    }
    function swiperChange(event) {
      if (scrollIndex.value > event.detail.current) {
        scrollLeft.value -= 20 + bjWidth.value;
      }
      if (scrollIndex.value < event.detail.current) {
        scrollLeft.value += 20 + bjWidth.value;
      }
      scrollIndex.value = event.detail.current;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index == common_vendor.unref(scrollIndex) ? 1 : "",
            c: common_vendor.o(($event) => changeTitle($event, index), index),
            d: "item" + index,
            e: index
          };
        }),
        b: common_vendor.s("left: " + common_vendor.unref(scrollLeft) + "px; width: " + common_vendor.unref(bjWidth) + "px;"),
        c: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: "e4ec175a-0-" + i0,
            b: common_vendor.p({
              message: {
                content: item,
                index,
                sort: common_vendor.unref(scrollIndex)
              }
            }),
            c: index
          };
        }),
        d: common_vendor.unref(scrollIndex),
        e: common_vendor.o(swiperChange)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4ec175a"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/NewSongsAlbums/NewSong/NewSong.vue"]]);
wx.createComponent(Component);
