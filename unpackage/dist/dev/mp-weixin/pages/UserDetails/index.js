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
        console.log(res.data);
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
    function routerReturn() {
      common_vendor.wx$1.navigateBack({
        delta: 1
        // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
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
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(opc) < 0.5
      }, common_vendor.unref(opc) < 0.5 ? {
        b: common_vendor.o(($event) => routerReturn())
      } : {}, {
        c: common_vendor.unref(opc) > 0.5
      }, common_vendor.unref(opc) > 0.5 ? {
        d: common_vendor.o(($event) => routerReturn())
      } : {}, {
        e: common_vendor.t(common_vendor.unref(listObj).profile.nickname),
        f: common_vendor.unref(opc) > 0.5,
        g: common_vendor.unref(opc),
        h: common_vendor.unref(listObj).code
      }, common_vendor.unref(listObj).code ? {
        i: common_vendor.unref(listObj).profile.backgroundUrl,
        j: common_vendor.unref(listObj).profile.avatarUrl,
        k: common_vendor.t(common_vendor.unref(listObj).profile.nickname),
        l: common_vendor.t(common_vendor.unref(listObj).profile.signature),
        m: common_vendor.t(common_vendor.unref(listObj).profile.follows),
        n: common_vendor.t(common_vendor.unref(listObj).profile.followeds),
        o: common_vendor.t(common_vendor.unref(listObj).level)
      } : {}, {
        p: common_vendor.unref(scrollIndex) == 0 ? 1 : "",
        q: common_vendor.o(($event) => changeTitle($event, 0)),
        r: common_vendor.unref(scrollIndex) == 1 ? 1 : "",
        s: common_vendor.o(($event) => changeTitle($event, 1)),
        t: common_vendor.s("left: " + common_vendor.unref(scrollLeft) + "px; width: " + common_vendor.unref(bjWidth) + "px;"),
        v: common_vendor.p({
          message: {
            id: Props.id,
            TF: common_vendor.unref(bt)
          }
        }),
        w: common_vendor.p({
          message: {
            id: Props.id,
            TF: common_vendor.unref(bt)
          }
        }),
        x: common_vendor.unref(scrollIndex),
        y: common_vendor.o(swiperChange),
        z: !common_vendor.unref(bt) ? 1 : "",
        A: common_vendor.o(scrollToLower),
        B: common_vendor.o(scrollToUpper),
        C: common_vendor.o(handleScroll)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8cd0e5ae"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/UserDetails/index.vue"]]);
wx.createPage(MiniProgramPage);
