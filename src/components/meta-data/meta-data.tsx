import { Fragment } from 'react';
import { Col, Inline } from '../ui/container';
import { Separator } from '../ui/separator';
import { Tiny, Title } from '../ui/typography';

interface MetaDatProps {
  className?: string;
  items: { id: string; title: string; value: number }[];
}

export const MetaData = (props: MetaDatProps): JSX.Element => (
  <Inline className="rounded-3xl bg-slate-100 px-6 py-4 shadow-lg shadow-slate-500">
    {props.items.map((item, index) => (
      <Fragment key={`${item.title}-${item.id}`}>
        <Col className="items-center">
          <Title>{item.value}</Title>
          <Tiny className="text-slate-600">{item.title}</Tiny>
        </Col>
        {index === props.items.length - 1 || <Separator />}
      </Fragment>
    ))}
  </Inline>
);
