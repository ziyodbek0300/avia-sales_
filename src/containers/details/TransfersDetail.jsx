import React, { useState } from "react";
import { v4 } from "uuid";
import FormExample from "./FormExample";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import transfers from "../../api/projectApi/transfers";

function TransfersDetail() {
  const { id } = useParams();
  const [adults] = useState(id.split("_")[0]);
  const [children] = useState(id.split("_")[1]);
  const [infants] = useState(id.split("_")[2]);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [comment] = useState("");
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
  // const currentUser = useSelector((state) => state.user.currentUser);

  const onchange = (data) => {
    setPassagers(data);
  };
  const navigate = useNavigate();

  const saveOrder = () => {
    let pass = [];
    passagers.map((p) => {
      pass.push({
        lastname: p.last_name,
        firtname: p.first_name,
        nationality: p.from,
        gender: p.gender,
        birthday: moment(p.birthday).toDate(),
        passportNumber: p.sNum,
        endDate: moment(p.date3).toDate(),
      });
    });

    let time = moment(
      JSON.parse(localStorage.getItem("transfer")).time
    ).toDate();

    let obj = {
      tarnsferFrom: JSON.parse(localStorage.getItem("transfer")).transferFrom,
      tarnsferTo: JSON.parse(localStorage.getItem("transfer")).transferTo,
      time: time || moment(Date.now()).toDate(),
      price: JSON.parse(localStorage.getItem("transfer")).price,
      phone: contactPhone,
      name: contactName,
      description: comment,
      passengers: pass,
    };
    transfers
      .addNew(obj)
      .then((response) => {
        toast("Забронирован");
        navigate(`/transferDetails/result/${response.data?.result?.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={"max-w-5xl mx-auto lg:p-0 px-4"}>
      <div className={"py-3"}>
        <h3>Заказать трансфер</h3>
      </div>
      <div>
        <div className={"mb-3"}>
          <div className={"border border-red-300 rounded-lg p-5"}>
            <div className={"border-b border-red-300 pb-5"}>
              <h4>Контактная информация</h4>
              <p className={"text-xs"}>
                На почту мы отправим электронный билет, на телефон мы позвоним,
                если будут изменения в рейсе или в случае других ситуаций
              </p>
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
                    type={"transfer"}
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
                {JSON.parse(localStorage.getItem("transfer")).price} $
              </p>
              <button
                onClick={saveOrder}
                className={
                  "p-3 rounded-lg border border-red-300 border-red-500 hover:bg-red-500 transition-all hover:text-white"
                }
              >
                Забронировать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransfersDetail;
