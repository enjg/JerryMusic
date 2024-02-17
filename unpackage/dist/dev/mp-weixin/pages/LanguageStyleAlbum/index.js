"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
if (!Math) {
  load();
}
const load = () => "../module/load.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let AreaList = [
      {
        name: "华语",
        area: "Z_H"
      },
      {
        name: "欧美",
        area: "E_A"
      },
      {
        name: "韩国",
        area: "KR"
      },
      {
        name: "日本",
        area: "JP"
      }
    ];
    let area = common_vendor.ref("Z_H");
    common_vendor.onMounted(() => {
      getAlbumListStyle(area.value);
    });
    common_vendor.watch(() => area.value, (newValue) => {
      listArray.length = 0;
      getAlbumListStyle(newValue);
    });
    let listArray = common_vendor.reactive([]);
    function getAlbumListStyle(areas) {
      axios.instance.get("/album/list/style", {
        params: {
          area: areas,
          limit: 30,
          offset: listArray.length
        }
      }).then((res) => {
        listArray.push(...res.data.albumProducts);
      }).catch((err) => {
        console.error(err);
      });
    }
    function scrolltolower() {
      getAlbumListStyle(area.value);
    }
    function routerReturn() {
      common_vendor.wx$1.navigateBack({
        delta: 1
        // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
      });
    }
    function Click(event) {
      common_vendor.wx$1.navigateTo({
        url: `/pages/DigitalAlbumDetails/index?id=${event}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => routerReturn()),
        b: common_assets._imports_0$2,
        c: common_vendor.f(common_vendor.unref(AreaList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.unref(area) == item.area ? 1 : "",
            c: common_vendor.o(($event) => common_vendor.isRef(area) ? area.value = item.area : area = item.area, index),
            d: index
          };
        }),
        d: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.coverUrl,
            b: common_vendor.t(item.albumName),
            c: common_vendor.t(item.artistName),
            d: common_vendor.t(item.price),
            e: common_vendor.o(($event) => Click(item.albumId), index),
            f: index
          };
        }),
        e: common_vendor.o(($event) => scrolltolower())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c1ee9d26"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/LanguageStyleAlbum/index.vue"]]);
wx.createPage(MiniProgramPage);
