import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { FiltroNumberPipe } from './filtro-number.pipe';



@NgModule({
  declarations: [FiltroPipe, FiltroNumberPipe],
  exports: [FiltroPipe, FiltroNumberPipe],
})
export class PipesModule { }
