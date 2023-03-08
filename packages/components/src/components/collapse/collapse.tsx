import cn from 'classnames';
import React from 'react';
import AnimateHeight from 'react-animate-height';

import { usePrint } from '../../helpers';
import { useLabels } from '../../providers/label-provider';
import { Button } from '../button/button';
import { Col, Row } from '../grid';
import Heading, { HeadingProps } from '../heading/heading';
import Icon from '../icon/icon';
import Print from '../print/print';
import styles from './collapse.module.scss';

export interface CollapseProps {
  /**
   * ID of the collapse
   */
  id: string;
  /**
   * Add heading properties.
   */
  heading: HeadingProps;
  /**
   * Any content.
   */
  children: React.ReactNode;
  /**
   * Name on the button to open the item.
   */
  openText?: string;
  /**
   * Name on the button to close the item.
   */
  closeText?: string;
  /**
   * Should collapse open/close toggle button render text
   * @default false
   */
  hideCollapseText?: boolean;
  /**
   * Custom class name.
   */
  className?: string;
}

export const Collapse = (props: CollapseProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    id,
    children,
    heading,
    className,
    openText = getLabel('open'),
    closeText = getLabel('close'),
    hideCollapseText = false,
    ...rest
  } = props;
  const [isOpenState, setIsOpen] = React.useState(false);
  const isPrint = usePrint();
  const isOpen = isOpenState || isPrint;
  const BEM = cn(styles['collapse'], className, { [styles['collapse--is-open']]: isOpen });

  const renderHeading = (): JSX.Element => {
    return (
      <Col width="auto">
        <Heading level={5} {...heading} className={cn(styles['collapse__title'], heading.className)} />
      </Col>
    );
  };

  const onClick = () => setIsOpen((prev) => !prev);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.code === 'Enter' || e.code === 'Space') && !e.repeat) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div data-name="collapse" {...rest} className={BEM}>
      <button
        type="button"
        className={styles['collapse__heading']}
        aria-expanded={isOpen}
        aria-controls={id}
        onKeyDown={onKeyDown}
        onClick={onClick}
      >
        <Row element="div" justifyContent="between" alignItems="center">
          {renderHeading()}
          <Col width="auto">
            <Row element="div" gutter={1}>
              <Print visibility="hide">
                <Col
                  width="auto"
                  className={cn('text-small', 'text-primary', 'text-bold', {
                    'visually-hidden': hideCollapseText,
                  })}
                >
                  {isOpen ? closeText : openText}
                </Col>
              </Print>
              <Col width="auto">
                <Icon className={styles['collapse__icon']} name="expand_more" />
              </Col>
            </Row>
          </Col>
        </Row>
      </button>
      {isPrint ? (
        children
      ) : (
        <AnimateHeight duration={300} id={id} height={isOpen ? 'auto' : 0} data-testid="collapse-inner">
          {children}
        </AnimateHeight>
      )}
    </div>
  );
};

export default Collapse;
