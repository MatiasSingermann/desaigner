import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

const motionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true },
  transition: { duration: 0.4 },
  variants: {
    visible: { opacity: 1, scale: 1, translateY: 0 },
    hidden: { opacity: 0, scale: 1, translateY: 22 },
  },
};

function DeleteAccountButton() {
  return (
    <motion.button
      {...motionProps}
      onClick={() => void signOut()}
      className="mb-[130px] flex h-[54px] w-[216px] items-center justify-center rounded-3xl bg-gradient-to-b from-[#C35959] to-[#872222] font-coolveticaRegular text-[27px] text-[#FBF9FA] shadow-md shadow-[#999] dark:shadow-[#111]"
    >
      Borrar cuenta
    </motion.button>
  );
}

export default DeleteAccountButton;
