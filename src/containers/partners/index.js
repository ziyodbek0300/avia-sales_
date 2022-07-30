import {useEffect, useState} from "react";
import MuiTable from "../../components/table";
import {Button} from "@mui/material";
import {MainApi} from "../../api/projectApi";
import {GrCheckmark, GrTrash, GrView} from "react-icons/gr";

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'Дата',
        isTime: false
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Основание',
        isTime: false
    },
    {
        id: 'type',
        numeric: true,
        disablePadding: false,
        label: 'Сумма',
        isTime: false
    },
];
const TourPackage = ()=>{
    const [data,setData] = useState([])
    useEffect(()=>{},[])
    return (
        <div>
            <MuiTable
                tableName={"Баланс: -302$"}
                rows={[]?.map(r => {
                    return {
                        ...r,
                        edit: (item) => (
                            <div>
                                <Button
                                    variant={"outlined"}
                                    onClick={() => window.open(
                                        `${MainApi}/${item.doc}`,
                                        '_blank',
                                        'noopener,noreferrer')
                                    }
                                >
                                    <GrView fontSize="1.5em"/>
                                </Button>
                                <Button
                                    variant={"outlined"}
                                    // onClick={() => handlePressAccept(item.id)}
                                >
                                    <GrCheckmark fontSize="1.5em"/>
                                </Button>
                                <Button
                                    variant={"outlined"}
                                    // onClick={() => handlePressDelete(item.id)}
                                >
                                    <GrTrash fontSize="1.5em"/>
                                </Button>
                            </div>
                        )
                    }
                })}
                headCells={headCells}
            />
        </div>
    )
}
export default TourPackage