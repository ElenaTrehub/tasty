import {Pipe, PipeTransform} from '@angular/core';

// # Filter Array of Objects
@Pipe({ name: 'lenghtFilter' })
export class FilterLengthPipe implements PipeTransform{

  transform(str, maxLength){
      return str.length < maxLength ? str : `${str.substring(0, maxLength)}...`;

  }

}
