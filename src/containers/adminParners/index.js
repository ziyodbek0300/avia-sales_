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
        label: 'Название компании',
        isTime: false
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Финансовый статус',
        isTime: false
    },
    {
        id: 'type',
        numeric: true,
        disablePadding: false,
        label: 'Дата создания.',
        isTime: false
    },
];

const AdminPartners = ()=>{
    const [data,setData] = useState([])
    useEffect(()=>{},[])
    return (
        <div>
            <MuiTable
                tableName={"Партнеры"}
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
export default AdminPartners