import Intro from "./components/intro";
import CreateArea from "./components/create_area";
import Note from "./components/note";
import Account from "./components/account";


export default function Profile() {
    return (
        <>
            <Intro text="Hey Anon!" />
            <Account />
            <CreateArea />
            <Note />
        </>
    )
}