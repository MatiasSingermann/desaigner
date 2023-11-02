import FolderImg from "./FolderImg";

interface FolderPreviewProps {
    index: number;
  }

function FolderPreview({ index }: FolderPreviewProps) {
  return (
    <div className="flex h-[60px] w-[284px]">
      <div className="flex flex-col items-start">
        <p className="font-coolveticaRegular text-[30px]">coleccion.nombre</p>
        <p className="font-coolveticaLight text-[20px]">
          coleccion.numImagenes
        </p>
      </div>
      <FolderImg />
    </div>
  );
}

export default FolderPreview;
