import Head from "next/head";
import Footer from "~/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ColecFolders from "~/components/collectionComps/ColecFolders";
import ColecDesign from "~/components/collectionComps/ColecDesign";
import ColecDesignInfo from "~/components/collectionComps/ColecDesignInfo";

type furnitureType = {
  id: number,
  url1: string,
  url2: string,
  url3: string,
  disenio_id: number,
  descripcion: string,
  x: number,
  y: number,
  width: number,
  height: number,
}[];

interface ImgData {
  nombre: string;
  id: number;
  colecciones: string[];
  fecha: string;
  imagen: string;
  muebles: furnitureType;
  ambiente: string;
  presupuesto: string;
  estilo: string;
}

interface FolderKeys {
  favorito: boolean;
  id: number;
  nombre: string;
  disenios: object[];
}

type FolderType = FolderKeys[];

interface FolderDesignsKeys {
  id: number;
  disenio: {
    id: number,
    imagen: string,
  };
}

type FolderDesigns = FolderDesignsKeys[];

function Index() {
  const router = useRouter();
  const [foldersInfo, setFoldersInfo] = useState<FolderType>();
  const [showFolder, setShowFolder] = useState(false);
  const [showDesignInfo, setShowDesignInfo] = useState(false);
  const [folderData, setFolderData] = useState<FolderDesigns | undefined | object[]>();
  const [folderName, setFolderName] = useState<string>("");
  const [imageData, setImageData] = useState<ImgData | undefined>();

  useEffect(() => {
    fetch("api/auth/Colecciones", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data : FolderType) => {
        // console.log(data);
        setFoldersInfo(data);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

  const { status } = useSession({
    required: false,
  });

  if (status === "loading") {
    return "Cargando...";
  }

  if (status === "unauthenticated") {
    void router.push("/login");
  }

  if (status === "authenticated") {
    return (
      <>
        <Head>
          <title>Collections</title>
          <meta name="description" content="Generated by DesAIgner Team" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex grow flex-col items-center justify-start font-coolveticaLight">
          {!showFolder && !showDesignInfo && (
            <ColecFolders
              foldersInfo={foldersInfo!}
              setShowFolder={setShowFolder}
              setFolderData={setFolderData}
              setFolderName={setFolderName}
            />
          )}
          {showFolder && <ColecDesign folderData={folderData} setShowFolder={setShowFolder} folderName={folderName} setShowDesignInfo={setShowDesignInfo} setImageData={setImageData} />}
          {showDesignInfo && <ColecDesignInfo setShowFolder={setShowFolder} setShowDesignInfo={setShowDesignInfo} imageData={imageData}/>}
        </main>
        <Footer />
      </>
    );
  }
}

export default Index;
