import { ItemsProvider } from "./item-context";
import Header from "./components/header";
import ListContainer from "./components/list-container";
import { ListsProvider } from "./list-context";

export default function App() {

    return (
        <>
        <Header />
        <ItemsProvider>
            <ListsProvider>
                <ListContainer />
            </ListsProvider>
        </ItemsProvider>
        </>
    );
}