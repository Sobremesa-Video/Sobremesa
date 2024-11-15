import Footer from "../components/footer";
import React from "react";
import 'app/styles/accessibility.css';

export default function Accessibility() {
  return (
    <div className="accessibility">
      <div className="div">
        <img className="group" alt="Group" src="app/assets/accessibilityicons/group.png" />

        <div className="overlap">
          <div className="functions">
            <div className="dark-theme">
              <div className="overlap-group">
                <div className="text-wrapper">Dark Theme</div>

                <div className="ellipse-wrapper">
                  <div className="ellipse" />
                </div>
              </div>
            </div>

            <div className="text-wrapper-2">Color Contrast</div>

            <div className="overlap-2">
              <div className="frame">
                <div className="text-wrapper-3">Bold Text</div>
              </div>

              <div className="div-wrapper">
                <div className="ellipse-2" />
              </div>
            </div>

            <div className="overlap-3">
              <div className="text-wrapper-4">GrayScale</div>

              <div className="group-2">
                <div className="ellipse-3" />
              </div>
            </div>

            <div className="overlap-4">
              <img className="line" alt="Line" src="app/assets/accessibilityicons/line-10.svg" />

              <div className="sun-duotone">
                <div className="ellipse-4" />

                <img className="vector" alt="Vector" src="app/assets/accessibilityicons/vector-167.svg" />

                <img className="img" alt="Vector" src="app/assets/accessibilityicons/vector-167.svg" />

                <img className="vector-2" alt="Vector" src="app/assets/accessibilityicons/vector-167-2.svg" />

                <img className="vector-3" alt="Vector" src="app/assets/accessibilityicons/vector-167-2.svg" />

                <img className="vector-4" alt="Vector" src="app/assets/accessibilityicons/vector-167-3.svg" />

                <img className="vector-5" alt="Vector" src="app/assets/accessibilityicons/vector-167-3.svg" />

                <img className="vector-6" alt="Vector" src='/' />

                <img className="vector-7" alt="Vector" src='/' />
              </div>
            </div>

            <div className="overlap-5">
              <div className="text-wrapper-5" >
                Read Aloud</div>

              <div className="group-3">
                <div className="ellipse-5" />
              </div>
            </div>

            <div className="overlap-6">
              <img className="rectangle" alt="Rectangle" src="app/assets/accessibilityicons/rectangle-4193.svg" />

              <div className="text-wrapper-6">Large</div>

              <div className="text-wrapper-7">Small</div>

              <div className="text-wrapper-8">Medium</div>

              <img className="line-2" alt="Line" src="app/assets/accessibilityicons/line-11.svg" />

              <img className="line-3" alt="Line" src="app/assets/accessibilityicons/line-12.svg" />
            </div>

            <div className="text-wrapper-9">Text Size</div>

            <div className="overlap-7">
              <div className="text-wrapper-10">Bigger Buttons</div>

              <div className="overlap-wrapper">
                <div className="overlap-8">
                  <div className="rectangle-2" />

                  <div className="ellipse-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-wrapper-11">Accessibility</div>
      </div>
      <Footer />
    </div>
  );
};
