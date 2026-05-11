import { useEffect, useState } from "react";

export default function WelcomeScreen({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <h1 className="text-white text-6xl md:text-8xl font-extrabold netflix-animation drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]">
        CivicFix
      </h1>
    </div>
  );
}