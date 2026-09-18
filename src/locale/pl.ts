import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from '@/lib/site';

import type { Dictionary } from '@/locale/types';

import { experiences, projects, services } from './data/pl';

export const pl: Dictionary = {
  seoTitle:
    'SKOFTWARE | Maciej Skorus - Creative Fullstack Developer | Aplikacje, Usługi i 3D',
  seoSiteName: 'SKOFTWARE | Maciej Skorus - Creative Fullstack Developer',
  seoDescription:
    'Creative fullstack developer z Polski. Aplikacje webowe, usługi cyfrowe, doświadczenia 3D i aplikacje mobilne. React, Next.js, Python, TypeScript. Faktury VAT, współpraca na całym świecie.',

  notFoundTitle: 'Strona nie znaleziona',
  notFoundBack: 'Powrót na stronę główną',

  navHome: 'Strona główna',
  navPortfolio: 'Portfolio',
  navContact: 'Kontakt',
  toggleMenu: 'Przełącz menu',
  navMenuLabel: 'Nawigacja główna',

  heroEyebrow: 'SKOFTWARE',
  heroH1Line1: 'Pomysły na wejściu.',
  heroH1Line2: 'Software na wyjściu.',
  heroSubtitle:
    'Strony, aplikacje webowe i mobilne, integracje AI i 3D — dla firm, które potrzebują, żeby to po prostu działało. Od pomysłu, przez wdrożenie, po utrzymanie. Jeden wykonawca, faktura VAT.',
  heroCtaPrimary: 'Opisz projekt — wycena w 48 h',
  heroCtaSecondary: 'Zobacz, co buduję',
  heroTrust: ['Faktura VAT', 'Śląsk i zdalnie', 'Obsługa PL / EN'],
  heroErrorFallback: 'Nie udało się załadować sceny 3D.',
  // transitional: read by the old Hero until the new one lands, removed with it
  heroGreeting: 'Hej, jestem Maciej.',
  heroName: 'Skorus Maciej.',
  heroHeadline: 'Pomysły na wejściu. Software na wyjściu.',

  footerCopyright: '© {year} SKOFTWARE Maciej Skorus',
  footerResume: 'ŻYCIORYS',
  footerResumeOnline: 'CV ONLINE',
  footerResumeDownload: 'POBIERZ PDF',
  footerHeading: 'POROZMAWIAJMY.',
  footerNarrative:
    'Szukasz partnera, który przełoży złożone wymagania na eleganckie rozwiązania techniczne? Napisz, aby rozpocząć rozmowę o Twoim kolejnym projekcie.',
  footerDirectLabel: 'Kontakt bezpośredni',
  footerNetworkLabel: 'Sieć',
  footerInvoiceNote: 'Faktura VAT',

  navServices: 'Usługi',
  servicesSectionTitle: 'USŁUGI',
  servicesPricingNote: 'Wycena indywidualna',
  servicesCtaLabel: 'Opisz projekt',
  services,

  techStripLead:
    'Buduję w technologiach, które mają wsparcie i społeczność — nie w modzie sezonu.',

  whyMeSectionTitle: 'DLACZEGO JA',
  whyMeHeading: 'Jeden wykonawca. Od pomysłu po utrzymanie.',
  whyMeBody:
    'Bez pośredników i przekazywania projektu z rąk do rąk — rozmawiasz z osobą, która pisze kod. Kreatywny fullstack z praktyką w aplikacjach webowych i mobilnych, systemach wewnętrznych, 3D oraz integracji modeli AI.',
  whyMePoints: [
    'Rozmawiasz z osobą, która pisze kod',
    'Od pomysłu, przez wdrożenie, po utrzymanie',
    'Kod, który zespół może rozwijać dalej',
  ],

  processSectionTitle: 'JAK PRACUJĘ',
  processSteps: [
    {
      title: 'Rozmowa i brief',
      description:
        'Opowiadasz o projekcie i celu — ja zadaję pytania i wyłapuję ryzyka, zanim zaczniemy.',
    },
    {
      title: 'Wycena i plan',
      description:
        'Dostajesz jasny zakres, wycenę i termin — zanim zapadnie decyzja.',
    },
    {
      title: 'Budowa z podglądami',
      description:
        'Pracuję etapami i pokazuję postępy na bieżąco — widzisz, co powstaje, i reagujesz.',
    },
    {
      title: 'Wdrożenie i utrzymanie',
      description:
        'Publikacja, przekazanie i — jeśli chcesz — dalszy rozwój oraz wsparcie techniczne.',
    },
  ],

  faqSectionTitle: 'FAQ',
  faqItems: [
    {
      q: 'Ile kosztuje projekt?',
      a: 'Każdy projekt wyceniam indywidualnie — zależy od zakresu i złożoności. Opisz, co chcesz zrobić, a wrócę z konkretną wyceną i terminem.',
    },
    {
      q: 'Wystawiasz fakturę VAT?',
      a: 'Tak. Działam jako zarejestrowana firma (SKOFTWARE Maciej Skorus) i wystawiam faktury VAT.',
    },
    {
      q: 'Pracujesz zdalnie czy na miejscu?',
      a: 'Zdalnie z klientami z całego świata, a na Śląsku również na miejscu.',
    },
    {
      q: 'W jakich technologiach pracujesz?',
      a: 'React, Next.js, TypeScript, Python, Three.js, React Native i pokrewne. Stack dobieram do problemu, nie odwrotnie.',
    },
    {
      q: 'Zajmujesz się utrzymaniem po wdrożeniu?',
      a: 'Tak — rozwój funkcji, optymalizacja i bieżące wsparcie to osobna usługa (Utrzymanie i rozwój).',
    },
    {
      q: 'W jakim języku się komunikujemy?',
      a: 'Po polsku i po angielsku.',
    },
  ],

  experiences,

  portfolioTitle: 'PORTFOLIO',
  portfolioRepo: 'repozytorium',
  portfolioLiveDemo: 'demo',
  projects,

  contactPhone: CONTACT_PHONE_DISPLAY,
  contactEmail: CONTACT_EMAIL,
  contactCompanyInfo: 'Creative Fullstack Developer - Dostępny na projekty',
  contactLocation: 'Śląsk, Polska',
  contactInvoiceInfo: 'Cały świat',

  resumeHeaderAbout: 'O MNIE',
  resumeHeaderContact: 'KONTAKT',
  resumeHeaderLanguagesTitle: 'JĘZYKI',
  resumeLanguageEnglish: 'Angielski - C1',
  resumeLanguageRussian: 'Rosyjski - A2',
  resumeLanguagePolish: 'Polski - ojczysty',
  resumeHeaderLinks: 'LINKI',
  resumeHeaderHobbies: 'ZAINTERESOWANIA',
  resumeHeaderExperience: 'DOŚWIADCZENIE',
  resumeHeaderEducation: 'EDUKACJA',
  resumeHeaderSelectedProjects: 'WYBRANE PROJEKTY',
  resumeHeaderSkills: 'UMIEJĘTNOŚCI I NARZĘDZIA',
  resumeHeaderDownload: 'POBIERZ',
  resumeAboutMe:
    "Kreatywny fullstack developer z praktycznym doświadczeniem w aplikacjach webowych i mobilnych, systemach wewnętrznych i 3D. Doświadczony w branży medycznej - od organizacji krajowych i międzynarodowych kongresów i konferencji po tworzenie dedykowanego oprogramowania: pipeline'y do przetwarzania dokumentów, VOD, wirtualne stoiska, aplikacje mobilne, usprawnienia i aktualizacje instniejących systemów, zapewnianie wsparcia IT na miejscu i w delegacji. Zrealizowałem system aukcji NFT i dApp powiązany z grą 3D MOBA na Unity. Od VanillaJS przez frameworki frontendowe i backendowe, bazy relacyjne i nierelacyjne po Dockera - poruszam się swobodnie po całym stacku, integruje modele AI/LLM. Prywatnie pasjonat eksperymentów, moddingu oraz tworzenia użytecznych i niebanalnych rozwiązań.",
  resumeEducation: {
    university: 'Uniwersytet Śląski - WNST',
    field: 'Programowanie Aplikacji Webowych',
    degree: 'Inżynierskie',
    dates: 'Październik 2017 - Czerwiec 2021',
  },
  resumePageTitle:
    'SKOFTWARE - Maciej Skorus - CV - Creative Fullstack Engineer',
  resumeAltPhoto: 'Maciej Skorus, Fullstack Engineer',
  resumeHobbies: [
    'gitara basowa',
    'motoryzacja',
    'muzyka',
    'podróże',
    'technologia',
    'języki obce',
  ],
  resumeRodo:
    'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji (zgodnie z ustawą z dnia 10 maja 2018 roku o ochronie danych osobowych (Dz. Ustaw z 2018, poz. 1000) oraz zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).',
  resumeRepo: 'repozytorium',
  resumeDemo: 'wersja demonstracyjna',

  cookieTitle: 'Dbam o Twoją prywatność',
  cookieDescription:
    'Ta strona używa plików cookie do analizy ruchu i poprawy doświadczeń użytkownika. Możesz wybrać, które kategorie chcesz zaakceptować.',
  cookieAcceptAll: 'Akceptuj wszystkie',
  cookieRejectAll: 'Odrzuć wszystkie',
  cookieSavePreferences: 'Zapisz preferencje',
  cookieSettings: 'Ustawienia',
  cookieNecessaryTitle: 'Niezbędne',
  cookieNecessaryDescription:
    'Niezbędne do prawidłowego działania strony. Nie można ich wyłączyć.',
  cookieAnalyticsTitle: 'Analityczne',
  cookieAnalyticsDescription:
    'Pomagają zrozumieć, jak odwiedzający korzystają ze strony. Wszystkie dane są anonimizowane.',

  cookiePolicyTitle: 'Polityka Cookies',
  cookiePolicyIntro:
    'Niniejsza Polityka Cookies wyjaśnia, w jaki sposób SKOFTWARE Maciej Skorus („my", „nas", „nasz") wykorzystuje pliki cookie i podobne technologie na stronie {domain} („Strona"). Polityka ta jest zgodna z Ogólnym Rozporządzeniem o Ochronie Danych (RODO, Rozporządzenie 2016/679), Dyrektywą ePrivacy (2002/58/WE, z późniejszymi zmianami) oraz obowiązującymi przepisami krajowymi.',
  cookiePolicyWhatAreCookiesTitle: '1. Czym są pliki cookie?',
  cookiePolicyWhatAreCookies:
    'Pliki cookie to małe pliki tekstowe, które są umieszczane na Twoim urządzeniu podczas odwiedzania strony internetowej. Są szeroko stosowane, aby zapewnić prawidłowe działanie stron, dostarczać informacje właścicielom witryn i poprawiać doświadczenia użytkownika. Podobne technologie obejmują localStorage (przechowywanie danych lokalnie w przeglądarce bez daty wygaśnięcia) oraz skrypty analityczne zbierające zanonimizowane dane o użytkowaniu.',
  cookiePolicyControllerTitle: '2. Administrator Danych',
  cookiePolicyController:
    'Administratorem danych osobowych przetwarzanych za pośrednictwem niniejszej Strony jest: SKOFTWARE Maciej Skorus, Śląsk, Polska, NIP: {vatId}. W przypadku pytań dotyczących niniejszej polityki lub Twoich danych, skontaktuj się: {email}.',
  cookiePolicyCookiesWeUseTitle:
    '3. Pliki cookie i technologie, których używamy',
  cookiePolicyCookiesWeUseIntro:
    'Poniżej znajduje się pełna lista plików cookie i podobnych technologii używanych na tej Stronie, uporządkowana według kategorii:',
  cookiePolicyTableName: 'Nazwa',
  cookiePolicyTableProvider: 'Dostawca',
  cookiePolicyTablePurpose: 'Cel',
  cookiePolicyTableCategory: 'Kategoria',
  cookiePolicyTableType: 'Typ',
  cookiePolicyTableDuration: 'Czas trwania',
  cookieTypeHttp: 'Plik cookie HTTP',
  cookieTypeScript: 'Skrypt bez cookies',
  cookieDurationSession: 'Sesja',
  cookieDurationDays: '{days} dni',
  cookiePolicyCookieCC: 'cookie_consent',
  cookiePolicyCookieCCPurpose:
    'Przechowuje Twoje preferencje dotyczące zgody na pliki cookie (które kategorie zaakceptowałeś lub odrzuciłeś).',
  cookiePolicyCookieVercelAnalytics: 'Vercel Web Analytics',
  cookiePolicyCookieVercelAnalyticsPurpose:
    'Zbiera zanonimizowane, zagregowane dane o wyświetleniach stron i odwiedzających. Bez plików cookie — wykorzystuje codziennie rotowany zanonimizowany hash zamiast trwałych identyfikatorów. Nie przechowuje danych osobowych.',
  cookiePolicyCookieVercelSpeed: 'Vercel Speed Insights',
  cookiePolicyCookieVercelSpeedPurpose:
    'Mierzy metryki wydajności Core Web Vitals (LCP, FID, CLS). Bez plików cookie — zbiera wyłącznie techniczne dane o wydajności bez identyfikacji użytkownika.',
  cookiePolicyLegalBasisTitle: '4. Podstawa prawna przetwarzania',
  cookiePolicyLegalBasis:
    'Ściśle niezbędne pliki cookie (przechowywanie zgody) są ustawiane na podstawie naszego prawnie uzasadnionego interesu w zapewnieniu funkcjonalnej strony internetowej (art. 6 ust. 1 lit. f RODO) i są zwolnione z wymogu zgody na mocy art. 5 ust. 3 Dyrektywy ePrivacy. Technologie analityczne są aktywowane wyłącznie po udzieleniu przez Ciebie wyraźnej zgody (art. 6 ust. 1 lit. a RODO, art. 5 ust. 3 Dyrektywy ePrivacy). Zgodę możesz wycofać w dowolnym momencie. Wycofanie zgody nie wpływa na zgodność z prawem przetwarzania dokonanego przed jej wycofaniem.',
  cookiePolicyManageTitle: '5. Jak zarządzać zgodą',
  cookiePolicyManage:
    'Możesz zmienić lub wycofać swoje preferencje dotyczące plików cookie w dowolnym momencie, klikając poniższy przycisk. Spowoduje to ponowne otwarcie panelu preferencji cookie, w którym możesz włączać lub wyłączać poszczególne kategorie.',
  cookiePolicyManageBrowser:
    'Możesz również zarządzać plikami cookie za pomocą ustawień przeglądarki. Większość przeglądarek pozwala na blokowanie lub usuwanie plików cookie. Pamiętaj, że blokowanie ściśle niezbędnych plików cookie może ograniczyć funkcjonalność Strony. Instrukcje znajdziesz w dokumentacji pomocy swojej przeglądarki.',
  cookiePolicyResetButton: 'Otwórz preferencje cookies',
  cookiePolicyThirdPartyTitle: '6. Usługi podmiotów trzecich',
  cookiePolicyThirdParty:
    'Gdy wyrażasz zgodę na kategorię Analityczne, zanonimizowane dane są przetwarzane przez Vercel Inc. (San Francisco, USA) za pośrednictwem usług Web Analytics i Speed Insights. Vercel działa jako podmiot przetwarzający w naszym imieniu. Szczegółowe informacje o tym, jak Vercel przetwarza dane, znajdziesz w: Polityce Prywatności Vercel (vercel.com/legal/privacy-policy). Na tej Stronie nie są używane żadne inne pliki cookie ani technologie śledzenia podmiotów trzecich. Wszystkie czcionki są hostowane lokalnie — żadne żądania nie są wysyłane do zewnętrznych serwisów czcionek.',
  cookiePolicyRightsTitle: '7. Twoje prawa wynikające z RODO',
  cookiePolicyRightsIntro:
    'Na mocy RODO przysługują Ci następujące prawa dotyczące Twoich danych osobowych:',
  cookiePolicyRightAccess:
    'Prawo dostępu — uzyskanie kopii swoich danych (art. 15)',
  cookiePolicyRightRectification:
    'Prawo do sprostowania — poprawienie nieprawidłowych danych (art. 16)',
  cookiePolicyRightErasure:
    'Prawo do usunięcia — żądanie usunięcia danych (art. 17)',
  cookiePolicyRightRestriction:
    'Prawo do ograniczenia przetwarzania — ograniczenie sposobu wykorzystania danych (art. 18)',
  cookiePolicyRightPortability:
    'Prawo do przenoszenia danych — otrzymanie danych w ustrukturyzowanym formacie (art. 20)',
  cookiePolicyRightObject:
    'Prawo do sprzeciwu — sprzeciw wobec przetwarzania opartego na prawnie uzasadnionym interesie (art. 21)',
  cookiePolicyRightWithdraw:
    'Prawo do wycofania zgody w dowolnym momencie, bez wpływu na zgodność z prawem wcześniejszego przetwarzania (art. 7 ust. 3)',
  cookiePolicyRightComplaint:
    'Prawo do wniesienia skargi do organu nadzorczego (art. 77). W Polsce organem nadzorczym jest: Prezes Urzędu Ochrony Danych Osobowych (UODO), ul. Stawki 2, 00-193 Warszawa, uodo.gov.pl.',
  cookiePolicyRightsOutro:
    'Aby skorzystać z któregokolwiek z tych praw, skontaktuj się z nami: {email}.',
  cookiePolicyTransfersTitle: '8. Międzynarodowe transfery danych',
  cookiePolicyTransfers:
    'Jeśli wyrażasz zgodę na analitykę, zanonimizowane dane mogą być przekazywane do Vercel Inc. w Stanach Zjednoczonych. Vercel uczestniczy w ramach EU-U.S. Data Privacy Framework, zapewniając odpowiednie zabezpieczenia dla transferów danych poza EOG zgodnie z art. 45 RODO.',
  cookiePolicyChangesTitle: '9. Zmiany w niniejszej polityce',
  cookiePolicyChanges:
    'Niniejsza Polityka Cookies może być okresowo aktualizowana w celu odzwierciedlenia zmian w stosowanych przez nas technologiach lub obowiązujących przepisach. Wszelkie aktualizacje zostaną opublikowane na tej stronie ze zaktualizowaną datą „Ostatnia aktualizacja". Zachęcamy do okresowego przeglądania tej polityki.',
  cookiePolicyLastUpdated: 'Ostatnia aktualizacja: 28 lipca 2026',
  cookiePolicyBackHome: 'Powrót na stronę główną',

  opensInNewTab: '(otwiera się w nowej karcie)',
  screenshotOf: 'Zrzut ekranu: {title}',
  screenshotAltView: 'Zrzut ekranu: {title} — widok alternatywny',
  scrollToTop: 'Przewiń na górę',
  scrollToServices: 'Przejdź do sekcji usług',
  backToHome: 'SKOFTWARE — wróć na stronę główną',
  switchLanguage: 'Przełącz na angielski',
  techStripLabel: 'Technologie',
  portfolioLabel: 'Projekty w portfolio',
};
