import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaditComponent } from './creadit.component';

describe('CreaditComponent', () => {
  let component: CreaditComponent;
  let fixture: ComponentFixture<CreaditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreaditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreaditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
