"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const pinia_myPlayBack = require("../../../pinia/myPlayBack.js");
const pinia_myImgReveal = require("../../../pinia/myImgReveal.js");
require("../../../axios.js");
const _sfc_main = {
  __name: "DynamicStateBlockOne",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    const myImgReveal = pinia_myImgReveal.useMyImgReveal();
    common_vendor.onMounted(() => {
      console.log(Props.message);
      JsonStringObj(Props.message.json);
    });
    let EventObj = common_vendor.reactive({});
    function JsonStringObj(event) {
      Object.assign(EventObj, JSON.parse(event));
      console.log(EventObj);
    }
    function formatTimestampToDateString(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return year + "-" + month + "-" + day;
    }
    function number(event) {
      if (event > 1e5) {
        return Math.floor(event / 1e4) + "万";
      } else {
        return event;
      }
    }
    function formatMillisecondsToMinutesSeconds(milliseconds) {
      const seconds = Math.floor(milliseconds / 1e3);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
      return `${formattedMinutes}:${formattedSeconds}`;
    }
    function routerPush(event, id) {
      common_vendor.index.navigateTo({
        url: `${event}?id=${id}`
      });
    }
    let RgbStyle = common_vendor.ref("");
    common_vendor.onMounted(() => {
      if (Props.message.pics.length) {
        console.log(Props.message.pics[0].originUrl);
      }
      let rgb = getRandomRgbColor();
      RgbStyle.value = `background: linear-gradient(to right, rgba(${rgb},1),rgba(${rgb},0.5));`;
    });
    function getRandomRgbColor() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      return r + ", " + g + ", " + b;
    }
    function SongClick() {
      if (myPlayBack.id !== EventObj.song.id) {
        myPlayBack.SongListAdd(EventObj.song);
      } else {
        common_vendor.index.redirectTo({
          url: "/pages/PlayDetails/index?sort=1"
        });
      }
    }
    function SongPlay() {
      if (myPlayBack.id == EventObj.song.id) {
        myPlayBack.play();
      } else {
        SongClick();
      }
    }
    function imgMode(height, width) {
      console.log(height, width);
      if (height > width) {
        return "widthFix";
      } else {
        return "heightFix";
      }
    }
    function imgClick(event) {
      const listArray = [];
      for (let i = 0; i < Props.message.pics.length; i++) {
        listArray.push(Props.message.pics[i].originUrl);
      }
      myImgReveal.postImg(event, listArray);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: Props.message.user.avatarUrl,
        b: Props.message.pendantData
      }, Props.message.pendantData ? {
        c: Props.message.pendantData.imageAndroidUrl
      } : {}, {
        d: common_vendor.t(Props.message.user.nickname),
        e: Props.message.user.vipRights && Props.message.user.vipRights.associator
      }, Props.message.user.vipRights && Props.message.user.vipRights.associator ? {
        f: Props.message.user.vipRights.associator.iconUrl
      } : {}, {
        g: common_vendor.t(formatTimestampToDateString(Props.message.showTime)),
        h: common_vendor.unref(EventObj).msg
      }, common_vendor.unref(EventObj).msg ? {
        i: common_vendor.t(common_vendor.unref(EventObj).msg)
      } : {}, {
        j: Props.message.pics.length
      }, Props.message.pics.length ? {
        k: common_vendor.f(Props.message.pics, (item, index, i0) => {
          return {
            a: item.originUrl,
            b: common_vendor.o(($event) => imgClick(item.originUrl), index),
            c: common_vendor.n(imgMode(item.height, item.width) == "heightFix" ? "imgHeight" : "imgWidth"),
            d: imgMode(item.height, item.width),
            e: index
          };
        }),
        l: Props.message.pics.length == 8 ? 1 : "",
        m: Props.message.pics.length == 7 ? 1 : "",
        n: Props.message.pics.length === 5 ? 1 : "",
        o: Props.message.pics.length === 2 || Props.message.pics.length === 4 ? 1 : "",
        p: Props.message.pics.length === 1 ? 1 : "",
        q: Props.message.pics.length % 3 === 0 ? 1 : ""
      } : {}, {
        r: common_vendor.unref(EventObj).album
      }, common_vendor.unref(EventObj).album ? {
        s: common_vendor.unref(EventObj).album.picUrl,
        t: common_vendor.t(common_vendor.unref(EventObj).album.name),
        v: common_vendor.f(common_vendor.unref(EventObj).album.artists, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: index < common_vendor.unref(EventObj).album.artists.length - 1
          }, index < common_vendor.unref(EventObj).album.artists.length - 1 ? {} : {}, {
            c: index
          });
        }),
        w: common_vendor.o(($event) => routerPush("/pages/Album/index", common_vendor.unref(EventObj).album.id))
      } : {}, {
        x: common_vendor.unref(EventObj).playlist
      }, common_vendor.unref(EventObj).playlist ? {
        y: common_vendor.unref(EventObj).playlist.coverImgUrl,
        z: common_vendor.t(common_vendor.unref(EventObj).playlist.name),
        A: common_vendor.t(common_vendor.unref(EventObj).playlist.creator.nickname),
        B: common_vendor.o(($event) => routerPush("/pages/PlaylistDetails/index", common_vendor.unref(EventObj).playlist.id))
      } : {}, {
        C: common_vendor.unref(EventObj).mv
      }, common_vendor.unref(EventObj).mv ? {
        D: common_vendor.t(common_vendor.unref(EventObj).mv.name),
        E: common_vendor.f(common_vendor.unref(EventObj).mv.artists, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: index < common_vendor.unref(EventObj).mv.artists.length - 1
          }, index < common_vendor.unref(EventObj).mv.artists.length - 1 ? {} : {});
        }),
        F: common_vendor.unref(EventObj).mv.imgurl16v9,
        G: common_assets._imports_0$14,
        H: common_vendor.t(number(common_vendor.unref(EventObj).mv.playCount)),
        I: common_vendor.t(formatMillisecondsToMinutesSeconds(common_vendor.unref(EventObj).mv.duration)),
        J: common_vendor.o(($event) => routerPush("/pages/VideoPlayback/index", common_vendor.unref(EventObj).mv.id))
      } : {}, {
        K: common_vendor.unref(EventObj).song
      }, common_vendor.unref(EventObj).song ? common_vendor.e({
        L: common_vendor.unref(EventObj).song.album.picUrl,
        M: common_vendor.t(common_vendor.unref(EventObj).song.name),
        N: common_vendor.f(common_vendor.unref(EventObj).song.artists, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: index < common_vendor.unref(EventObj).song.artists.length - 1
          }, index < common_vendor.unref(EventObj).song.artists.length - 1 ? {} : {});
        }),
        O: common_vendor.unref(myPlayBack).id !== common_vendor.unref(EventObj).song.id || common_vendor.unref(myPlayBack).id == common_vendor.unref(EventObj).song.id && !common_vendor.unref(myPlayBack).PlayPause
      }, common_vendor.unref(myPlayBack).id !== common_vendor.unref(EventObj).song.id || common_vendor.unref(myPlayBack).id == common_vendor.unref(EventObj).song.id && !common_vendor.unref(myPlayBack).PlayPause ? {
        P: common_vendor.o(($event) => SongPlay())
      } : {}, {
        Q: common_vendor.unref(myPlayBack).id == common_vendor.unref(EventObj).song.id && common_vendor.unref(myPlayBack).PlayPause
      }, common_vendor.unref(myPlayBack).id == common_vendor.unref(EventObj).song.id && common_vendor.unref(myPlayBack).PlayPause ? {
        R: common_vendor.o(($event) => SongPlay())
      } : {}, {
        S: common_vendor.o(($event) => SongClick()),
        T: common_vendor.s(common_vendor.unref(RgbStyle))
      }) : {}, {
        U: common_assets._imports_1$16,
        V: Props.message.info.shareCount
      }, Props.message.info.shareCount ? {
        W: common_vendor.t(Props.message.info.shareCount)
      } : {}, {
        X: common_assets._imports_2$9,
        Y: Props.message.info.commentCount
      }, Props.message.info.commentCount ? {
        Z: common_vendor.t(Props.message.info.commentCount)
      } : {}, {
        aa: common_assets._imports_3$8,
        ab: Props.message.info.likedCount
      }, Props.message.info.likedCount ? {
        ac: common_vendor.t(Props.message.info.likedCount)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3988208b"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/DynamicStateBlock/DynamicStateBlockOne.vue"]]);
wx.createComponent(Component);
