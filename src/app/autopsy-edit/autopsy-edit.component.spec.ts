import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutopsyEditComponent } from './autopsy-edit.component';

describe('AutopsyEditComponent', () => {
  let component: AutopsyEditComponent;
  let fixture: ComponentFixture<AutopsyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AutopsyEditComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(AutopsyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
