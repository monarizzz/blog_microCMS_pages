import "./_styles/globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="jp">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
