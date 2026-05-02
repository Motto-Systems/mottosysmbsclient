import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { HelpersModule } from '../../shared/globalShared/globalShared.module';
import { CustomPageHeaderComponent } from '../../shared/globalShared/customPageHeader/customPageHeader.component';
import { SampleRoutingModule } from './sampleRouting.module';
import { SamplePrototypeComponent } from './components/samplePrototype/samplePrototype.component';

@NgModule({
  declarations: [
    SamplePrototypeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    HelpersModule,
    CustomPageHeaderComponent,
    SampleRoutingModule,
  ],
})
export class SampleModule { }
