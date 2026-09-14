import RegisterForm from "./RegisterForm";

const Register = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-blue-50 px-4 py-12">
            <div className="max-w-2xl flex flex-col mx-auto items-center justify-center shadow-md rounded-lg bg-white p-8">
                <h1 className="text-blue-400 font-semibold text-4xl">Register</h1>
                <RegisterForm />
            </div>
        </div>
    );
};
export default Register;