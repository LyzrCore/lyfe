import React from "react";

export const DotsLoader: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-gray-800 rounded-full inline-block animate-bounce"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
};
