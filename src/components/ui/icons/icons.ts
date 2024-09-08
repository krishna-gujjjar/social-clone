import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { cssInterop } from 'nativewind';

cssInterop(MaterialIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: { color: true },
  },
});

export { MaterialIcon };
