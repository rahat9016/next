"use client";

import "./globals.css";
import Link from "next/link";
import error from "../../public/ho3f6kQUQZ.json";
import Lottie from "lottie-react";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Lottie className="h-80 w-auto" animationData={error} loop={true} />
      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800">
          Page Not Found
        </p>
        <p className="md:text-lg lg:text-xl text-gray-600 mt-8 items-center">
          Sorry, the page you are looking for could not be found.
        </p>
        <Link
          className="flex items-center space-x-2 bg-green-700 hover:bg-primaryShade text-gray-100 px-4 py-2 mt-12 rounded transition duration-150"
          title="Return Home"
          href={`/`}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}



// "use client";

// import "./globals.css";
// import Link from "next/link";
// import error from "../../public/ho3f6kQUQZ.json";
// import Lottie from "lottie-react";

// export default function NotFound() {
//   return (
//     <html lang="en">
//       <body>
//         <div>
//           <div className="w-full h-screen flex flex-col items-center justify-center">
//             <Lottie
//               className="h-80 w-auto "
//               animationData={error}
//               loop={true}
//             />

//             <div className="flex flex-col items-center justify-center">
//               <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 ">
//                 Page Not Found
//               </p>
//               <p className="md:text-lg lg:text-xl text-gray-600 mt-8 items-center">
//                 Sorry, the page you are looking for could not be found.
//               </p>
//               <Link
//                 className="flex items-center space-x-2 bg-primary hover:bg-primaryShade text-gray-100 px-4 py-2 mt-12 rounded transition duration-150"
//                 title="Return Home"
//                 href={`/`}
//               >
//                 <svg
//                   className="h-5 w-5"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
//                     clip-rule="evenodd"
//                   ></path>
//                 </svg>
//                 <span>Return Home</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }
