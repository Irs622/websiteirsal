import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 py-24 text-center bg-[#f5f5f5]">
      <span className="caption-uppercase text-[#777169] mb-3">404 • Not Found</span>
      <h1 className="display-xl mb-4 text-[#0c0a09]">
        Page does not exist
      </h1>
      <p className="body-md text-[#777169] max-w-md mb-8">
        The requested publication page or route could not be found. Please return to the portfolio overview.
      </p>
      <Link to="/">
        <Button variant="primary" icon={<ArrowLeft size={15} />} iconPosition="left">
          Return to Overview
        </Button>
      </Link>
    </div>
  );
}
