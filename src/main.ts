import { BodyNode } from "@hanul/skynode";
import { Fullscreen } from "@hanul/skyengine";

const screen = new Fullscreen({
    width: 360,
    height: 640,
});
BodyNode.append(screen);
