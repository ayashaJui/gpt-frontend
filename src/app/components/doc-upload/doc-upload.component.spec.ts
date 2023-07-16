import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocUploadComponent } from './doc-upload.component';

describe('DocUploadComponent', () => {
  let component: DocUploadComponent;
  let fixture: ComponentFixture<DocUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocUploadComponent]
    });
    fixture = TestBed.createComponent(DocUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
