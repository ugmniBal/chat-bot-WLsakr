export const metadata = {
  title: 'REVO 챗봇',
  description: '환경을 위한 AI 챗봇',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: 'sans-serif' }}>{children}</body>
    </html>
  );
}
