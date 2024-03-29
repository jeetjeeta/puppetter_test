let puppeteer = require("puppeteer-core"); //require("puppeteer");

let chrome = {};

// const BROWSERLESS_API_KEY =
  // process.env["TOKEN"] || "0fd64530-2641-45f8-853b-b2d6414875f8";


   const BROWSERLESS_API_KEY =
  process.env["TOKEN"] || "cd3f2dd8-516d-47ce-b453-1005ddbbab18";

// if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
//   chrome = require("chrome-aws-lambda");
//   puppeteer = require("puppeteer-core");
// } else {
//   puppeteer = require("puppeteer-core");
// }

// var path = require("path");
// const { resolve } = require("path");

const promiseSetTimeOut = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

// if (process.pkg) {
//   var puppeteer = require(path.resolve(process.cwd(), 'puppeteer'));
// } else {
//   var puppeteer = require('puppeteer');
// }

async function getElText(page, selector) {
  return await page.evaluate((selector) => {
    return document.querySelector(selector).innerText;
  }, selector);
}

const autoScroll = async (page) => {
  // console.log(document, window);
  // while(
  await page.evaluate(async () => {
    // console.log(document, window);
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 100;
      // console.log(document, window);
      // while (true) {
      var timer = setInterval(() => {
        // console.log(document, window);
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 5000);
      // }
    });
  });
  // )
};

async function scrapePage(url) {
  let options = {
    // args: ["--no-sandbox"],
    browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_API_KEY}&stealth`,
  };

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args],
      defaultViewPort: chrome.defaultViewPort,
      executablePath: await chrome.executablePath,
      ignoreHTTPSErrors: true,
    };
  }
  // const browser = await puppeteer.launch({executablePath: 'node_modules/chromium/lib/chromium/chrome-win/Chrome'});
  // const browser = await puppeteer.launch(options);

  console.log('before connecting to browserless')
  // const browser = await puppeteer.connect(options);

  const browser = await puppeteer.launch({ executablePath: "thorium-browser",
    headless: false,})



  console.log('after connecting to browserless')

  const page = await browser.newPage();
  const totalStart = Date.now();

  await page.goto(url, { timeout: 0 });

  console.log('opened url: ',url)

  // await page.setViewport({
  //   width: 1200,
  //   height: 800,
  // });
  // await autoScroll(page);

  var elements;
  var goAgain = true;
  while (goAgain) {
    const divCount = await page.$$eval("tp-yt-paper-spinner", (divs) => {
      // console.log("divs: ", divs);
      return divs.length;
    });

    console.log('divCount: ', divCount)

    await page.evaluate(async () => {
      window.scrollTo(0, document.querySelector("#primary").scrollHeight);
      // window.scrollTo(0, document.body.scrollHeight);
    });
    goAgain = divCount != 0;
  }

  console.log('page evaluated')
  elements = await page.$$("a.ytd-playlist-video-renderer");

  var len = elements.length;
  console.log(`Items in playlist: ${len}`);

  // elements=await page.$$('video')
  // const len=elements.length

  const list = [];
  for (var i = 0; i < len; i++) {
    const elem = elements[i];
    // const href=elem

    const href = await page.evaluate((e) => e.href, elem); //Chrome will return the absolute URL
    list.push(href);
    // const newPage = await browser.newPage();

    // //Following lines block media to speed up scrape
    // await newPage.setRequestInterception(true);

    // newPage.on('request', request => {
    //         const url = request.url().toLowerCase()
    //         const resourceType = request.resourceType()

    //         if (resourceType == 'media' ||
    //             url.endsWith('.mp4') ||
    //             url.endsWith('.avi') ||
    //             url.endsWith('.flv') ||
    //             url.endsWith('.mov') ||
    //             url.endsWith('.wmv') ||
    //             url.includes('videoplayback')) {
    //             request.abort();
    //         } else
    //             request.continue();
    //     })

    // const start = Date.now();
    // await newPage.goto(href);;
    // try {
    //     await newPage.waitForSelector('.short-view-count.yt-view-count-renderer');
    //     const viewCount = await getElText(newPage, '.view-count.yt-view-count-renderer');
    //     const titleText = await getElText(newPage, '.title.ytd-video-primary-info-renderer');
    //     const uploadDate = await getElText(newPage, '#date yt-formatted-string.ytd-video-primary-info-renderer');

    //     console.log('Title: ', titleText)
    //     console.log(viewCount)
    //     console.log('Upload date: ', uploadDate)
    //     // console.log('Loaded in', Date.now() - start, 'ms')
    //     await newPage.close();
    // } catch (error) {
    //     console.log("UNSUCCESSFUL SCRAPE! Video may be private or deleted.")
    // }
  }
  browser.close();
  var end = new Date().getTime();
  var time = end - totalStart;
  var shortTime = (time / 60000).toFixed(3);
  console.log(
    len +
      " items scraped in " +
      time / 1000 +
      " seconds!" +
      " (" +
      shortTime +
      ") minutes."
  );
  return list;
}

module.exports = {
  scrapePage,
};
