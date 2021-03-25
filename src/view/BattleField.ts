import { Background, GameNode, Joystick, JoystickType } from "@hanul/skyengine";
import { el } from "@hanul/skynode";
import Hero from "../object/Hero";

export default class BattleField extends GameNode {

    private point = 0;
    private player: Hero;
    private joystick = new Joystick(JoystickType.LEFT_AND_RIGHT);

    constructor() {
        super();
        this.append(
            new Background({ src: "images/bg.png" }),
            this.player = new Hero({ y: 200 }),
            new GameNode({
                y: -290,
                dom: el("div", {
                    style: {
                        fontSize: 25,
                        color: "#000",
                    },
                }, "점수: 0"),
            }),
        );
        window.addEventListener("keydown", this.keydownHandler);
        window.addEventListener("keyup", this.keyupHandler);
    }

    private keydownHandler = (event: KeyboardEvent) => {
        if (this.player.state !== "dead") {
            if (event.key === "ArrowLeft") {
                this.player.scaleX = -1;
                this.player.state = "run";
                this.player.moveLeft({ toX: -180, speed: 300 });
            }
            if (event.key === "ArrowRight") {
                this.player.scaleX = 1;
                this.player.state = "run";
                this.player.moveRight({ toX: 180, speed: 300 });
            }
        }
    };

    private keyupHandler = (event: KeyboardEvent) => {
        if (this.player.state !== "dead") {
            if (event.key === "ArrowLeft") {
                if (this.player.scaleX < 0) {
                    this.player.state = "idle";
                    this.player.stopLeft(1000);
                }
            }
            if (event.key === "ArrowRight") {
                if (this.player.scaleX > 0) {
                    this.player.state = "idle";
                    this.player.stopRight(1000);
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
