import { Header } from "../../widgets/header"
import { Outlet } from "react-router-dom"
import { Provider } from "../providers"

export const Layout = () => {
    return (
        <Provider>
            <Header/>
            <Outlet/>
        </Provider>
    )
}