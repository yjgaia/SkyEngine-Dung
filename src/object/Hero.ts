import { Image, Rect, Sprite, StateSet } from "@hanul/skyengine";
import { GameNodeOptions } from "@hanul/skyengine/lib/GameNode";

export default class Hero extends StateSet {

    constructor(options: GameNodeOptions) {
        super(Object.assign({
            states: {
                idle: new Image({ src: "images/hero_stand.png" }),
                run: new Sprite({ src: "images/hero_run.png", fps: 10 }),
                dead: new Image({ src: "images/hero_death.png" }),
            },
            baseState: "idle",
            colliders: [new Rect({ width: 20, height: 90 })],
        }, options));
    }
}
