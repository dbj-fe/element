import SparkMD5 from './spark-md5.min';
/**
 * 根据原文件名获取上传到文件服务器的文件名称，用于上传文件，生成规则：
 *
 *     时间戳_四位随机数字$原文件名称
 *
 * @param {String} fileName 原文件名称
 * @param {String} dirName 目录名称
 */
export function getFileKey(fileName, dirName) {
  var suffixReg = /\.\w+$/;
  var fileSuffix = (fileName.match(suffixReg) || [''])[0];
  var filePrefix = fileName.replace(suffixReg, '');
  filePrefix = sliceCnStrUri(filePrefix, 200);
  var time = Date.now();
  var random = Math.floor(Math.random() * 10000);
  var rdStr = ('0000' + random).substr(-4);
  var key = time + '_' + rdStr;
  if (dirName) {
    return encodeURIComponent(dirName + '$' + key + '$' + filePrefix + fileSuffix);
  }
  return encodeURIComponent(key + '$' + filePrefix + fileSuffix);
}

/**
 * 从文件地址截取文件名称
 *
 * @param {String} fileUrl 服务器上的文件地址
 */
export function getFileName(fileUrl) {
  if (!fileUrl) {
    return '';
  }
  fileUrl = decodeURIComponent(fileUrl);
  var idx = fileUrl.indexOf('$');
  if (~idx) {
    var fileName = fileUrl.slice(idx + 1);
    var reg = /^\d{13}_\d{4}\$/;
    if (reg.test(fileName)) {
      return fileName.replace(reg, '');
    } else {
      return fileName;
    }
  }
  return fileUrl.split('/').pop();
}

/**
 * 从文件地址截取目录名称
 *
 * @param {String} fileUrl 服务器上的文件地址
 */
export function getDirName(fileUrl) {
  if (!fileUrl) {
    return '';
  }
  fileUrl = decodeURIComponent(fileUrl);
  var fileName = fileUrl.split('/').pop();
  var reg = /\$\d{13}_\d{4}\$/;
  var arr = fileName.split(reg);
  if (arr.length === 2) {
    return arr[0];
  }
  return '';
}

/**
 * 含汉字字符串截取（encodeURIComponent版，一个汉字占9个字符）
 * 除了点、下滑线、减号的英文标点会被剔除
 * @param {String} str 要截取的字符串
 * @param {Number} length 截取长度
 */
export function sliceCnStrUri(str, length) {
  var letterReg = /[\w\.\-]/;
  // eslint-disable-next-line no-control-regex
  var cnReg = /[^\x00-\xff]/;
  var pos = 0;
  return (str || '').split('').filter(function(item) {
    if (pos >= length) {
      return false;
    }
    if (cnReg.test(item)) {
      pos += 9;
    } else if (letterReg.test(item)) {
      pos += 1;
    } else {
      return false;
    }
    return pos <= length;
  }).join('');
}

/**
 * 文件大小格式化
 * @param {Number} fileSize 文件大小
 * @param {Number} idx 位置
 */
export function formatFileSize(fileSize, idx = 0) {
  fileSize = typeof fileSize === 'number' ? fileSize : 0;
  const units = ['B', 'KB', 'MB', 'GB'];
  if (fileSize < 1024 || idx === units.length - 1) {
    return fileSize.toFixed(1) + units[idx];
  }
  return formatFileSize(fileSize / 1024, ++idx);
}

/**
 * 计算上传文件的md5
 * @param {File} file 文件
 * @param {Function} callback 回调函数
 */
export function getFileMd5(file, callback) {
  var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
  var chunkSize = 2097152; // Read in chunks of 2M;
  var chunks = Math.ceil(file.size / chunkSize);
  var currentChunk = 0;
  var spark = new SparkMD5.ArrayBuffer();
  var fileReader = new FileReader();

  fileReader.onload = function(e) {
    console.log('read chunk nr', currentChunk + 1, 'of', chunks);
    spark.append(e.target.result); // Append array buffer
    currentChunk++;

    if (currentChunk < chunks) {
      loadNext();
    } else {
      console.log('finished loading');
      var hash = spark.end();
      console.info('computed hash', hash); // Compute hash
      callback(hash);
    }
  };

  fileReader.onerror = function() {
    console.warn('oops, something went wrong.');
  };

  function loadNext() {
    var start = currentChunk * chunkSize;
    var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
  }

  loadNext();

}
