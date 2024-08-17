import ProtectedRoutes from "../components/auth/protected-routes";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoutes>
      <main>{children}</main>
    </ProtectedRoutes>
  );
}
