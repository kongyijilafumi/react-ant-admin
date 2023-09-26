import { createStyles } from 'antd-style';
import { useThemeToken } from '@/hooks';
import { ThemeToken } from '@/types';


const createStyle = createStyles((({ css }, token: ThemeToken) => ({
  column: css`
    .ant-affix{
      .ant-menu-root{
        height: 100vh;
      }
    }

  `,
  layoutContentBody: css`
    margin-top: 10px;
    &>div {
      padding         : 20px;
      min-height      : 100%;
      background-color: ${token.colorBgContainer};
      border          : 1px solid ${token.colorSplit};
    }
  `,
  foldControl: css`
    &.fixed {
      position        : absolute;
      bottom          : 0;
      right           : 0;
      width           : 100%;
      background      : inherit;
      border-right    : 1px solid ${token.colorSplit};
      background-color: ${token.colorBgContainer};
    }
    .ant-btn {
      width     : 100%;
      background: unset;
      color     : ${token.colorText};
      border    : 0;
      outline   : none;
      transition: none;
    }
  `,
  topMenu: css`
    margin    : 10px 0 0;
    overflow-x: auto;
    background: ${token.colorBgContainer};
    white-space: nowrap;
  `,
  topBreadcrumb: css` 
    background-color: ${token.colorBgContainer};
    margin-top      : 10px;
    padding         : 10px;
    font-size       : 16px;
    display         : flex;
    align-items     : center;
    svg {
      width : 20px;
      height: 20px;
    }
    .anticon {
      vertical-align: sub;
    }
  `,
  header: css`
    color           : ${token.colorText} !important;
    background-color: ${token.colorBgContainer} !important;
    border-bottom   : 1px solid ${token.colorSplit};
    .logo {
      float: left;
      span {
        vertical-align: middle;
        padding       : 0 10px;
        font-size     : 16px;
      }
      img {
        width : 40px;
        height: 40px;
        vertical-align: middle;
      }
    }
    .right {
      float: right;
    }
    .right-down {
      background-color: ${token.colorSplit};
    }
  `,
  layoutSilderMenu: css`
    border-color: ${token.colorSplit};
    height: calc(100vh - 64px - 9px);
    padding-bottom: 32px;
    overflow-y    : auto;
    &.twoFlanks{
      height: 100vh;
    }
    &.col {
      height        : 64px;
      padding-bottom: 0;
      overflow      : unset;
    }
    .ant-menu-submenu .ant-menu-submenu-title .anticon {
      font-size     : 24px;
      vertical-align: middle;
    }
    .ant-menu-item {
      align-items: center;
      display    : flex;
      .anticon {
        font-size: 24px;
      }
    }
  `
})))

export const useStyle = () => {
  const token = useThemeToken()
  return createStyle(token)
}
export default createStyle