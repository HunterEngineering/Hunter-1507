import {NgModule} from '@angular/core';
import { AigaModule } from './aiga/aiga.module';
import { HardProblemModule } from './hardproblem/hardproblem.module';
import { UsingHunterModule } from './using-hunter/using-hunter.module';
import {WhatshunterModule} from './whatshunter/whatshunter.module';

@NgModule({
  declarations: [],
  imports: [
    AigaModule,
    HardProblemModule,
    UsingHunterModule,
    WhatshunterModule
],
  exports: [
    AigaModule,
    HardProblemModule,
    UsingHunterModule,
    WhatshunterModule
  ]
})
export class OverviewModule {}
