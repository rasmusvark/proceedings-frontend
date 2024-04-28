import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProceedingsFormComponent } from './proceedings-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProceedingsFormComponent', () => {
  let component: ProceedingsFormComponent;
  let fixture: ComponentFixture<ProceedingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, ProceedingsFormComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.proceedingsForm.valid).toBeFalsy();
  });
  
  it('form valid when all required fields are filled', () => {
    component.proceedingsForm.controls['name'].setValue("Test One");
    component.proceedingsForm.controls['personalId'].setValue("1234567890");
    component.proceedingsForm.controls['email'].setValue("test@example.com");
    component.proceedingsForm.controls['reason'].setValue("Just because");
    expect(component.proceedingsForm.valid).toBeTruthy();
  });  
});
