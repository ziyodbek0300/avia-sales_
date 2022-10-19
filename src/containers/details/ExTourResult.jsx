import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import order from "../../api/projectApi/order";
import moment from "moment";
import excursionTour from "../../api/projectApi/excursionTour";

function ExTourResult() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    excursionTour.getOne(id).then((res) => {
      setData(res.data.result);
    });
  }, [id]);

  return (
    <div className={"max-w-5xl mx-auto p-4"}>
      <p className={"text-2xl my-3"}>Проверка</p>
      <p className={"text-sm"}>Заказчик</p>
      <div
        className={
          "border border-red-300 flex lg:gap-16 lg:flex-row flex-col rounded-lg p-5 mb-6"
        }
      >
        <div className={"lg:w-1/2 w-full"}>
          <div className={"mb-4 flex justify-between items-center"}>
            <label htmlFor="first">Номер заказа (бронирования): </label>
            <input
              onChange={(e) => setData({ ...data, reference: e.target.value })}
              type="text"
              className={"border-red-300 rounded border p-2"}
              value={moment(data.createdAt).format("MMHHmm")}
              placeholder={"95124"}
            />
          </div>
          <div className={"mb-4 flex justify-between items-center"}>
            <label htmlFor="first"> Фамилия пассажира (латини): </label>
            <input
              onChange={(e) =>
                setData({ ...data, contactName: e.target.value })
              }
              type="text"
              className={"border-red-300 rounded border p-2"}
              value={data.contactName}
            />
          </div>
        </div>
        <div className={"lg:w-1/2 w-full"}>
          <div className={"mb-4 flex justify-between items-center"}>
            <label htmlFor="first">Телефон номер: </label>
            <input
              onChange={(e) => setData({ ...data, phone_no: e.target.value })}
              type="phone"
              className={"border-red-300 rounded border p-2"}
              value={data.phone_no}
            />
          </div>
        </div>
      </div>
      <div className={"border border-red-300 rounded-lg p-5 mb-6"}>
        <div className={"lg:w-4/5 w-full"}>
          <div className={"mb-4 flex justify-between items-center"}>
            <div>
              <p className={"text-2xl"}>
                Заказ ID: {moment(data.createdAt).format("MMHHmm")}
              </p>
              <p className={""}>
                от: {moment(data.startDate).format("YYYY-MM-DD HH:mm")}
              </p>
            </div>
            <div>
              <p className={"text-2xl"}>Сумма:</p>
              <p className={"text-xl"}>
                {data.total}
                <sup>$</sup>
              </p>
            </div>
          </div>
          <div
            className={
              "mb-4 border lg:w-1/2 w-full border-red-400 rounded-lg p-4"
            }
          >
            <p className={"text-lg"}>Статус оплаты</p>
            <div className={"flex"}>
              <p className={"text-lg bg-red-500 text-white p-2"}>Не оплачен</p>
            </div>
          </div>
          <div>
            <div className={""}>
              {data.passagers?.map((pass, index) => {
                return (
                  <div key={pass.id}>
                    <p className="text-2xl my-3">Пассажир {index + 1}</p>
                    <div className={"border-red-500 border rounded mb-4 p-3"}>
                      <div className={"flex items-end mb-3"}>
                        <p>Имя</p>
                        <div
                          className={
                            "border-b border-gray-700 w-full border-dotted"
                          }
                        ></div>
                        <p className={"text-lg font-bold"}>{pass.firtname}</p>
                      </div>
                      <div className={"flex items-end mb-3"}>
                        <p>Фамилия</p>
                        <div
                          className={
                            "border-b border-gray-700 w-full border-dotted"
                          }
                        ></div>
                        <p className={"text-lg font-bold"}>{pass.lastname}</p>
                      </div>
                      <div className={"flex items-end mb-3"}>
                        <p>Национальность</p>
                        <div
                          className={
                            "border-b border-gray-700 w-full border-dotted"
                          }
                        ></div>
                        <p className={"text-lg font-bold"}>
                          {pass.nationality}
                        </p>
                      </div>
                      <div className={"flex items-end mb-3"}>
                        <p>Пол</p>
                        <div
                          className={
                            "border-b border-gray-700 w-full border-dotted"
                          }
                        ></div>
                        <p className={"text-lg font-bold"}>{pass.gender}</p>
                      </div>
                      <div className={"flex items-end mb-3"}>
                        <p>День рождения</p>
                        <div
                          className={
                            "border-b border-gray-700 w-full border-dotted"
                          }
                        ></div>
                        <p className={"text-lg font-bold"}>
                          {moment(pass.birthday).format("DD-MM-YYYY HH:mm")}
                        </p>
                      </div>
                      <div className={"flex items-end mb-3"}>
                        <p>Номер паспорта</p>
                        <div
                          className={
                            "border-b border-gray-700 w-full border-dotted"
                          }
                        ></div>
                        <p className={"text-lg font-bold"}>
                          {pass.passportNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExTourResult;
