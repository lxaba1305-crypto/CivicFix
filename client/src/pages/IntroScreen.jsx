import { useEffect } from "react";
import logo from "../assets/logo.png";

export default function IntroScreen({ onFinish }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">

            <div className="absolute inset-0 bg-cover bg-center intro-city" />

            <div className="absolute inset-0 bg-black/60 backdrop-blur-{2px}" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <img src={logo} alt="CivicFix Logo" className="w-32 md:w-44 floating-logo drop-shadow-[0_0_35px_rgba(74,222,128,0.8)]" />
                <h1 className="text-4xl font-bold text-white mb-2">CivicFix</h1>
                <p className="mt-4 text-green-100 text-sm md:text-lg tracking-wide fade-in-delay">
                    Building Better Communities Together
                </p>
            </div>
        </div>
    );
}