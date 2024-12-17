import SideBar from "@/components/shared/SideBar";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className='root'>
        <SideBar/>
        <div className='root-container'>
          <div className='wrapper'>
            {children}
          </div>
        </div>
      </main>
  );
}




