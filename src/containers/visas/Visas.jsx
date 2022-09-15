import React, { useEffect, useState } from "react";
import { userRole } from "../../constants/userRole";
import { v4 } from "uuid";
import moment from "moment/moment";
import { GrTrash } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getAllVisas } from "../../redux/visas/actions";
import VisasModal from "../../components/modal/VisasModal";
import { toast } from "react-toastify";
import visas from "../../api/projectApi/visas";

function Visas() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.visas.visas);

  useEffect(() => {
    dispatch(getAllVisas());
  }, []);

  console.log(selector);

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure to delete this visa?");
    if (confirmation) {
      await visas.deleteOne(id).then((data) => toast("Deleted", "success"));
      dispatch(getAllVisas());
    }
  };

  const [flightModal, setFlightModal] = useState({
    typeModal: "create",
    openModal: false,
    values: {},
  });

  const handleClose = () => {
    setFlightModal({
      typeModal: "create",
      openModal: false,
      values: {},
    });
  };

  const handlePressItemEdit = (type, item) => {
    setFlightModal({
      typeModal: type,
      openModal: true,
      values: item,
    });
  };
  return (
    <div>
      <div className="max-w-5xl m-auto p-5">
        <div className={"text-right py-3"}>
          <button
            className={
              "p-2 border border-gray-400 text-white rounded bg-green-500 transition"
            }
            onClick={() =>
              handlePressItemEdit("create", { role: userRole.admin })
            }
          >
            Добавит Виза
          </button>
        </div>
        <table className={"w-full border border-red-200"}>
          <thead>
            <tr className={"border border-red-200"}>
              <th className={"p-2 border border-red-200"}>Имя</th>
              <th className={"p-2 border border-red-200"}>Телефон</th>
              <th className={"p-2 border border-red-200"}>Тип визы</th>
              <th className={"p-2 border border-red-200"}>Расположение</th>
              <th className={"p-2 border border-red-200"}>Цена</th>
              <th className={"p-2 border border-red-200"}>Дата</th>
              <th className={"p-2 border border-red-200"}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {selector?.length === 0 ? (
              <tr className={"border border-red-200"}>
                <td
                  colSpan={3}
                  className={"border border-red-200 p-2 text-center"}
                >
                  Нет данных
                </td>
              </tr>
            ) : (
              selector?.map((a) => {
                return (
                  <tr key={v4()}>
                    <td className={"border border-red-200 p-2"}>
                      {a?.location}
                    </td>
                    <td className={"border border-red-200 p-2"}>{a?.phone}</td>
                    <td className={"border border-red-200 p-2"}>
                      {a?.visaType}
                    </td>
                    <td className={"border border-red-200 p-2"}>
                      {a?.location}
                    </td>
                    <td className={"border border-red-200 p-2"}>{a.price} $</td>
                    <td className={"border border-red-200 p-2"}>
                      {moment(a.date).format("MMMM DD YYYY")}
                    </td>
                    <td className={"border border-red-200 p-2"}>
                      <button
                        className={
                          "p-2 border border-red-200 rounded hover:bg-gray-200 transition"
                        }
                        onClick={() => handleDelete(a.id)}
                      >
                        <GrTrash fontSize="1.5em" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <VisasModal
        type={flightModal.typeModal}
        open={flightModal.openModal}
        handleClose={handleClose}
        values={flightModal.values}
        // setFlights={setFlights}
      />
    </div>
  );
}

export default Visas;
