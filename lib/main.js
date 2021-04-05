"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skyengine_1 = require("@hanul/skyengine");
const MainScreen_1 = __importDefault(require("./view/MainScreen"));
const screen = new skyengine_1.Fullscreen({
    width: 360,
    height: 640,
});
new MainScreen_1.default().appendTo(screen.root);
//# sourceMappingURL=main.js.map