"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skyengine_1 = require("@hanul/skyengine");
const skynode_1 = require("@hanul/skynode");
const BattleField_1 = __importDefault(require("./BattleField"));
class MainScreen extends skyengine_1.GameNode {
    constructor() {
        super();
        this.bgm = new skyengine_1.BGM({ mp3: "bgms/main_screen_bgm.mp3" }).play();
        this.append(new skyengine_1.Background({ speedX: -100, src: "images/bg.png" }), new skyengine_1.Image({ y: -200, src: "images/title.png" }), new skyengine_1.GameNode({
            y: -120,
            dom: skynode_1.el("div", {
                style: {
                    fontSize: 25,
                    color: "#000",
                },
            }, "제작: 심영재"),
        }), new skyengine_1.GameNode({
            y: 110,
            dom: skynode_1.el("a", skynode_1.el("img", { src: "images/start_button.png" }), {
                click: () => {
                    if (this.parent !== undefined) {
                        new skyengine_1.Sound({ wav: "sound/sound_start_game.wav" }).play();
                        new BattleField_1.default().appendTo(this.parent);
                    }
                    this.delete();
                },
            }),
        }));
    }
    delete() {
        this.bgm.stop();
        super.delete();
    }
}
exports.default = MainScreen;
//# sourceMappingURL=MainScreen.js.map