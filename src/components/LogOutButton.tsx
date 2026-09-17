import { logOut } from "../actions/auth.actions";

const LogOutButton = () => {


  return (
      <form action={logOut} className="text-white">
          <div>
              <button type="submit" className="button bg-red-300 rounded p-[5px]">Log out</button>
        </div>
    </form>
  )
}
export default LogOutButton;