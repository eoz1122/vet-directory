export interface ReportIssueNavigationState {
    topic: 'report_issue';
    vetId: string;
    vetName: string;
    reason: string;
}

const isBoundedString = (value: unknown, maxLength: number): value is string => (
    typeof value === 'string' && value.length > 0 && value.length <= maxLength
);

export const isReportIssueNavigationState = (
    value: unknown,
): value is ReportIssueNavigationState => {
    if (!value || typeof value !== 'object') return false;

    const candidate = value as Partial<ReportIssueNavigationState>;
    return candidate.topic === 'report_issue'
        && isBoundedString(candidate.vetId, 100)
        && isBoundedString(candidate.vetName, 200)
        && isBoundedString(candidate.reason, 100);
};
