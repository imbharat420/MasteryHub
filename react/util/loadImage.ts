var loadingImage = function loadingImage(url) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.crossOrigin = '';
    var loadCount = 0;

    image.onload = function () {
      resolve(image);
    };

    image.onerror = function () {
      if (loadCount > 0) {
        return reject(new Error("Could not load image at ".concat(url)));
      }

      loadCount++;
      image.src = url;
    };

    image.src = url;
  });
};

export { loadingImage as default };
