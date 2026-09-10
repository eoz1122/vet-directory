const PRERENDERED_HEAD_METADATA_SELECTOR = '[data-prerender-route]';

export function removePrerenderedHeadMetadata(root: ParentNode = document): number {
    const metadata = Array.from(
        root.querySelectorAll(PRERENDERED_HEAD_METADATA_SELECTOR),
    );
    metadata.forEach((element) => element.remove());
    return metadata.length;
}
