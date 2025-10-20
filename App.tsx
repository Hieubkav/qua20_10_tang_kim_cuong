import React, { useState, useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import DiamondIcon from './components/DiamondIcon';

const MessageLine = ({ text, delay, duration = 1500, className = "" }: { text: string, delay: number, duration?: number, className?: string }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <p
            className={`transition-all ease-in-out ${className}`}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transitionDuration: `${duration}ms`
            }}
        >
            {text}
        </p>
    )
}

const App: React.FC = () => {
  const [step, setStep] = useState(0); // 0: Start, 1: Intro text, 2: Diamond, 3: Message Reveal
  const [triggerExplosion, setTriggerExplosion] = useState(false);
  const [hideDiamond, setHideDiamond] = useState(false);

  useEffect(() => {
    if (step === 0) {
      setTimeout(() => setStep(1), 500); // Wait a bit on black screen
    } else if (step === 1) {
      setTimeout(() => setStep(2), 3000); // Show intro for 2.5s
    }
  }, [step]);

  const handleReveal = () => {
    if (step !== 2) return; // Only clickable when diamond is shown
    setHideDiamond(true);
    setTriggerExplosion(true);
    setTimeout(() => {
        setStep(3)
    }, 500); // wait for diamond to fade out
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center text-center p-6" onClick={handleReveal} role="button" tabIndex={0} aria-label="Một món quà đặc biệt, hãy tương tác để khám phá">
      <ParticleCanvas triggerExplosion={triggerExplosion} />

      <div className="z-10 flex flex-col items-center justify-center">
        {/* Step 1: Intro Text */}
        <div className={`transition-opacity duration-1000 ${step === 1 ? 'opacity-100' : 'opacity-0 -translate-y-full'}`}>
            <p className="text-pink-200 text-2xl md:text-3xl font-light italic tracking-wider font-display">Cho người con gái duy nhất...</p>
        </div>

        {/* Step 2: Diamond */}
        <div className={`transition-opacity duration-1000 ${step === 2 && !hideDiamond ? 'opacity-100' : 'opacity-0'}`}>
            <div className="animate-subtle-glow mb-6 cursor-pointer">
              <DiamondIcon />
            </div>
            <p className="text-pink-200 text-lg font-light tracking-widest animate-pulse">
              Chạm vào đây
            </p>
        </div>

        {/* Step 3: Messages */}
        {step === 3 && (
             <div className="flex flex-col items-center justify-center gap-5 md:gap-7 text-white max-w-lg">
                <MessageLine text="Gửi Kim Cương của anh," delay={500} className="font-display text-3xl md:text-4xl text-pink-300 italic"/>
                <MessageLine text="Cảm ơn em vì đã đến bên anh," delay={2000} className="text-xl md:text-2xl text-pink-100"/>
                <MessageLine text="soi sáng những ngày u tối nhất bằng nụ cười của em." delay={3500} className="text-xl md:text-2xl text-pink-100"/>
                <MessageLine text="Cảm ơn em đã cùng anh đi qua bão giông," delay={5500} className="text-xl md:text-2xl text-pink-100"/>
                <MessageLine text="và chưa một lần buông tay." delay={7000} className="text-xl md:text-2xl text-pink-100 font-semibold"/>
                <MessageLine text="20/10 này, và cả những ngày sau nữa," delay={9000} className="font-display text-2xl md:text-3xl text-pink-300 italic"/>
                <MessageLine text="chỉ mong được thấy em cười." delay={10500} className="font-display text-2xl md:text-3xl text-pink-300 italic"/>
                <MessageLine text="Yêu em. ❤️" delay={12000} className="text-2xl md:text-3xl text-pink-400 font-semibold mt-4"/>
             </div>
        )}
      </div>
    </div>
  );
};

export default App;
