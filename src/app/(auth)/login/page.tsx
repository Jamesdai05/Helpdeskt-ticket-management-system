import LogoutToast from "@/components/LogOutToast";
import LoginForm from "./LoginForm";


const LoginPage = () => {



    return (
        <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center bg-blue-50 px-4">
            <LoginForm />
            <LogoutToast />
        </div>
    );
};
export default LoginPage;