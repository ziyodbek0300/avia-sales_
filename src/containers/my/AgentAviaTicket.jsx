import {useEffect} from "react";
import MuiTable from "../../components/table";
import {Button} from "@mui/material";
import {MainApi} from "../../api/projectApi";
import {GrCheckmark, GrTrash, GrView} from "react-icons/gr";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAllOrder, getAllOrderForAgent} from "../../redux/orders/actions";
import {useTranslation} from "react-i18next";

const AgentAviaTicket = ({agentId}) => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user?.currentUser?.id);
    const orders = useSelector(state => state.orders.order);
    const navigate = useNavigate()
    const {t} = useTranslation();

    useEffect(() => {
        dispatch(getAllOrderForAgent(agentId || userId))
    }, [dispatch, agentId, userId, orders]);

    const headCells = [
        {
            id: 'price',
            numeric: true,
            disablePadding: false,
            label: t('price') + "",
            isTime: false
        },
        {
            id: 'startDate',
            numeric: true,
            disablePadding: false,
            label: t("startDate"),
            isTime: true
        },
        {
            id: 'endDate',
            numeric: true,
            disablePadding: false,
            label: t('endDateTableHeader'),
            isTime: true
        },
        {
            id: 'comment',
            numeric: true,
            disablePadding: false,
            label: t('Comment'),
            isTime: false
        },
        {
            id: 'contactName',
            numeric: true,
            disablePadding: false,
            label: t("contactName"),
            isTime: false
        }, {
            id: 'phone',
            numeric: true,
            disablePadding: false,
            label: t('phone'),
            isTime: false
        },
        {
            id: 'createdAt',
            numeric: true,
            disablePadding: false,
            label: t("createdDate"),
            isTime: true
        },
    ]

    return (
        <div>
            <MuiTable
                tableName={"Авиабилет"}
                rows={orders?.map(r => {
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
                onClickRow={(r) => {
                    // console.log(r);
                    navigate(`/details/result/${r.id}`)
                }}
            />
        </div>
    )
}
export default AgentAviaTicket
