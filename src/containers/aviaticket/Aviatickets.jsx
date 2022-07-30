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
        label: 'Id',
        isTime: false
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Date',
        isTime: false
    },
    {
        id: 'type',
        numeric: true,
        disablePadding: false,
        label: 'Type',
        isTime: false
    },
    {
        id: 'charterRegular',
        numeric: true,
        disablePadding: false,
        label: 'Charter/Regular',
        isTime: false
    },
    {
        id: 'detail',
        numeric: true,
        disablePadding: false,
        label: 'Detail',
        isTime: false
    },
    {
        id: 'bookingStatus',
        numeric: true,
        disablePadding: false,
        label: 'Booking status',
        isTime: true
    },
    {
        id: 'paymentStatus',
        numeric: true,
        disablePadding: false,
        label: 'Payment status',
        isTime: false
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
        isTime: false
    },
    {
        id: 'passengers',
        numeric: true,
        disablePadding: false,
        label: 'Passengers',
        isTime: false
    },
    {
        id: 'comment',
        numeric: true,
        disablePadding: false,
        label: 'Comment',
        isTime: false
    },
];
const Aviaticket = ()=>{
    const [data,setData] = useState([])
    useEffect(()=>{},[])
    return (
        <div>
            <MuiTable
                tableName={"Avia tickets"}
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
export default Aviaticket