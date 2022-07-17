import * as noUiSlider from 'nouislider';
import { SliderModel } from '../../interfaces';

export class Slider implements SliderModel {
    public drawSlider(slider: HTMLElement, valueFrom: number, ValueTo: number, maxValue: number): void {
        noUiSlider.create(slider, {
            start: [valueFrom, ValueTo],
            connect: true,
            step: 10,
            range: {
                min: 0,
                max: maxValue,
            },
            tooltips: {
                // tooltips are output only, so only a "to" is needed
                to: function (numericValue) {
                    return numericValue.toFixed();
                },
            },
        });
    }

    public resetSliders(): void {
        const sliders = document.querySelectorAll('.slider__line');
        sliders.forEach((slider) => {
            if (!(slider instanceof HTMLElement)) {
                throw new Error('slider-error');
            }
            (slider as noUiSlider.target).noUiSlider?.set([0, 10000]);
        });
    }
}
