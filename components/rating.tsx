"use client";

import React, { FC, useState } from "react";

type RatingProps = {
  rating: number;
  onRate?: (value: number) => void;
  allowHalf?: boolean;
  max?: number;
};

type StarProps = {
  filled: boolean;
  half: boolean;
  index: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const Star: FC<StarProps> = ({
  filled,
  half,
  index,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <svg
      key={index}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`w-6 h-6 cursor-pointer transition-colors ${
        filled || half ? "text-amber-500" : "text-gray-400"
      }`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      {half ? (
        <>
          <defs>
            <linearGradient id={`half-grad-${index}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#half-grad-${index})`}
            d="M10 15l-5.878 3.09L5.516 12 1 7.91l6.061-.91L10 1l2.939 6 6.061.91L14.484 12l1.394 6.09z"
          />
        </>
      ) : (
        <path d="M10 15l-5.878 3.09L5.516 12 1 7.91l6.061-.91L10 1l2.939 6 6.061.91L14.484 12l1.394 6.09z" />
      )}
    </svg>
  );
};

export const Rating: FC<RatingProps> = ({
  rating,
  onRate,
  allowHalf = true,
  max = 5,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const displayRating = hovered ?? rating;

  const stars = Array.from({ length: max }, (_, i) => {
    const starIndex = i + 1;
    const filled = displayRating >= starIndex;
    const half =
      allowHalf &&
      displayRating >= starIndex - 0.5 &&
      displayRating < starIndex;

    return (
      <Star
        key={starIndex}
        index={starIndex}
        filled={filled}
        half={half}
        onClick={onRate ? () => onRate(starIndex) : undefined}
        onMouseEnter={onRate ? () => setHovered(starIndex) : undefined}
        onMouseLeave={onRate ? () => setHovered(null) : undefined}
      />
    );
  });

  return <div className="flex space-x-1">{stars}</div>;
};
