import React from 'react';

interface HeaderProps {
  title: string,
  subtitle?: string,
  className?: string
}

const Header = ({title, subtitle, className}:HeaderProps) => {
  return (
      <div className={className}>
        <h2 className='h2-bold text-dark-600 orange-gradient'>
          {title}
        </h2>
        {subtitle && <p className="p-20-regular mt-4">{subtitle}</p>}
      </div>
  );
};

export default Header;
