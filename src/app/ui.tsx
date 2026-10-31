import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const S = ({ size = 18, children, ...p }: P) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    {children}
  </svg>
);

export const IHome = (p: P) => (
  <S {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-6h5v6" /></S>
);
export const IGrid = (p: P) => (
  <S {...p}><rect x="3.5" y="3.5" width="7" height="7" rx="1.2" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.2" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.2" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.2" /></S>
);
export const IUpload = (p: P) => (
  <S {...p}><path d="M5 4h14" /><path d="M12 8v9" /><path d="m8 12 4 4 4-4" /></S>
);
export const IGlobe = (p: P) => (
  <S {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></S>
);
export const IChat = (p: P) => (
  <S {...p}><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H9l-4.5 4z" /></S>
);
export const IBot = (p: P) => (
  <S {...p}><path d="M12 3v3" /><circle cx="12" cy="14" r="7" /><circle cx="9.4" cy="13.4" r="0.9" fill="currentColor" stroke="none" /><circle cx="14.6" cy="13.4" r="0.9" fill="currentColor" stroke="none" /></S>
);
export const IClock = (p: P) => (
  <S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></S>
);
export const IKey = (p: P) => (
  <S {...p}><circle cx="9" cy="14" r="4" /><path d="m12 11.5 8-8m-3 0 3 3m-5 0 3 3" /></S>
);
export const IGift = (p: P) => (
  <S {...p}><rect x="4" y="10" width="16" height="10" rx="1.5" /><path d="M4 10h16M12 10v10" /><path d="M12 10s-1.5-6-4.5-6A2.5 2.5 0 0 0 7.5 8.5H12zM12 10s1.5-6 4.5-6a2.5 2.5 0 0 1 0 4.5H12z" /></S>
);
export const IMenu = (p: P) => (
  <S {...p}><path d="M4 7h16M4 12h16M4 17h10" /></S>
);
export const IChevD = (p: P) => (
  <S {...p}><path d="m6 9 6 6 6-6" /></S>
);
export const IChevR = (p: P) => (
  <S {...p}><path d="m9 6 6 6-6 6" /></S>
);
export const IBack = (p: P) => (
  <S {...p}><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></S>
);
export const ISearch = (p: P) => (
  <S {...p}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></S>
);
export const IPlus = (p: P) => (
  <S {...p}><path d="M12 5v14M5 12h14" /></S>
);
export const IClip = (p: P) => (
  <S {...p}><path d="m12 14 4.8-4.8a3.4 3.4 0 0 0-4.8-4.8L6.4 10a5.3 5.3 0 0 0 7.5 7.5L19 12.4" /></S>
);
export const IMic = (p: P) => (
  <S {...p}><rect x="9.5" y="3.5" width="5" height="10" rx="2.5" /><path d="M6 11a6 6 0 0 0 12 0" /><path d="M12 17.5V21" /></S>
);
export const IArrowUp = (p: P) => (
  <S {...p}><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></S>
);
export const IArrowUpRight = (p: P) => (
  <S {...p}><path d="M7 17 17 7" /><path d="M9 7h8v8" /></S>
);
export const IStar = (p: P) => (
  <S {...p}><path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.9l-5.3 2.8 1.1-5.9L3.5 9.7l5.9-.8z" /></S>
);
export const IArchive = (p: P) => (
  <S {...p}><rect x="3.5" y="4" width="17" height="5" rx="1" /><path d="M5.5 9v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9M10 13h4" /></S>
);
export const IUsers = (p: P) => (
  <S {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19.5a5.7 5.7 0 0 1 11 0" /><path d="M16 8.4a3 3 0 0 1 0 5.6M15.3 19.5a5 5 0 0 1 5-4.6" /></S>
);
export const IBook = (p: P) => (
  <S {...p}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22.5z" /><path d="M8 7h8M8 11h6" /></S>
);
export const IChart = (p: P) => (
  <S {...p}><path d="M4 20V10M10 20V4M16 20v-8M21 20H3.5" /></S>
);
export const ICard = (p: P) => (
  <S {...p}><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="M3 10h18" /></S>
);
export const IList = (p: P) => (
  <S {...p}><path d="M8.5 6H21M8.5 12H21M8.5 18H21" /><circle cx="4.5" cy="6" r="1" fill="currentColor" stroke="none" /><circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="4.5" cy="18" r="1" fill="currentColor" stroke="none" /></S>
);
export const ISmiley = (p: P) => (
  <S {...p}><circle cx="12" cy="12" r="8.5" /><path d="M9 14.5a4.4 4.4 0 0 0 6 0" /><circle cx="9.3" cy="9.8" r="0.8" fill="currentColor" stroke="none" /><circle cx="14.7" cy="9.8" r="0.8" fill="currentColor" stroke="none" /></S>
);
export const ISpark = (p: P) => (
  <S {...p}><path d="M12 4v5M12 15v5M4 12h5M15 12h5" /><path d="m7 7 2.5 2.5M14.5 14.5 17 17M17 7l-2.5 2.5M9.5 14.5 7 17" /></S>
);
export const ISwap = (p: P) => (
  <S {...p}><path d="M7 4 3.5 8m0 0L7 12M3.5 8H17M17 20l3.5-4m0 0L17 12m3.5 4H7" /></S>
);
export const IHistory = (p: P) => (
  <S {...p}><path d="M4 5.5V10h4.5" /><path d="M4.8 10A8 8 0 1 1 4 13" /><path d="M12 8.5V12l2.6 1.8" /></S>
);
export const IMonitor = (p: P) => (
  <S {...p}><rect x="3" y="4.5" width="18" height="12.5" rx="1.8" /><path d="M9 21h6" /></S>
);
export const IPencil = (p: P) => (
  <S {...p}><path d="M4 20h4L19.5 8.5a2.2 2.2 0 0 0-3.1-3.1L5 16.9z" /><path d="m14.5 7.5 3 3" /></S>
);
export const IKbd = (p: P) => (
  <S {...p}><rect x="3" y="7" width="18" height="10" rx="1.5" /><path d="M7 10.5h.01M11 10.5h.01M15 10.5h.01M17.5 10.5h.01M7 14h10" /></S>
);
export const IShare = (p: P) => (
  <S {...p}><circle cx="18" cy="5.5" r="2.4" /><circle cx="6" cy="12" r="2.4" /><circle cx="18" cy="18.5" r="2.4" /><path d="m8.2 10.9 7.6-4.2M8.2 13.1l7.6 4.2" /></S>
);
export const IPalette = (p: P) => (
  <S {...p}><path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.8 1.8-1.7 0-1.2-.9-2-.9-3.1 0-1 .8-1.7 1.9-1.7h1.7a4 4 0 0 0 4-4c0-4-3.6-6.5-8.5-6.5z" /><circle cx="8" cy="10" r="0.9" fill="currentColor" stroke="none" /><circle cx="12" cy="7.5" r="0.9" fill="currentColor" stroke="none" /><circle cx="16" cy="10" r="0.9" fill="currentColor" stroke="none" /></S>
);
export const ISliders = (p: P) => (
  <S {...p}><path d="M5 21V13M5 9V3M12 21v-9M12 8V3M19 21v-5M19 12V3" /><path d="M2.5 13h5M9.5 8h5M16.5 16h5" /></S>
);
export const IX = (p: P) => (
  <S {...p}><path d="m6 6 12 12M18 6 6 18" /></S>
);
export const ICheck = (p: P) => (
  <S {...p}><path d="m4.5 12.5 5 5 10-11" /></S>
);
export const IUpdown = (p: P) => (
  <S {...p}><path d="m8 9-3 3-3-3M5 6v15" /><path d="m16 15 3-3 3 3M19 18V3" /></S>
);
export const IBolt = (p: P) => (
  <S {...p}><path d="M13 3 4.5 13.5H11L10 21l8.5-10.5H13z" /></S>
);
export const IQR = (p: P) => (
  <S {...p}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><path d="M14 14h3v3h-3zM19.5 14.5H21M14 20h2M19 19h2v2" /></S>
);
export const IThumbUp = (p: P) => (
  <S {...p}><path d="M7 11v9H4.8a.8.8 0 0 1-.8-.8V11.8a.8.8 0 0 1 .8-.8z" /><path d="M7 11.5 11.2 4a2.2 2.2 0 0 1 2.1 2.6l-.7 3.4h5.2A2 2 0 0 1 19.8 12.4l-1.1 5.6a2.4 2.4 0 0 1-2.4 2H7" /></S>
);
export const ICopy = (p: P) => (
  <S {...p}><rect x="9" y="9" width="11" height="11" rx="1.8" /><path d="M5.5 14.5h-.7A1.8 1.8 0 0 1 3 12.7V4.8A1.8 1.8 0 0 1 4.8 3h7.9a1.8 1.8 0 0 1 1.8 1.8v.7" /></S>
);
export const ICheckSquare = (p: P) => (
  <S {...p}><rect x="4" y="4" width="16" height="16" rx="2.5" /><path d="m8.5 12 2.4 2.4L16 9.2" /></S>
);
export const ISettings = (p: P) => (
  <S {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0a1.7 1.7 0 0 0 1 1.6a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.6a1.7 1.7 0 0 0-1.5 1z" /></S>
);

/* lateral panel icons */
export const IText = (p: P) => <IChat {...p} />;
export const ICClaude = (p: P) => (
  <S {...p}><path d="M12 4v16M4 12h16M6.6 6.6l10.8 10.8M17.4 6.6 6.6 17.4" strokeWidth="2" /></S>
);
export const ICOpenai = (p: P) => (
  <S {...p}><path d="M8.5 8.5 12 6.5a4.5 4.5 0 0 1 4.5 7.8L13 16.5a4.5 4.5 0 0 1-4.5-7.8z" /><path d="M10.5 4.2v4M13.5 15.8v4M4.2 10.5h4M15.8 13.5h4" /></S>
);
export const ICGrok = (p: P) => (
  <S {...p}><circle cx="12" cy="12" r="8.2" /><path d="m8 12 2.6-4.4L16 8.4 14 16z" fill="currentColor" stroke="none" /></S>
);
export const ICGrokBot = IStar;
export const ICCursor = (p: P) => (
  <S {...p}><path d="M12 3 20 8.4v7.2L12 21 4 15.6V8.4z" /><path d="M12 3v18" /></S>
);
export const ICVSCode = (p: P) => (
  <S {...p}><path d="M17 5.5 7 12l10 6.5V17l-8-5 8-5z" fill="currentColor" stroke="none" /><path d="M17 4l3.5 2v12L17 20M7 12 3.5 9.5V13z" /></S>
);
export const ICCLI = (p: P) => (
  <S {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><path d="m7 9.5 2.6 2.5L7 14.5M12.5 15h4.5" /></S>
);
export const ICMCP = (p: P) => (
  <S {...p}><path d="M7 17 3.5 13.5a2.6 2.6 0 0 1 0-3.7l4-4M17 7l3.5 3.5a2.6 2.6 0 0 1 0 3.7l-4 4M9 15l6-6" /></S>
);
/* domain panel */
export const IDSearch = ISearch;
export const IDMy = IGrid;
export const IDTransfer = IHistory;
export const IDOrders = ICard;
export const IDPay = (p: P) => <ICard {...p} />;
/* settings panel */
export const ISGeneral = ISettings;
export const ISBilling = ICard;
export const ISMembers = IUsers;
export const ISInstr = IBook;
export const ISUsage = IChart;
export const ISLogs = IList;
export const ISFiles = (p: P) => (
  <S {...p}><path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5z" /><path d="M14 3v4.5h4.5" /></S>
);
export const ISecrets = IKey;
export const IApi = (p: P) => (
  <S {...p}><path d="M9 6 3.5 12 9 18M15 6l5.5 6L15 18" /></S>
);
export const ISiteTools = (p: P) => (
  <S {...p}><circle cx="12" cy="13" r="4" /><path d="M12 9V5.5M9.5 15.5 7 18M14.5 15.5 17 18" /></S>
);
export const ICollab = (p: P) => (<S {...p}><circle cx="7" cy="9" r="2.6" /><circle cx="17" cy="9" r="2.6" /><path d="M2.5 19a4.6 4.6 0 0 1 9 0M12.5 19a4.6 4.6 0 0 1 9 0" /></S>);
export const IPublish = (p: P) => (<S {...p}><path d="m12 15 6-6H3.5L6 6.5h13.5L16.5 9" transform="translate(0 3) scale(0 0)" /><path d="M12 3v10M8 7l4-4 4 4" /><path d="M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17" /></S>);
export const IAnalytics = IChart;
export const IDatabase = (p: P) => (
  <S {...p}><ellipse cx="12" cy="6" rx="7.5" ry="2.8" /><path d="M4.5 6v12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6" /><path d="M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" /></S>
);
export const ICode = (p: P) => <IApi {...p} />;
export const ILeaf = (p: P) => (
  <S {...p}><path d="M5 20c0-9 5-15 15-16 .5 8-3 14-10 15" /><path d="M8 17c2-4 5-7 9-8.5" /></S>
);
export const ILeafSolid = (p: P) => (
  <S {...p} fill="currentColor"><path d="M5 20c0-9 5-15 15-16 .5 8-3 14-10 15z" stroke="none" /></S>
);

/* ---------- bool wordmark ---------- */
export function BoolMark({ scale = 1 }: { scale?: number }) {
  return (
    <span className="boolmark" style={{ transform: `scale(${scale})`, transformOrigin: "left center" }} aria-label="bool">
      <svg width="86" height="30" viewBox="0 0 86 30" fill="none">
        {/* sparkle */}
        <g strokeWidth="3" strokeLinecap="round">
          <path d="M9 4.5 7 1.5" stroke="#22c1a5" />
          <path d="M6 7 3 5" stroke="#2f6bff" />
          <path d="M10.5 2.7V0" stroke="#ff4d49" />
        </g>
        {/* b */}
        <path d="M11 6.5v17" stroke="#2f6bff" strokeWidth="7" strokeLinecap="round" />
        <circle cx="16.5" cy="20" r="6" fill="#2f6bff" />
        {/* o purple */}
        <circle cx="33" cy="18.5" r="7.6" stroke="#8b2fe0" strokeWidth="7" fill="none" />
        {/* o teal */}
        <circle cx="53" cy="18.5" r="7.6" stroke="#19b98f" strokeWidth="7" fill="none" />
        {/* l orange */}
        <rect x="66" y="1.5" width="7" height="26" rx="3.5" fill="#ff4d2e" />
      </svg>
    </span>
  );
}

/* small solid-blue circle avatar (robot-ish like the temp account) */
export function Avatar({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#3aa9f0" />
      <circle cx="8.6" cy="10" r="1.7" fill="#101014" />
      <circle cx="15.4" cy="10" r="1.7" fill="#101014" />
      <path d="M8.5 15a4.4 4.4 0 0 0 7 0" stroke="#101014" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M9 6.6h6" stroke="#101014" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* ... additional app icons ... */
export const ILink = (p: P) => (
  <S {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></S>
);
export const IUser = (p: P) => (
  <S {...p}><circle cx="12" cy="8" r="3.6" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></S>
);
export const IUserPlus = (p: P) => (
  <S {...p}><circle cx="9.5" cy="8" r="3.4" /><path d="M3 20a6.2 6.2 0 0 1 13 0" /><path d="M19 10.5v5" /><path d="M16.5 13h5" /></S>
);
export const ICog = (p: P) => (
  <S {...p}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></S>
);
export const ICrown = (p: P) => (
  <S {...p}><path d="m3 6 3.4 4L12 4l5.6 6L21 6l-2 11H5z" /><path d="M6 20.5h12" /></S>
);
export const IHelp = (p: P) => (
  <S {...p}><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /><path d="M9.3 9a2.8 2.8 0 1 1 3.9 2.6c-.8.4-1.2 1-1.2 1.9" /><path d="M12 17h.01" /></S>
);
export const IBug = (p: P) => (
  <S {...p}><path d="m8 2 1.9 1.9" /><path d="M14.1 3.9 16 2" /><path d="M9 7.1v-1a3 3 0 1 1 6 0v1" /><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z" /><path d="M12 20v-9" /><path d="M6.5 9C4.6 8.8 3 7.1 3 5" /><path d="M6 13H2" /><path d="M3 21c0-2.1 1.7-3.9 3.8-4" /><path d="M17.5 9c1.9-.2 3.5-1.9 3.5-4" /><path d="M22 13h-4" /><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" /></S>
);
export const ISignout = (p: P) => (
  <S {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></S>
);
export const INew = (p: P) => (
  <S {...p}><circle cx="12" cy="12" r="2.4" /><path d="M16.7 7.3a6.6 6.6 0 0 1 1.8 4.4" /><path d="M7.3 16.7a6.6 6.6 0 0 1-1.8-4.4" /><circle cx="18.8" cy="5.6" r="1.4" /><circle cx="5.2" cy="18.4" r="1.4" /></S>
);
