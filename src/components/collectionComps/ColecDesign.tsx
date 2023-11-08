import Image from "next/image";

interface FolderDesignsKeys {
    coleccion : string,
  }
  
  type FolderDesigns = FolderDesignsKeys[];

interface ColecDesign {
  folderData: FolderDesigns | undefined;
}

function ColecDesign({ folderData }: ColecDesign) {
    const base64ToBlob = (base64: string, fileName: string): string => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/octet-stream" });
        return URL.createObjectURL(blob);
      };
  return (
    <>
      <h1 className="mx-[32px] mb-[30px] self-start font-coolveticaRegular text-[30px] leading-none text-[#22302D] dark:text-[#FBF9FA]">
        Nombre carpeta
      </h1>
      {/* {folderData?.map((base64, i) => (
        // convertir strings de base64 a archivos y luego hacerles una url
        <Image src={base64ToBlob(base64, `image_${i}.png`)} alt="imagen" width={100} height={100} />
      ))} */}
    </>
  );
}

export default ColecDesign;
