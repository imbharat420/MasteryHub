import {
  forwardRef, useEffect, useRef, Ref, MutableRefObject,
} from 'react';
import classNames from 'classnames';

import testIds from './testIds';
import useStyles from './useStyles';

type InputSizeType = 'large' | 'medium' | 'small' | 'mini';

interface IInputProps {
  [key: string]: any;
  size?: InputSizeType;
  disabled?: boolean;
  className?: string;
  isFocused?: boolean;
  dataTestId?: string;
}

const Input = forwardRef(({
  size = 'medium',
  disabled = false,
  className,
  dataTestId = testIds.input,
  isFocused,
  ...rest
}: IInputProps, ref: Ref<HTMLInputElement>) => {
  const classes = useStyles() as Record<string, string>;

  const inputRef = useRef<HTMLInputElement>(null);
  const resolvedRef = (ref || inputRef) as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (isFocused) {
      resolvedRef.current?.focus();
    }
  }, [isFocused, resolvedRef]);

  return (
    <div className={classes['pw-input']}>
      <input
        {...rest}
        ref={resolvedRef}
        data-testid={dataTestId}
        className={classNames(classes['pw-input_inner'], classes[size], { [classes.disabled]: disabled }, className)}
      />
    </div>
  );
});

export default Input;
