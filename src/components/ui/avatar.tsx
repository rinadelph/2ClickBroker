import { FC, ReactNode } from 'react';

interface AvatarProps {
  children: ReactNode;
  className?: string;
}

export const Avatar: FC<AvatarProps> = ({ children, className }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {children}
    </div>
  );
};

interface AvatarImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const AvatarImage: FC<AvatarImageProps> = ({ src, alt, className }) => {
  return (
    <img src={src} alt={alt} className={`rounded-full ${className}`} />
  );
};

interface AvatarFallbackProps {
  children: ReactNode;
  className?: string;
}

export const AvatarFallback: FC<AvatarFallbackProps> = ({ children, className }) => {
  return (
    <div className={`rounded-full bg-gray-200 flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
};