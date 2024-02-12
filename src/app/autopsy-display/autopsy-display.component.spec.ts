import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutopsyDisplayComponent } from './autopsy-display.component';

describe('AutopsyDisplayComponent', () => {
  let component: AutopsyDisplayComponent;
  let fixture: ComponentFixture<AutopsyDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutopsyDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutopsyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
