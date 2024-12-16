"use client";

import { useState } from "react";
import ButtonToggle from "./ButtonToggle";

const ToggleButton = () => {
  const [activeDiv, setActiveDiv] = useState<null | number>(null);
  const [activeDiv1, setActiveDiv1] = useState<null | number>(null);

  const handleToggle = (buttonIndex: number) => {
    setActiveDiv((prev) => (prev === buttonIndex ? null : buttonIndex));
  };
  const handleToggle1 = (buttonIndex: number) => {
    setActiveDiv1((prev) => (prev === buttonIndex ? null : buttonIndex));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Toggle Button Demo</h1>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <ButtonToggle
            initialState={false}
            onToggle={() => handleToggle(1)}
          />
          <ButtonToggle
            initialState={false}
            onToggle={() => handleToggle1(2)}
          />
        </div>

        {/* Divs */}
        <div className="mt-6">
          {activeDiv === 1 && (
            <div className="p-4 bg-green-100 border border-green-400 rounded">
              <p>This is the first div, controlled by the first button.</p>
            </div>
          )}
          {activeDiv1 === 2 && (
            <div className="p-4 bg-blue-100 border border-blue-400 rounded">
              <p>This is the second div, controlled by the second button.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToggleButton;

// "use client"

// import ButtonToggle from "./ButtonToggle";

// const ToggleButton = () => {
//     const handleToggle = (state: boolean) => {
//         console.log("Toggle state:", state);
//       };
    
//       return (
//         <div className="flex items-center justify-center h-screen bg-gray-100">
//           <div className="text-center">
//             <h1 className="mb-4 text-2xl font-bold">Toggle Button Demo</h1>
//             <ButtonToggle initialState={false} onToggle={handleToggle} />
//           </div>
//         </div>
//       );
//     };
// export default ToggleButton;