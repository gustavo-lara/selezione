import React from 'react';


export function Toast({ message }) {
  if (!message) return null;

  return (
    <div >
      
      {message}
    </div>
  );
}
