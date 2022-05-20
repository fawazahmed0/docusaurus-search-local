import "../../utils/proxiedGenerated";
import SearchBar from "./SearchBar";
import { fetchIndexes } from "./fetchIndexes";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
const { siteConfig: { baseUrl }, } = useDocusaurusContext();
fetchIndexes(baseUrl);
export default SearchBar;
