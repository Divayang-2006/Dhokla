import { useState } from "react";

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => setIsOpen(!isOpen);

   return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#111]/70 backdrop-blur-md text-yellow-400 shadow-lg">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
               <div className="text-2xl font-bold tracking-wide">Dhokla 🍽️</div>

               <div className="hidden md:flex space-x-8">
                  {["Home", "Explore", "Upload", "Search", "Login"].map((item) => (
                     <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="hover:text-yellow-300 transition"
                     >
                        {item}
                     </a>
                  ))}
               </div>

               {/* Mobile menu toggle */}
               <div className="md:hidden">
                  <button onClick={toggleMenu} className="text-yellow-400 focus:outline-none">
                     {isOpen ? <h3>X</h3> : <h3>Menu</h3>}
                  </button>
               </div>
            </div>
         </div>

         {/* Mobile Menu */}
         {isOpen && (
            <div className="md:hidden px-4 pb-4 space-y-2 bg-[#111]/90">
               {["Home", "Explore", "Upload", "Search", "Login"].map((item) => (
                  <a
                     key={item}
                     href={`#${item.toLowerCase()}`}
                     className="block text-yellow-400 hover:text-yellow-300 transition"
                  >
                     {item}
                  </a>
               ))}
            </div>
         )}
      </nav>
   );
};

export default Navbar;
