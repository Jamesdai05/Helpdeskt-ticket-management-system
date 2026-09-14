import LoginForm from "./LoginForm";

const login = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-blue-50 px-4 py-12">
            <div className="max-w-2xl p-8 flex flex-col items-center justify-center shadow-md bg-white rounded-lg">
                <h1 className="text-blue-400 font-semibold text-4xl">Log In</h1>
                <LoginForm />
            </div>
        </div>
    );
};
export default login;