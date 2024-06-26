const GetVideo = require("./GetVideo");
const { getData } = require("../helpers/getData");
const FileSystemCache_1 = require("../states/FileSystemCache_1");
const {
  promiseSetTimeOut,
  getExpiryTimeInHours,
  toNumber,
} = require("../helpers/helper");

const regExURL = /[?:&"\/|]+/g;

// to double check if quality is valid ot not
// suufix y means that source is y2mate instead of ytdl
const VALID_Q = [
  "144",
  "240",
  "360",
  "480",
  "720",
  "720c",
  "1080",
  "144y",
  "240y",
  "360y",
  "480y",
  "720y",
  "1080y",
];

const generateVideoDownloadURLS = async (playListName, list, q) => {
  let i = 1;

  if (!q || !VALID_Q.includes(q)) {
    q = "480";
  }

  const videoList = [];
  let videoOptions = {
    basePath: "/tmp/videos", // Optional. Path where cache files are stored (default).
    ns: `videos`, // Optional. A grouping namespace for items.
  };

  let videoCache = new FileSystemCache_1.FileSystemCache(videoOptions);

  const videoLisRecur = async (lis, q) => {
    let title = await getData(lis);
    title = title.replace(regExURL, " ");

    let obj = {};

    const videoLisRecurElse = async () => {
      let data = await GetVideo(lis, q);

      data["expiry_time"] = getExpiryTimeInHours(0.5);
      let quality = data.quality;
      obj[quality] = data;

      const downURL = data.urlDown;
      console.log(i, ": ", downURL);

      const httpRegex = /^http\.*/;
      if (!httpRegex.test(downURL)) {
        console.log("error deteced", title);
        // return;
        // continue;
      } else {
        videoCache.set(lis, obj);
      }

      await promiseSetTimeOut(1000);
      const titleQuality = `${title} ${quality}`;
      console.log(titleQuality);
      videoList.push({ downURL, title: titleQuality, type: "mp4", quality });
    };

    if (await videoCache.fileExists(lis)) {
      obj = await videoCache.get(lis);
      if (obj[q]) {
        if (obj[q].expiry_time < Date.now()) {
          delete obj[q];
          videoCache.set(lis, obj);
          await videoLisRecurElse();
          return;
        }
        const data = obj[q];
        const downURL = data.urlDown;
        const quality = data.quality;
        console.log(i, ": ", downURL);
        const titleQuality = `${title} ${quality}`;
        console.log(titleQuality);

        videoList.push({ downURL, title: titleQuality, quality });
      } else {
        const keys = Object.keys(obj);
        const highestQ = obj[keys[0]]?.highestQ;

        let quality = q;

        if (highestQ) {
          quality = toNumber(highestQ) > toNumber(q) ? q : highestQ;
        }

        if (keys.includes(quality)) {
          await videoLisRecur(lis, quality);
        } else {
          await videoLisRecurElse();
        }
      }
    } else {
      await videoLisRecurElse();
    }
  };

  for (let lis of list) {
    await videoLisRecur(lis, q);
    i++;
    // .then(async (data) => {
    // let title = data.title;

    // await mainDownload(playListName, downURL, title, "video");
    // });
  }
  console.log(" ");
  return videoList;
};

const generateIndividualVideoDownloadURL = async (playListName, lis, q) => {
  let i = 1;

  if (!q || !VALID_Q.includes(q)) {
    q = "480";
  }

  let videoOptions = {
    basePath: "/tmp/videos", // Optional. Path where cache files are stored (default).
    ns: `videos_${q}`, // Optional. A grouping namespace for items.
  };

  let videoCache = new FileSystemCache_1.FileSystemCache(videoOptions);

  const videoLisRecur = async (lis, q) => {
    let title = await getData(lis);
    title = title.replace(regExURL, " ");

    let obj = {};

    const videoLisRecurElse = async () => {
      let data = await GetVideo(lis, q);

      //quality is string
      let quality = data.quality;
      obj[quality] = data;

      const downURL = data.urlDown;
      console.log(i, ": ", downURL);

      const httpRegex = /^http\.*/;

      if (!httpRegex.test(downURL)) {
        console.log("deteced", title);
        // continue;
      } else {
        videoCache.set(lis, obj);
      }

      await promiseSetTimeOut(1000);
      const titleQuality = `${title} ${quality}`;
      console.log(titleQuality);
      return { videoURL: downURL, title: titleQuality, quality };
    };

    if (await videoCache.fileExists(lis)) {
      obj = await videoCache.get(lis);
      if (obj[q]) {
        if (obj[q].expiry_time < Date.now()) {
          delete obj[q];
          videoCache.set(lis, obj);
          await videoLisRecurElse();
          return;
        }
        const data = obj[q];
        const downURL = data.urlDown;
        const quality = data.quality;
        console.log(i, ": ", downURL);
        const titleQuality = `${title} ${quality}`;
        console.log(titleQuality);

        return { videoURL: downURL, title: titleQuality, quality };
      } else {
        const keys = Object.keys(obj);
        const { highestQ } = obj[keys[0]];
        const quality = toNumber(highestQ) > toNumber(q) ? q : highestQ;

        if (keys.includes(quality)) {
          return await videoLisRecur(lis, quality);
        } else {
          return await videoLisRecurElse();
        }
      }
    } else {
      return await videoLisRecurElse();
    }
  };

  return await videoLisRecur(lis, q);

  // const videoList = [];
  // for (let lis of list) {
  // let title = await getData(lis);
  // title = title.replace(regExURL, " ");
  //
  // let data = {};
  //
  // if (await videoCache.fileExists(lis)) {
  //   data = await videoCache.get(lis);
  //   const downURL = data.urlDown;
  //   const quality = data.quality;
  //   console.log(i, ": ", downURL);
  //   const titleQuality = `${title} ${quality}`;
  //   console.log(titleQuality);
  //
  //   return { videoURL: downURL, title: titleQuality };
  // } else {
  //   data = await GetVideo(lis, q);
  //   let quality = data.quality;
  //
  //   videoOptions = {
  //     basePath: "./.cache/videos", // Optional. Path where cache files are stored (default).
  //     ns: `videos_${quality}`, // Optional. A grouping namespace for items.
  //   };
  //
  //   videoCache = new FileSystemCache_1.FileSystemCache(videoOptions);
  //
  //   const downURL = data.urlDown;
  //   console.log(i, ": ", downURL);
  //
  //   if (downURL === "Error") {
  //     console.log("deteced", title);
  //     // continue;
  //   } else {
  //     videoCache.set(lis, data);
  //   }
  //
  //   await promiseSetTimeOut(1000);
  //   const titleQuality = `${title} ${quality}`;
  //   console.log(titleQuality);
  //   return { videoURL: downURL, title: titleQuality };
  // }

  // .then(async (data) => {
  // let title = data.title;

  // await mainDownload(playListName, downURL, title, "video");
  // });
  // }
};

module.exports = {
  generateVideoDownloadURLS,
  generateIndividualVideoDownloadURL,
};
