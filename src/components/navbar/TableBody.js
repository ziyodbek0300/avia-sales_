import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";
import {HiOutlinePencilAlt } from "react-icons/hi";


function TableBody() {

    return (
        <div className=''>
            <table className="table-auto px-20">
                <thead className='p-4'>
                <tr className='bg-red-600 px-8 text-white'>
                    <td>
                        <input name="cssCheckbox" type="checkbox" className='css-checkbox' />
                    </td>
                    <td className='th'>Админы</td>
                    <td className='th'>ФИО</td>
                    <td className='th'>Город</td>
                    <td className='th'>Телефон</td>
                    <td className='th'>Название компании</td>
                    <td className='th'>Дата создания</td>
                    <td className='th'>Действия</td>
                </tr>
                </thead>
                <tbody className='table-row-group'>
                {[].map((user, index) => {
                    return (
                        <tr className="px-10 table-row even:bg-white odd:bg-[#F1F4FA]" key={index}>
                            <td className=''>
                                <input name="cssCheckbox" defaultChecked={user.checked} type="checkbox" className='css-checkbox' />
                            </td>
                            <td className='table_data'>{user.admin}</td>
                            <td className='table_data'>{user.name}</td>
                            <td className='table_data'>{user.city}</td>
                            <td className='table_data'>{user.phone}</td>
                            <td className='table_data'>{user.company}</td>
                            <td className='table_data'>{user.dateOfCreation}</td>
                            <td className='flex gap-3 items-center justify-center'>
                                <RiDeleteBin5Line className='text-xl'/>
                                <HiOutlinePencilAlt className='text-xl'/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default TableBody