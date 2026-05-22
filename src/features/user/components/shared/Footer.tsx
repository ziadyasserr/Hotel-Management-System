import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8 mt-auto">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="text-3xl font-extrabold tracking-tighter text-gray-900 flex items-center gap-1 hover:opacity-80 transition">
                            <span className="text-[var(--color-adminMainColor)]">Stay</span>cation.
                        </Link>
                        <p className="text-gray-500 leading-relaxed">
                            We provide what you need to enjoy your holiday with family. Time to make another memorable moment.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-6">Explore</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-500 hover:text-[var(--color-adminMainColor)] transition">Home</Link></li>
                            <li><Link to="/explore" className="text-gray-500 hover:text-[var(--color-adminMainColor)] transition">Rooms</Link></li>
                            <li><Link to="/favorites" className="text-gray-500 hover:text-[var(--color-adminMainColor)] transition">Favorites</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-6">Support</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-500 hover:text-[var(--color-adminMainColor)] transition">FAQ</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-[var(--color-adminMainColor)] transition">Terms & Conditions</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-[var(--color-adminMainColor)] transition">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-6">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[var(--color-adminMainColor)] hover:text-white hover:border-transparent transition-all shadow-sm">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[var(--color-adminMainColor)] hover:text-white hover:border-transparent transition-all shadow-sm">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[var(--color-adminMainColor)] hover:text-white hover:border-transparent transition-all shadow-sm">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[var(--color-adminMainColor)] hover:text-white hover:border-transparent transition-all shadow-sm">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        &copy; {new Date().getFullYear()} Staycation. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
