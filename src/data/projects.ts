/** Publish only after HIC confirms attribution, image rights and client consent. */
export interface VerifiedProject {
  title: string;
  location: string;
  serviceSlug: string;
  scope: string[];
  description: string;
  image: string;
  imageAlt: string;
  beforeImage?: string;
  beforeAlt?: string;
  verified: true;
}
export const VERIFIED_PROJECTS: VerifiedProject[] = [];
