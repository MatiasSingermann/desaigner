import LoadingCircle from "./LoadingCircle";

function ResLoad() {
  return (
    <div className="fixed top-0 z-10 flex h-[100vh] w-full items-center justify-center bg-black bg-opacity-70">
      <div className="relative flex h-[226px] w-[324px] flex-col items-center justify-center rounded-2xl bg-[#22302D] px-[14px]">
        <LoadingCircle />
        <h2 className="my-[30px] mb-[4px] text-center font-coolveticaRegular text-[25px] leading-none text-[#FBF9FA]">
          Generando diseño...
        </h2>
        <h2 className="text-center font-coolveticaBook text-[12px] leading-none text-[#FBF9FA]">
          Este proceso puede tomar unos minutos
        </h2>
      </div>
    </div>
  );
}

export default ResLoad;
