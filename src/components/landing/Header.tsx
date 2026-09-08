import Button from "../ui/Button";

export default function Header() {
  return (
    <nav className="h-20 bg-white shadow">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-primary">
            🤝️Partner<span className="text-black">In</span>
          </h1>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="#"
            className="font-medium text-text-secondary transition-colors duration-200 hover:text-brand-primary"
          >
            Beranda
          </a>

          <a
            href="#"
            className="font-medium text-text-secondary transition-colors duration-200 hover:text-brand-primary"
          >
            Cara Kerja
          </a>

          <a
            href="#"
            className="font-medium text-text-secondary transition-colors duration-200 hover:text-brand-primary"
          >
            Tentang Kami
          </a>
        </div>

        <div className="flex gap-4">
          <Button variant="outline">Login</Button>
          <Button variant="solid">Register</Button>
        </div>
      </div>
    </nav>
  );
}
