import { removeToken } from "../utils/auth";

export const Header = () => {
    return (
      <header className="bg-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => { removeToken(); window.location.href = '/admin/login'; }}>Logout</button>
      </header>
    );
  };