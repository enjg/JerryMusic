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
      console.log(Props.id);
      getPlaylistDetail(Props.id);
      getPlaylistDetailDynamic(Props.id);
      getWidth();
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
    function routerPushTwo(center, type, event, content) {
      ({
        name: content.name
      });
      common_vendor.index.navigateTo({
        url: center + "?type=" + type + "&id=" + event + "&content=" + encodeURIComponent(JSON.stringify(
          content
        ))
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
    let height = common_vendor.ref(null);
    function getWidth() {
      const query = common_vendor.index.createSelectorQuery().in(instance);
      query.select("#item1").boundingClientRect((rect) => {
        if (rect) {
          console.log(rect);
          height.value = rect.height + 60;
        } else {
          getWidth();
        }
      }).exec();
    }
    let opc = common_vendor.ref(0);
    function handleScroll(event) {
      opc.value = event.target.scrollTop / (event.target.scrollHeight - height.value);
      console.log(opc.value);
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
        e: common_vendor.unref(listObj).backgroundCoverUrl == null && common_vendor.unref(opc) < 0.5
      }, common_vendor.unref(listObj).backgroundCoverUrl == null && common_vendor.unref(opc) < 0.5 ? {} : {}, {
        f: common_vendor.unref(listObj).backgroundCoverUrl,
        g: common_vendor.unref(listObj).backgroundCoverUrl != null,
        h: common_vendor.unref(opc),
        i: common_vendor.unref(listObj).backgroundCoverUrl == null,
        j: common_vendor.unref(opc),
        k: common_vendor.t(common_vendor.unref(listObj).name),
        l: common_vendor.unref(listObj).backgroundCoverUrl == null && common_vendor.unref(opc) > 0.5,
        m: common_vendor.unref(listObj).backgroundCoverUrl != null
      }, common_vendor.unref(listObj).backgroundCoverUrl != null ? common_vendor.e({
        n: common_vendor.unref(listObj).backgroundCoverUrl,
        o: common_vendor.o(($event) => routerPush(common_vendor.unref(listObj).coverImgUrl, common_vendor.unref(listObj).name, common_vendor.unref(listObj).description)),
        p: common_vendor.t(extractData(common_vendor.unref(listObj).name)),
        q: common_vendor.t(common_vendor.unref(listObj).updateFrequency),
        r: common_vendor.t(common_vendor.unref(listObj).description),
        s: common_vendor.unref(countObj).shareCount
      }, common_vendor.unref(countObj).shareCount ? {
        t: common_vendor.t(formatFansCount(common_vendor.unref(countObj).shareCount))
      } : {}, {
        v: common_assets._imports_1$3,
        w: common_vendor.o(($event) => common_vendor.unref(myShare).SharePost(2, Props.id)),
        x: common_vendor.unref(countObj).commentCount
      }, common_vendor.unref(countObj).commentCount ? {
        y: common_vendor.t(formatFansCount(common_vendor.unref(countObj).commentCount))
      } : {}, {
        z: common_assets._imports_2$1,
        A: common_vendor.o(($event) => routerPushTwo("/pages/Review/index", 2, Props.id, common_vendor.unref(listObj))),
        B: common_vendor.unref(countObj).bookedCount
      }, common_vendor.unref(countObj).bookedCount ? {
        C: common_vendor.t(formatFansCount(common_vendor.unref(countObj).bookedCount))
      } : {}, {
        D: common_assets._imports_3$1
      }) : common_vendor.e({
        E: common_vendor.unref(listObj).coverImgUrl,
        F: common_vendor.t(common_vendor.unref(listObj).name),
        G: common_vendor.unref(listObj).creator.avatarUrl,
        H: common_vendor.t(common_vendor.unref(listObj).creator.nickname),
        I: common_vendor.o(($event) => routerPushThree(common_vendor.unref(listObj).creator.userId)),
        J: common_vendor.unref(listObj).description
      }, common_vendor.unref(listObj).description ? {
        K: common_vendor.t(common_vendor.unref(listObj).description)
      } : {}, {
        L: common_vendor.o(($event) => routerPush(common_vendor.unref(listObj).coverImgUrl, common_vendor.unref(listObj).name, common_vendor.unref(listObj).description)),
        M: common_vendor.unref(countObj).shareCount
      }, common_vendor.unref(countObj).shareCount ? {
        N: common_vendor.t(formatFansCount(common_vendor.unref(countObj).shareCount))
      } : {}, {
        O: common_assets._imports_1$3,
        P: common_vendor.o(($event) => common_vendor.unref(myShare).SharePost(2, Props.id)),
        Q: common_vendor.unref(countObj).commentCount
      }, common_vendor.unref(countObj).commentCount ? {
        R: common_vendor.t(formatFansCount(common_vendor.unref(countObj).commentCount))
      } : {}, {
        S: common_assets._imports_2$1,
        T: common_vendor.o(($event) => routerPushTwo("/pages/Review/index", 2, Props.id, common_vendor.unref(listObj))),
        U: common_vendor.unref(countObj).bookedCount
      }, common_vendor.unref(countObj).bookedCount ? {
        V: common_vendor.t(formatFansCount(common_vendor.unref(countObj).bookedCount))
      } : {}, {
        W: common_assets._imports_3$1
      }), {
        X: common_vendor.unref(listObj).name
      }, common_vendor.unref(listObj).name ? {
        Y: common_vendor.o(($event) => common_vendor.unref(myPlayBack).PlayDifference(common_vendor.unref(listObj).tracks)),
        Z: common_assets._imports_0$4,
        aa: common_vendor.o(($event) => common_vendor.unref(myPlayBack).PlayDifference(common_vendor.unref(listObj).tracks)),
        ab: common_vendor.t(common_vendor.unref(listObj).tracks.length),
        ac: common_assets._imports_1$4,
        ad: common_assets._imports_1,
        ae: common_vendor.f(common_vendor.unref(listObj).tracks, (item, index, i0) => {
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
        af: common_vendor.unref(bt),
        ag: common_vendor.o(($event) => clickSongList(common_vendor.unref(listObj).tracks))
      } : {}, {
        ah: common_vendor.unref(myMore).TF
      }, common_vendor.unref(myMore).TF ? {} : {}, {
        ai: common_vendor.unref(myShare).ShowTF
      }, common_vendor.unref(myShare).ShowTF ? {} : {}, {
        aj: common_vendor.o(scrollToLower),
        ak: common_vendor.o(scrollToUpper),
        al: common_vendor.o(handleScroll)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dc719c36"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/PlaylistDetails/index.vue"]]);
wx.createPage(MiniProgramPage);
