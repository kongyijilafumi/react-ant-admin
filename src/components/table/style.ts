import { ThemeToken } from '@/types';
import { createStyles } from 'antd-style';

export default createStyles(({ css }, token: ThemeToken) => ({
  set: css`
    padding: 10px;
    .anticon svg {
      width           : 30px;
      height          : 30px;
      color           : ${token.colorText};
      background-color: ${token.colorPrimary};

      transition: all .3s;
      cursor    : pointer;

      &:hover {
        background-color: ${token.colorPrimaryBorderHover};
        color           : ${token.colorTextSecondary};
      }
    }
  `,
  rowDragging: css`
    background: ${token.colorBgElevated};
    border    : 1px solid ${token.colorBorder};
    z-index   : 10001;
    color     : ${token.colorText};
    .drag-visible {
      visibility: visible;
    }
  
    td {
      padding   : 16px;
      visibility: hidden;
  
      .drag-sort svg {
        width : 25px;
        height: 25px;
      }
    }
   `
}))