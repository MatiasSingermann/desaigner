interface InputLoginButtonProps {
  icon: JSX.Element;
  type: string;
  pholder: string;
}

function InputLoginButton({ icon, type, pholder }: InputLoginButtonProps) {
  return (
    <div className="flex justify-start items-center group">
      <span className="absolute pl-2 pointer-events-none">{icon}</span>
      <input
        className="my-[6px] h-[52px] w-[310px] rounded-[1.25rem] border-2 border-[#E8E8E8] bg-[#FBF9FA] text-[20px] text-[#C4C4C4] placeholder:text-[#C4C4C4] pl-11 focus:placeholder:text-transparent appearance-none"
        type={type}
        placeholder={pholder}
      />
    </div>
  );
}

export default InputLoginButton;
