import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        <p>© 2024 Your Company. All rights reserved.</p>
        <p>
          Follow us on 
          <a href="https://twitter.com/yourcompany" className="text-blue-400 ml-2">Twitter</a>,
          <a href="https://facebook.com/yourcompany" className="text-blue-600 ml-2">Facebook</a>, and
          <a href="https://instagram.com/yourcompany" className="text-pink-500 ml-2">Instagram</a>.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
