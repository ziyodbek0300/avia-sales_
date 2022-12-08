import React, { useState } from "react";
import { v4 } from "uuid";
import FormExample from "./FormExample";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import excursionTour from "../../api/projectApi/excursionTour";
import warning from '../../static/images/warning.svg'

function ExcursionDetail() {
  const { id } = useParams();
  const [typeET] = useState(id.split("_")[0]);
  const [costET] = useState(id.split("_")[1]);
  const [adults] = useState(id.split("_")[2]);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const navigate = useNavigate();
  const [passagers, setPassagers] = useState(
      new Array(+adults).fill({
        first_name: "",
        last_name: "",
        from: "",
        gender: "",
        birthday: "",
        sNum: "",
        date3: "",
      })
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const onchange = (data) => {
    setPassagers(data);
  };

  const saveOrder = () => {
    let pass = [];
    // eslint-disable-next-line array-callback-return
    passagers.map((p) => {
      pass.push({
        lastname: p.last_name,
        firtname: p.first_name,
        nationality: p.from,
        gender: p.gender,
        filesLink: p.filesLink,
        birthday: moment(p.birthday).toDate(),
        passportNumber: p.sNum,
        endDate: moment(p.date3).toDate(),
      });
    });

    let obj = {
      price: +costET,
      phone_no: contactPhone,
      contactName: contactName,
      passagers: pass,
      total: currentUser ? +costET : +costET + 100,
    };
    excursionTour
      .addNew(obj)
      .then((response) => {
        toast("Забронирован");
        navigate(`/details/exTourResult/${response.data.result.order.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={"max-w-5xl mx-auto lg:p-0"}>
      <div className="flex items-center gap-3 px-5 py-4 mb-10 rounded-xl bg-rose-100">
        <img src={warning} alt="warning" />
        <div className="">
          <p className={"text-2xl font-bold text-red-500"}>Предупреждение</p>
          <p className={"text-base font-medium m-0"}>
            (мы оставляем за собой право сменить отель по какой либо причине) Напоминаем,что тур является невозвратным.
          </p>
        </div>
      </div>
      <div className={"py-3 text-center text-4xl text-black font-bold"}>
        <h3>Заказать экскурсионний тур <span className="text-red-600">({typeET})</span></h3>
      </div>
      <div className={""}>
        <div className={"rounded-lg p-5"}>
          <div className={"pb-5"}>
            <p className="text-2xl text-black font-bold py-2">Контактная информация</p>
            <p className={"w-[50%]"}>
              На почту мы отправим электронный билет, на телефон мы позвоним,
              если будут изменения в рейсе или в случае других ситуаций
            </p>
          </div>
          <div className={" w-[53%] flex justify-between lg:flex-row flex-col"}>
            <div className={"py-3 w-full lg:pr-7"}>
              <input
                placeholder="Имя"
                type="text"
                onInput={(e) => setContactName(e.target.value)}
                className={
                  "outline-red-300 w-full border rounded-lg p-2 input_placeholder"
                }
              />
            </div>
            <div className={"py-3 w-full lg:pr-7"}>
              <input
                placeholder="Телефон"
                type="text"
                onInput={(e) => setContactPhone(e.target.value)}
                className={
                  "outline-red-300 w-full border rounded-lg p-2 input_placeholder"
                }
              />
            </div>
          </div>
        </div>
        <div className={"mb-3 border-b-2 border-b-red-500"}>
          <div className={"rounded-lg p-5"}>
            {new Array(+adults).fill(null).map((a, index) => {
              console.log("saassas")
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
        <div className={"flex w-full flex-col justify-start"}>
          <div className="flex gap-4 items-center mt-7 mb-10">
            <p style={{ fontSize: "24px", fontWeight: "bold" }} className={""}>Итого:</p>
            <p className={"text-4xl font-bold text-red-500 mb-1"}>{costET} $</p>
          </div>
          <button
            onClick={saveOrder}
            className={
              "px-3 w-[30%] rounded-lg border-2 font-bold text-red-500 py-2 mb-10 border-red-500 hover:bg-red-500 transition-all hover:text-white"
            }
          >
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExcursionDetail;
