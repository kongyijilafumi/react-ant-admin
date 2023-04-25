import { ThemeToken } from '@/types';
import { createStyles } from 'antd-style';
export default createStyles((({ css }, token: ThemeToken) => ({
  setTheme: css`
  .icon {
    position        : fixed;
    display         : flex;
    flex-direction  : column;
    justify-content : center;
    right           : 20px;
    bottom          : 50px;
    width           : 45px;
    height          : 45px;
    background-color: ${token.colorBgBase};
    box-shadow      : 0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05);
    border-radius   : 50%;
    cursor          : pointer;

    svg {
      width : 45px;
      height: 45px;
    }
   
  }
 
  `,
  drawer: css`
  .ant-drawer-content {
    background-color: ${token.colorBgContainer};
  }
  .bottom{
    margin-top: ${token.marginMD}px;
  }
  .del {
    margin-left: 15px;
  }`,
  colorRow: css`
    padding    : 10px;
    align-items: center;
    color      : ${token.colorTextHeading};
    &.primary {
      color  : ${token.colorPrimary};
      padding: 20px 10px 20px;
    }
    .color-btn {
      margin-left  : 5px;
      width        : 100px;
      height       : 30px;
      border       : 5px solid ${token.colorSplit};
      border-radius: 5px;
    }`
})))