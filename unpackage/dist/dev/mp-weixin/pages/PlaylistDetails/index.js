"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
const pinia_myPlayBack = require("../../pinia/myPlayBack.js");
const pinia_myShare = require("../../pinia/myShare.js");
const pinia_myMore = require("../../pinia/myMore.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  (SongBlockOne + MoreDetails + ShareSort)();
}
const ShareSort = () => "../module/ShareSort.js";
const SongBlockOne = () => "../module/SongBlockStyle/SongBlockOne.js";
const MoreDetails = () => "../module/MoreDetails.js";
const _sfc_main = {
  __name: "index",
  props: {
    id: String
  },
  setup(__props) {
    const Props = __props;
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    const myShare = pinia_myShare.useMyShare();
    const myMore = pinia_myMore.useMyMore();
    common_vendor.onMounted(() => {
      getPlaylistDetail(Props.id);
      getPlaylistDetailDynamic(Props.id);
    });
    let listObj = common_vendor.reactive({});
    function getPlaylistDetail(ids) {
      axios.instance.get("/playlist/detail", {
        params: {
          id: ids
        }
      }).then((res) => {
        Object.assign(listObj, res.data.playlist);
      }).catch((err) => {
        console.error(err);
      });
    }
    let countObj = common_vendor.reactive({});
    function getPlaylistDetailDynamic(ids) {
      axios.instance.get("/playlist/detail/dynamic", {
        params: {
          id: ids
        }
      }).then((res) => {
        Object.assign(countObj, res.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    function formatFansCount(fansCount) {
      if (fansCount >= 1e8) {
        return (Math.floor(fansCount / 1e7) / 10).toFixed(1) + " 亿";
      } else if (fansCount >= 1e4) {
        return (Math.floor(fansCount / 1e3) / 10).toFixed(1) + " 万";
      } else {
        return fansCount;
      }
    }
    function routerReturn() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    function extractData(str) {
      const index = str.indexOf("|");
      if (index !== -1) {
        return str.substring(0, index).trim();
      }
      return str.trim();
    }
    function routerPush(img, name, intro) {
      const encodedName = encodeURIComponent(name);
      const encodedIntro = encodeURIComponent(intro);
      const encodedimg = encodeURIComponent(img);
      common_vendor.wx$1.navigateTo({
        url: `/pages/PlaylistCover/index?name=${encodedName}&img=${encodedimg}&intro=${encodedIntro}`
      });
    }
    function clickSongList(listArray) {
      myPlayBack.PostAddSongList(listArray);
    }
    function routerPushTwo(center, type, event) {
      common_vendor.wx$1.navigateTo({
        url: center + "?type=" + type + "&id=" + event
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
    function routerPushThree(event) {
      common_vendor.wx$1.navigateTo({
        url: "/pages/UserDetails/index?id=" + event
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(listObj).name
      }, common_vendor.unref(listObj).name ? common_vendor.e({
        b: common_assets._imports_0$3,
        c: common_vendor.o(($event) => routerReturn()),
        d: common_vendor.unref(listObj).backgroundCoverUrl != null
      }, common_vendor.unref(listObj).backgroundCoverUrl != null ? {} : {}, {
        e: common_vendor.unref(listObj).backgroundCoverUrl == null && !common_vendor.unref(bt)
      }, common_vendor.unref(listObj).backgroundCoverUrl == null && !common_vendor.unref(bt) ? {} : {}, {
        f: common_vendor.unref(listObj).backgroundCoverUrl != null && common_vendor.unref(bt),
        g: common_vendor.unref(listObj).backgroundCoverUrl,
        h: common_vendor.unref(listObj).backgroundCoverUrl == null && common_vendor.unref(bt),
        i: common_vendor.t(common_vendor.unref(listObj).name),
        j: common_vendor.unref(listObj).backgroundCoverUrl == null && common_vendor.unref(bt),
        k: common_vendor.unref(listObj).backgroundCoverUrl != null
      }, common_vendor.unref(listObj).backgroundCoverUrl != null ? common_vendor.e({
        l: common_vendor.unref(listObj).backgroundCoverUrl,
        m: common_vendor.o(($event) => routerPush(common_vendor.unref(listObj).coverImgUrl, common_vendor.unref(listObj).name, common_vendor.unref(listObj).description)),
        n: common_vendor.t(extractData(common_vendor.unref(listObj).name)),
        o: common_vendor.t(common_vendor.unref(listObj).updateFrequency),
        p: common_vendor.t(common_vendor.unref(listObj).description),
        q: common_vendor.unref(countObj).shareCount
      }, common_vendor.unref(countObj).shareCount ? {
        r: common_vendor.t(formatFansCount(common_vendor.unref(countObj).shareCount))
      } : {}, {
        s: common_assets._imports_1$3,
        t: common_vendor.o(($event) => common_vendor.unref(myShare).SharePost(2, Props.id)),
        v: common_vendor.unref(countObj).commentCount
      }, common_vendor.unref(countObj).commentCount ? {
        w: common_vendor.t(formatFansCount(common_vendor.unref(countObj).commentCount))
      } : {}, {
        x: common_assets._imports_2$1,
        y: common_vendor.o(($event) => routerPushTwo("/pages/Review/index", 2, Props.id)),
        z: common_vendor.unref(countObj).bookedCount
      }, common_vendor.unref(countObj).bookedCount ? {
        A: common_vendor.t(formatFansCount(common_vendor.unref(countObj).bookedCount))
      } : {}, {
        B: common_assets._imports_3$1
      }) : common_vendor.e({
        C: common_vendor.unref(listObj).coverImgUrl,
        D: common_vendor.t(common_vendor.unref(listObj).name),
        E: common_vendor.unref(listObj).creator.avatarUrl,
        F: common_vendor.t(common_vendor.unref(listObj).creator.nickname),
        G: common_vendor.o(($event) => routerPushThree(common_vendor.unref(listObj).creator.userId)),
        H: common_vendor.unref(listObj).description
      }, common_vendor.unref(listObj).description ? {
        I: common_vendor.t(common_vendor.unref(listObj).description)
      } : {}, {
        J: common_vendor.o(($event) => routerPush(common_vendor.unref(listObj).coverImgUrl, common_vendor.unref(listObj).name, common_vendor.unref(listObj).description)),
        K: common_vendor.unref(countObj).shareCount
      }, common_vendor.unref(countObj).shareCount ? {
        L: common_vendor.t(formatFansCount(common_vendor.unref(countObj).shareCount))
      } : {}, {
        M: common_assets._imports_1$3,
        N: common_vendor.o(($event) => common_vendor.unref(myShare).SharePost(2, Props.id)),
        O: common_vendor.unref(countObj).commentCount
      }, common_vendor.unref(countObj).commentCount ? {
        P: common_vendor.t(formatFansCount(common_vendor.unref(countObj).commentCount))
      } : {}, {
        Q: common_assets._imports_2$1,
        R: common_vendor.o(($event) => routerPushTwo("/pages/Review/index", 2, Props.id)),
        S: common_vendor.unref(countObj).bookedCount
      }, common_vendor.unref(countObj).bookedCount ? {
        T: common_vendor.t(formatFansCount(common_vendor.unref(countObj).bookedCount))
      } : {}, {
        U: common_assets._imports_3$1
      }), {
        V: common_vendor.unref(listObj).name
      }, common_vendor.unref(listObj).name ? {
        W: common_vendor.o(($event) => common_vendor.unref(myPlayBack).PlayDifference(common_vendor.unref(listObj).tracks)),
        X: common_assets._imports_0$4,
        Y: common_vendor.o(($event) => common_vendor.unref(myPlayBack).PlayDifference(common_vendor.unref(listObj).tracks)),
        Z: common_vendor.t(common_vendor.unref(listObj).tracks.length),
        aa: common_assets._imports_1$4,
        ab: common_assets._imports_1,
        ac: common_vendor.f(common_vendor.unref(listObj).tracks, (item, index, i0) => {
          return {
            a: index,
            b: "dc719c36-0-" + i0,
            c: common_vendor.p({
              message: {
                name: item.name,
                index,
                mv: item.mv,
                ar: item.ar,
                fee: item.fee,
                hr: item.hr,
                sq: item.sq,
                id: item.id
              }
            })
          };
        }),
        ad: common_vendor.unref(bt),
        ae: common_vendor.o(($event) => clickSongList(common_vendor.unref(listObj).tracks))
      } : {}, {
        af: common_vendor.unref(myMore).TF
      }, common_vendor.unref(myMore).TF ? {} : {}, {
        ag: common_vendor.unref(myShare).ShowTF
      }, common_vendor.unref(myShare).ShowTF ? {} : {}, {
        ah: common_vendor.o(scrollToLower),
        ai: common_vendor.o(scrollToUpper)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dc719c36"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/PlaylistDetails/index.vue"]]);
wx.createPage(MiniProgramPage);
