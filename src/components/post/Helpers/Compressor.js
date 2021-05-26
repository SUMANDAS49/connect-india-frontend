import imageCompression from "browser-image-compression";

export const compressImage = (data) => {
  var options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  imageCompression(data, options)
    .then(function (compressedFile) {
        
      return compressedFile;
    })
    .catch(function (error) {
      console.log(error.message);
    });
};
