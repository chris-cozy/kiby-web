import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { type PolicySource, defaultPolicySource } from '../content/policies';
import { Layout } from './layout/Layout';
import { DashboardPlaceholderPage } from '../pages/DashboardPlaceholderPage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PolicyPage } from '../pages/PolicyPage';
import { RouteErrorPage } from '../pages/RouteErrorPage';

interface RouterOptions {
  policySource?: PolicySource;
}

export function createAppRoutes(options: RouterOptions = {}): RouteObject[] {
  const policySource = options.policySource ?? defaultPolicySource;

  return [
    {
      path: '/',
      element: <Layout />,
      errorElement: <RouteErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage policySource={policySource} />,
        },
        {
          path: 'privacy',
          element: (
            <PolicyPage
              slug="privacy"
              title="Kiby - Privacy Policy"
              description="Read the Kiby Privacy Policy."
              policySource={policySource}
            />
          ),
        },
        {
          path: 'terms',
          element: (
            <PolicyPage
              slug="terms"
              title="Kiby - Terms of Service"
              description="Read the Kiby Terms of Service."
              policySource={policySource}
            />
          ),
        },
        {
          path: 'dashboard',
          element: <DashboardPlaceholderPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ];
}

export function createAppRouter(options: RouterOptions = {}) {
  return createBrowserRouter(createAppRoutes(options));
}
