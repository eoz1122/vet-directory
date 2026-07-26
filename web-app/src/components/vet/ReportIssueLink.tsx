import type { ComponentProps } from 'react';
import { Link } from 'react-router-dom';

import type { ReportIssueNavigationState } from '../../utils/reportIssue';

interface ReportIssueLinkProps extends Omit<ComponentProps<typeof Link>, 'state' | 'to'> {
    vetId: string;
    vetName: string;
    reason: string;
}

export default function ReportIssueLink({
    vetId,
    vetName,
    reason,
    children,
    className = '',
    ...linkProps
}: ReportIssueLinkProps) {
    const state: ReportIssueNavigationState = {
        topic: 'report_issue',
        vetId,
        vetName,
        reason,
    };

    return (
        <Link
            {...linkProps}
            className={`min-h-11 min-w-11 inline-flex items-center justify-center ${className}`}
            to="/contact"
            state={state}
        >
            {children}
        </Link>
    );
}
