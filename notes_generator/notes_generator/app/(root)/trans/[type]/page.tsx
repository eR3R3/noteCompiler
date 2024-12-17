'use client'

import FormBase from '@/components/shared/FormBase';
import React from 'react';
import {usePathname} from "next/navigation";
import Header from "@/components/shared/Header";
import {TransformationType} from "@/types";

const Trans = () => {
  let pathname = usePathname();
  pathname = pathname.replace("/trans/", "") as TransformationType
  return (
    <div>
      {pathname === "restore" &&
        <div>
          <Header
          title="Restore"/>
          <FormBase
          isSelect={true}/>
        </div>}
    </div>
  );
};

export default Trans;
