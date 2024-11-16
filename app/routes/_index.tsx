import React from "react";
import { Link } from "react-router-dom";
import { FaqAccordion } from "./FaqAccordion";
import group from "./group.png";
import questionMark from "./question-mark.png";
import search from "./search.png";

export const FaqPageAlt = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white [background:linear-gradient(180deg,rgb(81.62,56.07,158.3)_7.5%,rgb(86.28,55.67,178.13)_10.5%,rgb(167.13,100.7,187.34)_88.5%)] w-[1796px] h-[1080px]">
        <div className="relative h-[1022px] top-[41px]">
          <div className="absolute w-[1796px] h-[1022px] top-0 left-0">
            <div className="w-[1796px] h-[162px] top-0 bg-[#edc3ff] absolute left-0">
              <div className="absolute w-[697px] h-[94px] top-5 left-[599px]">
                <div className="absolute w-[290px] top-0 left-[217px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[25px] tracking-[0] leading-[normal]">
                  How can we help?
                </div>

                <div className="w-[697px] h-[37px] top-[57px] bg-white rounded-[30px] overflow-hidden absolute left-0">
                  <div className="absolute w-[251px] top-2.5 left-[29px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#686666] text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
                    Type your question:
                  </div>

                  <img
                    className="absolute w-[26px] h-[26px] top-1.5 left-[658px]"
                    alt="Search"
                    src={search}
                  />
                </div>
              </div>

              <img
                className="absolute w-[131px] h-[140px] top-1.5 left-[73px]"
                alt="Group"
                src={group}
              />
            </div>

            <div className="flex flex-col w-[1440px] h-[908px] items-center gap-2 px-0 py-[100px] absolute top-[114px] left-[139px]">
              <div className="flex flex-col w-[1170px] items-center gap-[88px] relative flex-[0_0_auto] mb-[-55.00px]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Bebas_Neue-Regular',Helvetica] font-normal text-black text-8xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
                  Frequently asked questions
                </div>

                <div className="flex flex-col w-[770px] items-start gap-[30px] relative flex-[0_0_auto]">
                  <FaqAccordion
                    className="!self-stretch !w-full"
                    down="down-2.svg"
                    headingClassName="!border-black !border !border-solid"
                    stateProp="closed"
                    text="What is the difference between a UI and UX Designer?"
                  />
                  <FaqAccordion
                    className="!self-stretch !w-full"
                    down="down-3.svg"
                    stateProp="closed"
                    text="How to become a UI designer?"
                  />
                  <FaqAccordion
                    className="!self-stretch !w-full"
                    down="down-4.svg"
                    stateProp="closed"
                    text="What is the best UI design tool?"
                  />
                  <FaqAccordion
                    className="!self-stretch !w-full"
                    down="down-5.svg"
                    stateProp="closed"
                    text="What is the best place to learn Figma?"
                  />
                  <FaqAccordion
                    className="!self-stretch !w-full"
                    down="down-6.svg"
                    stateProp="closed"
                    text="Should designers code?"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute w-[47px] h-[46px] top-[976px] left-[1590px] rounded-[30px]">
            <div className="absolute w-[47px] h-[46px] top-0 left-0 bg-purple-600 rounded-[30px]" />

            <div className="absolute w-[41px] h-[41px] top-1 left-[3px] bg-[url(/web-accessibility.png)] bg-[100%_100%]" />
          </div>

          <div className="absolute w-[47px] h-[46px] top-[976px] left-[1639px] rounded-[30px]">
            <div className="absolute w-[47px] h-[46px] top-0 left-0 bg-purple-600 rounded-[30px]" />

            <div className="absolute w-[35px] h-[35px] top-[5px] left-1.5 bg-[url(/team.png)] bg-[100%_100%]" />
          </div>

          <div className="absolute w-[47px] h-[46px] top-[976px] left-[1686px] rounded-[30px]">
            <Link
              className="absolute w-[47px] h-[46px] top-0 left-0 bg-purple-600 rounded-[30px] block"
              to="/faq-page-alt"
            />

            <img
              className="absolute w-[41px] h-[41px] top-1 left-[3px]"
              alt="Question mark"
              src={questionMark}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
