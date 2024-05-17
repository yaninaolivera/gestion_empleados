import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoNuevoComponent } from './empleado-nuevo.component';

describe('EmpleadoNuevoComponent', () => {
  let component: EmpleadoNuevoComponent;
  let fixture: ComponentFixture<EmpleadoNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoNuevoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleadoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
