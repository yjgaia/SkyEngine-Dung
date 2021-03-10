import { GameNode, Image, Rect } from "@hanul/skyengine";

export default class Dung extends GameNode {

    private image: Image = new Image({ src: "dung.png" });

    constructor() {
        super({
            colliders: [new Rect({ width: 40, height: 40 })],
        });

        this.moveDown({
            speed: 0,
            accel: 1000,
            toY: 235,
        }, () => {
            //TODO:
        });
    }
}
