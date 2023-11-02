interface FolderSelectorProps {
  index: number;
}

function FolderSelector({ index }: FolderSelectorProps) {
  fetch("api/auth/Colecciones", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error: Error) => {
      console.log(error);
    });
  return (
    <div className="flex h-[50px] w-[238px] items-center justify-between">
      <div className="flex flex-col items-start text-[#FBF9FA]">
        <p className="font-coolveticaRegular text-[25px]">
          coleccion[index].name
        </p>
        <p className="font-coolveticaLight text-[11px]">
          coleccion[index].numDisenios
        </p>
      </div>
      <div className="flex h-[40px] w-[40px] flex-wrap items-start">
        {/* {coleccion[index].numDisenios > 0 && (
            <div className="w-[20px] h-[20px] bg-[#202020]"></div>
        )} */}
        {/* {coleccion[index].numDisenios > 1 && (
            <div className="w-[20px] h-[20px] bg-[#FF0000]"></div>
        )} */}
        {/* {coleccion[index].numDisenios > 2 && (
            <div className="w-[20px] h-[20px] bg-[#0000FF]"></div>
        )} */}
        {/* {coleccion[index].numDisenios > 3 && (
            <div className="w-[20px] h-[20px] bg-[#FFC0CB]"></div>
        )} */}
      </div>
    </div>
  );
}

export default FolderSelector;
