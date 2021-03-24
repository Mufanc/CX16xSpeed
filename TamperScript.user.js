// ==UserScript==
// @name         学习通视频16倍速连播
// @version      2021.3.25
// @author       Mufanc
// @match        *://mooc1-1.chaoxing.com/mycourse/studentstudy*
// @match        *://mooc1-1.chaoxing.com/knowledge/cards*
// @match        *://mooc1-1.chaoxing.com/ananas/modules/video/index.html*
// @grant        none
// ==/UserScript==

(function() {
    setInterval(function () {
        // 视频 video 所在 iframe
        if (location.href.match(/https?:\/\/mooc1-1\.chaoxing\.com\/ananas\/modules\/video\/index\.html.*/)) {
            window.addEventListener('message', function () {
                let video = document.querySelector('video');
                if (!video.currentTime || video.currentTime < video.duration) {
                    video.muted = true;
                    video.playbackRate = 16;
                    video.play();
                } else {
                    location.href = 'about:blank';
                }
            });
        }

        // 所有 video 的容器所在 iframe
        if (location.href.match(/https?:\/\/mooc1-1\.chaoxing\.com\/knowledge\/cards.*/)) {
            let iframes = document.querySelectorAll('iframe');
            for (let iframe of iframes) {
                iframe.contentWindow.postMessage('#', '*');
                if (iframe.contentWindow.location.href !== 'about:blank') {
                    return;
                }
            }
            location.href = 'about:blank';
        }

        // 最外层网页
        if (location.href.match(/https?:\/\/mooc1-1\.chaoxing\.com\/mycourse\/studentstudy.*/)) {
            let iframe = document.querySelector('#iframe');
            if (iframe && iframe.contentWindow.location.href === 'about:blank') {
                let right = document.querySelector('.orientationright');
                right && right.click();
            }
        }
    }, 1000);
})();
