import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroNumber'
})
export class FiltroNumberPipe implements PipeTransform {

  transform( arreglo : any[], numero : number, columna : string ): any[] {

    if( numero === 0){
      return arreglo;
    }

    console.log(arreglo)

    return arreglo.filter( arreglo=>{
      return arreglo[columna]
                 .includes( numero );
    })
  }
}
