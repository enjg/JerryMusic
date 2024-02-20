"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
const pinia_myMore = require("../../pinia/myMore.js");
const pinia_myShare = require("../../pinia/myShare.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  (MusicalStyleSong + MusicalStyleAlbum + MusicalStyleSongList + MusicalStyleSinger + MoreDetails + ShareSort)();
}
const ShareSort = () => "../module/ShareSort.js";
const MoreDetails = () => "../module/MoreDetails.js";
const MusicalStyleSong = () => "./module/MusicalStyleSong.js";
const MusicalStyleAlbum = () => "./module/MusicalStyleAlbum.js";
const MusicalStyleSongList = () => "./module/MusicalStyleSongList.js";
const MusicalStyleSinger = () => "./module/MusicalStyleSinger.js";
const _sfc_main = {
  __name: "index",
  props: {
    id: String
  },
  setup(__props) {
    const Props = __props;
    const myMore = pinia_myMore.useMyMore();
    const myShare = pinia_myShare.useMyShare();
    const instance = common_vendor.getCurrentInstance();
    let bjWidth = common_vendor.ref(0);
    let scrollLeft = common_vendor.ref(30);
    let scrollIndex = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      getStyleDetail(Props.id);
      getWidth();
      getHeight();
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
        scrollLeft.value -= 60 + bjWidth.value;
      }
      if (scrollIndex.value < event.detail.current) {
        scrollLeft.value += 60 + bjWidth.value;
      }
      scrollIndex.value = event.detail.current;
    }
    let listObj = common_vendor.reactive({});
    let listArray = ["歌曲", "专辑", "歌单", "艺人"];
    function getStyleDetail(ids) {
      axios.instance.get("/style/detail", {
        params: {
          tagId: ids
        }
      }).then((res) => {
        Object.assign(listObj, res.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    function processMessage(message, variables) {
      const regex = /\${(.*?)}/g;
      return message.replace(regex, (match, capture) => variables[capture].text || match);
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
        a: common_vendor.unref(listObj).code
      }, common_vendor.unref(listObj).code ? common_vendor.e({
        b: common_vendor.o(($event) => routerReturn()),
        c: common_assets._imports_0$3,
        d: common_vendor.unref(listObj).data.cover[0],
        e: common_vendor.unref(opc),
        f: common_vendor.unref(listObj).data.cover[0],
        g: common_vendor.t(common_vendor.unref(listObj).data.parentNames),
        h: common_vendor.t(common_vendor.unref(listObj).data.name),
        i: common_vendor.t(common_vendor.unref(listObj).data.desc),
        j: common_vendor.t(common_vendor.unref(listObj).data.songNum),
        k: common_vendor.t(common_vendor.unref(listObj).data.artistNum),
        l: common_vendor.unref(listObj).data.professionalReviews
      }, common_vendor.unref(listObj).data.professionalReviews ? {
        m: common_vendor.t(processMessage(common_vendor.unref(listObj).data.professionalReviews.templateContent, common_vendor.unref(listObj).data.professionalReviews.pattern)),
        n: common_vendor.t(processMessage(common_vendor.unref(listObj).data.tagPortrait.templateContent, common_vendor.unref(listObj).data.tagPortrait.pattern))
      } : {
        o: common_assets._imports_0$4
      }, {
        p: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index == common_vendor.unref(scrollIndex) ? 1 : "",
            c: common_vendor.o(($event) => changeTitle($event, index), index),
            d: "item" + index,
            e: index
          };
        }),
        q: common_vendor.s("left: " + common_vendor.unref(scrollLeft) + "px; width: " + common_vendor.unref(bjWidth) + "px;"),
        r: common_vendor.p({
          message: {
            id: Props.id,
            tf: common_vendor.unref(bt)
          }
        }),
        s: common_vendor.p({
          message: {
            id: Props.id,
            tf: common_vendor.unref(bt)
          }
        }),
        t: common_vendor.p({
          message: {
            id: Props.id,
            tf: common_vendor.unref(bt)
          }
        }),
        v: common_vendor.p({
          message: {
            id: Props.id,
            tf: common_vendor.unref(bt)
          }
        }),
        w: common_vendor.unref(scrollIndex),
        x: common_vendor.o(swiperChange),
        y: common_vendor.unref(myMore).TF
      }, common_vendor.unref(myMore).TF ? {} : {}, {
        z: common_vendor.unref(myShare).ShowTF
      }, common_vendor.unref(myShare).ShowTF ? {} : {}, {
        A: common_vendor.o(scrollToLower),
        B: common_vendor.o(scrollToUpper),
        C: common_vendor.o(handleScroll)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d370bf77"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/MusicalStyleDetails/index.vue"]]);
wx.createPage(MiniProgramPage);
