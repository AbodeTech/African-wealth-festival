import Link from "next/link";
import Image from "next/image";
import LandingOpenRegister from "../lanndingpage/openRegister";

export default function Navbar() {
  return (
    <nav className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Company Logo */}
          <Link href={"/"}>
            <div className="flex-shrink-0 relative">
              <Image
                src={"/Logo/abodeLogo.svg"}
                alt="abode"
                width={117}
                height={28}
                priority
              />
            </div>
          </Link>

          {/* Get Ticket Button */}
          <div className="flex items-center">
            <LandingOpenRegister
              label=" Get Ticket"
              className="px-6 py-2 rounded-lg font-medium text-base"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
