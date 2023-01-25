import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { X1, X, X2 } from "../constant";
import Title from "../components/Title";
import Label from "../components/Label";
import Arrow from "../images/arrow.gif";

const Fourth = () => {
  const [lastName, setLastName] = useState("");
  const SecondTops = useSelector((state) => state.SecondTop).value;
  const SecondBottoms = useSelector((state) => state.SecondBottom).value;
  const FirstTops = useSelector((state) => state.FirstTop).value;
  const FirstBottoms = useSelector((state) => state.FirstBottom).value;
  const Personage = useSelector((state) => state.Person.age);
  const ChangeCharts = Object.entries(
    useSelector((state) => state.ChangeChart)
  );
  useEffect(() => {
    if (ChangeCharts.length !== 0) {
      setLastName(ChangeCharts.sort((a, b) => a[1] - b[1])[0][0]);
    }
  }, [ChangeCharts]);
  return (
    <>
      <div className="fourth-screen">
        <div className="top title">
          <Title title={"My Future Confidence"} />

          <div className="w-full text-center">
            <table>
              <thead>
                <tr>
                  <td className="spacer">No.</td>
                  {X.map((element) => (
                    <td key={element}>
                      {element === 1
                        ? "18-24 Years"
                        : element * 5 +
                          15 +
                          "-" +
                          parseInt(element * 5 + 19) +
                          " Years"}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {X1.map((element, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="spacer">{element}</td>
                    {X.map((colIndex) => (
                      <td key={colIndex}>
                        {FirstTops.map(
                          (element1) =>
                            element1.col === colIndex &&
                            element1.row === rowIndex && (
                              <>
                                <button className="mileButton">
                                  {element1.name}
                                </button>
                              </>
                            )
                        )}
                        {SecondTops.map(
                          (element1) =>
                            element1.col === colIndex &&
                            element1.row === rowIndex && (
                              <div className="flag-btn">
                                <button className="mileButton">
                                  {element1.name.slice(
                                    0,
                                    element1.name.length - 3
                                  )}
                                </button>
                                {ChangeCharts.map((item, index) => {
                                  if (
                                    element1.name == item[0] &&
                                    item[1] <= 3
                                  ) {
                                    return (
                                      <img
                                        src={require("../images/flag.png")}
                                        alt="Girl in a jacket"
                                        width="20"
                                        height="20"
                                      ></img>
                                    );
                                  }
                                  return <></>;
                                })}
                                {/* {lastName === element1.name ? (
                                <img
                                  src={require("../images/flag.png")}
                                  alt="Girl in a jacket"
                                  width="20"
                                  height="20"
                                ></img>
                              ) : (
                                <></>
                              )} */}
                              </div>
                            )
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bottom">
          <div className="w-full text-center">
            <table>
              <thead>
                <tr>
                  <td className="spacer"></td>
                  {X.map((element) => (
                    <td key={element}>
                      {element === 1
                        ? "18-24 Years"
                        : element * 5 +
                          15 +
                          "-" +
                          parseInt(element * 5 + 19) +
                          " Years"}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {X2.map((element, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="spacer">{element}</td>
                    {X.map((colIndex) => (
                      <td key={colIndex}>
                        {FirstBottoms.map(
                          (element1) =>
                            element1.col === colIndex &&
                            element1.row === rowIndex && (
                              <>
                                <button className="chalButton">
                                  {element1.nameBottom}
                                </button>
                              </>
                            )
                        )}
                        {SecondBottoms.map(
                          (element1) =>
                            element1.col === colIndex &&
                            element1.row === rowIndex && (
                              <div className="flag-btn">
                                <button className="chalButton">
                                  {element1.nameBottom.slice(
                                    0,
                                    element1.nameBottom.length - 6
                                  )}
                                </button>
                                {ChangeCharts.map((item, index) => {
                                  if (
                                    element1.nameBottom == item[0] &&
                                    item[1] <= 3
                                  ) {
                                    return (
                                      <img
                                        src={require("../images/flag.png")}
                                        alt="Girl in a jacket"
                                        width="20"
                                        height="20"
                                      ></img>
                                    );
                                  }
                                  return <></>;
                                })}
                                {/* {lastName === element1.nameBottom ? (
                                <img
                                  src={require("../images/flag.png")}
                                  alt="Girl in a jacket"
                                  width="20"
                                  height="20"
                                ></img>
                              ) : (
                                <></>
                              )} */}
                              </div>
                            )
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full denote text-center">
              <table>
                <tbody>
                  <tr>
                    <td className="spacer"></td>
                    {X.map((element) => {
                      if (element == 1 && Personage <= 24) {
                        return <td style={{
                          backgroundColor: "#fff",
                        }}><img src={Arrow}/><span>You are here</span></td>;
                      } else {
                        if (
                          Personage >= parseInt(element * 5 + 15) &&
                          Personage <= parseInt(element * 5 + 19)
                        ) {
                          return (
                            <td style={{
                              backgroundColor: "#fff",
                            }}><img src={Arrow}/><span>You are here</span></td>
                          );
                        } else {
                          return <td style={{
                            backgroundColor: "#fff",
                          }}></td>;
                        }
                      }
                      //   return(
                      //   <td key={element}>
                      //     {element === 1
                      //       ? "18-24 Years"
                      //       : element * 5 +
                      //         15 +
                      //         "-" +
                      //         parseInt(element * 5 + 19) +
                      //         " Years"}
                      //   </td>
                      // )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fourth;
