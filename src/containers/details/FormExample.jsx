import React, {useState} from 'react';
import ReactSelect from "react-select";
import {gender} from "../../constants/userRole";

function FormExample({setPassagers, passagers, index}) {
    console.log(passagers)
    return (<div className={"py-5 border-b-2 border-red-300"}>
        <p className={"text-lg"}>Пассажир {index + 1}</p>
        <div className={"pt-2 flex justify-between lg:flex-row flex-col"}>
            <div className={"py-3 w-full lg:pr-10"}>
                <label htmlFor="surname" className={"w-full block"}>Фамилия</label>
                <input type="text" id={"surname"}
                       onInput={(e) => {
                           let a = passagers
                           a[index].first_name = e.target.value
                           setPassagers(a)
                       }}
                       className={"border outline-red-300 w-full rounded-lg p-2"}/>
            </div>
            <div className={"py-3 w-full lg:pr-10"}>
                <label htmlFor="last_name" className={"w-full block"}>Имя</label>
                <input type="text" id={"last_name"}
                       onInput={(e) => {
                           let a = passagers
                           a[index].last_name = e.target.value
                           setPassagers(a)
                       }}
                       className={"border outline-red-300 w-full rounded-lg p-2"}/>
            </div>
            <div className={"py-3 w-full lg:pr-10"}>
                <label htmlFor="name" className={"w-full block"}>Гражданство</label>
                <ReactSelect
                    options={[{value: "uzbek", label: "Uzbekistan"}, {
                        value: "russian", label: "Russia"
                    }]}
                    onChange={(e) => {
                        let a = passagers
                        a[index].from = e.value
                        setPassagers(a)
                    }}
                />
            </div>
        </div>
        <div className={"pb-2 flex justify-between lg:flex-row flex-col"}>
            <div className={"py-3 w-full lg:pr-10"}>
                <label htmlFor="name" className={"w-full block"}>Пол</label>
                <ReactSelect
                    options={[{value: gender.male, label: "Мужской"}, {
                        value: gender.female, label: "Женский"
                    }]}
                    onChange={(e) => {
                        let a = passagers
                        a[index].gender = e.value
                        setPassagers(a)
                    }}
                />
            </div>
            <div className={"py-3 w-full lg:pr-10"}>
                <label htmlFor="last_name" className={"w-full block"}>Дата рождение</label>
                <input type="date" id={"birthday"}
                       onInput={(e) => {
                           let a = passagers
                           a[index].birthday = e.target.value
                           setPassagers(a)
                       }}
                       className={"border outline-red-300 w-full rounded-lg p-2"}/>
            </div>
            <div className={"py-3 w-full lg:pr-10"}>
                <label htmlFor="sNum" className={"w-full block"}>Серия и № паспорта</label>
                <input type="text" id={"sNum"}
                       onInput={(e) => {
                           let a = passagers
                           a[index].sNum = e.target.value
                           setPassagers(a)
                       }}
                       className={"border outline-red-300 w-full rounded-lg p-2"}/>
            </div>
            <div className={"py-3 w-full lg:pr-10"}>
                <label htmlFor="date3" className={"w-full block"}>Срок действия</label>
                <input type="date" id={"date3"}
                       onInput={(e) => {
                           let a = passagers
                           a[index].date3 = e.target.value
                           setPassagers(a)
                       }}
                       className={"border outline-red-300 w-full rounded-lg p-2"}/>
            </div>
        </div>
    </div>);
}

export default FormExample;
