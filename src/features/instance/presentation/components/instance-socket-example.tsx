// import React, { useEffect } from 'react';
// import { useSocket } from '@/hooks/useSocket';

// interface InstanceSocketExampleProps {
//   instanceId: string;
// }

// export function InstanceSocketExample({ instanceId }: InstanceSocketExampleProps) {
//   const { isConnected, events, sendMessage } = useSocket(instanceId);

//   useEffect(() => {
//     if (isConnected) {
//       console.log(`Conectado à instância ${instanceId}`);
//     }
//   }, [isConnected, instanceId]);

//   const handleSendMessage = () => {
//     sendMessage({ text: 'Olá, servidor!' });
//   };

//   return (
//     <div className="p-4 border rounded-lg shadow-sm">
//       <h2 className="text-xl font-bold mb-4">Instância: {instanceId}</h2>
      
//       <div className="mb-4">
//         <p>Status: {isConnected ? 'Conectado' : 'Desconectado'}</p>
//         <button 
//           onClick={handleSendMessage}
//           disabled={!isConnected}
//           className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//         >
//           Enviar Mensagem
//         </button>
//       </div>
      
//       <div className="mt-4">
//         <h3 className="font-semibold mb-2">Eventos Recebidos:</h3>
//         <div className="max-h-60 overflow-y-auto border rounded p-2">
//           {events.length === 0 ? (
//             <p className="text-gray-500">Nenhum evento recebido ainda.</p>
//           ) : (
//             events.map((event, index) => (
//               <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
//                 <p className="font-medium">{event.type}</p>
//                 <pre className="text-xs overflow-x-auto">
//                   {JSON.stringify(event.data, null, 2)}
//                 </pre>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// } 