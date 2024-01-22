'use client'

import React from 'react'
import { LinkData,  clientLinks,
  staffLinks,
  tenantLinks, } from './linkData';
import { UserRole } from '@/lib/utils/UserRoleEnums';
import SidebarLinkBuilder from './SidebarLinkBuilder';
import { useSession } from 'next-auth/react';




let linksToRender: LinkData[] = [];
// Assuming you have a LinkData type and SidebarLink component as previously discussed
const linksConfig = {
  [UserRole.CLIENT]: [(linksToRender = clientLinks)],
  [UserRole.STAFF]: [(linksToRender = staffLinks)],
  [UserRole.TENANT]: [(linksToRender = tenantLinks)],
};

function getLinksForRole(role: UserRole) {
  return linksConfig[role] || [];
}


export default function SidebarLinks() {
  const { data: session, update } = useSession();


  let linksToRender: LinkData[] = [];
  if (session?.user) {
    switch (session.user.role) {
      case UserRole.CLIENT:
        linksToRender = clientLinks;
        break;
      case UserRole.STAFF:
        linksToRender = staffLinks;
        break;
      case UserRole.TENANT:
        linksToRender = tenantLinks;
        break;
      // ... handle other roles as necessary
      default:
        // Handle default case, possibly an empty array or guest links
        linksToRender = [];
        break;
    }
  }


  return (
    <>
    <div className="flex flex-col gap-6 items-center">
    {linksToRender.map((link) => (
      <SidebarLinkBuilder
      key={link.text}
      href={link.href}
      icon={link.icon}
      text={link.text}
      />
      ))}
  </div>
      </>
  )
}

