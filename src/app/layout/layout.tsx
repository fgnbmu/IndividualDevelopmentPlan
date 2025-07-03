import { Header } from "../../features/header"
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