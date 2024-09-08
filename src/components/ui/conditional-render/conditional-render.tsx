import { memo } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';

interface ConditionalRenderProps extends PropsWithChildren {
  shouldRender: boolean;
  fallback?: ReactNode;
}

const Component = (props: ConditionalRenderProps): JSX.Element => (
  <>{(props.shouldRender && props.children) || props.fallback}</>
);

const ConditionalRender = memo(Component);
ConditionalRender.displayName = 'Components.UI.ConditionalRender';
export { ConditionalRender };
