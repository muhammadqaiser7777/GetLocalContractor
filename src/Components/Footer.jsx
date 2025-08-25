import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Logo */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <img
              className="h-14 lg:h-16"
              src="/assets/images/Logo.png"
              alt="Local Contractors Logo"
            />
          </Link>
          <p className="text-sm">
            Your trusted platform for connecting with professional contractors
            near you.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h6 className="text-lg font-semibold mb-2">Company</h6>
          <ul className="space-y-1">
            <li>
              <Link to="/About" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/Contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h6 className="text-lg font-semibold mb-2">Legal</h6>
          <ul className="space-y-1">
            <li>
              <Link to="/UserTerms" className="hover:underline">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/PrivacyPolicy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/CaliforniaPolicy" className="hover:underline">
                California Privacy Notice
              </Link>
            </li>
          </ul>
        </div>

        {/* Optional: Contact Info or Newsletter */}
        <div>
          <h6 className="text-lg font-semibold mb-2">Stay Connected</h6>
          <p className="text-sm mb-2">info@getlocalcontractors.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary mt-10 p-4 text-center text-sm bg-primary text-secondary">
        <p>
          © {new Date().getFullYear()} GetLocalContractors Pvt Ltd. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
