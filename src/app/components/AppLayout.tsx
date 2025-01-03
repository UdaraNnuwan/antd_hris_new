"use client"; 
import { usePathname } from 'next/navigation';
import MainLayout from './MainLayout';
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const router = usePathname();
  console.log('=========================+>>>>',router)
  if (router == "/login") {
    return <>{children}</>;
  }
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
};

export default AppLayout;
