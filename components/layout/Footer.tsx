import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';

import Img1 from '../../public/img/img-1.png'; // Leaf top-left
import Img2 from '../../public/img/img-2.png'; // Leaf top-right
import Img3 from '../../public/img/img-3.png'; // Leaf mid-right
import Img5 from '../../public/img/img-1.png'; // Lime
import Img7 from '../../public/img/img-2.png'; // Pear
import logo from '../../public/img/logo.png'

export default function Footer() {
  return (
    <footer className="relative bg-[#F8F7F2] border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">
              {/* <span className="text-[#a8822d]">La </span>
              <span className="text-[#8BC34A]">Athulyam</span> */}
              <Image src={logo} height={150} width={150} alt='la athulyam logo' />
            </h3>
            <p className="text-muted-foreground">
              Founded with a vision for women’s wellness and hygiene, Pengalulagam is one of Trichy and Thiruvallur’s most trusted enterprises specializing in eco-friendly and chemical-free sanitary napkins. 
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/Pengalulagam1/" target='_blank' className="hover:text-[#a8822d]">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/femi9_tiruvannamalai/" target='_blank' className="hover:text-[#a8822d]">
                <Instagram className="h-5 w-5" />
              </Link>
              {/* <Link href="#" className="hover:text-[#a8822d]">
                <Twitter className="h-5 w-5" />
              </Link> */}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-muted-foreground hover:text-[#a8822d]">All Products</Link></li>
              <li><Link href="/categories" className="text-muted-foreground hover:text-[#a8822d]">Categories</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-[#a8822d]">Our Story</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-[#a8822d]">Blog</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-[#a8822d]">Contact Us</Link></li>
            </ul>
          </div>

          {/* <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2">

            </ul>
          </div> */}

          <div>
            <h4 className="font-semibold mb-4">Policy Pages</h4>
            <ul className="space-y-2">
              <li><Link href="/shipping-policy" className="text-muted-foreground hover:text-[#a8822d]">Shipping & Delivery</Link></li>
              <li><Link href="/cancellation-policy" className="text-muted-foreground hover:text-[#a8822d]">Cancellation & Refund</Link></li>
              <li><Link href="/terms-conditions" className="text-muted-foreground hover:text-[#a8822d]">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-[#a8822d]">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center relative z-10">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}Pengal Ulagam. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/visa.svg" alt="Visa" className="h-6 w-auto opacity-70" />
            <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mastercard.svg" alt="Mastercard" className="h-6 w-auto opacity-70" />
            <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/paypal.svg" alt="PayPal" className="h-6 w-auto opacity-70" />
            <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/applepay.svg" alt="Apple Pay" className="h-6 w-auto opacity-70" />
          </div>
        </div>
      </div>

      {/* Static decorative images without animation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        {/* <div className="absolute top-20 left-4 w-20">
          <Image src={Img1} alt="Leaf 1" width={80} height={80} />
        </div> */}
        <div className="absolute top-0 right-6 w-24 animate-bounce">
          <Image src={Img2} alt="Leaf 2" width={90} height={90} />
        </div>
        <div className="absolute bottom-10 right-10 w-16 animate-bounce">
          <Image src={Img3} alt="Leaf 3" width={70} height={70} />
        </div>
        <div className="absolute bottom-5 left-10 w-24 animate-bounce">
          <Image src={Img5} alt="Lime" width={100} height={100} />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 animate-bounce">
          <Image src={Img7} alt="Pear" width={120} height={120} />
        </div>
      </div>
    </footer>
  );
}
