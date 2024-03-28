"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const pinia_myPlayBack = require("../../../pinia/myPlayBack.js");
const _sfc_main = {
  __name: "LatestAlbum",
  setup(__props) {
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    getPersonalizedNewsong();
    getAlbumNewest();
    let listArray = common_vendor.reactive([]);
    function getPersonalizedNewsong() {
      axios.instance.get("/personalized/newsong", {
        params: {
          limit: 6
        }
      }).then((response) => {
        listArray.push(...response.data.result);
      }).catch((error) => {
        console.error(error);
      });
    }
    let albumListArray = common_vendor.reactive([]);
    function getAlbumNewest() {
      axios.instance.get("/album/newest", {
        params: {
          limit: 6
        }
      }).then((response) => {
        albumListArray.push(...response.data.albums.slice(0, 6));
      }).catch((error) => {
        console.error(error);
      });
    }
    function Click(index, event, list) {
      pulseId.value = event;
      setTimeout(function() {
        pulseId.value = null;
        if (myPlayBack.id == event) {
          common_vendor.index.navigateTo({
            url: "/pages/PlayDetails/index?sort=1"
          });
        } else {
          myPlayBack.PostAddSongList(list);
          myPlayBack.postCurrentSong(index, event);
        }
      }, 500);
    }
    let pulseId = common_vendor.ref(null);
    function albumClick(event) {
      pulseId.value = event;
      setTimeout(function() {
        pulseId.value = null;
        common_vendor.wx$1.navigateTo({
          url: `/pages/Album/index?id=${event}`
        });
      }, 500);
    }
    function routerPush() {
      common_vendor.wx$1.navigateTo({
        url: "/pages/NewSongsAlbums/index"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => routerPush()),
        b: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.picUrl + "?param=100y100",
            b: common_vendor.t(item.name),
            c: common_vendor.f(item.song.artists, (items, indexs, i1) => {
              return common_vendor.e({
                a: common_vendor.t(items.name),
                b: indexs < item.song.artists.length - 1
              }, indexs < item.song.artists.length - 1 ? {} : {}, {
                c: indexs
              });
            }),
            d: common_vendor.unref(pulseId) == item.id ? 1 : "",
            e: common_vendor.o(($event) => Click(index, item.id, common_vendor.unref(listArray)), index),
            f: index,
            g: index < 3
          };
        }),
        c: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: item.picUrl + "?param=100y100",
            b: common_vendor.t(item.name),
            c: common_vendor.f(item.song.artists, (items, indexs, i1) => {
              return common_vendor.e({
                a: common_vendor.t(items.name),
                b: indexs < item.song.artists.length - 1
              }, indexs < item.song.artists.length - 1 ? {} : {}, {
                c: indexs
              });
            }),
            d: common_vendor.unref(pulseId) == item.id ? 1 : "",
            e: common_vendor.o(($event) => Click(index, item.id, common_vendor.unref(listArray)), index),
            f: index,
            g: index > 2
          };
        }),
        d: common_vendor.f(common_vendor.unref(albumListArray), (item, index, i0) => {
          return {
            a: item.picUrl + "?param=100y100",
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.company),
            d: common_vendor.t(item.artist.name),
            e: common_vendor.unref(pulseId) == item.id ? 1 : "",
            f: common_vendor.o(($event) => albumClick(item.id), index),
            g: index,
            h: index < 3
          };
        }),
        e: common_vendor.f(common_vendor.unref(albumListArray), (item, index, i0) => {
          return {
            a: item.picUrl + "?param=100y100",
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.company),
            d: common_vendor.t(item.artist.name),
            e: common_vendor.unref(pulseId) == item.id ? 1 : "",
            f: common_vendor.o(($event) => albumClick(item.id), index),
            g: index,
            h: index > 2
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ed743c01"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/discover/LatestAlbum/LatestAlbum.vue"]]);
wx.createComponent(Component);
