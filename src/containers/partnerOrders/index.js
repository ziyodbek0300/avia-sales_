import {useEffect} from "react";
import MuiTable from "../../components/table";
import {Button} from "@mui/material";
import {MainApi} from "../../api/projectApi";
import {GrCheckmark, GrTrash, GrView} from "react-icons/gr";
import {useDispatch, useSelector} from "react-redux";
import {getAllUser} from "../../redux/user/actions";
import Store from "../../redux"
import {useNavigate} from "react-router-dom";
import {getAllOrder} from "../../redux/orders/actions";

const headCells = [
    {
        id: 'nameCompany',
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
        id: 'createdAt',
        numeric: true,
        disablePadding: false,
        label: 'Дата создания.',
        isTime: true
    },
];

const sortAgents = state => {
    const user = Store().store.getState().user
    return state.user.users.agent.filter(r => {
        return r.partnerId = user
    })
}

const PartnerOrder = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllOrder())
    }, [])
    const navigate = useNavigate()

    const agents = useSelector(sortAgents)
    return (
        <div>
            <MuiTable
                tableName={"Партнеры"}
                rows={agents?.map(r => {
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
                onClickRow={() => {
                    navigate(`/partners/orders/asasdad`)
                }}
            />
        </div>
    )
}
export default PartnerOrder
