"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.onMounted(() => {
      getArtistList(0, 20, -1, -1, null);
    });
    let ListObj = common_vendor.reactive(
      [
        {
          name: "热门歌手",
          list: []
        },
        {
          name: "A",
          list: []
        },
        {
          name: "B",
          list: []
        },
        {
          name: "C",
          list: []
        },
        {
          name: "D",
          list: []
        },
        {
          name: "E",
          list: []
        },
        {
          name: "F",
          list: []
        }
      ]
    );
    function getArtistList(offsets, limits, types, areas, initials) {
      axios.instance.get("/artist/list", {
        params: {
          limit: limits,
          offset: offsets,
          type: types,
          area: areas,
          initial: initials
        }
      }).then((res) => {
        postListObj(res.data.artists);
      }).catch((err) => {
        console.error(err);
      });
    }
    function handleScrollToUpper() {
    }
    let type = common_vendor.ref(-1);
    let area = common_vendor.ref(-1);
    common_vendor.watch(() => type.value, (newValue) => {
      if (area.value == -1) {
        area.value = 7;
      } else {
        ClearData();
      }
    });
    common_vendor.watch(() => area.value, (newValue) => {
      if (type.value == -1) {
        type.value = 1;
      } else {
        ClearData();
      }
    });
    function ClearData() {
      index.value = 0;
      ListObj.forEach((element, index2) => {
        element.list.length = 0;
      });
      getArtistList(ListObj[index.value].list.length, 20, type.value, area.value, null);
    }
    function handleScrollToLower() {
      if (type.value == -1 && ListObj[0].list.length < 100) {
        getArtistList(ListObj[0].list.length, 20, type.value, area.value, null);
      }
      if (type.value != -1) {
        switch (index.value) {
          case 0:
            getArtistList(ListObj[index.value].list.length, 20, type.value, area.value, null);
            break;
          case 1:
            getArtistList(ListObj[index.value].list.length, 20, type.value, area.value, "a");
            break;
          case 2:
            getArtistList(ListObj[index.value].list.length, 20, type.value, area.value, "b");
            break;
          case 3:
            getArtistList(ListObj[index.value].list.length, 20, type.value, area.value, "c");
            break;
          case 4:
            getArtistList(ListObj[index.value].list.length, 20, type.value, area.value, "d");
            break;
          case 5:
            getArtistList(ListObj[index.value].list.length, 20, type.value, area.value, "e");
            break;
        }
      }
    }
    let index = common_vendor.ref(0);
    function postListObj(center) {
      if (ListObj[index.value].list.length == 100) {
        index.value += 1;
      }
      ListObj[index.value].list.push(...center);
    }
    function routerPush(event) {
      common_vendor.wx$1.navigateTo({
        url: "/pages/Singer/index?id=" + event
      });
    }
    function routerReturn() {
      common_vendor.wx$1.navigateBack({
        delta: 1
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.o(($event) => routerReturn()),
        c: common_vendor.unref(area) == 7 ? 1 : "",
        d: common_vendor.o(($event) => common_vendor.isRef(area) ? area.value = 7 : area = 7),
        e: common_vendor.unref(area) == 96 ? 1 : "",
        f: common_vendor.o(($event) => common_vendor.isRef(area) ? area.value = 96 : area = 96),
        g: common_vendor.unref(area) == 8 ? 1 : "",
        h: common_vendor.o(($event) => common_vendor.isRef(area) ? area.value = 8 : area = 8),
        i: common_vendor.unref(area) == 16 ? 1 : "",
        j: common_vendor.o(($event) => common_vendor.isRef(area) ? area.value = 16 : area = 16),
        k: common_vendor.unref(area) == 0 ? 1 : "",
        l: common_vendor.o(($event) => common_vendor.isRef(area) ? area.value = 0 : area = 0),
        m: common_vendor.unref(type) == 1 ? 1 : "",
        n: common_vendor.o(($event) => common_vendor.isRef(type) ? type.value = 1 : type = 1),
        o: common_vendor.unref(type) == 2 ? 1 : "",
        p: common_vendor.o(($event) => common_vendor.isRef(type) ? type.value = 2 : type = 2),
        q: common_vendor.unref(type) == 3 ? 1 : "",
        r: common_vendor.o(($event) => common_vendor.isRef(type) ? type.value = 3 : type = 3),
        s: common_vendor.f(common_vendor.unref(ListObj), (item, index2, i0) => {
          return common_vendor.e({
            a: item.list.length
          }, item.list.length ? {
            b: common_vendor.t(item.name),
            c: common_vendor.f(item.list, (items, indexs, i1) => {
              return {
                a: items.img1v1Url,
                b: common_vendor.t(items.name),
                c: common_vendor.o(($event) => routerPush(items.id), indexs),
                d: indexs
              };
            })
          } : {}, {
            d: index2
          });
        }),
        t: common_vendor.o(handleScrollToUpper),
        v: common_vendor.o(handleScrollToLower)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dc0d6c50"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/SingerList/index.vue"]]);
wx.createPage(MiniProgramPage);
