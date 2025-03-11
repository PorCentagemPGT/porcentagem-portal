"use client";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
}

const Loading = ({ size = "md" }: LoadingProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`${sizeClasses[size]} border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loading;
