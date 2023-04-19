    import React, {useState} from 'react';
import './index.css';
    const Contact = () => {
        const [nombre, cambiarNombre] = useState({campo: '', valido: null});
        const [correo, cambiarCorreo] = useState({campo: '', valido: null});
        const [telefono, cambiarTelefono] = useState({campo: '', valido: null});
        const [mensaje, cambiarMensaje] = useState({campo: '', valido: null});
        const [terminos, cambiarTerminos] = useState(false);
        const [formularioValido, cambiarFormularioValido] = useState(null);
    
        const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/, // 7 a 14 numeros.
        mensaje: /^[a-zA-ZÀ-ÿ\s.,]{10,200}$/ // Letras y espacios, pueden llevar acentos, puntos y coma.
        };
    
        const validarCampo = (expresion, campo, cambiarCampo) => {
        if (expresion.test(campo)) {
            cambiarCampo({ campo, valido: true });
        } else {
            cambiarCampo({ campo, valido: false });
        }
        };
    
        const handleChange = (e) => {
   
        };
    
        const onChangeTerminos = (e) => {
        cambiarTerminos(e.target.checked);
        };
    
        const onSubmit = (e) => {
            e.preventDefault();
        
            if (
              nombre.valido === true &&
              correo.valido === true &&
              telefono.valido === true &&
              mensaje.valido === true &&
              terminos 
            ) {
              cambiarFormularioValido(true);
              cambiarNombre({ campo: '', valido: null });
              cambiarCorreo({ campo: '', valido: null });
              cambiarTelefono({ campo: '', valido: null });
             
            // ... 
        } else {
            cambiarFormularioValido(false);
        }
        };



        return (
        <>
                  

                  <div className="text-center services-title">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          ¿Necesitas ayuda?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
          Contáctanos
          </p>
        </div>
     

   


        <form  className='max-w-xl mx-auto mt-5 p-5  formulario rounded-lg shadow-lg' onSubmit={onSubmit}>

    <div>
    <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3 mb-6 md:mb-0">
    <div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="correo">Correo Electrónico:</label>
        <input
            type="email"
            id="correo"
            name="correo"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
   
            onChange={handleChange}
          />
        {correo.valido === false && (
        <span className="error">{correo.mensaje}</span>
        )}
    </div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nombre">Nombre:</label>
        <input
            type="text"
            id="nombre"
            name="nombre"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
         
            onChange={handleChange}
           />
        {nombre.valido === false && (
        <span className="error">{nombre.mensaje}</span>
        )}
    
  

    <div>
        <label  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="telefono">Teléfono:</label>
        <input
        className=" tel appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
            type="text"
            id="telefono"
            name="telefono"
  
            
            onChange={handleChange}
            />
        {telefono.valido === false && (
        <span className="error">{telefono.mensaje}</span>
        )}
    </div>
            
    <div className="mensaje">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="mensaje">Mensaje:</label>
        <textarea  
      
            id="mensaje"
            name="mensaje"
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none'
   
            onChange={handleChange}
            
         ></textarea>
        {mensaje.valido === false && (
        <span className="error">{mensaje.mensaje}</span>
        )}
    </div>
    <div>
        </div>

                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="terminos">
                    <input 
                        type="checkbox"
                        name="terminos"
                        id="terminos"
                        checked={terminos} 
                        onChange={onChangeTerminos}
                    />
                    Acepto los Terminos y Condiciones
                </label>
            </div>
            
    </div>
    </div>
            {formularioValido === false && (
                <p className="text-red-500">
                
                    <b>Error:</b> Por favor rellena el formulario correctamente.
                </p>
            )}
            <div className="flex justify-center">
                <button 
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Enviar
                </button>
            </div>
            {formularioValido === true && (
                <p className="text-green-500">Formulario enviado exitosamente!</p>
            )}
</form>
</>
    );
    }
    export default Contact;

