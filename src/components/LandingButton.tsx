import Link from "next/link";
import { motion } from "framer-motion";

interface LandingButtonProps {
  text: string;
  color: string;
  link: string;
}

function LandingButton({ text, color, link }: LandingButtonProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      variants={{
        visible: { opacity: 1, scale: 1, translateY: 0 },
        hidden: { opacity: 0, scale: 1, translateY: 22 },
      }}
    >
      {" "}
      <Link
        href={link}
        className={`mb-[22px] flex h-[36px] w-[186px] cursor-pointer items-center justify-center rounded-2xl font-coolveticaRegular text-[20px] text-[#FBF9FA] shadow-md shadow-[#999] dark:shadow-[#111] ${color}`}
      >
        {text}
      </Link>
    </motion.div>
  );
}

export default LandingButton;
