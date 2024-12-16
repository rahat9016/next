"use client";

import { useState } from "react";

interface ButtonToggleProps {
  initialState?: boolean;
  onToggle?: () => void;
}

const ButtonToggle: React.FC<ButtonToggleProps> = ({
  initialState = false,
  onToggle,
}) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleClick = () => {
    setIsOn((prev) => !prev);
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`relative inline-flex items-center h-6 w-11 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isOn ? "bg-green-500" : "bg-gray-400"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isOn ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default ButtonToggle;

// "use client"; // Mark this component as a Client Component

// import { useState } from "react";

// interface ToggleButtonProps {
//   initialState?: boolean; // Optional initial state
//   onToggle?: (state: boolean) => void; // Callback function when toggled
// }

// const ButtonToggle: React.FC<ToggleButtonProps> = ({
//   initialState = false,
//   onToggle,
// }) => {
//   const [isOn, setIsOn] = useState(initialState);

//   const handleToggle = () => {
//     const newState = !isOn;
//     setIsOn(newState);
//     if (onToggle) {
//       onToggle(newState);
//     }
//   };

//   return (
//     <button
//       onClick={handleToggle}
//       className={`relative inline-flex items-center h-6 w-11 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
//         isOn ? "bg-green-500" : "bg-gray-400"
//       }`}
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//           isOn ? "translate-x-5" : "translate-x-1"
//         }`}
//       />
//     </button>
//   );
// };

// export default ButtonToggle;