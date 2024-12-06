import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

const RecentPurchaseNotification = () => {
  const [show, setShow] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState<{name: string, product: string, time: string} | null>(null);
  const [hasPlayedInitialSound, setHasPlayedInitialSound] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const recentPurchases = [
    { name: "Sarah M.", product: "Glow Serum", time: "2 minutes ago" },
    { name: "Emily R.", product: "Vitamin C Cream", time: "5 minutes ago" },
    { name: "Jessica K.", product: "Night Repair", time: "8 minutes ago" },
    { name: "Anna P.", product: "Face Mist", time: "12 minutes ago" }
  ];

  // Function to play notification sound
  const playNotificationSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.volume = 0.3;
    audio.play().catch(err => console.log('Audio playback failed:', err));
  };

  useEffect(() => {
    // Check if this is a new session
    const lastVisitTime = sessionStorage.getItem('lastVisitTime');
    const currentTime = new Date().getTime();
    
    if (!lastVisitTime || (currentTime - parseInt(lastVisitTime)) > 30000) { // 30 seconds
      sessionStorage.setItem('lastVisitTime', currentTime.toString());
      localStorage.removeItem('notificationsClosed'); // Reset notifications for new session
      setHasPlayedInitialSound(false); // Reset sound flag for new session
    }

    // Check if notifications were manually closed
    const notificationsClosed = localStorage.getItem('notificationsClosed') === 'true';
    if (notificationsClosed) return;

    // Show initial notification after a short delay
    const initialTimer = setTimeout(() => {
      const randomPurchase = recentPurchases[Math.floor(Math.random() * recentPurchases.length)];
      setCurrentPurchase(randomPurchase);
      setShow(true);
      setIsVisible(true);
      
      // Play sound only on initial appearance
      if (!hasPlayedInitialSound) {
        playNotificationSound();
        setHasPlayedInitialSound(true);
      }
    }, 2000);

    let cycleTimer: ReturnType<typeof setTimeout>;
    let changeTimer: ReturnType<typeof setTimeout>;

    if (show) {
      cycleTimer = setInterval(() => {
        // Start fade out
        setIsVisible(false);

        // Wait 5 seconds before showing next notification
        changeTimer = setTimeout(() => {
          const newPurchase = recentPurchases[Math.floor(Math.random() * recentPurchases.length)];
          setCurrentPurchase(prev => {
            if (prev?.name === newPurchase.name) {
              const nextIndex = (recentPurchases.indexOf(newPurchase) + 1) % recentPurchases.length;
              return recentPurchases[nextIndex];
            }
            return newPurchase;
          });
          setIsVisible(true);
        }, 5000); // 5-second gap before next notification
      }, 10000); // Complete cycle: 5s visible + 5s gap
    }

    return () => {
      clearTimeout(initialTimer);
      clearInterval(cycleTimer);
      clearTimeout(changeTimer);
    };
  }, [show, hasPlayedInitialSound]);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('notificationsClosed', 'true');
  };

  if (!show || !currentPurchase) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 bg-white rounded-lg p-3 max-w-[280px] z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{
        animation: isVisible ? 'slideIn 0.5s ease-out' : undefined,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        border: '2px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-[#FF66C4]/10 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-[#FF66C4] text-xs">🛍️</span>
        </div>
        <div 
          className="flex-1 min-w-0"
          style={{
            animation: isVisible ? 'fadeInUp 0.3s ease-out' : undefined,
            animationFillMode: 'both'
          }}
        >
          <p className="text-xs text-gray-600 mb-0.5">
            <span className="font-medium text-gray-900">{currentPurchase.name}</span> just purchased
          </p>
          <p className="text-xs font-medium text-[#FF66C4] mb-0.5 truncate">
            {currentPurchase.product}
          </p>
          <p className="text-[10px] text-gray-400">{currentPurchase.time}</p>
        </div>
        <button 
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          aria-label="Close notifications"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

const BrandStatement = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 
            className="text-3xl font-medium text-[#303030] mb-6 tracking-[0.2em] uppercase"
            style={{ 
              animation: 'fadeInUp 0.5s ease-out',
              animationFillMode: 'both',
              letterSpacing: '0.2em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}
          >
            Discover Your Glow With Sam E-GlowCo
          </h2>
          <div 
            className="grid gap-6 text-gray-600"
            style={{ 
              animation: 'fadeInUp 0.5s ease-out 0.2s',
              animationFillMode: 'both'
            }}
          >
            <p className="text-base leading-relaxed">
              Elevate your skincare routine with our natural, effective, and radiance-boosting formulations. Each product is thoughtfully crafted to enhance your natural beauty.
            </p>
            <div className="flex justify-center gap-8 pt-4">
              <div className="text-center">
                <span className="block text-2xl font-medium text-[#FF66C4] mb-2">100%</span>
                <span className="text-sm text-gray-500">Natural Ingredients</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-medium text-[#FF66C4] mb-2">50+</span>
                <span className="text-sm text-gray-500">Premium Products</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-medium text-[#FF66C4] mb-2">10k+</span>
                <span className="text-sm text-gray-500">Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecentPurchaseNotification />
    </section>
  );
};

export default BrandStatement;
