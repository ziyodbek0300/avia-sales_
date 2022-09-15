import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import transfers from "../../api/projectApi/transfers";
import { toast } from "react-toastify";
import i18next from "i18next";
import moment from "moment";
const t = i18next.t;

function Result() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(id);
  const navigate = useNavigate();
  useEffect(() => {
    transfers
      .getOne(id)
      .then((r) => {
        if (r.data?.result) {
          setData(r.data.result);
        } else {
          toast(t("notFoundTransfer"));
        }
      })
      .catch((e) => {
        toast(t("notFoundTransfer"));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handlePressClick = () => {
    navigate(`/transferDetails/result/${value}`);
  };
  return (
    <div className={"max-w-5xl mx-auto p-4"}>
      <p className={"text-2xl my-3"}>Проверка</p>
      <div className={"border border-red-300 rounded-lg p-5 mb-6"}>
        <div className={"lg:w-1/2 w-full"}>
          <div className={"mb-4 flex justify-between items-center"}>
            <label htmlFor="first">Номер заказа (бронирования): </label>
            <input
              type="text"
              className={"border-red-300 rounded border p-2"}
              placeholder={"95124"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className={"mb-4 flex justify-between items-center"}>
            <label htmlFor="first"> Фамилия пассажира (латини): </label>
            <input
              type="text"
              className={"border-red-300 rounded border p-2"}
              value={data.name}
            />
          </div>
          <div className={"text-right"}>
            <button
              onClick={handlePressClick}
              className={
                "p-2 border border-red-200 rounded hover:bg-red-500 hover:text-white active:opacity-80 transition"
              }
            >
              Поиск
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div>loading.....</div>
      ) : data.id ? (
        <div className={"border border-red-300 rounded-lg p-5 mb-6"}>
          <div className={"lg:w-4/5 w-full"}>
            <div className={"mb-4 flex justify-between items-center"}>
              <div>
                <p className={"text-2xl"}>Заказ ID: {data.id}</p>
                {/*<p className={""}>от: 31.08.2022 14:40:42</p>*/}
                <p className={""}>
                  от: {moment(data.time).format("d.MM.YYYY hh:mm:ss")}
                </p>
              </div>
              <div>
                <p className={"text-2xl"}>Сумма:</p>
                <p className={"text-xl"}>
                  {data.price}
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
                <p className={"text-lg bg-red-500 text-white p-2"}>
                  Не оплачен
                </p>
              </div>
            </div>
            <div>
              <p className="text-2xl my-3">
                Пассажиры ({data.passengers?.length})
              </p>
              <div className={""}>
                {data.TransferPassenger?.map((pass, index) => {
                  return (
                    <div key={pass.id}>
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
      ) : (
        <div>no data</div>
      )}
    </div>
  );
}

export default Result;
