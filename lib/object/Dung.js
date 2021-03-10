"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skyengine_1 = require("@hanul/skyengine");
class Dung extends skyengine_1.GameNode {
    constructor() {
        super({
            colliders: [new skyengine_1.Rect({ width: 40, height: 40 })],
        });
        this.image = new skyengine_1.Image({ src: "dung.png" });
        this.moveDown({
            speed: 0,
            accel: 1000,
            toY: 235,
        }, () => {
        });
    }
}
exports.default = Dung;
//# sourceMappingURL=Dung.js.map