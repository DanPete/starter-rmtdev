type HeaderProps = {
  children: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return <header className="header">{children}</header>;
}

type HeaderTopProps = {
  children: React.ReactNode;
};

export function HeaderTop({ children }: HeaderTopProps) {
  return <div className="header__top">{children}</div>;
}
