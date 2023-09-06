import { signOut } from "next-auth/react"

function SignOutButton() {
  return (
    <button
      onClick={() => void signOut()}
      className="mb-[130px] flex h-[54px] w-[216px] items-center justify-center rounded-3xl bg-gradient-to-b from-[#59C3C3] to-[#228187] font-coolveticaRegular text-[27px] text-[#FBF9FA] shadow-md shadow-[#999] dark:shadow-[#111]"
    >
      Cerrar sesión
    </button>
  );
}

export default SignOutButton;
