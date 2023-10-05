import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import base64 from "base64-js";

export type InputImageDataProps = {
  box: [number, number, number, number];
  prompt: string;
  links: [string, string, string];
};

export type dataImage = {
  images: string[];
};

export type FullDataImage = InputImageDataProps[];

export type Image = {
  blob: Blob;
  url: string;
};

const useImageData = (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setFinished: Dispatch<SetStateAction<boolean>>
) => {
  const [imageFullData, setImageFullData] = useState<FullDataImage>(
    [] as FullDataImage
  );
  const [images, setImages] = useState<Image[]>([]);

  // const [blobs, setBlobs] = useState<Blob[]>([]);

  const imageProcessor = (data: dataImage) => {
    setLoading(false);

    data.images.forEach((image) => {
      const imageByteArray = base64.toByteArray(image);
      const myBlob = new Blob([imageByteArray], {
        type: "image/jpeg",
      });

      setImages((formerImages) => {
        formerImages.push({
          blob: myBlob,
          url: URL.createObjectURL(myBlob),
        });
        return formerImages;
      });
    });

    setFinished(true);

    // setResult(true);
  };

  return {
    imageFullData,
    setImageFullData,
    images,
    imageProcessor,
  };
};

export default useImageData;
