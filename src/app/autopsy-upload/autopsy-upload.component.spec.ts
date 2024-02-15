import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutopsyUploadComponent } from './autopsy-upload.component';

describe('AutopsyUploadComponent', () => {
  let component: AutopsyUploadComponent;
  let fixture: ComponentFixture<AutopsyUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutopsyUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutopsyUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
