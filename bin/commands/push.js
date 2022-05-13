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
exports.push = void 0;
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var web3_storage_1 = require("web3.storage");
var zip_a_folder_1 = require("zip-a-folder");
function makeStorageClient(token) {
    return new web3_storage_1.Web3Storage({ token: token });
}
var web3_storage_2 = require("web3.storage");
function push() {
    return __awaiter(this, void 0, void 0, function () {
        var timestamp, config, appPath, zipPath, files, client, cid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timestamp = Date.now();
                    config = JSON.parse(fs_extra_1.default
                        .readFileSync(path_1.default.join(__dirname, "..", ".gitsol", "config.json"))
                        .toString());
                    appPath = path_1.default.resolve("./");
                    zipPath = path_1.default.join(__dirname, "..", ".gitsol", "".concat(timestamp, ".zip"));
                    return [4 /*yield*/, (0, zip_a_folder_1.zip)("".concat(appPath, "/.git"), zipPath)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, web3_storage_2.getFilesFromPath)(zipPath)];
                case 2:
                    files = _a.sent();
                    client = makeStorageClient(config.storagekey);
                    return [4 /*yield*/, client.put(files)];
                case 3:
                    cid = _a.sent();
                    console.log("http://ipfs.fleek.co/ipfs/".concat(cid, "/").concat(timestamp, ".zip"));
                    return [2 /*return*/];
            }
        });
    });
}
exports.push = push;
