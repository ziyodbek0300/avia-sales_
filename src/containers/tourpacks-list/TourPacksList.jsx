import React, { useEffect, useState } from "react";
import regions from "../../api/projectApi/regions";
import moment from "moment";
import { GrEdit, GrTrash } from "react-icons/gr";
import RegionModal from "../../components/modal/RegionModal";
import tourOrder from "../../api/projectApi/tourOrder";

function TourList() {
  const [regions_list, setTourList] = useState([]);

  useEffect(() => {
    tourOrder.getAll().then((res) => setTourList(res.data.result));
  }, []);

  const handleDelete = (id) => {
    const confirmation = window.confirm("Are you sure to delete this region?");
    if (confirmation) {
      regions
        .deleteOne(id)
        .then(() => regions_list.filter((a) => a.id !== id))
        .catch(() => regions_list.filter((a) => a.id !== id));
      regions.getAllTourList().then((res) => {
        setTourList(res.data.result[0]);
      });
    }
  };

  const [userModal, setUserModal] = useState({
    typeModal: "create",
    openModal: false,
    values: {},
  });

  const handleClose = () => {
    setUserModal({
      typeModal: "create",
      openModal: false,
      values: {},
    });
  };

  const handlePressItemEdit = (type, item) => {
    setUserModal({
      typeModal: type,
      openModal: true,
      values: item,
    });
  };

  return (
    <div className={"w-full"}>
      <div className="max-w-5xl m-auto p-5">
        <div className={"text-right py-3"}>
          {/*<button*/}
          {/*  className={*/}
          {/*    "p-2 border border-gray-400 text-white rounded bg-green-500 transition"*/}
          {/*  }*/}
          {/*  onClick={() => handlePressItemEdit("create")}*/}
          {/*>*/}
          {/*  Добавит регион*/}
          {/*</button>*/}
        </div>
        <table className={"w-full border border-red-200"}>
          <thead>
            <tr className={"border border-red-200"}>
              <th className={"p-2 border border-red-200"}>Имя</th>
              <th className={"p-2 border border-red-200"}>Создано на</th>
              <th className={"p-2 border border-red-200"}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {regions_list?.length === 0 ? (
              <tr className={"border border-red-200"}>
                <td
                  colSpan={3}
                  className={"border border-red-200 p-2 text-center"}
                >
                  Нет данных
                </td>
              </tr>
            ) : (
              regions_list?.map((a) => {
                return (
                  <tr key={a.id} className={"border border-red-200"}>
                    <td className={"border border-red-200 p-2"}>{a.name}</td>
                    <td className={"border border-red-200 p-2"}>
                      {moment(a.createdAt).format("MMMM DD YYYY HH:mm")}
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
                      <button
                        className={
                          "p-2 border border-red-200 rounded hover:bg-gray-200 transition"
                        }
                        onClick={() => handlePressItemEdit("update", a)}
                      >
                        <GrEdit fontSize="1.5em" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/*<RegionModal*/}
      {/*  type={userModal.typeModal}*/}
      {/*  open={userModal.openModal}*/}
      {/*  handleClose={handleClose}*/}
      {/*  values={userModal.values}*/}
      {/*  setTourList={setTourList}*/}
      {/*/>*/}
    </div>
  );
}

export default TourList;
