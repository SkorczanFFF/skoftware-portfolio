import { SITE_URL } from '@/lib/site';

import type { ProjectEntry } from '@/locale/types';

export const projects: ProjectEntry[] = [
  {
    id: 0,
    pic: '/projects/polonez_autodrive.jpg',
    pic2: '/projects/polonez_autodrive2.jpg',
    title: 'POLONEZ AUTODRIVE',
    technos: 'JavaScript • Three.js • 3D Studio Max',
    description:
      'Animacja 3D w stylu lat 80/synthwave w formie kolorowanki z personalizacją kolorów i modeli na scenie w czasie rzeczywistym przez wbudowane GUI. Modele sceny zostały stworzone w 3D Studio Max. Zawiera zręcznościową mini-grę.',
    live: 'https://polonez-autodrive.skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/Polonez-Autodrive',
    inResume: true,
  },
  {
    id: 1,
    pic: '/projects/VAT-OFF.jpg',
    title: 'VAT-OFF',
    technos: 'JavaScript • Chrome Extension API • CSS',
    description:
      'Ceny bez VAT widoczne po najechaniu na nie na dowolnej stronie. Automatycznie wykrywa ceny i wyświetla kwotę netto w dymku. Obsługuje ponad 120 krajów z wstępnie skonfigurowanymi walutami i stawkami VAT, umożliwia ustawienie własnej stawki i waluty. Zawiera wbudowany kalkulator VAT (brutto/netto). Dostępne w Chrome Web Store.',
    live: 'https://chromewebstore.google.com/detail/vat-off/lplomppbbkgehcldiilhckbdalnblhdl',
    git: 'https://github.com/SkorczanFFF/VAT-OFF',
    liveLabel: 'Chrome Web Store',
    inResume: true,
  },
  {
    id: 2,
    pic: '/projects/pokedex.jpg',
    pic2: '/projects/pokedex2.jpg',
    title: 'Pokédex',
    technos: 'React • TypeScript • Vite • TailwindCSS • TanStack Query • i18next • PokéAPI',
    description:
      'Pokédex oparty na PokéAPI — z trybem retro, listą ruchów, łańcuchami ewolucji i podglądem sprite\'ów z każdej wersji gry w widoku danego Pokémona. Interfejs po polsku i angielsku. Zaczęło się jako zadanie rekrutacyjne, dalej rozwijane hobbystycznie.',
    live: 'https://www.pokedex.skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/pokedex',
  },
  {
    id: 3,
    pic: '/projects/skoftware.jpg',
    pic2: '/projects/skoftware2.jpg',
    title: 'SKOFTWARE - moje portfolio',
    technos: 'Next.js • TypeScript • TailwindCSS • React Three Fiber/Three.js • GSAP • i18n',
    description:
      'Moja strona portfolio — poligon do eksperymentów webowych. Zawiera scenę 3D stworzoną w React Three Fiber, przejścia i animacje w GSAP oraz i18n do obsługi wielojęzyczności. Dodatkowo zawiera wbudowaną webową wersję CV w języku polskim i angielskim. Projekt nieustannie ewoluujący, prawdopodobnie nigdy nie wyjdzie z fazy "WIP".',
    live: SITE_URL,
    git: 'https://github.com/SkorczanFFF/mskorus-remaster',
    inResume: true,
  },
  {
    id: 4,
    pic: '/projects/YAWA.jpg',
    pic2: '/projects/YAWA2.jpg',
    title: 'Yet Another Weather App [WIP]',
    technos: 'React • JavaScript • Sass • Vanta.js • Open-Meteo API',
    description:
      'Aplikacji pogodowych jest jak gwiazd na niebie, ale ta jest inna. Tło sceny to symulacja pogody w czasie rzeczywistym oparta na danych z Open-Meteo, wyświetlana dla wybranego miasta przez mapę, geolokalizację lub wpisaną nazwę. Aktualnie w gruntownej przebudowie, jednak można śmiało sprawdzać pogodę.',
    live: 'https://yet-another-weather-app.skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/YetAnotherWeatherApp/',
    inResume: true,
  },
  {
    id: 5,
    pic: '/projects/tba.jpg',
    title: '★ Tibia Key Presser',
    technos: 'Python • Tkinter • pywinauto',
    description:
      'Lekkie narzędzie automatyzacji w Pythonie do gry Tibia (MMORPG), obsługujące do ośmiu konfigurowalnych par klawisz-opóźnienie. Automatycznie wykrywa okno gry, działa w tle bez przerywania innych aktywności i gier.',
    live: '',
    git: 'https://github.com/SkorczanFFF/tibia-key-presser',
    inResume: true,
    resumeOnly: true,
  },
];
