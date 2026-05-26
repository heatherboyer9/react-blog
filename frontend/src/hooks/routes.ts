/*
 *
 * Copyright (c) 2011-present Sonatype, Inc. All rights reserved.
 * Includes the third-party code listed at http://links.sonatype.com/products/clm/attributions.
 * "Sonatype" is a trademark of Sonatype, Inc.
 */

import { createElement, ElementType, FC, JSX, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUser} from "./useUser";

export type WithProtected = (component: ElementType, navigateTo: string) => FC;

const withProtected: WithProtected = (component, navigateTo) => {
  const Protected: FC = (): JSX.Element | null => {
    const navigate = useNavigate();
    const { isLoading, user } = useUser();

    useEffect(() => {
      if (!isLoading && !user) {
        navigate(navigateTo, { replace: true });
      }
    }, [isLoading, user, navigate]);

    if (isLoading) {
      return null;
    }

    return user ? createElement(component) : null;
  };

  return Protected;
};

export default withProtected;
