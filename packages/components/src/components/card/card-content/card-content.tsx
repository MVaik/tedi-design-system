import cn from 'classnames';
import React from 'react';

import { getBackgroundColorClass } from '../../colors/colors';
import { TColorsBackground } from '../../commonTypes';
import styles from '../card.module.scss';

export interface CardContentProps {
  /**
   * Card Content
   */
  children?: React.ReactNode;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Card content padding
   */
  padding?: 'none' | 'xsmall' | 'small' | 'medium' | 'large';
  /**
   * Background color of card content
   */
  background?: TColorsBackground;
}

export const CardContent = (props: CardContentProps): JSX.Element => {
  const { children, className, padding, background } = props;
  const CardContentBEM = cn(styles['card__content'], className, styles[`card__content--padding-${padding}`], {
    [getBackgroundColorClass(background)]: background,
  });

  return <div className={CardContentBEM}>{children}</div>;
};

export default CardContent;