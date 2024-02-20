"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pinia_myUser = require("../../pinia/myUser.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  (More + DynamicState)();
}
const DynamicState = () => "./DynamicState/DynamicState.js";
const More = () => "../module/More.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const myUser = pinia_myUser.useMyUser();
    let listArray = [
      "最近",
      "本地",
      "云盘",
      "以购",
      "更多"
    ];
    const instance = common_vendor.getCurrentInstance();
    let bjWidth = common_vendor.ref(0);
    let scrollLeft = common_vendor.ref(75);
    let scrollIndex = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      getWidth();
      getHeight();
    });
    function getWidth() {
      const query = common_vendor.index.createSelectorQuery().in(instance);
      query.select("#item1").boundingClientRect((rect) => {
        if (rect && rect.width) {
          bjWidth.value = rect.width - 150;
        } else {
          getWidth();
        }
      }).exec();
    }
    function changeTitle(event, index) {
      scrollLeft.value = event.currentTarget.offsetLeft + 75;
      scrollIndex.value = index;
    }
    function swiperChange(event) {
      if (scrollIndex.value > event.detail.current) {
        scrollLeft.value -= 150 + bjWidth.value;
      }
      if (scrollIndex.value < event.detail.current) {
        scrollLeft.value += 150 + bjWidth.value;
      }
      scrollIndex.value = event.detail.current;
    }
    let bt = common_vendor.ref(false);
    let sort = common_vendor.ref(2);
    function scrollToLower() {
      console.log("底部");
      bt.value = true;
    }
    function scrollToUpper() {
      console.log("离开底部");
      bt.value = false;
    }
    function routerPush(event) {
      common_vendor.wx$1.navigateTo({
        url: event
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
      if (opc.value < 0.5) {
        sort.value = 2;
      } else {
        sort.value = 1;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(opc),
        b: common_vendor.p({
          sort: common_vendor.unref(sort)
        }),
        c: common_vendor.unref(opc) < 0.5
      }, common_vendor.unref(opc) < 0.5 ? {
        d: common_assets._imports_0$1
      } : {
        e: common_assets._imports_1$1
      }, {
        f: common_vendor.unref(opc) < 0.5
      }, common_vendor.unref(opc) < 0.5 ? {
        g: common_vendor.o(($event) => routerPush("/pages/search/index")),
        h: common_assets._imports_2
      } : {
        i: common_vendor.o(($event) => routerPush("/pages/search/index")),
        j: common_assets._imports_3
      }, {
        k: common_vendor.unref(myUser).profile.code == 200
      }, common_vendor.unref(myUser).profile.code == 200 ? {
        l: common_vendor.unref(myUser).profile.profile.avatarUrl
      } : {}, {
        m: !common_vendor.unref(myUser).profile.code
      }, !common_vendor.unref(myUser).profile.code ? {
        n: common_vendor.o(($event) => routerPush("/pages/LogIn/index"))
      } : {}, {
        o: common_vendor.unref(myUser).profile.code == 200
      }, common_vendor.unref(myUser).profile.code == 200 ? {
        p: common_vendor.t(common_vendor.unref(myUser).profile.profile.nickname),
        q: common_vendor.t(common_vendor.unref(myUser).profile.createDays),
        r: common_vendor.t(common_vendor.unref(myUser).profile.profile.follows),
        s: common_vendor.t(common_vendor.unref(myUser).profile.profile.followeds),
        t: common_vendor.t(common_vendor.unref(myUser).profile.level),
        v: common_vendor.t(common_vendor.unref(myUser).profile.listenSongs)
      } : {}, {
        w: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        x: common_vendor.unref(myUser).profile.code ? 1 : "",
        y: common_vendor.unref(scrollIndex) == 0 ? 1 : "",
        z: common_vendor.o(($event) => changeTitle($event, 0)),
        A: common_vendor.unref(scrollIndex) == 1 ? 1 : "",
        B: common_vendor.o(($event) => changeTitle($event, 1)),
        C: common_vendor.s("left: " + common_vendor.unref(scrollLeft) + "px; width: " + common_vendor.unref(bjWidth) + "px;"),
        D: common_vendor.unref(scrollIndex),
        E: common_vendor.o(swiperChange),
        F: !common_vendor.unref(bt) ? 1 : "",
        G: common_vendor.o(scrollToLower),
        H: common_vendor.o(scrollToUpper),
        I: common_vendor.o(handleScroll)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-26c6183d"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/User/index.vue"]]);
wx.createPage(MiniProgramPage);
