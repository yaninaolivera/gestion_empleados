<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Empleado;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Empleado>
 */
class EmpleadoFactory extends Factory
{
    protected $model = Empleado::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'primer_apellido' => substr($this->faker->word(), 0, 20),
            'segundo_apellido' => substr($this->faker->word(), 0, 20),
            'primer_nombre' => substr($this->faker->word(), 0, 20),
            'otro_nombre' => substr($this->faker->word(), 0, 50),
            'pais_empleo' => $this->faker->randomElement($array = array('Colombia', 'Estados Unidos')),
            'tipo_identificacion' => $this->faker->randomElement($array = array('Pasaporte', 'Permiso Especial')),
            'numero_identificacion' => substr($this->faker->word(), 0, 20),
            'correo_electronico' => $this->faker->email,
            'fecha_ingreso' => $this->faker->date('Y-m-d'),
            'area' => $this->faker->randomElement($array = array('Administración', 'Financiera', 'Compras')),
        ];
    }
}