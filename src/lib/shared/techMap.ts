import {
  AutodeskIcon,
  BitbucketIcon,
  BlenderIcon,
  CanvaIcon,
  ClaudeIcon,
  CssIcon,
  CursorIcon,
  DockerIcon,
  FigmaIcon,
  FirebaseIcon,
  GitIcon,
  GitlabIcon,
  GsapIcon,
  HtmlIcon,
  JavaIcon,
  JavascriptIcon,
  LaravelIcon,
  MobxIcon,
  MongodbIcon,
  MysqlIcon,
  NextjsIcon,
  NodejsIcon,
  NpmIcon,
  PhotoshopIcon,
  PhpIcon,
  PostgresqlIcon,
  PythonIcon,
  ReactIcon,
  ReactNativeIcon,
  ReduxIcon,
  SanityIcon,
  SassIcon,
  TailwindIcon,
  ThreejsIcon,
  TypescriptIcon,
  WordpressIcon,
} from './Icons';

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

/** Canonical label → Icon component. Superset of all tech icons used across the app. */
export const techIconMap: Record<string, IconType> = {
  HTML5: HtmlIcon,
  CSS3: CssIcon,
  TypeScript: TypescriptIcon,
  React: ReactIcon,
  'Next.js': NextjsIcon,
  'React Native': ReactNativeIcon,
  Redux: ReduxIcon,
  'Three.js': ThreejsIcon,
  TailwindCSS: TailwindIcon,
  Sass: SassIcon,
  GSAP: GsapIcon,

  PHP: PhpIcon,
  'Node.js': NodejsIcon,
  Java: JavaIcon,
  Python: PythonIcon,
  Laravel: LaravelIcon,
  Wordpress: WordpressIcon,
  Sanity: SanityIcon,
  MySQL: MysqlIcon,
  Firebase: FirebaseIcon,
  MongoDB: MongodbIcon,
  PostgreSQL: PostgresqlIcon,
  Photoshop: PhotoshopIcon,
  '3Ds Max': AutodeskIcon,
  Blender: BlenderIcon,
  Figma: FigmaIcon,
  Canva: CanvaIcon,
  Docker: DockerIcon,
  GitHub: GitIcon,
  CursorAI: CursorIcon,
  Claude: ClaudeIcon,
  npm: NpmIcon,
  // Aliases — extra labels used in experience stack arrays
  'Vanilla JS': JavascriptIcon,
  Git: GitIcon,
  'Sanity CMS': SanityIcon,
  GitLab: GitlabIcon,
  Bitbucket: BitbucketIcon,
  MobX: MobxIcon,
};

/** Category grouping for the Skills section. Values are keys into techIconMap. */
export const techCategoryGroups: Record<string, string[]> = {
  frontend: [
    'HTML5',
    'CSS3',
    'TypeScript',
    'React',
    'Next.js',
    'React Native',
    'Redux',
    'Three.js',
    'TailwindCSS',
    'Sass',
    'GSAP',
  ],
  backend: [
    'Python',
    'PHP',
    'Node.js',
    'Laravel',
    'Wordpress',
    'Java',
    'Sanity',
  ],
  database: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase'],
  design: ['Photoshop', '3Ds Max', 'Blender', 'Figma', 'Canva'],
  tools: ['Docker', 'GitHub', 'CursorAI', 'Claude', 'npm'],
};

/** Flat ordered list for the resume skills section — manually sorted for symmetric 3-per-row wrapping. */
export const resumeTechList: string[] = [
  'TypeScript',
  'React',
  'Next.js', // frontend core
  'React Native',
  'Redux',
  'MobX', // frontend state
  'TailwindCSS',
  'Sass',
  'GSAP', // frontend styling
  'Three.js',
  'HTML5',
  'CSS3', // frontend web/3D
  'Python',
  'Node.js',
  'Java', // backend languages

  'PHP',
  'Laravel',
  'Wordpress', // backend frameworks
  'Sanity',
  'PostgreSQL',
  'MySQL', // CMS + databases
  'MongoDB',
  'Firebase',
  'Docker', // databases + devops
  'Photoshop',
  '3Ds Max',
  'Blender', // design 3D
  'Figma',
  'Canva',
  'GitHub', // design + VCS
  'npm',
  'CursorAI',
  'Claude', // tools + AI
];
