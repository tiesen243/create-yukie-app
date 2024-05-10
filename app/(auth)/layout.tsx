const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid min-h-[60dvh] place-items-center *:w-screen *:max-w-screen-md *:space-y-4">
      {children}
    </div>
  )
}

export default AuthLayout
