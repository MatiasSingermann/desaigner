import { Dispatch, SetStateAction } from "react";
import { Range, getTrackBackground } from "react-range";

interface SliderProps {
  setSlider: Dispatch<SetStateAction<number[]>>;
  slider: number[];
}

function RangeSlider({ setSlider, slider }: SliderProps) {
  return (
    <>
      <div className="flex flex-col mb-[8px] mt-[58px] p-[8px]">
        <Range
          step={1}
          min={1}
          max={4}
          values={slider}
          onChange={(values) => setSlider(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="flex h-[8px] w-[226px] rounded-2xl bg-[#D9D9D9]"
              style={{
                background: getTrackBackground({
                  values: slider,
                  colors: ["#228187", "#D9D9D9"],
                  min: 1,
                  max: 4,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="flex h-[36px] w-[36px] rounded-full bg-[#009E95] shadow-sm shadow-[#999] dark:shadow-[#111]"
            />
          )}
        />
      </div>
      <input
        type="hidden"
        name="slider"
        value={Number(slider.toString().substring(0, 1))}
        readOnly
        className="hidden"
      />
    </>
  );
}

export default RangeSlider;
