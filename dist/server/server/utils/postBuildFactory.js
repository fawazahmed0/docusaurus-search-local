"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBuildFactory = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const util_1 = tslib_1.__importDefault(require("util"));
const buildIndex_1 = require("./buildIndex");
const debug_1 = require("./debug");
const processDocInfos_1 = require("./processDocInfos");
const scanDocuments_1 = require("./scanDocuments");
const getIndexHash_1 = require("./getIndexHash");
const writeFileAsync = util_1.default.promisify(fs_1.default.writeFile);
function postBuildFactory(config) {
    return function postBuild(buildData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, debug_1.debugInfo)("gathering documents");
            const data = (0, processDocInfos_1.processDocInfos)(buildData, config);
            (0, debug_1.debugInfo)("parsing documents");
            // Give every index entry a unique id so that the index does not need to store long URLs.
            const allDocuments = yield (0, scanDocuments_1.scanDocuments)(data);
            (0, debug_1.debugInfo)("building index");
            const searchIndex = (0, buildIndex_1.buildIndex)(allDocuments, config);
            (0, debug_1.debugInfo)("writing index to disk");
            const indexHash = (0, getIndexHash_1.getIndexHash)(config);
            yield writeFileAsync(path_1.default.join(buildData.outDir, `search-index-${indexHash}.json`), JSON.stringify(searchIndex), { encoding: "utf8" });
            (0, debug_1.debugInfo)("index written to disk successfully!");
        });
    };
}
exports.postBuildFactory = postBuildFactory;
