import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutopsyComponent } from './autopsy.component';

describe('AutopsyComponent', () => {
  let component: AutopsyComponent;
  let fixture: ComponentFixture<AutopsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutopsyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutopsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
