import { profile } from './configLoader';

export const setDocumentTitle = (pageTitle) => {
    const baseTitle = `${profile.name} | Portfolio`;
    document.title = pageTitle ? `${pageTitle} - ${baseTitle}` : baseTitle;
};
