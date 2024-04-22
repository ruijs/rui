import { memo } from 'react';
import { css } from '@emotion/css';
import AntdExt from '@ruiapp/antd-extension/source';

const ButtonExample = memo((props) => {
  return <div className={CssNames.container}></div>;
});

export default ButtonExample;

const CssNames = {
  container: css`
    padding: 16px;
  `,
};
