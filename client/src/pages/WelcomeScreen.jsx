import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function WelcomeScreen({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-950 via-green-800 to-emerald-500 flex items-center justify-center z-50 overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-green-400/20 blur-3xl rounded-full" />

      <div className="relative z-10 flex flex-col items-center">
        <img src={logo} alt="CivicFix Logo" className="w-24 md:w-32 breathing-logo" />

        <h1 className="mt-5 text-white text-5xl md:text-7xl font-extrabold tracking-[0.23em] netflix-animation drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]">CivicFix</h1>
      </div>

    </div>


  );
}