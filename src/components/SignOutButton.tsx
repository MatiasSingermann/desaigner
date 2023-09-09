import { signOut } from "next-auth/react"

function SignOutButton() {
  return (
    <button
      onClick={() => void signOut()}
      className="mb-[48px] flex h-[54px] w-[216px] items-center justify-center rounded-3xl bg-[#009E95] font-coolveticaRegular text-[27px] text-[#FBF9FA] shadow-md shadow-[#999] dark:shadow-[#111]"
    >
      Cerrar sesión
    </button>
  );
}

export default SignOutButton;
