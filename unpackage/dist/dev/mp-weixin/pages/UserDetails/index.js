"use strict";
const common_vendor = require("../../common/vendor.js");
const axios = require("../../axios.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  (Song + DynamicState)();
}
const DynamicState = () => "./module/DynamicState.js";
const Song = () => "./module/Song.js";
const _sfc_main = {
  __name: "index",
  props: {
    id: String
  },
  setup(__props) {
    const Props = __props;
    common_vendor.onMounted(() => {
      getUserDetail(Props.id);
      getUserPlaylist(Props.id);
    });
    let listObj = common_vendor.reactive({});
    function getUserDetail(ids) {
      axios.instance.get("/user/detail", {
        params: {
          uid: ids
        }
      }).then((res) => {
        Object.assign(listObj, res.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    function getUserPlaylist(ids) {
      axios.instance.get("/user/playlist", {
        params: {
          uid: ids
        }
      }).then((res) => {
      }).catch((err) => {
        console.error(err);
      });
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
    const instance = common_vendor.getCurrentInstance();
    let bjWidth = common_vendor.ref(0);
    let scrollLeft = common_vendor.ref(75);
    let scrollIndex = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      getWidth();
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(bt)
      }, common_vendor.unref(bt) ? {
        b: common_vendor.t(common_vendor.unref(listObj).profile.nickname)
      } : {}, {
        c: common_vendor.unref(listObj).code
      }, common_vendor.unref(listObj).code ? {
        d: common_vendor.unref(listObj).profile.backgroundUrl,
        e: common_vendor.unref(listObj).profile.avatarUrl,
        f: common_vendor.t(common_vendor.unref(listObj).profile.nickname),
        g: common_vendor.t(common_vendor.unref(listObj).profile.signature),
        h: common_vendor.t(common_vendor.unref(listObj).profile.follows),
        i: common_vendor.t(common_vendor.unref(listObj).profile.followeds),
        j: common_vendor.t(common_vendor.unref(listObj).level)
      } : {}, {
        k: common_vendor.unref(scrollIndex) == 0 ? 1 : "",
        l: common_vendor.o(($event) => changeTitle($event, 0)),
        m: common_vendor.unref(scrollIndex) == 1 ? 1 : "",
        n: common_vendor.o(($event) => changeTitle($event, 1)),
        o: common_vendor.s("left: " + common_vendor.unref(scrollLeft) + "px; width: " + common_vendor.unref(bjWidth) + "px;"),
        p: common_vendor.p({
          message: {
            id: Props.id,
            TF: common_vendor.unref(bt)
          }
        }),
        q: common_vendor.p({
          message: {
            id: Props.id,
            TF: common_vendor.unref(bt)
          }
        }),
        r: common_vendor.unref(scrollIndex),
        s: common_vendor.o(swiperChange),
        t: !common_vendor.unref(bt) ? 1 : "",
        v: common_vendor.o(scrollToLower),
        w: common_vendor.o(scrollToUpper)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8cd0e5ae"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/UserDetails/index.vue"]]);
wx.createPage(MiniProgramPage);
