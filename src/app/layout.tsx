import { fontVariables } from "./_styles/fonts";
import "./_styles/globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
