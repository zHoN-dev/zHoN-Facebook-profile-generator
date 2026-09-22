import "./globals.css";

export const metadata = {
  title: "Fictional Profile Generator",
  description: "Generate fictional test profiles for UI/testing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}