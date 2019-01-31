import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  EventEmitter
} from '@angular/core';


@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  private _listFilter: string;
  @ViewChild('filterElement') filterElementRef: ElementRef;
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;
  @Output() changeFilter: EventEmitter<string> = new EventEmitter<string>()

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(filter: string) {
    this._listFilter = filter;
    this.changeFilter.emit(this._listFilter);
  }

  constructor() { }

  ngOnInit() {
    console.log(`Display: ${this.displayDetail}`)
  }

  ngAfterViewInit(): void {
    this.filterElementRef.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = `Hits: ${this.hitCount}`;
    }
  }

} 
  
