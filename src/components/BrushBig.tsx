import type { SetStateAction } from "react";

interface BrushBigProps {
  drawActivated: SetStateAction<boolean>;
}

function BrushBig({ drawActivated }: BrushBigProps) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_926_1169)">
        <path
          d="M9.78667 18.1254C7.43589 18.2766 5.30249 19.1719 4.09194 22.3617C3.95425 22.7256 3.62319 22.9465 3.23706 22.9465C2.90197 22.9465 2.20605 22.5169 1.53133 22.0466C0.872056 21.587 0.0151556 22.0256 0.120238 22.8223C0.646655 26.8136 2.92582 30 7.50034 30C11.9453 30 15.0003 27.4354 15.0003 22.9576C15.0003 22.7754 14.9623 22.6014 14.9435 22.4227L9.78667 18.1254ZM26.8298 0C25.9416 0 25.1089 0.393164 24.4738 0.963867C12.4966 11.6631 11.2503 11.9145 11.2503 15.0639C11.2503 15.8666 11.4408 16.6318 11.7619 17.3314L15.5013 20.4475C15.9238 20.5529 16.3591 20.625 16.8132 20.625C20.4525 20.625 22.5619 17.9607 29.1859 5.59805C29.6183 4.75723 30.0003 3.84902 30.0003 2.90332C30.0003 1.20937 28.4769 0 26.8298 0Z"
          fill= {drawActivated ? "#009E95" : "#1B1F1F"}
        />
      </g>
      <defs>
        <clipPath id="clip0_926_1169">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default BrushBig;
