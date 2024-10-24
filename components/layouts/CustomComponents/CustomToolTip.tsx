interface toolTip {
  content: string;
  top: string;
  left: string;
  translateY: string;
}

export default function CustomToolTip({
  content,
  top,
  left,
  translateY,
}: toolTip) {
  return (
    <>
      <div
        className={`
          invisible absolute whitespace-nowrap
          rounded-md bg-indigo-100 px-2 py-1
          text-sm text-indigo-800 opacity-20 transition-all
          group-hover:visible group-hover:opacity-100
        `}
        style={{
          top: `${top}px`,
          left: `${left}px`,
        }}
      >
        <span className={`transform group-hover:translate-y-${translateY}px`}>
          {content}
        </span>
      </div>
    </>
  );
}
