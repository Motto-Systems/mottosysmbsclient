import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SamplePrototypeComponent } from './components/samplePrototype/samplePrototype.component';

export const sampleRoutes: Routes = [
  { path: '', redirectTo: 'prototype', pathMatch: 'full' },
  { path: 'prototype', component: SamplePrototypeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(sampleRoutes)],
  exports: [RouterModule]
})
export class SampleRoutingModule { }
