import React, {useState} from 'react';
import ReactSelect from "react-select";
import {gender} from "../../constants/userRole";
import countries from "../../constants/countries";
import order from "../../api/projectApi/order";

function FormExample({setPassagers, passagers, index, type}) {
    return (<div className={"max-w-5xl mx-auto pb-5"}>
        <div className='w-[80%]'>
            <p className={"text-2xl text-black font-bold"}>{type === "visa" ? "Владелец визы" : type === "transfer" ? "Человек" : "Пассажир"} {index + 1}</p>
            <div className={"pt-2 flex justify-between lg:flex-row flex-col"}>
                <div className={"py-3 w-full lg:pr-7"}>
                    <input type="text" id={"surname"} placeholder="Фамилия"
                           onInput={(e) => {
                               let a = passagers;
                               a[index].first_name = e.target.value
                               setPassagers(a)
                           }}
                           className={"border  w-full rounded-lg p-2 input_placeholder"}/>
                </div>
                <div className={"py-3 w-full lg:pr-7"}>
                    <input type="text" id={"last_name"} placeholder="Имя"
                           onInput={(e) => {
                               let a = passagers;
                               a[index].last_name = e.target.value
                               setPassagers(a)
                           }}
                           className={"border outline-red-300 w-full rounded-lg p-2 input_placeholder"}/>
                </div>
                <div className={"py-3 w-full lg:pr-7"}>
                    <ReactSelect
                        placeholder="Гражданство"
                        options={countries.map(cName => {
                            return {value: cName, label: cName}
                        })}
                        onChange={(e) => {
                            console.log(passagers)
                            let a = passagers;
                            a[index].from = e.value
                            setPassagers(a)
                        }}
                        className="input_placeholder border rounded-lg"
                    />
                </div>
            </div>
            <div className={"pb-2 flex justify-between lg:flex-row flex-col"}>
                <div className={"py-3 w-[80%] lg:pr-7"}>
                    <ReactSelect
                        placeholder="Пол"
                        options={[{value: gender.male, label: "Мужской"}, {
                            value: gender.female, label: "Женский"
                        }]}
                        onChange={(e) => {
                            let a = passagers
                            a[index].gender = e.value
                            setPassagers(a)
                        }}
                        className="input_placeholder border rounded-lg"
                    />
                </div>
                <div className={"py-3 w-[80%] lg:pr-7"}>
                    <input required type="date" id={"birthday"}
                           placeholder="Дата рождение"
                           onInput={(e) => {
                               let a = passagers
                               a[index].birthday = e.target.value
                               setPassagers(a)
                           }}
                           className={"border input_placeholder outline-red-300 w-[100%] rounded-lg p-2"}/>
                </div>
                <div className={"py-3 w-[80%] lg:pr-7"}>
                    <input required type="text" id={"sNum"}
                           placeholder="Серия и № паспорта"
                           onInput={(e) => {
                               let a = passagers
                               a[index].sNum = e.target.value
                               setPassagers(a)
                           }}
                           className={"border input_placeholder outline-red-300 w-full rounded-lg p-2"}/>
                </div>
                <div className={"py-3 w-[80%] lg:pr-7"}>
                    <input required type="date" id={"date3"}
                           placeholder="Срок действия"
                           onInput={(e) => {
                               let a = passagers
                               a[index].date3 = e.target.value
                               setPassagers(a)
                           }}
                           className={"border input_placeholder outline-red-300 w-full rounded-lg p-2"}/>
                </div>

            </div>
            <div className={"py-3 w-[80%] lg:pr-7"}>
                <label htmlFor={"attachment"}>Фото на паспорт</label>
                <input required type="file" id={"attachment"}
                       onChange={(e) => {
                           let fData = new FormData();
                           fData.append("file", e.target.files[0]);
                           order.attach(fData).then(res => {
                               let a = passagers
                               a[index].filesLink = res.data.attach[0]
                               setPassagers(a)
                           })
                       }}
                       className={"border input_placeholder outline-red-300 w-full rounded-lg p-2"}/>
            </div>
        </div>
    </div>);
}

export default FormExample;

// function FormExample({setPassagers, passagers, index, type}) {
//     return (<div className={"py-5 border-b-2 border-red-300"}>
//         <p className={"text-lg"}>{type === "visa" ? "Владелец визы" : type==="transfer" ? "Человек" : "Пассажир"} {index + 1}</p>
//         <div className={"pt-2 flex justify-between lg:flex-row flex-col"}>
//             <div className={"py-3 w-full lg:pr-10"}>
//                 <label htmlFor="surname" className={"w-full block"}>Фамилия</label>
//                 <input type="text" id={"surname"}
//                        onInput={(e) => {
//                            let a = passagers;
//                            a[index].first_name = e.target.value
//                            setPassagers(a)
//                        }}
//                        className={"border outline-red-300 w-full rounded-lg p-2"}/>
//             </div>
//             <div className={"py-3 w-full lg:pr-10"}>
//                 <label htmlFor="last_name" className={"w-full block"}>Имя</label>
//                 <input type="text" id={"last_name"}
//                        onInput={(e) => {
//                            let a = passagers;
//                            a[index].last_name = e.target.value
//                            setPassagers(a)
//                        }}
//                        className={"border outline-red-300 w-full rounded-lg p-2"}/>
//             </div>
//             <div className={"py-3 w-full lg:pr-10"}>
//                 <label htmlFor="name" className={"w-full block"}>Гражданство</label>
//                 <ReactSelect
//                     options={countries.map(cName => {return {value: cName, label: cName}})}
//                     onChange={(e) => {
//                         let a = passagers;
//                         a[index].from = e.value
//                         setPassagers(a)
//                     }}
//                 />
//             </div>
//         </div>
//         <div className={"pb-2 flex justify-between lg:flex-row flex-col"}>
//             <div className={"py-3 w-full lg:pr-10"}>
//                 <label htmlFor="name" className={"w-full block"}>Пол</label>
//                 <ReactSelect
//                     options={[{value: gender.male, label: "Мужской"}, {
//                         value: gender.female, label: "Женский"
//                     }]}
//                     onChange={(e) => {
//                         let a = passagers
//                         a[index].gender = e.value
//                         setPassagers(a)
//                     }}
//                 />
//             </div>
//             <div className={"py-3 w-full lg:pr-10"}>
//                 <label htmlFor="last_name" className={"w-full block"}>Дата рождение</label>
//                 <input required type="date" id={"birthday"}
//                        onInput={(e) => {
//                            let a = passagers
//                            a[index].birthday = e.target.value
//                            setPassagers(a)
//                        }}
//                        className={"border outline-red-300 w-full rounded-lg p-2"}/>
//             </div>
//             <div className={"py-3 w-full lg:pr-10"}>
//                 <label htmlFor="sNum" className={"w-full block"}>Серия и № паспорта</label>
//                 <input required type="text" id={"sNum"}
//                        onInput={(e) => {
//                            let a = passagers
//                            a[index].sNum = e.target.value
//                            setPassagers(a)
//                        }}
//                        className={"border outline-red-300 w-full rounded-lg p-2"}/>
//             </div>
//             <div className={"py-3 w-full lg:pr-10"}>
//                 <label htmlFor="date3" className={"w-full block"}>Срок действия</label>
//                 <input required type="date" id={"date3"}
//                        onInput={(e) => {
//                            let a = passagers
//                            a[index].date3 = e.target.value
//                            setPassagers(a)
//                        }}
//                        className={"border outline-red-300 w-full rounded-lg p-2"}/>
//             </div>
//         </div>
//     </div>);
// }
