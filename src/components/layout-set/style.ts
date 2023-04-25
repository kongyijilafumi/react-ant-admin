import { ThemeToken } from "@/types"
import { createStyles } from "antd-style"


export default createStyles((({ css }, token: ThemeToken) => ({
  layoutsetContainer: css`
    position: fixed;
    right   : 0;
    top     : 20%;
    svg {
      width           : 40px;
      height          : 40px;
      cursor          : pointer;
      background-color: ${token.colorPrimaryHover};
      transition      : background-color .3s;
      &:hover {
        background-color: ${token.colorPrimaryBorderHover};
      }
    }
  `,
  layoutsetDrawer: css`
    color: ${token.colorText};
    .title {
      margin     : 1em 0;
      font-size  : 16px;
      font-weight: bold;
    }

    .visible-list {
      margin: 10px 0;
    }

    .col {
      width        : 50px;
      height       : 40px;
      border-radius: 4px;
      overflow     : hidden;
      cursor       : pointer;

      &.active {
        position  : relative;
        background: ${token.colorPrimaryHover};

        &::after {
          content      : '';
          position     : absolute;
          right        : 10px;
          bottom       : 5px;
          width        : 10px;
          height       : 20px;
          border-right : 4px solid ${token.colorPrimaryBorderHover};
          border-bottom: 4px solid ${token.colorPrimaryBorderHover};
          transform    : rotate(45deg);
        }
      }

      img {
        width : 100%;
        height: auto;
      }
    }

    .save {
      margin-top: 20px;
    }
  `
})))