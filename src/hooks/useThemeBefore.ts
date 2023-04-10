import colorTool from '@/utils/color';
import config from '@/config';
import tool from '@/utils/tool';

// 设置主题颜色
export function useTheme(): void {
    const app_color = config.COLOR || tool.data.get('APP_COLOR');
    if (app_color) {
        document.documentElement.style.setProperty('--el-color-primary', app_color);
        for (let i = 1; i <= 9; i++) {
            document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, colorTool.lighten(app_color, i / 10));
        }
        document.documentElement.style.setProperty(`--el-color-primary-darken-1`, colorTool.darken(app_color, 0.1));
    }
}
