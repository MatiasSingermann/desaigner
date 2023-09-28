import { signOut } from "next-auth/react"

function DeleteAccountButton() {
  return (
    <button
      onClick={() => void signOut()}
      className="mb-[130px] flex h-[54px] w-[216px] items-center justify-center rounded-3xl bg-gradient-to-b from-[#C35959] to-[#872222] font-coolveticaRegular text-[27px] text-[#FBF9FA] shadow-md shadow-[#999] dark:shadow-[#111]"
    >
      Borrar cuenta
    </button>
  );
}

export default DeleteAccountButton;
