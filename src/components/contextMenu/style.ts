import { ThemeToken } from "@/types"
import { createStyles } from "antd-style"


const useStyle = createStyles(({ css }, props: { visible: boolean, token: ThemeToken }) => {
  return ({
    centextMenu: css` 
      display: ${props.visible ? 'block' : 'none'};
      position: fixed;
      top     : 0;
      left    : 0;
      right   : 0;
      bottom  : 0;
      z-index : 999;
      overflow: hidden;
      border  : 1px solid ${props.token.colorPrimary};
      ul{
        position        : absolute;
        width           : 120px;
        padding         : 0;
        margin          : 0;
        background-color: ${props.token.colorBgContainer};
        overflow        : hidden;
        border-radius   : ${props.token.borderRadius}px;
        box-shadow      : 2px 0 8px ${props.token.boxShadow};
        z-index         : 1000;
        border          : 1px solid ${props.token.colorSplit};
      }
      li {
        height       : 38px;
        line-height  : 38px;
        font-size    : 14px;
        text-align   : center;
        border-bottom: 1px solid ${props.token.colorSplit};
        list-style   : none;
        color        : ${props.token.colorTextDescription};
        cursor       : pointer;
        transition   : all ${props.token.motionDurationMid};
  
        &:last-child {
          border: none;
        }
  
        &:hover {
          background-color: ${props.token.colorPrimaryBg};
          color           : ${props.token.colorText};
        }
      }
    `,
  })
})


export default useStyle