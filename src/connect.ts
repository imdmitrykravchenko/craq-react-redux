import {
  useContext,
  createElement,
  ComponentType,
  ComponentProps,
} from 'react';
import { Selector, createSelectorHook } from 'react-redux';
import { ComponentContext } from 'craq';
import { context } from 'craq-react-renderer';

import craqReactReduxContext from './context';

const useSelector = createSelectorHook(craqReactReduxContext);

const connect = <S, T, P, C extends ComponentType<Partial<T & P>>>(
  mapStateToProps?: Selector<S, T> | null,
  mapContextToProps?: (context: ComponentContext<S>) => P,
) => {
  return (Component: C) => {
    return (ownProps: ComponentProps<C>) => {
      const stateProps = mapStateToProps
        ? useSelector(mapStateToProps)
        : undefined;
      const contextProps = mapContextToProps
        ? mapContextToProps(useContext(context))
        : undefined;

      return createElement(Component, {
        ...ownProps,
        ...stateProps,
        ...contextProps,
      });
    };
  };
};

export default connect;
