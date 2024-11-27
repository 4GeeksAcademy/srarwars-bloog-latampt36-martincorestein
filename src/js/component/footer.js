import React, { Component } from "react";

export const Footer = () => (
    <footer className="bg-dark text-center py-3 text-warning">
        <span>Star Wars Blog &copy; {new Date().getFullYear()}</span>
    </footer>
);
export default Footer;
