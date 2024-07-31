import React from "react";
import { Links } from "../../config/siteconfig";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-muted py-12 md:py-16 mt-6">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-start gap-4">
          <h4 className="text-lg font-semibold text-foreground">About Us</h4>
          <p className="text-muted-foreground">
            We are a team of passionate developers who love to create beautiful
            and functional web applications. Our mission is to empower
            businesses and individuals with the tools they need to succeed
            online.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h4 className="text-lg font-semibold text-foreground">Follow Us</h4>
          <div className="flex items-center gap-4">
            <Link
              to={Links.LinkedIn}
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <LinkedinIcon className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              to={Links.Github}
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <GithubIcon className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              to={Links.Twitter}
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <XIcon className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h4 className="text-lg font-semibold text-foreground">Contact Us</h4>
          <p className="text-muted-foreground">
            Have a question or feedback? We'd love to hear from you!
          </p>
          <Link
            to={Links.Website}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Get in Touch
          </Link>
        </div>
      </div>
      <div className="container mt-12 border-t pt-6 text-xs text-muted-foreground">
        <p>&copy; 2024 Acme Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

function GithubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"
      />
    </svg>
  );
}

export default Footer;
