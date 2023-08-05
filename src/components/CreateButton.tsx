function CreateButton() {
    const sendCreationSettings = () => {
        console.log("mandar form")
    }
  return (
    <button onClick={sendCreationSettings} className="flex h-[54px] w-[216px] items-center justify-center rounded-3xl bg-gradient-to-b from-[#59C3C3] to-[#228187] font-coolveticaRegular text-[27px] text-[#FBF9FA] shadow-2xl mt-[12px] mb-[30px]">
      Generar diseño
    </button>
  );
}

export default CreateButton;
