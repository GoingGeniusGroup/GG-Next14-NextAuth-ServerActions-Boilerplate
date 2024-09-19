interface toolTip {
    content: String;
    top: String;
    left: number;
    translateY: String;
  }
  
  export default function CustomToolTipLeftRight({
    content,
    top,
    left,
    translateY,
  }: toolTip) {
    const isRightAligned = left < 0;
  
    return (
      <>
        <div
          className={`
            invisible absolute whitespace-nowrap
            rounded-md bg-indigo-100 px-2 py-1
            text-sm text-indigo-800 opacity-20 transition-all
            group-hover:visible group-hover:opacity-100
            ${isRightAligned ? "right-0" : "left-0"}
          `}
          style={{
            top: `${top}px`,
            ...(isRightAligned
              ? { right: `${Math.abs(left)}px` }
              : { left: `${left}px` }),
            transform: `translateY(${translateY}px)`,
          }}
        >
          {content}
        </div>
      </>
    );
  }