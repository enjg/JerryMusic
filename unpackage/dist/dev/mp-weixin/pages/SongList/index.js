"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  SongListComponent();
}
const SongListComponent = () => "./SongListComponent/SongListComponent.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onMounted(() => {
      getPlaylistHot();
    });
    let listArray = common_vendor.reactive([]);
    function getPlaylistHot() {
      axios.instance.get("/playlist/hot").then((res) => {
        listArray.push(...res.data.tags);
      }).catch((err) => {
        console.error(err);
      });
    }
    function routerReturn() {
      common_vendor.index.navigateBack({
        delta: 1,
        animationType: "fade-out",
        animationDuration: 2e3
      });
    }
    function routerPush() {
      common_vendor.wx$1.navigateTo({
        url: "/pages/PlaylistTag/index"
      });
    }
    let scrollLeft = common_vendor.ref(-150);
    let scrollIndex = common_vendor.ref("0");
    let bjWidth = common_vendor.ref(28);
    function changeTitle(event, index) {
      scrollLeft.value = event.target.offsetLeft - 150;
      scrollIndex.value = index;
      let id = "#item" + index;
      const query = common_vendor.index.createSelectorQuery();
      query.select(id).boundingClientRect((rect) => {
        console.log(rect);
        bjWidth.value = rect.width;
      }).exec();
    }
    let swiperIndex = common_vendor.ref(0);
    function swiperChange(event) {
      if (event.detail.current !== scrollIndex.value) {
        swiperIndex.value = event.detail.current;
        let id = "#item" + swiperIndex.value;
        let widthOne = bjWidth.value;
        common_vendor.index.createSelectorQuery().select(id).boundingClientRect((rect) => {
          bjWidth.value = rect.width;
          if (swiperIndex.value < scrollIndex.value) {
            scrollLeft.value = scrollLeft.value - bjWidth.value - 35;
          }
          if (swiperIndex.value > scrollIndex.value) {
            scrollLeft.value = scrollLeft.value + widthOne + 35;
          }
          scrollIndex.value = swiperIndex.value;
        }).exec();
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.o(($event) => routerReturn()),
        c: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index == common_vendor.unref(scrollIndex) ? 1 : "",
            c: common_vendor.o(($event) => changeTitle($event, index), index),
            d: "item" + index,
            e: index
          };
        }),
        d: common_vendor.s("left: " + (common_vendor.unref(scrollLeft) + 150) + "px; width: " + common_vendor.unref(bjWidth) + "px;"),
        e: common_vendor.unref(scrollLeft),
        f: common_vendor.o(($event) => routerPush()),
        g: common_assets._imports_1$2,
        h: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: "61f5b9fa-0-" + i0,
            b: common_vendor.p({
              message: {
                name: item.name,
                id: item.id
              }
            }),
            c: index
          };
        }),
        i: common_vendor.unref(scrollIndex),
        j: common_vendor.o(swiperChange)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-61f5b9fa"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/SongList/index.vue"]]);
wx.createPage(MiniProgramPage);
