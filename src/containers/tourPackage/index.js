import MuiTable from "../../components/table";
import { Button } from "@mui/material";
import { MainApi } from "../../api/projectApi";
import { GrCheckmark, GrTrash, GrView } from "react-icons/gr";

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Заказ",
    isTime: false,
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Статус",
    isTime: false,
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Оплата",
    isTime: false,
  },
  {
    id: "charterRegular",
    numeric: true,
    disablePadding: false,
    label: "Направление",
    isTime: false,
  },
  {
    id: "detail",
    numeric: true,
    disablePadding: false,
    label: "Даты",
    isTime: false,
  },
  {
    id: "bookingStatus",
    numeric: true,
    disablePadding: false,
    label: "Цена",
    isTime: true,
  },
  {
    id: "paymentStatus",
    numeric: true,
    disablePadding: false,
    label: "Туристы",
    isTime: false,
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "",
    isTime: false,
  },
];
const TourPackage = () => {
  return (
    <div className={"w-full"}>
      <MuiTable
        tableName={"Турпакеты"}
        rows={[]?.map((r) => {
          return {
            ...r,
            edit: (item) => (
              <div>
                <Button
                  variant={"outlined"}
                  onClick={() =>
                    window.open(
                      `${MainApi}/${item.doc}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <GrView fontSize="1.5em" />
                </Button>
                <Button
                  variant={"outlined"}
                  // onClick={() => handlePressAccept(item.id)}
                >
                  <GrCheckmark fontSize="1.5em" />
                </Button>
                <Button
                  variant={"outlined"}
                  // onClick={() => handlePressDelete(item.id)}
                >
                  <GrTrash fontSize="1.5em" />
                </Button>
              </div>
            ),
          };
        })}
        headCells={headCells}
      />
    </div>
  );
};
export default TourPackage;
