"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = void 0;
const utils_validation_1 = require("@docusaurus/utils-validation");
const isStringOrArrayOfStrings = utils_validation_1.Joi.alternatives().try(utils_validation_1.Joi.string(), utils_validation_1.Joi.array().items(utils_validation_1.Joi.string()));
const isArrayOfStringsOrRegExpsOrStringOrRegExp = utils_validation_1.Joi.alternatives().try(utils_validation_1.Joi.array().items(utils_validation_1.Joi.alternatives().try(utils_validation_1.Joi.string(), utils_validation_1.Joi.object().regex())), utils_validation_1.Joi.string(), utils_validation_1.Joi.object().regex());
const schema = utils_validation_1.Joi.object({
    indexDocs: utils_validation_1.Joi.boolean().default(true),
    indexBlog: utils_validation_1.Joi.boolean().default(true),
    indexPages: utils_validation_1.Joi.boolean().default(false),
    docsRouteBasePath: isStringOrArrayOfStrings.default(["docs"]),
    blogRouteBasePath: isStringOrArrayOfStrings.default(["blog"]),
    language: isStringOrArrayOfStrings.default(["en"]),
    hashed: utils_validation_1.Joi.boolean().default(false),
    docsDir: isStringOrArrayOfStrings.default(["docs"]),
    blogDir: isStringOrArrayOfStrings.default(["blog"]),
    removeDefaultStopWordFilter: utils_validation_1.Joi.boolean().default(false),
    removeDefaultStemmer: utils_validation_1.Joi.boolean().default(false),
    highlightSearchTermsOnTargetPage: utils_validation_1.Joi.boolean().default(false),
    searchResultLimits: utils_validation_1.Joi.number().default(8),
    searchResultContextMaxLength: utils_validation_1.Joi.number().default(50),
    explicitSearchResultPath: utils_validation_1.Joi.boolean().default(false),
    ignoreFiles: isArrayOfStringsOrRegExpsOrStringOrRegExp.default([]),
});
function validateOptions({ options, validate, }) {
    return validate(schema, options || {});
}
exports.validateOptions = validateOptions;
