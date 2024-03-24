

import DarkModeToggle from './hooks/DarkModeToggle';
import { useDarkMode } from './hooks/useDarkMode';

import {ToastContainer} from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import Router from './redux/Router/Router';

function App() {
  const isDarkMode = useDarkMode();
  return (
    <div
    className={` ${
      isDarkMode ? "bg-black text-white" : "bg-white text-black"
    }`}
  >
    <DarkModeToggle />
    <Analytics />

    <ToastContainer />
    <Router />
    </div>
   
  )
}

export default App
