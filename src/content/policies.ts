export type PolicySlug = 'privacy' | 'terms';

export interface PolicySource {
  load: (slug: PolicySlug) => Promise<string>;
}

const policyPaths: Record<PolicySlug, string> = {
  privacy: '/content/privacy.md',
  terms: '/content/terms.md',
};

const policyLoaders = import.meta.glob<string>('/content/*.md', {
  query: '?raw',
  import: 'default',
});

export function createFilePolicySource(): PolicySource {
  return {
    async load(slug) {
      const policyPath = policyPaths[slug];
      const loadPolicy = policyLoaders[policyPath];

      if (!loadPolicy) {
        throw new Error(`Policy content unavailable for ${slug}.`);
      }

      const markdown = await loadPolicy();

      if (!markdown.trim()) {
        throw new Error(`Policy file is empty for ${slug}.`);
      }

      return markdown;
    },
  };
}

export const defaultPolicySource = createFilePolicySource();
