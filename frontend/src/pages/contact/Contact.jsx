    // import React, {useState} from 'react';


    // const Contact = () => {
    //     const [nombre, cambiarNombre] = useState({campo: '', valido: null});
    //     const [correo, cambiarCorreo] = useState({campo: '', valido: null});
    //     const [telefono, cambiarTelefono] = useState({campo: '', valido: null});
    //     const [mensaje, cambiarMensaje] = useState({campo: '', valido: null});
    //     const [terminos, cambiarTerminos] = useState(false);
    //     const [formularioValido, cambiarFormularioValido] = useState(null);
    
    //     const expresiones = {
    //     nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    //     correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    //     telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    //     mensaje: /^[a-zA-ZÀ-ÿ\s.,]{10,200}$/ // Letras y espacios, pueden llevar acentos, puntos y coma.
    //     };
    
    //     const validarCampo = (expresion, campo, cambiarCampo) => {
    //     if (expresion.test(campo)) {
    //         cambiarCampo({ campo, valido: true });
    //     } else {
    //         cambiarCampo({ campo, valido: false });
    //     }
    //     };
    
    //     const handleChange = (e) => {
    //     switch (e.target.name) {
    //         case 'nombre':
    //         validarCampo(expresiones.nombre, e.target.value, cambiarNombre);
    //         break;
    //         case 'correo':
    //         validarCampo(expresiones.correo, e.target.value, cambiarCorreo);
    //         break;
    //         case 'telefono':
    //         validarCampo(expresiones.telefono, e.target.value, cambiarTelefono);
    //         break;
    //         case 'mensaje':
    //         validarCampo(expresiones.mensaje, e.target.value, cambiarMensaje);
    //         break;
    //         default:
    //         break;
    //     }
    //     };
    
    //     const onChangeTerminos = (e) => {
    //     cambiarTerminos(e.target.checked);
    //     };
    
    //     const handleSubmit = (e) => {
    //         e.preventDefault();
        
    //         if (
    //           nombre.valido === true &&
    //           correo.valido === true &&
    //           telefono.valido === true &&
    //           mensaje.valido === true &&
    //           terminos
    //         ) {
    //           cambiarFormularioValido(true);
    //           cambiarNombre({ campo: '', valido: null });
    //           cambiarCorreo({ campo: '', valido: null });
    //           cambiarTelefono({ campo: '', valido: null });
             
    //         // ... 
    //     } else {
    //         cambiarFormularioValido(false);
    //     }
    //     };



    //     return (
    //     <>

    //     </>
    // );
    // }
    // export default Contact;

