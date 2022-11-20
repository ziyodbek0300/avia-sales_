import React, { useState } from "react";
import { v4 } from "uuid";
import FormExample from "./FormExample";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import visas from "../../api/projectApi/visas";
import { VISA_STATE, VISAS } from "../../constants/visas";

// import order from "../../../sales-backend/controller";

function VisaDetails() {
  const { id } = useParams();
  const [adults] = useState(id.split("_")[0]);
  const [children] = useState(id.split("_")[1]);
  const [infants] = useState(id.split("_")[2]);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [passagers, setPassagers] = useState(
    new Array(+adults + +children + +infants).fill({
      first_name: "",
      last_name: "",
      from: "",
      gender: "",
      birthday: "",
      sNum: "",
      date3: "",
    })
  );
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const onchange = (data) => {
    setPassagers(data);
  };

  const saveOrder = (e) => {
    e.preventDefault();
    let pass = [];
    // eslint-disable-next-line array-callback-return
    passagers.map((p) => {
      pass.push({
        lastname: p.last_name,
        firtname: p.first_name,
        nationality: p.from,
        gender: p.gender,
        birthday: moment(p.birthday).toDate(),
        passportNumber: p.sNum,
        filesLink: p.filesLink,
        endDate: moment(p.date3).toDate(),
      });
    });

    let locationIndex = JSON.parse(localStorage.getItem("visa")).location;
    let vTypeIndex = JSON.parse(localStorage.getItem("visa")).visaType;

    let obj = {
      visaType: VISAS[vTypeIndex],
      location: VISA_STATE[locationIndex],
      date: moment(JSON.parse(localStorage.getItem("visa")).date).toDate(),
      passengers: pass,
      price: JSON.parse(localStorage.getItem("visa")).price,
      phone: contactPhone,
      name: contactName,
    };
    visas
      .addNew(obj)
      .then((response) => {
        toast("Забронирован");
        navigate(`/details/visaResult/${response.data.result.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={"max-w-5xl mx-auto lg:p-0 px-4"}>
      <div className={"py-3"}>
        <h3>Заказать виза</h3>
      </div>
      <div>
        <form onSubmit={saveOrder}>
          <div className={"mb-3"}>
            <div className={"border border-red-300 rounded-lg p-5"}>
              <div className={"border-b border-red-300 pb-5"}>
                <h4>Контактная информация</h4>
              </div>
              <div className={"py-3 flex justify-between lg:flex-row flex-col"}>
                <div className={"py-3 w-full lg:pr-10"}>
                  <label htmlFor="name" className={"w-full block"}>
                    Имя
                  </label>
                  <input
                    type="text"
                    onInput={(e) => setContactName(e.target.value)}
                    className={
                      "border border-red-300 outline-red-300 w-full rounded-lg p-2"
                    }
                  />
                </div>
                <div className={"py-3 w-full lg:pr-10"}>
                  <label htmlFor="phone" className={"w-full block"}>
                    Телефон
                  </label>
                  <input
                    type="text"
                    onInput={(e) => setContactPhone(e.target.value)}
                    className={
                      "border border-red-300 outline-red-300 w-full rounded-lg p-2"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={"mb-3"}>
            <div className={"border border-red-300 rounded-lg p-5"}>
              <div className={"border-b border-red-300 pb-5"}>
                <h4>Информация о пассажирах</h4>
                <p className={"text-xs"}>
                  Введите личные данные пассажиров, как указано в документе
                  (паспорте), по которому они полетят. Поля нужно заполнять
                  латинскими буквами.
                </p>
              </div>
              {new Array(+adults + +children + +infants)
                .fill(null)
                .map((a, index) => {
                  return (
                    <FormExample
                      type={"visa"}
                      key={v4()}
                      setPassagers={onchange}
                      passagers={passagers}
                      index={index}
                    />
                  );
                })}
            </div>
          </div>
          <div className={"border border-red-300 p-5 mb-3 rounded-lg"}>
            <div
              className={
                "flex justify-between lg:flex-row flex-col lg:flex-row flex-col gap-5  items-center"
              }
            >
              <div className={"flex w-full justify-between"}>
                <p className={"text-2xl"}>
                  {JSON.parse(localStorage.getItem("visa")).price} $
                </p>
                <button
                  type={"submit"}
                  className={
                    "p-3 rounded-lg border border-red-300 border-red-500 hover:bg-red-500 transition-all hover:text-white"
                  }
                >
                  Забронировать
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VisaDetails;
