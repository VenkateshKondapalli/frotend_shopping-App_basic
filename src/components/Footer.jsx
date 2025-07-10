const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white py-8 shadow-inner">
      <div className="text-center text-base font-medium tracking-wide">
        &copy; {new Date().getFullYear()} Venkatesh. All rights reserved.
      </div>
    </footer>
  );
};

export { Footer };
