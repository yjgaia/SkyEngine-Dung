"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skyengine_1 = require("@hanul/skyengine");
const skyutil_1 = __importDefault(require("skyutil"));
class Dung extends skyengine_1.Image {
    constructor() {
        super({
            x: skyutil_1.default.random(-180, 180),
            y: -320,
            src: "images/dung.png",
            colliders: [new skyengine_1.Rect({ width: 40, height: 40 })],
        });
        this.moveDown({
            speed: 0,
            accel: 1000,
            toY: 235,
        }, () => {
            new skyengine_1.Sound({ wav: `sounds/sound_drop_dung_${skyutil_1.default.random(1, 3)}.wav` }).play();
            this.src = "images/dung_down.png";
            this.fireEvent("drop");
        });
    }
}
exports.default = Dung;
//# sourceMappingURL=Dung.js.map