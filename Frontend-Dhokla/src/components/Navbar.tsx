import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import Cart from '@/assets/Cart.svg'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const toggleMenu = () => setIsOpen(!isOpen);

   // const authStatus = useSelector((state) => state.auth.status)
   const authStatus = true;
   const navigate = useNavigate()

   const navItems = [
      {
         name: 'Home',
         slug: '/',
         active: true
      },
      {
         name: 'Restaurants',
         slug: '/restaurants',
         active: authStatus
      },
      {
         name: 'Food',
         slug: '/food',
         active: authStatus
      },
      {
         name: 'Cart',
         slug: '/all-posts',
         active: authStatus
      },
   ]

   return (
      // <nav className="fixed top-0 left-0 w-full z-50 bg-[#111]/70 backdrop-blur-md text-yellow-400 shadow-lg">
      //    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      //       <div className="flex justify-between h-16 items-center">
      //          <div className="text-2xl font-bold tracking-wide">Dhokla</div>

      //          <div className="hidden md:flex space-x-8">
      //             {["Home", "Explore", "Upload", "Search", "Login"].map((item) => (
      //                <a
      //                   key={item}
      //                   href={`#${item.toLowerCase()}`}
      //                   className="hover:text-yellow-300 transition"
      //                >
      //                   {item}
      //                </a>
      //             ))}
      //          </div>

      //          {/* Mobile menu toggle */}
      //          <div className="md:hidden">
      //             <button onClick={toggleMenu} className="text-yellow-400 focus:outline-none">
      //                {isOpen ? <h3>X</h3> : <h3>Menu</h3>}
      //             </button>
      //          </div>
      //       </div>
      //    </div>

      //    {/* Mobile Menu */}
      //    {isOpen && (
      //       <div className="md:hidden px-4 pb-4 space-y-2 bg-[#111]/90">
      //          {["Home", "Explore", "Upload", "Search", "Login"].map((item) => (
      //             <a
      //                key={item}
      //                href={`#${item.toLowerCase()}`}
      //                className="block text-yellow-400 hover:text-yellow-300 transition"
      //             >
      //                {item}
      //             </a>
      //          ))}
      //       </div>
      //    )}
      // </nav>
      <div className="w-screen flex place-content-center">
      <div className="fixed w-5/6 z-50 m-2 p-2 bg-amber-300/40 justify-self-center-safe flex flex-row  rounded-md backdrop-blur-sm">
         <div className="basis-1/4 place-content-center text-left px-2 font-extrabold text-2xl hover:text-border">Dhokla</div> 
         <nav className="basis-1/2">
            <ul className='flex ml-auto place-content-center'>
                  {navItems.map((item)=> item.active ? 
                     (<li key={item.name}>
                        <Button variant={'link'}
                        onClick={() => navigate(item.slug)}
                        className='inline-block px-6 py-2 duration-200
                        hover:bg-blue-100 rounded-full'
                        >{item.name}</Button>
                     </li>) : null
                  )}
               </ul>
         </nav>
         {!authStatus && <div className="basis-1/4 flex flex-row-reverse">
            <Button>Login</Button>
            <Button>SignUp</Button>
         </div>}
         {authStatus && <div className="basis-1/4 flex flex-row-reverse">
            <Button>Log Out</Button>
         </div>}
      </div>
      </div>
   );
};

export default Navbar;
