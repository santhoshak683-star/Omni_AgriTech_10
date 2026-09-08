import React, { useState } from 'react';

interface UserAvatarProps {
  src?: string;
  name?: string;
  className?: string;
}

const FALLBACK_AVATARS: Record<string, string> = {
  martin: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  sarah: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
  lincoln: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  elena: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name = 'User',
  className = 'w-8 h-8 rounded-full object-cover border border-slate-300 shadow-xs',
}) => {
  const [errorCount, setErrorCount] = useState(0);

  // Normalize local broken /images/ paths or map known demo users
  let resolvedSrc = src;
  const lowerName = name.toLowerCase();

  if (!resolvedSrc || resolvedSrc.includes('avatar-martin') || lowerName.includes('martin')) {
    resolvedSrc = FALLBACK_AVATARS.martin;
  } else if (resolvedSrc.includes('avatar-sarah') || lowerName.includes('sarah')) {
    resolvedSrc = FALLBACK_AVATARS.sarah;
  } else if (resolvedSrc.includes('avatar-lincoln') || lowerName.includes('lincoln')) {
    resolvedSrc = FALLBACK_AVATARS.lincoln;
  } else if (resolvedSrc.includes('avatar-elena') || lowerName.includes('elena')) {
    resolvedSrc = FALLBACK_AVATARS.elena;
  }

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || 'RF';

  // If even remote fallback fails, display elegant stylized initials badge
  if (errorCount > 0 || !resolvedSrc) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-black text-xs select-none`}
        title={name}
      >
        <span>{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={name}
      loading="eager"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setErrorCount((prev) => prev + 1)}
      className={className}
    />
  );
};
