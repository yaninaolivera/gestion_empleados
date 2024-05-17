<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->id();
            $table->string('primer_apellido', 20);
            $table->string('segundo_apellido', 20);
            $table->string('primer_nombre', 20);
            $table->string('otro_nombre', 50);
            $table->string('pais_empleo', 20);
            $table->string('tipo_identificacion', 30);
            $table->string('numero_identificacion', 20);
            $table->string('correo_electronico', 300)->unique();
            $table->date('fecha_ingreso');
            $table->string('area', 20);
            $table->integer('estado')->default(1);
            $table->dateTime('registro')->default(DB::raw('NOW()'));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('empleados');
    }
};
