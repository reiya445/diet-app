import React from 'react';

/**
 * 表示専用のSVGアイコン。絵文字の代わりに使う。
 * 線画・24グリッド・currentColor 追従で統一。
 */

const PATHS = {
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  penalty: (
    <>
      <path d="M12 3.5 2.8 19.5h18.4L12 3.5Z" />
      <path d="M12 9.6v4.2" />
      <path d="M12 16.9h.01" />
    </>
  ),
  reward: (
    <>
      <path d="M3.5 11.5h17V20a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-8.5Z" />
      <path d="M2.5 7.5h19v4h-19z" />
      <path d="M12 7.5V21" />
      <path d="M12 7.5S10.6 3 8.2 3a2.2 2.2 0 0 0 0 4.5H12Z" />
      <path d="M12 7.5S13.4 3 15.8 3a2.2 2.2 0 0 1 0 4.5H12Z" />
    </>
  ),
  camera: (
    <>
      <path d="M3 8.5h3.4l1.5-2.4h8.2l1.5 2.4H21v11H3v-11Z" />
      <circle cx="12" cy="13.6" r="3.6" />
    </>
  ),
  flame: (
    <>
      <path d="M12 2.7s5.6 4.3 5.6 9.4a5.6 5.6 0 1 1-11.2 0c0-2 .8-3.7 1.8-5 .2 1.3.9 2.3 1.9 2.6.7-2.9 1.9-5.3 1.9-7Z" />
    </>
  ),
  check: <path d="M4.5 12.6 9.4 17.5 19.5 7" />,
  cross: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9.5 7V4.6h5V7" />
      <path d="M6.2 7l.9 13h9.8l.9-13" />
    </>
  ),
  spark: (
    <>
      <path d="M12 2.8 13.9 9l6.2 1.9-6.2 1.9L12 19l-1.9-6.2L3.9 11 10.1 9 12 2.8Z" />
      <path d="M18.6 15.4l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.2" y="5" width="17.6" height="16" rx="2.2" />
      <path d="M3.2 10h17.6" />
      <path d="M8 3v4M16 3v4" />
    </>
  ),
  scale: (
    <>
      <rect x="3.2" y="3.4" width="17.6" height="17.2" rx="3" />
      <path d="M8.6 9.8 12 7.2l3.4 2.6" />
      <path d="M7.4 16.6h9.2" />
    </>
  ),
  note: (
    <>
      <path d="M5 3.5h9.5L19 8v12.5H5V3.5Z" />
      <path d="M14 3.5V8h5" />
      <path d="M8.4 12.5h7.2M8.4 16h4.8" />
    </>
  ),
};

function Icon({ name, size = 20, className = '', strokeWidth = 1.7 }) {
  const path = PATHS[name];
  if (!path) return null;

  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  );
}

export default Icon;
