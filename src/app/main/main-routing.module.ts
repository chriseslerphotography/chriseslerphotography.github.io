import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// container
import { MainComponent } from './container/main.component';


const routes: Routes = [
    { path: '**', component: MainComponent, data: {title: 'main component title'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
