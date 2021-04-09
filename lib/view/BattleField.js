"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skyengine_1 = require("@hanul/skyengine");
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const Dung_1 = __importDefault(require("../object/Dung"));
const Hero_1 = __importDefault(require("../object/Hero"));
class BattleField extends skyengine_1.GameNode {
    constructor() {
        super();
        this.point = 0;
        this.period = 5;
        this.dungs = [];
        this.keydownHandler = (event) => {
            if (this.hero.state !== "dead") {
                if (event.key === "ArrowLeft") {
                    this.hero.scaleX = -1;
                    this.hero.state = "run";
                    this.hero.moveLeft({ toX: -180, speed: 300 });
                }
                if (event.key === "ArrowRight") {
                    this.hero.scaleX = 1;
                    this.hero.state = "run";
                    this.hero.moveRight({ toX: 180, speed: 300 });
                }
            }
        };
        this.keyupHandler = (event) => {
            if (this.hero.state !== "dead") {
                if (event.key === "ArrowLeft") {
                    if (this.hero.scaleX < 0) {
                        this.hero.state = "idle";
                        this.hero.stopLeft(1000);
                    }
                }
                if (event.key === "ArrowRight") {
                    if (this.hero.scaleX > 0) {
                        this.hero.state = "idle";
                        this.hero.stopRight(1000);
                    }
                }
            }
        };
        this.append(new skyengine_1.Background({ src: "images/bg.png" }), this.hero = new Hero_1.default({ y: 200 }), new skyengine_1.GameNode({
            y: -290,
            dom: this.pointPanel = skynode_1.el("div", {
                style: {
                    fontSize: 25,
                    color: "#000",
                },
            }, "점수: 0"),
        }));
        this.joystick = new skyengine_1.Joystick(skyengine_1.JoystickType.LEFT_AND_RIGHT);
        this.joystick.append(skynode_1.el("img", { style: { opacity: 0.5 }, src: "leftandright.png" }));
        this.joystick.on("left", () => {
            if (this.hero.state !== "dead") {
                this.hero.scaleX = -1;
                this.hero.state = "run";
                this.hero.moveLeft({ toX: -180, speed: 300 });
            }
        });
        this.joystick.on("right", () => {
            if (this.hero.state !== "dead") {
                this.hero.scaleX = 1;
                this.hero.state = "run";
                this.hero.moveLeft({ toX: 180, speed: 300 });
            }
        });
        this.joystick.on("touchend", () => {
            if (this.hero.state !== "dead") {
                if (this.hero.scaleX < 0) {
                    this.hero.state = "idle";
                    this.hero.stopLeft(1000);
                }
                if (this.hero.scaleX > 0) {
                    this.hero.state = "idle";
                    this.hero.stopRight(1000);
                }
            }
        });
        window.addEventListener("keydown", this.keydownHandler);
        window.addEventListener("keyup", this.keyupHandler);
        let count = 0;
        new skyengine_1.Interval(this, 100, () => {
            if (count % this.period === 0) {
                const dung = new Dung_1.default().appendTo(this);
                dung.on("drop", () => {
                    if (this.hero.state !== "dead") {
                        this.point += 1;
                        this.pointPanel.empty().appendText(`점수: ${this.point}`);
                    }
                    skyutil_1.default.pull(this.dungs, dung);
                });
                this.dungs.push(dung);
            }
            if (this.period > 1 && count % 100 === 0) {
                this.period -= 1;
                count = 0;
            }
            count += 1;
        });
        this.hero.onMeet(this.dungs, () => {
            if (this.hero.state !== "dead") {
                this.hero.state = "dead";
                if (this.hero.speedX < 0) {
                    this.hero.stopLeft(1000);
                }
                if (this.hero.speedX > 0) {
                    this.hero.stopRight(1000);
                }
                new skyengine_1.Sound({ wav: "sound_game_over.wav" }).play();
                this.append(new skyengine_1.GameNode({
                    y: -120,
                    dom: skynode_1.el("div", {
                        style: {
                            fontSize: 25,
                            color: "#000",
                        },
                        c: "제작: 심영재",
                    }),
                }), new skyengine_1.GameNode({
                    y: 110,
                    dom: skynode_1.el("a", skynode_1.el("img", "start_button.png"), {
                        mousedown: () => {
                            if (this.parent !== undefined) {
                                new skyengine_1.Sound({ wav: "sound_start_game.wav" }).play();
                                new BattleField().appendTo(this.parent);
                            }
                            this.delete();
                        },
                    }),
                }));
            }
        });
    }
    delete() {
        super.delete();
        this.joystick.delete();
        window.removeEventListener("keydown", this.keydownHandler);
        window.removeEventListener("keyup", this.keyupHandler);
    }
}
exports.default = BattleField;
//# sourceMappingURL=BattleField.js.map