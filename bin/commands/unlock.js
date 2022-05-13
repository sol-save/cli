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
exports.unlock = void 0;
var Keypair = require("@solana/web3.js").Keypair;
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var register_1 = require("./register");
var crypto_js_1 = __importDefault(require("crypto-js"));
function unlock() {
    return __awaiter(this, void 0, void 0, function () {
        var config, keypair, password, answer, encryptedAccount, accountConfig, secretKey, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = JSON.parse(fs_1.default
                        .readFileSync(path_1.default.join(__dirname, "..", ".gitsol", "config.json"))
                        .toString());
                    if (!!config.registered) return [3 /*break*/, 3];
                    console.log(chalk_1.default.red("You are not registered. Please register to continue."));
                    return [4 /*yield*/, (0, register_1.create)()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, unlock()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
                case 3:
                    if (!config.encrypted) return [3 /*break*/, 5];
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: "password",
                                name: "password",
                                message: "Enter your password to decrypt your keypair. (press enter if you had no password)",
                            },
                        ])];
                case 4:
                    answer = _a.sent();
                    password = answer.password;
                    return [3 /*break*/, 6];
                case 5:
                    password = "default";
                    _a.label = 6;
                case 6:
                    encryptedAccount = fs_1.default
                        .readFileSync(path_1.default.join(__dirname, "..", ".gitsol", "account"))
                        .toString();
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 8, , 10]);
                    accountConfig = JSON.parse(crypto_js_1.default.AES.decrypt(encryptedAccount, password).toString(crypto_js_1.default.enc.Utf8));
                    secretKey = Uint8Array.from(accountConfig.secretKey.split(","));
                    keypair = Keypair.fromSecretKey(secretKey);
                    return [3 /*break*/, 10];
                case 8:
                    e_1 = _a.sent();
                    console.log(e_1);
                    console.log(chalk_1.default.red("Incorrect password."));
                    return [4 /*yield*/, unlock()];
                case 9: return [2 /*return*/, _a.sent()];
                case 10:
                    if (!(keypair.publicKey.toString() === config.account)) return [3 /*break*/, 11];
                    return [2 /*return*/, keypair];
                case 11:
                    console.log(chalk_1.default.red("Incorrect password."));
                    return [4 /*yield*/, unlock()];
                case 12: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.unlock = unlock;
