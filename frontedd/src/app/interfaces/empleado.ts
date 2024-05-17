export interface Empleado {
    id: bigint,
    primer_apellido: string,
    segundo_apellido: string,
    primer_nombre: string,
    otro_nombre: string,
    pais_empleo: string,
    tipo_identificacion: string,
    numero_identificacion: string,
    correo_electronico: string,
    fecha_ingreso: Date,
    area: string,
    estado: number,
    registro: Date,
    created_at: Date
}

export interface EmpleadoResponse {
    current_page: number,
    data: Empleado[],
    last_page: number,
    total: number
}

export interface EmpleadoPaginacion {
    current_page: number,
    last_page: number,
    total: number
}


export interface EmpleadoBuscar {
    primer_apellido: string,
    segundo_apellido: string,
    primer_nombre: string,
    otro_nombre: string,
    pais_empleo: string,
    tipo_identificacion: string,
    numero_identificacion: string,
    correo_electronico: string,
    area: string,
    estado: string,
}

