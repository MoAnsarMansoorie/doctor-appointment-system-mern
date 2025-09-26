import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ docId, speciality }) => {
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();

    const [relDoc, setRealDoc] = useState([]);

    const getRelatedDoctors = () => {
        const relatedDoctors = doctors.filter(doc => doc._id !== docId && doc.speciality === speciality);
        setRealDoc(relatedDoctors);
    }

    useEffect(() => {
        getRelatedDoctors();
    }, [docId, speciality, doctors]);

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relDoc.slice(0, 5).map((doctor, index) => (
                    <div onClick={() => { navigate(`/appointment/${doctor._id}`); scrollTo(0,0) }} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                        <img className='bg-blue-50' src={doctor.image} alt={doctor.name} />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                <p className='w-2 h-2 rounded-full bg-green-500'></p><p>Available</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{doctor.name}</p>
                            <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate("/doctors"); scrollTo(0, 0) }} className='bg-blue-50 text-gray-600 rounded-full px-12 py-3 mt-10'>More</button>
        </div>
    );
}

export default RelatedDoctors;