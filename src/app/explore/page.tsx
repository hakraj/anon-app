import IntroText from "../components/intro";
import SearchArea from "../components/search_area";
import MatchesFound from "../components/search_res";
import Note from "../components/note";


export default function Search() {
  return (
    <main>
      <IntroText text="Search for notes" />
      <SearchArea />
      <MatchesFound />
      <Note />
    </main>
  );
}