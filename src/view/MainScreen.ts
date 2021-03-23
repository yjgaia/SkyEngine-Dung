import { Background, BGM, GameNode, Image, Sound } from "@hanul/skyengine";
import { el } from "@hanul/skynode";

export default class MainScreen extends GameNode {

    private bgm = new BGM({ mp3: "bgms/main_screen_bgm.mp3" }).play();

    constructor() {
        super();
        this.append(
            new Background({ speedX: -100, src: "bg.png" }),
            new Image({ y: -200, src: "title.png" }),
            new GameNode({
                y: -120,
                dom: el("div", {
                    style: {
                        fontSize: 25,
                        color: "#000",
                    },
                }, "제작: 심영재"),
            }),
            new GameNode({
                y: 110,
                dom: el("a",
                    el("img", { src: "start_button.png" }),
                    {
                        click: () => {
                            new Sound({ wav: "sound_start_game.wav" }).play();
                            //TODO: Open Battlefield.
                        },
                    },
                ),
            }),
        );
    }

    public delete(): void {
        this.bgm.stop();
        super.delete();
    }
}
