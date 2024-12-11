import React from "react";
import group from "./group.png";
import help from "./help.png";
import letter from "./letter.png";
import rectangle10 from "./rectangle-10.svg";
import rectangle4211 from "./rectangle-4211.svg";
import rectangle4212 from "./rectangle-4212.svg";
import vector from "./vector.svg";
import webAccessibility from "./web-accessibility.png";

export const ThankYouPage = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden [background:linear-gradient(180deg,rgb(81.62,56.07,158.3)_7.5%,rgb(86.28,55.67,178.13)_10.5%,rgb(167.13,100.7,187.34)_88.5%)] w-[1796px] h-[1080px] relative">
        <img
          className="absolute w-[131px] h-[140px] top-[50px] left-[42px]"
          alt="Group"
          src={group}
        />

        <div className="absolute w-[1212px] h-[629px] top-[220px] left-[293px] bg-[#63636391] rounded-[50px]">
          <p className="absolute h-[122px] top-[204px] left-[95px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[50px] text-center tracking-[0] leading-[normal]">
            Thank you for your submission.
            <br />
            We will reach out within 3-5 business days.
          </p>
        </div>

        <footer className="absolute w-[1798px] h-[95px] top-[985px] left-0 bg-transparent">
          <div className="relative w-[1796px] h-[95px]">
            <div className="absolute w-[1796px] h-[93px] top-0 left-0 bg-[#c9c9c999]" />

            <img
              className="absolute w-[61px] h-[66px] top-[15px] left-[17px]"
              alt="Vector"
              src={vector}
            />

            <div className="absolute w-[379px] top-[23px] left-[93px] [text-shadow:0px_6px_4px_#00000040] [-webkit-text-stroke:1px_#000000] [font-family:'Lexend_Deca-Regular',Helvetica] font-normal text-[#eaeaea] text-[40px] tracking-[4.00px] leading-[normal]">
              SOBREMESA
            </div>

            <img
              className="absolute w-[166px] h-[73px] top-[15px] left-[1425px]"
              alt="Rectangle"
              src={rectangle10}
            />

            <img
              className="absolute w-[166px] h-[73px] top-[15px] left-[1608px]"
              alt="Rectangle"
              src={rectangle4211}
            />

            <img
              className="absolute w-[166px] h-[73px] top-4 left-[1242px]"
              alt="Rectangle"
              src={rectangle4212}
            />

            <img
              className="absolute w-[59px] h-[59px] top-5 left-[1292px]"
              alt="Web accessibility"
              src={webAccessibility}
            />

            <img
              className="absolute w-[55px] h-[94px] top-px left-[1482px]"
              alt="Help"
              src={help}
            />

            <img
              className="absolute w-16 h-16 top-4 left-[1659px]"
              alt="Letter"
              src={letter}
            />
          </div>
        </footer>
      </div>
    </div>
  );
};
