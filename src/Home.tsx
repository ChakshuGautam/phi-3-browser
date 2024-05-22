import React from 'react';
import { Link } from 'react-router-dom';

// function Home() {
//   return (
//     <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
//       <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
//         <Link to="/phi-3"
//           className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
//           Phi-3
//         </Link>
//         <Link to="/whisper"
//           className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
//           Whisper
//         </Link>
//       </nav>
//     </div>
//   );
// }

function Home() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 flex flex-col h-screen mx-auto items justify-end text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
          <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
            <Link to="/phi-3" className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
              <div className="grid mr-4 place-items-center">
                <img alt="phi-3" src="phi-3.png"
                  className="inline-block h-12 w-12 !rounded-full object-cover object-center" />
              </div>
              <div>
                <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Phi-3
                </h6>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                 Microsoft’s Mini Language Model
                </p>
              </div>
            </Link>
            <Link to="/whisper" className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
              <div className="grid mr-4 place-items-center">
                <img alt="whisper" src="https://res.cloudinary.com/apideck/image/upload/w_196,f_auto/v1667440836/marketplaces/ckhg56iu1mkpc0b66vj7fsj3o/listings/14957082_wyd29r.png"
                  className="relative inline-block h-12 w-12 !rounded-full object-cover object-center" />
              </div>
              <div>
                <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Whisper
                </h6>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                Large-Scale Weak Supervision Resources
                </p>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    );
  }

export default Home;