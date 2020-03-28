import { IInteractionTarget, ILayer, ILngLat, Popup, Scene } from '@antv/l7';
import turfCircle from '@turf/circle';
import turfDistance from '@turf/distance';
import { Feature, featureCollection, point } from '@turf/helpers';
import EditRender from '../render/edit';
import { DrawEvent } from '../util/constant';
import DrawFeature, { IDrawOption } from './draw_mode';
export type unitsType = 'degrees' | 'radians' | 'miles' | 'kilometers';
export interface IDrawCircleOption extends IDrawOption {
  units: unitsType;
  steps: number;
}
const InitFeature = {
  type: 'FeatureCollection',
  features: [],
};
export default class DrawEdit extends DrawFeature {
  private center: ILngLat;
  private endPoint: ILngLat;
  // 绘制完成之后显示
  private editLayer: EditRender;
  constructor(scene: Scene, options: Partial<IDrawCircleOption> = {}) {
    super(scene, options);
  }

  public setEditFeature(feature: Feature) {
    this.currentFeature = feature;
  }

  protected onDragStart = (e: IInteractionTarget) => {
    // @ts-ignore
  };
  protected getDefaultOptions() {
    return {
      steps: 64,
      units: 'kilometres',
      cursor: 'move',
    };
  }

  protected onDragging = (e: IInteractionTarget) => {
    this.endPoint = e.lngLat;
    this.emit(DrawEvent.Edit, this.endPoint);
    return;
  };

  protected onDragEnd = () => {
    this.emit(DrawEvent.UPDATE, null);
    this.resetCursor();
    this.disable();
  };
  protected onClick = () => {
    return null;
  };
}
