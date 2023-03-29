// Wait for the video element to be ready
var interval = setInterval(function() {
    var video = document.getElementsByTagName("video")[0];
    if (video) {
      clearInterval(interval);
  
      // Create a canvas element
      var canvas = document.createElement("canvas");
      canvas.id = "videoeffect_canvas";
      canvas.width = 1920;//video.videoWidth; // canvas size should be reactive to video size (use the loop)
      canvas.height = 1080;//video.videoHeight;
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.zIndex = "9999";
      console.log("video width: "+video.videoWidth);
      var ctx = canvas.getContext("2d");
      var frame_overlay_alpha = 0; function setOverlayAlpha(num){frame_overlay_alpha=1-num;}
      setOverlayAlpha(0.15);
      ctx.globalAlpha = frame_overlay_alpha;
      // add boolean to disable overlay
  
      // Add the canvas element after the video element
      video.parentNode.insertBefore(canvas, video.nextSibling);
  
      // Apply the color change effect to each video frame
      function trailingEffect() {
        ctx.globalAlpha = frame_overlay_alpha;
        // Get the pixel data for the canvas
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        //console.log("canvas width: "+canvas.width);
        var data = imageData.data;
        // Put the modified pixel data back onto the canvas
        ctx.putImageData(imageData, 0, 0);

         // Draw the current video frame onto the canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);


        var delayInMilliseconds = 2;

        requestAnimationFrame(trailingEffect);
        // setTimeout(function() {
        //   // Schedule the next frame
        //   requestAnimationFrame(trailingEffect);
        // }, delayInMilliseconds);

      }
  
      // Start the trailing change effect
      
      trailingEffect();
    }
  }, 1000);
  