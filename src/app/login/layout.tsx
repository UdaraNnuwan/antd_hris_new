import React from 'react';
import 'antd/dist/reset.css';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
        <>
        <h1>Login</h1>
        <div>
        {children}
        </div>
     
        </>
  );
}
