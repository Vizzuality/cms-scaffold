import { env } from '@/env.mjs';

export const GA_TRACKING_ID = env.NEXT_PUBLIC_GA_TRACKING_ID;

declare global {
  interface Window {
    gtag: any;
  }
}

// log the pageview with their URL
export const GAPage = (url: string): void => {
  if (window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// log specific events happening.
export const GAEvent = ({ action, params }): void => {
  if (window.gtag) {
    window.gtag('event', action, params);
  }
};
