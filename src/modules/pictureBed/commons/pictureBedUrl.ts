const pictureBedPrefix = '/picture-bed/v1';

const pictureBedUrl = (filename?: string) => {
  if (filename === undefined) {
    return pictureBedPrefix;
  }
  return pictureBedPrefix + '/' + filename;
}

export default pictureBedUrl;