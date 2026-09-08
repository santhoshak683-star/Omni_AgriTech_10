import React, { useState } from 'react';

// Verified high-resolution photos of dairy cattle and pasture scenes hosted on fast CDN
export const REMOTE_COW_PHOTOS = {
  heroHolstein: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=1200&q=80",
  pastureHerd: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=1200&q=80",
  holsteinPortrait: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&q=80",
  motherAndCalf: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80",
  brownSwiss: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=1200&q=80",
  guernseyPasture: "https://images.unsplash.com/photo-1568644396922-5c3bfae12521?auto=format&fit=crop&w=1200&q=80",
  farmAnimals: "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=1200&q=80",
  jerseyCross: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=1200&q=80"
};

export const REAL_COW_PHOTOS = REMOTE_COW_PHOTOS;

interface RealCowImageProps {
  className?: string;
  imgSrc?: string;
  alt?: string;
  fallbackIndexOffset?: number;
}

/**
 * Universal Resilient Real Cow Photograph component:
 * 1. Resolves any local or remote image path to verified high-performance CDN URLs
 * 2. Instant graceful fallback to backup cow portrait
 * 3. High quality vector graphics fallback if completely offline
 */
export const RealCowPhoto: React.FC<RealCowImageProps> = ({
  className = 'w-full h-full object-cover',
  imgSrc = REMOTE_COW_PHOTOS.heroHolstein,
  alt = 'Dairy Cow at Reno Farm',
}) => {
  const [errorCount, setErrorCount] = useState(0);

  // Normalize image source to verified CDN URLs
  let resolvedSrc = imgSrc;
  if (!imgSrc || imgSrc.includes('cow-hero') || imgSrc.includes('photo-1546445317')) {
    resolvedSrc = REMOTE_COW_PHOTOS.heroHolstein;
  } else if (imgSrc.includes('cow-pasture') || imgSrc.includes('photo-1527153857')) {
    resolvedSrc = REMOTE_COW_PHOTOS.pastureHerd;
  } else if (imgSrc.includes('cow-portrait') || imgSrc.includes('photo-1570042225')) {
    resolvedSrc = REMOTE_COW_PHOTOS.holsteinPortrait;
  } else if (imgSrc.includes('cow-calf') || imgSrc.includes('photo-1500595046')) {
    resolvedSrc = REMOTE_COW_PHOTOS.motherAndCalf;
  } else if (imgSrc.includes('cow-brown-swiss') || imgSrc.includes('photo-1596733430')) {
    resolvedSrc = REMOTE_COW_PHOTOS.brownSwiss;
  } else if (imgSrc.includes('cow-guernsey') || imgSrc.includes('photo-1568644396')) {
    resolvedSrc = REMOTE_COW_PHOTOS.guernseyPasture;
  } else if (imgSrc.includes('farm-animals') || imgSrc.includes('photo-1484557052')) {
    resolvedSrc = REMOTE_COW_PHOTOS.farmAnimals;
  } else if (imgSrc.includes('cow-jersey') || imgSrc.includes('photo-1524024973')) {
    resolvedSrc = REMOTE_COW_PHOTOS.jerseyCross;
  }

  const handleImageError = () => {
    setErrorCount(prev => prev + 1);
  };

  // If both primary and secondary failed, show a stylized cattle scene
  if (errorCount >= 2) {
    return (
      <div className="w-full h-full bg-linear-to-b from-sky-400 to-emerald-600 flex items-center justify-center relative overflow-hidden">
        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="#38bdf8" />
          <ellipse cx="100" cy="180" rx="140" ry="70" fill="#10b981" />
          <g transform="translate(45, 45) scale(1.1)">
            <ellipse cx="50" cy="45" rx="35" ry="25" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <ellipse cx="50" cy="55" rx="20" ry="12" fill="#fbcfe8" />
            <circle cx="38" cy="40" r="4" fill="#0f172a" />
            <circle cx="62" cy="40" r="4" fill="#0f172a" />
            <path d="M25 35 Q10 20 22 28 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <path d="M75 35 Q90 20 78 28 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <polygon points="18,34 24,32 26,40 20,42" fill="#f59e0b" />
          </g>
        </svg>
      </div>
    );
  }

  const currentSrc = errorCount === 0 ? resolvedSrc : REMOTE_COW_PHOTOS.heroHolstein;

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="eager"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleImageError}
      className={className}
    />
  );
};

/**
 * 1. Hero Arched Cow Photo Frame
 */
export const HeroCowScene: React.FC<RealCowImageProps> = ({
  className = '',
  imgSrc = REAL_COW_PHOTOS.heroHolstein,
  alt = 'Holstein Dairy Cow at Reno Farm'
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <RealCowPhoto
        imgSrc={imgSrc}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

/**
 * 2. Pasture Herd & Farm Animals Tour Real Photo
 */
export const PastureTourScene: React.FC<RealCowImageProps> = ({
  className = '',
  imgSrc = REAL_COW_PHOTOS.pastureHerd,
  alt = 'Dairy Cattle Herd Grazing in Pasture'
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <RealCowPhoto
        imgSrc={imgSrc}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

/**
 * 3. Sustainable Practices Circular Cow Real Photo
 */
export const PracticesCowScene: React.FC<RealCowImageProps> = ({
  className = '',
  imgSrc = REAL_COW_PHOTOS.holsteinPortrait,
  alt = 'Dairy Cow Sustainability'
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <RealCowPhoto
        imgSrc={imgSrc}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

/**
 * 4. Heritage Cow & Calf Real Photo
 */
export const HeritageCowScene: React.FC<RealCowImageProps> = ({
  className = '',
  imgSrc = REAL_COW_PHOTOS.motherAndCalf,
  alt = 'Cow & Calf Heritage at Reno Farm'
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <RealCowPhoto
        imgSrc={imgSrc}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

/**
 * 5. Livestock Directory, Detail View & Alert Real Cow Avatar
 */
export const CowAvatar: React.FC<{
  src?: string;
  alt?: string;
  tagId?: string;
  className?: string;
}> = ({ src, alt = 'Dairy Cow', tagId, className = 'w-full h-full' }) => {
  const defaultPhoto = src || REAL_COW_PHOTOS.heroHolstein;

  return (
    <div className={`relative overflow-hidden bg-slate-800 flex items-center justify-center ${className}`}>
      <RealCowPhoto
        imgSrc={defaultPhoto}
        alt={alt}
        className="w-full h-full object-cover"
      />
      {tagId && (
        <span className="absolute bottom-0 inset-x-0 bg-slate-950/85 text-[8px] sm:text-[9px] font-mono font-bold text-emerald-400 text-center py-0.5 pointer-events-none z-10">
          {tagId.startsWith('#') ? tagId : `#${tagId}`}
        </span>
      )}
    </div>
  );
};
