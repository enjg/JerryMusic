"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pinia_myPlayBack = require("../../pinia/myPlayBack.js");
require("../../axios.js");
if (!Math) {
  (lyric + SongList)();
}
const SongList = () => "../module/SongList.js";
const lyric = () => "./module/lyric.js";
const _sfc_main = {
  __name: "index",
  props: {
    sort: String
  },
  setup(__props) {
    const Props = __props;
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    let index = common_vendor.ref(1);
    common_vendor.onMounted(() => {
      if (!Props.sort) {
        myPlayBack.SongSort = 2;
      }
      if (!myPlayBack.PlayPause) {
        index.value = 0;
      } else {
        index.value = 1;
      }
    });
    function fhClick() {
      common_vendor.wx$1.navigateBack({
        delta: 1
      });
    }
    let imgObj = {
      0: common_assets.imageOne,
      1: common_assets.imageTwo
    };
    let lyricdiscTF = common_vendor.ref(1);
    common_vendor.watch(() => myPlayBack.PlayPause, (newValue) => {
      if (!newValue) {
        index.value = 0;
      } else {
        index.value = 1;
      }
    });
    function formatTime(seconds) {
      seconds = Math.floor(seconds);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
      return `${formattedMinutes}:${formattedSeconds}`;
    }
    common_vendor.ref(null);
    let dynamicWidth = common_vendor.ref(50);
    function clickjdt(event) {
      let resWatch;
      let leftwatch = event.detail.x;
      const query = common_vendor.wx$1.createSelectorQuery();
      query.select(".progress").boundingClientRect(function(rect) {
        resWatch = rect.width;
        const lent = (leftwatch - 60) / resWatch;
        myPlayBack.UpdatePlaybackProgress(lent);
      }).exec();
    }
    common_vendor.watch(() => myPlayBack.SongPlayProgress, (newValue) => {
      dynamicWidth.value = newValue / (myPlayBack.CurrentSong.dt / 1e3) * 100;
    });
    function routerPush(center, type, event) {
      common_vendor.wx$1.navigateTo({
        url: center + "?type=" + type + "&id=" + event
      });
    }
    function routerPushTwo(event) {
      common_vendor.wx$1.navigateTo({
        url: "/pages/Singer/index?id=" + event
      });
    }
    common_vendor.watch(() => myPlayBack.id, (newValue) => {
      if (newValue == null) {
        fhClick();
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(myPlayBack).CurrentSong.name
      }, common_vendor.unref(myPlayBack).CurrentSong.name ? common_vendor.e({
        b: common_vendor.unref(myPlayBack).CurrentSong.al.picUrl,
        c: common_assets._imports_0$7,
        d: common_vendor.o(($event) => fhClick()),
        e: common_assets._imports_1$8,
        f: common_vendor.unref(myPlayBack).SongSort == 1
      }, common_vendor.unref(myPlayBack).SongSort == 1 ? {
        g: common_vendor.t(common_vendor.unref(myPlayBack).CurrentSong.name),
        h: common_vendor.f(common_vendor.unref(myPlayBack).CurrentSong.ar, (item, index2, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: index2 < common_vendor.unref(myPlayBack).CurrentSong.ar.length - 1
          }, index2 < common_vendor.unref(myPlayBack).CurrentSong.ar.length - 1 ? {} : {}, {
            c: common_vendor.o(($event) => routerPushTwo(item.id))
          });
        })
      } : {}, {
        i: common_vendor.unref(myPlayBack).SongSort == 2
      }, common_vendor.unref(myPlayBack).SongSort == 2 ? {
        j: common_vendor.t(common_vendor.unref(myPlayBack).CurrentSong.name)
      } : {}, {
        k: common_vendor.t(formatTime(common_vendor.unref(myPlayBack).CurrentSong.dt / 1e3)),
        l: common_vendor.t(formatTime(common_vendor.unref(myPlayBack).SongPlayProgress)),
        m: common_vendor.unref(dynamicWidth) + "%",
        n: common_vendor.unref(myPlayBack).songTime !== common_vendor.unref(myPlayBack).CurrentSong.dt
      }, common_vendor.unref(myPlayBack).songTime !== common_vendor.unref(myPlayBack).CurrentSong.dt ? {
        o: common_vendor.unref(myPlayBack).songTime / common_vendor.unref(myPlayBack).CurrentSong.dt * 100 + "%"
      } : {}, {
        p: common_vendor.o(($event) => clickjdt($event)),
        q: common_vendor.unref(imgObj)[common_vendor.unref(index)],
        r: common_vendor.o(($event) => common_vendor.unref(myPlayBack).play()),
        s: common_assets._imports_2$5,
        t: common_vendor.o(($event) => common_vendor.unref(myPlayBack).SwitchSongs(0)),
        v: common_assets._imports_3$4,
        w: common_vendor.o(($event) => common_vendor.unref(myPlayBack).SwitchSongs(1)),
        x: common_vendor.unref(myPlayBack).SongSort == 1
      }, common_vendor.unref(myPlayBack).SongSort == 1 ? {
        y: common_assets._imports_4,
        z: common_vendor.o(($event) => common_vendor.unref(myPlayBack).SongListTF = 1)
      } : {}, {
        A: common_vendor.unref(myPlayBack).PlayMode == 0 && common_vendor.unref(myPlayBack).SongSort == 1
      }, common_vendor.unref(myPlayBack).PlayMode == 0 && common_vendor.unref(myPlayBack).SongSort == 1 ? {
        B: common_vendor.o(($event) => common_vendor.unref(myPlayBack).postPlayMode()),
        C: common_assets._imports_5
      } : {}, {
        D: common_vendor.unref(myPlayBack).PlayMode == 1 && common_vendor.unref(myPlayBack).SongSort == 1
      }, common_vendor.unref(myPlayBack).PlayMode == 1 && common_vendor.unref(myPlayBack).SongSort == 1 ? {
        E: common_vendor.o(($event) => common_vendor.unref(myPlayBack).postPlayMode()),
        F: common_assets._imports_6
      } : {}, {
        G: common_vendor.unref(myPlayBack).PlayMode == 2 && common_vendor.unref(myPlayBack).SongSort == 1
      }, common_vendor.unref(myPlayBack).PlayMode == 2 && common_vendor.unref(myPlayBack).SongSort == 1 ? {
        H: common_vendor.o(($event) => common_vendor.unref(myPlayBack).postPlayMode()),
        I: common_assets._imports_7
      } : {}, {
        J: common_vendor.unref(myPlayBack).PlayPause ? 1 : "",
        K: common_assets._imports_8,
        L: common_vendor.n(common_vendor.unref(myPlayBack).PlayPause ? "cpt" : "cpf"),
        M: common_vendor.unref(myPlayBack).CurrentSong.al.picUrl,
        N: common_vendor.unref(myPlayBack).SongSort == 1
      }, common_vendor.unref(myPlayBack).SongSort == 1 ? {
        O: common_assets._imports_9,
        P: common_assets._imports_10,
        Q: common_assets._imports_11,
        R: common_vendor.o(($event) => routerPush("/pages/Review/index", 0, common_vendor.unref(myPlayBack).CurrentSong.id)),
        S: common_assets._imports_12
      } : {}, {
        T: common_vendor.unref(myPlayBack).SongSort == 2
      }, common_vendor.unref(myPlayBack).SongSort == 2 ? {
        U: common_vendor.t(common_vendor.unref(myPlayBack).CurrentSong.name),
        V: common_vendor.f(common_vendor.unref(myPlayBack).CurrentSong.ar, (item, index2, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: index2 < common_vendor.unref(myPlayBack).CurrentSong.ar.length - 1
          }, index2 < common_vendor.unref(myPlayBack).CurrentSong.ar.length - 1 ? {} : {}, {
            c: common_vendor.o(($event) => routerPushTwo(item.id), index2),
            d: index2
          });
        }),
        W: common_assets._imports_9,
        X: common_assets._imports_11,
        Y: common_vendor.o(($event) => routerPush("/pages/Review/index", 0, common_vendor.unref(myPlayBack).CurrentSong.id))
      } : {}, {
        Z: common_vendor.unref(lyricdiscTF) == 1,
        aa: common_vendor.o(($event) => common_vendor.isRef(lyricdiscTF) ? lyricdiscTF.value = 0 : lyricdiscTF = 0),
        ab: common_vendor.unref(lyricdiscTF) == 0,
        ac: common_vendor.o(($event) => common_vendor.isRef(lyricdiscTF) ? lyricdiscTF.value = 1 : lyricdiscTF = 1),
        ad: common_vendor.unref(myPlayBack).SongListTF
      }, common_vendor.unref(myPlayBack).SongListTF ? {} : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-05d86d1e"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/PlayDetails/index.vue"]]);
wx.createPage(MiniProgramPage);
