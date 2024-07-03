import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopsisTableComponent } from './topsis-table.component';

describe('TopsisTableComponent', () => {
  let component: TopsisTableComponent;
  let fixture: ComponentFixture<TopsisTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopsisTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopsisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
