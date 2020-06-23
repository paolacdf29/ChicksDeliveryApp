import { EmailValidator } from '@angular/forms'

export interface categories{
    id_cat: number,
    nombre_cat: string,
    descripcion_cat: string,
    color: string,
    icon: string
}

export interface items{
    id_P: number,
    id_r_p: number,
    Nombre: string,
    descripcion: string,
    id_cat_o: number,
    pic: string,
    precio: number,
    big: number,
    xl: number,
}

export interface precompra{
    id_order?: number,
    id_p: number,
    nombre: string,
    comentario?: string,
    cantidad: number,
    dismiss?: string,
    extras?: string,
    sides?: string,
    recargo?: number,
    price: number
}

export interface ingredient {
    id_i: number;
    id_r_i: number;
    nombre: string;
    type: string;
    valor?: number;
}

export interface user{
    Nombre_client?: string;
    Apellido_client?: string;
    mail_client: string
    Telefono_client?: number;
    direccion_client: string;
    password?: string;
    confirmado?: string;
}

export interface orden{
    id_d: number;
    id_c_d: number;
    id_r_d: number;
    fecha?: Date;
    Comentarios?: string;
    stp1?: number;
    stp2?: number;
    completado?: number;
    total?: number;

}

export interface rest{
    id_r: number;
    name: string;
    address: string;
    phone: number;
    horario: string;
    logo: string;
    deli_fee: number;
    delivery: number;
    takeaway: number;
    id_c_r: number;
    open: number;

}

export interface customStep{
    code: string;
    descripcion: string;
    id_cc: number;
    id_p_cc: number;
    id_r_cc: number;
    max: number;
    min: number;
    nombre: string;
}