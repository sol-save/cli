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
exports.create = void 0;
var web3_js_1 = require("@solana/web3.js");
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var crypto_js_1 = __importDefault(require("crypto-js"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var fund_1 = require("./fund");
function create() {
    return __awaiter(this, void 0, void 0, function () {
        var keyPair, confirmPassword, password, answer, account, encryptedAccount, web3StrorageApiKey, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keyPair = web3_js_1.Keypair.generate();
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: "password",
                                name: "password",
                                message: "Enter a password to encrypt your keypair. (enter to skip encryption)",
                            },
                        ])];
                case 1:
                    password = (_a.sent()).password;
                    if (!(password !== "")) return [3 /*break*/, 5];
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: "password",
                                name: "confirmPassword",
                                message: "Confirm your password (enter to skip)",
                            },
                        ])];
                case 2:
                    answer = _a.sent();
                    confirmPassword = answer.confirmPassword;
                    if (!(password !== confirmPassword)) return [3 /*break*/, 4];
                    console.log(chalk_1.default.red("Passwords do not match."));
                    return [4 /*yield*/, create()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
                case 4: return [3 /*break*/, 6];
                case 5:
                    console.log(chalk_1.default.yellow("No password provided. Skipping encryption."));
                    confirmPassword = "default";
                    _a.label = 6;
                case 6:
                    account = {
                        publicKey: keyPair.publicKey.toString(),
                        secretKey: keyPair.secretKey.toString(),
                    };
                    encryptedAccount = crypto_js_1.default.AES.encrypt(JSON.stringify(account), confirmPassword).toString();
                    fs_1.default.writeFileSync(path_1.default.join(__dirname, "..", ".gitsol", "account"), encryptedAccount);
                    console.clear();
                    console.log(chalk_1.default.grey("Decentralised Hosting"));
                    console.log(chalk_1.default.grey("======================"));
                    console.log(chalk_1.default.grey("1. Go to https://web3.storage/login/"));
                    console.log(chalk_1.default.grey("2. Create a free account"));
                    console.log(chalk_1.default.grey("3. Create a new API key"));
                    console.log(chalk_1.default.grey("4. Copy the API key"));
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: "input",
                                name: "web3StrorageApiKey",
                                message: "5. Paste the API key here:",
                            },
                        ])];
                case 7:
                    web3StrorageApiKey = (_a.sent()).web3StrorageApiKey;
                    config = JSON.parse(fs_1.default
                        .readFileSync(path_1.default.join(__dirname, "..", ".gitsol", "config.json"))
                        .toString());
                    if (confirmPassword === "default") {
                        config.encrypted = false;
                    }
                    else {
                        config.encrypted = true;
                    }
                    config.registered = true;
                    config.account = keyPair.publicKey.toString();
                    config.storagekey = web3StrorageApiKey;
                    fs_1.default.writeFileSync(path_1.default.join(__dirname, "..", ".gitsol", "config.json"), JSON.stringify(config));
                    console.log(chalk_1.default.green("Created account!"));
                    return [4 /*yield*/, (0, fund_1.fund)()];
                case 8:
                    _a.sent();
                    console.clear();
                    console.log(chalk_1.default.green("You're all set!"));
                    console.log(chalk_1.default.grey("Create a new repo by running:"));
                    console.log(chalk_1.default.green("`gitsol init`"));
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
