import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary-100 py-6 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/holidaze-high-resolution-logo-white-transparent-ilP3KFhACeDllAhbusiAg6KS9EHSrF.png"
            alt="Holidaze Logo"
            className="h-12"
          />
        </div>
        <div className="mt-4 text-center">
          <p>&copy; 2024 Holidaze. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
