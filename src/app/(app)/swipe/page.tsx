"use client";

import React, { useState } from "react";
import {
  motion,
  useDragControls,
  useMotionValue,
  useTransform,
} from "motion/react";

type CardData = {
  id: number;
  url: string;
};

type CardProps = CardData & {
  cards: CardData[];
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
};

const cardData: CardData[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2370&auto=format&fit=crop",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=2235&auto=format&fit=crop",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2342&auto=format&fit=crop",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2224&auto=format&fit=crop",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2340&auto=format&fit=crop",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1570464197285-9949814674a7?q=80&w=2273&auto=format&fit=crop",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1578608712688-36b5be8823dc?q=80&w=2187&auto=format&fit=crop",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?q=80&w=2340&auto=format&fit=crop",
  },
];

const SwipeCards = () => {
  const [cards, setCards] = useState<CardData[]>(cardData);

  return (
    <div
      className="grid h-screen w-full place-items-center bg-neutral-100"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      }}
    >
      {cards.map((card) => (
        <Card key={card.id} cards={cards} setCards={setCards} {...card} />
      ))}
    </div>
  );
};

const Card = ({ id, url, cards, setCards }: CardProps) => {
  const x = useMotionValue(0);
  const dragControls = useDragControls();

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const isFront = id === cards[cards.length - 1]?.id;

  const rotate = useTransform(
    rotateRaw,
    (value) => `${value + (isFront ? 0 : id % 2 ? 6 : -6)}deg`,
  );

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      setCards((current) => current.filter((card) => card.id !== id));
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isFront) {
      dragControls.start(event, {
        distanceThreshold: 0,
      });
    }
  };

  return (
    <motion.div
      draggable={false}
      onPointerDown={handlePointerDown}
      className="h-96 w-72 origin-bottom touch-none select-none rounded-lg bg-white bg-cover bg-center hover:cursor-grab active:cursor-grabbing"
      style={{
        backgroundImage: `url(${url})`,
        gridRow: 1,
        gridColumn: 1,
        zIndex: isFront ? cards.length : id,
        pointerEvents: isFront ? "auto" : "none",
        x,
        opacity,
        rotate,
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag={isFront ? "x" : false}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragSnapToOrigin
      onDragEnd={handleDragEnd}
    />
  );
};

export default SwipeCards;
