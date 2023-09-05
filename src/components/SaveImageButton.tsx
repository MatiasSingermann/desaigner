import type { MouseEventHandler } from 'react';

interface SaveImageButtonProps {
    handleSaveImage: MouseEventHandler<HTMLButtonElement>;
}

function SaveImageButton({handleSaveImage} : SaveImageButtonProps) {
  return <button onClick={handleSaveImage} className="h-[50px] w-[100px] bg-red-500">Guardar</button>;
}

export default SaveImageButton;
