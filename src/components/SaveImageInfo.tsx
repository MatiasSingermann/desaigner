interface SaveImageInfo {
  environment: string;
  budget: string;
  style: string;
  image: string;
  furniture: string[];
}

// environment, budget, style, image, furniture

function SaveImageInfo({}: SaveImageInfo) {
  return (
    <form className="bg-red flex h-full w-full items-center justify-center">
      <input name="Nombre" type="text" />
      <input name="Ambiente" type="hidden" className="hidden" />
      <input name="Presupuesto" type="hidden" className="hidden" />
      <input name="Estilo" type="hidden" className="hidden" />
      <input name="Colecciones" type="text" />
      <input name="DiseñoIMG" type="hidden" className="hidden" />
      <input name="Muebles" type="hidden" className="hidden" />
    </form>
  );
}

export default SaveImageInfo;
