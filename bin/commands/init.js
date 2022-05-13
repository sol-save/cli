"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var path_1 = __importDefault(require("path"));
var unlock_1 = require("./unlock");
var inquirer_1 = __importDefault(require("inquirer"));
var project_name_generator_1 = __importDefault(require("project-name-generator"));
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var exec = require("child_process").exec;
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var p, keypair, _a, name, description, license, appId, apps;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    p = path_1.default.resolve("./");
                    exec("git init", function (error, stdout, stderr) { });
                    exec("git add . && git commit -m 'automated commit from gitsol'", function (error, stdout, stderr) { });
                    return [4 /*yield*/, (0, unlock_1.unlock)()];
                case 1:
                    keypair = _b.sent();
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: "input",
                                name: "name",
                                message: "Enter a name for your project",
                                default: (0, project_name_generator_1.default)().dashed,
                            },
                            {
                                type: "input",
                                name: "description",
                                message: "Enter a description for your project",
                                default: "My project",
                            },
                            {
                                type: "list",
                                name: "license",
                                message: "Enter a license for your project",
                                choices: [
                                    { name: "MIT", value: "MIT" },
                                    { name: "Apache", value: "Apache" },
                                    { name: "ISC", value: "ISC" },
                                    { name: "BSD", value: "BSD" },
                                    { name: "GPL", value: "GPL" },
                                    { name: "MPL", value: "MPL" },
                                    { name: "Unlicense", value: "Unlicense" },
                                    { name: "Public Domain", value: "Public Domain" },
                                ],
                            },
                        ])];
                case 2:
                    _a = _b.sent(), name = _a.name, description = _a.description, license = _a.license;
                    console.log(chalk_1.default.green("Creating project..."));
                    appId = "xyz";
                    apps = JSON.parse(fs_1.default
                        .readFileSync(path_1.default.join(__dirname, "..", ".gitsol", "apps.json"))
                        .toString());
                    apps[p] = appId;
                    fs_1.default.writeFileSync(path_1.default.join(__dirname, "..", ".gitsol", "apps.json"), JSON.stringify(apps));
                    console.log(chalk_1.default.green("Project created!"));
                    return [2 /*return*/];
            }
        });
    });
}
exports.init = init;
