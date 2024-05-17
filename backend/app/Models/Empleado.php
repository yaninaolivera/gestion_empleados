<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model{
    use HasFactory;

    protected $fillable = [
        'primer_apellido',
        'segundo_apellido',
        'primer_nombre',
        'otro_nombre',
        'pais_empleo',
        'tipo_identificacion',
        'numero_identificacion',
        'correo_electronico',
        'fecha_ingreso',
        'area'
    ];
}
