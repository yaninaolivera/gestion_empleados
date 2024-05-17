<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class EmpleadoController extends Controller{

    public function index(){
        return null;
    }

    public function buscar(Request $request){
        $lista = DB::table('empleados');
        $campos = [
            'primer_apellido' => 'like',
            'segundo_apellido' => 'like',
            'primer_nombre' => 'like',
            'segundo_nombre' => 'like',
            'otro_nombre' => 'like',
            'pais_empleo' => 'like',
            'tipo_identificacion' => 'like',
            'numero_identificacion' => 'like',
            'correo_electronico' => 'like',
            'area' => 'like'
        ];
        foreach ($campos as $campo => $operacion) {
            $valor = $request->input($campo);
            if (!empty($valor)) {
                $lista->where($campo, $operacion, "%$valor%");
            }
        }
        if (strtolower($request->estado) == "activo") {
            $lista->where("estado", 1);
        }else if (strtolower($request->estado) == "inactivo") {
            $lista->where("estado", 0);
        }
        return $lista->paginate(10);
    }

    public function store(Request $request){
        $validator = $this->validateEmpleado($request);
        if ($validator->fails()) {
            return response()->json(["errors" => "Error formulario"], 422);
        }

        $existe = Empleado::where('tipo_identificacion', $request->tipo_identificacion)
            ->where('numero_identificacion', $request->numero_identificacion)
            ->first();
        if($existe){
            return response()->json(["errors" => "Tipo de identificacion ya existe"], 422);
        }

        $dominio = "@global.com.eu";
        if ($request->pais_empleo == "Colombia") {
            $dominio = "@global.com.co";
        }
        $correo_electronico = strtolower($request->primer_nombre.".".$request->primer_apellido.$dominio);
        $correo_electronico = str_replace(' ', '', $correo_electronico);

        $existe = Empleado::where('correo_electronico', $correo_electronico)->first();
        if ($existe) {
            $id = Empleado::max('id') + 1;
            $correo_electronico = strtolower($request->primer_nombre.".".$request->primer_apellido.".".$id.$dominio);
            $correo_electronico = str_replace(' ', '', $correo_electronico);
        }
        $datosEmpleado = $request->all();
        $datosEmpleado['correo_electronico'] = $correo_electronico;

        Empleado::create($datosEmpleado);
        return response()->json(['message' => 'Formulario enviado correctamente']);
    }

    public function show($id){
        return Empleado::findOrFail($id);
    }

    public function update(Request $request, $id){
        $empleado = Empleado::findOrFail($id);

        $validator = $this->validateEmpleado($request);
        if ($validator->fails()) {
            return response()->json(["errors" => "Error formulario"], 422);
        }

        $existe = Empleado::where('tipo_identificacion', $request->tipo_identificacion)
            ->where('numero_identificacion', $request->numero_identificacion)
            ->first();
        if($existe && $existe->id != $id){
            return response()->json(["errors" => "Tipo de identificacion ya existe"], 422);
        }

        $dominio = "@global.com.eu";
        if ($request->pais_empleo == "Colombia") {
            $dominio = "@global.com.co";
        }
        $correo_electronico = strtolower($request->primer_nombre.".".$request->primer_apellido.$dominio);
        $correo_electronico = str_replace(' ', '', $correo_electronico);

        $existe = Empleado::where('correo_electronico', $correo_electronico)->first();
        if ($existe && $existe->id != $id) {
            $correo_electronico = strtolower($request->primer_nombre.".".$request->primer_apellido.".".$id.$dominio);
            $correo_electronico = str_replace(' ', '', $correo_electronico);
        }
        $datosEmpleado = $request->all();
        $datosEmpleado['correo_electronico'] = $correo_electronico;
        $empleado->update($datosEmpleado);

        return response()->json(['message' => 'Formulario actualizado correctamente']);
    }

    public function destroy($id){
        $empleado = Empleado::findOrFail($id);
        $empleado->delete();

        return response()->json(null, 204);
    }

    private function validateEmpleado($request){
        return Validator::make($request->all(), [
            'primer_apellido' => 'required|string|max:20',
            'segundo_apellido' => 'required|string|max:20',
            'primer_nombre' => 'required|string|max:20',
            'otro_nombre' => 'required|string|max:50',
            'pais_empleo' => 'required|string|max:20',
            'tipo_identificacion' => 'required|string|max:20',
            'numero_identificacion' => 'required|string|max:20',
            'area' => 'required|string|max:20',
            'fecha_ingreso' => [
                'required',
                'date',
                function ($attribute, $value, $fail) {
                    $fechaActual = Carbon::now();
                    $fechaLimite = $fechaActual->copy()->subMonth();
                    if ($fechaActual->lessThan(Carbon::parse($value)) || $fechaLimite->greaterThan(Carbon::parse($value))) {
                        $fail("El campo $attribute no puede ser superior a la fecha actual o hasta un mes menor.");
                    }
                },
            ]
        ]);
    }
}
