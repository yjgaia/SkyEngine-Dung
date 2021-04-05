"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skyengine_1 = require("@hanul/skyengine");
class Hero extends skyengine_1.StateSet {
    constructor(options) {
        super(Object.assign({
            states: {
                idle: new skyengine_1.Image({ src: "images/hero_stand.png" }),
                run: new skyengine_1.Sprite({ src: "images/hero_run.png", fps: 10 }),
                dead: new skyengine_1.Image({ src: "images/hero_death.png" }),
            },
            baseState: "idle",
            colliders: [new skyengine_1.Rect({ width: 20, height: 90 })],
        }, options));
    }
}
exports.default = Hero;
//# sourceMappingURL=Hero.js.map