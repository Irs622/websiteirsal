import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 py-24 text-center bg-[#fbfbf9]">
      <span className="caption-uppercase text-[#6e6b65] mb-2 font-mono text-[12px]">404 &bull; Not Located</span>
      <h1 className="display-xl mb-3 text-[#141413]">
        Page does not exist
      </h1>
      <p className="body-md text-[#6e6b65] max-w-md mb-8 text-[15px]">
        The requested publication entry or URL route could not be found. Please return to the portfolio overview.
      </p>
      <Link to="/">
        <Button variant="primary" icon={<ArrowLeft size={14} />} iconPosition="left">
          Return to Overview
        </Button>
      </Link>
    </div>
  );
}
