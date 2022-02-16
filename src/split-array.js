"use strict";
exports.__esModule = true;
exports.splitArray = void 0;
var splitArray = function (array, chunkSize) {
    return array.reduce(function (res, item, index) {
        var chunkIndex = Math.floor(index / chunkSize);
        if (!res[chunkIndex]) {
            res[chunkIndex] = []; // start a new chunk
        }
        res[chunkIndex].push(item);
        return res;
    }, []);
};
exports.splitArray = splitArray;
