"use client ";

import Logo from "@/app/components/Header/logo";

export default function Header() {
  return (
    <header className="flex w-full justify-between items-center p-4 bg-gray-800">
      <Logo />
      <nav>
        <ul className="flex space-x-4 text-slate-100 items-center">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <button
            type="submit"
            className=" bg-blue-400 px-4 py-2 rounded-md hover:bg-blue-500 "
          >
            <a href="/products/create">CreateProduct</a>
          </button>
        </ul>
      </nav>
    </header>
  );
}
