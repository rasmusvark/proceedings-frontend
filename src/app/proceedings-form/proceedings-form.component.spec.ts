import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProceedingsFormComponent } from './proceedings-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProceedingsFormComponent', () => {
  let component: ProceedingsFormComponent;
  let fixture: ComponentFixture<ProceedingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceedingsFormComponent ],
      imports: [ ReactiveFormsModule ]
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
});
