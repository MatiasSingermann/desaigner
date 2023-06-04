interface InputLoginButtonProps {
  icon: JSX.Element;
  type: string;
  pholder: string;
}

function InputLoginButton({ icon, type, pholder }: InputLoginButtonProps) {
  return (
    <div className="flex justify-start items-center group">
      <span className="absolute pl-2 pointer-events-none mb-[12px]">{icon}</span>
      <input
        className="mb-[12px] h-[52px] w-[310px] rounded-[1.25rem] disabled border-2 border-[#E8E8E8] bg-[#FBF9FA] text-[20px] text-[#C4C4C4] placeholder:text-[#C4C4C4] pl-11 focus:outline-none focus:placeholder:text-transparent appearance-none invalid:border-red-500 invalid:text-red-500 invalid:focus:text-red-500 focus:border-[2.5px] shadow-md"
        type={type}
        placeholder={pholder}
      />
    </div>
  );
}

export default InputLoginButton;
