(function() {
   let inject = (function() {
       setInterval(function () {
           if (location.href.match(/https?:\/\/mooc1-1\.chaoxing\.com\/knowledge\/cards.*/)) {
               let iframes = document.querySelectorAll('iframe');
               for (let iframe of iframes) {
                   let video = iframe.contentWindow.document.querySelector('video');
                   if (!video.currentTime || video.currentTime < video.duration) {
                       video.muted = true;
                       video.playbackRate = 16;
                       video.play();
                       return;
                   }
               }
               location.href = 'about:blank';
           } else {
               let iframe = document.querySelector('#iframe');
               if (iframe && iframe.contentWindow.location.href === 'about:blank') {
                   let right = document.querySelector('.orientationright');
                   right && right.click();
               }
           }
       }, 1000);
    }).toString();
    let script = document.createElement('script');
    script.setAttribute('injected-script', '');
    script.innerHTML = `(${inject})();`;
    document.documentElement.appendChild(script);
})();