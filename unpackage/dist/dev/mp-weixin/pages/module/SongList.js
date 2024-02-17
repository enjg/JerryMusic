"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
require("../../axios.js");
const pinia_myPlayBack = require("../../pinia/myPlayBack.js");
const _sfc_main = {
  __name: "SongList",
  setup(__props) {
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    function SongClick(event, index) {
      myPlayBack.index = index;
      myPlayBack.id = event.id;
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
          console.log(rect);
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
    let ClearTipsTF = common_vendor.ref(false);
    let ClearTipsSort = common_vendor.ref(null);
    function PostClearTipsTF(event) {
      ClearTipsTF.value = true;
      ClearTipsSort.value = event;
    }
    function PostTips() {
      ClearTipsTF.value = false;
      ClearTipsSort.value = null;
    }
    function PostClearPlaylist() {
      myPlayBack.SongListTF = 0;
      ClearTipsTF.value = false;
      myPlayBack.ClearPlaylist(ClearTipsSort.value);
    }
    function PlayStateClick() {
      if (myPlayBack.SongSort == 1) {
        myPlayBack.postPlayMode();
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => common_vendor.unref(myPlayBack).SongListTF = 0),
        b: common_vendor.unref(ClearTipsTF)
      }, common_vendor.unref(ClearTipsTF) ? {
        c: common_vendor.o(PostTips),
        d: common_vendor.o(PostClearPlaylist),
        e: common_vendor.o(PostTips)
      } : {}, {
        f: common_vendor.t(common_vendor.unref(myPlayBack).SongList.length),
        g: common_vendor.unref(scrollIndex) == 0 ? 1 : "",
        h: common_vendor.o(($event) => changeTitle($event, 0)),
        i: common_vendor.unref(scrollIndex) == 1 ? 1 : "",
        j: common_vendor.o(($event) => changeTitle($event, 1)),
        k: common_vendor.s("left: " + common_vendor.unref(scrollLeft) + "px; width: " + common_vendor.unref(bjWidth) + "px;"),
        l: common_vendor.unref(myPlayBack).PlayMode == 0
      }, common_vendor.unref(myPlayBack).PlayMode == 0 ? {
        m: common_assets._imports_0$10
      } : {}, {
        n: common_vendor.unref(myPlayBack).PlayMode == 0
      }, common_vendor.unref(myPlayBack).PlayMode == 0 ? {} : {}, {
        o: common_vendor.unref(myPlayBack).PlayMode == 1
      }, common_vendor.unref(myPlayBack).PlayMode == 1 ? {
        p: common_assets._imports_1$12
      } : {}, {
        q: common_vendor.unref(myPlayBack).PlayMode == 1
      }, common_vendor.unref(myPlayBack).PlayMode == 1 ? {} : {}, {
        r: common_vendor.unref(myPlayBack).PlayMode == 2
      }, common_vendor.unref(myPlayBack).PlayMode == 2 ? {
        s: common_assets._imports_2$6
      } : {}, {
        t: common_vendor.unref(myPlayBack).PlayMode == 2
      }, common_vendor.unref(myPlayBack).PlayMode == 2 ? {} : {}, {
        v: common_vendor.o(($event) => PlayStateClick()),
        w: common_assets._imports_3$5,
        x: common_assets._imports_4$1,
        y: common_vendor.o(($event) => PostClearTipsTF(1)),
        z: common_vendor.unref(myPlayBack).PlayMode !== 1
      }, common_vendor.unref(myPlayBack).PlayMode !== 1 ? {
        A: common_vendor.f(common_vendor.unref(myPlayBack).SongList, (item, index, i0) => {
          return common_vendor.e({
            a: item.fee == 1
          }, item.fee == 1 ? {} : {}, {
            b: item.fee == 1
          }, item.fee == 1 ? {} : {}, {
            c: common_vendor.t(item.name),
            d: common_vendor.f(item.ar, (items, indes, i1) => {
              return common_vendor.e({
                a: common_vendor.t(items.name),
                b: indes < item.ar.length - 1
              }, indes < item.ar.length - 1 ? {} : {});
            }),
            e: item.id === common_vendor.unref(myPlayBack).CurrentSong.id ? 1 : "",
            f: common_vendor.o(($event) => SongClick(item, index), index),
            g: index
          });
        }),
        B: common_assets._imports_5$1
      } : {
        C: common_vendor.f(common_vendor.unref(myPlayBack).RandomPlayListArray, (item, index, i0) => {
          return common_vendor.e({
            a: item.fee == 1
          }, item.fee == 1 ? {} : {}, {
            b: item.fee == 1
          }, item.fee == 1 ? {} : {}, {
            c: common_vendor.t(item.name),
            d: common_vendor.f(item.ar, (items, indes, i1) => {
              return common_vendor.e({
                a: common_vendor.t(items.name),
                b: indes < item.ar.length - 1
              }, indes < item.ar.length - 1 ? {} : {});
            }),
            e: item.id === common_vendor.unref(myPlayBack).CurrentSong.id ? 1 : "",
            f: common_vendor.o(($event) => SongClick(item, index), index),
            g: index
          });
        }),
        D: common_assets._imports_5$1
      }, {
        E: common_vendor.t(common_vendor.unref(myPlayBack).HistoryPlayArray.length),
        F: common_assets._imports_3$5,
        G: common_assets._imports_4$1,
        H: common_vendor.o(($event) => PostClearTipsTF(2)),
        I: common_vendor.f(common_vendor.unref(myPlayBack).HistoryPlayArray, (item, index, i0) => {
          return common_vendor.e({
            a: item.fee == 1
          }, item.fee == 1 ? {} : {}, {
            b: item.fee == 1
          }, item.fee == 1 ? {} : {}, {
            c: common_vendor.t(item.name),
            d: common_vendor.f(item.ar, (items, indes, i1) => {
              return common_vendor.e({
                a: common_vendor.t(items.name),
                b: indes < item.ar.length - 1
              }, indes < item.ar.length - 1 ? {} : {});
            }),
            e: common_vendor.o(($event) => SongClick(item, index), index),
            f: index
          });
        }),
        J: common_vendor.unref(scrollIndex),
        K: common_vendor.o(swiperChange)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-98993ee8"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/SongList.vue"]]);
wx.createComponent(Component);
