import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ErrorState } from '../components/ErrorState';
import { Seo } from '../components/Seo';
import {
  type PolicySlug,
  type PolicySource,
  defaultPolicySource,
} from '../content/policies';

interface PolicyPageProps {
  slug: PolicySlug;
  title: string;
  description: string;
  policySource?: PolicySource;
}

type LoadState =
  | { status: 'loading' }
  | { status: 'ready'; markdown: string }
  | { status: 'error'; message: string };

export function PolicyPage({
  slug,
  title,
  description,
  policySource = defaultPolicySource,
}: PolicyPageProps) {
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let isCancelled = false;

    setState({ status: 'loading' });

    policySource
      .load(slug)
      .then((markdown) => {
        if (!isCancelled) {
          setState({ status: 'ready', markdown });
        }
      })
      .catch((error: unknown) => {
        if (isCancelled) {
          return;
        }

        const detail = error instanceof Error ? error.message : 'Please try again later.';
        setState({
          status: 'error',
          message: `${detail} Check that the Markdown file exists in content/.`,
        });
      });

    return () => {
      isCancelled = true;
    };
  }, [policySource, slug]);

  return (
    <section className="page policy-page">
      <Seo title={title} description={description} path={`/${slug}`} />
      <header className="policy-header">
        <p className="eyebrow">Kiby Legal</p>
        <h1>{title.replace('Kiby - ', '')}</h1>
      </header>

      {state.status === 'loading' ? (
        <p role="status" aria-live="polite">
          Loading policy content...
        </p>
      ) : null}

      {state.status === 'ready' ? (
        <article className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{state.markdown}</ReactMarkdown>
        </article>
      ) : null}

      {state.status === 'error' ? (
        <ErrorState title="Content unavailable" message={state.message} />
      ) : null}
    </section>
  );
}
