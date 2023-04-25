import { useThemeToken } from '@/hooks';
import { ThemeToken } from '@/types';
import { createStyles } from 'antd-style';

const createStyle = createStyles((({ css }, token: ThemeToken) => ({
  info: css`
    margin-top    : 20px;
    padding-bottom: 20px;
    border-bottom : 1px dashed ${token.colorSplit};
    text-align    : center;

    p {
      margin-bottom: 10px;
    }

    .icon {
      vertical-align: bottom;
      padding-right : 10px;

      svg {
        width : 25px;
        height: 25px;
      }

    }
  `,
  tabs: css`
    padding         : 0 20px;
    background-color: ${token.colorBgContainer};
  `,
  font: css`
    color: ${token['test-color']};
  `
})))

export const useStyle = () => {
  return createStyle(useThemeToken())
}