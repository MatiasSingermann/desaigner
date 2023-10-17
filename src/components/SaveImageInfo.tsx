// import type { FullDataImage } from "~/hooks/useImageData";
// import base64 from "base64-js";

// interface SaveImageInfo {
//   environment: string;
//   budget: string;
//   style: string;
//   image: Blob;
//   furniture: FullDataImage;
// }

// function SaveImageInfo({
//   environment,
//   budget,
//   style,
//   image,
//   furniture,
// }: SaveImageInfo) {
//   const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     let base64String = "";

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const arrayBuffer = reader.result as ArrayBuffer;
//       const byteArray = new Uint8Array(arrayBuffer);
//       base64String = base64.fromByteArray(byteArray);
//     };
//     reader.readAsArrayBuffer(image);

//     const formData = new FormData(e.currentTarget);
//     const inputData = [];

//     for (const pair of formData.entries()) {
//       inputData.push(pair);
//     }

//     const nombre = inputData[0] ? inputData[0][1] : "";
//     const coleccion = inputData[1] ? inputData[1][1] : "";

//     const obj = {
//       nombre: nombre,
//       ambiente: environment,
//       disenioIMG: base64String,
//       muebles: furniture,
//       presupuesto: budget,
//       estilo: style,
//       colecciones: coleccion,
//     };

//     fetch("api/auth/createDisenio", {
//       method: "POST",
//       body: JSON.stringify(obj),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error: Error) => {
//         console.log(error);
//       });
//   };
//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-red flex h-full w-full items-center justify-center rounded-xl"
//     >
//       <input name="Nombre" type="text" />
//       <input name="Colecciones" type="text" />
//     </form>
//   );
// }

// export default SaveImageInfo;
