import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectRegionInfo} from "../../../ngrx/selectors/global.select";

@Component({
  selector: 'ops-resource-distribution',
  templateUrl: './resource-distribution.component.html',
  styleUrls: ['./resource-distribution.component.less']
})
export class ResourceDistributionComponent implements OnDestroy {


  private store = inject(Store)

  regionData: any[] = []

  loading = false

  instanceDataMap: any = {}

  @Input()
  set value(value: any) {
    this.loading = value.spinning
    const temp: any = {}
    for (let i = 0; i < value.value.length; i++) {
      temp[value.value[i].regionId] = value.value[i]
    }
    this.instanceDataMap = temp
  }

  private regionSub = this.store.select(selectRegionInfo).subscribe(res => {
    this.regionData = res;
  })

  getInstanceData(regionId: string) {
    return this.instanceDataMap[regionId] || {}
  }

  hasValue(regionId: string) {
    const data = this.getInstanceData(regionId);
    return Object.keys(data).length > 0 && data.instanceCount > 0
  }


  ngOnDestroy(): void {
    this.regionSub.unsubscribe()
  }
}
