import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Store} from '@ngrx/store';
import {initializeMenuDataAction} from './ngrx/actions/menu.action';
import {MenuGroup} from './shared/models/models';
import {NzIconService} from 'ng-zorro-antd/icon';
import {
  changeIcon,
  diagnosticManage, healthStatus, instanceDiagnostic, instanceMonitor,
  linuxIcon,
  recordIcon,
  serviceIcon,
  windowIcon
} from './shared/constants/icon.constants';


const routes: Routes = [
  {
    path: "",
    title: '首页',
    loadComponent: () => import('./shared/components/welcome/welcome.component').then(module => module.WelcomeComponent),
    pathMatch: 'full'
  },
  {
    path: "home",
    loadChildren: () => import('./components/home/home.module').then(module => module.HomeModule),
  },
  {
    path: 'customer-diagnosis',
    loadChildren: () => import('./components/customer-diagnosis/customer-diagnosis.module').then(module => module.CustomerDiagnosisModule)
  },
  {
    path: 'health-status',
    title: "健康状态",
    loadChildren: () => import('./components/health-status/health-status.module').then(module => module.HealthStatusModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./components/event/event.module').then(module => module.EventModule)
  },
  {
    path: 'diagnostic',
    loadChildren: () => import('./components/diagnostic-metric-set-manager/diagnostic-metric-set-manager.module').then(module => module.DiagnosticMetricSetManagerModule)
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/empty-page/empty-page.component').then(module => module.EmptyPageComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(
    private iconService: NzIconService,
    private store: Store,
  ) {

    /**
     * 父菜单ID为1-999
     * 子菜单Id以1000开始
     */
    const data: Array<MenuGroup> = [
      {
        id: 1,
        title: '概览大盘',
        path: '/home',
        isLeaf: true,
        iconType: 'fund-projection-screen',
        children: []
      },
      {
        id: 12,
        title: '客户事件',
        path: '/event/customerEvent',
        isLeaf: true,
        iconType: 'ops:service',
        children: []
      },
      {
        id: 11,
        title: '实例健康状态',
        isLeaf: true,
        iconType: 'ops:healthStatus',
        path: '/health-status',
        children: [],
      },
      {
        id: 10,
        title: '实例诊断',
        isLeaf: true,
        iconType: 'ops:instanceDiagnostic',
        path: '/customer-diagnosis',
        children: [],
      },
      {
        id: 13,
        title: '实例诊断集管理',
        isLeaf: true,
        iconType: 'ops:diagnosticManage',
        path: '/diagnostic/metricSetManager',
        children: [],
      }

    ];
    this.initializeCustomMenuIcon();
    this.store.dispatch(initializeMenuDataAction({data}))
  }


  private initializeCustomMenuIcon() {
    this.iconService.addIconLiteral('ops:record', recordIcon);
    this.iconService.addIconLiteral('ops:change', changeIcon);
    this.iconService.addIconLiteral('ops:service', serviceIcon);
    this.iconService.addIconLiteral('ops:linux', linuxIcon);
    this.iconService.addIconLiteral('ops:window', windowIcon);
    this.iconService.addIconLiteral('ops:diagnosticManage', diagnosticManage);
    this.iconService.addIconLiteral('ops:healthStatus', healthStatus);
    this.iconService.addIconLiteral('ops:instanceDiagnostic', instanceDiagnostic);
    this.iconService.addIconLiteral('ops:monitor', instanceMonitor);
  }

}
