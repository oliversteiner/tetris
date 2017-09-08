"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OstUtil = /** @class */ (function () {
    function OstUtil() {
    }
    // Zufallszahlen inklusive die Randbedingungen
    OstUtil.prototype.getRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return OstUtil;
}());
exports.default = OstUtil;
