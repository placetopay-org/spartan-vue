import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, RadarChart, GaugeChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    RadarComponent,
} from 'echarts/components';

export default defineNuxtPlugin(() => {
    use([
        CanvasRenderer,
        BarChart,
        RadarChart,
        GaugeChart,
        TitleComponent,
        TooltipComponent,
        LegendComponent,
        GridComponent,
        RadarComponent,
    ]);
});
