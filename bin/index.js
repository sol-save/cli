#! /usr/bin/env node
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
exports.art = void 0;
var handler_1 = require("./handler");
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var commands_1 = require("./commands");
var args = process.argv.slice(2);
console.clear();
exports.art = "\n         **   **                     **\n  ***** //   /**                    /**\n **///** ** ******  ******  ******  /**\n/**  /**/**///**/  **////  **////** /**\n//******/**  /**  //***** /**   /** /**\n /////**/**  /**   /////**/**   /** /**\n  ***** /**  //**  ****** //******  ***\n /////  //    //  //////   //////  ///                             \n";
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var config, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                console.log(exports.art);
                if (!fs_1.default.existsSync(path_1.default.join(__dirname, ".gitsol"))) {
                    fs_1.default.mkdirSync(path_1.default.join(__dirname, ".gitsol"));
                    fs_1.default.writeFileSync(path_1.default.join(__dirname, ".gitsol", "config.json"), JSON.stringify({
                        registered: false,
                    }));
                    fs_1.default.writeFileSync(path_1.default.join(__dirname, ".gitsol", "apps.json"), JSON.stringify({}));
                }
                config = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, ".gitsol", "config.json")).toString());
                console.log(chalk_1.default.green("Welcome to GitSol!"));
                if (!!config.registered) return [3 /*break*/, 2];
                console.log(chalk_1.default.red("You are not registered. Please register to continue."));
                return [4 /*yield*/, (0, commands_1.create)()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                if (args.length === 0) {
                    console.log(chalk_1.default.blue("Your gitsol account is ".concat(config.account)));
                    console.log(chalk_1.default.grey("To see all commands, run : gitsol --help"));
                    process.exit(0);
                }
                if (!commands_1.supportedCommands.includes(args[0])) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, handler_1.handler)(args[0], args.slice(1))];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                console.log(chalk_1.default.red("Command ".concat(args[0], " not found.")));
                console.log(chalk_1.default.red("You can run: gitsol --help"));
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                console.log(chalk_1.default.red("Error fetching latest examples: ".concat(err_1.message)));
                process.exit(1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); })();
