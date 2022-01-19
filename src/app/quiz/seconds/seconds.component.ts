import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-seconds',
  templateUrl: './seconds.component.html',
  styleUrls: ['./seconds.component.css']
})
export class SecondsComponent implements OnInit {

  myRadio: number;
  selectedsec: number = 60;
  @Output() onsetradio: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }
  ngOnInit(): void {

    //   $(document).ready(function(){ 
    //     $("input[name='Radio']").click(function() {

    //         var test = $(this).val();
    //         $(".tab").hide();   
    //     });   
    // });
    // $(document).ready(function(){ 
    //     $("input[name='check']").click(function() {

    //         var test = $(this).val();
    //         $(".tab").delay(100).fadeIn(0);
    //     });
    // });
  };

  setradio(e: number) {
    this.selectedsec = e;
    this.onsetradio.emit(this.selectedsec);
  }
}
