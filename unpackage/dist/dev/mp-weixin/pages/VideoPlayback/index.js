"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
const pinia_myPlayBack = require("../../pinia/myPlayBack.js");
if (!Math) {
  reviewBlock();
}
const reviewBlock = () => "../module/reviewBlock.js";
const _sfc_main = {
  __name: "index",
  props: {
    id: String
  },
  setup(__props) {
    const Props = __props;
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    common_vendor.onMounted(() => {
      console.log("初始化");
      if (myPlayBack.PlayPause == true) {
        myPlayBack.play();
        console.log("成功");
      } else {
        console.log("错误");
      }
      getMvUrl(Props.id);
      getMvDetail(Props.id);
      getMvDetailInfo(Props.id);
    });
    let videoUrl = common_vendor.ref("");
    let dynamicWidth = common_vendor.ref(0);
    function getMvUrl(ids) {
      axios.instance.get("/mv/url", {
        params: {
          id: ids
        }
      }).then((res) => {
        videoUrl.value = res.data.data.url;
      }).catch((err) => {
        console.error(err);
      });
    }
    let data = common_vendor.reactive({});
    function getMvDetail(ids) {
      axios.instance.get("/mv/detail", {
        params: {
          mvid: ids
        }
      }).then((res) => {
        Object.assign(data, res.data.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    let count = common_vendor.reactive({});
    function getMvDetailInfo(ids) {
      axios.instance.get("/mv/detail/info", {
        params: {
          mvid: ids
        }
      }).then((res) => {
        Object.assign(count, res.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    function clickjdt(event) {
      let resWatch;
      let leftwatch = event.detail.x;
      const query = common_vendor.wx$1.createSelectorQuery();
      query.select(".play").boundingClientRect(function(rect) {
        resWatch = rect.width;
        const videoContext = common_vendor.index.createVideoContext("video");
        videoContext.seek(leftwatch / resWatch * data.duration / 1e3);
      }).exec();
    }
    function onTimeUpdate(e) {
      dynamicWidth.value = e.detail.currentTime * 1e3 / data.duration * 100;
    }
    let VideoPlay = common_vendor.ref(null);
    function onPlay() {
      VideoPlay.value = true;
    }
    function onPause() {
      VideoPlay.value = false;
    }
    function Click() {
      const videoContext = common_vendor.index.createVideoContext("video");
      if (VideoPlay.value) {
        videoContext.pause();
      } else {
        videoContext.play();
      }
    }
    function routerReturn() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    let reviewTF = common_vendor.ref(false);
    function reviewClick() {
      reviewTF.value = !reviewTF.value;
    }
    let reviewArray = common_vendor.reactive([]);
    common_vendor.watch(() => reviewTF.value, (newValue) => {
      if (newValue) {
        getCommentNew(Props.id, 1, sortType.value, reviewArray.length / 20 + 1, timeData.value);
      } else {
        sortType.value = 1;
        reviewArray.length = 0;
      }
    });
    let sortType = common_vendor.ref(1);
    let timeData = common_vendor.ref(null);
    function getCommentNew(id, type, sortType2, pageNo, time) {
      axios.instance.get("/comment/new", {
        params: {
          id,
          type,
          pageSize: 20,
          sortType: sortType2,
          pageNo,
          cursor: time
        }
      }).then((res) => {
        reviewArray.push(...res.data.data.comments);
        if (sortType2 == 3) {
          timeData.value = res.data.data.comments[res.data.data.comments.length - 1].time;
        }
      }).catch((err) => {
        console.error(err);
      });
    }
    function handleScrollToUpper() {
      console.log("头部");
    }
    function handleScrollToLower() {
      console.log("底部");
      getCommentNew(Props.id, 1, sortType.value, reviewArray.length / 20 + 1, timeData.value);
    }
    common_vendor.watch(() => sortType.value, (newValue) => {
      reviewArray.length = 0;
      getCommentNew(Props.id, 1, sortType.value, reviewArray.length / 20 + 1, timeData.value);
    });
    function routerPushTwo(event) {
      common_vendor.wx$1.navigateTo({
        url: "/pages/Singer/index?id=" + event
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => routerReturn()),
        b: common_vendor.unref(reviewTF) ? 1 : "",
        c: common_vendor.unref(videoUrl),
        d: common_vendor.o(onPlay),
        e: common_vendor.o(onPause),
        f: common_vendor.o(onTimeUpdate),
        g: common_vendor.unref(VideoPlay) == false
      }, common_vendor.unref(VideoPlay) == false ? {} : {}, {
        h: common_vendor.f(common_vendor.unref(data).artists.slice(0, 3), (item, index, i0) => {
          return {
            a: item.img1v1Url,
            b: index
          };
        }),
        i: common_vendor.f(common_vendor.unref(data).artists.slice(0, 3), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: index < common_vendor.unref(data).artists.length - 1
          }, index < common_vendor.unref(data).artists.length - 1 ? {} : {}, {
            c: common_vendor.o(($event) => routerPushTwo(item.id), index),
            d: index
          });
        }),
        j: common_vendor.t(common_vendor.unref(data).name),
        k: common_vendor.t(common_vendor.unref(data).publishTime),
        l: common_vendor.t(common_vendor.unref(data).name),
        m: common_vendor.f(common_vendor.unref(data).artists, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: index < common_vendor.unref(data).artists.length - 1
          }, index < common_vendor.unref(data).artists.length - 1 ? {} : {});
        }),
        n: common_assets._imports_0$8,
        o: common_vendor.t(common_vendor.unref(count).likedCount),
        p: common_vendor.o(($event) => reviewClick()),
        q: common_vendor.t(common_vendor.unref(count).commentCount),
        r: common_vendor.t(common_vendor.unref(count).shareCount),
        s: common_vendor.unref(data).cover,
        t: common_vendor.unref(reviewTF)
      }, common_vendor.unref(reviewTF) ? {
        v: common_assets._imports_1$11,
        w: common_vendor.t(common_vendor.unref(count).commentCount),
        x: common_vendor.o(($event) => common_vendor.isRef(sortType) ? sortType.value = 1 : sortType = 1),
        y: common_vendor.unref(sortType) == 1 ? 1 : "",
        z: common_vendor.o(($event) => common_vendor.isRef(sortType) ? sortType.value = 2 : sortType = 2),
        A: common_vendor.unref(sortType) == 2 ? 1 : "",
        B: common_vendor.o(($event) => common_vendor.isRef(sortType) ? sortType.value = 3 : sortType = 3),
        C: common_vendor.unref(sortType) == 3 ? 1 : "",
        D: common_vendor.f(common_vendor.unref(reviewArray), (item, index, i0) => {
          return {
            a: index,
            b: "d604ccd7-0-" + i0,
            c: common_vendor.p({
              event: item
            })
          };
        }),
        E: common_vendor.o(handleScrollToUpper),
        F: common_vendor.o(handleScrollToLower),
        G: common_vendor.o(($event) => reviewClick())
      } : {}, {
        H: common_vendor.unref(dynamicWidth) + "%",
        I: common_vendor.o(($event) => clickjdt($event)),
        J: common_vendor.o(($event) => Click(_ctx.event))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d604ccd7"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/VideoPlayback/index.vue"]]);
wx.createPage(MiniProgramPage);
