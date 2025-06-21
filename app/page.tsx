'use client';

import { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';

export default function ProposalPage() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showHeartbeat, setShowHeartbeat] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're now on the client
    setIsClient(true);
    
    // Create floating hearts animation
    const createFloatingHeart = () => {
      const hearts = ['💖', '💕', '💗', '💝', '💘', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🖤', '❣️', '💟'];
      const heart = document.createElement('div');
      heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
      heart.className = 'floating-heart';
      heart.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 10 + 15}px;
        pointer-events: none;
        z-index: 10;
        animation: floatUp ${Math.random() * 2 + 3}s ease-out forwards;
        left: ${Math.random() * 100}vw;
        bottom: -50px;
      `;
      document.body.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 5000);
    };

    // Create sparkle particles
    const createSparkle = () => {
      const sparkles = ['✨', '⭐', '🌟', '💫', '⚡', '🔥', '🎆', '🎇'];
      const sparkle = document.createElement('div');
      sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
      sparkle.className = 'floating-sparkle';
      sparkle.style.cssText = `
        position: fixed;
        font-size: ${Math.random() * 8 + 12}px;
        pointer-events: none;
        z-index: 15;
        animation: sparkleFloat ${Math.random() * 3 + 2}s ease-out forwards;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
      `;
      document.body.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.remove();
      }, 5000);
    };

    const heartInterval = setInterval(createFloatingHeart, 1500);
    const sparkleInterval = setInterval(createSparkle, 2500);
    
    return () => {
      clearInterval(heartInterval);
      clearInterval(sparkleInterval);
    };
  }, []);

  // Love explosion effect
  const createLoveExplosion = (event: React.MouseEvent) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create multiple particles for explosion
    const particles = ['💖', '💕', '💗', '💝', '💘', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '❣️', '💟', '✨', '⭐', '🌟', '💫'];
    
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
      particle.className = 'explosion-particle';
      
      const angle = (Math.PI * 2 * i) / 25;
      const velocity = Math.random() * 150 + 100;
      const size = Math.random() * 15 + 10;
      
      particle.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        font-size: ${size}px;
        pointer-events: none;
        z-index: 1000;
        animation: explode 2s ease-out forwards;
        --dx: ${Math.cos(angle) * velocity}px;
        --dy: ${Math.sin(angle) * velocity}px;
      `;
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 2000);
    }

    // Create ring explosion effect
    for (let ring = 0; ring < 3; ring++) {
      setTimeout(() => {
        for (let i = 0; i < 12; i++) {
          const ringParticle = document.createElement('div');
          ringParticle.innerHTML = '💖';
          ringParticle.className = 'ring-particle';
          
          const angle = (Math.PI * 2 * i) / 12;
          const distance = (ring + 1) * 80;
          
          ringParticle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 20px;
            pointer-events: none;
            z-index: 999;
            animation: ringExplosion 1.5s ease-out forwards;
            --dx: ${Math.cos(angle) * distance}px;
            --dy: ${Math.sin(angle) * distance}px;
          `;
          
          document.body.appendChild(ringParticle);
          
          setTimeout(() => {
            ringParticle.remove();
          }, 1500);
        }
      }, ring * 200);
    }
  };

  const openLetter = (event: React.MouseEvent) => {
    createLoveExplosion(event);
    setTimeout(() => {
      setIsLetterOpen(true);
      setShowHeartbeat(false);
    }, 800);
  };

  const closeLetter = () => {
    setIsLetterOpen(false);
    setShowHeartbeat(true);
  };

  // To generate random but consistent values for decoration elements
  const getRandomPosition = (index: number, max: number) => {
    // Using seeded random values to ensure client/server consistency
    return ((index * 13) % max);
  };
  
  // Generate stars with seeded positions to avoid hydration mismatches
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 80; i++) {
      const size = (i % 3) + 1;
      stars.push({
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: i % 4 === 0 ? '#fbbf24' : '#ffffff',
        left: `${getRandomPosition(i, 100)}%`,
        top: `${getRandomPosition(i+10, 100)}%`,
        animationDelay: `${(i % 3)}s`,
        opacity: 0.2 + ((i % 8) / 10),
      });
    }
    return stars;
  };

  // Generate decorations with consistent positions
  const generateDecorations = () => {
    const decorations = ['🌸', '🌺', '🦋', '✨', '🌟', '💫', '🎀', '🌹'];
    const items = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        decoration: decorations[i % decorations.length],
        left: `${getRandomPosition(i, 100)}%`,
        top: `${getRandomPosition(i+15, 100)}%`,
        animationDelay: `${i % 4}s`,
        animationDuration: `${3 + (i % 2)}s`,
      });
    }
    return items;
  };

  const stars = generateStars();
  const decorations = generateDecorations();

  return (
    <>
      {/* Custom styles */}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes sparkleFloat {
          0% {
            transform: translateY(0) rotate(0deg) scale(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-50vh) rotate(180deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes explode {
          0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translate(calc(var(--dx) * 0.7), calc(var(--dy) * 0.7)) scale(1.2) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--dx), var(--dy)) scale(0) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes ringExplosion {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          50% {
            transform: translate(calc(var(--dx) * 0.5), calc(var(--dy) * 0.5)) scale(1.5);
            opacity: 1;
          }
          100% {
            transform: translate(var(--dx), var(--dy)) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(100px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
        
        @keyframes wiggle {
          0%, 7% {
            transform: rotateZ(0);
          }
          15% {
            transform: rotateZ(-15deg);
          }
          20% {
            transform: rotateZ(10deg);
          }
          25% {
            transform: rotateZ(-10deg);
          }
          30% {
            transform: rotateZ(6deg);
          }
          35% {
            transform: rotateZ(-4deg);
          }
          40%, 100% {
            transform: rotateZ(0);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        .heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .slide-in {
          animation: slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .bounce-cute {
          animation: bounce 2s infinite;
        }
        
        .wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
        
        .twinkle {
          animation: twinkle 1.5s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen relative overflow-hidden font-poppins">
        {/* Beautiful gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-rose-400">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,182,193,0.3),transparent_70%)]"></div>
        </div>

        {/* Enhanced starry background effect - now with consistent positions */}
        {isClient && (
          <div className="absolute inset-0">
            {stars.map((star, i) => (
              <div
                key={i}
                className={`absolute rounded-full ${i % 3 === 0 ? 'twinkle' : 'pulse-glow'}`}
                style={{
                  width: star.width,
                  height: star.height,
                  backgroundColor: star.backgroundColor,
                  left: star.left,
                  top: star.top,
                  animationDelay: star.animationDelay,
                  opacity: star.opacity,
                }}
              />
            ))}
          </div>
        )}

        {/* Floating decorative elements - now with consistent positions */}
        {isClient && (
          <div className="absolute inset-0 pointer-events-none">
            {decorations.map((decoration, i) => (
              <div
                key={i}
                className="absolute text-2xl opacity-30 wiggle"
                style={{
                  left: decoration.left,
                  top: decoration.top,
                  animationDelay: decoration.animationDelay,
                  animationDuration: decoration.animationDuration,
                }}
              >
                {decoration.decoration}
              </div>
            ))}
          </div>
        )}

        {/* Main content */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          {!isLetterOpen ? (
            <>
              {/* Title */}
              <div className="mb-8 space-y-2">
                <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg tracking-wide">
                  My Dearest
                </h1>
                <h2 className="text-2xl md:text-4xl font-light text-pink-100 drop-shadow-md font-caveat">
                  Pushpo ✨
                </h2>
              </div>

              {/* Interactive Heart with enhanced effects */}
              <div className="mb-8 relative">
                {/* Outer glow rings */}
                <div className="absolute inset-0 rounded-full bg-red-300/20 blur-2xl scale-[2] pulse-glow"></div>
                <div className="absolute inset-0 rounded-full bg-pink-300/30 blur-xl scale-[1.5] pulse-glow" style={{ animationDelay: '0.5s' }}></div>
                
                <button
                  onClick={openLetter}
                  className={`group relative p-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/30 ${showHeartbeat ? 'heartbeat' : ''}`}
                >
                  <Heart 
                    className="w-16 h-16 text-red-500 fill-red-500 group-hover:text-red-400 group-hover:fill-red-400 transition-colors duration-300" 
                  />
                  
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 rounded-full bg-red-300/30 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* Instruction text */}
              <p className="text-lg text-pink-100 drop-shadow-md font-light max-w-xs">
                Tap the heart to read something special 💕
              </p>

              {/* Enhanced decorative elements */}
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-3 text-3xl opacity-70">
                  <span className="animate-bounce" style={{ animationDelay: '0s' }}>💝</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💖</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>💝</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>✨</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>💕</span>
                </div>
              </div>
            </>
          ) : (
            /* Super Cute Letter Modal */
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="relative max-w-md w-full bg-gradient-to-br from-pink-50 via-white to-rose-50 rounded-3xl shadow-2xl border-4 border-pink-200 slide-in overflow-hidden">
                {/* Cute decorative border */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300"></div>
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300"></div>
                
                {/* Floating cute elements */}
                <div className="absolute top-4 left-4 text-2xl wiggle">🌸</div>
                <div className="absolute top-6 right-6 text-xl bounce-cute">🦋</div>
                <div className="absolute bottom-6 left-6 text-xl wiggle" style={{ animationDelay: '1s' }}>🌺</div>
                <div className="absolute bottom-4 right-4 text-2xl bounce-cute" style={{ animationDelay: '0.5s' }}>✨</div>

                {/* Close button - made cuter */}
                <button
                  onClick={closeLetter}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-pink-200 hover:bg-pink-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                >
                  <X className="w-4 h-4 text-pink-700" />
                </button>

                {/* Letter content */}
                <div className="p-8 pt-12 relative">
                  {/* Super cute decorative header */}
                  <div className="text-center mb-6">
                    <div className="flex justify-center items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
                        <Heart className="w-4 h-4 text-white fill-white" />
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg transform -rotate-12">
                        <Heart className="w-5 h-5 text-white fill-white" />
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
                        <Heart className="w-4 h-4 text-white fill-white" />
                      </div>
                    </div>
                    
                    {/* Cute ribbon effect */}
                    <div className="relative inline-block">
                      <h3 className="text-2xl font-bold text-pink-800 mb-2 font-caveat relative z-10 px-4 py-2">
                        To my Pushpo,
                      </h3>
                      <div className="absolute inset-0 bg-pink-100 rounded-2xl transform -rotate-1 shadow-sm"></div>
                    </div>
                  </div>

                  {/* Letter text with cute styling */}
                  <div className="space-y-4 text-gray-700 leading-relaxed relative">
                    {/* Cute quote marks */}
                    <div className="absolute -top-2 -left-2 text-4xl text-pink-300 font-serif">"</div>
                    
                    <div className="bg-white/60 rounded-2xl p-4 shadow-sm border border-pink-100">
                      <p className="text-base font-medium">
                        My every heartbeat speaks of your name, dear. "Your smile lights up my worst days, your laughter is my favorite song."
                      </p>
                    </div>
                    
                    <div className="bg-rose-50/80 rounded-2xl p-4 shadow-sm border border-rose-100">
                      <p className="text-base font-medium">
                        With you, nothing seems real, and that's a dream come true for me, because I never want to wake up again. I love you more than words can say.
                      </p>
                    </div>
                    
                    <div className="absolute -bottom-2 -right-2 text-4xl text-pink-300 font-serif transform rotate-180">"</div>
                  </div>

                  {/* Cute signature section */}
                  <div className="mt-8 text-right relative">
                    <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-4 shadow-sm border border-pink-200">
                      <p className="text-lg font-semibold text-pink-800 font-caveat">
                        Forever and always yours Pushpo,
                      </p>
                      <div className="mt-2 flex justify-end space-x-1">
                        <span className="text-2xl bounce-cute">💕</span>
                        <span className="text-2xl bounce-cute" style={{ animationDelay: '0.2s' }}>✨</span>
                        <span className="text-2xl bounce-cute" style={{ animationDelay: '0.4s' }}>💖</span>
                      </div>
                    </div>
                  </div>

                  {/* Super cute decorative footer */}
                  <div className="mt-6 pt-4 border-t-2 border-dashed border-pink-200 text-center">
                    <div className="flex justify-center space-x-3 text-2xl">
                      <span className="wiggle">🌹</span>
                      <span className="bounce-cute">💐</span>
                      <span className="wiggle" style={{ animationDelay: '1s' }}>🌹</span>
                    </div>
                    <div className="mt-2 text-xs text-pink-600 font-medium tracking-wide">
                      Made with 💖 just for you
                    </div>
                  </div>
                </div>

                {/* Cute corner decorations */}
                <div className="absolute top-0 left-0 w-6 h-6 bg-pink-300 rounded-br-full"></div>
                <div className="absolute top-0 right-0 w-6 h-6 bg-rose-300 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 bg-rose-300 rounded-tr-full"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-pink-300 rounded-tl-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-400/20 to-transparent pointer-events-none"></div>
      </div>
    </>
  );
}
