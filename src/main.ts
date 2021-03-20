import { BodyNode } from "@hanul/skynode";
import { Fullscreen, BGM } from "@hanul/skyengine";

new BGM({ mp3: "bgms/main_screen_bgm.mp3" }).play();

const screen = new Fullscreen({
    width: 360,
    height: 640,
});
BodyNode.append(screen);
