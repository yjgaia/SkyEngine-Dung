import { Fullscreen } from "@hanul/skyengine";
import { BodyNode } from "@hanul/skynode";
import MainScreen from "./view/MainScreen";

const screen = new Fullscreen({
    width: 360,
    height: 640,
});

new MainScreen().appendTo(screen.root);

BodyNode.append(screen);
