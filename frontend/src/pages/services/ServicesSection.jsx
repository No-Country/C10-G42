import React from 'react'

const ServicesSection = () => {
 
    const servicesHos = [
        {
          title: 'Consultas médicas generales',
          description: 'Realizamos consultas médicas generales para tratar cualquier problema de salud que puedas tener.'
        },
        {
          title: 'Exámenes de laboratorio',
          description: 'Ofrecemos una amplia variedad de exámenes de laboratorio para ayudar en el diagnóstico y tratamiento de enfermedades.'
        },
        {
          title: 'Control de embarazo',
          description: 'Brindamos un seguimiento completo y personalizado durante todo el proceso de embarazo para asegurar la salud de la madre y el bebé.'
        },
        {
          title: 'Planificación familiar',
          description: 'Ofrecemos servicios de asesoramiento y métodos anticonceptivos para ayudar a las personas a planificar su familia según sus necesidades.'
        },
        {
          title: 'Vacunación',
          description: 'Ofrecemos una variedad de vacunas para prevenir enfermedades infecciosas y proteger la salud de nuestros pacientes.'
        }
      ];
 
 
 
    return (
    <div>
          <div className="bg-gray-100 py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nuestros servicios
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Realizamos chequeos médicos completos y personalizados para asegurarnos de que estés en las mejores condiciones de salud. Ofrecemos servicios de diagnóstico y tratamientos para una amplia variedad de enfermedades y afecciones, siempre con un enfoque en la prevención y el bienestar a largo plazo. Nuestro equipo de médicos altamente capacitados y especializados en diversas áreas están aquí para ayudarte a sentirte mejor y vivir mejor.
          </p>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
           
           {servicesHos.map((service) =>{
            return(
 <div className="pt-6">
 <div className="flow-root bg-white rounded-lg shadow-sm">
   <div className="-mt-px flex justify-between items-center py-5 px-4 sm:py-6 sm:px-6">
     <div className="flex-grow">
       <h3 className="text-base font-medium text-gray-900">
         {service.title}
       </h3>
     </div>
     <div className="ml-4 flex-shrink-0">
       <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
         Disponible
       </span>
     </div>
   </div>
   <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
     <p className="text-base text-gray-500">
      {service.description}
     </p>
   </div>
 </div>
</div>
          ) })}
          


            </div>
            </div>
            </div>
            </div>
      

    </div>
  )
}

export default ServicesSection