export let language = ["en", "zh"];
export let removeDefaultStopWordFilter = false;
export let removeDefaultStemmer = false;
export const indexHash = "abc";
export const searchResultLimits = 8;
export const searchResultContextMaxLength = 50;
export const explicitSearchResultPath = false;
export function __setLanguage(value) {
    language = value;
}
export function __setRemoveDefaultStopWordFilter(value) {
    removeDefaultStopWordFilter = value;
}
export function __setRemoveDefaultStemmer(value) {
    removeDefaultStemmer = value;
}
