// import type { Dispatch, SetStateAction } from "react";
// import { useState } from "react";
// import base64 from "base64-js";
// import { toast } from "react-toastify";

// export const [moreThan1, setMoreThan1] = useState(false);

// export type InputImageDataProps = {
//   box: [number, number, number, number];
//   prompt: string;
//   links: [string, string, string];
// };

// export type dataImage = {
//   images: string[];
// };

// export type FullDataImage = InputImageDataProps[];

// export type Image = {
//   blob: Blob;
//   url: string;
// };

// const useImageData = (
//   setLoading: Dispatch<SetStateAction<boolean>>,
//   setFinished: Dispatch<SetStateAction<boolean>>,
//   setResult: Dispatch<SetStateAction<boolean>>,
// ) => {
//   const [imageFullData, setImageFullData] = useState<FullDataImage>(
//     [] as FullDataImage
//   );
//   const [images, setImages] = useState<Image[]>([]);

//   // const [blobs, setBlobs] = useState<Blob[]>([]);

//   const imageProcessor = (data: dataImage) => {
//     // setLoading(false);

//     data.images.forEach((image) => {
//       const imageByteArray = base64.toByteArray(image);
//       const myBlob = new Blob([imageByteArray], {
//         type: "image/jpeg",
//       });

//       setImages((formerImages) => {
//         formerImages.push({
//           blob: myBlob,
//           url: URL.createObjectURL(myBlob),
//         });
//         return formerImages;
//       });
//     });

//     setFinished(true);

//     setResult(true);
//   };

//   const getLinks = (blob: Blob) => {
//     const formData = new FormData();
//     formData.append("image", blob);

//     fetch("http://localhost:9000/", { // https://desaigner-image-and-links-api.hf.space/
//       method: "POST",
//       // headers: {
//       //   "Authorization": `Bearer ${process.env.NEXT_PUBLIC_HF_ORG_TOKEN!.toString()}`
//       // },
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data: FullDataImage) => {
//         setImageFullData(data);
//         setMoreThan1(false);
//         setResult(true);
//         setLoading(false);
//       })
//       .catch((error: Error) => {
//         imageError(error);
//       });
//   };

//   const imageError = (error: Error) => {
//     setLoading(false);
//     console.log(
//       "Hubo un error inesperado. Revisa tu conexión o inténtalo más tarde"
//     );
//     console.log(error);
//     toast.error(
//       "Hubo un error inesperado. Revisa tu conexión o inténtalo más tarde",
//       {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       }
//     );
//   };

//   return {
//     imageFullData,
//     setImageFullData,
//     images,
//     imageProcessor,
//     getLinks,
//     imageError,
//     setMoreThan1,
//     moreThan1,
//   };
// };

// export default useImageData;
