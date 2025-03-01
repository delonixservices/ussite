 // For optimized image rendering
import Link from 'next/link'; // For Next.js Link component

const Footer = () => {
  return (
    <footer className="flex justify-between bg-[#1f2937] text-white p-5 text-center">
      <div className="flex-1">
        <div className="font-bold text-xl mb-3">Company</div>
        <ul className="space-y-2">
          <li><Link href="#">About Us</Link></li>
          <li><Link href="#">Careers</Link></li>
          <li><Link href="#">Our Team</Link></li>
          <li><Link href="#">Projects</Link></li>
          <li><Link href="#">Help Center</Link></li>
        </ul>
      </div>

      <div className="flex-1">
        <div className="font-bold text-xl mb-3">Social</div>
        <ul className="space-y-2">
          <li><Link href="#">Discord</Link></li>
          <li><Link href="#">Twitter</Link></li>
          <li><Link href="#">GitHub</Link></li>
          <li><Link href="#">Contact Us</Link></li>
        </ul>
      </div>

      <div className="flex-1">
        <div className="font-bold text-xl mb-3">Resources</div>
        <ul className="space-y-2">
          <li><Link href="#">Blog</Link></li>
          <li><Link href="#">Newsletter</Link></li>
          <li><Link href="#">Free Products</Link></li>
          <li><Link href="#">Affiliate Program</Link></li>
          <li><Link href="#">Products</Link></li>
        </ul>
      </div>

      <div className="flex-1">
        <div className="font-bold text-xl mb-3">Design</div>
        <ul className="space-y-2">
          <li><Link href="#">Templates</Link></li>
          <li><Link href="#">UI Kits</Link></li>
          <li><Link href="#">Icons</Link></li>
          <li><Link href="#">Mockups</Link></li>
        </ul>
        
      </div>
    </footer>
  );
};

export default Footer;
