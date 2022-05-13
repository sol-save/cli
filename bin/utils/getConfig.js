"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConfig = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
function updateConfig(updatedConfig) {
    var config = JSON.parse(fs_1.default
        .readFileSync(path_1.default.join(__dirname, "..", ".gitsol", "config.json"))
        .toString());
    var newConfig = Object.assign(config, updatedConfig);
    fs_1.default.writeFileSync(path_1.default.join(__dirname, "..", ".gitsol", "config.json"), JSON.stringify(newConfig));
    return newConfig;
}
exports.updateConfig = updateConfig;
