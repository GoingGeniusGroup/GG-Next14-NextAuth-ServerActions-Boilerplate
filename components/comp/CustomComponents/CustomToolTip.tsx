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
          rounded-md dark:bg-black bg-gray-200 px-2 py-1
          text-sm dark:text-white text-black opacity-20 transition-all
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
