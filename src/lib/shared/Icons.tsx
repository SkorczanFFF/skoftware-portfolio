import React from 'react';
import {
  AiFillCar,
  AiFillCompass,
  AiFillFilePdf,
  AiFillMail,
  AiOutlineGlobal,
} from 'react-icons/ai';
import { BiLogoJava } from 'react-icons/bi';
import {
  BsClaude,
  BsCursor,
  BsCursorFill,
  BsGithub,
  BsGlobe2,
  BsLinkedin,
} from 'react-icons/bs';
import { DiMongodb, DiPhotoshop, DiPhp } from 'react-icons/di';
import { FaGitAlt } from 'react-icons/fa6';
import { GiGuitarBassHead } from 'react-icons/gi';
import { GrMysql } from 'react-icons/gr';
import { HiChip, HiMusicNote } from 'react-icons/hi';
import {
  HiCubeTransparent,
  HiDevicePhoneMobile,
  HiMiniLanguage,
  HiSparkles,
  HiWrenchScrewdriver,
} from 'react-icons/hi2';
import {
  IoCallSharp,
  IoLogoCss3,
  IoLogoDocker,
  IoLogoHtml5,
  IoLogoReact,
  IoLogoWordpress,
} from 'react-icons/io5';
import { LiaCookieBiteSolid } from 'react-icons/lia';
import {
  SiAutodesk,
  SiBitbucket,
  SiBlender,
  SiCanva,
  SiFigma,
  SiFirebase,
  SiGitlab,
  SiGreensock,
  SiJavascript,
  SiLaravel,
  SiMobx,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedux,
  SiSanity,
  SiSass,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

export const GithubIcon = BsGithub as IconType;
export const LinkedinIcon = BsLinkedin as IconType;
export const GlobalIcon = AiOutlineGlobal as IconType;
export const GlobeIcon = BsGlobe2 as IconType;
export const MailIcon = AiFillMail as IconType;
export const CallIcon = IoCallSharp as IconType;
export const PdfIcon = AiFillFilePdf as IconType;

export const JavaIcon = BiLogoJava as IconType;
export const PhpIcon = DiPhp as IconType;
export const TypescriptIcon = SiTypescript as IconType;
export const PythonIcon = SiPython as IconType;
export const JavascriptIcon = SiJavascript as IconType;

export const ReactIcon = IoLogoReact as IconType;
export const ReactNativeIcon = SiReact as IconType;
export const NextjsIcon = SiNextdotjs as IconType;
export const ReduxIcon = SiRedux as IconType;
export const LaravelIcon = SiLaravel as IconType;
export const NodejsIcon = SiNodedotjs as IconType;
export const ThreejsIcon = SiThreedotjs as IconType;

export const HtmlIcon = IoLogoHtml5 as IconType;
export const CssIcon = IoLogoCss3 as IconType;
export const TailwindIcon = SiTailwindcss as IconType;
export const SassIcon = SiSass as IconType;
export const GsapIcon = SiGreensock as IconType;

export const MysqlIcon = GrMysql as IconType;
export const MongodbIcon = DiMongodb as IconType;
export const FirebaseIcon = SiFirebase as IconType;
export const PostgresqlIcon = SiPostgresql as IconType;

export const WordpressIcon = IoLogoWordpress as IconType;
export const SanityIcon = SiSanity as IconType;

export const PhotoshopIcon = DiPhotoshop as IconType;
export const AutodeskIcon = SiAutodesk as IconType;
export const BlenderIcon = SiBlender as IconType;
export const CanvaIcon = SiCanva as IconType;
export const FigmaIcon = SiFigma as IconType;

export const CursorIcon = BsCursorFill as IconType;
export const CursorOverlayIcon = BsCursor as IconType;
export const GitlabIcon = SiGitlab as IconType;
export const BitbucketIcon = SiBitbucket as IconType;
export const NpmIcon = SiNpm as IconType;
export const ClaudeIcon = BsClaude as IconType;
export const VercelIcon = SiVercel as IconType;
export const DockerIcon = IoLogoDocker as IconType;
export const MobxIcon = SiMobx as IconType;

export const CarIcon = AiFillCar as IconType;
export const CompassIcon = AiFillCompass as IconType;
export const GuitarIcon = GiGuitarBassHead as IconType;
export const ChipIcon = HiChip as IconType;
export const MusicIcon = HiMusicNote as IconType;
export const LanguageIcon = HiMiniLanguage as IconType;
export const CookieIcon = LiaCookieBiteSolid as IconType;
export const GitIcon = FaGitAlt as IconType;

export const SparklesIcon = HiSparkles as IconType;
export const CubeIcon = HiCubeTransparent as IconType;
export const PhoneIcon = HiDevicePhoneMobile as IconType;
export const WrenchIcon = HiWrenchScrewdriver as IconType;
