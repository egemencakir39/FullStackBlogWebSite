import React from 'react'

const AddBlogCardModal = ({onClose}) => {
  return (
   <div className='bg-black/80 fixed inset-0 z-50 flex items-center justify-center'>
        <div className='bg-white p-6 rounded-lg w-full max-w-4xl shadow-xl relative'>
            <div className='flex flex-col items-center gap-4'>
                <button onClick={onClose} className='absolute top-6 right-2 '>✕</button>
            </div>
            <div className='flex flex-col gap-4 mt-6'>
                Başlık
                <input type="text" placeholder='Başlık' />
            </div>
            <div className='flex flex-col gap-4 mt-6'>
                Etiket
                <input type="text" placeholder='Etiket' />
            </div>
            
            <div className='flex flex-col gap-4 mt-6'>
                İçerik
                <textarea rows={10} placeholder='İçerik' />
            </div>
            <div className='flex flex-col gap-4 mt-6'>
                <input type="image"/>

            </div>
            <div className='flex justify-end mt-6'>
                <button className=' text-white rounded-md mx-4'>Ekle</button>
            </div>

        </div>
      
    </div>
  )
}

export default AddBlogCardModal
