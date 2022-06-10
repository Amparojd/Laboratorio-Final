import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Socio } from './socio';






@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {


  formulario: FormGroup;

  socios:Socio[]=[];

    socioMod: Socio | null=null;
    timeSnackBar: number= 3000;



  constructor(private snackBar: MatSnackBar) {

    this.formulario = new FormGroup ({
      nSocio:new FormControl ("",Validators.required),
      nombre: new FormControl ("", [Validators.required, Validators.minLength(3)]),
      apellido: new FormControl ("", [Validators.required, Validators.minLength(3)]),
      dni: new FormControl ("", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      telefono: new FormControl ("", Validators.required),
      sexo: new FormControl ("", Validators.required)
    });
  }

  ngOnInit(): void {
  }

submitForm (): void {

  if (!this.formulario.valid || this.socioMod != null) {
    this.snackBar.open ("Revise los campos de formulario", "Aceptar",  {duration: this.timeSnackBar});
    return;
  }

  if (! this.checkSocio(this.formulario.value.nSocio))
  {
    this.snackBar.open("Error. El número de cliente introducido ya existe", "Aceptar", { duration : this.timeSnackBar });
    return;
  }

  let socio= new Socio();

  socio.nSocio=this.formulario.value.nSocio;
  socio.nombre=this.formulario.value.nombre;
  socio.apellido=this.formulario.value.apellido;
  socio.dni=this.formulario.value.dni;
  socio.telefono=this.formulario.value.telefono;
  socio.sexo=this.formulario.value.sexo;

  this.socios.push(socio);
  this.formulario.reset();

  this.snackBar.open ("Los datos se han enviado correctamente", "Aceptar" , {duration: this.timeSnackBar});
}

checkSocio (nSocio: number): boolean {
  let result :boolean= true;

  for (let s of this.socios)

  {
    if (nSocio == s.nSocio)
    {
      result= false;
      break;
    }
  }
  return result;
}

deleteSocio( event : MouseEvent, socio : Socio):void

{
  for (let i = this.socios.length -1; i >= 0; --i) {

    if (this.socios[i]==socio)
    {
      this.socios.splice(i,1);
      break;
    }
 }

 if (this.socioMod !=null && this.socioMod == socio) {
  this.formulario.reset();
  this.socioMod=null;
 }

 this.snackBar.open("Socio eliminado correctamente", "Aceptar", {duration: this.timeSnackBar});
}

editSocio (event: MouseEvent, socio :Socio): void {

  this.formulario.controls ["nSocio"].setValue(socio.nSocio);
  this.formulario.controls ["nombre"].setValue(socio.nombre);
  this.formulario.controls ["apellido"].setValue(socio.apellido);
  this.formulario.controls ["dni"].setValue(socio.dni);
  this.formulario.controls ["telefono"].setValue(socio.telefono);
  this.formulario.controls ["sexo"].setValue(socio.sexo);

  this.socioMod=socio;
}

socioFinal (event: MouseEvent, socio: Socio): void {

  for (let s of this.socios) {
    if(s==socio) {
      s.nSocio= this.formulario.value.nSocio;
      s.nombre= this.formulario.value.nombre;
      s.apellido=this.formulario.value.apellido;
      s.dni=this.formulario.value.dni;
      s.telefono=this.formulario.value.telefono;
      s.sexo=this.formulario.value.sexo;

      this.formulario.reset();
      this.socioMod=null;

      this.snackBar.open ("El socio se ha modificado correctamente", "Aceptar", {duration: this.timeSnackBar})
      break;
    }
  }
}
}
