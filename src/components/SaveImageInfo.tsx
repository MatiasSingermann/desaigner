import type { FullDataImage } from "~/hooks/useImageData";
import base64 from 'base64-js'

interface SaveImageInfo {
  environment: string;
  budget: string;
  style: string;
  image: Blob;
  furniture: FullDataImage;
}

function SaveImageInfo({environment, budget, style, image, furniture}: SaveImageInfo) {
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputData = [];

    for (const pair of formData.entries()) {
      inputData.push(pair);
    }
    
    const nombre = inputData[0]?inputData[0][1]:"";
    const coleccion = inputData[1]?inputData[1][1]:"";

    const obj = {
      nombre: nombre,
      ambiente: environment,
      // disenioIMG: base64.fromByteArray(image),
      muebles: furniture,
      presupuesto: budget,
      estilo: style,
      colecciones: coleccion,
    };

    fetch("http://localhost:8000/img2img/v3", {
      method: "POST",
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        // a
      })
      .catch((error: Error) => {
        // a
      });
  }
  return (
    <form onSubmit={handleSubmit} className="bg-red flex h-full w-full items-center justify-center">
      <input name="Nombre" type="text" />
      <input name="Colecciones" type="text" />
    </form>
  );
}

export default SaveImageInfo;
