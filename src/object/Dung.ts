import { Image, Rect, Sound } from "@hanul/skyengine";
import SkyUtil from "skyutil";

export default class Dung extends Image {

    constructor() {
        super({
            x: SkyUtil.random(-180, 180),
            y: -320,
            src: "images/dung.png",
            colliders: [new Rect({ width: 40, height: 40 })],
        });

        this.moveDown({
            speed: 0,
            accel: 1000,
            toY: 235,
        }, () => {
            new Sound({ wav: `sounds/sound_drop_dung_${SkyUtil.random(1, 3)}.wav` }).play();
            this.src = "images/dung_down.png";
            this.colliders = [];
            this.fireEvent("drop");
        });
    }
}
