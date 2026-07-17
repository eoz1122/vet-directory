/**
 * Minimal renderer model for the cityContent blobs (bold + dash lists only).
 * The raw strings previously rendered "**" and "- " literally on city pages.
 */
export interface Segment {
    bold: boolean;
    text: string;
}

export interface Block {
    type: 'p' | 'list';
    segments?: Segment[];
    items?: Segment[][];
}

function parseSegments(line: string): Segment[] {
    const segments: Segment[] = [];
    const parts = line.split('**');
    parts.forEach((part, i) => {
        if (part) segments.push({ bold: i % 2 === 1, text: part });
    });
    return segments;
}

export function parseCityContent(md: string): Block[] {
    const blocks: Block[] = [];
    for (const raw of md.split('\n\n')) {
        const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
        let listItems: Segment[][] = [];
        const flushList = () => {
            if (listItems.length) {
                blocks.push({ type: 'list', items: listItems });
                listItems = [];
            }
        };
        for (const line of lines) {
            if (line.startsWith('- ')) {
                listItems.push(parseSegments(line.slice(2)));
            } else {
                flushList();
                blocks.push({ type: 'p', segments: parseSegments(line) });
            }
        }
        flushList();
    }
    return blocks;
}
