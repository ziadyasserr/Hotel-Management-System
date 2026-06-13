import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8 mt-auto">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <Link to="/" className="text-3xl font-extrabold tracking-tighter text-gray-900 flex items-center gap-1 hover:opacity-80 transition">
                            <span className="text-[var(--color-adminMainColor)]">Stay</span>cation.
                        </Link>
                        <p className="text-gray-500 leading-relaxed">{t('footer_tagline')}</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-6">{t('footer_explore')}</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-500 hover:text-[var(--color-adminMainColor)] transition">{t('nav_home')}</Link></li>
                            <li><Link to="/explore" className="text-gray-500 hover:text-[var(--color-adminMainColor)] transition">{t('rooms')}</Link></li>
                            <li><Link to="/favorites" className="text-gray-500 hover:text-[var(--color-adminMainColor)] transition">{t('nav_favorites')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-6">{t('footer_support')}</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-500 hover:text-[var(--color-adminMainColor)] transition">{t('footer_faq')}</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-[var(--color-adminMainColor)] transition">{t('footer_terms')}</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-[var(--color-adminMainColor)] transition">{t('footer_privacy')}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-6">{t('footer_connect')}</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[var(--color-adminMainColor)] hover:text-white hover:border-transparent transition-all shadow-sm"><FaFacebookF /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[var(--color-adminMainColor)] hover:text-white hover:border-transparent transition-all shadow-sm"><FaTwitter /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[var(--color-adminMainColor)] hover:text-white hover:border-transparent transition-all shadow-sm"><FaInstagram /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[var(--color-adminMainColor)] hover:text-white hover:border-transparent transition-all shadow-sm"><FaLinkedinIn /></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-start">
                        &copy; {new Date().getFullYear()} Staycation. {t('footer_rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
