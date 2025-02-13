import lunr from "lunr";
import {
  SearchDocument,
  SearchDocumentType,
  WrappedIndex,
} from "../../../shared/interfaces";
import { indexHash } from "../../utils/proxiedGenerated";

interface SerializedIndex {
  documents: SearchDocument[];
  index: {
    invertedIndex: [string][];
  };
}

export async function fetchIndexes(baseUrl: string): Promise<{
  wrappedIndexes: WrappedIndex[];
  zhDictionary: string[];
}> {
  if (process.env.NODE_ENV === "production") {
    let response = await fetch(`https://rawcdn.githack.com/fawazahmed0/quran-hadith-search/gh-pages/search-index-${indexHash}.json`)
    if(!response.ok)
    response = await fetch(`${baseUrl}search-index-${indexHash}.json`)
    const json = (await response.json()) as SerializedIndex[];

    const wrappedIndexes: WrappedIndex[] = json.map(
      ({ documents, index }, type) => ({
        type: type as SearchDocumentType,
        documents,
        index: lunr.Index.load(index),
      })
    );

    const zhDictionary = json.reduce((acc, item) => {
      for (const tuple of item.index.invertedIndex) {
        if (/\p{Unified_Ideograph}/u.test(tuple[0][0])) {
          acc.add(tuple[0]);
        }
      }
      return acc;
    }, new Set<string>());

    return {
      wrappedIndexes,
      zhDictionary: Array.from(zhDictionary),
    };
  }

  // The index does not exist in development, therefore load a dummy index here.
  return {
    wrappedIndexes: [],
    zhDictionary: [],
  };
}
