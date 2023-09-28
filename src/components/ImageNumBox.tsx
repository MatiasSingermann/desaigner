interface ImageNumBoxProps {
  number: string;
  status: boolean;
}

function ImageNumBox({ number, status }: ImageNumBoxProps) {
  return (
    <div
      className={`m-[8px] flex h-[80px] w-[150px] items-center justify-center rounded-2xl font-coolveticaRegular text-[#FBF9FA] ${
        status ? "bg-[#59C3C3] text-[45px]" : "bg-[#D9D9D9] dark:bg-[#293433] text-[0px]"
      }`}
    >
      {number}
    </div>
  );
}

export default ImageNumBox;
