import Intro from "../components/intro";
import CreateArea from "../components/create_area";
import Account from "../components/account";
import AllNote from "../components/all_notes";


export default function Profile() {
    return (
        <main>
            <Intro text="Hey Anon!" />
            <Account />
            <CreateArea />
            <AllNote />
        </main>
    )
}
