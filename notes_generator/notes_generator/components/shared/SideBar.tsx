'use client'

import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {navLinks} from "@/constants";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";

const SideBar = () => {
  const pathname = usePathname()
  return (
      <aside className='sidebar'>
        <div className='flex size-full flex-col gap-4'>
          <Link href="/" className='sidebar-logo'>
            <Image src='assets/images/logo-text.svg' alt='Logo' width={180} height={28}/>
          </Link>
          <nav className='sidebar-nav'>
            <SignedIn>
              <ul className='sidebar-nav_elements'>
                {navLinks.slice(0,6).map((link) => {
                  const isActive = link.route === pathname;
                  return (
                      <li key={link.route}
                          className={`sidebar-nav_element ${isActive ? 'bg-orange-gradient text-white' : 'text-gray-700'}`}>
                        <Link className='sidebar-link' href={link.route}>
                          <Image src={link.icon} alt='logo' width={24} height={24}
                                 className={isActive ? 'brightness-200' : undefined}/>
                          {link.label}
                        </Link>
                      </li>
                  )
                })}
              </ul>
              <ul className='sidebar-nav_elements'>
                {navLinks.slice(6,8).map((link) => {
                  const isActive = link.route === pathname;
                  return (
                      <li key={link.route}
                          className={`sidebar-nav_element ${isActive ? 'bg-orange-gradient text-white' : 'text-gray-700'}`}>
                        <Link className='sidebar-link' href={link.route}>
                          <Image src={link.icon} alt='logo' width={24} height={24}
                                 className={isActive ? 'brightness-200' : undefined}/>
                          {link.label}
                        </Link>
                      </li>
                  )
                })}
                <li className='flex-center gap-2 p-4'>
                  <UserButton showName />
                </li>
              </ul>
            </SignedIn>
            <SignedOut>
              <Button asChild className='bg-purple-gradient button bg-cover'>
                <Link href='/sign-in'>
                  Log-in
                </Link>
              </Button>
            </SignedOut>
          </nav>
        </div>
      </aside>
  );
};

export default SideBar;


