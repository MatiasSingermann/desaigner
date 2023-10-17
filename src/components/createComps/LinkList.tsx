// import { LinkComponent } from "./LinkComponent";
// import type { FullDataImage } from "~/hooks/useImageData";

// export const LinkList = ({ data }: { data: FullDataImage; }) => {
//   // if (!imageFullData) return;
//   return (
//     <>
//       {data.map((furniture, index) => (
//         <div
//           key={index}
//           className="flex w-full flex-col items-center leading-none"
//         >
//           <div className="flex w-11/12 flex-col items-start justify-start">
//             <h3 className="mx-[12px] mb-[14px] mt-[26px] flex w-11/12 items-start justify-start text-start font-coolveticaRegular text-[20px] text-[#292F2D] dark:text-[#FBF9FA]">
//               {furniture["prompt"]}
//             </h3>
//             <div className="mx-[12px] flex w-11/12 flex-col items-start justify-start text-start font-coolveticaBook text-[15px] text-[#2A9DA5]">
//               <LinkComponent link={furniture["links"][0]} n={1} />
//               <LinkComponent link={furniture["links"][1]} n={2} />
//               <LinkComponent link={furniture["links"][2]} n={3} />
//             </div>
//           </div>
//           <div className="mx-[16px] flex h-[1px] w-11/12 items-center justify-center bg-[#BABABA] dark:bg-[#228187]"></div>
//         </div>
//       ))}
//     </>
//   );
// };
