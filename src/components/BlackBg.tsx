import type { Dispatch, SetStateAction } from "react";

interface blackBgProps {
  setImageButtonClick: Dispatch<SetStateAction<boolean>>;
}

function BlackBg({ setImageButtonClick }: blackBgProps) {
  const handleClick = () => {
    setImageButtonClick(false);
  };
  return (
    <div
      onClick={handleClick}
      className="fixed top-0 z-[100] flex h-[100vh] w-full flex-col items-center justify-center bg-black bg-opacity-70"
    ></div>
  );
}

export default BlackBg;
