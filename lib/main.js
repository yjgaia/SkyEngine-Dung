"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyengine_1 = require("@hanul/skyengine");
new skyengine_1.BGM({ mp3: "bgms/main_screen_bgm.mp3" }).play();
const screen = new skyengine_1.Fullscreen({
    width: 360,
    height: 640,
});
skynode_1.BodyNode.append(screen);
//# sourceMappingURL=main.js.map