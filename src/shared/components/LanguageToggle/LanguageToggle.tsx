import { useTranslation } from 'react-i18next';

interface LanguageToggleProps {
  variant?: 'pill' | 'icon';
}

function LanguageToggle({ variant = 'pill' }: LanguageToggleProps) {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const toggleLanguage = () => {
    i18n.changeLanguage(isArabic ? 'en' : 'ar');
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={toggleLanguage}
        title={t('switchLang')}
        className="
          flex items-center justify-center
          w-9 h-9 rounded-full
          border border-white/30
          text-white text-sm font-bold
          hover:bg-white/20
          transition-all duration-200
          cursor-pointer
          select-none
        "
      >
        {isArabic ? 'EN' : 'ع'}
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className="
        flex items-center gap-1.5
        px-4 py-2 rounded-full
        border border-gray-200
        text-sm font-semibold text-gray-700
        hover:border-[var(--color-adminMainColor)]
        hover:text-[var(--color-adminMainColor)]
        transition-all duration-200
        cursor-pointer
        select-none
        bg-white
        shadow-sm
      "
    >
      <span className="text-base leading-none">{isArabic ? '🇺🇸' : '🇸🇦'}</span>
      <span>{t('switchLang')}</span>
    </button>
  );
}

export default LanguageToggle;
