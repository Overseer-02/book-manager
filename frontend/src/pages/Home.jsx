import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <header>
        <h1>Book Manager</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
