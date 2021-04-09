import { Background, GameNode, Interval, Joystick, JoystickType, Sound } from "@hanul/skyengine";
import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import Dung from "../object/Dung";
import Hero from "../object/Hero";

export default class BattleField extends GameNode {

    private point = 0;
    private period = 5;

    private hero: Hero;
    private dungs: Dung[] = [];

    private joystick: Joystick;
    private pointPanel: DomNode;

    constructor() {
        super();
        this.append(
            new Background({ src: "images/bg.png" }),
            this.hero = new Hero({ y: 200 }),
            new GameNode({
                y: -290,
                dom: this.pointPanel = el("div", {
                    style: {
                        fontSize: 25,
                        color: "#000",
                    },
                }, "점수: 0"),
            }),
        );

        this.joystick = new Joystick(JoystickType.LEFT_AND_RIGHT);
        this.joystick.append(el("img", { style: { opacity: 0.5 }, src: "leftandright.png" }));
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
        new Interval(this, 100, () => {

            if (count % this.period === 0) {
                const dung = new Dung().appendTo(this);
                dung.on("drop", () => {
                    if (this.hero.state !== "dead") {
                        this.point += 1;
                        this.pointPanel.empty().appendText(`점수: ${this.point}`);
                    }
                    SkyUtil.pull(this.dungs, dung);
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

                if (this.hero.speedX < 0) { this.hero.stopLeft(1000); }
                if (this.hero.speedX > 0) { this.hero.stopRight(1000); }

                new Sound({ wav: "sound_game_over.wav" }).play();

                this.append(new GameNode({
                    y: -120,
                    dom: el("div", {
                        style: {
                            fontSize: 25,
                            color: "#000",
                        },
                        c: "제작: 심영재",
                    }),
                }), new GameNode({
                    y: 110,
                    dom: el("a", el("img", "start_button.png"), {
                        mousedown: () => {
                            if (this.parent !== undefined) {
                                new Sound({ wav: "sound_start_game.wav" }).play();
                                new BattleField().appendTo(this.parent);
                            }
                            this.delete();
                        },
                    }),
                }));
            }
        });
    }

    private keydownHandler = (event: KeyboardEvent) => {
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

    private keyupHandler = (event: KeyboardEvent) => {
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

    public delete(): void {
        super.delete();
        this.joystick.delete();
        window.removeEventListener("keydown", this.keydownHandler);
        window.removeEventListener("keyup", this.keyupHandler);
    }
}
