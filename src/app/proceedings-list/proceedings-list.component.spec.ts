import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ProceedingsListComponent } from './proceedings-list.component';
import { By } from '@angular/platform-browser';

describe('ProceedingsListComponent', () => {
  let component: ProceedingsListComponent;
  let fixture: ComponentFixture<ProceedingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ProceedingsListComponent],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedingsListComponent);
    component = fixture.componentInstance;
    component.proceedingsList = [
      {
        id: 1,
        name: 'Test One',
        personalId: '1234567890',
        email: 'test.one@example.com',
        emailSent: true
      },
      {
        id: 2,
        name: 'Test Two',
        personalId: '0987654321',
        email: 'test.two@example.com',
        emailSent: false
      },
      {
        id: 3,
        name: 'Test Three',
        personalId: '1122334455',
        email: 'test.three@example.com',
        emailSent: true
      },
    ];
    component.filteredProceedingsList = component.proceedingsList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate filteredProceedingsList on init', () => {
    expect(component.filteredProceedingsList.length).toBeGreaterThan(0);
  });

  it('should filter proceedings by name', () => {
    const searchInput = fixture.debugElement.query(By.css('input[type="text"]'));
    searchInput.nativeElement.value = 'test name';
    searchInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.filteredProceedingsList).toEqual(
      component.proceedingsList.filter(proceeding => 
        proceeding.name.toLowerCase().includes('test name')
      )
    );
  });

  it('should delete a proceeding when confirmDelete is called', () => {
    const proceedingToDelete = component.proceedingsList[0];
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component, 'deleteProceeding');
  
    component.confirmDelete(proceedingToDelete);
  
    expect(component.deleteProceeding).toHaveBeenCalledWith(proceedingToDelete.id);
  });
  
  it('should not delete a proceeding when confirmDelete is cancelled', () => {
    const proceedingToDelete = component.proceedingsList[0];
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(component, 'deleteProceeding');
  
    component.confirmDelete(proceedingToDelete);
  
    expect(component.deleteProceeding).not.toHaveBeenCalled();
  });
  
  it('should toggle showReason property of a proceeding when toggleReason is called', () => {
    const proceeding = component.proceedingsList[0];
    const initialShowReason = proceeding.showReason;
  
    component.toggleReason(proceeding);
  
    expect(proceeding.showReason).toBe(!initialShowReason);
  });
});
