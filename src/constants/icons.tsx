import { MaterialIcon } from '@/components/ui/icons';

interface IconProps {
  color: string;
  size: number;
}

export const icons: Record<string, (props: IconProps) => JSX.Element> = {
  index: (props: IconProps) => <MaterialIcon name="home" color={props.color} size={props.size} />,
  search: (props: IconProps) => (
    <MaterialIcon name="search" color={props.color} size={props.size} />
  ),
  profile: (props: IconProps) => (
    <MaterialIcon name="person" color={props.color} size={props.size} />
  ),
};
