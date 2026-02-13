interface ArgumentBubbleProps {
  speaker: "human" | "ai";
  text: string;
  animate?: boolean;
  delay?: number;
}

export function ArgumentBubble({
  speaker,
  text,
  animate = false,
  delay = 0,
}: ArgumentBubbleProps) {
  const isHuman = speaker === "human";

  return (
    <div
      className={`max-w-[58%] md:max-w-[58%] max-[900px]:max-w-[85%] p-7 px-8 rounded-card text-[14.5px] leading-[1.75] font-light ${
        isHuman
          ? "self-start bg-[#eef1ff] border border-accent-blue/[0.08]"
          : "self-end bg-[#fef1f0] border border-accent-red/[0.08]"
      } ${
        animate
          ? "opacity-0 animate-bubble-in"
          : ""
      }`}
      style={animate ? { animationDelay: `${delay}ms` } : undefined}
    >
      <span
        className={`block text-[10px] tracking-[2.5px] uppercase font-medium mb-2.5 ${
          isHuman ? "text-accent-blue" : "text-accent-red"
        }`}
      >
        {isHuman ? "Human" : "AI"}
      </span>
      {text}
    </div>
  );
}
