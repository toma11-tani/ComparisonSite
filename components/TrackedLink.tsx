'use client';

import React from 'react';
import { trackEvent } from '../utils/analytics';

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    eventName: string;
    eventParams?: Record<string, unknown>;
}

export const TrackedLink: React.FC<TrackedLinkProps> = ({
    eventName,
    eventParams,
    onClick,
    children,
    ...rest
}) => {
    return (
        <a
            {...rest}
            onClick={(e) => {
                trackEvent(eventName, eventParams);
                onClick?.(e);
            }}
        >
            {children}
        </a>
    );
};
