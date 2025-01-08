import { Logout, Person } from "@mui/icons-material";
import { removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const toggleDropdown = () => {
    navigate('/admin/view-user')
  };
  const navigate = useNavigate()

  return (
    <header className="bg-white fixed px-10 p-4 shadow-md w-[1300px] z-40 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div className="flex gap-6 items-center relative">
        <div
          className="cursor-pointer rounded-full bg-gray-500 py-[10px] px-[12px] relative"
          onClick={toggleDropdown}
        >
          <Person className="text-white" />
        </div>

        <div className="cursor-pointer border border-red-500 p-2 rounded-lg">
          <Logout
            onClick={() => {
              removeToken();
              navigate('/admin/login')

            }}
            className="text-red-500"
          />
        </div>
      </div>
    </header>
  );
};
