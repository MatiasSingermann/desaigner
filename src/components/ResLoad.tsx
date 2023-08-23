import LoadingCircle from "./LoadingCircle";

function ResLoad() {
  return (
    <div className="fixed top-0 z-10 flex h-[100vh] w-full items-center justify-center bg-black bg-opacity-70">
      <div className="relative flex h-[200px] w-[300px] flex-col items-center justify-center rounded-2xl bg-[#22302D] px-[14px]">
        <LoadingCircle />
        <h2 className="my-[14px] text-center font-coolveticaRegular text-[24px] leading-none text-[#FBF9FA]">
          Generando...
        </h2>
        <h2 className="text-center font-coolveticaBook text-[16px] leading-none text-[#FBF9FA]">
          Esto puede tardar unos minutos
        </h2>
      </div>
    </div>
  );
}

export default ResLoad;
