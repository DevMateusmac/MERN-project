import { Outlet } from "react-router-dom";
import MainNavigation from "../shared/components/Navigation/MainNavigation";

export default function RootElement(){
  return (
    <>
    <MainNavigation />
    <main>
    <Outlet />
    </main>
    </>
  )
}