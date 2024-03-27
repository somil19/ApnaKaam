import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import Footer from "./Footer";
import Header from "./Header";

export default function AppLayout() {
  const signUpSuccess = useSelector((state) => state.signUp.signUpSuccess);

  return (
    <>
      {signUpSuccess === false ? (
        <SignUpPage />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}
