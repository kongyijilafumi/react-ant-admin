import { ThemeToken } from '@/types';
import { createStyles } from 'antd-style';
export default createStyles(({ css }, token: ThemeToken) => ({
  dndDody: css`
    height     : 35px;
    box-sizing : content-box;
    white-space: nowrap;
    overflow-x : scroll;
    overflow-y : hidden;
    font-size  : 0;
    background-color: ${token.colorBgContainer};
    
   `,
  dndItem: css`
    position        : relative;
    display         : inline-block;
    padding         : 10px 40px 5px 10px;
    font-size       : 12px;
    background-color: ${token.colorBgElevated};
    box-sizing      : border-box;
    cursor          : pointer !important;
    color           : ${token.colorTextTertiary};
    vertical-align  : text-bottom;
    height          : 35px;
    transition   : all ${token.motionDurationMid};
    &:hover {
      background-color: ${token.colorBgLayout};
      color           : ${token.colorTextSecondary};
    }
    &.dragOverlay{
      z-index: 999;
    }
    &.active {
      background-color: ${token.colorBorder};
      color           : ${token.colorText};

      .anticon-close {
        background-color: ${token.colorError};
      }

      .anticon-close svg {
        color: ${token.colorTextHeading};
      }
    }

    &:focus {
      outline: unset;
    }


    .anticon-close {
      position     : absolute;
      top          : 5px;
      right        : 5px;
      width        : 15px;
      height       : 15px;
      border-radius: 50%;

      svg {
        width : inherit;
        height: inherit;
        color : ${token.colorTextSecondary};
      }
    }
   `
}))