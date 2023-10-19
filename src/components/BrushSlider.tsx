import type { Dispatch, SetStateAction } from "react";
import { Range, getTrackBackground } from "react-range";

interface BrushSliderProps {
  setSlider: Dispatch<SetStateAction<number[]>>;
  slider: number[];
}

function BrushSlider({ setSlider, slider }: BrushSliderProps) {
  return (
    <>
      <div className="flex flex-col p-[8px] mb-[6px]">
        <Range
          step={1}
          min={1}
          max={25}
          values={slider}
          onChange={(values) => setSlider(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="flex h-[5px] w-[132px] rounded-2xl bg-[#D9D9D9]"
              style={{
                background: getTrackBackground({
                  values: slider,
                  colors: ["#228187", "#D9D9D9"],
                  min: 1,
                  max: 25,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="flex h-[21px] w-[21px] rounded-full bg-[#009E95] shadow-sm shadow-[#999] dark:shadow-[#111]"
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

export default BrushSlider;
